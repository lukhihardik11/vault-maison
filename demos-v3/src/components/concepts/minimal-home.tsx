'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals } from '@/data/products'
import { collections } from '@/data/collections'
import { ConceptLayout } from '@/components/shared'
import { buildConceptUrl, buildProductUrl, buildCategoryUrl } from '@/lib/concept-utils'
import { Marquee } from '@/components/ui/marquee'
import { DotPattern } from '@/components/ui/dot-pattern'

/* ─────────────────────────────────────────────
   SECTION 1 — HERO
   Full viewport. Pure typography statement.
   Massive "JEWELRY." with dot-pattern texture.
   ───────────────────────────────────────────── */

function HeroSection({ concept }: { concept: ConceptConfig }) {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: concept.palette.bg }}
    >
      {/* Subtle dot pattern background texture */}
      <DotPattern
        width={24}
        height={24}
        cr={0.8}
        className="fill-neutral-300/20"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-8 lg:px-16">
        {/* Oversized typographic statement */}
        <div className="pt-32 pb-16">
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-12"
            style={{ color: concept.palette.text, opacity: 0.35 }}
          >
            Est. 2024
          </p>

          <h1
            className="text-[clamp(4rem,12vw,11rem)] font-extralight tracking-[-0.03em] leading-[0.85]"
            style={{ color: concept.palette.text }}
          >
            JEWELRY.
          </h1>

          {/* Hairline rule with tagline */}
          <div className="flex items-center gap-8 mt-12 mb-10">
            <div
              className="h-px flex-1"
              style={{ backgroundColor: concept.palette.text, opacity: 0.08 }}
            />
            <p
              className="text-[10px] uppercase tracking-[0.25em] whitespace-nowrap"
              style={{ color: concept.palette.text, opacity: 0.35 }}
            >
              Nothing more. Nothing less.
            </p>
          </div>

          {/* CTA */}
          <Link
            href={buildConceptUrl('minimal', 'collections')}
            className="inline-flex items-center gap-3 group"
          >
            <span
              className="text-[11px] uppercase tracking-[0.15em] font-light"
              style={{ color: concept.palette.text, opacity: 0.5 }}
            >
              View Collection
            </span>
            <span
              className="inline-block w-8 h-px transition-all group-hover:w-12"
              style={{ backgroundColor: concept.palette.text, opacity: 0.3 }}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 2 — SCROLLING MARQUEE
   Oversized category words scrolling slowly.
   Creates visual rhythm between hero and content.
   ───────────────────────────────────────────── */

function MarqueeSection({ concept }: { concept: ConceptConfig }) {
  const words = ['Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Timepieces', 'Bespoke']

  return (
    <section
      className="overflow-hidden border-t border-b"
      style={{
        backgroundColor: concept.palette.bg,
        borderColor: `${concept.palette.text}08`,
      }}
    >
      <Marquee speed={60} pauseOnHover={false}>
        {words.map((word, i) => (
          <span
            key={i}
            className="text-[clamp(2rem,5vw,4.5rem)] font-extralight tracking-[-0.02em] mx-8 lg:mx-16 py-8 lg:py-12 inline-block whitespace-nowrap"
            style={{ color: concept.palette.text, opacity: 0.08 }}
          >
            {word}
          </span>
        ))}
      </Marquee>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 3 — EDITORIAL IMAGE
   Full-width image moment. No text overlay.
   Just the image speaking for itself.
   ───────────────────────────────────────────── */

function EditorialImageSection({ concept }: { concept: ConceptConfig }) {
  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '21/9' }}>
          <Image
            src="/images/fine-jewelry-product.jpg"
            alt="Gold jewelry collection — bracelet, hoops, and layered chains on linen"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        {/* Minimal caption */}
        <div className="flex justify-between items-center mt-4">
          <p
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: concept.palette.text, opacity: 0.25 }}
          >
            SS26 Collection
          </p>
          <p
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: concept.palette.text, opacity: 0.25 }}
          >
            01
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 4 — PRODUCT GRID
   Clean 3-column grid with 1px gap lines.
   Grayscale → color on hover (800ms transition).
   ───────────────────────────────────────────── */

