"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";
import { Footer } from "@/components/layout/footer";
import { artists } from "@/lib/data/artists";
import Link from "next/link";
import { Star, Eye, Mail, ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";

const artistTabs = [
  { id: "tattoos", label: "Tattoos" },
  { id: "piercings", label: "Piercings" },
  { id: "nail-art", label: "Nail Art" }
];

export default function ArtistsPage() {
  const [hoveredArtist, setHoveredArtist] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"tattoos" | "piercings" | "nail-art">("tattoos");

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Artists", item: "/artists" }
  ];

  const filteredArtists = artists.filter((artist) => {
    if (activeTab === "piercings") {
      return artist.specialty.toLowerCase().includes("piercing");
    }
    if (activeTab === "nail-art") {
      return artist.specialty.toLowerCase().includes("nail");
    }
    return artist.specialty.toLowerCase().includes("tattoo");
  });

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

        {/* Category Toggle Switcher */}
        <section className="py-6 bg-zinc-950/30 border-y border-white/5">
          <div className="max-w-md mx-auto px-6 flex justify-center">
            <div className="bg-zinc-950 p-1 rounded-full border border-white/10 flex w-full">
              {artistTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                  }}
                  className={`flex-1 px-1 sm:px-4 py-2.5 text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase font-semibold rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id 
                      ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/25" 
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Master Artists Grid */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full bg-zinc-950/40 border border-white/5 border-dashed rounded-3xl p-12 text-center flex flex-col justify-center items-center py-20 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.02)_0%,_transparent_70%)] pointer-events-none" />
                <span className="text-[10px] tracking-[0.4em] text-cyan-400 uppercase font-mono mb-4 block animate-pulse">CREATIVE HORIZONS</span>
                <h3 className="text-3xl font-light uppercase tracking-widest text-white mb-4">Coming Soon</h3>
                <p className="text-zinc-500 font-light text-xs max-w-md mx-auto leading-relaxed">
                  We are currently curating elite talent for {activeTab === "nail-art" ? "Nail Artistry" : activeTab}. Stay tuned as we expand our resident team of master creators.
                </p>
              </motion.div>
            ) : (
              filteredArtists.map((artist, idx) => (
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
              ))
            )}

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

              <a href="mailto:careers@inknation.in" className="w-full mt-6 sm:mt-8">
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
