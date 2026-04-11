"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProduct } from "@/data/products";
import { notFound } from "next/navigation";

export default function MinimalDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-white text-[#050505]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <nav className="px-8 py-8 flex justify-between items-center">
        <Link href="/minimal/products" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.3 }}>← All</Link>
        <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.3 }}>{product.lotNumber}</span>
        <Link href="/" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.3 }}>Gallery</Link>
      </nav>

      <section className="px-8 md:px-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-2">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square relative">
                <Image src={img} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="md:sticky md:top-8 md:self-start">
            <h1 style={{ fontSize: 20, fontWeight: 300, marginBottom: 8 }}>{product.name}</h1>
            <p style={{ fontSize: 12, fontWeight: 300, opacity: 0.3, marginBottom: 32 }}>{product.subtitle}</p>
            <p style={{ fontSize: 16, fontWeight: 300, marginBottom: 32 }}>{product.priceFormatted}</p>
            <p style={{ fontSize: 13, fontWeight: 300, opacity: 0.5, lineHeight: 1.8, marginBottom: 32 }}>{product.description}</p>
            {[["Shape", product.shape], ["Clarity", product.clarity], ["Color", product.color], ["Origin", product.origin]].map(([l, v]) => (
              <div key={l} className="flex justify-between py-2" style={{ fontSize: 12, fontWeight: 300, borderBottom: "1px solid #05050508" }}>
                <span style={{ opacity: 0.3 }}>{l}</span><span>{v}</span>
              </div>
            ))}
            <button className="w-full mt-8 py-4" style={{ fontSize: 11, fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid #050505", background: "transparent", cursor: "pointer" }}>
              Acquire
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
