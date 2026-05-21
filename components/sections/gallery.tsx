"use client";

import React from "react";
import { InfiniteScrollingGallery } from "@/components/ui/infinite-scrolling-gallery";
import Link from "next/link";

const col1 = [
  { src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", artist: "Karan Singh", style: "Neo-Traditional" },
  { src: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800&auto=format&fit=crop", artist: "Priya Rao", style: "Realism" },
  { src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800&auto=format&fit=crop", artist: "Alex Black", style: "Minimalism" },
  { src: "https://images.unsplash.com/photo-1590246814883-57831168e243?q=80&w=800&auto=format&fit=crop", artist: "Rahul Varma", style: "Irezumi" },
];

const col2 = [
  { src: "https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=800&auto=format&fit=crop", artist: "Sneha Kapoor", style: "Biomechanical" },
  { src: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=800&auto=format&fit=crop", artist: "Vikram Das", style: "Watercolor" },
  { src: "https://images.unsplash.com/photo-1597405490028-2823d4b45a5a?q=80&w=800&auto=format&fit=crop", artist: "Zoya Khan", style: "Blackwork" },
  { src: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?q=80&w=800&auto=format&fit=crop", artist: "Aria Moon", style: "Floral" },
];

const col3 = [
  { src: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop", artist: "Leo Wolf", style: "Sketch" },
  { src: "https://images.unsplash.com/photo-1612459284970-e8f027596582?q=80&w=800&auto=format&fit=crop", artist: "Maya Sun", style: "Ornamental" },
  { src: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800&auto=format&fit=crop", artist: "Ivan Drago", style: "Portrait" },
  { src: "https://images.unsplash.com/photo-1590246814883-57831168e243?q=80&w=800&auto=format&fit=crop", artist: "Sasha Gray", style: "Linework" },
];

export const GallerySection = () => {
  return (
    <section className="bg-black py-24 overflow-hidden relative min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-20 text-center relative z-10">
        <h2 className="text-4xl md:text-8xl font-light tracking-[0.2em] uppercase text-white mb-6">
          The Wall
        </h2>
        <div className="w-24 h-px bg-cyan-500/50 mx-auto mb-6" />
        <p className="text-gray-500 tracking-[0.4em] uppercase text-sm max-w-2xl mx-auto leading-relaxed">
          Infinite stories told through ink and soul. A living, breathing portfolio of our finest masterpieces.
        </p>
      </div>

      <div className="flex flex-row gap-4 h-[800px] px-4 md:px-10">
        <InfiniteScrollingGallery 
          items={col1} 
          direction="down" 
          speed="normal" 
          className="flex-1"
        />
        <InfiniteScrollingGallery 
          items={col2} 
          direction="up" 
          speed="slow" 
          className="flex-1 hidden md:block"
        />
        <InfiniteScrollingGallery 
          items={col3} 
          direction="down" 
          speed="fast" 
          className="flex-1 hidden lg:block"
        />
      </div>

      <div className="py-20 text-center relative z-10">
        <Link href="/gallery" className="inline-block group relative">
          <span className="relative z-10 px-12 py-5 border border-white/10 text-white text-xs tracking-[0.4em] uppercase transition-all duration-700 group-hover:border-cyan-500/50 group-hover:bg-white group-hover:text-black font-medium">
            Explore All Masterpieces
          </span>
          <div className="absolute -inset-4 bg-cyan-500/10 scale-0 group-hover:scale-100 transition-transform duration-1000 rounded-full blur-3xl opacity-0 group-hover:opacity-100" />
        </Link>
      </div>
    </section>
  );
};
