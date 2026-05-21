"use client";

import React, { useEffect, useRef } from "react";

export const SmokeParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      maxLife: number;
      life: number;
      hue: number;
    }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticle = () => {
      const isMobile = window.innerWidth < 768;
      if (particles.length > (isMobile ? 30 : 75)) return;

      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 50,
        size: Math.random() * (isMobile ? 40 : 100) + 20,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.6 + 0.3),
        opacity: Math.random() * 0.15 + 0.02,
        maxLife: Math.random() * 800 + 400,
        life: 0,
        // Cyan to blue Hues
        hue: Math.random() > 0.5 ? 195 : 210
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Generate new particles
      if (Math.random() < 0.05) {
        createParticle();
      }

      particles.forEach((p, index) => {
        p.life++;
        p.x += p.speedX;
        p.y += p.speedY;

        // Fade in initially, then fade out towards end of life
        let currentOpacity = p.opacity;
        if (p.life < 100) {
          currentOpacity = (p.life / 100) * p.opacity;
        } else if (p.life > p.maxLife - 200) {
          currentOpacity = ((p.maxLife - p.life) / 200) * p.opacity;
        }

        if (currentOpacity < 0) currentOpacity = 0;

        // Draw soft smoke-like radial gradients
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `hsla(${p.hue}, 90%, 55%, ${currentOpacity})`);
        gradient.addColorStop(0.3, `hsla(${p.hue}, 90%, 45%, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Remove dead particles
        if (p.life >= p.maxLife || p.y < -100) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 mix-blend-screen opacity-60"
    />
  );
};
