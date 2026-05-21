"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Star, Mail } from "lucide-react";

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
    location: "Bangalore Studio",
    instagram: "",
    project: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="bg-black py-24 px-6 relative overflow-hidden">
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
            <div className="bg-zinc-950 p-8 border border-white/5 rounded-3xl hover:border-zinc-800 transition-all duration-500 relative group">
              <div className="absolute top-8 right-8 flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium border border-cyan-500/20">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>4.8</span>
                <span className="text-cyan-400/60 font-light text-[10px]">(1,200+)</span>
              </div>
              <h3 className="text-2xl font-light uppercase tracking-widest text-white mb-6">Bangalore Studio</h3>
              
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
                    className="flex-1 text-center py-2.5 bg-zinc-900 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-500/5 text-white rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Mysore Studio card */}
            <div className="bg-zinc-950 p-8 border border-white/5 rounded-3xl hover:border-zinc-800 transition-all duration-500 relative group">
              <div className="absolute top-8 right-8 flex items-center gap-1.5 bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium border border-cyan-500/20">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>5.0</span>
                <span className="text-cyan-400/60 font-light text-[10px]">(650+)</span>
              </div>
              <h3 className="text-2xl font-light uppercase tracking-widest text-white mb-6">Mysore Studio</h3>
              
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
                    className="flex-1 text-center py-2.5 bg-zinc-900 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-500/5 text-white rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300"
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
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="bg-zinc-950 p-8 md:p-12 border border-white/5 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Arjun Singh"
                    className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="arjun@example.com"
                    className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Preferred Location</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.5rem' }}
                  >
                    <option value="Bangalore Studio" className="bg-black text-white">Bangalore Studio</option>
                    <option value="Mysore Studio" className="bg-black text-white">Mysore Studio</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Instagram Handle (Optional)</label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@username"
                    className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Describe Your Tattoo Idea</label>
                <textarea
                  name="project"
                  required
                  value={formData.project}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about the concept, reference images, sizing (e.g. 4x4 inches), and placement (e.g. forearm)..."
                  className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors resize-none font-light text-sm"
                />
              </div>

              {/* Consistent rounded-full consultation button */}
              <button
                type="submit"
                className="w-full bg-white text-black py-4 rounded-full font-extrabold uppercase tracking-widest text-xs hover:bg-[#00f0ff] hover:text-black hover:border-[#00f0ff] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-white"
              >
                GET INKED
              </button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-500 text-xs text-center font-light uppercase tracking-widest"
                >
                  Consultation request submitted! We will reach out within 24 hours.
                </motion.p>
              )}
            </form>
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
