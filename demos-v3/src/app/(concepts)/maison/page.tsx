"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export default function MaisonHome() {
  const featured = products.slice(0, 6);

  return (
    <main className="min-h-screen font-libre" style={{ backgroundColor: "#FAFAFA", color: "#1C1C1C" }}>
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center" style={{ backgroundColor: "#FAFAFAE6" }}>
        <Link href="/" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury font-sans">← Gallery</Link>
        <span className="text-[11px] tracking-luxury-wide uppercase opacity-60">Modern Maison</span>
        <Link href="/maison/products" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury font-sans">Collection →</Link>
      </nav>

      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.2 }}
          className="text-[10px] tracking-luxury-wide uppercase mb-8 font-sans"
        >
          Heritage Diamond Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-normal tracking-[0.04em] text-center"
        >
          The Modern Maison
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="h-px mt-8"
          style={{ backgroundColor: "#8B7355" }}
        />
      </section>

      {/* Products */}
      <section className="py-section px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
            >
              <Link href={`/maison/products/${p.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-square relative overflow-hidden mb-4">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-100"
                      style={{ transition: "all 1200ms cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                  </div>
                  <h3 className="text-base tracking-wide mb-1">{p.name}</h3>
                  <p className="text-[11px] opacity-40 font-light font-sans">{p.subtitle}</p>
                  <p className="text-sm mt-2 font-sans font-light" style={{ color: "#8B7355" }}>{p.priceFormatted}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link href="/maison/products" className="inline-block px-12 py-4 text-[11px] tracking-luxury-wide uppercase border font-sans transition-luxury hover:opacity-80" style={{ borderColor: "#8B735540" }}>
            Reserve This Piece
          </Link>
        </div>
      </section>
    </main>
  );
}
