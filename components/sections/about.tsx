"use client";

import React from "react";
import { motion } from "framer-motion";

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full pt-12">
            <div className="border-t border-violet-500/30 pt-6">
              <div className="text-4xl font-light text-white mb-1">500+</div>
              <div className="text-sm tracking-widest text-gray-500 uppercase">Tattoos Completed</div>
            </div>
            <div className="border-t border-violet-500/30 pt-6">
              <div className="text-4xl font-light text-white mb-1">8</div>
              <div className="text-sm tracking-widest text-gray-500 uppercase">Master Artists</div>
            </div>
            <div className="border-t border-violet-500/30 pt-6">
              <div className="text-4xl font-light text-white mb-1">Since 2018</div>
              <div className="text-sm tracking-widest text-gray-500 uppercase">Studio Founded</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
