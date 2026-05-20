"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";

function Counter({ from = 0, to, duration = 2.5, suffix = "", decimals = 0 }: { from?: number, to: number, duration?: number, suffix?: string, decimals?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !isInView) return;

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = value.toFixed(decimals) + suffix;
      }
    });

    return () => controls.stop();
  }, [from, to, duration, suffix, decimals, isInView]);

  return <span ref={nodeRef}>{from.toFixed(decimals)}{suffix}</span>;
}

export default function StudiosPage() {
  const stats = [
    { to: 15, suffix: "+", decimals: 0, label: "Professional Artists" },
    { to: 2, suffix: "", decimals: 0, label: "Premium Studios" },
    { to: 6000, suffix: "+", decimals: 0, label: "Tattoos Done" },
    { to: 4.9, suffix: "+", decimals: 1, label: "Average Rating" },
  ];

  const values = [
    {
      title: "Cultural Ambassadors",
      description: "We contribute to the development of tattoo culture and elevate it as a respected fine art in society."
    },
    {
      title: "Push Boundaries",
      description: "Implementing crazy, quirky, and visionary concepts to add excitement and unparalleled uniqueness to every piece."
    },
    {
      title: "Unmatched Quality",
      description: "Setting the gold standard that all other shops strive to meet. Hygiene and precision are our non-negotiables."
    },
    {
      title: "Take Over",
      description: "Bangalore and Mysore are just our strongholds. Our art transcends borders and our family is always expanding."
    }
  ];

  return (
    <AppProviders>
      <main className="min-h-screen bg-black text-white selection:bg-white/10 font-sans">
        
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black -z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h4 className="text-zinc-400 uppercase tracking-[0.3em] text-sm mb-4">About Us</h4>
              <h1 className="text-6xl md:text-8xl font-light tracking-widest uppercase mb-8">
                Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">Family</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* History & Intro Section */}
        <section className="py-24 border-t border-white/5 bg-zinc-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6 uppercase tracking-wider">
                  History of the <br/><span className="text-gray-500">Creation of our team</span>
                </h2>
                <div className="h-[1px] w-24 bg-zinc-800 mb-8"></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-gray-400 font-light leading-relaxed space-y-6"
              >
                <p>
                  Our team of talented and passionate artists is dedicated to turning your tattoo dreams into reality. 
                  Each member of our family brings their unique style, expertise, and creativity to the table, ensuring that every tattoo is a masterpiece.
                </p>
                <p>
                  With years of experience and a deep commitment to the art of tattooing, our artists are here to provide you with a safe, professional, and deeply inspiring experience across our Bangalore and Mysore locations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-sm uppercase tracking-[0.3em] text-gray-500 mb-16">Ink Nation in Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 mb-3 select-none">
                    <Counter to={stat.to} suffix={stat.suffix} decimals={stat.decimals} />
                  </div>
                  <div className="text-[10px] md:text-xs tracking-[0.25em] text-zinc-500 uppercase font-light">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mb-24"
            >
              <h2 className="text-4xl md:text-6xl font-light leading-tight uppercase tracking-wide">
                Our mission is to become a <span className="text-cyan-400 italic font-serif lowercase tracking-normal">temple</span> of art and self-expression.
              </h2>
              <p className="mt-8 text-xl text-gray-500 font-light">
                We don't just follow standards. We set goals that others are afraid to imagine.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
                >
                  <h4 className="text-xl uppercase tracking-widest mb-4 flex items-center gap-4">
                    <span className="text-zinc-500 font-light font-mono">0{i + 1}</span>
                    {value.title}
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed pl-10 border-l border-white/10 group-hover:border-white/30 transition-colors duration-500">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Let's Talk CTA */}
        <section className="py-32 bg-black text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8 opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-default">
              Let's Talk
            </h2>
            <a 
              href="mailto:hello@inknation.in" 
              className="inline-block text-xl md:text-2xl text-zinc-400 hover:text-white transition-colors border-b border-zinc-800 hover:border-white pb-1 font-light tracking-wide"
            >
              hello@inknation.in
            </a>
          </motion.div>
        </section>

      </main>
    </AppProviders>
  );
}
