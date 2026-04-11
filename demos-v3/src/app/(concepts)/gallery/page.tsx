"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export default function GalleryHome() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const featured = products.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2C2C2C] font-playfair">
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center">
        <Link href="/" className="text-[10px] tracking-luxury-wide uppercase opacity-30 hover:opacity-100 transition-luxury font-sans">← Concepts</Link>
        <span className="text-[11px] tracking-luxury-wide uppercase opacity-50">The Gallery</span>
        <Link href="/gallery/products" className="text-[10px] tracking-luxury-wide uppercase opacity-30 hover:opacity-100 transition-luxury font-sans">Exhibitions →</Link>
      </nav>

      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.2 }}
          className="text-[10px] tracking-luxury-wide uppercase mb-8 font-sans"
        >
          Current Exhibition
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-[0.04em] text-center italic"
        >
          The Gallery
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="h-px bg-[#2C2C2C]/20 mt-8"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1 }}
          className="mt-6 text-[13px] font-light font-sans"
        >
          Where diamonds are exhibited, not sold
        </motion.p>
      </section>

      {/* Pedestal Focus Grid */}
      <section className="py-section px-8 md:px-20 lg:px-32">
        <p className="text-[10px] tracking-luxury-wide uppercase opacity-20 mb-16 font-sans">
          Featured Works
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.15 : 1,
                transform: hoveredIdx === i ? "scale(1.02)" : "scale(1)",
                transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <Link href={`/gallery/products/${p.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] relative overflow-hidden mb-6">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover"
                      style={{ transition: "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                  </div>
                  {/* Museum label */}
                  <div className="border-t border-[#2C2C2C]/10 pt-4">
                    <h3 className="text-lg italic mb-1">{p.name}</h3>
                    <p className="text-[11px] opacity-40 font-light font-sans">{p.shape} · {p.origin}</p>
                    <p className="text-[11px] opacity-30 font-light font-sans mt-2">{p.priceFormatted}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
