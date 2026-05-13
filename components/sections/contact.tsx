"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    project: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light tracking-[0.2em] uppercase text-white mb-4">
            Let's Talk Ink
          </h2>
          <p className="text-gray-500 uppercase tracking-widest text-sm">
            Every great tattoo starts with a conversation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-zinc-900/50 p-8 md:p-12 border border-white/5 rounded-3xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Arjun Singh"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="arjun@example.com"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Instagram (Optional)</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@username"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-8">
            <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Project Description</label>
            <textarea
              name="project"
              value={formData.project}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your idea, placement, and size..."
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
            />
          </div>

          <button className="w-full bg-white text-black py-4 rounded-xl font-medium uppercase tracking-[0.2em] hover:bg-black hover:text-white border border-white transition-all duration-500">
            Book Free Consultation
          </button>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Location</h4>
            <p className="text-white font-light uppercase tracking-wider">Bangalore, India</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Social</h4>
            <p className="text-white font-light uppercase tracking-wider">@inknation.blr</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">Hours</h4>
            <p className="text-white font-light uppercase tracking-wider">Mon–Sat: 11AM–8PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};
