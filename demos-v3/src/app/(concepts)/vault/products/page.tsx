"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export default function VaultProducts() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#EAEAEA] font-cinzel noise-overlay">
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center bg-[#0A0A0A]/80 backdrop-blur-sm">
        <Link href="/vault" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury font-sans">
          ← Home
        </Link>
        <span className="text-[11px] tracking-luxury-wide uppercase opacity-60">The Collection</span>
        <Link href="/" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury font-sans">
          Gallery
        </Link>
      </nav>

      <section className="pt-32 pb-20 px-8 md:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl tracking-[0.06em] mb-4"
        >
          The Collection
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-px bg-[#D4AF37] mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            >
              <Link href={`/vault/products/${p.id}`}>
                <div className="group bg-[#111] overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-100 transition-luxury group-hover:scale-[1.03]"
                      style={{ transitionDuration: "1200ms" }}
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[9px] tracking-luxury-wide uppercase opacity-30 mb-2 font-sans">{p.lotNumber}</p>
                    <h3 className="text-base tracking-[0.04em] mb-1">{p.name}</h3>
                    <p className="text-[11px] opacity-40 font-light font-sans">{p.subtitle}</p>
                    <p className="text-[#D4AF37] text-sm mt-3 font-sans font-light">{p.priceFormatted}</p>
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
