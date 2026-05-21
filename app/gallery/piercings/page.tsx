"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/layout/footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryData = [
  { id: 1, src: "https://images.unsplash.com/photo-1620822606560-642512f45ea2?q=80&w=800&auto=format&fit=crop", artist: "Elena Rust", style: "Industrial" },
  { id: 2, src: "https://images.unsplash.com/photo-1594916301323-7db043e0d869?q=80&w=800&auto=format&fit=crop", artist: "Maya Sun", style: "Curated Ear" },
  { id: 3, src: "https://images.unsplash.com/photo-1610992383201-9c6061be174d?q=80&w=800&auto=format&fit=crop", artist: "Zoya Khan", style: "Symmetry" },
  { id: 4, src: "https://images.unsplash.com/photo-1531238965005-eb8d35091ff6?q=80&w=800&auto=format&fit=crop", artist: "Leo Wolf", style: "Minimalist" },
  { id: 5, src: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800&auto=format&fit=crop", artist: "Aria Moon", style: "Avant-Garde" },
  { id: 6, src: "https://plus.unsplash.com/premium_photo-1661645479017-d2ce0cff8863?q=80&w=800&auto=format&fit=crop", artist: "Sasha Gray", style: "Facial Anatomy" },
];

export default function PiercingsGalleryPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 0. Base Centering (Removed X translation as it's now handled by CSS left-0 w-full)
      gsap.set(".gallery-img", { yPercent: 0 });

      // 1. Surgical Reveal Animation (Clip Path Mask + Vertical Slide)
      gsap.utils.toArray(".gallery-grid-item").forEach((item: any) => {
        const container = item.querySelector(".gallery-img-container");
        const innerImg = item.querySelector(".gallery-img");
        
        gsap.fromTo(container, 
          { clipPath: "inset(100% 0% 0% 0%)" },
          { 
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );

        gsap.fromTo(innerImg,
          { y: 30, scale: 1.15 },
          { 
            y: 0, 
            scale: 1,
            duration: 2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });

      // 2. Ongoing Scroll Parallax (Balanced move around the -50% center)
      gsap.utils.toArray(".gallery-img").forEach((img: any) => {
        gsap.fromTo(img, 
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              scrub: true,
              start: "top bottom",
              end: "bottom top"
            }
          }
        );
      });

      // 3. Header Split Reveal
      gsap.from(".gallery-title span", {
        y: 120,
        opacity: 0,
        rotateX: -45,
        stagger: 0.15,
        duration: 1.8,
        ease: "expo.out"
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // 4. Ultra-Smooth Magnetic 3D Mouse-Follow Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget;
    const img = item.querySelector(".gallery-img") as HTMLImageElement;
    const rect = item.getBoundingClientRect();
    
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    
    const x = relX * 0.15;
    const y = relY * 0.15;
    const rotateX = relY * -0.06;
    const rotateY = relX * 0.06;
    
    gsap.to(img, {
      x: x,
      y: y,
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.15,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget;
    const img = item.querySelector(".gallery-img") as HTMLImageElement;
    
    gsap.to(img, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <main ref={mainRef} className="bg-black pt-48 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 min-h-[calc(100vh-12rem)] flex flex-col justify-center pb-24">
        <h1 className="gallery-title text-7xl md:text-[10rem] font-light tracking-tighter text-white flex flex-col leading-[0.9]">
          <div className="overflow-hidden h-fit">
            <span className="inline-block">MASTERPIECE</span>
          </div>
          <div className="overflow-hidden h-fit">
            <span className="inline-block text-gray-500 italic ml-12 md:ml-32">PIERCINGS</span>
          </div>
        </h1>
        <p className="mt-12 max-w-2xl text-gray-400 text-lg md:text-xl font-light leading-relaxed border-l border-white/20 pl-8">
          The fine art of anatomy and adornment. We curate piercing experiences using the highest grade materials and surgical precision.
        </p>
      </div>

      <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-white/10 bg-black leading-[0]">
        {galleryData.map((item) => (
          <div 
            key={item.id} 
            className="gallery-grid-item group relative overflow-hidden aspect-[3/4] bg-black"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
          >
            <div className="gallery-img-container absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
              <img 
                src={item.src} 
                alt={item.artist}
                className="gallery-img block absolute top-[-30%] left-0 w-full h-[160%] object-cover object-center pointer-events-none grayscale transition-[filter] duration-700 group-hover:grayscale-0"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="py-60 text-center bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
        <h2 className="text-5xl md:text-8xl text-white font-light tracking-tighter mb-16 relative z-10">CURATE YOUR LOOK.</h2>
        <button className="group relative px-16 py-6 bg-white text-black font-semibold tracking-widest uppercase overflow-hidden transition-all duration-500 hover:bg-zinc-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer active:scale-95 z-10">
          <span className="relative z-10">Book Consultation</span>
        </button>
      </div>

      <Footer />
    </main>
  );
}
