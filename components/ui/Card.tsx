import React from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hoverGlow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  glow = false,
  hoverGlow = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-zinc-950/80 border border-white/5 p-6 backdrop-blur-md transition-all duration-300",
        glow && "border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.08)]",
        hoverGlow && "hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(0,240,255,0.12)] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {/* Decorative grain/glass overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export default Card;
