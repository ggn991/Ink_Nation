"use client";

import React from "react";
import { Star } from "lucide-react";
import { MarqueeTrack } from "@/components/animations/MarqueeTrack";
import { SectionHeading } from "@/components/sections/shared/SectionHeading";

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

export const TestimonialsMarquee = () => {
  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden border-t border-white/5 relative select-none">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <SectionHeading 
          titleLine1="WHAT THEY SAY" 
          titleLine2="THE REVIEWS" 
          subtitle="CLIENT VOICE" 
        />
      </div>

      {/* Infinite scrolling testimonials track */}
      <div className="relative w-full flex items-center justify-start">
        {/* Left and Right Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <MarqueeTrack direction="left" speed="32s" className="py-2">
          {reviews.map((review, idx) => (
            <div 
              key={`${review.id}-${idx}`}
              className="inline-block w-[320px] sm:w-[360px] bg-zinc-950/70 border border-white/5 p-6 rounded-2xl backdrop-blur-md whitespace-normal group hover:border-[#00f0ff]/30 transition-all duration-500 hover:-translate-y-1 mr-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider group-hover:text-[#00f0ff] transition-colors">{review.name}</h4>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest">{review.location} Studio</p>
                </div>
                <div className="flex gap-0.5 text-[#00f0ff]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed italic mb-4">
                "{review.text}"
              </p>
              <span className="text-[8px] text-zinc-600 uppercase tracking-wider font-mono">{review.date} via Google Maps</span>
            </div>
          ))}
        </MarqueeTrack>
      </div>

    </section>
  );
};
export default TestimonialsMarquee;
