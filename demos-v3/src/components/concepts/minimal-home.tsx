'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals } from '@/data/products'
import { collections } from '@/data/collections'
import { ConceptLayout } from '@/components/shared'
import { buildConceptUrl, buildProductUrl, buildCategoryUrl } from '@/lib/concept-utils'
import { cn } from '@/lib/utils'

// Modern UI Components
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { EncryptedText } from '@/components/ui/encrypted-text'
import { FocusCards } from '@/components/ui/focus-cards'
import { GlareCard } from '@/components/ui/glare-card'
import { StickyScrollReveal } from '@/components/ui/sticky-scroll-reveal'
import { AppleCarousel } from '@/components/ui/apple-carousel'
import { PlaceholdersVanishInput } from '@/components/ui/placeholders-vanish-input'
import { ScrollVelocity } from '@/components/ui/scroll-velocity'
import { ColourfulText } from '@/components/ui/colourful-text'
import { CursorSpotlight } from '@/components/ui/cursor-spotlight'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { DotPattern } from '@/components/ui/dot-pattern'

/* ═══════════════════════════════════════════════════
   SECTION 1 — HERO
   Full viewport. CursorSpotlight tracks mouse.
   Massive "JEWELRY." with ColourfulText on the period.
   TextGenerateEffect for subtitle.
   DotPattern background texture.
   ═══════════════════════════════════════════════════ */

function HeroSection({ concept }: { concept: ConceptConfig }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: concept.palette.bg }}
    >
      {/* Subtle dot pattern background texture */}
      <DotPattern
        width={24}
        height={24}
        cr={0.8}
        className="fill-neutral-400/15"
      />

      <CursorSpotlight
        className="absolute inset-0"
        spotlightColor="rgba(0,0,0,0.03)"
        spotlightSize={800}
      >
        <div className="min-h-screen" />
      </CursorSpotlight>

      <motion.div
        className="relative z-10 mx-auto max-w-[1440px] w-full px-8 lg:px-16"
        style={{ y, opacity }}
      >
        <div className="pt-32 pb-16">
          {/* Encrypted text micro-label */}
          <div className="mb-12">
            <EncryptedText
              text="EST. 2024 — VAULT MAISON"
              className="text-[10px] uppercase tracking-[0.3em]"
              revealDelayMs={60}
              encryptedClassName="text-neutral-300"
              revealedClassName="text-neutral-400"
            />
          </div>

          {/* Massive typographic statement with ColourfulText */}
          <h1
            className="text-[clamp(4rem,13vw,12rem)] font-extralight tracking-[-0.04em] leading-[0.82]"
            style={{ color: concept.palette.text }}
          >
            JEWEL
            <ColourfulText text="RY" luxury className="font-extralight" />
            <span className="text-neutral-300">.</span>
          </h1>

          {/* TextGenerateEffect subtitle — words appear one by one with blur */}
          <div className="mt-10 max-w-md">
            <TextGenerateEffect
              words="Nothing more. Nothing less. Only what matters."
              className="text-sm font-light tracking-wide leading-relaxed text-neutral-400"
              duration={0.6}
            />
          </div>

          {/* Animated hairline rule */}
          <motion.div
            className="flex items-center gap-8 mt-14"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ transformOrigin: 'left' }}
          >
            <div className="h-px flex-1 bg-neutral-200" />
          </motion.div>

          {/* CTA with hover animation */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Link
              href={buildConceptUrl('minimal', 'collections')}
              className="group inline-flex items-center gap-4"
            >
              <span className="text-[11px] uppercase tracking-[0.2em] font-light text-neutral-500 group-hover:text-neutral-900 transition-colors duration-500">
                View Collection
              </span>
              <span className="inline-block w-8 h-px bg-neutral-300 transition-all duration-500 group-hover:w-16 group-hover:bg-neutral-900" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-300">Scroll</span>
        <motion.div
          className="w-px h-6 bg-neutral-300"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SECTION 2 — SCROLL VELOCITY MARQUEE
   Text speeds up/slows down based on scroll velocity.
   Modern, alive, responsive to user interaction.
   ═══════════════════════════════════════════════════ */

function VelocityMarqueeSection({ concept }: { concept: ConceptConfig }) {
  return (
    <section
      className="py-6 border-t border-b border-neutral-100 overflow-hidden"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <ScrollVelocity baseVelocity={-2} className="py-4">
        <span className="text-[clamp(2.5rem,6vw,5rem)] font-extralight tracking-[-0.02em] text-neutral-100 mx-8 lg:mx-16 whitespace-nowrap">
          Rings &nbsp;·&nbsp; Necklaces &nbsp;·&nbsp; Bracelets &nbsp;·&nbsp; Earrings &nbsp;·&nbsp; Timepieces &nbsp;·&nbsp; Bespoke &nbsp;·&nbsp;
        </span>
      </ScrollVelocity>
      <ScrollVelocity baseVelocity={1.5} className="py-2">
        <span className="text-[clamp(1rem,2vw,1.5rem)] font-extralight tracking-[0.3em] uppercase text-neutral-200 mx-8 lg:mx-16 whitespace-nowrap">
          Crafted with intention &nbsp;&nbsp;&nbsp; Designed to last &nbsp;&nbsp;&nbsp; Nothing unnecessary &nbsp;&nbsp;&nbsp;
        </span>
      </ScrollVelocity>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SECTION 3 — EDITORIAL IMAGE WITH PARALLAX
   Full-width image with parallax scroll effect.
   Image moves slower than scroll = depth illusion.
   ═══════════════════════════════════════════════════ */

function EditorialParallaxSection({ concept }: { concept: ConceptConfig }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1])

  return (
    <ScrollReveal direction="none" duration={1.0}>
      <section
        ref={ref}
        className="py-16 lg:py-24"
        style={{ backgroundColor: concept.palette.bg }}
      >
        <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
          <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: '21/9' }}>
            <motion.div
              className="absolute inset-[-10%] w-[120%] h-[120%]"
              style={{ y, scale }}
            >
              <Image
                src="/images/fine-jewelry-product.jpg"
                alt="Gold jewelry collection — bracelet, hoops, and layered chains on linen"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
          </div>
          {/* Minimal caption with scroll reveal */}
          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <div className="flex justify-between items-center mt-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-300">
                SS26 Collection
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-300">
                01
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </ScrollReveal>
  )
}

