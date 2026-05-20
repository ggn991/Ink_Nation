"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/sections/shared/SectionHeading";
import { Button } from "@/components/ui/Button";

export const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    branch: "bangalore",
    service: "tattoo",
    project: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      console.log("Ink Nation Consultation Form Data Submitted:", formData);
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section className="bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white/5 relative select-none">
      
      {/* Background glow */}
      <div className="absolute top-[40%] left-[20%] w-[350px] h-[350px] bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Form sheet */}
          <div className="lg:col-span-7">
            <SectionHeading 
              titleLine1="GET A FREE" 
              titleLine2="CONSULTATION" 
              subtitle="CO-CREATE" 
              size="small"
            />

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-light"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className="bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="phone" className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-light"
                    />
                  </div>

                  {/* Instagram */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="instagram" className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">
                      Instagram handle (optional)
                    </label>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="e.g. @rahul_sketches"
                      className="bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Branch selection */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="branch" className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">
                      Preferred Studio *
                    </label>
                    <select
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-light cursor-pointer"
                    >
                      <option value="bangalore">Bangalore (Koramangala 5th Block)</option>
                      <option value="mysore">Mysore (Gokulam 2nd Stage)</option>
                    </select>
                  </div>

                  {/* Service selection */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="service" className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">
                      Select Service *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-light cursor-pointer"
                    >
                      <option value="tattoo">Custom Tattoo Art</option>
                      <option value="piercing">Body Piercing</option>
                      <option value="training">Academy Tattoo Training</option>
                      <option value="other">Other / General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Textarea */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="project" className="text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">
                    Tell us about your project idea *
                  </label>
                  <textarea
                    required
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe placement, size, styling (e.g. realistic black & grey tiger on forearm), and references..."
                    className="bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-light resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="w-full sm:w-auto px-10"
                  >
                    <span>{loading ? "Sending Enquiry..." : "Send Consultation Enquiry"}</span>
                    {!loading && <Send className="w-4 h-4 shrink-0" />}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mt-12 p-8 bg-zinc-950/80 border border-[#00f0ff]/30 rounded-2xl flex flex-col items-center text-center space-y-5 shadow-[0_0_40px_rgba(0,240,255,0.1)]">
                <CheckCircle2 className="w-16 h-16 text-[#00f0ff] animate-bounce" />
                <h4 className="text-xl sm:text-2xl uppercase tracking-wider text-white">
                  Consultation Enquiry Received! 🎉
                </h4>
                <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-md">
                  Thank you, <strong className="text-white font-medium">{formData.name}</strong>. A master artist from our <strong className="text-white font-medium">{formData.branch === "bangalore" ? "Bangalore" : "Mysore"}</strong> studio will WhatsApp you within 24 hours to schedule your session.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#00f0ff] hover:underline font-mono uppercase tracking-widest pt-2 cursor-pointer"
                >
                  Send another request
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Narrative Notes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-white/5 rounded-2xl bg-zinc-950/40 p-6 md:p-8 space-y-4">
              <span className="text-[9px] tracking-[0.25em] font-mono text-[#00f0ff] uppercase block font-semibold">
                DESIGN CULTURE
              </span>
              <h4 className="text-lg sm:text-xl font-light text-white uppercase tracking-wider">
                WE SKETCH FOR FREE
              </h4>
              <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                A dedicated team of our artists will help you co-create a completely free custom sketch. We will select the perfect specialist who aligns precisely with even your most daring ideas.
              </p>
            </div>

            <div className="border border-white/5 rounded-2xl bg-zinc-950/40 p-6 md:p-8 space-y-4">
              <span className="text-[9px] tracking-[0.25em] font-mono text-zinc-500 uppercase block">
                TYPICAL TURNAROUND
              </span>
              <h4 className="text-lg sm:text-xl font-light text-white uppercase tracking-wider">
                FAST RESPONSE TIMES
              </h4>
              <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                Our curation team is highly responsive. We typically verify and respond via WhatsApp or E-mail within <strong className="text-white font-semibold">2 hours</strong> of receipt during operational schedules.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default ConsultationForm;
