"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  className = "",
  children,
}) => {
  // Esc key closes modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Lock scroll

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // Unlock scroll
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={cn(
              "relative bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl backdrop-blur-xl z-10",
              className
            )}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              {title && (
                <h3 className="text-xl font-light tracking-widest text-[#00f0ff] uppercase">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer ml-auto"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="text-zinc-300 font-light leading-relaxed">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default Modal;
