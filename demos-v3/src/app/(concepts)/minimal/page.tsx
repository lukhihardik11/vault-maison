"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export default function MinimalHome() {
  const featured = products.slice(0, 5);

  return (
    <main className="scroll-snap-y no-scrollbar" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Title screen */}
      <section className="scroll-snap-child bg-white text-[#050505] flex flex-col items-center justify-center">
        <p style={{ fontSize: 14, fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.3 }}>
          Vault Maison
        </p>
      </section>

      {/* Products — one per viewport */}
      {featured.map((p) => (
        <section key={p.id} className="scroll-snap-child bg-white text-[#050505] flex items-center justify-center px-8">
          <Link href={`/minimal/products/${p.id}`} className="flex items-center gap-16 max-w-4xl w-full">
            <div className="w-1/2 aspect-square relative">
              <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
            </div>
            <div className="w-1/2">
              <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.2, marginBottom: 16 }}>
                {p.lotNumber}
              </p>
              <h2 style={{ fontSize: 18, fontWeight: 300, marginBottom: 8 }}>{p.name}</h2>
              <p style={{ fontSize: 12, fontWeight: 300, opacity: 0.4, marginBottom: 24 }}>{p.subtitle}</p>
              <p style={{ fontSize: 14, fontWeight: 300 }}>{p.priceFormatted}</p>
            </div>
          </Link>
        </section>
      ))}

      {/* Footer */}
      <section className="scroll-snap-child bg-white text-[#050505] flex flex-col items-center justify-center">
        <Link href="/minimal/products" style={{ fontSize: 12, fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.3, borderBottom: "1px solid #050505", paddingBottom: 4 }}>
          View All
        </Link>
      </section>
    </main>
  );
}
