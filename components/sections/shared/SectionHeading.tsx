"use client";

import React from "react";
import { WordReveal } from "@/components/animations/WordReveal";

interface SectionHeadingProps {
  titleLine1: string;
  titleLine2?: string;
  subtitle?: string;
  center?: boolean;
  size?: "default" | "small";
}

const HeadingLine: React.FC<{
  text: string;
  colorClass: string;
  center: boolean;
  size?: "default" | "small";
}> = ({ text, colorClass, center, size = "default" }) => {
  const wordsArray = text.split(" ");
  const sizeClasses = size === "small"
    ? "text-[1.5rem] sm:text-[2.6rem] md:text-[3.8rem] lg:text-[4.5rem] xl:text-[5rem]"
    : "text-[1.8rem] sm:text-[3.5rem] md:text-[5.2rem] lg:text-[7rem] xl:text-[8rem]";
  
  return (
    <div className={`grid grid-cols-1 grid-rows-1 ${center ? "justify-items-center text-center" : "justify-items-start text-left"} w-full`}>
      {/* Background outline/shadow text - using exact same element and word wrapping container structure */}
      <h2 
        className={`col-start-1 row-start-1 w-full max-w-full uppercase font-black tracking-tighter leading-[1.05] select-none pointer-events-none flex flex-wrap ${sizeClasses}`}
        style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.08)", color: "transparent" }}
        aria-hidden="true"
      >
        {wordsArray.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <span className="inline-block">
              {word}
            </span>
          </span>
        ))}
      </h2>

      {/* Foreground text, offset slightly - using exact same tag and position for perfect wrapping synchronization */}
      <WordReveal
        text={text}
        as="h2"
        className={`${colorClass} col-start-1 row-start-1 w-full max-w-full relative z-10 translate-x-[2px] translate-y-[1px] sm:translate-x-[4px] sm:translate-y-[3px] uppercase font-black tracking-tighter leading-[1.05] ${sizeClasses}`}
      />
    </div>
  );
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  titleLine1,
  titleLine2,
  subtitle,
  center = false,
  size = "default",
}) => {
  return (
    <div className={`mb-12 md:mb-16 lg:mb-20 ${center ? "flex flex-col items-center text-center" : "text-left"}`}>
      {subtitle && (
        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#00f0ff] uppercase block mb-4 animate-pulse">
          {subtitle}
        </span>
      )}
      
      <div className={`flex flex-col gap-4 md:gap-6 w-full ${center ? "items-center" : "items-start"}`}>
        <HeadingLine text={titleLine1} colorClass="text-white" center={center} size={size} />
        {titleLine2 && (
          <HeadingLine text={titleLine2} colorClass="text-[#00f0ff]" center={center} size={size} />
        )}
      </div>
    </div>
  );
};

