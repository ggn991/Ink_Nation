"use client";

import React from "react";
import { motion } from "framer-motion";

const artists = [
  {
    name: "Arjun K",
    specialty: "Blackwork & Realism",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600",
  },
  {
    name: "Meera S",
    specialty: "Neo-Traditional",
    image: "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=600",
  },
  {
    name: "Dev R",
    specialty: "Geometric & Dotwork",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
  },
];

export const ArtistsSection = () => {
  return (
    <section id="artists" className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase text-white mb-16 text-center"
        >
          The Artists
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="group relative aspect-[3/4] overflow-hidden bg-zinc-900"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="text-2xl font-light text-white uppercase tracking-wider mb-2">
                  {artist.name}
                </h3>
                <p className="text-zinc-400 text-sm tracking-widest uppercase mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {artist.specialty}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Master of {artist.specialty.toLowerCase()}, bringing stories to life through skin and ink.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
