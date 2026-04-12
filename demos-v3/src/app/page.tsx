"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { concepts } from "@/data/concepts";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#EAEAEA]">
      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] tracking-[0.3em] uppercase mb-8 font-light"
        >
          Ultra-Luxury Diamond E-Commerce
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-normal tracking-[0.06em] text-center"
        >
          VAULT MAISON
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="h-px bg-[#D4AF37] mt-8"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 text-[13px] tracking-[0.15em] font-light"
        >
          10 Concept Directions
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 text-[10px] tracking-[0.3em] uppercase"
        >
          Scroll to explore
        </motion.div>
      </section>

      {/* Concept Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {concepts.map((concept, i) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={concept.route}>
                <div
                  className="group relative p-10 md:p-14 transition-all duration-500 cursor-pointer overflow-hidden"
                  style={{ backgroundColor: concept.palette.bg }}
                >
                  {/* Accent glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500"
                    style={{ backgroundColor: concept.palette.accent }}
                  />
                  <div className="relative z-10">
                    <p
                      className="text-[11px] tracking-[0.3em] uppercase font-light mb-4 opacity-40"
                      style={{ color: concept.palette.text }}
                    >
                      Concept {concept.number}
                    </p>
                    <h2
                      className={`text-2xl md:text-3xl font-normal tracking-[0.04em] mb-3 ${concept.fonts.headingClass}`}
                      style={{ color: concept.palette.text }}
                    >
                      {concept.name}
                    </h2>
                    <p
                      className="text-[12px] tracking-[0.15em] font-light opacity-50 mb-6"
                      style={{ color: concept.palette.text }}
                    >
                      {concept.dna}
                    </p>
                    {/* Color swatch */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3"
                        style={{ backgroundColor: concept.palette.accent }}
                      />
                      <span
                        className="text-[10px] tracking-[0.3em] uppercase opacity-30 font-light"
                        style={{ color: concept.palette.text }}
                      >
                        {concept.palette.accent}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-20 font-light">
          Vault Maison — Concept Explorations — 2026
        </p>
      </footer>
    </main>
  );
}
