"use client";

import React from "react";
import { motion } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data/blog-posts";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";

export default function BlogIndexPage() {
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" }
  ];

  return (
    <AppProviders>
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="min-h-screen bg-black text-white pt-36">
        
        {/* Header */}
        <section className="relative py-12 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.05)_0%,_transparent_75%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">Ink Nation Editorial</h4>
              <h1 className="text-4xl md:text-7xl font-light tracking-widest uppercase mb-6 leading-tight">
                Stories <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">& Artistry</span>
              </h1>
              <p className="max-w-xl mx-auto text-gray-400 font-light text-base leading-relaxed">
                Dive deep into the culture of tattooing. Tips, guides, and master insights from our senior practitioners.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Post Card */}
        {featuredPost && (
          <section className="px-6 max-w-7xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-zinc-950 border border-white/5 hover:border-cyan-500/30 rounded-3xl overflow-hidden group transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image Column */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px] bg-zinc-900 overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:scale-102 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/20 to-transparent"></div>
                  <span className="absolute top-6 left-6 bg-cyan-500 text-black px-4 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-bold shadow-lg">
                    Featured Article
                  </span>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-2 sm:gap-4 text-zinc-500 text-[10px] sm:text-xs font-mono uppercase tracking-wider">
                    <span className="text-cyan-400 font-semibold">{featuredPost.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 whitespace-nowrap"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-light uppercase tracking-wide text-white group-hover:text-cyan-400 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-gray-400 font-light text-sm leading-relaxed">
                    {featuredPost.summary}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5 gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-cyan-900/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate max-w-[140px] sm:max-w-none">{featuredPost.author}</h4>
                        <p className="text-[10px] text-zinc-500 font-mono">{featuredPost.date}</p>
                      </div>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`} className="shrink-0">
                      <button className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-cyan-400 hover:text-black transition-all duration-300 transform group-hover:translate-x-1 cursor-pointer shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Editorial Sub-grid */}
        <section className="px-6 max-w-7xl mx-auto pb-32">
          <div className="mb-12">
            <h2 className="text-2xl md:text-4xl font-light uppercase tracking-widest text-white">More Masterwork Articles</h2>
            <p className="text-zinc-500 uppercase tracking-[0.2em] text-xs mt-1">Written by specialists at Bangalore & Mysore</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-zinc-950 border border-white/5 hover:border-cyan-500/30 rounded-3xl overflow-hidden group flex flex-col justify-between p-4 cursor-pointer transition-all duration-500"
              >
                <Link href={`/blog/${post.slug}`} className="block space-y-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-zinc-900">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-zinc-950/80 border border-white/10 px-3 py-1 rounded-full text-[9px] tracking-widest uppercase font-mono text-cyan-400">
                      {post.category}
                    </div>
                  </div>

                  <div className="px-2 space-y-3">
                    <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-mono uppercase tracking-wider">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-light uppercase tracking-wider text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-zinc-400 font-light text-xs leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyan-900/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-white leading-tight">{post.author.split(",")[0]}</h4>
                      <p className="text-[8px] text-zinc-500 font-mono">{post.author.split(",")[1]?.trim() || "Resident Expert"}</p>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-zinc-400 group-hover:text-cyan-400 flex items-center gap-1 transition-colors">
                      Read Post <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </AppProviders>
  );
}
