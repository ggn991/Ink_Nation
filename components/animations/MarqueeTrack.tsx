"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface MarqueeTrackProps {
  direction?: "left" | "right";
  speed?: string; // e.g. "30s"
  className?: string;
  children: React.ReactNode;
}

export const MarqueeTrack: React.FC<MarqueeTrackProps> = ({
  direction = "left",
  speed = "30s",
  className = "",
  children,
}) => {
  const directionClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className={cn("relative w-full overflow-hidden flex py-4", className)}>
      <div 
        className="flex whitespace-nowrap min-w-full shrink-0"
      >
        {/* Track 1 */}
        <div 
          className={cn("flex gap-6 shrink-0", directionClass)}
          style={{ animationDuration: speed }}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  );
};
