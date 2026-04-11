"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getProduct } from "@/data/products";
import { notFound } from "next/navigation";

export default function GalleryDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2C2C2C] font-playfair">
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center bg-[#FDFBF7]/90 backdrop-blur-sm">
        <Link href="/gallery/products" className="text-[10px] tracking-luxury-wide uppercase opacity-30 hover:opacity-100 transition-luxury font-sans">← Exhibition</Link>
        <span className="text-[11px] tracking-luxury-wide uppercase opacity-50">{product.name}</span>
        <Link href="/" className="text-[10px] tracking-luxury-wide uppercase opacity-30 hover:opacity-100 transition-luxury font-sans">Concepts</Link>
      </nav>

      <section className="pt-28 px-8 md:px-20 lg:px-32">
        <div className="max-w-4xl mx-auto">
          {product.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="aspect-[4/3] relative mb-8"
            >
              <Image src={img} alt={product.name} fill className="object-cover" />
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-lg mx-auto text-center py-16">
            <h1 className="text-3xl italic mb-2">{product.name}</h1>
            <p className="text-[12px] opacity-40 font-sans font-light mb-8">{product.subtitle}</p>
            <div className="h-px bg-[#2C2C2C]/10 mb-8 mx-auto w-16" />
            <p className="text-[13px] opacity-60 font-light font-sans leading-relaxed mb-8">{product.description}</p>
            <div className="text-left space-y-3 mb-10">
              {[["Shape", product.shape], ["Clarity", product.clarity], ["Color", product.color], ["Origin", product.origin]].map(([l, v]) => (
                <div key={l} className="flex justify-between text-[12px] font-sans border-b border-[#2C2C2C]/5 pb-2">
                  <span className="opacity-30">{l}</span><span className="opacity-60">{v}</span>
                </div>
              ))}
            </div>
            <p className="text-xl opacity-60 mb-8 font-sans">{product.priceFormatted}</p>
            <button className="px-12 py-4 text-[11px] tracking-luxury-wide uppercase border border-[#2C2C2C]/20 hover:bg-[#2C2C2C]/5 transition-luxury font-sans">
              Inquire About This Work
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
