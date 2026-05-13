"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palette, ShieldCheck, Star } from "lucide-react";

const marqueeText = "Premium Inks · Custom Designs · Sterile Environment · All Styles · Artist Consultations · Bangalore's Finest · ";

export const WhySection = () => {
  return (
    <section className="bg-black py-24 overflow-hidden">
      {/* Infinite Marquee */}
      <div className="relative flex overflow-x-hidden border-y border-white/10 py-8 mb-24">
        <div className="animate-marquee whitespace-nowrap flex">
          {[1, 2, 3].map((i) => (
            <span key={i} className="text-4xl md:text-6xl font-light tracking-widest uppercase text-white/20 mx-4">
              {marqueeText}
            </span>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex py-8">
          {[1, 2, 3].map((i) => (
            <span key={i} className="text-4xl md:text-6xl font-light tracking-widest uppercase text-white/20 mx-4">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-violet-500/30 transition-colors group"
          >
            <Palette className="w-12 h-12 text-violet-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-light text-white uppercase tracking-widest mb-4">Every Design is Custom</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              No flash. No copies. Every tattoo is designed uniquely for you, ensuring your story is told in its own original visual language.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-violet-500/30 transition-colors group"
          >
            <ShieldCheck className="w-12 h-12 text-violet-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-light text-white uppercase tracking-widest mb-4">Sterile & Safe</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Medical-grade sterilization. Every session, every time. We maintain the highest standards of hygiene for your peace of mind.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-violet-500/30 transition-colors group"
          >
            <Star className="w-12 h-12 text-violet-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-light text-white uppercase tracking-widest mb-4">Award-Winning Artists</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Our artists have been featured in India's top tattoo conventions, bringing world-class expertise to every needle stroke.
            </p>
          </motion.div>
        </div>
      </div>


    </section>
  );
};
