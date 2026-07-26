"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

export interface ThemedDatePickerProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minDate?: string;
  placeholder?: string;
  className?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const ThemedDatePicker: React.FC<ThemedDatePickerProps> = ({
  id,
  value,
  onChange,
  placeholder = "Select Date...",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse today's date at 00:00:00
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse value or default to today
  const selectedDate = value ? new Date(value + "T00:00:00") : null;

  // View state for calendar navigation
  const [viewDate, setViewDate] = useState(() => {
    return selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1);
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    // Prevent navigating to past months before current month
    const newDate = new Date(year, month - 1, 1);
    if (newDate.getFullYear() < today.getFullYear() || (newDate.getFullYear() === today.getFullYear() && newDate.getMonth() < today.getMonth())) {
      return;
    }
    setViewDate(newDate);
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const formatDateString = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${y}-${mm}-${dd}`;
  };

  const handleSelectDay = (day: number) => {
    const dateStr = formatDateString(year, month, day);
    onChange(dateStr);
    setIsOpen(false);
  };

  const formatDisplayDate = (valStr: string) => {
    if (!valStr) return "";
    const d = new Date(valStr + "T00:00:00");
    if (isNaN(d.getTime())) return valStr;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const isPrevDisabled = year === today.getFullYear() && month === today.getMonth();

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input Trigger Button */}
      <button
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-black border rounded-xl px-4 py-3.5 text-sm text-left flex items-center justify-between transition-all duration-300 cursor-pointer font-light select-none ${
          isOpen
            ? "border-[#00f0ff] ring-1 ring-[#00f0ff]/20 shadow-[0_0_15px_rgba(0,240,255,0.1)] text-white"
            : "border-zinc-800 hover:border-zinc-700 text-white"
        } ${className}`}
      >
        <span className={`block truncate ${value ? "text-white" : "text-zinc-500"}`}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <CalendarIcon className={`w-4 h-4 text-zinc-400 shrink-0 transition-colors ${isOpen ? "text-[#00f0ff]" : ""}`} />
      </button>

      {/* Floating Dark Calendar Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-[100] left-0 right-0 sm:right-auto sm:w-80 top-full bg-zinc-950/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl p-4 select-none"
          >
            {/* Header Navigation */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="text-xs font-semibold uppercase tracking-widest text-white">
                {MONTH_NAMES[month]} {year}
              </span>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  disabled={isPrevDisabled}
                  onClick={prevMonth}
                  className={`p-1.5 rounded-lg border border-white/10 transition-colors ${
                    isPrevDisabled
                      ? "opacity-20 cursor-not-allowed text-zinc-600"
                      : "hover:bg-white/10 text-zinc-300 hover:text-white cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Day Names Grid */}
            <div className="grid grid-cols-7 gap-1 mb-2 text-center">
              {DAY_NAMES.map((d) => (
                <span key={d} className="text-[10px] uppercase font-mono font-semibold text-zinc-500">
                  {d}
                </span>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Empty leading padding slots */}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="h-8" />
              ))}

              {/* Day numbers */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateObj = new Date(year, month, dayNum);
                dateObj.setHours(0, 0, 0, 0);

                const isPast = dateObj.getTime() < today.getTime();
                const isSelected = selectedDate && selectedDate.getTime() === dateObj.getTime();
                const isToday = today.getTime() === dateObj.getTime();

                return (
                  <button
                    key={dayNum}
                    type="button"
                    disabled={isPast}
                    onClick={() => handleSelectDay(dayNum)}
                    className={`h-8 w-full rounded-lg text-xs font-mono font-medium flex items-center justify-center transition-all duration-150 ${
                      isPast
                        ? "opacity-20 text-zinc-600 cursor-not-allowed"
                        : isSelected
                        ? "bg-[#00f0ff] text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
                        : isToday
                        ? "border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10 cursor-pointer"
                        : "text-zinc-300 hover:bg-white/10 hover:text-white cursor-pointer"
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
