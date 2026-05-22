import { z } from "zod";
import disposableDomainsList from "disposable-email-domains";
import { isDisposableEmail as isDisposableEmailFakeoutImport } from "fakeout";
import emailcheckDisposableProviders from "@emailcheck/disposable-email-providers/disposable-email-providers.json";

// @ts-ignore
import isCheckDisposableEmailImport from "is-check-disposable-email";
// @ts-ignore
import isCheckDisposableDomainsList from "is-check-disposable-email/disposable_email_list.json";
// @ts-ignore
import EmailValidationImport from "emailvalid";
// @ts-ignore
import emailvalidDomains from "emailvalid/domains.json";

// Resilient helper to resolve default imports for any module structure
const resolveModule = (mod: any) => {
  if (!mod) return mod;
  return mod.default ? mod.default : mod;
};

// Resilient helper to retrieve a string array from any imported list structure
const getArrayFromImport = (mod: any): string[] => {
  if (!mod) return [];
  if (Array.isArray(mod)) return mod;
  if (mod.default && Array.isArray(mod.default)) return mod.default;
  if (typeof mod === "object") {
    const vals = Object.values(mod);
    const found = vals.find((val) => Array.isArray(val));
    if (found) return found as string[];
  }
  return [];
};

// Resilient helper to retrieve blacklisted/disposable domains from emailvalid domains database
const getEmailvalidDomainsList = (domainsObj: any): string[] => {
  if (!domainsObj) return [];
  const resolved = domainsObj.default ? domainsObj.default : domainsObj;
  return Object.keys(resolved).filter(
    (key) => resolved[key] === "disposable" || resolved[key] === "blacklist"
  );
};

// Resolve the functions and classes securely
const isDisposableEmailFakeout = resolveModule(isDisposableEmailFakeoutImport);
const isCheckDisposableEmail = resolveModule(isCheckDisposableEmailImport);
const EmailValidation = resolveModule(EmailValidationImport);

// Combine all disposable email list databases statically for ultra-high performance and reliability
const DISPOSABLE_DOMAINS = new Set<string>([
  ...getArrayFromImport(disposableDomainsList),
  ...getArrayFromImport(emailcheckDisposableProviders),
  ...getArrayFromImport(isCheckDisposableDomainsList),
  ...getEmailvalidDomainsList(emailvalidDomains)
]);

// A dynamic Set populated in the background with the absolute latest, live temporary domains
const LIVE_TEMP_MAIL_DOMAINS = new Set<string>();

// Fetch the absolute latest active temp domains dynamically in the background on load
if (typeof window !== "undefined" || typeof global !== "undefined") {
  // 1. Fetch live domains via CORS proxy to bypass browser restrictions
  fetch("https://api.allorigins.win/raw?url=https://api.temp-mail.org/request/domains/format/json")
    .then((res) => res.json())
    .then((domains) => {
      if (Array.isArray(domains)) {
        domains.forEach((d) => {
          const cleanDomain = d.replace(/^@/, "").trim().toLowerCase();
          if (cleanDomain) {
            LIVE_TEMP_MAIL_DOMAINS.add(cleanDomain);
          }
        });
      }
    })
    .catch((err) => {
      // Fallback directly
      fetch("https://api.temp-mail.org/request/domains/format/json")
        .then((res) => res.json())
        .then((domains) => {
          if (Array.isArray(domains)) {
            domains.forEach((d) => {
              const cleanDomain = d.replace(/^@/, "").trim().toLowerCase();
              if (cleanDomain) {
                LIVE_TEMP_MAIL_DOMAINS.add(cleanDomain);
              }
            });
          }
        })
        .catch(() => {});
    });

  // 2. Fetch the live community-maintained blocklist from GitHub (supports CORS natively)
  fetch("https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/master/disposable_email_blocklist.conf")
    .then((res) => res.text())
    .then((text) => {
      if (text) {
        const lines = text.split("\n");
        lines.forEach((line) => {
          const cleanDomain = line.trim().toLowerCase();
          if (cleanDomain && !cleanDomain.startsWith("#")) {
            LIVE_TEMP_MAIL_DOMAINS.add(cleanDomain);
          }
        });
      }
    })
    .catch((err) => {
      console.warn("Could not fetch live GitHub blocklist, falling back to static lists:", err);
    });
}

// Track domains that are currently undergoing dynamic verification to avoid duplicate network calls
const checkedDomains = new Set<string>();

// Trigger background async checks to Kickbox and Debounce APIs as the user types/interacts with the input
const triggerBackgroundCheck = (domain: string) => {
  if (!domain || checkedDomains.has(domain)) return;
  checkedDomains.add(domain);

  // 1. Kickbox Open API (fully CORS-enabled free endpoint)
  fetch(`https://open.kickbox.com/v1/disposable/${domain}`)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.disposable === true) {
        LIVE_TEMP_MAIL_DOMAINS.add(domain);
      }
    })
    .catch(() => {});

  // 2. Debounce API (fully CORS-enabled free endpoint)
  fetch(`https://disposable.debounce.io/?email=test@${domain}`)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.disposable === "true") {
        LIVE_TEMP_MAIL_DOMAINS.add(domain);
      }
    })
    .catch(() => {});
};