/* ═══════════════════════════════════════════════════
   SECTION 4 — FOCUS CARDS PRODUCT GRID
   Hover one product → all others blur/dim.
   Modern, interactive, visually striking.
   ═══════════════════════════════════════════════════ */

function FocusProductSection({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 6)

  const focusCards = featured.map((product) => ({
    title: product.name,
    subtitle: product.priceDisplay,
    src: product.images[0],
    href: buildProductUrl('minimal', product.slug),
  }))

  return (
    <section
      className="py-20 lg:py-32"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        {/* Section header with scroll reveal */}
        <ScrollReveal direction="up" distance={30} blur>
          <div className="flex items-center justify-between mb-14">
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400">
              Selected Pieces
            </h2>
            <Link
              href={buildConceptUrl('minimal', 'bestsellers')}
              className="text-[10px] uppercase tracking-[0.15em] text-neutral-300 hover:text-neutral-600 transition-colors duration-500"
            >
              View All →
            </Link>
          </div>
        </ScrollReveal>

        {/* FocusCards — hover one, others blur */}
        <ScrollReveal direction="up" distance={40} duration={0.9}>
          <FocusCards cards={focusCards} />
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SECTION 5 — ENCRYPTED TEXT PHILOSOPHY
   Brand philosophy revealed through encrypted text.
   Characters flip through gibberish before revealing.
   ═══════════════════════════════════════════════════ */

function EncryptedPhilosophySection({ concept }: { concept: ConceptConfig }) {
  return (
    <section
      className="py-32 lg:py-44"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <div className="mx-auto max-w-3xl px-8 lg:px-12 text-center">
        {/* Top rule with animation */}
        <ScrollReveal direction="none">
          <div className="w-12 h-px mx-auto mb-16 bg-neutral-200" />
        </ScrollReveal>

        <blockquote>
          {/* Encrypted text reveal for the quote */}
          <div className="text-lg md:text-xl lg:text-2xl font-extralight leading-[1.8] tracking-[-0.01em] text-neutral-400">
            <EncryptedText
              text="Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."
              revealDelayMs={35}
              flipDelayMs={40}
              className="font-extralight not-mono"
              encryptedClassName="text-neutral-200"
              revealedClassName="text-neutral-400"
            />
          </div>
          <ScrollReveal direction="up" distance={15} delay={0.5}>
            <footer className="mt-10">
              <cite className="text-[9px] uppercase tracking-[0.3em] not-italic text-neutral-300">
                Antoine de Saint-Exupéry
              </cite>
            </footer>
          </ScrollReveal>
        </blockquote>

        <ScrollReveal direction="none" delay={0.3}>
          <div className="w-12 h-px mx-auto mt-16 bg-neutral-200" />
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SECTION 6 — STICKY SCROLL REVEAL — BRAND STORY
   Left: scrolling text about craftsmanship.
   Right: sticky image that changes with each block.
   ═══════════════════════════════════════════════════ */

function BrandStorySection({ concept }: { concept: ConceptConfig }) {
  const storyContent = [
    {
      title: 'Material Integrity',
      description:
        'Every piece begins with the selection of materials. We source only ethically mined diamonds and recycled precious metals, ensuring that beauty never comes at the cost of conscience. Our gemologists inspect each stone under 10x magnification before it enters our atelier.',
      content: (
        <div className="w-full h-full relative">
          <Image
            src="/images/diamond-facets-1.jpg"
            alt="Diamond facets close-up"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
    },
    {
      title: 'Precision Craft',
      description:
        'Our master jewelers work with tolerances measured in hundredths of a millimeter. Each setting is hand-finished, each prong individually shaped to hold its stone with the minimum metal necessary. The result is jewelry that appears to float — light passing through unobstructed.',
      content: (
        <div className="w-full h-full relative">
          <Image
            src="/images/jewelry-ring-closeup.jpg"
            alt="Ring craftsmanship detail"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
    },
    {
      title: 'Intentional Design',
      description:
        'We design by subtraction. Every curve, every angle, every proportion is questioned until only the essential remains. Our design philosophy is rooted in the belief that true luxury is not about excess — it is about the confidence to leave things out.',
      content: (
        <div className="w-full h-full relative">
          <Image
            src="/images/minimalist-jewelry.jpg"
            alt="Minimalist jewelry design"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
    },
    {
      title: 'Lasting Value',
      description:
        'Every piece is built to be worn daily for decades. We use solid gold — never plated, never filled. Our diamonds are certified by GIA or IGI. We offer lifetime maintenance because we believe in the things we make. This is jewelry designed to outlast trends.',
      content: (
        <div className="w-full h-full relative">
          <Image
            src="/images/gold-jewelry-collection.jpg"
            alt="Gold jewelry collection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ),
    },
  ]

  return (
    <section style={{ backgroundColor: concept.palette.surface }}>
      <ScrollReveal direction="up" distance={30}>
        <div className="pt-20 lg:pt-32 px-6 md:px-16">
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400 mb-4">
            Our Philosophy
          </h2>
        </div>
      </ScrollReveal>
      <StickyScrollReveal
        content={storyContent}
        contentClassName="rounded-sm"
      />
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SECTION 7 — GLARE CARD FEATURED PIECE
   Single hero product with 3D tilt + glare effect.
   Premium, interactive, eye-catching.
   ═══════════════════════════════════════════════════ */

function FeaturedPieceSection({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers()[0]

  return (
    <section
      className="py-24 lg:py-36"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* GlareCard with product image */}
          <ScrollReveal direction="left" distance={60} duration={1.0}>
            <GlareCard className="w-full max-w-lg mx-auto cursor-pointer">
              <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                <Image
                  src={featured.images[0]}
                  alt={featured.name}
                  fill
                  className="object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 mb-1">
                    The Statement Piece
                  </p>
                  <h3 className="text-xl font-light text-white tracking-wide">
                    {featured.name}
                  </h3>
                </div>
              </div>
            </GlareCard>
          </ScrollReveal>

          {/* Product details */}
          <ScrollReveal direction="right" distance={60} duration={1.0} delay={0.2}>
            <div className="max-w-md">
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 mb-6">
                Featured
              </p>
              <h2 className="text-3xl lg:text-4xl font-extralight tracking-[-0.02em] leading-[1.2] mb-6">
                {featured.name}
              </h2>
              <p className="text-sm font-light leading-[1.9] text-neutral-400 mb-8">
                {featured.description}
              </p>
              <div className="flex items-baseline gap-6 mb-10">
                <span className="text-2xl font-extralight">{featured.priceDisplay}</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-300">
                  {featured.material}
                </span>
              </div>
              {featured.diamondSpecs && (
                <div className="grid grid-cols-2 gap-4 mb-10 py-6 border-t border-b border-neutral-100">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 mb-1">Carat</p>
                    <p className="text-sm font-light">{featured.diamondSpecs.carat}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 mb-1">Cut</p>
                    <p className="text-sm font-light">{featured.diamondSpecs.cut}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 mb-1">Color</p>
                    <p className="text-sm font-light">{featured.diamondSpecs.color}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 mb-1">Clarity</p>
                    <p className="text-sm font-light">{featured.diamondSpecs.clarity}</p>
                  </div>
                </div>
              )}
              <Link
                href={buildProductUrl('minimal', featured.slug)}
                className="group inline-flex items-center gap-4"
              >
                <span className="text-[11px] uppercase tracking-[0.2em] font-light text-neutral-500 group-hover:text-neutral-900 transition-colors duration-500">
                  View Details
                </span>
                <span className="inline-block w-8 h-px bg-neutral-300 transition-all duration-500 group-hover:w-16 group-hover:bg-neutral-900" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SECTION 8 — APPLE CAROUSEL — COLLECTIONS
   Horizontal scrolling cards with nav arrows.
   Hover lifts card. Smooth, premium feel.
   ═══════════════════════════════════════════════════ */

function CollectionsCarouselSection({ concept }: { concept: ConceptConfig }) {
  const carouselCards = collections.map((collection) => ({
    category: 'Collection',
    title: collection.name,
    src: collection.heroImage,
    href: buildConceptUrl('minimal', `collection/${collection.id}`),
  }))

  return (
    <section
      className="py-20 lg:py-32"
      style={{ backgroundColor: concept.palette.surface }}
    >
      <ScrollReveal direction="up" distance={30}>
        <AppleCarousel
          cards={carouselCards}
          title="Collections"
        />
      </ScrollReveal>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SECTION 9 — CATEGORIES WITH HOVER ANIMATION
   Numbered list with animated underline on hover.
   Each row slides in from left on scroll.
   ═══════════════════════════════════════════════════ */

function AnimatedCategoriesSection({ concept }: { concept: ConceptConfig }) {
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
        <ScrollReveal direction="up" distance={20} blur>
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400 mb-16">
            Categories
          </h2>
        </ScrollReveal>

        <div>
          {categories.map((cat, i) => (
            <ScrollReveal
              key={cat.slug}
              direction="left"
              distance={40}
              delay={i * 0.08}
              duration={0.6}
            >
              <Link
                href={buildCategoryUrl('minimal', cat.slug)}
                className="group flex items-center justify-between py-6 border-t border-neutral-100 transition-colors hover:bg-neutral-50"
              >
                <div className="flex items-baseline gap-6 lg:gap-10">
                  <span className="text-[10px] tracking-[0.15em] font-light tabular-nums text-neutral-200 group-hover:text-neutral-400 transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg lg:text-3xl font-extralight tracking-[-0.01em] text-neutral-800 group-hover:text-neutral-500 transition-colors duration-500">
                    {cat.label}
                  </span>
                </div>
                {/* Animated arrow that slides in on hover */}
                <motion.span
                  className="text-neutral-300 group-hover:text-neutral-600 transition-colors duration-500 flex items-center gap-2"
                >
                  <span className="text-[10px] uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">
                    Explore
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.span>
              </Link>
            </ScrollReveal>
          ))}
          <div className="border-t border-neutral-100" />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SECTION 10 — PLACEHOLDERS VANISH INPUT — NEWSLETTER
   Cycling animated placeholders.
   Modern, interactive, delightful.
   ═══════════════════════════════════════════════════ */

function ModernNewsletterSection({ concept }: { concept: ConceptConfig }) {
  return (
    <section
      className="py-28 lg:py-40"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <div className="mx-auto max-w-lg px-8 text-center">
        <ScrollReveal direction="up" distance={30} blur>
          <div className="w-12 h-px mx-auto mb-12 bg-neutral-200" />
          <h2 className="text-xl font-extralight tracking-[-0.01em] mb-3">
            Stay informed.
          </h2>
          <p className="text-[11px] font-light leading-relaxed text-neutral-400 mb-12">
            New pieces, restocks, and nothing else.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={20} delay={0.2}>
          <PlaceholdersVanishInput
            placeholders={[
              'Enter your email address',
              'Get notified about new arrivals',
              'Join our quiet community',
              'Be the first to know',
              'No spam. Ever.',
            ]}
          />
        </ScrollReveal>

        <ScrollReveal direction="none" delay={0.4}>
          <div className="w-12 h-px mx-auto mt-12 bg-neutral-200" />
        </ScrollReveal>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SECTION 11 — CLOSING STATEMENT
   "Nothing more." in massive ghost typography.
   Parallax scroll effect for depth.
   ═══════════════════════════════════════════════════ */

function ClosingSection({ concept }: { concept: ConceptConfig }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 0.3])

  return (
    <section
      ref={ref}
      className="py-32 lg:py-44 overflow-hidden"
      style={{ backgroundColor: concept.palette.bg }}
    >
      <motion.div
        className="mx-auto max-w-[1440px] px-8 lg:px-16 text-center"
        style={{ scale, opacity }}
      >
        <p className="text-[clamp(2.5rem,9vw,8rem)] font-extralight tracking-[-0.04em] leading-[0.85] text-neutral-100">
          Nothing more.
        </p>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT — MINIMAL HOME
   ═══════════════════════════════════════════════════ */

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  return (
    <ConceptLayout concept={concept}>
      <HeroSection concept={concept} />
      <VelocityMarqueeSection concept={concept} />
      <EditorialParallaxSection concept={concept} />
      <FocusProductSection concept={concept} />
      <EncryptedPhilosophySection concept={concept} />
      <BrandStorySection concept={concept} />
      <FeaturedPieceSection concept={concept} />
      <CollectionsCarouselSection concept={concept} />
      <AnimatedCategoriesSection concept={concept} />
      <ModernNewsletterSection concept={concept} />
      <ClosingSection concept={concept} />
    </ConceptLayout>
  )
}
