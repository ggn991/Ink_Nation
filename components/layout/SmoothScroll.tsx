"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/utils/animations";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Initialize Lenis scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll updates with GSAP global ticker
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    // Set scroll-behavior to auto in HTML/body to prevent collisions
    document.documentElement.style.scrollBehavior = "auto";

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
