"use client";

import Link from "next/link";
import Image from "next/image";
import { concepts } from "@/data/concepts";
import { Spotlight } from "@/components/ui/spotlight-new";
import { FlipWords } from "@/components/ui/flip-words";

export default function GalleryPage() {
  const flipWords = ["Rings", "Necklaces", "Bracelets", "Earrings", "Timepieces"];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#EAEAEA]">
      {/* Hero Section with Spotlight */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(43, 74%, 49%, .12) 0, hsla(43, 74%, 49%, .04) 50%, transparent 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(43, 74%, 49%, .08) 0, hsla(43, 74%, 49%, .02) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(43, 74%, 49%, .06) 0, transparent 80%)"
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <p className="text-[11px] tracking-[0.4em] uppercase mb-6 text-[#D4AF37]/60 font-light">
            Ultra-Luxury Jewelry E-Commerce
          </p>

          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-[5.5rem] font-normal tracking-[0.08em] leading-tight">
            VAULT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#D4AF37]">
              MAISON
            </span>
          </h1>

          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="h-px bg-gradient-to-r from-transparent to-[#D4AF37]/40 w-20" />
            <p className="text-[13px] tracking-[0.2em] font-light text-[#EAEAEA]/50">
              10 Concept Directions
            </p>
            <div className="h-px bg-gradient-to-l from-transparent to-[#D4AF37]/40 w-20" />
          </div>

          <div className="mt-10 flex items-center justify-center text-lg md:text-xl font-light tracking-wide text-[#EAEAEA]/60">
            <span>Exquisite&nbsp;</span>
            <FlipWords
              words={flipWords}
              className="text-[#D4AF37] font-normal"
              duration={2500}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-3">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#D4AF37]/40" />
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#EAEAEA]/25">
            Scroll
          </p>
        </div>
      </section>

      {/* Featured Image Strip */}
      <section className="relative py-2">
        <div className="flex gap-2 overflow-hidden">
          {[
            "/images/jewelry-ring-closeup.jpg",
            "/images/moody-jewelry-1.jpg",
            "/images/gold-jewelry-collection.jpg",
            "/images/fine-jewelry-necklace.jpg",
            "/images/jewelry-set-elegant.jpg",
          ].map((src, i) => (
            <div key={i} className="relative h-[200px] flex-1 min-w-0">
              <Image
                src={src}
                alt="Jewelry"
                fill
                className="object-cover"
                sizes="20vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>
      </section>

      {/* Concept Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#D4AF37]/50 mb-4">
            Explore
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl tracking-[0.06em]">
            Concept Directions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1A1A1A]">
          {concepts.map((concept, index) => (
            <Link key={concept.id} href={concept.route}>
              <div
                className="group relative overflow-hidden transition-all duration-700 cursor-pointer"
                style={{ backgroundColor: concept.palette.bg }}
              >
                {/* Background image with overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  <Image
                    src={concept.heroImage}
                    alt={concept.name}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>

                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-all duration-700"
                  style={{
                    background: `radial-gradient(ellipse at center, ${concept.palette.accent}, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-10 md:p-14 lg:p-16">
                  <div className="flex items-start justify-between mb-8">
                    <span
                      className="text-[11px] tracking-[0.3em] uppercase font-light opacity-30"
                      style={{ color: concept.palette.text }}
                    >
                      {concept.number}
                    </span>
                    <div
                      className="w-8 h-px opacity-20 group-hover:w-16 transition-all duration-700"
                      style={{ backgroundColor: concept.palette.accent }}
                    />
                  </div>

                  <h3
                    className={`text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.04em] mb-3 ${concept.fonts.headingClass}`}
                    style={{ color: concept.palette.text }}
                  >
                    {concept.name}
                  </h3>

                  <p
                    className="text-[12px] tracking-[0.15em] font-light opacity-40 mb-2"
                    style={{ color: concept.palette.text }}
                  >
                    {concept.tagline}
                  </p>

                  <p
                    className="text-[11px] tracking-[0.1em] font-light opacity-25 mb-8"
                    style={{ color: concept.palette.text }}
                  >
                    {concept.dna}
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: concept.palette.accent }}
                      />
                      <span
                        className="text-[10px] tracking-[0.2em] uppercase opacity-20 font-light"
                        style={{ color: concept.palette.text }}
                      >
                        {concept.palette.accent}
                      </span>
                    </div>

                    <span
                      className="text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-50 transition-all duration-500 translate-x-2 group-hover:translate-x-0"
                      style={{ color: concept.palette.accent }}
                    >
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-[#1A1A1A] py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { value: "10", label: "Concept Directions" },
            { value: "350+", label: "Unique Pages" },
            { value: "25+", label: "UI Components" },
            { value: "10", label: "Product Categories" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="font-cinzel text-3xl md:text-4xl text-[#D4AF37] mb-2">
                {stat.value}
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase opacity-30 font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A] py-16 text-center">
        <p className="font-cinzel text-lg tracking-[0.1em] mb-4 text-[#D4AF37]/40">
          VAULT MAISON
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-20 font-light">
          Concept Explorations — 2026
        </p>
      </footer>
    </main>
  );
}
