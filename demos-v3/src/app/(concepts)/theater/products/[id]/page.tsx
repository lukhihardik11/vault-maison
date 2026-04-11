"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getProduct } from "@/data/products";
import { notFound } from "next/navigation";

export default function TheaterDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <main className="min-h-screen font-bodoni" style={{ backgroundColor: "#1A1A24", color: "#F5F0EB" }}>
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center backdrop-blur-sm" style={{ backgroundColor: "#1A1A24E6" }}>
        <Link href="/theater/products" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury font-sans">← Collection</Link>
        <span className="text-[11px] tracking-luxury-wide uppercase opacity-60">{product.lotNumber}</span>
        <Link href="/" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury font-sans">Gallery</Link>
      </nav>

      <section className="pt-28 px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-4">
            {product.images.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }} className="aspect-square relative overflow-hidden">
                <Image src={img} alt={product.name} fill className="object-cover" />
              </motion.div>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <p className="text-[10px] tracking-luxury-wide uppercase opacity-30 mb-4 font-sans">{product.lotNumber}</p>
              <h1 className="text-3xl tracking-[0.04em] mb-2">{product.name}</h1>
              <p className="text-[13px] opacity-50 font-light font-sans mb-8">{product.subtitle}</p>
              <div className="h-px mb-8" style={{ backgroundColor: "#E0C09730" }} />
              <p className="text-2xl font-light mb-8 font-sans" style={{ color: "#E0C097" }}>{product.priceFormatted}</p>
              <p className="text-[13px] opacity-60 font-light font-sans leading-relaxed mb-10">{product.description}</p>

              <div className="space-y-4 mb-10">
                {[["Shape", product.shape], ["Carat", product.carat], ["Clarity", product.clarity], ["Color", product.color], ["Cut", product.cut], ["Origin", product.origin], ["Certification", product.certification]].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-[12px] font-sans">
                    <span className="opacity-40 font-light">{label}</span>
                    <span className="opacity-80">{value}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 text-[11px] tracking-luxury-wide uppercase border transition-luxury font-sans hover:opacity-80" style={{ borderColor: "#E0C09740" }}>
                Reserve This Experience
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
