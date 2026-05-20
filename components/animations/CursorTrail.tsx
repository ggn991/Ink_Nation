"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/utils/animations";

interface CursorPoint {
  x: number;
  y: number;
}

export const CursorTrail: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const circlesRef = useRef<HTMLDivElement[]>([]);
  const coords = useRef<CursorPoint>({ x: 0, y: 0 });
  const points = useRef<CursorPoint[]>(Array.from({ length: 8 }, () => ({ x: 0, y: 0 })));
  const isHovering = useRef(false);
  const hasMoved = useRef(false);

  useEffect(() => {
    // Only enable on desktop/non-touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved.current) {
        hasMoved.current = true;
        // Snap all trailing circles to the cursor initially to prevent starting at (0,0)
        points.current.forEach((pt) => {
          pt.x = e.clientX;
          pt.y = e.clientY;
        });
      }
      coords.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest?.('a, button, [role="button"], input, select, textarea, .cursor-hover')) {
        isHovering.current = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement;
      const wasInteractive = target?.closest?.('a, button, [role="button"], input, select, textarea, .cursor-hover');
      const isInteractive = related?.closest?.('a, button, [role="button"], input, select, textarea, .cursor-hover');
      if (wasInteractive && !isInteractive) {
        isHovering.current = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });

    // GSAP main loop tick for smooth physics tracking
    const updateTrail = () => {
      if (!hasMoved.current) return;

      const px = coords.current.x;
      const py = coords.current.y;

      points.current.forEach((pt, idx) => {
        const next = idx === 0 ? coords.current : points.current[idx - 1];
        
        // Lerp coordinates. When hovering, they merge into one point quickly
        const lerpFactor = isHovering.current ? 0.45 : 0.25 - idx * 0.015;
        pt.x += (next.x - pt.x) * lerpFactor;
        pt.y += (next.y - pt.y) * pt.y * 0; // standard y tracking
        pt.y += (next.y - pt.y) * lerpFactor;

        const circleEl = circlesRef.current[idx];
        if (circleEl) {
          // Calculate scale. Front circles are larger, back circles scale down
          let scale = 1.0 - idx * 0.1;
          if (isHovering.current) {
            // Merge overlay: first circle is large, others shrink to 0
            scale = idx === 0 ? 3.5 : 0;
          }

          gsap.set(circleEl, {
            x: pt.x - 6, // center it
            y: pt.y - 6,
            scale: scale,
          });
        }
      });
    };

    gsap.ticker.add(updateTrail);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      gsap.ticker.remove(updateTrail);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] mix-blend-difference">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) circlesRef.current[idx] = el;
          }}
          className="absolute w-3 h-3 bg-white rounded-full transition-shadow duration-300"
          style={{
            // Base style: scale down towards the back, difference mix blending handles color inversion
            transformOrigin: "center center",
          }}
        />
      ))}
    </div>
  );
};
export default CursorTrail;
