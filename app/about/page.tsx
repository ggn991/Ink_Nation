"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";
import { Footer } from "@/components/layout/footer";
import { Check, Calendar, Users, Shield, Heart, MapPin, Phone, Clock, Star, Mail } from "lucide-react";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";

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

export default function AboutPage() {
  const stats = [
    { to: 15, suffix: "+", decimals: 0, label: "Professional Artists" },
    { to: 2, suffix: "", decimals: 0, label: "Premium Studios" },
    { to: 6000, suffix: "+", decimals: 0, label: "Tattoos Done" },
    { to: 4.9, suffix: "+", decimals: 1, label: "Average Rating" },
  ];

  const pillars = [
    { title: "Elite Artistry", icon: Users, desc: "We don't copy. We co-create custom skin illustrations mapped precisely to your body's muscle flow and personal story." },
    { title: "Surgical Hygiene", icon: Shield, desc: "Our sterilization and safe autoclave standards exceed standard medical protocols. Cleanliness is our law." },
    { title: "Client Comfort", icon: Heart, desc: "A great tattoo is an experience. We provide comfortable layouts, patient consults, and thorough aftercare tracking." },
  ];

  const timeline = [
    { year: "2019", title: "Founded", desc: "Ink Nation was born in Mysore, driven by a vision to make tattoo art a premium, sterile, and hyper-expressive culture." },
    { year: "2020", title: "First 100 Clients Inked", desc: "Quickly gained a reputation for unmatched precision and detailed portraiture, earning a 5.0★ local status." },
    { year: "2022", title: "Bangalore Koramangala Launch", desc: "Expanded our flagship presence to Bangalore, bringing our surgical hygiene standards to the high-energy Koramangala block." },
    { year: "2024", title: "Tattoo Academy Launch", desc: "Launched our exclusive professional apprenticeship program to train the next generation of master illustrators." },
    { year: "2025", title: "6000+ Tattoos Completed", desc: "Achieved a combined aggregate 4.9★ rating with over 6,000+ clients successfully inked across both active studios." },
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

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "About", item: "/about" }
  ];

  return (
    <AppProviders>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-black text-white selection:bg-white/10 font-sans pt-36">
        
        {/* Hero Section */}
        <section className="relative py-12 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.05)_0%,_transparent_75%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h4 className="text-zinc-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Our History</h4>
              <h1 className="text-5xl md:text-8xl font-light tracking-widest uppercase mb-8 leading-tight">
                Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">Family</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* History & Intro Section */}
        <section className="py-24 border-y border-white/5 bg-zinc-950/40 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6 uppercase tracking-wider">
                  History of the <br/><span className="text-gray-500 font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">Creation of our team</span>
                </h2>
                <div className="h-[1px] w-24 bg-cyan-500 mb-8"></div>
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
        <section className="py-20 bg-black px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-center text-xs uppercase tracking-[0.3em] text-gray-500 mb-16">Ink Nation in Numbers</h3>
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

        {/* Pillars / Principles Section */}
        <section className="py-24 bg-zinc-950 border-y border-white/5 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-white mb-4">Core Principles</h2>
              <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">The three laws we live by</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="bg-black border border-white/5 rounded-3xl p-8 group hover:border-cyan-500/30 transition-all duration-500 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center mx-auto text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-light text-white uppercase tracking-wider mb-3 group-hover:text-cyan-400 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-zinc-400 font-light text-xs leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-white mb-4">Our Timeline</h2>
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">Milestones of the Ink Nation legacy</p>
          </div>

          <div className="relative border-l border-white/10 pl-6 md:pl-10 space-y-16 ml-4">
            {timeline.map((step, idx) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Timeline circle marker */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border border-cyan-500/50 shadow-md shadow-cyan-500/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-cyan-400 font-mono text-lg font-semibold block">{step.year}</span>
                  <h3 className="text-xl font-light text-white uppercase tracking-wider">{step.title}</h3>
                  <p className="text-gray-400 font-light text-sm leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-32 bg-zinc-950 border-t border-white/5 relative overflow-hidden px-6">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/[0.02] blur-[120px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
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
                  <h4 className="text-xl uppercase tracking-widest mb-4 flex items-center gap-4 text-white group-hover:text-cyan-400 transition-colors">
                    <span className="text-zinc-500 font-light font-mono">0{i + 1}</span>
                    {value.title}
                  </h4>
                  <p className="text-gray-400 font-light leading-relaxed pl-10 border-l border-white/10 group-hover:border-cyan-500/30 transition-colors duration-500">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Flagship Interiors Section */}
        <section className="py-24 bg-black border-t border-white/5 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-white mb-4">Flagship Studios</h2>
              <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">Vibe check inside the temples</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 p-2 bg-zinc-950 group hover:border-cyan-500/30 transition-colors duration-500">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800" alt="Bangalore Studio" className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="text-center pt-3 text-xs uppercase tracking-widest text-zinc-500">Bangalore Koramangala Interior</div>
              </div>
              
              <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 p-2 bg-zinc-950 group hover:border-cyan-500/30 transition-colors duration-500">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800" alt="Mysore Studio" className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="text-center pt-3 text-xs uppercase tracking-widest text-zinc-500">Mysore Gokulam Interior</div>
              </div>

              <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 p-2 bg-zinc-950 group hover:border-cyan-500/30 transition-colors duration-500">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1597405490028-2823d4b45a5a?q=80&w=800" alt="Team Masterpieces" className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="text-center pt-3 text-xs uppercase tracking-widest text-zinc-500">Ink Nation Master Team</div>
              </div>
            </div>
          </div>
        </section>

        {/* Let's Talk CTA */}
        <section className="py-32 bg-zinc-950 border-t border-white/5 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8 opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-default text-white">
              Let's Talk
            </h2>
            <a 
              href="mailto:hello@inknation.in" 
              className="inline-block text-xl md:text-2xl text-zinc-400 hover:text-cyan-400 transition-colors border-b border-zinc-800 hover:border-cyan-400 pb-1 font-light tracking-wide"
            >
              hello@inknation.in
            </a>
          </motion.div>
        </section>

        <Footer />
      </main>
    </AppProviders>
  );
}
