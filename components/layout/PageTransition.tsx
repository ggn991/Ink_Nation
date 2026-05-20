"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/utils/animations";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Skip the wipe on the initial page load (only run on route changes)
    if (pathname === prevPathname.current) {
      return;
    }

    prevPathname.current = pathname;

    const tl = gsap.timeline({
      onComplete: () => {
        // Swap components when fully covered
        setDisplayChildren(children);
        // Slide out to reveal the new page
        gsap.to(overlay, {
          y: "-100%",
          duration: 0.5,
          ease: "power4.inOut",
          delay: 0.1,
        });
      }
    });

    // Reset overlay to bottom, then slide up to cover screen
    tl.set(overlay, { y: "100%" })
      .to(overlay, {
        y: "0%",
        duration: 0.5,
        ease: "power4.inOut",
      });

  }, [pathname, children]);

  // Keep displayChildren in sync with normal prop updates if needed
  useEffect(() => {
    if (pathname === prevPathname.current) {
      setDisplayChildren(children);
    }
  }, [children, pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-[#0A0A0A] z-[99999] pointer-events-none transform translate-y-full border-t border-cyan-400/50 shadow-[0_-20px_50px_rgba(0,240,255,0.15)]"
      />
      {displayChildren}
    </>
  );
};
