import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Helper to run GSAP animations only if the user hasn't requested reduced motion.
 */
export const runWithReducedMotionCheck = (animationCallback: () => void) => {
  if (typeof window === "undefined") return;
  
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    animationCallback();
    return () => {
      // Cleanup will happen automatically inside the matchMedia block
    };
  });
};

export { gsap, ScrollTrigger };
