"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";
import { Footer } from "@/components/layout/footer";
import { SmokeParticles } from "@/components/ui/smoke-particles";
import { services, hygieneSteps } from "@/lib/data/services";
import { ComingSoonBadge } from "@/components/ui/coming-soon-badge";
import { ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";

export default function ServicesPage() {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  const tattooStyles = [
    { name: "3D & Color Realism", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800", desc: "Photorealistic portraits and objects with extreme detail and vibrant ink packs." },
    { name: "Surgical Script", img: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800", desc: "Custom calligraphic fonts and fine lettering tailored directly to skeletal flows." },
    { name: "Neo-Traditional", img: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800", desc: "Bold black borders containing organic blends, vivid gradients, and illustrative cartoons." },
    { name: "Black & Grey Shading", img: "https://images.unsplash.com/photo-1590246814883-57831168e243?q=80&w=800", desc: "Fine gradient ink washes giving dimensional structures that hold perfectly for a lifetime." },
  ];

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" }
  ];

  return (
    <AppProviders>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-black text-white relative overflow-hidden pt-36">
        <SmokeParticles />

        {/* Hero Section */}
        <section className="relative py-16 px-6">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Core Offerings</h4>
              <h1 className="text-4xl md:text-7xl font-light tracking-widest uppercase mb-6 leading-tight">
                Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">Services</span>
              </h1>
              <p className="max-w-xl mx-auto text-gray-400 font-light text-base leading-relaxed">
                Experience world-class tattoo artistry, sterile needle piercings, and exclusive creative training programs. We make you a believer.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Services grid */}
        <section className="py-20 px-6 max-w-7xl mx-auto space-y-32 relative z-10">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${service.isComingSoon ? "opacity-75" : ""}`}
              >
                {/* Visual grid column */}
                <div className={`lg:col-span-6 relative rounded-3xl overflow-hidden aspect-[4/3] bg-zinc-950 border border-white/5 group hover:border-zinc-800 transition-all duration-500 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  {service.isComingSoon && <ComingSoonBadge />}
                  <img
                    src={service.id === "tattoo" ? "https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=800" :
                         service.id === "piercing" ? "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800" :
                         service.id === "tattoo-training" ? "https://images.unsplash.com/photo-1597405490028-2823d4b45a5a?q=80&w=800" :
                         "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?q=80&w=800"}
                    alt={service.name}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                {/* Content grid column */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="space-y-2">
                    <span className="text-cyan-400 uppercase tracking-widest text-xs font-mono">{service.tagline}</span>
                    <h2 className="text-3xl md:text-4xl font-light uppercase tracking-wider text-white">{service.name}</h2>
                  </div>
                  <p className="text-gray-400 font-light text-sm leading-relaxed">{service.description}</p>
                  
                  {service.details && (
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-xs text-zinc-300 font-light">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2.5 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {!service.isComingSoon && service.ctaText && (
                    <div className="pt-4">
                      <Link href="/booking">
                        <button className="bg-white text-black px-8 py-3.5 rounded-full font-semibold uppercase tracking-widest text-[10px] hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2 border border-white hover:border-cyan-400">
                          <span>{service.ctaText}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Custom Tattoo Styles subcategories grid */}
        <section className="py-24 bg-zinc-950 relative z-10 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-white mb-4">Tattoo Categories</h2>
              <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs">Styles We Corely Specialize In</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tattooStyles.map((style) => (
                <div
                  key={style.name}
                  onMouseEnter={() => setHoveredStyle(style.name)}
                  onMouseLeave={() => setHoveredStyle(null)}
                  className="bg-black border border-white/5 rounded-2xl overflow-hidden p-6 relative group transition-all duration-500 hover:border-cyan-500/30"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-6 relative">
                    <img
                      src={style.img}
                      alt={style.name}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredStyle === style.name ? "scale-110 grayscale-0" : "grayscale"
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-light text-white uppercase tracking-wider mb-2 group-hover:text-cyan-400 transition-colors">{style.name}</h3>
                  <p className="text-zinc-400 font-light text-xs leading-relaxed">{style.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hygiene section */}
        <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Header info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="bg-cyan-500/10 text-cyan-400 text-[10px] tracking-[0.2em] font-medium uppercase px-3 py-1 rounded-full border border-cyan-500/20 inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 fill-cyan-500/10" />
                <span>Our Sacred Religion</span>
              </span>
              <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest text-white leading-tight">
                Quality + <br/><span className="text-gray-500">Hygiene is our Law</span>
              </h2>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                We maintain clinical cleanliness standards that surpass standard health certifications. Your health, safety, and skin's healing integrity are our absolute non-negotiables.
              </p>
            </div>

            {/* Checklist grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {hygieneSteps.map((step) => (
                <div key={step.id} className="bg-zinc-950/60 border border-white/5 rounded-2xl p-6 group hover:border-zinc-800 transition-all duration-500">
                  <div className="text-cyan-400 font-mono text-sm mb-4 font-semibold">{step.id}</div>
                  <h3 className="text-base font-light text-white uppercase tracking-wider mb-2">{step.title}</h3>
                  <p className="text-zinc-400 font-light text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        <Footer />
      </main>
    </AppProviders>
  );
}
