"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils"; // If lib/utils doesn't exist, I'll use a simple fallback

export const InfiniteScrollingGallery = ({
  items,
  direction = "down",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: { src: string; artist: string; style: string }[];
  direction?: "up" | "down";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "down") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "70s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 h-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex min-h-full shrink-0 flex-col gap-6 py-4 w-full will-change-transform",
          start && "animate-scroll-vertical",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ transform: "translateZ(0)" }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group relative w-full aspect-[4/5] md:aspect-square lg:aspect-[3/4] overflow-hidden bg-zinc-900 rounded-xl border border-white/5"
          >
            <img
              src={item.src}
              alt={item.artist}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
