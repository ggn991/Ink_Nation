"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

function Counter({ from = 0, to, duration = 2.5, suffix = "", prefix = "", decimals = 0 }: { from?: number, to: number, duration?: number, suffix?: string, prefix?: string, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView) return;

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = prefix + value.toFixed(decimals) + suffix;
      }
    });

    return () => controls.stop();
  }, [from, to, duration, suffix, prefix, decimals, isInView]);

  return <span ref={nodeRef}>{prefix}{from.toFixed(decimals)}{suffix}</span>;
}

export const AboutSection = () => {
  return (
    <section className="bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center space-y-12"
        >
          <div className="space-y-2">
            <h2 className="text-4xl md:text-7xl font-light tracking-[0.2em] uppercase text-white">
              We Make Art
            </h2>
            <h2 className="text-4xl md:text-7xl font-light tracking-[0.2em] uppercase text-gray-500">
              Not Just Tattoos
            </h2>
          </div>

          <p className="max-w-2xl text-gray-400 text-lg md:text-xl font-light leading-relaxed">
            Ink Nation is Bangalore's premier custom tattoo studio. Founded in 2018, 
            we've built our reputation on bold artistry, surgical precision, and an 
            obsession with making every piece feel truly one-of-a-kind.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-12 w-full pt-16 text-center">
            <div className="flex flex-col items-center">
              <div className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 mb-3 select-none">
                <Counter to={15} suffix="+" />
              </div>
              <div className="text-[10px] md:text-xs tracking-[0.25em] text-zinc-500 uppercase font-light">
                Professional Artists
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 mb-3 select-none">
                <Counter to={2} />
              </div>
              <div className="text-[10px] md:text-xs tracking-[0.25em] text-zinc-500 uppercase font-light">
                Premium Studios
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 mb-3 select-none">
                <Counter to={6000} suffix="+" />
              </div>
              <div className="text-[10px] md:text-xs tracking-[0.25em] text-zinc-500 uppercase font-light">
                Tattoos Done
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 mb-3 select-none">
                <Counter to={4.9} suffix="+" decimals={1} />
              </div>
              <div className="text-[10px] md:text-xs tracking-[0.25em] text-zinc-500 uppercase font-light">
                Average Rating
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
