"use client";

import React, { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";
import { Footer } from "@/components/layout/footer";
import { artists } from "@/lib/data/artists";
import Link from "next/link";
import { ArrowLeft, Calendar, ChevronRight, X, Share2, Check } from "lucide-react";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function ArtistDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const artist = artists.find((a) => a.slug === slug);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!artist) {
    return (
      <AppProviders>
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-24 px-6 text-center">
          <h2 className="text-3xl uppercase tracking-widest text-zinc-500 mb-6">Artist Profile Not Found</h2>
          <Link href="/artists">
            <button className="px-8 py-3 bg-white text-black rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-cyan-400 transition-colors cursor-pointer">
              Back to Masters
            </button>
          </Link>
        </main>
      </AppProviders>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Artists", item: "/artists" },
    { name: artist.name, item: `/artists/${artist.slug}` }
  ];

  return (
    <AppProviders>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-black text-white pt-36">
        
        {/* Back Link */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <Link href="/artists" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400 text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Masters</span>
          </Link>
        </div>

        {/* Artist Profile Header card */}
        <section className="px-6 max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Photo Column */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden aspect-[4/5] bg-zinc-950 border border-white/10 group">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-cyan-400 uppercase tracking-widest text-xs font-mono">{artist.specialty}</span>
                <h1 className="text-4xl md:text-6xl font-light uppercase tracking-wider text-white">
                  {artist.name}
                </h1>
                <div className="text-zinc-500 uppercase tracking-widest text-[10px] font-medium">{artist.experience}</div>
              </div>

              <p className="text-gray-400 font-light text-base leading-relaxed">
                {artist.bio}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href={`https://instagram.com/${artist.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                  <button className="px-6 py-3 bg-zinc-950 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/5 text-white hover:text-cyan-400 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-2">
                    <InstagramIcon className="w-4 h-4" />
                    <span>{artist.instagram}</span>
                  </button>
                </a>

                <button 
                  onClick={handleShare}
                  className="px-6 py-3 bg-zinc-950 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/5 text-white hover:text-cyan-400 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? "Link Copied!" : "Share Profile"}</span>
                </button>
              </div>

              <div className="pt-6 border-t border-white/5">
                <Link href="/booking">
                  <button className="bg-white text-black px-8 py-4 rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2 border border-white hover:border-cyan-400">
                    <span>Book Session with {artist.name}</span>
                    <Calendar className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Portfolio Gallery */}
        <section className="py-20 bg-zinc-950 border-t border-white/5 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-white mb-4">Masterwork Portfolio</h2>
              <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">Curated Masterpieces by {artist.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artist.portfolio.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item.image)}
                  className="bg-black border border-white/5 rounded-2xl overflow-hidden p-4 relative group hover:border-cyan-500/30 cursor-pointer transition-all duration-500"
                >
                  <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs uppercase tracking-[0.2em] bg-white text-black px-4 py-2 rounded-full font-semibold">
                        Zoom Masterpiece
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <h4 className="text-sm font-light uppercase tracking-wider text-white">{item.title}</h4>
                    <span className="text-[10px] text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 px-2.5 py-0.5 rounded-full uppercase tracking-widest">{item.style}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-6 cursor-pointer"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-white/10 hover:border-white text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl border border-white/15"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={selectedImage} alt="" className="max-w-full max-h-[80vh] object-contain rounded-2xl" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </main>
    </AppProviders>
  );
}
