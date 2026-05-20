"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/shared/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface PriceTier {
  num: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

const tiersData: PriceTier[] = [
  {
    num: "001",
    name: "Basic Session",
    price: "from ₹1,500",
    description: "Ideal for small to medium custom designs, fine line minimalists, or single script tattoos.",
    features: [
      "Custom Sketch Consultation",
      "Sterile single-session needles",
      "Premium imported inks",
      "Basic aftercare guide"
    ]
  },
  {
    num: "002",
    name: "Premium Custom",
    price: "₹5,000 – ₹15,000",
    description: "Detailed realism portraits, geometric mandalas, vibrant watercolor, or sleeve cover-ups.",
    features: [
      "2-Hour co-creation session",
      "Advanced realistic detailing",
      "Priority artist matching",
      "Complete aftercare recovery kit"
    ]
  },
  {
    num: "003",
    name: "Master Session",
    price: "from ₹15,000",
    description: "Multi-session full sleeves, full back pieces, and highly complex custom body suits.",
    features: [
      "Full scale project planning",
      "Dedicated multi-session timeline",
      "Direct master artist allocation",
      "VIP studio booking rights"
    ]
  }
];

export const PricingTiers = () => {
  return (
    <section className="bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white/5 relative select-none">
      
      {/* Glow backdrop */}
      <div className="absolute top-[40%] left-[20%] w-[350px] h-[350px] bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          titleLine1="WHAT IS THE PRICE" 
          titleLine2="OF WORKING WITH US" 
          subtitle="TRANSPARENT VALUE" 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {tiersData.map((tier, idx) => (
            <Card 
              key={tier.num}
              glow={idx === 1} // highlight premium tier
              className="flex flex-col justify-between p-8 rounded-2xl min-h-[450px]"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-[#00f0ff] font-bold text-sm tracking-wider">
                    [{tier.num}]
                  </span>
                  <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">
                    TIER PACKAGE
                  </span>
                </div>

                {/* Package name */}
                <h4 className="text-xl uppercase font-light text-white tracking-widest mb-3">
                  {tier.name}
                </h4>

                {/* Big Price */}
                <div className="text-2xl sm:text-3xl font-extralight tracking-tight text-white mb-5">
                  {tier.price}
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center text-xs text-zinc-400 font-light">
                      <div className="w-1 h-1 bg-[#00f0ff] rounded-full mr-2.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA trigger */}
              <div className="pt-4">
                <Link href="/booking" className="block w-full">
                  <Button 
                    variant={idx === 1 ? "primary" : "secondary"} 
                    className="w-full justify-between items-center"
                  >
                    <span>GET INKED</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Small Notes Section */}
        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div>
            <span className="text-[10px] tracking-widest font-bold text-[#00f0ff] uppercase block mb-1">
              ADDITIONAL SERVICES
            </span>
            <span className="text-xs text-zinc-400 font-light">
              Premium body piercing starting from <strong className="text-white">₹800</strong>. Walk-ins welcome at both studios.
            </span>
          </div>

          <div className="text-zinc-500 text-[10px] tracking-wider font-light italic uppercase">
            * All prices are starting rates. Final price quotation provided after free consultation.
          </div>
        </div>

      </div>
    </section>
  );
};
export default PricingTiers;
