"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxImage {
  url: string;
  title?: string;
  artist?: string;
  style?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  // Lock scroll on mount
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setCopied(false);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setCopied(false);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin + currentImage.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999999] flex flex-col justify-between bg-black/98 p-4 md:p-8 backdrop-blur-md select-none"
      >
        {/* Header Bar */}
        <div className="flex justify-between items-center w-full relative z-10">
          <div className="text-left">
            <span className="text-[10px] tracking-widest uppercase text-[#00f0ff] font-semibold block">
              {currentImage.style || "Custom Art"}
            </span>
            <h4 className="text-sm md:text-base font-light text-white uppercase tracking-wider">
              {currentImage.title || "Tattoo Portfolio"}
            </h4>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white cursor-pointer transition-colors duration-200"
              title="Copy Image Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white cursor-pointer transition-colors duration-200"
              aria-label="Close Lightbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Core Media Showcase */}
        <div className="relative flex-grow flex items-center justify-center my-6 max-h-[75vh]">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 z-20 p-4 bg-black/50 hover:bg-white/10 border border-white/10 rounded-full text-white cursor-pointer transition-colors duration-200"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image display */}
          <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
            <Image
              src={currentImage.url}
              alt={currentImage.title || "Tattoo Design"}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 z-20 p-4 bg-black/50 hover:bg-white/10 border border-white/10 rounded-full text-white cursor-pointer transition-colors duration-200"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Footer Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full border-t border-white/5 pt-4 gap-3 relative z-10">
          <div className="text-center sm:text-left">
            <span className="text-[10px] tracking-widest text-zinc-500 uppercase block">
              ARTIST
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider text-white">
              {currentImage.artist || "Ink Nation Master"}
            </span>
          </div>

          <div className="text-zinc-500 text-xs tracking-widest font-mono">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
export default Lightbox;
