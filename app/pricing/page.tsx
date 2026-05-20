"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { DollarSign, Check, HelpCircle, ArrowRight } from "lucide-react";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";

export default function PricingPage() {
  const [activeBranch, setActiveBranch] = useState<"bangalore" | "mysore">("bangalore");

  const tattooPricing = {
    bangalore: [
      { size: 'Small (2" – 3")', price: "₹2,000+", desc: "Ideal for fine-line minimalist symbols, initials, or micro-designs.", time: "30-60 mins" },
      { size: 'Medium (4" – 6")', price: "₹5,000+", desc: "Perfect for detailed forearms, shoulder designs, or custom graphics.", time: "2-3 hours" },
      { size: 'Large (7"+)', price: "₹10,000+", desc: "Covers extensive thigh pieces, half sleeves, or complex chest drawings.", time: "4-6 hours" },
      { size: "Full Sleeve", price: "₹25,000+", desc: "An epic collaborative masterpiece wrapping the entire arm, split in sessions.", time: "Multi-session" },
    ],
    mysore: [
      { size: 'Small (2" – 3")', price: "₹2,000+", desc: "Ideal for fine-line minimalist symbols, initials, or micro-designs.", time: "30-60 mins" },
      { size: 'Medium (4" – 6")', price: "₹5,000+", desc: "Perfect for detailed forearms, shoulder designs, or custom graphics.", time: "2-3 hours" },
      { size: 'Large (7"+)', price: "₹10,000+", desc: "Covers extensive thigh pieces, half sleeves, or complex chest drawings.", time: "4-6 hours" },
      { size: "Full Sleeve", price: "₹25,000+", desc: "An epic collaborative masterpiece wrapping the entire arm, split in sessions.", time: "Multi-session" },
    ],
  };

  const piercingPricing = {
    bangalore: [
      { type: "Basic Piercing", price: "₹800+", desc: "Lobe, Nose, Eyebrow. Includes sterile setup and titanium jewelry." },
      { type: "Cartilage Piercing", price: "₹1,200+", desc: "Helix, Tragus, Conch. Precision needle piercing." },
      { type: "Industrial Piercing", price: "₹1,500+", desc: "Double cartilage channel with implant-grade bar." },
    ],
    mysore: [
      { type: "Basic Piercing", price: "₹800+", desc: "Lobe, Nose, Eyebrow. Includes sterile setup and titanium jewelry." },
      { type: "Cartilage Piercing", price: "₹1,200+", desc: "Helix, Tragus, Conch. Precision needle piercing." },
      { type: "Industrial Piercing", price: "₹1,500+", desc: "Double cartilage channel with implant-grade bar." },
    ],
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Pricing", item: "/pricing" }
  ];

  return (
    <AppProviders>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-black text-white pt-36">
        
        {/* Header */}
        <section className="relative py-12 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.05)_0%,_transparent_75%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Pricing Guide</h4>
              <h1 className="text-4xl md:text-7xl font-light tracking-widest uppercase mb-6 leading-tight">
                Investment In <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">Art</span>
              </h1>
              <p className="max-w-2xl mx-auto text-gray-400 font-light text-base leading-relaxed">
                Tattoos and piercings are a lifetime investment. Explore our clear starting rates, calculated based on the extreme hygiene standards and artistic mastery we commit to each piece.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Branch Toggle sticky */}
        <section className="py-8 sticky top-[80px] z-50 bg-black/80 backdrop-blur-md border-y border-white/5">
          <div className="max-w-md mx-auto px-6 flex justify-center">
            <div className="bg-zinc-950 p-1 rounded-full border border-white/10 flex w-full">
              <button
                onClick={() => setActiveBranch("bangalore")}
                className={`flex-1 py-3 text-xs tracking-widest uppercase font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  activeBranch === "bangalore" 
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/25" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Bangalore Studio
              </button>
              <button
                onClick={() => setActiveBranch("mysore")}
                className={`flex-1 py-3 text-xs tracking-widest uppercase font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  activeBranch === "mysore" 
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/25" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Mysore Studio
              </button>
            </div>
          </div>
        </section>

        {/* Core Pricing Sheets */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Tattoos card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-950 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-zinc-800 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none"></div>
              
              <h2 className="text-3xl font-light uppercase tracking-widest text-white mb-8 flex items-center justify-between">
                <span>Tattoo Pricing</span>
                <span className="text-xs text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 rounded-full font-medium tracking-normal normal-case">
                  Starting rates
                </span>
              </h2>

              <div className="space-y-8">
                {tattooPricing[activeBranch].map((tier, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg font-light text-white uppercase tracking-wider">{tier.size}</h4>
                      <span className="text-xl font-bold text-cyan-400">{tier.price}</span>
                    </div>
                    <p className="text-zinc-500 text-xs tracking-wider mb-2 font-mono uppercase">Estimate time: {tier.time}</p>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">{tier.desc}</p>
                  </div>
                ))}
              </div>

              {/* Color Add-on Badge card */}
              <div className="mt-8 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <span className="text-cyan-400 text-xl font-bold">+</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-1">Color Pigment Add-on</h4>
                  <p className="text-zinc-400 font-light text-xs leading-relaxed">
                    Vibrant custom colors require additional pigment layers and needle packing. Adds +20% to the base design cost.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Piercings card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-950 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-zinc-800 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none"></div>

              <h2 className="text-3xl font-light uppercase tracking-widest text-white mb-8 flex items-center justify-between">
                <span>Body Piercings</span>
                <span className="text-xs text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 rounded-full font-medium tracking-normal normal-case">
                  Sterile Needle Only
                </span>
              </h2>

              <div className="space-y-8">
                {piercingPricing[activeBranch].map((tier, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-lg font-light text-white uppercase tracking-wider">{tier.type}</h4>
                      <span className="text-xl font-bold text-cyan-400">{tier.price}</span>
                    </div>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">{tier.desc}</p>
                  </div>
                ))}
              </div>

              {/* Autoclave Certification Card */}
              <div className="mt-8 bg-zinc-900 border border-white/5 rounded-2xl p-6 space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Hygiene Safety Rules Included:</h4>
                <ul className="space-y-2.5">
                  {["100% single-use surgical needles only", "Implant-grade ASTM F-136 titanium studs", "Autoclave sterilized equipment cycle", "Surgical-grade antiseptic preps"].map((item, idx) => (
                    <li key={idx} className="flex items-center text-xs text-zinc-300 font-light">
                      <Check className="w-3.5 h-3.5 text-cyan-400 mr-2.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Disclaimer Callout card */}
        <section className="py-10 px-6 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-950 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <HelpCircle className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-light uppercase tracking-wider text-white mb-3">Exact Pricing Consultation</h3>
            <p className="text-zinc-400 font-light text-sm leading-relaxed max-w-xl mx-auto mb-8">
              No two pieces of skin art are the same. Complex wrapping, detailed shadows, and custom designs require individual estimations. Book your entirely free layout consultation to lock in an exact price quote with our masters.
            </p>
            <Link href="/booking">
              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2 border border-white hover:border-cyan-400">
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </section>

        <Footer />
      </main>
    </AppProviders>
  );
}
