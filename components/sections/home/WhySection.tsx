"use client";
import React, { useEffect, useState } from "react";
import { Triangle, ShieldCheck, Users, Star, Gem, Scale } from "lucide-react";
import { motion, useScroll, useVelocity, useTransform, useSpring, useMotionValue } from "framer-motion";
import { SectionHeading } from "@/components/sections/shared/SectionHeading";

interface CollageCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  text: string;
  desktopStyle: {
    width: string;
    height: string;
    padding: string;
    x: string | number;
    y: string | number;
  };
  delay: number;
}

const TiltCard = ({ card, isDesktop }: { card: CollageCard; isDesktop: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for buttery smooth tilting response
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  // Map offsets to subtle 3D rotational degrees
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    
    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);

    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    if (!isDesktop) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isDesktop ? rotateX : 0,
        rotateY: isDesktop ? rotateY : 0,
        transformStyle: isDesktop ? "preserve-3d" : undefined,
      }}
      className="relative w-full h-full bg-white text-black rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col justify-between group cursor-default select-text p-8 lg:p-[2.8vw_2vw_2vw_2vw] overflow-hidden"
    >
      {/* Premium Spotlight Cyan Glow following mouse */}
      {isDesktop && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-30 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${glowPos.x}px ${glowPos.y}px, rgba(0,240,255,0.25) 0%, transparent 100%)`,
          }}
        />
      )}

      <div className="flex flex-col justify-start w-full relative z-20" style={{ transform: isDesktop ? "translateZ(30px)" : "none" }}>
        {/* Graphic Icon shape in Electric Blue */}
        <div className="transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-500 origin-left inline-block">
          {card.icon}
        </div>

        {/* Bold Title */}
        <h4 className="text-xl lg:text-[1.3vw] font-black uppercase tracking-tight mb-3 text-black leading-tight">
          {card.title}
        </h4>

        {/* Description */}
        <p className="text-zinc-700 text-sm lg:text-[0.95vw] font-normal leading-relaxed lg:w-[17vw]">
          {card.text}
        </p>
      </div>
    </motion.div>
  );
};

const CardItem = ({ card, skewY, isDesktop }: { card: CollageCard; skewY: any; isDesktop: boolean }) => {
  return (
    <div
      style={{
        width: isDesktop ? card.desktopStyle.width : "100%",
        height: isDesktop ? card.desktopStyle.height : "auto",
        transform: isDesktop ? `translate3d(${card.desktopStyle.x}, ${card.desktopStyle.y}, 0)` : "none",
        perspective: isDesktop ? 1000 : undefined,
      }}
      className="relative z-20"
    >
      <motion.div
        style={{
          skewY: isDesktop ? skewY : 0,
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: card.delay, ease: "easeOut" }}
        className="w-full h-full"
      >
        <TiltCard card={card} isDesktop={isDesktop} />
      </motion.div>
    </div>
  );
};

export const WhySection = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set up velocity-based scroll skew
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth spring configuration to eliminate flutter
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
    mass: 0.8
  });

  // Map scroll velocity to skewY angle in degrees (-7.5 to 7.5 max skew)
  const skewY = useTransform(smoothVelocity, [-1500, 1500], [-7.5, 7.5]);

  const column1Cards: CollageCard[] = [
    {
      id: 1,
      icon: <Triangle className="w-10 h-10 lg:w-[3.75vw] lg:h-[3.75vw] text-[#00f0ff] mb-5 lg:mb-[1.3vw] stroke-[2.5]" />,
      title: "100% CUSTOM DESIGNS",
      text: "No stock books. No duplicates. We work collaboratively to craft one-of-a-kind sketches that reflect your unique narrative and aesthetic identity.",
      desktopStyle: {
        width: "21vw",
        height: "21vw",
        padding: "2.8vw 2vw 2vw 2vw",
        x: 0,
        y: 0,
      },
      delay: 0.1,
    },
    {
      id: 3,
      icon: <Users className="w-10 h-10 lg:w-[3.75vw] lg:h-[3.75vw] text-[#00f0ff] mb-5 lg:mb-[1.3vw] stroke-[2.5]" />,
      title: "SKILLED TATTOO ARTISTS",
      text: "Praised by hundreds of reviews, our core studio consists of 5 dedicated master artists specializing in realism, custom script, geometry, and watercolor.",
      desktopStyle: {
        width: "21vw",
        height: "21vw",
        padding: "2.8vw 2vw 2vw 2vw",
        x: "5.3vw",
        y: "6.9vw",
      },
      delay: 0.2,
    },
    {
      id: 5,
      icon: <Gem className="w-10 h-10 lg:w-[3.75vw] lg:h-[3.75vw] text-[#00f0ff] mb-5 lg:mb-[1.3vw] stroke-[2.5]" />,
      title: "ALL TATTOO STYLES",
      text: "From realism sleeves to fine-line script, geometric patterns to watercolor splashes, our masters can craft any vision with absolute precision.",
      desktopStyle: {
        width: "21vw",
        height: "21vw",
        padding: "2.8vw 2vw 2vw 2vw",
        x: "32vw",
        y: "4vw",
      },
      delay: 0.3,
    },
  ];

  const column2Cards: CollageCard[] = [
    {
      id: 2,
      icon: <ShieldCheck className="w-10 h-10 lg:w-[3.75vw] lg:h-[3.75vw] text-[#00f0ff] mb-5 lg:mb-[1.3vw] stroke-[2.5]" />,
      title: "HYGIENE & SAFETY FIRST",
      text: "Absolute clinical precision. We operate with medical-grade single-use needles, autoclaves, and sterilization protocols to guarantee full safety.",
      desktopStyle: {
        width: "21vw",
        height: "21vw",
        padding: "2.8vw 2vw 2vw 2vw",
        x: 0,
        y: "3.5vw",
      },
      delay: 0.15,
    },
    {
      id: 4,
      icon: <Star className="w-10 h-10 lg:w-[3.75vw] lg:h-[3.75vw] text-[#00f0ff] mb-5 lg:mb-[1.3vw] stroke-[2.5]" />,
      title: "5★ RATED ON GOOGLE",
      text: "Praised specifically in reviews for our sterile standards and custom designs, we boast a flawless 5.0★ rating in Mysore and 4.8★ in Koramangala, Bangalore.",
      desktopStyle: {
        width: "21vw",
        height: "21vw",
        padding: "2.8vw 2vw 2vw 2vw",
        x: "-23vw",
        y: "-4vw",
      },
      delay: 0.25,
    },
    {
      id: 6,
      icon: <Scale className="w-10 h-10 lg:w-[3.75vw] lg:h-[3.75vw] text-[#00f0ff] mb-5 lg:mb-[1.3vw] stroke-[2.5]" />,
      title: "TRANSPARENT PRICING",
      text: "No hidden charges, no sudden revisions. Every project receives an exact price estimation upfront based on complexity, placement, and size reference.",
      desktopStyle: {
        width: "21vw",
        height: "21vw",
        padding: "2.8vw 2vw 2vw 2vw",
        x: "-2.1vw",
        y: 0,
      },
      delay: 0.35,
    },
  ];

  return (
    <section 
      className="bg-black py-12 md:py-16 overflow-hidden border-t border-white/5 relative select-none"
    >
      
      {/* Background Image - Full width/height gritty backdrop */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none select-none">
        {/* Gritty overlay noise */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.04] z-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Real full-size image backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-30"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=1600&auto=format&fit=crop")`
          }}
        />
        {/* Vignette shadows */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black z-15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.04)_0%,_transparent_70%)] z-15" />
      </div>

      {/* Content Title */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 relative z-30 w-full">
        <SectionHeading 
          titleLine1="WHY CHOOSE US" 
          titleLine2="THE NATION ADVANTAGE" 
          subtitle="OUR PROMISE" 
        />
      </div>

      {/* Main Collage Container */}
      <div className="relative w-full lg:max-w-none lg:px-[10vw] px-6 z-25 lg:pt-[2vw] lg:pb-[6vw]">
        
        {/* Floating Collage Grid: Responsive layout (grid stacking on mobile/tablet, staggered columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between w-full h-full gap-6 lg:gap-0">
          
          {/* Column 1 */}
          <div className="flex flex-col lg:w-[21vw] gap-6 lg:gap-[6vw]">
            {column1Cards.map((card) => (
              <CardItem 
                key={card.id} 
                card={card} 
                skewY={skewY} 
                isDesktop={isDesktop} 
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col lg:w-[21vw] gap-6 lg:gap-[6vw]">
            {column2Cards.map((card) => (
              <CardItem 
                key={card.id} 
                card={card} 
                skewY={skewY} 
                isDesktop={isDesktop} 
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};

export default WhySection;