function ProductGridSection({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 6)

  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <h2
            className="text-[11px] uppercase tracking-[0.2em] font-light"
            style={{ color: concept.palette.text, opacity: 0.4 }}
          >
            Selected Pieces
          </h2>
          <Link
            href={buildConceptUrl('minimal', 'bestsellers')}
            className="text-[10px] uppercase tracking-[0.15em] transition-opacity hover:opacity-40"
            style={{ color: concept.palette.text, opacity: 0.3 }}
          >
            View All
          </Link>
        </div>

        {/* Grid with 1px separator lines */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ backgroundColor: concept.palette.muted }}
        >
          {featured.map((product) => (
            <div key={product.id} style={{ backgroundColor: concept.palette.bg }}>
              <Link
                href={buildProductUrl('minimal', product.slug)}
                className="group block p-4 lg:p-6"
              >
                {/* Product image */}
                <div className="relative overflow-hidden mb-6" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all"
                    style={{ transitionDuration: '800ms' }}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Product info — minimal */}
                <div className="space-y-1">
                  <h3
                    className="text-[11px] uppercase tracking-[0.12em] font-light"
                    style={{ color: concept.palette.text }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-[10px] tracking-[0.05em]"
                    style={{ color: concept.palette.text, opacity: 0.35 }}
                  >
                    {product.priceDisplay}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 5 — PHILOSOPHY QUOTE
   Centered, generous whitespace.
   Thin hairline rules above and below.
   ───────────────────────────────────────────── */

function QuoteSection({ concept }: { concept: ConceptConfig }) {
  return (
    <section
      className="py-32 lg:py-44"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <div className="mx-auto max-w-2xl px-8 lg:px-12 text-center">
        {/* Top rule */}
        <div
          className="w-12 h-px mx-auto mb-16"
          style={{ backgroundColor: concept.palette.text, opacity: 0.08 }}
        />

        <blockquote>
          <p
            className="text-lg md:text-xl lg:text-2xl font-extralight leading-[1.8] tracking-[-0.01em]"
            style={{ color: concept.palette.text, opacity: 0.45 }}
          >
            &ldquo;Perfection is achieved not when there is nothing more to add,
            but when there is nothing left to take away.&rdquo;
          </p>
          <footer className="mt-10">
            <cite
              className="text-[9px] uppercase tracking-[0.25em] not-italic"
              style={{ color: concept.palette.text, opacity: 0.2 }}
            >
              Antoine de Saint-Exupéry
            </cite>
          </footer>
        </blockquote>

        {/* Bottom rule */}
        <div
          className="w-12 h-px mx-auto mt-16"
          style={{ backgroundColor: concept.palette.text, opacity: 0.08 }}
        />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 6 — SPLIT EDITORIAL
   Two-column: lifestyle image + text block.
   Architectural precision in alignment.
   ───────────────────────────────────────────── */

function SplitEditorialSection({ concept }: { concept: ConceptConfig }) {
  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ backgroundColor: concept.palette.muted }}>
          {/* Image */}
          <div style={{ backgroundColor: concept.palette.bg }}>
            <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
              <Image
                src="/images/minimalist-jewelry.jpg"
                alt="Minimalist gold jewelry — ring and necklace on white"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text */}
          <div
            className="flex flex-col justify-center p-8 lg:p-16 xl:p-24"
            style={{ backgroundColor: concept.palette.bg }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-8"
              style={{ color: concept.palette.text, opacity: 0.2 }}
            >
              02
            </p>

            <h2
              className="text-2xl lg:text-3xl font-extralight tracking-[-0.02em] leading-[1.3] mb-8"
              style={{ color: concept.palette.text }}
            >
              The Edit
            </h2>

            <p
              className="text-sm font-light leading-[1.9] mb-10"
              style={{ color: concept.palette.text, opacity: 0.4 }}
            >
              Each piece in our collection is chosen for its ability to stand alone.
              No embellishment for the sake of embellishment. No trend for the sake of trend.
              Only objects that earn their place through form, material, and intention.
            </p>

            <Link
              href={buildConceptUrl('minimal', 'new-arrivals')}
              className="inline-flex items-center gap-3 group"
            >
              <span
                className="text-[11px] uppercase tracking-[0.15em] font-light"
                style={{ color: concept.palette.text, opacity: 0.5 }}
              >
                Explore
              </span>
              <span
                className="inline-block w-8 h-px transition-all group-hover:w-12"
                style={{ backgroundColor: concept.palette.text, opacity: 0.3 }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 7 — CATEGORIES
   Text-only list. Numbered 01–05.
   Each line is a link with hover underline.
   ───────────────────────────────────────────── */

function CategoriesSection({ concept }: { concept: ConceptConfig }) {
  const categories = [
    { label: 'Rings', slug: 'diamond-rings' as const },
    { label: 'Necklaces', slug: 'diamond-necklaces' as const },
    { label: 'Earrings', slug: 'diamond-earrings' as const },
    { label: 'Bracelets', slug: 'diamond-bracelets' as const },
    { label: 'Wedding & Bridal', slug: 'wedding-bridal' as const },
  ]

  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        {/* Section header */}
        <h2
          className="text-[11px] uppercase tracking-[0.2em] font-light mb-16"
          style={{ color: concept.palette.text, opacity: 0.4 }}
        >
          Categories
        </h2>

        {/* Category list */}
        <div className="space-y-0">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={buildCategoryUrl('minimal', cat.slug)}
              className="group flex items-center justify-between py-6 border-t transition-colors"
              style={{ borderColor: `${concept.palette.text}08` }}
            >
              <div className="flex items-baseline gap-6 lg:gap-10">
                <span
                  className="text-[10px] tracking-[0.15em] font-light tabular-nums"
                  style={{ color: concept.palette.text, opacity: 0.15 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-lg lg:text-2xl font-extralight tracking-[-0.01em] transition-opacity group-hover:opacity-50"
                  style={{ color: concept.palette.text }}
                >
                  {cat.label}
                </span>
              </div>
              <span
                className="text-[10px] uppercase tracking-[0.15em] opacity-0 group-hover:opacity-30 transition-opacity"
                style={{ color: concept.palette.text }}
              >
                View →
              </span>
            </Link>
          ))}
          {/* Bottom border for last item */}
          <div
            className="border-t"
            style={{ borderColor: `${concept.palette.text}08` }}
          />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 8 — COLLECTIONS STRIP
   Horizontal scroll of collection cards.
   Clean, no-frills presentation.
   ───────────────────────────────────────────── */

function CollectionsSection({ concept }: { concept: ConceptConfig }) {
  const featuredCollections = collections.filter(c => c.featured)

  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: concept.palette.surface }}
    >
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <h2
            className="text-[11px] uppercase tracking-[0.2em] font-light"
            style={{ color: concept.palette.text, opacity: 0.4 }}
          >
            Collections
          </h2>
          <Link
            href={buildConceptUrl('minimal', 'collections')}
            className="text-[10px] uppercase tracking-[0.15em] transition-opacity hover:opacity-40"
            style={{ color: concept.palette.text, opacity: 0.3 }}
          >
            View All
          </Link>
        </div>

        {/* Collection cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: concept.palette.muted }}>
          {featuredCollections.map((collection, i) => (
            <Link
              key={collection.id}
              href={buildConceptUrl('minimal', `collection/${collection.id}`)}
              className="group block"
              style={{ backgroundColor: concept.palette.surface }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={collection.heroImage}
                  alt={collection.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all"
                  style={{ transitionDuration: '800ms' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p
                  className="text-[10px] uppercase tracking-[0.2em] mb-2"
                  style={{ color: concept.palette.text, opacity: 0.2 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3
                  className="text-sm font-extralight tracking-[0.02em] mb-1"
                  style={{ color: concept.palette.text }}
                >
                  {collection.name}
                </h3>
                <p
                  className="text-[10px] tracking-[0.05em] leading-relaxed"
                  style={{ color: concept.palette.text, opacity: 0.3 }}
                >
                  {collection.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 9 — NEWSLETTER / CTA
   Simple, centered. Email input with thin border.
   ───────────────────────────────────────────── */

function NewsletterSection({ concept }: { concept: ConceptConfig }) {
  const [email, setEmail] = useState('')

  return (
    <section
      className="py-24 lg:py-32"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <div className="mx-auto max-w-md px-8 text-center">
        {/* Top rule */}
        <div
          className="w-12 h-px mx-auto mb-12"
          style={{ backgroundColor: concept.palette.text, opacity: 0.08 }}
        />

        <h2
          className="text-lg font-extralight tracking-[-0.01em] mb-3"
          style={{ color: concept.palette.text }}
        >
          Stay informed.
        </h2>
        <p
          className="text-[11px] font-light leading-relaxed mb-10"
          style={{ color: concept.palette.text, opacity: 0.3 }}
        >
          New pieces, restocks, and nothing else.
        </p>

        {/* Email input */}
        <div className="flex items-center border-b" style={{ borderColor: `${concept.palette.text}15` }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-transparent text-[12px] font-light tracking-[0.05em] py-3 outline-none placeholder:opacity-20"
            style={{ color: concept.palette.text }}
          />
          <button
            className="text-[10px] uppercase tracking-[0.15em] font-light py-3 pl-4 transition-opacity hover:opacity-40"
            style={{ color: concept.palette.text, opacity: 0.4 }}
          >
            Subscribe →
          </button>
        </div>

        {/* Bottom rule */}
        <div
          className="w-12 h-px mx-auto mt-12"
          style={{ backgroundColor: concept.palette.text, opacity: 0.08 }}
        />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SECTION 10 — CLOSING STATEMENT
   Bookend symmetry with the hero.
   "Nothing more." in massive typography.
   ───────────────────────────────────────────── */

function ClosingSection({ concept }: { concept: ConceptConfig }) {
  return (
    <section
      className="py-32 lg:py-44"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16 text-center">
        <p
          className="text-[clamp(2.5rem,8vw,7rem)] font-extralight tracking-[-0.03em] leading-[0.9]"
          style={{ color: concept.palette.text, opacity: 0.06 }}
        >
          Nothing more.
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   MAIN EXPORT — MINIMAL HOME
   ───────────────────────────────────────────── */

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  return (
    <ConceptLayout concept={concept}>
      <HeroSection concept={concept} />
      <MarqueeSection concept={concept} />
      <EditorialImageSection concept={concept} />
      <ProductGridSection concept={concept} />
      <QuoteSection concept={concept} />
      <SplitEditorialSection concept={concept} />
      <CategoriesSection concept={concept} />
      <CollectionsSection concept={concept} />
      <NewsletterSection concept={concept} />
      <ClosingSection concept={concept} />
    </ConceptLayout>
  )
}
