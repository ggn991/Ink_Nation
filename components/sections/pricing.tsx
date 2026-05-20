"use client";

import React from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Essence",
    price: "₹3,000",
    unit: "/hr",
    description: "Fine-line, minimalist, and small pieces. Perfect for your first.",
    features: ["Custom Consultation", "Single Session Work", "Aftercare Kit"],
    highlight: false,
  },
  {
    name: "Legacy",
    price: "₹6,000",
    unit: "/session",
    description: "Medium custom work, cover-ups, and detailed single pieces.",
    features: ["Advanced Detailing", "Cover-up Expertise", "Priority Scheduling"],
    highlight: true,
  },
  {
    name: "Masterpiece",
    price: "₹12,000+",
    unit: "/session",
    description: "Large-scale sleeves, full back pieces, and epic multi-session works.",
    features: ["Full Project Planning", "Multi-session Discount", "VIP Studio Access"],
    highlight: false,
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase text-white mb-4">
            Investment in Art
          </h2>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-light">Quality that lasts a lifetime</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-8 rounded-2xl flex flex-col transition-all duration-300 ${
                plan.highlight 
                  ? "bg-zinc-900 border-2 border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.15)] scale-105 z-10" 
                  : "bg-zinc-900/50 border border-white/5 hover:border-white/10"
              }`}
            >
              <h3 className="text-xl font-light text-white uppercase tracking-widest mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-light text-white">{plan.price}</span>
                <span className="text-gray-500 ml-1 font-light">{plan.unit}</span>
              </div>
              <p className="text-gray-400 text-sm mb-8 flex-grow font-light">{plan.description}</p>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-300 font-light">
                    <div className={`w-1.5 h-1.5 rounded-full mr-3 ${plan.highlight ? "bg-cyan-400" : "bg-white"}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-full text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                plan.highlight 
                  ? "bg-cyan-500 text-black hover:bg-cyan-400 font-semibold shadow-lg shadow-cyan-500/10" 
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
              }`}>
                Get a Quote
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
