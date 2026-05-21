"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Heart, MessageCircle } from "lucide-react";

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

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  { id: 1, name: "Arjun Mehta", location: "Bangalore", rating: 5, text: "Absolutely stunning realism work by Kushal! The hygiene standards are top-notch, felt like a surgical room. 10/10 recommendation.", date: "2 days ago" },
  { id: 2, name: "Nivedita Rao", location: "Mysore", rating: 5, text: "Got my industrial piercing done. Zero pain, extreme precision by Ricky, and they tracked my aftercare for 4 weeks. Unmatched quality!", date: "1 week ago" },
  { id: 3, name: "Sarah D'Souza", location: "Bangalore", rating: 5, text: "The electric blue vibes of the studio are so energetic! The custom tattoo they designed for me is a masterpiece.", date: "3 days ago" },
  { id: 4, name: "Vikram Sen", location: "Mysore", rating: 5, text: "6000+ tattoos completed and it shows. The artists are true visual illustrators. Hands down the best tattoo studio in Karnataka.", date: "2 weeks ago" },
  { id: 5, name: "Rohan Das", location: "Bangalore", rating: 5, text: "Very friendly artists who spent 2 hours co-creating the custom script on my arm. The sterile protocols are pristine.", date: "5 days ago" },
];

export const ReviewMarquee = () => {
  return (
    <section className="bg-zinc-950/40 py-16 border-y border-white/5 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-2">Verified Reviews</h4>
        <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-white">
          Loved by <span className="text-[#00f0ff] font-semibold">1,850+ Believers</span>
        </h3>
      </div>

      {/* Infinite Scrolling Marquee Container */}
      <div className="relative w-full flex items-center justify-start overflow-x-hidden">
        {/* Left and Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        {/* Double-listed review tracks for seamless infinite looping */}
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...reviews, ...reviews].map((review, idx) => (
            <div 
              key={`${review.id}-${idx}`}
              className="inline-block w-[350px] bg-zinc-950/80 border border-white/5 p-6 rounded-3xl backdrop-blur-md whitespace-normal group hover:border-[#00f0ff]/30 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{review.name}</h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{review.location} Studio</p>
                </div>
                <div className="flex gap-0.5 text-[#00f0ff]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed italic mb-3">
                "{review.text}"
              </p>
              <span className="text-[9px] text-zinc-600 uppercase tracking-wider font-mono">{review.date} via Justdial</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InstagramGrid = () => {
  const instagramPosts = [
    { id: 1, src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600", likes: "1,420", comments: "56" },
    { id: 2, src: "https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=600", likes: "2,105", comments: "89" },
    { id: 3, src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=600", likes: "982", comments: "34" },
    { id: 4, src: "https://images.unsplash.com/photo-1590246814883-57831168e243?q=80&w=600", likes: "1,750", comments: "42" },
    { id: 5, src: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=600", likes: "2,390", comments: "112" },
    { id: 6, src: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?q=80&w=600", likes: "1,120", comments: "28" },
    { id: 7, src: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=600", likes: "1,880", comments: "67" },
    { id: 8, src: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=600", likes: "3,450", comments: "184" },
    { id: 9, src: "https://images.unsplash.com/photo-1612459284970-e8f027596582?q=80&w=600", likes: "1,560", comments: "49" },
  ];

  return (
    <section className="bg-black py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">Social Feed</h4>
          <h2 className="text-4xl md:text-5xl font-light tracking-[0.2em] uppercase text-white mb-4">
            Follow Our Culture
          </h2>
          <a 
            href="https://instagram.com/ink_nation_tattooz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light text-[#00f0ff] tracking-widest uppercase hover:underline inline-flex items-center gap-2 mb-8"
          >
            <InstagramIcon className="w-4 h-4" /> @ink_nation_tattooz
          </a>
        </div>

        {/* 9-Image Editorial Feed Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-4xl mx-auto rounded-3xl overflow-hidden p-2 bg-zinc-950 border border-white/5">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/ink_nation_tattooz"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group bg-black"
            >
              <img 
                src={post.src}
                alt="Ink Nation Instagram Post"
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white">
                <InstagramIcon className="w-5 h-5 text-[#00f0ff] mb-1" />
                <div className="flex gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 fill-current text-rose-500" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 fill-current text-cyan-400" /> {post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Dynamic Join Instagram Capsule Button */}
        <div className="mt-12 text-center">
          <a 
            href="https://instagram.com/ink_nation_tattooz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="group px-10 py-4 bg-transparent border border-white/10 hover:border-[#00f0ff] text-white rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-500 hover:bg-[#00f0ff] hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer active:scale-95">
              Join the Nation on Instagram
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export const CanvasBanner = () => {
  return (
    <section className="bg-zinc-950 py-32 border-t border-white/5 relative overflow-hidden px-6 text-center">
      {/* Heavy electric blue glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-cyan-500/[0.04] blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h2 className="text-5xl md:text-8xl font-extralight tracking-[0.2em] uppercase leading-none text-white select-none">
            Your Skin is <br className="hidden md:block"/>
            the <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-cyan-500">Canvas</span>
          </h2>
          <p className="text-zinc-500 uppercase tracking-[0.4em] text-xs font-semibold pt-4">
            We Make You A Believer
          </p>
        </motion.div>
      </div>
    </section>
  );
};
