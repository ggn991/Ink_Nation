import React from "react";

export const ComingSoonBadge = () => {
  return (
    <div className="absolute top-3 right-3 z-20 pointer-events-none select-none">
      <span className="inline-block bg-cyan-500/10 text-cyan-400 text-[10px] tracking-[0.2em] font-medium uppercase px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-500/5 animate-pulse">
        Coming Soon
      </span>
    </div>
  );
};
