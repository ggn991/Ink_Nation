"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Star, Mail, Send, CheckCircle2 } from "lucide-react";
import { formValidationSchema } from "@/lib/validation";
import { Button } from "@/components/ui/Button";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    branch: "bangalore",
    service: "tattoo",
    project: ""
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = formValidationSchema.safeParse({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });

    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; phone?: string } = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof typeof fieldErrors;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      console.log("Ink Nation Contact Form Data Submitted:", formData);
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-black py-24 px-6 relative overflow-hidden select-none">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-zinc-900/30 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h4 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">Connect With Us</h4>
          <h2 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase text-white mb-6">
            Let's Talk Ink
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 font-light leading-relaxed">
            Every great masterpiece starts with a conversation. Visit our premium studios, browse the interactive maps, or fill out the consultation form below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Studio Details column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Bangalore Studio card */}
            <div className="bg-zinc-950 p-6 sm:p-8 border border-white/5 rounded-3xl hover:border-zinc-800 transition-all duration-500 relative group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-2xl font-light uppercase tracking-widest text-white">Bangalore Studio</h3>
                <div className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium border border-cyan-500/20 w-max">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>4.8</span>
                  <span className="text-cyan-400/60 font-light text-[10px]">(1,200+)</span>
                </div>
              </div>
              
              {/* Interactive map */}
              <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10 mb-6 relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3750831637494!2d77.61353!3d12.9361184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15f1e7d08be3%3A0x1827d258214103fd!2sInk+Nation+tattoo+studio!5e0!3m2!1sen!2sin!4v1716192000000!5m2!1sen!2sin"
                  className="w-full h-full grayscale invert opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Address</h4>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">
                      1st Floor, 20th Main Rd, KHB Colony, 5th Block, Koramangala, Bengaluru, Karnataka 560095
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Phone</h4>
                    <p className="text-gray-400 font-light text-sm">
                      <a href="tel:+918735097898" className="hover:text-white transition-colors">+91 87350 97898</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Hours</h4>
                    <p className="text-gray-400 font-light text-sm">
                      10:00 AM – 9:00 PM Daily
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <a 
                    href="https://www.google.com/maps/place/Ink+Nation+tattoo+studio/@12.9361184,77.61353,17z/data=!3m1!5s0x3bae144ff14aea87:0x53ca2f919ed6b693!4m14!1m7!3m6!1s0x3bae15f1e7d08be3:0x1827d258214103fd!2sInk+Nation+tattoo+studio!8m2!3d12.9361184!4d77.6161049!16s%2Fg%2F11qgk27lrn!3m5!1s0x3bae15f1e7d08be3:0x1827d258214103fd!8m2!3d12.9361184!4d77.6161049!16s%2Fg%2F11qgk27lrn?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 bg-white text-black hover:bg-cyan-400 hover:text-black hover:border-cyan-400 border border-white rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300"
                  >
                    View on Maps
                  </a>
                  <a 
                    href="https://wa.me/918735097898"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 bg-emerald-600 border border-emerald-600 text-white hover:bg-emerald-500 sm:bg-zinc-900 sm:border-white/10 sm:text-white sm:hover:border-cyan-400 sm:hover:text-cyan-400 sm:hover:bg-cyan-500/5 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 whitespace-nowrap"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Mysore Studio card */}
            <div className="bg-zinc-950 p-6 sm:p-8 border border-white/5 rounded-3xl hover:border-zinc-800 transition-all duration-500 relative group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-2xl font-light uppercase tracking-widest text-white">Mysore Studio</h3>
                <div className="flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium border border-cyan-500/20 w-max">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>5.0</span>
                  <span className="text-cyan-400/60 font-light text-[10px]">(650+)</span>
                </div>
              </div>
              
              {/* Interactive map */}
              <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10 mb-6 relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.1563216892556!2d76.6263891!3d12.29656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7b41f225f739%3A0x6bc60281c863ae6f!2sInk+Nation+Tattoo+Studio+02!5e0!3m2!1sen!2sin!4v1716192000000!5m2!1sen!2sin"
                  className="w-full h-full grayscale invert opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Address</h4>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">
                      F-225, Near Ganesha Temple, 1st Floor, 1st Main Road, Gokulam, Mysuru, Karnataka 570002
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Phone</h4>
                    <p className="text-gray-400 font-light text-sm">
                      <a href="tel:+918735097898" className="hover:text-white transition-colors">+91 87350 97898</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-zinc-600 mb-1">Hours</h4>
                    <p className="text-gray-400 font-light text-sm">
                      11:00 AM – 9:00 PM Daily
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <a 
                    href="https://www.google.com/maps/place/Ink+Nation+Tattoo+Studio+02/@12.29656,76.6263891,17z/data=!3m1!4b1!4m6!3m5!1s0x3baf7b41f225f739:0x6bc60281c863ae6f!8m2!3d12.29656!4d76.628964!16s%2Fg%2F11stydhq7d?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 bg-white text-black hover:bg-cyan-400 hover:text-black hover:border-cyan-400 border border-white rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300"
                  >
                    View on Maps
                  </a>
                  <a 
                    href="https://wa.me/918735097898"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 bg-emerald-600 border border-emerald-600 text-white hover:bg-emerald-500 sm:bg-zinc-900 sm:border-white/10 sm:text-white sm:hover:border-cyan-400 sm:hover:text-cyan-400 sm:hover:bg-cyan-500/5 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 whitespace-nowrap"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 w-full"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-zinc-950 p-8 md:p-12 border border-white/5 rounded-3xl space-y-6">
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
                      className={`bg-black border rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all font-light ${
                        errors.name 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                          : "border-zinc-800 hover:border-zinc-700 focus:border-[#00f0ff] focus:ring-[#00f0ff]/20"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-[11px] mt-1 ml-1 font-light">{errors.name}</p>
                    )}
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
                      className={`bg-black border rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all font-light ${
                        errors.email 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                          : "border-zinc-800 hover:border-zinc-700 focus:border-[#00f0ff] focus:ring-[#00f0ff]/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[11px] mt-1 ml-1 font-light">{errors.email}</p>
                    )}
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
                      className={`bg-black border rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all font-light ${
                        errors.phone 
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                          : "border-zinc-800 hover:border-zinc-700 focus:border-[#00f0ff] focus:ring-[#00f0ff]/20"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-[11px] mt-1 ml-1 font-light">{errors.phone}</p>
                    )}
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
                      className="bg-black border border-zinc-800 hover:border-zinc-700 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-light"
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
                      className="bg-black border border-zinc-800 hover:border-zinc-700 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-light cursor-pointer appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.5rem' }}
                    >
                      <option value="bangalore" className="bg-black text-white">Bangalore (Koramangala 5th Block)</option>
                      <option value="mysore" className="bg-black text-white">Mysore (Gokulam 2nd Stage)</option>
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
                      className="bg-black border border-zinc-800 hover:border-zinc-700 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-light cursor-pointer appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.5rem' }}
                    >
                      <option value="tattoo" className="bg-black text-white">Custom Tattoo Art</option>
                      <option value="piercing" className="bg-black text-white">Body Piercing</option>
                      <option value="training" className="bg-black text-white">Academy Tattoo Training</option>
                      <option value="other" className="bg-black text-white">Other / General Inquiry</option>
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
                    className="bg-black border border-zinc-800 hover:border-zinc-700 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-light resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="w-full sm:w-auto px-6 sm:px-10 py-2.5 sm:py-3 whitespace-nowrap text-[9px] sm:text-[10px]"
                  >
                    <span>
                      {loading ? "Sending..." : (
                        <>
                          <span className="inline sm:hidden">Send Enquiry</span>
                          <span className="hidden sm:inline">Send Consultation Enquiry</span>
                        </>
                      )}
                    </span>
                    {!loading && <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="p-8 md:p-12 bg-zinc-950 border border-[#00f0ff]/30 rounded-3xl flex flex-col items-center text-center space-y-5 shadow-[0_0_40px_rgba(0,240,255,0.1)]">
                <CheckCircle2 className="w-16 h-16 text-[#00f0ff] animate-bounce" />
                <h4 className="text-xl sm:text-2xl uppercase tracking-wider text-white">
                  Consultation Enquiry Received! 🎉
                </h4>
                <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-md">
                  Thank you, <strong className="text-white font-medium">{formData.name}</strong>. A master artist from our <strong className="text-white font-medium">{formData.branch === "bangalore" ? "Bangalore" : "Mysore"}</strong> studio will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#00f0ff] hover:underline font-mono uppercase tracking-widest pt-2 cursor-pointer"
                >
                  Send another request
                </button>
              </div>
            )}
          </motion.div>

        </div>

        {/* Global info footer */}
        <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-zinc-400">
          <div className="flex flex-col items-center">
            <Mail className="w-5 h-5 text-zinc-500 mb-2" />
            <h4 className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Global Email</h4>
            <p className="text-white font-light text-sm">
              <a href="mailto:hello@inknation.in" className="hover:text-zinc-300 transition-colors">hello@inknation.in</a>
            </p>
          </div>
          <div className="flex flex-col items-center">
            <InstagramIcon className="w-5 h-5 text-zinc-500 mb-2" />
            <h4 className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Social Networks</h4>
            <div className="flex gap-4 text-white font-light text-sm">
              <a href="https://instagram.com/inknation.blr" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">@inknation.blr</a>
              <span className="text-zinc-800">|</span>
              <a href="https://instagram.com/inknation.mys" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">@inknation.mys</a>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Star className="w-5 h-5 text-cyan-400 mb-2 fill-cyan-500/10" />
            <h4 className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Ink Nation Rating</h4>
            <p className="text-white font-light text-sm uppercase tracking-wider">
              4.9+ <span className="text-cyan-400 font-medium">★</span> <span className="text-zinc-500 font-normal">(1,850+ reviews total)</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
