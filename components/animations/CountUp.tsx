"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number; // in milliseconds
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountAnimation();
        }
      },
      { threshold: 0.1 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [end, duration]);

  const startCountAnimation = () => {
    let startTimestamp: number | null = null;

    const easeOutQuad = (t: number) => t * (2 - t);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const progressRatio = Math.min(progress / duration, 1);
      const easedProgress = easeOutQuad(progressRatio);
      
      const currentValue = easedProgress * end;
      setCount(currentValue);

      if (progressRatio < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <span ref={elementRef} className="font-extralight tabular-nums">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};
