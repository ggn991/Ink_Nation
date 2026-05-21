"use client";

import { HeroSection } from "@/components/ui/hero-odyssey";
import { AboutSection } from "@/components/sections/about";
import { ArtistsSection } from "@/components/sections/artists";
import { GallerySection } from "@/components/sections/gallery";
import { WhySection } from "@/components/sections/why";
import { PricingSection } from "@/components/sections/pricing";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <ArtistsSection />
      <GallerySection />
      <WhySection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
