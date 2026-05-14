"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface Point {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const trail = useRef<Point[]>([]);
  const isHovering = useRef(false);
  const hoverProgress = useRef(0);
  const hasMoved = useRef(false);
  
  const params = {
    pointsNumber: 40,
    widthFactor: 0.3,
    spring: 0.4,
    friction: 0.5,
  };

  useEffect(() => {
    // Only initialize if not already set (prevents reset on re-renders)
    if (trail.current.length === 0) {
      pointer.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      trail.current = Array.from({ length: params.pointsNumber }, () => ({
        x: pointer.current.x,
        y: pointer.current.y,
        dx: 0,
        dy: 0,
      }));
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Reliable scaling
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener("resize", resize);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      // On the first move, snap all points to mouse to prevent center-start jump
      if (!hasMoved.current) {
        hasMoved.current = true;
        trail.current.forEach(p => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
      }
      pointer.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnter = () => { isHovering.current = true; };
    const onMouseLeave = () => { isHovering.current = false; };

    const setupListeners = () => {
      const interactive = document.querySelectorAll('a, button, [role="button"], .cursor-hover');
      interactive.forEach(el => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
      return interactive;
    };

    let interactiveElements = setupListeners();

    const observer = new MutationObserver(() => {
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
      interactiveElements = setupListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("mousemove", onMouseMove);

    const update = () => {
      if (!hasMoved.current) return; // Don't draw until mouse is tracked

      const targetHover = isHovering.current ? 1 : 0;
      hoverProgress.current += (targetHover - hoverProgress.current) * 0.15;

      trail.current.forEach((p, i) => {
        const prev = i === 0 ? pointer.current : trail.current[i - 1];
        const spring = i === 0 ? 0.4 * params.spring : params.spring;
        
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (hoverProgress.current > 0.01) {
        const size = 35 * hoverProgress.current;
        ctx.save();
        ctx.translate(pointer.current.x, pointer.current.y);
        ctx.rotate(Math.PI / 4 * hoverProgress.current);
        ctx.fillStyle = "rgba(0, 255, 255, 0.4)";
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "white";
      
      ctx.beginPath();
      ctx.moveTo(trail.current[0].x, trail.current[0].y);

      for (let i = 1; i < trail.current.length - 1; i++) {
        const xc = 0.5 * (trail.current[i].x + trail.current[i + 1].x);
        const yc = 0.5 * (trail.current[i].y + trail.current[i + 1].y);
        ctx.quadraticCurveTo(trail.current[i].x, trail.current[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xc, yc);
      }
      
      ctx.lineTo(trail.current[trail.current.length - 1].x, trail.current[trail.current.length - 1].y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(pointer.current.x, pointer.current.y, 2.5 + (hoverProgress.current * 1.5), 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    };

    gsap.ticker.add(update);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
      observer.disconnect();
      gsap.ticker.remove(update);
    };
  }, []); // Truly runs only once

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};
