"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/utils/animations";
import { ChevronDown } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileInkGuideOpen, setIsMobileInkGuideOpen] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  const primaryLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Services", href: "/services" },
    { name: "Artists", href: "/artists" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
  ];

  const dropdownLinks = [
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
  ];

  const contactLink = { name: "Contact", href: "/contact" };

  // Control overlay animations on hamburger toggle
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (isOpen) {
        document.body.style.overflow = "hidden"; // Lock scroll

        // Slide Down from top
        gsap.to(overlay, {
          y: "0%",
          duration: 0.6,
          ease: "power4.inOut",
          onComplete: () => {
            const links = linksContainerRef.current?.querySelectorAll(".nav-link-item");
            if (links) {
              gsap.fromTo(
                links,
                { x: -35, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" }
              );
            }
          }
        });
      } else {
        document.body.style.overflow = ""; // Unlock scroll

        // Slide back up
        gsap.to(overlay, {
          y: "-100%",
          duration: 0.6,
          ease: "power4.inOut",
        });
      }
    });

    return () => {
      mm.revert();
    };
  }, [isOpen]);

  // Handle automatic nav close on router path update
  useEffect(() => {
    setIsOpen(false);
    if (!pathname.startsWith("/faq") && !pathname.startsWith("/blog")) {
      setIsMobileInkGuideOpen(false);
    }
  }, [pathname]);

  // Pre-expand mobile accordion if current page is FAQ or Blog
  useEffect(() => {
    if (pathname.startsWith("/faq") || pathname.startsWith("/blog")) {
      setIsMobileInkGuideOpen(true);
    }
  }, [pathname]);

  return (
    <>
      {/* Floating Capsule Header Wrapper */}
      <div className="fixed top-4 md:top-6 left-4 sm:left-6 right-4 sm:right-6 max-w-7xl mx-auto z-[9999] pointer-events-none select-none">
        <header className="pointer-events-auto w-full bg-black/60 backdrop-blur-md border border-white/10 rounded-full py-2 pl-3.5 pr-1.5 sm:pl-5 sm:pr-2 md:pl-6 md:pr-3 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.7)] transition-all duration-300">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-xs sm:text-sm md:text-base font-light tracking-wider sm:tracking-[0.25em] uppercase text-white hover:text-[#00f0ff] transition-colors duration-300"
          >
            Ink <span className="font-extrabold text-[#00f0ff] ml-1">Nation</span>
          </Link>

          {/* Desktop Horizontal Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {primaryLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[10px] xl:text-[11px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full px-3.5 py-2 cursor-pointer ${active
                      ? "border border-[#00f0ff]/35 bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.12)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Ink Guide Dropdown */}
            <div className="relative group py-2">
              <button
                className={`text-[10px] xl:text-[11px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full px-3.5 py-2 cursor-pointer ${pathname.startsWith("/faq") || pathname.startsWith("/blog")
                    ? "border border-[#00f0ff]/35 bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.12)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                Ink Guide
              </button>

              {/* Dropdown Menu Box */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="bg-zinc-950/95 border border-white/10 rounded-2xl p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-md min-w-[130px] flex flex-col gap-0.5">
                  {dropdownLinks.map((sublink) => {
                    const subActive = pathname.startsWith(sublink.href);
                    return (
                      <Link
                        key={sublink.name}
                        href={sublink.href}
                        className={`text-[9px] font-bold tracking-widest uppercase px-3.5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer text-center ${subActive
                            ? "bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20"
                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                          }`}
                      >
                        {sublink.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Link */}
            <Link
              href={contactLink.href}
              className={`text-[10px] xl:text-[11px] font-bold tracking-widest uppercase transition-all duration-300 rounded-full px-3.5 py-2 cursor-pointer ${pathname.startsWith(contactLink.href)
                  ? "border border-[#00f0ff]/35 bg-[#00f0ff]/10 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.12)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {contactLink.name}
            </Link>
          </nav>

          {/* Right Action Trigger Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <Link href="/booking">
              <button
                className="px-2.5 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 bg-white text-black font-extrabold text-[8px] sm:text-[9px] md:text-[10px] tracking-widest uppercase rounded-full hover:bg-[#00f0ff] hover:text-black border border-white hover:border-[#00f0ff] transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
              >
                GET INKED
              </button>
            </Link>

            {/* Floating Hamburger Toggle Button (Shown on mobile & hidden on desktop) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex flex-col justify-center items-center gap-1 bg-zinc-900 border border-white/5 rounded-full hover:border-[#00f0ff]/50 transition-colors duration-300 focus:outline-none cursor-pointer group"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              <span
                className={`w-3.5 sm:w-4 h-[2px] bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[6px]" : "group-hover:bg-[#00f0ff]"
                  }`}
              />
              <span
                className={`w-3.5 sm:w-4 h-[2px] bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "group-hover:bg-[#00f0ff]"
                  }`}
              />
              <span
                className={`w-3.5 sm:w-4 h-[2px] bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[6px]" : "group-hover:bg-[#00f0ff]"
                  }`}
              />
            </button>
          </div>

        </header>
      </div>

      {/* Fullscreen Sliding Overlay Nav */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] bg-[#0A0A0A] w-full h-dvh transform -translate-y-full flex flex-col justify-between p-6 sm:p-8 md:p-20 overflow-y-auto lg:overflow-hidden"
      >
        {/* Sleek accent color glow */}
        <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Large Links Stagger */}
        <div className="flex-grow flex items-center pt-16">
          <div ref={linksContainerRef} className="flex flex-col space-y-4 md:space-y-6 w-full">
            <span className="text-[9px] tracking-[0.3em] font-semibold text-zinc-500 uppercase block mb-1">
              Studio Navigation
            </span>

            {primaryLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <div key={link.name} className="nav-link-item opacity-0">
                  <Link
                    href={link.href}
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight block hover:text-[#00f0ff] transition-all duration-300 hover:translate-x-3 cursor-pointer ${active ? "text-[#00f0ff]" : "text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}

            {/* Mobile Dropdown Trigger */}
            <div className="nav-link-item opacity-0 flex flex-col">
              <button
                onClick={() => setIsMobileInkGuideOpen(!isMobileInkGuideOpen)}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight flex items-center gap-3 hover:text-[#00f0ff] transition-all duration-300 cursor-pointer text-left ${pathname.startsWith("/faq") || pathname.startsWith("/blog") ? "text-[#00f0ff]" : "text-white"
                  }`}
              >
                <span>Ink Guide</span>
                <ChevronDown
                  className={`w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 ${isMobileInkGuideOpen ? "rotate-180 text-[#00f0ff]" : "text-zinc-500"
                    }`}
                />
              </button>

              {/* Collapsible Submenu */}
              <div
                className={`transition-all duration-300 overflow-hidden ${isMobileInkGuideOpen ? "max-h-40 opacity-100 mt-2 pl-6" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="flex flex-col space-y-3 py-1 border-l-2 border-[#00f0ff]/20 pl-4">
                  {dropdownLinks.map((sublink) => {
                    const subActive = pathname.startsWith(sublink.href);
                    return (
                      <Link
                        key={sublink.name}
                        href={sublink.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-xl sm:text-2xl font-bold uppercase tracking-wide block transition-colors cursor-pointer ${subActive ? "text-[#00f0ff]" : "text-zinc-400 hover:text-white"
                          }`}
                      >
                        {sublink.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Contact Link */}
            <div className="nav-link-item opacity-0">
              <Link
                href={contactLink.href}
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight block hover:text-[#00f0ff] transition-all duration-300 hover:translate-x-3 cursor-pointer ${pathname === contactLink.href ? "text-[#00f0ff]" : "text-white"
                  }`}
              >
                {contactLink.name}
              </Link>
            </div>

          </div>
        </div>

        {/* Nav Footer Details */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-6 relative z-10">
          <div>
            <span className="text-[9px] tracking-[0.25em] font-semibold text-zinc-500 uppercase block mb-1">
              GET IN TOUCH
            </span>
            <a
              href="mailto:inknationstudio@gmail.com"
              className="text-xs md:text-sm text-white hover:text-[#00f0ff] transition-colors cursor-pointer block font-light"
            >
              inknationstudio@gmail.com
            </a>
            <span className="text-zinc-500 text-xs block mt-1 font-light">
              Bangalore Koramangala 5th Block
            </span>
            <span className="text-zinc-500 text-xs block font-light">
              Mysore Gokulam 2nd Stage
            </span>
          </div>

          <div className="flex flex-col md:items-end justify-center">
            <span className="text-[9px] tracking-widest text-[#00f0ff] uppercase mt-2 font-mono font-medium">
              ★ Bangalore 4.8 | Mysore 5.0 ★
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
