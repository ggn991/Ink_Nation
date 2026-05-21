"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Studios", href: "/studios" },
    { name: "Artists", href: "/#artists" },
    { 
      name: "Gallery", 
      href: "/gallery/tattoos",
      dropdown: [
        { name: "Tattoos", href: "/gallery/tattoos" },
        { name: "Piercings", href: "/gallery/piercings" },
        { name: "Nail Art", href: "/gallery/nail-art" },
      ]
    },
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8 py-4 ${scrolled ? "mt-0" : "mt-4"}`}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`max-w-7xl mx-auto px-6 py-4 flex justify-between items-center rounded-full transition-all duration-500 ${
            scrolled ? "bg-black/85 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]" : "bg-black/40 backdrop-blur-md border border-white/5"
          }`}
        >
          <div className="flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-white hover:text-white/80 transition-colors">
              Ink Nation
            </Link>
            <div className="hidden md:flex items-center space-x-2 ml-10">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
                      pathname === link.href || (link.dropdown && pathname.startsWith('/gallery'))
                        ? "bg-white/10 text-white font-medium" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-[200]">
                      {link.dropdown.map((dropLink) => (
                        <Link
                          key={dropLink.name}
                          href={dropLink.href}
                          className="block px-4 py-3 rounded-xl text-xs tracking-wider uppercase text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {dropLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 bg-white text-black rounded-full text-xs tracking-widest uppercase font-medium hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer">
              Book a Session
            </button>
            <button 
              className="md:hidden p-2 text-white cursor-pointer" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </motion.div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <button 
                className="absolute top-8 right-8 p-2 text-white cursor-pointer" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col items-center">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-light tracking-[0.2em] uppercase transition-colors ${
                      pathname === link.href || (link.dropdown && pathname.startsWith('/gallery')) ? "text-white underline underline-offset-8" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="mt-6 flex flex-col items-center space-y-4 border-t border-white/10 pt-6 w-32">
                      {link.dropdown.map((dropLink) => (
                        <Link
                          key={dropLink.name}
                          href={dropLink.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm font-light tracking-[0.1em] uppercase text-white/40 hover:text-white transition-colors"
                        >
                          {dropLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button className="mt-8 px-10 py-4 bg-white text-black rounded-full text-sm font-medium tracking-widest uppercase hover:bg-zinc-200 transition-colors duration-300 cursor-pointer">
                Book a Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
