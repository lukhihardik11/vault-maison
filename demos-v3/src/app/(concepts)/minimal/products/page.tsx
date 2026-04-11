"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export default function MinimalProducts() {
  return (
    <main className="min-h-screen bg-white text-[#050505]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <nav className="px-8 py-8 flex justify-between items-center">
        <Link href="/minimal" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.3 }}>← Back</Link>
        <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.3 }}>All</span>
        <Link href="/" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.3 }}>Gallery</Link>
      </nav>

      <section className="px-8 md:px-16 pb-20">
        {products.map((p) => (
          <Link key={p.id} href={`/minimal/products/${p.id}`}>
            <div className="flex items-center gap-8 py-6" style={{ borderBottom: "1px solid #05050508" }}>
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 style={{ fontSize: 14, fontWeight: 300 }}>{p.name}</h3>
                <p style={{ fontSize: 11, fontWeight: 300, opacity: 0.3 }}>{p.subtitle}</p>
              </div>
              <p style={{ fontSize: 14, fontWeight: 300 }}>{p.priceFormatted}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
