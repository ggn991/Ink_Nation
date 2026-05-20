"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const PlayReel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mousemove listener inside the section to follow the cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
        className="relative bg-zinc-950 py-32 md:py-48 px-6 md:px-12 flex flex-col justify-center items-center text-center overflow-hidden border-t border-white/5 cursor-none group select-none"
      >
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Section Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Dynamic Follower Cursor Circle */}
        {isHovered && !isOpen && (
          <div
            className="hidden md:flex absolute pointer-events-none z-50 w-24 h-24 rounded-full border border-[#00f0ff] bg-black/60 backdrop-blur-sm items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(0,240,255,0.2)] animate-pulse"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
            }}
          >
            <span className="text-[10px] tracking-[0.25em] font-mono font-bold text-white uppercase select-none">
              PLAY
            </span>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-4xl space-y-4">
          <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase block mb-2 animate-pulse">
            WORK IN MOTION
          </span>

          {/* Headline stacks */}
          <div className="flex flex-col items-center">
            <h2 className="text-6xl sm:text-8xl md:text-[9rem] font-black uppercase text-zinc-800 tracking-tighter leading-none group-hover:text-zinc-600 transition-colors duration-500">
              PLAY
            </h2>
            <h2 className="text-6xl sm:text-8xl md:text-[9rem] font-black uppercase text-white tracking-tighter leading-none group-hover:text-[#00f0ff] transition-colors duration-500">
              REEL
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-light tracking-wide max-w-md mx-auto pt-6 leading-relaxed">
            Our work is best experienced in motion. Turn up the music, put on your headphones, and witness permanent art being born.
          </p>

          {/* Mobile direct trigger button */}
          <div className="md:hidden pt-6">
            <button className="px-6 py-3 bg-white text-black text-[10px] font-bold tracking-widest uppercase rounded-full inline-flex items-center space-x-2">
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>WATCH REEL</span>
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Video Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] bg-black/98 flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
          >
            {/* Close trigger button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-6 right-6 md:top-12 md:right-12 z-50 p-4 bg-zinc-950/80 hover:bg-white/10 border border-white/10 rounded-full text-white cursor-pointer transition-colors duration-300"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
              {/* TODO: Replace source URL below with actual client studio reel video asset */}
              <video
                src="https://assets.mixkit.co/videos/preview/mixkit-tattoo-artist-working-in-his-studio-close-up-34354-large.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                controls
                muted={false}
                playsInline
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default PlayReel;
