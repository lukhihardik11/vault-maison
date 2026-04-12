'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers } from '@/data/products'
import { collections } from '@/data/collections'
import { ConceptLayout } from '@/components/shared'
import { buildConceptUrl, buildProductUrl, buildCategoryUrl } from '@/lib/concept-utils'

/* ── Utility: Fade-in on scroll using IntersectionObserver with CSS fallback ── */
function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const directionMap = {
    up: 'translateY(24px)',
    down: 'translateY(-24px)',
    left: 'translateX(24px)',
    right: 'translateX(-24px)',
    none: 'none',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : directionMap[direction],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Utility: Typing effect that always shows text (CSS fallback) ── */
function TypedText({ text, className = '' }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState(text) // Always show full text by default
  const [isTyping, setIsTyping] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    setDisplayed('')
    setIsTyping(true)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [isInView, text])

  return (
    <span ref={ref} className={className}>
      {displayed}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  )
}

/* ── Utility: Animated counter ── */
function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(value) // Show real value by default

  useEffect(() => {
    if (!isInView) return
    setCount(0)
    const duration = 1500
    const steps = 40
    const increment = value / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(Math.round(current * 10) / 10)
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {Number.isInteger(value) ? Math.round(count) : count.toFixed(1)}
      {suffix}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — HERO
   Full viewport. Clean typography. Content ALWAYS visible.
   Subtle parallax on scroll as enhancement.
   ═══════════════════════════════════════════════════════════════ */

function HeroSection({ concept }: { concept: ConceptConfig }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#fafafa' }}
    >
      {/* Subtle dot pattern via CSS */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-[1440px] w-full px-6 sm:px-8 lg:px-16"
        style={{ y }}
      >
        <div className="pt-28 sm:pt-32 pb-16">
          {/* Micro-label — ALWAYS VISIBLE */}
          <FadeIn delay={0}>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-neutral-400 mb-10 sm:mb-14">
              Est. 2024 — Vault Maison
            </p>
          </FadeIn>

          {/* Main heading — ALWAYS VISIBLE, large typography */}
          <h1 className="text-[clamp(3.5rem,12vw,11rem)] font-extralight tracking-[-0.04em] leading-[0.85] text-neutral-900 mb-6">
            <TypedText text="JEWELRY." />
          </h1>

          {/* Subtitle — ALWAYS VISIBLE */}
          <FadeIn delay={0.2}>
            <p className="max-w-md text-sm sm:text-base font-light tracking-wide leading-relaxed text-neutral-400 mt-6 sm:mt-8">
              Nothing more. Nothing less. Only what matters.
            </p>
          </FadeIn>

          {/* Hairline rule */}
          <FadeIn delay={0.3}>
            <div className="h-px w-full max-w-xs bg-neutral-200 mt-10 sm:mt-14" />
          </FadeIn>

          {/* CTA button — ALWAYS VISIBLE */}
          <FadeIn delay={0.4}>
            <div className="mt-8 sm:mt-10">
              <Link
                href={buildConceptUrl('minimal', 'collections')}
                className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] font-light text-neutral-600 hover:text-neutral-900 transition-colors duration-500"
              >
                <span className="px-6 sm:px-8 py-3 border border-neutral-200 hover:border-neutral-400 transition-all duration-500">
                  View Collection
                </span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-300">Scroll</span>
        <div className="w-px h-6 bg-neutral-300 animate-pulse" />
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — MARQUEE
   CSS-only infinite scroll — no JS dependency for visibility.
   ═══════════════════════════════════════════════════════════════ */

function MarqueeSection() {
  return (
    <section className="py-3 sm:py-4 border-t border-b border-neutral-100 overflow-hidden bg-white">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="text-[clamp(1.5rem,4vw,3.5rem)] font-extralight tracking-[-0.02em] text-neutral-100 mx-4 sm:mx-8 flex-shrink-0"
          >
            Rings &nbsp;·&nbsp; Necklaces &nbsp;·&nbsp; Bracelets &nbsp;·&nbsp; Earrings &nbsp;·&nbsp; Timepieces &nbsp;·&nbsp; Bespoke &nbsp;·&nbsp;
          </span>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — EDITORIAL IMAGE WITH PARALLAX
   Full-width image. Content always visible.
   Parallax as progressive enhancement.
   ═══════════════════════════════════════════════════════════════ */

function EditorialSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <FadeIn>
      <section ref={ref} className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '21/9' }}>
            <motion.div className="absolute inset-[-8%] w-[116%] h-[116%]" style={{ y }}>
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
          <div className="flex justify-between items-center mt-3 sm:mt-4">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-300">
              SS26 Collection
            </p>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-300">
              01
            </p>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — PRODUCT GRID
   Clean grid with hover effects. All products visible immediately.
   Hover: image scales up, overlay appears.
   ═══════════════════════════════════════════════════════════════ */

function ProductGridSection() {
  const featured = getBestsellers().slice(0, 6)

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
        <FadeIn>
          <div className="flex items-center justify-between mb-10 sm:mb-14">
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
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100">
          {featured.map((product, i) => (
            <FadeIn key={product.slug} delay={i * 0.05}>
              <Link
                href={buildProductUrl('minimal', product.slug)}
                className="group block bg-white"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-white/90 backdrop-blur-sm p-3 sm:p-4">
                      <p className="text-[10px] sm:text-xs font-light text-neutral-900 truncate">{product.name}</p>
                      <p className="text-[10px] text-neutral-400 mt-1">{product.priceDisplay}</p>
                    </div>
                  </div>
                </div>
                {/* Always visible product info below image */}
                <div className="p-3 sm:p-5">
                  <p className="text-xs sm:text-sm font-light text-neutral-800 truncate">{product.name}</p>
                  <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">{product.priceDisplay}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — STATS
   Animated counters. Numbers always visible (start at real value).
   ═══════════════════════════════════════════════════════════════ */

function StatsSection() {
  const stats = [
    { value: 847, suffix: '+', label: 'Pieces Crafted' },
    { value: 12, suffix: '', label: 'Master Jewelers' },
    { value: 99.7, suffix: '%', label: 'Ethically Sourced' },
    { value: 42, suffix: '', label: 'Countries Shipped' },
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-neutral-50">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div className="group p-6 sm:p-8 lg:p-10 bg-white border border-neutral-100 hover:border-neutral-200 transition-colors duration-500 text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-tight text-neutral-900 mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  {stat.label}
                </p>
                {/* Subtle bottom border animation on hover */}
                <div className="h-px w-0 group-hover:w-full bg-neutral-900 mx-auto mt-4 transition-all duration-700" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — BRAND STORY (Split layout, not sticky scroll)
   Two-column layout with image + text blocks.
   Mobile-friendly — stacks vertically.
   ═══════════════════════════════════════════════════════════════ */

function BrandStorySection() {
  const stories = [
    {
      title: 'Material Integrity',
      text: 'Every piece begins with the selection of materials. We source only ethically mined diamonds and recycled precious metals, ensuring that beauty never comes at the cost of conscience.',
      image: '/images/diamond-facets-1.jpg',
      imageAlt: 'Diamond facets close-up',
    },
    {
      title: 'Precision Craft',
      text: 'Our master jewelers work with tolerances measured in hundredths of a millimeter. Each setting is hand-finished, each prong individually shaped to hold its stone with the minimum metal necessary.',
      image: '/images/jewelry-ring-closeup.jpg',
      imageAlt: 'Ring craftsmanship detail',
    },
    {
      title: 'Intentional Design',
      text: 'We design by subtraction. Every curve, every angle, every proportion is questioned until only the essential remains. True luxury is the confidence to leave things out.',
      image: '/images/minimalist-jewelry.jpg',
      imageAlt: 'Minimalist jewelry design',
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
        <FadeIn>
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400 mb-12 sm:mb-20">
            Our Philosophy
          </h2>
        </FadeIn>

        <div className="space-y-16 sm:space-y-24 lg:space-y-36">
          {stories.map((story, i) => (
            <FadeIn key={story.title} delay={0.1}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
                {/* Image */}
                <div className={`relative overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
                    <Image
                      src={story.image}
                      alt={story.imageAlt}
                      fill
                      className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className={`${i % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-300 mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-[-0.02em] text-neutral-900 mb-6">
                    {story.title}
                  </h3>
                  <p className="text-sm sm:text-base font-light leading-[1.9] text-neutral-400 max-w-md">
                    {story.text}
                  </p>
                  <div className={`h-px w-16 bg-neutral-200 mt-8 ${i % 2 === 1 ? 'lg:ml-auto' : ''}`} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — FEATURED PIECE
   Large product showcase. Content always visible.
   Hover effects as enhancement.
   ═══════════════════════════════════════════════════════════════ */

function FeaturedPieceSection() {
  const featured = getBestsellers()[0]

  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-neutral-50">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Product image with hover zoom */}
          <FadeIn direction="left">
            <div className="relative overflow-hidden group">
              <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                <Image
                  src={featured.images[0]}
                  alt={featured.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">
                    The Statement Piece
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Product details — ALWAYS VISIBLE */}
          <FadeIn direction="right" delay={0.15}>
            <div className="p-4 sm:p-8 lg:p-12 border border-neutral-100 bg-white">
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 mb-4 sm:mb-6">
                Featured
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-[-0.02em] leading-[1.2] mb-4 sm:mb-6 text-neutral-900">
                {featured.name}
              </h2>
              <p className="text-sm font-light leading-[1.9] text-neutral-400 mb-6 sm:mb-8">
                {featured.description}
              </p>
              <div className="flex items-baseline gap-4 sm:gap-6 mb-8 sm:mb-10">
                <span className="text-xl sm:text-2xl font-extralight text-neutral-900">{featured.priceDisplay}</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-300">
                  {featured.material}
                </span>
              </div>

              {featured.diamondSpecs && (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 py-4 sm:py-6 border-t border-b border-neutral-100">
                  {Object.entries(featured.diamondSpecs).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 mb-1">{key}</p>
                      <p className="text-xs sm:text-sm font-light text-neutral-700">{val}</p>
                    </div>
                  ))}
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
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8 — COLLECTIONS HORIZONTAL SCROLL
   CSS-only horizontal scroll. All cards visible.
   ═══════════════════════════════════════════════════════════════ */

function CollectionsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16 mb-8 sm:mb-10">
        <FadeIn>
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400">
            Collections
          </h2>
        </FadeIn>
      </div>

      {/* Horizontal scrolling container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 sm:gap-6 px-6 sm:px-8 lg:px-16 pb-4">
          {collections.map((collection, i) => (
            <FadeIn key={collection.id} delay={i * 0.05}>
              <Link
                href={buildConceptUrl('minimal', `collection/${collection.id}`)}
                className="group block w-[260px] sm:w-[300px] lg:w-[360px] flex-shrink-0"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src={collection.heroImage}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/60 mb-1 sm:mb-2">
                      {collection.subtitle}
                    </p>
                    <h3 className="text-base sm:text-lg font-light tracking-wide text-white">
                      {collection.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 9 — TESTIMONIALS
   Simple quote carousel. Content always visible.
   ═══════════════════════════════════════════════════════════════ */

function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const testimonials = [
    {
      quote: 'The craftsmanship is extraordinary. Every detail is considered, every edge is perfect. This is what jewelry should be.',
      name: 'Alexandra Chen',
      title: 'Art Director, Milan',
    },
    {
      quote: 'I have worn this ring every day for two years. It looks exactly as it did the day I received it. That is quality.',
      name: 'James Whitfield',
      title: 'Architect, London',
    },
    {
      quote: 'Nothing unnecessary. Nothing missing. The design philosophy resonates with everything I believe about luxury.',
      name: 'Sofia Bergström',
      title: 'Creative Director, Stockholm',
    },
    {
      quote: 'The packaging, the weight in your hand, the way light catches the stone — every moment is designed.',
      name: 'Marcus Tanaka',
      title: 'Gallery Owner, Tokyo',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="py-20 sm:py-24 lg:py-36 bg-neutral-50">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-16 text-center">
        <FadeIn>
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400 mb-12 sm:mb-16">
            Voices
          </h2>
        </FadeIn>

        {/* Quote — always visible, crossfade between testimonials */}
        <div className="relative min-h-[200px] sm:min-h-[180px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700"
              style={{ opacity: i === active ? 1 : 0, pointerEvents: i === active ? 'auto' : 'none' }}
            >
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-extralight leading-[1.6] tracking-[-0.01em] text-neutral-700 mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="text-xs sm:text-sm font-light text-neutral-900">{t.name}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 mt-1">{t.title}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8 sm:mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                i === active ? 'bg-neutral-900 w-6' : 'bg-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 10 — CATEGORIES
   Numbered list with hover animations.
   Content always visible.
   ═══════════════════════════════════════════════════════════════ */

function CategoriesSection() {
  const categories = [
    { label: 'Rings', slug: 'diamond-rings' as const },
    { label: 'Necklaces', slug: 'diamond-necklaces' as const },
    { label: 'Earrings', slug: 'diamond-earrings' as const },
    { label: 'Bracelets', slug: 'diamond-bracelets' as const },
    { label: 'Wedding & Bridal', slug: 'wedding-bridal' as const },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16">
        <FadeIn>
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-light text-neutral-400 mb-10 sm:mb-16">
            Categories
          </h2>
        </FadeIn>

        <div>
          {categories.map((cat, i) => (
            <FadeIn key={cat.slug} delay={i * 0.05} direction="left">
              <Link
                href={buildCategoryUrl('minimal', cat.slug)}
                className="group relative flex items-center justify-between py-4 sm:py-6 border-t border-neutral-200 transition-colors hover:bg-neutral-50"
              >
                <div className="flex items-baseline gap-4 sm:gap-6 lg:gap-10">
                  <span className="text-[10px] tracking-[0.15em] font-light tabular-nums text-neutral-300 group-hover:text-neutral-500 transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base sm:text-lg lg:text-3xl font-extralight tracking-[-0.01em] text-neutral-800 group-hover:text-neutral-500 transition-colors duration-500">
                    {cat.label}
                  </span>
                </div>
                <span className="flex items-center gap-2 text-neutral-300 group-hover:text-neutral-600 transition-all duration-500">
                  <span className="hidden sm:inline text-[10px] uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-8px] group-hover:translate-x-0">
                    Explore
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            </FadeIn>
          ))}
          <div className="border-t border-neutral-200" />
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 11 — NEWSLETTER
   Simple email input. Always visible.
   ═══════════════════════════════════════════════════════════════ */

function NewsletterSection() {
  const [email, setEmail] = useState('')

  return (
    <section className="py-20 sm:py-28 lg:py-40 bg-neutral-50">
      <div className="mx-auto max-w-lg px-6 sm:px-8 text-center">
        <FadeIn>
          <div className="w-12 h-px mx-auto mb-8 sm:mb-12 bg-neutral-200" />
          <h2 className="text-lg sm:text-xl font-extralight tracking-[-0.01em] mb-3 text-neutral-900">
            Stay informed.
          </h2>
          <p className="text-[11px] font-light leading-relaxed text-neutral-400 mb-8 sm:mb-12">
            New pieces, restocks, and nothing else.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail('') }}
            className="flex border-b border-neutral-300 focus-within:border-neutral-900 transition-colors duration-500"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-transparent py-3 text-sm font-light text-neutral-900 placeholder:text-neutral-300 outline-none"
            />
            <button
              type="submit"
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-900 transition-colors duration-500 px-4"
            >
              Subscribe
            </button>
          </form>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="w-12 h-px mx-auto mt-8 sm:mt-12 bg-neutral-200" />
        </FadeIn>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 12 — CLOSING STATEMENT
   "Nothing more." in massive typography. Always visible.
   ═══════════════════════════════════════════════════════════════ */

function ClosingSection() {
  return (
    <section className="py-24 sm:py-32 lg:py-44 overflow-hidden bg-white">
      <FadeIn>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-16 text-center">
          <p className="text-[clamp(2rem,8vw,7rem)] font-extralight tracking-[-0.04em] leading-[0.85] text-neutral-200">
            Nothing more.
          </p>
        </div>
      </FadeIn>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT — MINIMAL HOME
   12 sections. All content visible by default.
   Animations are progressive enhancement only.
   ═══════════════════════════════════════════════════════════════ */

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  return (
    <ConceptLayout concept={concept}>
      <HeroSection concept={concept} />
      <MarqueeSection />
      <EditorialSection />
      <ProductGridSection />
      <StatsSection />
      <BrandStorySection />
      <FeaturedPieceSection />
      <CollectionsSection />
      <TestimonialsSection />
      <CategoriesSection />
      <NewsletterSection />
      <ClosingSection />
    </ConceptLayout>
  )
}
