"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/utils/animations";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  magnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  magnetic = true,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn || !magnetic) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;
      const distanceX = e.clientX - btnX;
      const distanceY = e.clientY - btnY;
      const distance = Math.hypot(distanceX, distanceY);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (distance < 80) {
          // Translate toward cursor by 30% of distance
          gsap.to(btn, {
            x: distanceX * 0.3,
            y: distanceY * 0.3,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          // Return to normal
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        }
      });
    };

    const onMouseLeave = () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    btn.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      btn.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [magnetic]);

  const baseStyles = "px-6 py-3 md:px-8 md:py-3.5 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 relative overflow-hidden inline-flex items-center justify-center border select-none active:scale-95 cursor-pointer";

  const variants = {
    primary: "bg-white text-black border-white hover:bg-[#00f0ff] hover:text-black hover:border-[#00f0ff] shadow-md shadow-white/5 hover:shadow-[#00f0ff]/20",
    secondary: "bg-transparent text-white border-white/20 hover:border-[#00f0ff] hover:text-[#00f0ff]",
    outline: "bg-transparent text-[#00f0ff] border-[#00f0ff]/30 hover:border-[#00f0ff] hover:bg-[#00f0ff]/5",
  };

  return (
    <button
      ref={buttonRef}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};
export default Button;
