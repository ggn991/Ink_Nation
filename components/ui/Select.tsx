"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ThemedSelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export const ThemedSelect: React.FC<ThemedSelectProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  className = "",
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-black border rounded-xl px-4 py-3.5 text-sm text-left flex items-center justify-between transition-all duration-300 cursor-pointer font-light select-none ${
          error
            ? "border-red-500 text-white focus:ring-1 focus:ring-red-500/20"
            : isOpen
            ? "border-[#00f0ff] ring-1 ring-[#00f0ff]/20 shadow-[0_0_15px_rgba(0,240,255,0.1)] text-white"
            : "border-zinc-800 hover:border-zinc-700 text-white"
        } ${className}`}
      >
        <span className={`block truncate ${selectedOption ? "text-white" : "text-zinc-500"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#00f0ff]" : ""
          }`}
        />
      </button>

      {/* Floating Dark Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-[100] left-0 right-0 top-full bg-zinc-950/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl py-1.5 max-h-72 sm:max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700"
            role="listbox"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    if (option.disabled) return;
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-xs tracking-wider uppercase font-medium flex items-center justify-between transition-colors duration-150 select-none ${
                    option.disabled
                      ? "opacity-40 text-zinc-600 cursor-not-allowed"
                      : isSelected
                      ? "bg-[#00f0ff]/10 text-[#00f0ff] font-semibold cursor-pointer"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white cursor-pointer"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#00f0ff] shrink-0 ml-2" />}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
