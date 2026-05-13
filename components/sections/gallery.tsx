"use client";

import React from "react";
import { motion } from "framer-motion";

const galleryImages = [
  "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=500",
  "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=500",
  "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=500",
  "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=500",
  "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500",
  "https://images.unsplash.com/photo-1590246814883-55516d489d1d?w=500",
  "https://images.unsplash.com/photo-1570294646112-27ce4f174e61?w=500",
  "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=500",
];

export const GallerySection = () => {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase text-white mb-16 text-center"
        >
          Our Work
        </motion.h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryImages.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="group relative overflow-hidden break-inside-avoid"
            >
              <img
                src={src}
                alt={`Tattoo Art ${index + 1}`}
                className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-sm tracking-widest uppercase border border-white/30 px-4 py-2 backdrop-blur-sm">
                  View Detail
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full border border-white/30 text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            View Full Gallery
          </motion.button>
        </div>
      </div>
    </section>
  );
};
