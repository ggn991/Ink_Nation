"use client";

import React, { useEffect, useRef, useState } from "react";

export const CursorTrail: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const polylineRef = useRef<SVGPolylineElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const trail = useRef<{ x: number; y: number }[]>([]);
  
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update dot immediately for zero lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    let animationFrameId: number;

    const render = () => {
      // Lerp ring position
      const lerpFactor = 0.12;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      // Update trail
      trail.current.push({ ...mousePos.current });
      if (trail.current.length > 24) {
        trail.current.shift();
      }

      if (polylineRef.current) {
        const points = trail.current.map(p => `${p.x},${p.y}`).join(" ");
        polylineRef.current.setAttribute("points", points);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">

        {/* SVG Trail */}
        <svg className="h-full w-full">
          <defs>
            <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <polyline
            ref={polylineRef}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-50"
            style={{ 
              filter: "blur(0.5px)",
              // Ideally we'd fade the trail over its length. 
              // A simple polyline doesn't support varying opacity along the path easily.
              // But we'll keep it clean as requested.
            }}
          />
        </svg>

        {/* Inner Dot */}
        <div
          ref={dotRef}
          className="fixed left-0 top-0 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-transform duration-0"
        />

        {/* Outer Ring */}
        <div
          ref={ringRef}
          className={`fixed left-0 top-0 rounded-full border border-white/40 transition-all duration-300 ease-out ${
            isHovering 
              ? "h-14 w-14 shadow-[0_0_20px_rgba(180,100,255,0.4)] border-violet-400" 
              : "h-8 w-8"
          }`}
          style={{
            // Lerp is handled via JS for position, but scale/shadow via CSS classes
          }}
        />
      </div>
    </>
  );
};
