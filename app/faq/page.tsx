"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";
import { Footer } from "@/components/layout/footer";
import { faqs, faqCategories } from "@/lib/data/faqs";
import { Plus, Minus, Search } from "lucide-react";
import { FAQPageSchema, BreadcrumbSchema } from "@/lib/seo/json-ld";

function FAQAccordionItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/5 last:border-b-0 py-5">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left py-3 focus:outline-none cursor-pointer group"
      >
        <span className="text-base sm:text-lg font-light text-white group-hover:text-cyan-400 transition-colors tracking-wide">
          {question}
        </span>
        <span className="ml-4 p-1.5 rounded-full bg-zinc-950 border border-white/5 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 transition-all text-zinc-400 group-hover:text-cyan-400 shrink-0">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { height: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.25 } } }}
            exit={{ height: 0, opacity: 0, transition: { height: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.15 } } }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 font-light text-sm leading-relaxed pb-4 pr-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Before Getting Inked");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = faq.category === activeCategory;
    const matchesSearch = searchQuery
      ? faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return searchQuery ? matchesSearch : matchesCategory;
  });

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "FAQ", item: "/faq" }
  ];

  return (
    <AppProviders>
      <FAQPageSchema questions={faqs} />
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-black text-white pt-36">
        
        {/* Hero */}
        <section className="relative py-12 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.05)_0%,_transparent_75%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Help Center</h4>
              <h1 className="text-4xl md:text-7xl font-light tracking-widest uppercase mb-6 leading-tight">
                Common <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">Queries</span>
              </h1>
              <p className="max-w-xl mx-auto text-gray-400 font-light text-base leading-relaxed mb-10">
                Knowledge leads to confidence. Browse through our clinical procedure details, safe healing rules, and pricing calculators.
              </p>
            </motion.div>
            
            {/* Search Input bar */}
            <div className="max-w-lg mx-auto relative mt-8 px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search questions about ink, piercing, healing..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setOpenIndex(null);
                  }}
                  className="w-full bg-zinc-950 border border-white/10 hover:border-zinc-800 focus:border-cyan-500 rounded-full py-4 pl-12 pr-6 text-white placeholder-zinc-600 focus:outline-none transition-colors font-light text-sm focus:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories toggler */}
        {!searchQuery && (
          <section className="py-6 border-y border-white/5 bg-zinc-950/30 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="max-w-5xl mx-auto flex justify-start md:justify-center gap-2 px-6 w-max min-w-full">
              {faqCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenIndex(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer border ${
                    activeCategory === category
                      ? "bg-cyan-500 text-black border-cyan-500 shadow-md shadow-cyan-500/10"
                      : "text-zinc-500 border-white/5 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* FAQs Drawer Grid */}
        <section className="py-20 px-6 max-w-4xl mx-auto min-h-[400px]">
          {filteredFaqs.length > 0 ? (
            <motion.div
              layout
              className="bg-zinc-950/40 border border-white/5 rounded-3xl p-8 md:p-12"
            >
              {filteredFaqs.map((faq, idx) => (
                <FAQAccordionItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === idx}
                  onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 text-zinc-500 font-light">
              No answers matched your search terms. Please try another query or GET INKED!
            </div>
          )}
        </section>

        <Footer />
      </main>
    </AppProviders>
  );
}
