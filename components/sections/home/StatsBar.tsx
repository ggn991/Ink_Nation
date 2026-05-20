"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/animations/CountUp";
import { SectionHeading } from "@/components/sections/shared/SectionHeading";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StatItem {
  label: string;
  letter: string;
  count: number;
  suffix: string;
  decimals?: number;
  title: string;
  description: string;
  image: string;
}

const statsData: StatItem[] = [
  {
    label: "EXPERIENCE",
    letter: "A",
    count: 7,
    suffix: "+",
    title: "Years in Business",
    description: "Since 2019, Ink Nation has been the gold standard of tattoo artistry in Karnataka. We started with a vision of transforming tattoos into fine-art and have grown into a multi-city legacy.",
    image: "https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=800&auto=format&fit=crop"
  },
  {
    label: "CREATIVITY",
    letter: "B",
    count: 6000,
    suffix: "+",
    title: "Tattoos Completed",
    description: "Over six thousand unique visual stories etched onto skin with surgical precision. From delicate fine line script to massive high-realism full body suits.",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800&auto=format&fit=crop"
  },
  {
    label: "SATISFACTION",
    letter: "C",
    count: 6000,
    suffix: "+",
    title: "Satisfied Clients",
    description: "Praised specifically in reviews for our sterile standards and custom designs, we boast a flawless 5.0★ rating in Mysore and 4.8★ in Koramangala, Bangalore.",
    image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800&auto=format&fit=crop"
  },
  {
    label: "CREW",
    letter: "D",
    count: 5,
    suffix: "+",
    title: "Professional Artists",
    description: "A close-knit squad of five award-winning, dedicated tattooists and piercers who specialize in custom, detailed illustrations and modern black-and-grey masterpieces.",
    image: "https://images.unsplash.com/photo-1590246814883-57831168e243?q=80&w=800&auto=format&fit=crop"
  }
];

export const StatsBar = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Auto cycle tabs if not interacted (optional, keeping it interactive)
  const currentStat = statsData[activeTab];

  return (
    <section className="bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white/5 relative overflow-hidden select-none">

      {/* Background glow */}
      <div className="absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00f0ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          titleLine1="ABOUT THE TEAM"
          titleLine2="INK NATION"
          subtitle="WHO WE ARE"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">

          {/* Left Column: Stat Details & Tab Controllers */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 order-2 lg:order-1">

            {/* Letter Tab Row */}
            <div className="flex space-x-4 border-b border-white/10 pb-6">
              {statsData.map((stat, idx) => (
                <button
                  key={stat.letter}
                  onClick={() => setActiveTab(idx)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl border text-sm sm:text-base font-mono font-bold transition-all duration-300 cursor-pointer ${activeTab === idx
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                      : "bg-transparent text-zinc-500 border-white/10 hover:text-white hover:border-white/30"
                    }`}
                >
                  {stat.letter}
                </button>
              ))}
            </div>

            {/* Active Stat Description */}
            <div className="space-y-6 min-h-[300px] flex flex-col justify-center">
              <span className="text-[#00f0ff] text-[10px] tracking-[0.25em] font-mono uppercase block font-semibold">
                {currentStat.label}
              </span>

              {/* Counting Number */}
              <h3 className="text-5xl sm:text-7xl font-extralight tracking-tight text-white leading-none">
                <CountUp
                  key={activeTab} // reset CountUp when tab changes
                  end={currentStat.count}
                  suffix={currentStat.suffix}
                  decimals={currentStat.decimals}
                />
              </h3>

              <h4 className="text-xl sm:text-2xl font-light text-white uppercase tracking-wider">
                {currentStat.title}
              </h4>

              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                {currentStat.description}
              </p>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest text-[#00f0ff] uppercase group hover:text-white transition-colors cursor-pointer"
                >
                  <span>Learn more about us</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Fading Photo */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-md rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">

              {/* Floating Frame Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="absolute top-4 left-4 z-20 bg-zinc-950/80 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md select-none text-[8px] font-mono tracking-widest uppercase text-white">
                [00{activeTab + 1}] PORTRAIT FRAME
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentStat.image}
                    alt={currentStat.title}
                    fill
                    className="object-crop object-cover object-center group-hover:scale-105 transition-transform duration-[2000ms]"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default StatsBar;
