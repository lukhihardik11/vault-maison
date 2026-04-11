"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export default function AtelierProducts() {
  return (
    <main className="min-h-screen font-cormorant" style={{ backgroundColor: "#F4F1EA", color: "#2B2B2B" }}>
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center backdrop-blur-sm" style={{ backgroundColor: "#F4F1EAE6" }}>
        <Link href="/atelier" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury font-sans">← Home</Link>
        <span className="text-[11px] tracking-luxury-wide uppercase opacity-60">The Atelier — Collection</span>
        <Link href="/" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury font-sans">Gallery</Link>
      </nav>

      <section className="pt-32 px-8 md:px-16 py-section">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl tracking-[0.04em] mb-16">
          Full Collection
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Link href={`/atelier/products/${p.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-square relative overflow-hidden mb-4">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover opacity-60 group-hover:opacity-100" style={{ transition: "all 1200ms cubic-bezier(0.16, 1, 0.3, 1)" }} />
                  </div>
                  <h3 className="text-base tracking-wide mb-1">{p.name}</h3>
                  <p className="text-[11px] opacity-40 font-light font-sans">{p.subtitle}</p>
                  <p className="text-sm mt-2 font-sans font-light" style={{ color: "#8C3A3A" }}>{p.priceFormatted}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
