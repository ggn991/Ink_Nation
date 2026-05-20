export type Announcement = {
  id: string;
  text: string;
  badge?: string;        // e.g. "NEW" | "OFFER" | "ALERT"
  badgeColor?: string;   // Tailwind class or design system color name
  ctaLabel?: string;
  ctaHref?: string;
  expiresAt?: string;    // ISO date string
};

export const announcements: Announcement[] = [
  {
    id: "training",
    text: "Tattoo Training Program now open. Limited seats.",
    badge: "NEW",
    badgeColor: "bg-cyan-500 text-black",
    ctaLabel: "Apply Now →",
    ctaHref: "/contact"
  },
  {
    id: "piercing",
    text: "Piercing from ₹800. Walk-ins welcome at both studios.",
    badge: "OFFER",
    badgeColor: "bg-emerald-500 text-black",
    ctaLabel: "Book Now →",
    ctaHref: "/booking"
  },
  {
    id: "ratings",
    text: "Rated 5.0★ in Mysore & 4.8★ in Bangalore — 6000+ happy clients.",
    badge: "RATED",
    badgeColor: "bg-cyan-500 text-black",
    ctaLabel: "Reviews →",
    ctaHref: "/about"
  },
  {
    id: "services-soon",
    text: "Nail Art & Tattoo Removal — Coming Soon. Join the waitlist.",
    badge: "SOON",
    badgeColor: "bg-amber-500 text-black",
    ctaLabel: "Join List →",
    ctaHref: "/contact"
  },
  {
    id: "locations",
    text: "Now open in Koramangala, Bangalore & Gokulam, Mysore.",
    badge: "INFO",
    badgeColor: "bg-cyan-500 text-black",
    ctaLabel: "Find Us →",
    ctaHref: "/contact"
  }
];
