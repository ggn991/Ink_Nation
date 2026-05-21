"use client";

import React from "react";
import { MapPin, Clock, Phone, MessageSquare, Star, Map } from "lucide-react";
import { SectionHeading } from "@/components/sections/shared/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { branches } from "@/lib/data/branches";

export const DualBranch = () => {
  return (
    <section className="bg-[#050505] py-24 md:py-32 px-6 md:px-12 border-t border-white/5 relative select-none">
      
      {/* Background glow */}
      <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          titleLine1="VISIT OUR" 
          titleLine2="PREMIUM STUDIOS" 
          subtitle="LOCATIONS" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {branches.map((branch, idx) => (
            <Card 
              key={branch.id} 
              glow={idx === 0} 
              className="flex flex-col justify-between p-8 rounded-2xl min-h-[550px] space-y-6"
            >
              <div className="space-y-5">
                {/* Card Title */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] font-semibold text-zinc-500 uppercase block mb-1">
                      📍 {branch.city} BRANCH
                    </span>
                    <h3 className="text-2xl font-light text-white uppercase tracking-wider">
                      {branch.name}
                    </h3>
                  </div>

                  {/* Ratings badge */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-[#00f0ff] gap-1 font-mono text-sm font-bold">
                      <span>{branch.rating.toFixed(1)}</span>
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className="text-[9px] text-zinc-500 uppercase font-mono tracking-tighter">
                      {branch.reviewCount} Reviews
                    </span>
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-4 pt-2">
                  {/* Address */}
                  <div className="flex items-start space-x-3 text-xs sm:text-sm text-zinc-400 font-light">
                    <MapPin className="w-5 h-5 text-[#00f0ff] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{branch.address}</p>
                  </div>
                  {/* Hours */}
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-zinc-400 font-light">
                    <Clock className="w-5 h-5 text-[#00f0ff] shrink-0" />
                    <p>Open daily: <strong className="text-white font-medium">{branch.hours}</strong></p>
                  </div>
                  {/* Phone */}
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-zinc-400 font-light">
                    <Phone className="w-5 h-5 text-[#00f0ff] shrink-0" />
                    <p>Call Studio: <a href={`tel:${branch.phone}`} className="text-white font-mono hover:text-[#00f0ff] hover:underline font-medium">{branch.phone}</a></p>
                  </div>
                </div>

                {/* Simulated Interactive Map target box */}
                <a 
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full h-40 rounded-xl overflow-hidden border border-white/5 hover:border-[#00f0ff]/30 group/map transition-all duration-300 shadow-inner"
                >
                  {/* Map Backdrop visual from Unsplash */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale opacity-30 group-hover:opacity-50 group-hover:scale-103 transition-all duration-700"
                    style={{
                      backgroundImage: `url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop")`
                    }}
                  />
                  {/* Electric blue overlay lines */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent z-10" />

                  {/* Pin Indicator */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 space-y-2 pointer-events-none">
                    <div className="w-10 h-10 bg-[#00f0ff]/10 border border-[#00f0ff] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] animate-bounce">
                      <MapPin className="w-5 h-5 text-[#00f0ff]" />
                    </div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-white bg-zinc-950/80 px-3 py-1 rounded-full border border-white/10 select-none">
                      OPEN IN GOOGLE MAPS
                    </span>
                  </div>
                </a>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 shrink-0">
                <a 
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow inline-block"
                >
                  <Button variant="primary" className="w-full">
                    <Map className="w-4 h-4" />
                    <span>Get Directions</span>
                  </Button>
                </a>
                <a 
                  href={branch.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow inline-block"
                >
                  <Button variant="outline" className="w-full border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-400">
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>WhatsApp</span>
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
export default DualBranch;
