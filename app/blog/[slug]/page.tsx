"use client";

import React, { use, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { AppProviders } from "@/components/layout/app-providers";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { ArrowLeft, Clock, User, Share2, Check, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data/blog-posts";
import { BreadcrumbSchema } from "@/lib/seo/json-ld";

export default function BlogPostReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);

  // For the custom reading progress scroll bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!post) {
    return (
      <AppProviders>
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-24 px-6 text-center">
          <h2 className="text-3xl uppercase tracking-widest text-zinc-500 mb-6">Article Not Found</h2>
          <Link href="/blog">
            <button className="px-8 py-3 bg-white text-black rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-cyan-400 transition-colors cursor-pointer">
              Back to Editorial
            </button>
          </Link>
        </main>
      </AppProviders>
    );
  }

  // Find related articles (excluding the current one)
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${post.slug}` }
  ];

  // Helper to render markdown string with headers and paragraphs
  const renderContent = (contentString: string) => {
    return contentString.split("\n\n").map((block, idx) => {
      if (block.startsWith("###")) {
        return (
          <h3 key={idx} className="text-xl md:text-2xl font-light uppercase tracking-wider text-white mt-10 mb-4 border-l-2 border-cyan-400 pl-4">
            {block.replace("###", "").trim()}
          </h3>
        );
      }
      if (block.startsWith("-")) {
        return (
          <ul key={idx} className="space-y-2 my-6 pl-6 list-disc text-gray-300 font-light text-base leading-relaxed">
            {block.split("\n").map((li, lIdx) => (
              <li key={lIdx} className="pl-1">
                {li.replace("-", "").trim()}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-gray-300 font-light text-base md:text-lg leading-relaxed mb-6 font-sans">
          {block.trim()}
        </p>
      );
    });
  };

  return (
    <AppProviders>
      <BreadcrumbSchema items={breadcrumbs} />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[110] origin-left"
        style={{ scaleX }}
      />

      <main className="min-h-screen bg-black text-white pt-36">
        
        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400 text-xs uppercase tracking-widest transition-colors font-medium cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Editorial</span>
          </Link>
        </div>

        {/* Hero Title */}
        <header className="max-w-4xl mx-auto px-6 mb-12 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-zinc-500 text-xs font-mono uppercase tracking-wider">
            <span className="text-cyan-400 font-semibold">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light uppercase tracking-wide text-white leading-tight">
            {post.title}
          </h1>

          {/* Author metadata */}
          <div className="flex items-center justify-between py-6 border-y border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-900/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{post.author}</h4>
                <p className="text-[10px] text-zinc-500 font-mono">Resident Practitioner</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="px-5 py-2.5 bg-zinc-950 border border-white/10 hover:border-cyan-400/30 hover:bg-cyan-500/5 text-white hover:text-cyan-400 rounded-full text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? "Link Copied!" : "Share Article"}</span>
            </button>
          </div>
        </header>

        {/* Article Image Banner */}
        <section className="max-w-5xl mx-auto px-6 mb-16">
          <div className="rounded-3xl overflow-hidden aspect-[21/9] bg-zinc-950 border border-white/10 relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        </section>

        {/* Article Body Content */}
        <article className="max-w-3xl mx-auto px-6 mb-24">
          <div className="prose prose-invert max-w-none">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="bg-zinc-950 border-t border-white/5 py-24 px-6">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-white mb-12">Related Articles</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((rPost) => (
                  <motion.div
                    key={rPost.slug}
                    whileHover={{ y: -5 }}
                    className="bg-black border border-white/5 hover:border-cyan-500/30 rounded-3xl p-6 group flex flex-col justify-between cursor-pointer transition-all duration-500"
                  >
                    <Link href={`/blog/${rPost.slug}`} className="block space-y-4">
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden relative bg-zinc-900 mb-4">
                        <img
                          src={rPost.image}
                          alt={rPost.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="text-cyan-400 uppercase tracking-widest font-mono text-[9px]">{rPost.category}</span>
                        <h4 className="text-lg font-light uppercase tracking-wider text-white group-hover:text-cyan-400 transition-colors line-clamp-2">{rPost.title}</h4>
                      </div>
                    </Link>
                    
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5 text-zinc-500 text-[10px] font-mono">
                      <span>{rPost.date}</span>
                      <Link href={`/blog/${rPost.slug}`} className="text-white group-hover:text-cyan-400 font-semibold uppercase tracking-widest text-[9px] flex items-center gap-1">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </AppProviders>
  );
}
