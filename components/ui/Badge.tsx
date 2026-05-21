import React from "react";
import { cn } from "@/lib/utils/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "soon" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseStyles = "inline-block text-[9px] md:text-[10px] tracking-[0.2em] font-medium uppercase px-3 py-1 rounded-full border backdrop-blur-md select-none";

  const variants = {
    primary: "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30 shadow-[0_0_10px_rgba(0,240,255,0.05)]",
    secondary: "bg-white/5 text-white/80 border-white/10",
    soon: "bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse",
    outline: "bg-transparent text-[#00f0ff] border-[#00f0ff]/20",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
export default Badge;
