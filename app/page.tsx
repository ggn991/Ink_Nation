"use client";

import React from "react";
import { Hero } from "@/components/sections/home/Hero";
import { StatsBar } from "@/components/sections/home/StatsBar";
import { WhySection } from "@/components/sections/home/WhySection";
import { GalleryTeaser } from "@/components/sections/home/GalleryTeaser";
import { PlayReel } from "@/components/sections/home/PlayReel";
import { ArtistsRow } from "@/components/sections/home/ArtistsRow";
import { TestimonialsMarquee } from "@/components/sections/home/TestimonialsMarquee";
import { PricingTiers } from "@/components/sections/home/PricingTiers";
import { DualBranch } from "@/components/sections/home/DualBranch";
import { ConsultationForm } from "@/components/sections/home/ConsultationForm";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="relative bg-[#0A0A0A] min-h-screen text-white">
      {/* 1. Stacked Hero and ticker */}
      <Hero />

      {/* 2. Overlapping About/Stats row */}
      <StatsBar />

      {/* 3. Why Marquees advantages cards */}
      <WhySection />

      {/* 4. Column Masonry Portfolio teaser and Lightbox */}
      <GalleryTeaser />

      {/* 5. Custom cursor Play Reel and Fullscreen overlay player */}
      <PlayReel />

      {/* 6. Mobile swipe/Desktop grid Artist showcase cards */}
      <ArtistsRow />

      {/* 7. Infinite scrolling Client review testimonials */}
      <TestimonialsMarquee />

      {/* 8. Starting package prices cards */}
      <PricingTiers />

      {/* 9. Bangalore & Mysore details, embedded mockup map links */}
      <DualBranch />

      {/* 10. Multi-field custom consultation request sheet */}
      <ConsultationForm />

      {/* 11. Minimal Footer */}
      <Footer />
    </main>
  );
}
