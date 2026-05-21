"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/utils/animations";

interface WordRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = "",
  as: Component = "h2",
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".reveal-word");
    if (words.length === 0) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        words,
        { y: "110%" },
        {
          y: "0%",
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, [text]);

  const wordsArray = text.split(" ");

  return (
    <Component ref={containerRef as any} className={`flex flex-wrap ${className}`}>
      {wordsArray.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="reveal-word inline-block transform translate-y-full">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
