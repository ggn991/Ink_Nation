"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { announcements, Announcement } from "@/lib/data/announcements";
import { gsap } from "@/lib/utils/animations";

export const Hero = () => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);
  const tickerTextRef = useRef<HTMLDivElement>(null);
  const tickerContainerRef = useRef<HTMLDivElement>(null);
  const tickerTimer = useRef<NodeJS.Timeout | null>(null);
  const isHovered = useRef(false);

  // Manage rotation of the announcement ticker
  useEffect(() => {
    if (!tickerVisible || announcements.length === 0) return;

    const startTimer = () => {
      tickerTimer.current = setInterval(() => {
        if (isHovered.current) return;

        const nextIndex = (tickerIndex + 1) % announcements.length;

        // Slide up animation using GSAP
        const textEl = tickerTextRef.current;
        if (textEl) {
          gsap.timeline()
            .to(textEl, { y: "-100%", opacity: 0, duration: 0.3, ease: "power2.in" })
            .call(() => setTickerIndex(nextIndex))
            .set(textEl, { y: "100%" })
            .to(textEl, { y: "0%", opacity: 1, duration: 0.4, ease: "power2.out" });
        }
      }, 4000);
    };

    startTimer();

    return () => {
      if (tickerTimer.current) clearInterval(tickerTimer.current);
    };
  }, [tickerIndex, tickerVisible]);

  const handleDismissTicker = () => {
    setTickerVisible(false);
  };

  const activeAnnouncement = announcements[tickerIndex];

  return (
    <section className="relative min-h-screen bg-[#0A0A0A] flex flex-col justify-between overflow-hidden select-none">
      
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Cyan ambient glows */}
      <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[#00f0ff]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Spacing for global Navbar */}
      <div className="h-24 w-full shrink-0" />

      {/* Dynamic Announcement Ticker */}
      {tickerVisible && activeAnnouncement && (
        <div 
          ref={tickerContainerRef}
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
          className="absolute top-24 left-0 w-full h-12 bg-white/[0.02] border-b border-white/5 backdrop-blur-md flex items-center justify-between px-6 md:px-12 z-30 transition-all duration-300"
        >
          {/* Left blinker */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
            </span>
            {activeAnnouncement.badge && (
              <span className={`text-[8px] tracking-wider font-bold px-2 py-0.5 rounded font-mono ${activeAnnouncement.badgeColor || "bg-[#00f0ff] text-black"}`}>
                {activeAnnouncement.badge}
              </span>
            )}
          </div>

          {/* Center Rotating Content */}
          <div className="flex-grow overflow-hidden mx-4 h-full flex items-center justify-center">
            <div 
              ref={tickerTextRef}
              className="text-xs md:text-sm text-zinc-300 text-center font-light tracking-wide truncate max-w-full"
            >
              {activeAnnouncement.text}{" "}
              {activeAnnouncement.ctaLabel && activeAnnouncement.ctaHref && (
                <Link 
                  href={activeAnnouncement.ctaHref}
                  className="text-[#00f0ff] font-semibold hover:underline ml-1.5 inline-block shrink-0"
                >
                  {activeAnnouncement.ctaLabel}
                </Link>
              )}
            </div>
          </div>

          {/* Right Dismiss */}
          <button
            onClick={handleDismissTicker}
            className="p-1 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss Announcements"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Center Stacked Typography Display */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4 relative z-20 py-12">
        <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-2 md:space-y-4 max-w-7xl w-full">
          
          {/* Headline 1 Double shadow */}
          <div className="relative w-full h-[6rem] sm:h-[9rem] md:h-[12rem] lg:h-[15rem] flex items-center justify-center overflow-hidden">
            <h1 className="absolute text-zinc-800/25 uppercase font-black tracking-tighter text-[11vw] leading-none select-none translate-x-[4px] translate-y-[4px]">
              WE MAKE YOU
            </h1>
            <h1 className="text-zinc-400 uppercase font-black tracking-tighter text-[11vw] leading-none relative z-10">
              WE MAKE YOU
            </h1>
          </div>

          {/* Headline 2 Double shadow */}
          <div className="relative w-full h-[6rem] sm:h-[9rem] md:h-[12rem] lg:h-[15rem] flex items-center justify-center overflow-hidden">
            <h1 className="absolute text-[#00f0ff]/15 uppercase font-black tracking-tighter text-[11vw] leading-none select-none translate-x-[4px] translate-y-[4px]">
              A BELIEVER
            </h1>
            <h1 className="text-white uppercase font-black tracking-tighter text-[11vw] leading-none relative z-10">
              A BELIEVER
            </h1>
          </div>

        </div>
      </div>

      {/* Footer / Meta Data Row */}
      <div className="w-full px-6 md:px-12 pb-12 flex flex-col md:flex-row justify-between items-center gap-8 z-20">
        
        {/* Bottom Left: Location info */}
        <div className="text-center md:text-left">
          <span className="text-[9px] tracking-[0.25em] font-semibold text-zinc-500 uppercase block mb-1">
            LOCATIONS
          </span>
          <span className="text-xs text-white uppercase tracking-widest font-light">
            Bangalore & Mysore, India
          </span>
        </div>



        {/* Bottom Right: Founded Metadata */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end">
          <span className="text-[9px] tracking-[0.25em] font-semibold text-zinc-500 uppercase block mb-1">
            ESTABLISHED
          </span>
          <span className="text-xs text-white uppercase tracking-widest font-mono font-light">
            © 2019 INK NATION
          </span>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity pointer-events-none select-none">
        <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-zinc-400">
          SCROLL DOWN
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-[#00f0ff] animate-bounce" />
      </div>

    </section>
  );
};
export default Hero;
