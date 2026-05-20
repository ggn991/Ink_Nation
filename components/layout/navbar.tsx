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
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Services", href: "/services" },
    { name: "Artists", href: "/artists" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8 py-4 ${scrolled ? "mt-0" : "mt-4"}`}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`max-w-7xl mx-auto px-6 py-4 flex justify-between items-center rounded-full transition-all duration-500 ${
            scrolled ? "bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]" : "bg-black/40 backdrop-blur-md border border-white/5"
          }`}
        >
          <div className="flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-white hover:text-cyan-400 transition-colors">
              Ink <span className="font-bold text-cyan-400">Nation</span>
            </Link>
            <div className="hidden lg:flex items-center space-x-1 ml-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    pathname === link.href
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium" 
                      : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/booking">
              <button className="px-5 py-2 bg-white text-black rounded-full text-[10px] tracking-widest uppercase font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border border-white hover:border-cyan-400 shadow-md">
                Book Session
              </button>
            </Link>
            <button 
              className="lg:hidden p-2 text-white cursor-pointer" 
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
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <button 
                className="absolute top-8 right-8 p-2 text-white cursor-pointer" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xl font-light tracking-[0.2em] uppercase transition-colors cursor-pointer ${
                    pathname === link.href ? "text-cyan-400 font-medium underline decoration-cyan-400 decoration-2 underline-offset-8" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                <button className="mt-4 px-10 py-4 bg-white text-black rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-cyan-400 hover:text-black transition-colors duration-300 cursor-pointer border border-white hover:border-cyan-400">
                  Book Session
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
