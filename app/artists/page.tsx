"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";
import { Footer } from "@/components/layout/footer";
import { artists } from "@/lib/data/artists";
import Link from "next/link";
import { Star, Eye, Mail, ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";

export default function ArtistsPage() {
  const [hoveredArtist, setHoveredArtist] = useState<string | null>(null);

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Artists", item: "/artists" }
  ];

  return (
    <AppProviders>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-black text-white pt-36">
        
        {/* Hero Section */}
        <section className="relative py-12 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.05)_0%,_transparent_75%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Resident Masters</h4>
              <h1 className="text-4xl md:text-7xl font-light tracking-widest uppercase mb-6 leading-tight">
                Meet The <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">Masters</span>
              </h1>
              <p className="max-w-xl mx-auto text-gray-400 font-light text-base leading-relaxed">
                Meet our five resident creators who blend skin anatomy with high art. Click to explore their specific portfolios and custom designs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Master Artists Grid */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist, idx) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredArtist(artist.id)}
                onMouseLeave={() => setHoveredArtist(null)}
                className="bg-zinc-950 border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual ink splatter glow behind */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.02)_0%,_transparent_70%)] pointer-events-none" />
                
                <div>
                  {/* Photo container */}
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative bg-black border border-white/10">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredArtist === artist.id ? "scale-105 grayscale-0" : "grayscale"
                      }`}
                    />
                    
                    {/* Hover piece count previews */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                      <div className="text-center space-y-3">
                        <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">Portfolio Preview</div>
                        <div className="flex gap-2 justify-center">
                          {artist.portfolio.map((port, pIdx) => (
                            <div key={pIdx} className="w-12 h-12 rounded-lg overflow-hidden border border-white/20">
                              <img src={port.image} alt="" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                        <div className="text-[10px] text-zinc-400 tracking-wider pt-2">3 Core Masterpieces</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-cyan-400 tracking-widest uppercase font-mono">{artist.specialty}</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{artist.experience}</span>
                    </div>
                    <h3 className="text-2xl font-light uppercase tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-gray-400 font-light text-xs leading-relaxed line-clamp-3">
                      {artist.bio}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href={`/artists/${artist.slug}`} className="block">
                    <button className="w-full py-3 bg-zinc-900 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/5 text-white hover:text-cyan-400 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2">
                      <span>View Full Work</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Join Our Team recruitment card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-950/40 border border-white/5 border-dashed rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between items-center text-center group hover:border-cyan-500/20 transition-all duration-500"
            >
              <div className="my-auto space-y-6">
                <div className="w-16 h-16 rounded-full bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400 animate-pulse">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-light uppercase tracking-widest text-white">Join Our Team</h3>
                  <p className="text-zinc-500 font-light text-xs leading-relaxed max-w-xs mx-auto">
                    Are you an established artist with clean lines, surgical hygiene habits, and an elite portfolio? We are always looking for stellar creators.
                  </p>
                </div>
              </div>

              <a href="mailto:careers@inknation.in" className="w-full">
                <button className="w-full py-4 bg-white text-black rounded-full text-[10px] tracking-widest uppercase font-semibold hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer inline-flex items-center justify-center gap-2 border border-white">
                  <span>Send Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </a>
            </motion.div>

          </div>
        </section>

        <Footer />
      </main>
    </AppProviders>
  );
}
