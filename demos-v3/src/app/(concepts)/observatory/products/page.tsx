"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/data/products";

export default function ObservatoryProducts() {
  return (
    <main className="min-h-screen bg-[#0D1B2A] text-white font-ibm-plex">
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-5 flex justify-between items-center border-b border-[#00E5FF]/10 bg-[#0D1B2A]/90 backdrop-blur-sm">
        <Link href="/observatory" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury">← Observatory</Link>
        <span className="text-[10px] tracking-luxury-wide uppercase text-[#00E5FF]/60">Full Data Index</span>
        <Link href="/" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury">Gallery</Link>
      </nav>

      <section className="pt-28 px-8 md:px-16 py-section">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-light tracking-[0.08em] mb-2"
        >
          <span className="text-[#00E5FF]">DATA</span> INDEX
        </motion.h1>
        <p className="text-[11px] opacity-40 mb-12">Complete specimen catalog with spectral analysis data</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link href={`/observatory/products/${p.id}`}>
                <div className="border border-[#00E5FF]/10 p-6 hover:border-[#00E5FF]/30 transition-luxury group cursor-pointer">
                  <p className="text-[9px] tracking-luxury-wide uppercase text-[#00E5FF]/40 mb-3">{p.lotNumber}</p>
                  <h3 className="text-base font-light tracking-wide mb-1 group-hover:text-[#00E5FF] transition-luxury">{p.name}</h3>
                  <p className="text-[11px] opacity-40 mb-4">{p.subtitle}</p>
                  <div className="flex justify-between text-[10px]">
                    <span className="opacity-40">{p.shape}</span>
                    <span className="text-[#00E5FF]">{p.priceFormatted}</span>
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
