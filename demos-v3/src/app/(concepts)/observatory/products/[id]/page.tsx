"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getProduct } from "@/data/products";
import { notFound } from "next/navigation";

export default function ObservatoryDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProduct(id);
  if (!product) notFound();

  const specs = [
    { label: "Shape", value: product.shape },
    { label: "Carat Range", value: product.carat },
    { label: "Clarity Grade", value: product.clarity },
    { label: "Color Grade", value: product.color },
    { label: "Cut Quality", value: product.cut },
    { label: "Origin", value: product.origin },
    { label: "Certification", value: product.certification },
  ];

  return (
    <main className="min-h-screen bg-[#0D1B2A] text-white font-ibm-plex">
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-5 flex justify-between items-center border-b border-[#00E5FF]/10 bg-[#0D1B2A]/90 backdrop-blur-sm">
        <Link href="/observatory/products" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury">← Index</Link>
        <span className="text-[10px] tracking-luxury-wide uppercase text-[#00E5FF]/60">{product.lotNumber}</span>
        <Link href="/" className="text-[10px] tracking-luxury-wide uppercase opacity-40 hover:opacity-100 transition-luxury">Gallery</Link>
      </nav>

      <section className="pt-28 px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-4">
            {product.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="aspect-square relative border border-[#00E5FF]/10"
              >
                <Image src={img} alt={product.name} fill className="object-cover" />
                <div className="absolute top-3 left-3 text-[8px] tracking-luxury-wide uppercase text-[#00E5FF]/40 bg-[#0D1B2A]/80 px-2 py-1">
                  View {i + 1}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <p className="text-[9px] tracking-luxury-wide uppercase text-[#00E5FF]/40 mb-4">{product.lotNumber} · Spectral Analysis</p>
              <h1 className="text-2xl md:text-3xl font-light tracking-[0.06em] mb-2">{product.name}</h1>
              <p className="text-[12px] opacity-40 mb-8">{product.subtitle}</p>

              <div className="border border-[#00E5FF]/10 p-6 mb-8">
                <p className="text-[9px] tracking-luxury-wide uppercase text-[#00E5FF]/40 mb-4">4C Analysis</p>
                {specs.map((s, i) => (
                  <div key={s.label} className="flex justify-between py-2 border-b border-[#00E5FF]/5 text-[12px]">
                    <span className="opacity-40">{s.label}</span>
                    <span className="text-[#00E5FF]/80">{s.value}</span>
                  </div>
                ))}
              </div>

              <p className="text-[12px] opacity-50 font-light leading-relaxed mb-8">{product.description}</p>

              <div className="flex items-center justify-between mb-6">
                <span className="text-[9px] tracking-luxury-wide uppercase opacity-40">Acquisition Value</span>
                <span className="text-xl text-[#00E5FF] font-light">{product.priceFormatted}</span>
              </div>

              <button className="w-full py-4 text-[11px] tracking-luxury-wide uppercase border border-[#00E5FF]/30 hover:bg-[#00E5FF]/10 transition-luxury">
                Request Specimen
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
