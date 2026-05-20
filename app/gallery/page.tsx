"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { X, Share2, ZoomIn, Check, Calendar } from "lucide-react";
import { ImageGallerySchema, BreadcrumbSchema } from "@/lib/seo/json-ld";

interface GalleryItem {
  id: string;
  src: string;
  artist: string;
  style: string;
  type: "tattoos" | "piercings" | "nail-art" | "removal";
}

const galleryItems: GalleryItem[] = [
  // Tattoos
  { id: "g1", src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800", artist: "Kushal", style: "Realism", type: "tattoos" },
  { id: "g2", src: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800", artist: "Ricky", style: "Script", type: "tattoos" },
  { id: "g3", src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800", artist: "Artist Vikram", style: "3D & Geometry", type: "tattoos" },
  { id: "g4", src: "https://images.unsplash.com/photo-1597405490028-2823d4b45a5a?q=80&w=800", artist: "Kushal", style: "Black & Grey", type: "tattoos" },
  { id: "g5", src: "https://images.unsplash.com/photo-1590246814883-57831168e243?q=80&w=800", artist: "Artist Siddharth", style: "Neo-Traditional", type: "tattoos" },
  { id: "g6", src: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=800", artist: "Ricky", style: "Traditional", type: "tattoos" },

  // Piercings
  { id: "g7", src: "https://images.unsplash.com/photo-1620822606560-642512f45ea2?q=80&w=800", artist: "Ricky", style: "Industrial", type: "piercings" },
  { id: "g8", src: "https://images.unsplash.com/photo-1594916301323-7db043e0d869?q=80&w=800", artist: "Ricky", style: "Curated Ear", type: "piercings" },
  { id: "g9", src: "https://images.unsplash.com/photo-1610992383201-9c6061be174d?q=80&w=800", artist: "Kushal", style: "Helix", type: "piercings" },
  { id: "g10", src: "https://images.unsplash.com/photo-1531238965005-eb8d35091ff6?q=80&w=800", artist: "Kushal", style: "Symmetry", type: "piercings" },

  // Nail Art
  { id: "g11", src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800", artist: "Artist Rhea", style: "Premium Acrylic", type: "nail-art" },
  { id: "g12", src: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?q=80&w=800", artist: "Artist Rhea", style: "Electric Accent", type: "nail-art" },
  { id: "g13", src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800", artist: "Artist Rhea", style: "Cybernetic Nails", type: "nail-art" },

  // Removal/Rework
  { id: "g14", src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800", artist: "Ricky", style: "Laser Removal", type: "removal" },
  { id: "g15", src: "https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=800", artist: "Kushal", style: "Coverup / Rework", type: "removal" },
  { id: "g16", src: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?q=80&w=800", artist: "Ricky", style: "Re-inking", type: "removal" },
];

const mainTabs = [
  { id: "tattoos", label: "Tattoos" },
  { id: "piercings", label: "Piercings" },
  { id: "nail-art", label: "Nail Art" },
  { id: "removal", label: "Removal/Rework" }
];

const getStyleTagsForType = (type: string) => {
  switch (type) {
    case "tattoos":
      return ["All", "Black & Grey", "Colour", "Realism", "Script", "Neo-Traditional", "Traditional", "3D & Geometry"];
    case "piercings":
      return ["All", "Industrial", "Curated Ear", "Helix", "Symmetry"];
    case "nail-art":
      return ["All", "Premium Acrylic", "Electric Accent", "Cybernetic Nails"];
    case "removal":
      return ["All", "Laser Removal", "Coverup / Rework", "Re-inking"];
    default:
      return ["All"];
  }
};

export default function GalleryPage() {
  return <GalleryContent initialType="tattoos" />;
}

export function GalleryContent({ initialType = "tattoos" }: { initialType?: "tattoos" | "piercings" | "nail-art" | "removal" }) {
  const [activeType, setActiveType] = useState<"tattoos" | "piercings" | "nail-art" | "removal">(initialType);
  const [activeStyle, setActiveStyle] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [copied, setCopied] = useState(false);

  const styleTags = getStyleTagsForType(activeType);

  const filteredItems = galleryItems.filter((item) => {
    const matchesType = item.type === activeType;
    const matchesStyle =
      activeStyle === "All" ||
      item.style.toLowerCase().includes(activeStyle.toLowerCase()) ||
      (activeStyle === "Coverup / Rework" && item.style.toLowerCase().includes("coverup"));
    return matchesType && matchesStyle;
  });

  const handleShare = (item: GalleryItem) => {
    const shareUrl = `${window.location.origin}/gallery?id=${item.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Gallery", item: "/gallery" }
  ];

  return (
    <AppProviders>
      <ImageGallerySchema images={galleryItems.map(item => ({ url: item.src, caption: `${item.style} by ${item.artist}` }))} />
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-black text-white pt-36">
        
        {/* Header */}
        <section className="relative py-12 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.05)_0%,_transparent_75%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Portfolio Curation</h4>
              <h1 className="text-4xl md:text-7xl font-light tracking-widest uppercase mb-6 leading-tight">
                Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">Masterpieces</span>
              </h1>
              <p className="max-w-xl mx-auto text-gray-400 font-light text-base leading-relaxed">
                Step inside the virtual museum of skin canvases. Filter by category or specific style tags to find concepts for your next project.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Toggle Switcher */}
        <section className="py-6 bg-zinc-950/30 border-y border-white/5">
          <div className="max-w-xl mx-auto px-6 flex justify-center">
            <div className="bg-zinc-950 p-1 rounded-full border border-white/10 flex w-full">
              {mainTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveType(tab.id as any);
                    setActiveStyle("All");
                    setSelectedItem(null);
                  }}
                  className={`flex-1 py-2.5 text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                    activeType === tab.id 
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

        {/* Horizontal style tags filter strip */}
        <section className="py-6 border-b border-white/5 overflow-x-auto whitespace-nowrap scrollbar-hide px-6">
          <div className="max-w-5xl mx-auto flex gap-2 sm:justify-center">
            {styleTags.map((style) => (
              <button
                key={style}
                onClick={() => {
                  setActiveStyle(style);
                  setSelectedItem(null);
                }}
                className={`px-4 py-2 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer border ${
                  activeStyle === style
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                    : "text-zinc-500 border-white/5 hover:text-white hover:bg-white/5"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </section>

        {/* Cascading Masonry grid */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          {filteredItems.length > 0 ? (
            <motion.div 
              layout
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
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
                      <span className="text-[10px] uppercase tracking-[0.2em] bg-white text-black px-4 py-2 rounded-full font-semibold">
                        Zoom Masterpiece
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
            </motion.div>
          ) : (
            <div className="text-center py-20 text-zinc-500 font-light">
              No gallery masterpieces matched this style. Select other tags or categories!
            </div>
          )}
        </section>

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
                    <span className="text-cyan-400 uppercase tracking-widest text-xs font-mono">{selectedItem.style}</span>
                    <h3 className="text-xl font-light uppercase tracking-wider text-white mt-1">Masterpiece by {selectedItem.artist}</h3>
                    <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Category: {selectedItem.type === "nail-art" ? "Nail Art" : selectedItem.type === "removal" ? "Removal/Rework" : selectedItem.type}</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleShare(selectedItem)}
                      className="px-5 py-3 bg-zinc-900 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/5 text-white hover:text-cyan-400 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                      <span>{copied ? "Link Copied!" : "Share Link"}</span>
                    </button>
                    <Link href="/booking" onClick={() => setSelectedItem(null)}>
                      <button className="bg-white text-black px-6 py-3 rounded-full font-extrabold uppercase tracking-widest text-[10px] hover:bg-[#00f0ff] hover:text-black transition-all duration-300 cursor-pointer border border-white hover:border-[#00f0ff]">
                        GET INKED
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </main>
    </AppProviders>
  );
}
