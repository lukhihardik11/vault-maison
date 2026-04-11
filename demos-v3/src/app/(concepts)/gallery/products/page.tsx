"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export default function GalleryProducts() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2C2C2C] font-playfair">
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center bg-[#FDFBF7]/90 backdrop-blur-sm">
        <Link href="/gallery" className="text-[10px] tracking-luxury-wide uppercase opacity-30 hover:opacity-100 transition-luxury font-sans">← Gallery</Link>
        <span className="text-[11px] tracking-luxury-wide uppercase opacity-50">All Exhibitions</span>
        <Link href="/" className="text-[10px] tracking-luxury-wide uppercase opacity-30 hover:opacity-100 transition-luxury font-sans">Concepts</Link>
      </nav>

      <section className="pt-32 px-8 md:px-20 lg:px-32 py-section">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl italic mb-16">
          Complete Exhibition
        </motion.h1>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="break-inside-avoid"
            >
              <Link href={`/gallery/products/${p.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] relative overflow-hidden mb-4">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-[1.03]" style={{ transition: "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)" }} />
                  </div>
                  <h3 className="text-base italic mb-1">{p.name}</h3>
                  <p className="text-[11px] opacity-30 font-sans font-light">{p.shape} · {p.priceFormatted}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
