"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Share2, ZoomIn, Check } from "lucide-react";

interface TeaserItem {
  id: string;
  src: string;
  artist: string;
  style: string;
  type: "tattoos" | "piercings" | "nail-art" | "removal";
}

const teaserItems: TeaserItem[] = [
  { id: "t1", src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800", artist: "Kushal", style: "Realism", type: "tattoos" },
  { id: "t2", src: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800", artist: "Ricky", style: "Script", type: "tattoos" },
  { id: "t3", src: "https://images.unsplash.com/photo-1620822606560-642512f45ea2?q=80&w=800", artist: "Ricky", style: "Industrial Piercing", type: "piercings" },
  { id: "t4", src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800", artist: "Artist Rhea", style: "Premium Acrylic", type: "nail-art" },
  { id: "t5", src: "https://images.unsplash.com/photo-1597405490028-2823d4b45a5a?q=80&w=800", artist: "Kushal", style: "Black & Grey", type: "tattoos" },
  { id: "t6", src: "https://images.unsplash.com/photo-1594916301323-7db043e0d869?q=80&w=800", artist: "Ricky", style: "Curated Ear", type: "piercings" },
  { id: "t7", src: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?q=80&w=800", artist: "Artist Rhea", style: "Electric Accent", type: "nail-art" },
  { id: "t8", src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800", artist: "Kushal", style: "Laser Removal", type: "removal" },
  { id: "t9", src: "https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=800", artist: "Ricky", style: "Coverup / Rework", type: "removal" },
];

const tabs = [
  { id: "tattoos", label: "Tattoos" },
  { id: "piercings", label: "Piercings" },
  { id: "nail-art", label: "Nail Art" },
  { id: "removal", label: "Removal/Rework" }
];

export const GallerySection = () => {
  const [activeType, setActiveType] = useState<"tattoos" | "piercings" | "nail-art" | "removal">("tattoos");
  const [selectedItem, setSelectedItem] = useState<TeaserItem | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredItems = teaserItems.filter(
    (item) => item.type === activeType
  );

  const handleShare = (item: TeaserItem) => {
    const shareUrl = `${window.location.origin}/gallery?id=${item.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="bg-black py-24 px-6 relative overflow-hidden">
      {/* Decorative background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.03] blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">Portfolio Teaser</h4>
          <h2 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-white mb-6">
            The Masterpieces
          </h2>
          <div className="w-16 h-px bg-cyan-500 mx-auto mb-8"></div>
          <p className="max-w-xl mx-auto text-gray-400 font-light leading-relaxed">
            A handpicked collection of custom creations from our state-of-the-art studios. Select a category below to explore our work.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-zinc-950 p-1 rounded-full border border-white/10 flex w-full max-w-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveType(tab.id as any)}
                className={`flex-1 py-2.5 text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  activeType === tab.id 
                    ? "bg-[#00f0ff] text-black shadow-lg shadow-cyan-400/20" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                onClick={() => setSelectedItem(item)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid bg-zinc-950 border border-white/5 hover:border-cyan-500/30 p-4 rounded-3xl cursor-pointer group transition-all duration-500 relative"
              >
                <div className="rounded-2xl overflow-hidden relative mb-4">
                  <img
                    src={item.src}
                    alt={`${item.style} by ${item.artist}`}
                    className="w-full h-auto object-cover grayscale group-hover:scale-[1.02] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] bg-white text-black px-4 py-2 rounded-full font-semibold inline-flex items-center gap-1.5 shadow-xl">
                      <ZoomIn className="w-3.5 h-3.5" /> Zoom Canvas
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center px-1">
                  <div>
                    <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">By {item.artist}</h4>
                    <h3 className="text-sm font-light uppercase tracking-wider text-white">{item.style}</h3>
                  </div>
                  <span className="text-[10px] text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-0.5 rounded-full uppercase tracking-widest font-mono">
                    {item.type === "nail-art" ? "Nail Art" : item.type === "removal" ? "Removal" : item.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA - Consistent Capsule Button */}
        <div className="mt-16 text-center">
          <Link href="/gallery">
            <button className="group px-12 py-4 bg-transparent border border-white/20 text-white rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-500 hover:bg-[#00f0ff] hover:border-[#00f0ff] hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer active:scale-95">
              Explore All Masterpieces
            </button>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-6 cursor-pointer"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-white/10 hover:border-white text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-zinc-950 border border-white/15 max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl p-4 md:p-6 cursor-default relative flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden max-h-[60vh] mb-6 flex justify-center bg-black">
                <img src={selectedItem.src} alt="" className="max-h-[60vh] object-contain rounded-xl" />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
                <div>
                  <span className="text-[#00f0ff] uppercase tracking-widest text-xs font-mono">{selectedItem.style}</span>
                  <h3 className="text-xl font-light uppercase tracking-wider text-white mt-1">Masterpiece by {selectedItem.artist}</h3>
                  <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Category: {selectedItem.type === "nail-art" ? "Nail Art" : selectedItem.type === "removal" ? "Removal/Rework" : selectedItem.type}</p>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleShare(selectedItem)}
                    className="px-5 py-3 bg-zinc-900 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/5 text-white hover:text-cyan-400 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    <span>{copied ? "Link Copied!" : "Share"}</span>
                  </button>
                  <Link href="/booking" onClick={() => setSelectedItem(null)}>
                    <button className="bg-white text-black px-6 py-3 rounded-full font-semibold uppercase tracking-widest text-[10px] hover:bg-[#00f0ff] hover:text-black hover:border-[#00f0ff] transition-all duration-300 cursor-pointer border border-white">
                      Book Similar
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
