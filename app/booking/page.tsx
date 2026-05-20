"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";
import { Footer } from "@/components/layout/footer";
import { Check, Calendar, User, Shield, Star, MapPin, ArrowRight, ArrowLeft, Upload, Sparkles, X, CheckCircle, ShieldCheck } from "lucide-react";
import { artists } from "@/lib/data/artists";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    branch: "",
    service: "",
    artist: "",
    placement: "",
    size: "4x4 inches",
    notes: "",
    referenceImage: null as string | null,
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    agreeToSafety: false
  });

  const [uploading, setUploading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const branches = [
    {
      id: "bangalore",
      name: "Bangalore flagship",
      rating: "4.8★",
      reviews: "1,200+ reviews",
      address: "1st Floor, 20th Main Rd, KHB Colony, 5th Block, Koramangala, Bengaluru, 560095",
      image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800"
    },
    {
      id: "mysore",
      name: "Mysore flagship",
      rating: "5.0★",
      reviews: "650+ reviews",
      address: "F-225, Near Ganesha Temple, 1st Floor, 1st Main Road, Gokulam, Mysuru, 570002",
      image: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800"
    }
  ];

  const services = [
    { id: "tattoo", name: "Custom Tattoo" },
    { id: "piercing", name: "Body Piercing" },
    { id: "nails", name: "Nail Art", comingSoon: true },
    { id: "removal", name: "Tattoo Removal", comingSoon: true },
    { id: "training", name: "Tattoo Academy" }
  ];

  // List of tattoo artists from artists.ts
  const tattooArtists = artists.map(a => a.name);
  const piercingArtists = ["Elena Rust", "Maya Sun", "Zoya Khan", "Sasha Gray"];
  const generalConsultants = ["Senior Technical Specialist", "Resident Practitioner"];

  const getArtistsForService = (service: string) => {
    if (service === "Custom Tattoo" || service === "Tattoo Academy") return tattooArtists;
    if (service === "Body Piercing") return piercingArtists;
    return generalConsultants;
  };

  const handleBranchSelect = (branchId: string) => {
    setBookingData(prev => ({ ...prev, branch: branchId }));
    setStep(2);
  };

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      setTimeout(() => {
        setBookingData(prev => ({ ...prev, referenceImage: e.target.files![0].name }));
        setUploading(false);
      }, 1500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData(prev => ({ ...prev, agreeToSafety: e.target.checked }));
  };

  const handleNext = () => {
    if (step < 4) setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const isNextDisabled = () => {
    if (step === 1) return !bookingData.branch;
    if (step === 2) return !bookingData.service || !bookingData.artist;
    if (step === 3) return !bookingData.placement || !bookingData.notes;
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.agreeToSafety) return;

    // Log the consolidated booking object to console
    console.log("CONSOLIDATED INK NATION BOOKING:", bookingData);
    setSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
    // Reset wizard
    setStep(1);
    setBookingData({
      branch: "",
      service: "",
      artist: "",
      placement: "",
      size: "4x4 inches",
      notes: "",
      referenceImage: null,
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      agreeToSafety: false
    });
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Booking", item: "/booking" }
  ];

  return (
    <AppProviders>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-black text-white pt-36 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.03)_0%,_transparent_75%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h4 className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Consultation Setup</h4>
            <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase mb-4">
              Book A <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">Session</span>
            </h1>
            <p className="text-gray-400 font-light text-sm max-w-md mx-auto">
              Our master custom-practitioners work strictly by appointment. Map out your next visual statement.
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="mb-12 flex justify-between items-center max-w-md mx-auto relative px-2">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2 -z-10" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-cyan-400 -translate-y-1/2 -z-10 transition-all duration-500" 
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-500 border ${
                  s < step 
                    ? "bg-cyan-500 text-black border-cyan-500" 
                    : s === step 
                      ? "bg-black text-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)] scale-110" 
                      : "bg-black text-zinc-600 border-zinc-800"
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>

          {/* Step Container */}
          <div className="bg-zinc-950/60 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-10 min-h-[400px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Branch Card Selector */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-light uppercase tracking-wider text-white border-b border-white/5 pb-3">
                    Step 1: Select Studio Branch
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {branches.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => handleBranchSelect(b.id)}
                        className={`bg-zinc-950 border rounded-3xl overflow-hidden p-3 cursor-pointer group transition-all duration-500 flex flex-col justify-between ${
                          bookingData.branch === b.id 
                            ? "border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.15)] bg-cyan-950/5" 
                            : "border-white/5 hover:border-cyan-400/30"
                        }`}
                      >
                        <div className="aspect-[16/10] rounded-2xl overflow-hidden relative mb-4">
                          <img 
                            src={b.image} 
                            alt={b.name} 
                            className="w-full h-full object-cover grayscale group-hover:scale-102 group-hover:grayscale-0 transition-all duration-700"
                          />
                          <div className="absolute top-4 right-4 flex items-center gap-1 bg-zinc-950/90 text-cyan-400 px-3 py-1 rounded-full text-[10px] font-bold border border-cyan-500/20">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{b.rating}</span>
                          </div>
                        </div>
                        <div className="px-2 pb-2 space-y-2">
                          <h4 className="text-lg font-light uppercase tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                            {b.name}
                          </h4>
                          <p className="text-zinc-500 text-xs font-light leading-relaxed">
                            {b.address}
                          </p>
                          <div className="pt-2 flex justify-between items-center text-[10px] uppercase tracking-widest font-semibold font-mono text-zinc-400">
                            <span>{b.reviews}</span>
                            <span className="text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                              Select <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Service & Artist Dropdowns */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-light uppercase tracking-wider text-white border-b border-white/5 pb-3">
                    Step 2: Select Service & Artist
                  </h3>

                  <div className="space-y-6 pt-2">
                    {/* Service Selector */}
                    <div className="space-y-3">
                      <label className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Which Service Do You Need?</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {services.map((s) => (
                          <button
                            key={s.id}
                            disabled={s.comingSoon}
                            onClick={() => setBookingData(prev => ({ ...prev, service: s.name, artist: "" }))}
                            className={`px-4 py-3 rounded-full border text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 relative ${
                              s.comingSoon 
                                ? "opacity-30 border-white/5 bg-zinc-950/20 text-zinc-600 cursor-not-allowed" 
                                : bookingData.service === s.name
                                  ? "bg-cyan-500/10 border-cyan-400 text-cyan-400"
                                  : "bg-black border-white/5 text-zinc-400 hover:text-white hover:border-white/20 cursor-pointer"
                            }`}
                          >
                            <span>{s.name}</span>
                            {s.comingSoon && (
                              <span className="absolute -top-2 -right-1 bg-zinc-900 border border-white/10 text-white/40 px-1.5 py-0.5 rounded-md text-[6px] tracking-normal">
                                Soon
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Artist Dropdown */}
                    {bookingData.service && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <label className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Select Your Practitioner</label>
                        <div className="relative">
                          <select
                            name="artist"
                            value={bookingData.artist}
                            onChange={handleInputChange}
                            className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm appearance-none cursor-pointer"
                            style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.5rem' }}
                          >
                            <option value="" className="bg-black text-zinc-500">Choose Artist...</option>
                            {getArtistsForService(bookingData.service).map((artistName) => (
                              <option key={artistName} value={artistName} className="bg-black text-white">{artistName}</option>
                            ))}
                          </select>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-light font-mono uppercase tracking-wider">
                          * Selected service matches our master illustrators and technicians.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Concept Notes & Reference Upload */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-light uppercase tracking-wider text-white border-b border-white/5 pb-3">
                    Step 3: Concept Details & placement
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                      {/* Placement selector */}
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Anatomical Placement</label>
                        <select
                          name="placement"
                          value={bookingData.placement}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm appearance-none cursor-pointer"
                          style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.5rem' }}
                        >
                          <option value="" className="bg-black text-zinc-500">Choose anatomical area...</option>
                          <option value="Arm / Forearm">Arm / Forearm</option>
                          <option value="Wrist / Hand">Wrist / Hand</option>
                          <option value="Leg / Calf / Thigh">Leg / Calf / Thigh</option>
                          <option value="Chest / Ribs">Chest / Ribs</option>
                          <option value="Back / Shoulder">Back / Shoulder</option>
                          <option value="Collarbone / Neck">Collarbone / Neck</option>
                          <option value="Ear (Cartilage/Lobe)">Ear (Cartilage/Lobe)</option>
                          <option value="Face / Septum / Nose">Face / Septum / Nose</option>
                          <option value="Other Area">Other Anatomical Area</option>
                        </select>
                      </div>

                      {/* Sizing description */}
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Estimated Dimensions</label>
                        <input
                          type="text"
                          name="size"
                          value={bookingData.size}
                          onChange={handleInputChange}
                          placeholder="e.g. 4x4 inches, or Half Sleeve"
                          className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Interactive Drag & Drop box */}
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Reference Images (Optional)</label>
                        <div className="border border-dashed border-white/10 hover:border-cyan-400/30 rounded-2xl p-6 bg-black flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative group min-h-[140px]">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleSimulatedUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {uploading ? (
                            <div className="space-y-2">
                              <div className="w-12 h-1 h-1 bg-zinc-800 rounded-full overflow-hidden mx-auto">
                                <motion.div 
                                  className="h-full bg-cyan-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 1.5 }}
                                />
                              </div>
                              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-semibold font-mono">Uploading image...</span>
                            </div>
                          ) : bookingData.referenceImage ? (
                            <div className="space-y-2 text-cyan-400">
                              <CheckCircle className="w-8 h-8 mx-auto" />
                              <span className="text-[10px] uppercase tracking-widest font-mono font-semibold block">{bookingData.referenceImage}</span>
                              <span className="text-[9px] text-zinc-500 block">Click to upload alternative</span>
                            </div>
                          ) : (
                            <div className="space-y-2 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                              <Upload className="w-8 h-8 mx-auto stroke-1" />
                              <span className="text-[10px] uppercase tracking-widest font-mono font-semibold block">Drag & Drop Stencils</span>
                              <span className="text-[9px] block">PNG, JPG up to 10MB</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Concept description textarea */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Describe the Concept</label>
                    <textarea
                      name="notes"
                      value={bookingData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Explain your ideas, custom elements, symbolism, or any specific requests..."
                      className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors resize-none font-light text-sm"
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Personal Info & Final Review */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-light uppercase tracking-wider text-white border-b border-white/5 pb-3">
                    Step 4: Personal Info & Review
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Review card */}
                    <div className="bg-black border border-white/5 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-light text-zinc-400">
                      <div>
                        <h5 className="uppercase text-[9px] text-zinc-600 tracking-wider">Branch</h5>
                        <p className="text-cyan-400 font-semibold uppercase mt-0.5">{bookingData.branch}</p>
                      </div>
                      <div>
                        <h5 className="uppercase text-[9px] text-zinc-600 tracking-wider">Service</h5>
                        <p className="text-white font-semibold uppercase mt-0.5">{bookingData.service}</p>
                      </div>
                      <div>
                        <h5 className="uppercase text-[9px] text-zinc-600 tracking-wider">Practitioner</h5>
                        <p className="text-white font-semibold mt-0.5">{bookingData.artist}</p>
                      </div>
                      <div>
                        <h5 className="uppercase text-[9px] text-zinc-600 tracking-wider">Area / Size</h5>
                        <p className="text-white font-semibold mt-0.5">{bookingData.placement} / {bookingData.size}</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500">Your Full Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={bookingData.name}
                          onChange={handleInputChange}
                          placeholder="Arjun Singh"
                          className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={bookingData.email}
                          onChange={handleInputChange}
                          placeholder="arjun@example.com"
                          className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500">WhatsApp / Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500">Preferred Date</label>
                        <input
                          type="date"
                          name="date"
                          required
                          value={bookingData.date}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm appearance-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-zinc-500">Preferred Time Slot</label>
                        <select
                          name="time"
                          required
                          value={bookingData.time}
                          onChange={handleInputChange}
                          className="w-full bg-black border border-zinc-800 hover:border-zinc-700 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-white focus:outline-none transition-colors font-light text-sm appearance-none cursor-pointer"
                          style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.5rem' }}
                        >
                          <option value="" className="bg-black text-zinc-500">Choose slot...</option>
                          <option value="11:00 AM - 1:00 PM">Morning (11:00 AM - 1:00 PM)</option>
                          <option value="1:30 PM - 4:00 PM">Afternoon (1:30 PM - 4:00 PM)</option>
                          <option value="4:30 PM - 7:00 PM">Evening (4:30 PM - 7:00 PM)</option>
                          <option value="7:30 PM - 9:00 PM">Late Evening (7:30 PM - 9:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    {/* Safety compliance check */}
                    <div className="flex items-start gap-3 bg-zinc-950 p-4 border border-zinc-800 rounded-xl">
                      <input 
                        type="checkbox" 
                        id="safety" 
                        required
                        checked={bookingData.agreeToSafety}
                        onChange={handleCheckboxChange}
                        className="mt-1 w-4.5 h-4.5 rounded text-cyan-400 bg-black border-zinc-800 focus:ring-cyan-500 focus:ring-opacity-25"
                      />
                      <label htmlFor="safety" className="text-zinc-400 text-xs leading-relaxed font-light select-none">
                        I confirm that I am 18+ years old, do not have skin conditions, and agree to follow the sterile <span className="text-cyan-400 font-medium">autoclave safety protocols</span> of Ink Nation.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!bookingData.agreeToSafety}
                      className={`w-full py-4 rounded-full font-semibold uppercase tracking-widest text-xs transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] border cursor-pointer ${
                        bookingData.agreeToSafety 
                          ? "bg-white text-black border-white hover:bg-cyan-400 hover:text-black hover:border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]" 
                          : "bg-zinc-800 text-zinc-500 border-zinc-800 cursor-not-allowed opacity-50"
                      }`}
                    >
                      Submit Booking request
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            {step > 1 && (
              <div className="flex gap-4 pt-8 border-t border-white/5 mt-8 justify-between">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 rounded-full border border-white/10 hover:border-white text-white text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                {step < 4 && (
                  <button
                    onClick={handleNext}
                    disabled={isNextDisabled()}
                    className={`px-8 py-3 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 inline-flex items-center gap-2 border ${
                      isNextDisabled()
                        ? "bg-zinc-800 text-zinc-600 border-zinc-800 cursor-not-allowed opacity-50"
                        : "bg-white text-black border-white hover:bg-cyan-400 hover:text-black hover:border-cyan-400 cursor-pointer"
                    }`}
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SUCCESS CONFIRMATION MODAL OVERLAY */}
        <AnimatePresence>
          {successModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-zinc-950 border border-white/15 max-w-lg w-full rounded-3xl p-8 text-center relative overflow-hidden space-y-6"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]" />
                
                {/* SVG Check Animation */}
                <div className="flex justify-center pt-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400"
                  >
                    <CheckCircle className="w-10 h-10 stroke-1.5" />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-cyan-400 uppercase tracking-widest text-xs font-mono font-semibold">Appointment Request Received</h4>
                  <h2 className="text-2xl md:text-3xl font-light uppercase tracking-wider text-white">We Make You A Believer</h2>
                </div>

                <div className="text-gray-400 font-light text-sm leading-relaxed space-y-4 px-2">
                  <p>
                    Thank you, <span className="text-white font-semibold">{bookingData.name}</span>. Your custom consultation booking request for <span className="text-cyan-400 font-semibold">{bookingData.service}</span> has been logged.
                  </p>
                  <div className="p-4 bg-zinc-900/60 rounded-2xl text-xs space-y-2 border border-white/5 text-left font-mono">
                    <p><span className="text-zinc-500">BRANCH:</span> {bookingData.branch.toUpperCase()} FLAGSHIP</p>
                    <p><span className="text-zinc-500">ARTIST:</span> {bookingData.artist}</p>
                    <p><span className="text-zinc-500">DATE:</span> {bookingData.date} ({bookingData.time})</p>
                  </div>
                  <p className="text-zinc-500 text-xs">
                    Our studio coordinators will review your design concept and confirm your exact slot via WhatsApp within 2-4 business hours.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <a 
                    href={`https://wa.me/${bookingData.branch === "mysore" ? "918735097898" : "918735097898"}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-cyan-400 text-black py-3 rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-cyan-500 transition-all duration-300 block shadow-md cursor-pointer"
                  >
                    Direct WhatsApp coordinate
                  </a>
                  <button
                    onClick={closeSuccessModal}
                    className="w-full bg-zinc-900 border border-white/10 hover:border-white/20 text-white py-3 rounded-full font-semibold uppercase tracking-widest text-xs transition-colors duration-300 block cursor-pointer"
                  >
                    Return to gallery
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </main>
    </AppProviders>
  );
}
