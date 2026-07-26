"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { artists } from "@/lib/data/artists";
import { SectionHeading } from "@/components/sections/shared/SectionHeading";
import { Button } from "@/components/ui/Button";
import { gsap, ScrollTrigger } from "@/lib/utils/animations";

export const ArtistsRow = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = cardsRef.current;
    const track = trackRef.current;
    if (!section || !container || !track) return;

    const mm = gsap.matchMedia();

    const isMobile = () => typeof window !== "undefined" && window.innerWidth < 1024;

    const updateFocusState = () => {
      if (!isMobile()) return;
      const cards = container.querySelectorAll(".artist-card");
      const containerWidth = container.offsetWidth;
      const rect = container.getBoundingClientRect();
      const containerCenter = rect.left + containerWidth / 2;

      cards.forEach((cardEl) => {
        const card = cardEl as HTMLDivElement;
        const cardWidth = card.offsetWidth;
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardWidth / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        const maxDistance = containerWidth / 2;
        const ratio = Math.min(distance / maxDistance, 1);

        const scale = 1 - ratio * 0.1;
        const opacity = 1 - ratio * 0.55;

        gsap.to(card, {
          scale: scale,
          opacity: opacity,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    mm.add("(max-width: 1023px)", () => {
      // 1. Force horizontal layout to be clipped (scroll driven by GSAP trigger)
      container.style.overflowX = "hidden";
      container.classList.remove("overflow-x-auto");

      const getScrollAmount = () => {
        return track.scrollWidth - container.offsetWidth;
      };

      // 2. Pin the section and translate the container horizontally on scroll
      const trigger = ScrollTrigger.create({
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top -200px",
        end: () => `+=${getScrollAmount()}`,
        invalidateOnRefresh: true,
        onUpdate: () => {
          updateFocusState();
        }
      });

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: 1,
          start: "top -200px",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        }
      });

      return () => {
        // Revert styles and clear all GSAP inline scale/opacity properties
        container.style.overflowX = "";
        gsap.set(track, { x: 0 });
        const cards = container.querySelectorAll(".artist-card");
        gsap.set(cards, { scale: 1, opacity: 1, clearProps: "all" });
        trigger.kill();
      };
    });

    updateFocusState();

    container.addEventListener("scroll", updateFocusState, { passive: true });
    window.addEventListener("resize", updateFocusState, { passive: true });

    return () => {
      mm.revert();
      container.removeEventListener("scroll", updateFocusState);
      window.removeEventListener("resize", updateFocusState);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#050505] py-24 md:py-32 px-6 md:px-12 border-t border-white/5 relative overflow-hidden select-none">

      {/* Decorative glows */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-16 gap-6">
          <SectionHeading
            titleLine1="MEET THE"
            titleLine2="INK MASTERS"
            subtitle="THE CREW"
          />
          <div className="shrink-0 pt-4 md:pt-0">
            <Link href="/artists">
              <Button variant="outline">
                View all artists →
              </Button>
            </Link>
          </div>
        </div>

        {/* 5-Card Row: Mobile Swipe / Desktop Grid */}
        <div
          ref={cardsRef}
          className="overflow-x-auto lg:overflow-x-visible pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-none"
        >
          <div
            ref={trackRef}
            className="flex lg:grid lg:grid-cols-5 gap-6 snap-x snap-mandatory scroll-pl-6"
          >
          {artists.map((artist, idx) => (
            <div
              key={artist.id}
              className="artist-card snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-auto bg-zinc-950/80 border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-[#00f0ff]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] transition-all duration-300 relative overflow-hidden group"
            >
              <div>
                {/* Visual Artist frame */}
                <div
                  className="relative w-full aspect-square rounded-xl overflow-hidden mb-5 border border-white/5 transition-all duration-500"
                >
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>

                {/* Info */}
                <span className="text-[8px] font-mono tracking-widest text-[#00f0ff] uppercase block mb-1">
                  {artist.specialty}
                </span>
                <h4 className="text-lg sm:text-xl font-bold uppercase text-white tracking-wider group-hover:text-[#00f0ff] transition-colors">
                  {artist.name}
                </h4>
                <p className="text-zinc-500 text-xs font-light mt-1 mb-5">
                  {artist.experience}
                </p>

                {/* 3 Portfolio preview thumbs (layered slightly) */}
                <div className="flex space-x-2.5 mb-6">
                  {artist.portfolio.slice(0, 3).map((work, wIdx) => (
                    <div
                      key={work.id}
                      className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0"
                    >
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover object-center hover:scale-115 transition-transform duration-300"
                        sizes="48px"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action row */}
              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <a
                  href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-[9px] font-mono tracking-widest uppercase text-zinc-500 hover:text-white transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>{artist.instagram}</span>
                </a>

                <Link
                  href={`/artists/${artist.slug}`}
                  className="text-[#00f0ff] text-[9px] font-mono tracking-widest uppercase hover:underline cursor-pointer"
                >
                  VIEW WORK →
                </Link>
              </div>

            </div>
            ))}
            <div className="w-6 shrink-0 lg:hidden" />
          </div>
        </div>

      </div>
    </section>
  );
};
export default ArtistsRow;
