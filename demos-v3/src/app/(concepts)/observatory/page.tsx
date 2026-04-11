"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/data/products";

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return <span>{displayed}<span className="animate-pulse">_</span></span>;
}

export default function ObservatoryHome() {
  return (
    <main className="min-h-screen bg-[#0D1B2A] text-white font-ibm-plex">
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-5 flex justify-between items-center border-b border-[#00E5FF]/10">
        <Link href="/" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury">← Gallery</Link>
        <span className="text-[10px] tracking-luxury-wide uppercase text-[#00E5FF]/60">Observatory</span>
        <Link href="/observatory/products" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury">Data Index →</Link>
      </nav>

      {/* Hero Dashboard */}
      <section className="h-screen flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <p className="text-[10px] tracking-luxury-wide uppercase text-[#00E5FF]/40 mb-6">
            Spectral Analysis Platform
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.08em] mb-8">
            <TypewriterText text="THE OBSERVATORY" delay={500} />
          </h1>
          <div className="flex items-center justify-center gap-12 text-[11px] text-[#00E5FF]/60">
            <div className="text-center">
              <p className="text-2xl font-light text-[#00E5FF]">{products.length}</p>
              <p className="text-[9px] tracking-luxury-wide uppercase mt-1 opacity-40">Active Specimens</p>
            </div>
            <div className="w-px h-8 bg-[#00E5FF]/20" />
            <div className="text-center">
              <p className="text-2xl font-light text-[#00E5FF]">GIA</p>
              <p className="text-[9px] tracking-luxury-wide uppercase mt-1 opacity-40">Certified</p>
            </div>
            <div className="w-px h-8 bg-[#00E5FF]/20" />
            <div className="text-center">
              <p className="text-2xl font-light text-[#00E5FF]">4C</p>
              <p className="text-[9px] tracking-luxury-wide uppercase mt-1 opacity-40">Analysis Depth</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Data Table */}
      <section className="px-8 md:px-16 py-section">
        <p className="text-[10px] tracking-luxury-wide uppercase text-[#00E5FF]/30 mb-8">Specimen Index</p>
        <div className="border border-[#00E5FF]/10">
          <div className="grid grid-cols-6 gap-4 px-6 py-3 text-[9px] tracking-luxury-wide uppercase text-[#00E5FF]/40 border-b border-[#00E5FF]/10">
            <span>Lot</span><span>Specimen</span><span>Shape</span><span>Clarity</span><span>Color</span><span>Value</span>
          </div>
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link href={`/observatory/products/${p.id}`}>
                <div className="grid grid-cols-6 gap-4 px-6 py-4 text-[12px] font-light border-b border-[#00E5FF]/5 hover:bg-[#00E5FF]/5 transition-luxury cursor-pointer group">
                  <span className="text-[#00E5FF]/50">{p.lotNumber}</span>
                  <span className="group-hover:text-[#00E5FF] transition-luxury">{p.name}</span>
                  <span className="opacity-60">{p.shape}</span>
                  <span className="opacity-60">{p.clarity}</span>
                  <span className="opacity-60">{p.color}</span>
                  <span className="text-[#00E5FF]">{p.priceFormatted}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