// Add global event listeners to preemptively trigger background checks as the user types/focuses on email fields
if (typeof window !== "undefined") {
  // Fetch an additional large community-maintained list on client load to broaden coverage
  fetch("https://raw.githubusercontent.com/kslr/disposable-email-domains/master/list.txt")
    .then((res) => res.text())
    .then((text) => {
      if (text) {
        const lines = text.split("\n");
        lines.forEach((line) => {
          const cleanDomain = line.trim().toLowerCase();
          if (cleanDomain && !cleanDomain.startsWith("#")) {
            LIVE_TEMP_MAIL_DOMAINS.add(cleanDomain);
          }
        });
      }
    })
    .catch(() => {});

  const handleEmailInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target && (target.type === "email" || target.name === "email")) {
      const email = target.value;
      if (email && email.includes("@")) {
        const parts = email.trim().toLowerCase().split("@");
        if (parts.length >= 2) {
          const domain = parts[1].trim();
          if (domain && domain.includes(".") && !domain.endsWith(".")) {
            triggerBackgroundCheck(domain);
          }
        }
      }
    }
  };

  document.addEventListener("input", handleEmailInput);
  document.addEventListener("blur", handleEmailInput, true);
}

// Efficiently check all parent subdomains (e.g., sub.disposable.com -> disposable.com)
const checkDomainMatch = (domain: string, domainsSet: Set<string>): boolean => {
  if (domainsSet.has(domain)) return true;
  const parts = domain.split(".");
  for (let i = 1; i < parts.length - 1; i++) {
    const parent = parts.slice(i).join(".");
    if (parent && domainsSet.has(parent)) return true;
  }
  return false;
};

// Initialize EmailValidation with allowed freemails (gmail, yahoo, etc.) and blocked disposable domains
let emailValidator: any = null;
if (typeof EmailValidation === "function") {
  try {
    emailValidator = new EmailValidation({ allowFreemail: true, allowDisposable: false });
  } catch (e) {
    console.error("Failed to initialize EmailValidation:", e);
  }
}

// Dynamically require deep-email-validator only in server environment to prevent client-side compilation errors (net/dns)
let deepValidate: any = null;
if (typeof window === "undefined") {
  try {
    deepValidate = require("deep-email-validator").validate;
  } catch (e) {
    // Fail silently in browser environment
  }
}

export const isDisposableEmail = (email: string): boolean => {
  if (!email) return false;

  const cleanEmail = email.trim().toLowerCase();
  const parts = cleanEmail.split("@");
  if (parts.length < 2) return false;
  const domain = parts[1].trim();

  // Trigger dynamic background checks to verify newly encountered domains
  if (!DISPOSABLE_DOMAINS.has(domain) && !LIVE_TEMP_MAIL_DOMAINS.has(domain)) {
    triggerBackgroundCheck(domain);
  }

  // 1. Direct Set check - ultra-fast lookup across all 160,000+ domains from all libraries combined
  if (checkDomainMatch(domain, DISPOSABLE_DOMAINS)) {
    return true;
  }

  // 2. Dynamic Set check - check against live temp domains loaded from temp-mail.org and GitHub blocklists
  if (checkDomainMatch(domain, LIVE_TEMP_MAIL_DOMAINS)) {
    return true;
  }

  // 3. Check fakeout package method
  try {
    if (typeof isDisposableEmailFakeout === "function" && isDisposableEmailFakeout(cleanEmail)) {
      return true;
    }
  } catch (e) {
    console.error("Error in fakeout validation:", e);
  }

  // 4. Check is-check-disposable-email package method
  try {
    if (typeof isCheckDisposableEmail === "function" && isCheckDisposableEmail(cleanEmail)) {
      return true;
    }
  } catch (e) {
    console.error("Error in is-check-disposable-email validation:", e);
  }

  // 5. Check emailvalid package method
  try {
    if (emailValidator && typeof emailValidator.check === "function") {
      const result = emailValidator.check(cleanEmail);
      if (!result.valid && (result.errors.includes("disposable") || result.errors.includes("blacklist"))) {
        return true;
      }
    }
  } catch (e) {
    console.error("Error in emailvalid validation:", e);
  }

  return false;
};

export const formValidationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), {
      message: "Name can only contain letters and spaces",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .refine((email) => !isDisposableEmail(email), {
      message: "Disposable email addresses are not allowed.",
    }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((val) => {
      // Remove spaces, hyphens, parentheses, plus sign for digit count check
      const digitsOnly = val.replace(/[^0-9]/g, "");
      return digitsOnly.length >= 10 && digitsOnly.length <= 15;
    }, {
      message: "Phone number must contain between 10 and 15 digits",
    }),
});
