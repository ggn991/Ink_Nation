"use client";

import React from "react";
import { MapPin, Clock, Phone, MessageSquare, Star, Map } from "lucide-react";
import { SectionHeading } from "@/components/sections/shared/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { branches } from "@/lib/data/branches";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.71-.518-5.253-1.417l-.376-.222-3.903 1.023 1.041-3.805-.246-.391c-1.002-1.593-1.53-3.447-1.53-5.352 0-5.428 4.417-9.845 9.846-9.845 2.628 0 5.098 1.023 6.955 2.882 1.858 1.859 2.88 4.329 2.88 6.957 0 5.429-4.417 9.846-9.847 9.846m0-21.7c-6.539 0-11.858 5.32-11.858 11.857 0 2.09.544 4.133 1.579 5.926l-1.677 6.126 6.269-1.644c1.723.939 3.67 1.435 5.684 1.435 6.541 0 11.86-5.32 11.86-11.857 0-3.167-1.233-6.145-3.473-8.384-2.24-2.24-5.216-3.473-8.384-3.473" />
  </svg>
);

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
              <div className="space-y-3 pt-4 shrink-0">
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="primary" className="w-full text-xs px-2">
                      <Map className="w-4 h-4 shrink-0" />
                      <span>Get Directions</span>
                    </Button>
                  </a>
                  <a 
                    href={branch.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5 hover:border-emerald-400 text-xs px-2">
                      <WhatsAppIcon className="w-4 h-4 shrink-0" />
                      <span>WhatsApp</span>
                    </Button>
                  </a>
                </div>
                <a 
                  href={`tel:${branch.phone}`}
                  className="block w-full"
                >
                  <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 text-xs px-4">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>Call Studio: {branch.phone}</span>
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
