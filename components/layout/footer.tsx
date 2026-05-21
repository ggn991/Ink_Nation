"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative z-10 select-none">
      {/* Subtle decorative glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand Logo & Tagline */}
          <div className="space-y-6">
            <Link href="/" className="text-xl md:text-2xl font-light tracking-[0.25em] uppercase text-white hover:text-[#00f0ff] transition-colors">
              Ink <span className="font-extrabold text-[#00f0ff]">Nation</span>
            </Link>
            <p className="text-zinc-500 text-xs md:text-sm tracking-widest uppercase font-semibold">
              "We Make You A Believer"
            </p>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-xs font-light">
              Premium custom tattoo and body piercing studio in Bangalore Koramangala & Mysore Gokulam. Founded in 2019.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/ink_nation_tattooz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/40 hover:bg-[#00f0ff]/5 transition-all duration-300 cursor-pointer"
                aria-label="Instagram Profile"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a 
                href="mailto:inknationstudio@gmail.com" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/40 hover:bg-[#00f0ff]/5 transition-all duration-300 cursor-pointer"
                aria-label="Email Studio"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-semibold border-b border-white/10 pb-2">Services</h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li>
                <Link href="/services" className="hover:text-[#00f0ff] transition-colors cursor-pointer block uppercase tracking-wider">
                  Custom Tattoo
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#00f0ff] transition-colors cursor-pointer block uppercase tracking-wider">
                  Body Piercing
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#00f0ff] transition-colors cursor-pointer block uppercase tracking-wider">
                  Tattoo Training Academy
                </Link>
              </li>
              <li className="text-zinc-600 block uppercase tracking-wider flex items-center gap-1.5 select-none">
                Nail Art <span className="text-[8px] bg-zinc-900 border border-white/5 text-zinc-500 px-1.5 py-0.5 rounded font-mono font-medium tracking-normal">SOON</span>
              </li>
              <li className="text-zinc-600 block uppercase tracking-wider flex items-center gap-1.5 select-none">
                Tattoo Removal <span className="text-[8px] bg-zinc-900 border border-white/5 text-zinc-500 px-1.5 py-0.5 rounded font-mono font-medium tracking-normal">SOON</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Pages */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-semibold border-b border-white/10 pb-2">Explore</h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li>
                <Link href="/gallery" className="hover:text-[#00f0ff] transition-colors cursor-pointer block uppercase tracking-wider">
                  Art Gallery
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-[#00f0ff] transition-colors cursor-pointer block uppercase tracking-wider">
                  Tattoo Masters
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#00f0ff] transition-colors cursor-pointer block uppercase tracking-wider">
                  Pricing Tiers
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#00f0ff] transition-colors cursor-pointer block uppercase tracking-wider">
                  Studio FAQs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#00f0ff] transition-colors cursor-pointer block uppercase tracking-wider">
                  Blog & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Let's Talk */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-white font-semibold border-b border-white/10 pb-2">Let's Talk</h4>
            <div className="space-y-3 text-xs text-zinc-400 font-light">
              <div className="flex items-center space-x-2.5">
                <Mail className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                <a href="mailto:inknationstudio@gmail.com" className="hover:text-[#00f0ff] transition-colors cursor-pointer font-mono">
                  inknationstudio@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-[#00f0ff] shrink-0" />
                <a href="tel:+918735097898" className="hover:text-[#00f0ff] transition-colors cursor-pointer font-mono">
                  +91 87350 97898
                </a>
              </div>
              <div className="flex items-start space-x-2.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#00f0ff] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white uppercase text-[10px] tracking-wider">Bangalore Branch:</span>
                  <span>11:00 AM – 9:00 PM</span>
                  <span className="block font-semibold text-white uppercase text-[10px] tracking-wider mt-1.5">Mysore Branch:</span>
                  <span>10:15 AM – 9:00 PM</span>
                </div>
              </div>
              <div className="flex items-start space-x-2.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#00f0ff] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white uppercase text-[10px] tracking-wider">Studios:</span>
                  <span className="block hover:text-[#00f0ff] cursor-pointer">Koramangala, Bengaluru</span>
                  <span className="block hover:text-[#00f0ff] cursor-pointer">Gokulam, Mysore</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bars */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center">
          <p className="text-[10px] text-zinc-500 tracking-widest uppercase">
            © INK NATION TATTOO STUDIO 2019–2026. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center space-x-2 text-[10px] text-zinc-500 tracking-widest uppercase">
            <span>BANGALORE</span>
            <span className="text-[#00f0ff]">|</span>
            <span>MYSORE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
