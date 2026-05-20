"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/sections/shared/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Lightbox } from "@/components/ui/Lightbox";

interface TeaserImage {
  url: string;
  category: "Tattoos" | "Piercings" | "Nail Art" | "Rework / Removal";
  artist: string;
  style: string;
  title: string;
}

const teaserImages: TeaserImage[] = [
  {
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600",
    category: "Tattoos",
    artist: "Kushal",
    style: "Realism",
    title: "Hyper-realistic Sleeve"
  },
  {
    url: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=600",
    category: "Tattoos",
    artist: "Ricky",
    style: "Geometry",
    title: "Fine line Mandala"
  },
  {
    url: "https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=600",
    category: "Tattoos",
    artist: "Arjun",
    style: "Traditional",
    title: "Bold Tiger Sketch"
  },
  {
    url: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=600",
    category: "Piercings",
    artist: "Meera",
    style: "Helix Piercing",
    title: "Triple Cartilage Studs"
  },
  {
    url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600",
    category: "Nail Art",
    artist: "Dev",
    style: "Abstract Nails",
    title: "Electric Blue Holographic Nails"
  },
  {
    url: "https://images.unsplash.com/photo-1590246814883-57831168e243?q=80&w=600",
    category: "Tattoos",
    artist: "Kushal",
    style: "Blackwork",
    title: "Abstract Blackout Arm"
  },
  {
    url: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=600",
    category: "Tattoos",
    artist: "Ricky",
    style: "Script",
    title: "Custom Calligraphy Script"
  },
  {
    url: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=600",
    category: "Rework / Removal",
    artist: "Vikram",
    style: "Laser Removal",
    title: "Laser Tattoo Fading"
  },
  {
    url: "https://images.unsplash.com/photo-1597405490028-2823d4b45a5a?q=80&w=600",
    category: "Tattoos",
    artist: "Arjun",
    style: "Japanese Traditional",
    title: "Cherry Blossom Dragon"
  },
  {
    url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600",
    category: "Nail Art",
    artist: "Dev",
    style: "Minimal Nail Art",
    title: "Chrome French Tips"
  },
  {
    url: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=600",
    category: "Tattoos",
    artist: "Meera",
    style: "Watercolor",
    title: "Delicate Phoenix Splash"
  },
  {
    url: "https://images.unsplash.com/photo-1612459284970-e8f027596582?q=80&w=600",
    category: "Rework / Removal",
    artist: "Vikram",
    style: "Rework Coverup",
    title: "Traditional Skull Coverup"
  }
];

export const GalleryTeaser = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openLightbox = (idx: number) => {
    setActiveImageIndex(idx);
    setLightboxOpen(true);
  };

  const lightboxFormatImages = teaserImages.map(img => ({
    url: img.url,
    title: img.title,
    artist: img.artist,
    style: `${img.category} | ${img.style}`
  }));

  // Map images with their original index to preserve correct mapping in the lightbox
  const mappedImages = teaserImages.map((img, index) => ({
    ...img,
    originalIndex: index
  }));

  // Distribute images evenly across 3 columns
  const col1 = mappedImages.filter((_, index) => index % 3 === 0);
  const col2 = mappedImages.filter((_, index) => index % 3 === 1);
  const col3 = mappedImages.filter((_, index) => index % 3 === 2);

  // Duplicate arrays once for seamless infinite loop scroll
  const col1Repeated = [...col1, ...col1];
  const col2Repeated = [...col2, ...col2];
  const col3Repeated = [...col3, ...col3];

  return (
    <section className="bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white/5 relative select-none overflow-hidden">
      
      {/* Inject custom high-performance keyframes and edge fading mask styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes verticalScrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes verticalScrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-vertical-up {
          animation: verticalScrollUp var(--scroll-duration, 30s) linear infinite;
        }
        .animate-vertical-down {
          animation: verticalScrollDown var(--scroll-duration, 30s) linear infinite;
        }
        /* Pauses only the specific column being hovered */
        .animate-vertical-up:hover,
        .animate-vertical-down:hover {
          animation-play-state: paused;
        }
        /* Top & Bottom elegant transparency edge fade mask */
        .marquee-mask {
          mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
        }
      `}} />

      {/* Background radial cyan ambient glow */}
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading 
            titleLine1="EXPLORE OUR" 
            titleLine2="EXTENSIVE PORTFOLIO" 
            subtitle="THE ARTWORK" 
          />
          <div className="shrink-0 pt-4 md:pt-0">
            <Link href="/gallery">
              <Button variant="outline">
                View full gallery →
              </Button>
            </Link>
          </div>
        </div>

        {/* 3-Column Vertical Infinite Moving Grid */}
        <div className="marquee-container marquee-mask grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[700px] md:h-[800px] overflow-hidden relative">
          
          {/* Column 1 - Scrolls Upwards */}
          <div 
            className="flex flex-col gap-6 animate-vertical-up"
            style={{ "--scroll-duration": "35s" } as React.CSSProperties}
          >
            {col1Repeated.map((img, idx) => (
              <div
                key={`col1-${idx}`}
                onClick={() => openLightbox(img.originalIndex)}
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00f0ff]/30 shadow-lg hover:shadow-[0_12px_30px_rgba(0,240,255,0.12)] cursor-pointer group transition-all duration-500 hover:-translate-y-1 block bg-zinc-900"
              >
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 hover:scale-[1.03] transition-all duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={idx < 2}
                />
              </div>
            ))}
          </div>

          {/* Column 2 - Scrolls Downwards */}
          <div 
            className="hidden md:flex flex-col gap-6 animate-vertical-down"
            style={{ "--scroll-duration": "38s" } as React.CSSProperties}
          >
            {col2Repeated.map((img, idx) => (
              <div
                key={`col2-${idx}`}
                onClick={() => openLightbox(img.originalIndex)}
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00f0ff]/30 shadow-lg hover:shadow-[0_12px_30px_rgba(0,240,255,0.12)] cursor-pointer group transition-all duration-500 hover:-translate-y-1 block bg-zinc-900"
              >
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 hover:scale-[1.03] transition-all duration-700 ease-out"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  priority={idx < 2}
                />
              </div>
            ))}
          </div>

          {/* Column 3 - Scrolls Upwards */}
          <div 
            className="hidden lg:flex flex-col gap-6 animate-vertical-up"
            style={{ "--scroll-duration": "32s" } as React.CSSProperties}
          >
            {col3Repeated.map((img, idx) => (
              <div
                key={`col3-${idx}`}
                onClick={() => openLightbox(img.originalIndex)}
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00f0ff]/30 shadow-lg hover:shadow-[0_12px_30px_rgba(0,240,255,0.12)] cursor-pointer group transition-all duration-500 hover:-translate-y-1 block bg-zinc-900"
              >
                <Image
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 hover:scale-[1.03] transition-all duration-700 ease-out"
                  sizes="33vw"
                  priority={idx < 2}
                />
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Lightbox Module */}
      <Lightbox
        images={lightboxFormatImages}
        initialIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

    </section>
  );
};

export default GalleryTeaser;
