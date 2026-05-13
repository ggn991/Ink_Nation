"use client";

import React, { useEffect, useRef } from "react";

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const trail = useRef<{ x: number; y: number }[]>([]);
  const trailLength = 40; // Balanced length for fluid ink motion

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      // Update trail
      trail.current.push({ ...mousePos.current });
      if (trail.current.length > trailLength) {
        trail.current.shift();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (trail.current.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "white"; 
        ctx.globalAlpha = 0.8; // Soften the entire trail

        
        // To avoid "dots" in the trail, we draw segments without per-segment alpha.
        // The tapering width handles the ink-stroke aesthetic.
        for (let i = 0; i < trail.current.length - 1; i++) {
          const p1 = trail.current[i];
          const p2 = trail.current[i + 1];
          
          // Smoothly taper from 8px at the head to 0.5px at the tail
          const progress = i / trail.current.length;
          const width = progress * 8;
          
          if (width > 0.1) {
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw the main cursor dot at the very tip (most recent position)
        ctx.globalAlpha = 1.0;
        const head = trail.current[trail.current.length - 1];

        ctx.beginPath();
        ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-difference">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
};
