'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { MinimalLayout } from './minimal/MinimalLayout'
import { MinimalProductCard } from './minimal/MinimalProductCard'
import { minimal } from './minimal/design-system'
import { products } from '@/data/products'
import type { ConceptConfig } from '@/data/concepts'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

// Animation components
import { TextReveal, SplitTextReveal } from './minimal/animations/TextReveal'
import { StaggerReveal } from './minimal/animations/StaggerReveal'
import { ParallaxSection, ParallaxImage } from './minimal/animations/ParallaxSection'
import { HorizontalScroll, HorizontalPanel } from './minimal/animations/HorizontalScroll'
import { ScrollScrub, ScrollWordReveal } from './minimal/animations/ScrollScrub'
import { KineticHeadline, HeadlineReveal } from './minimal/animations/KineticType'

// Phase-2 homepage primitives — see docs/research/ui-ux-pro-max-recommendations.md
import { MarqueeText } from './minimal/ui/MarqueeText'
import { MagneticButton } from './minimal/ui/MagneticButton'
import { GlitchText } from './minimal/ui/GlitchText'
import { SmoothCounter } from './minimal/ui/SmoothCounter'

const ParticleField = dynamic(() => import('./minimal/3d/ParticleField'), {
  ssr: false,
})

// Replaces the previous WebGL `Minimal3DViewer` (which rendered a grey
// canvas on iOS Safari due to a broken hand-rolled cube-map env). The
// new image-based viewer cycles through ACTUAL product photography and
// works on every device. See `Minimal360Viewer` JSDoc for the rationale.
const Minimal360Viewer = dynamic(() => import('./minimal/3d/Minimal360Viewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full" style={{ background: '#050505', padding: '24px 12px 36px' }}>
      <div
        className="mx-auto"
        style={{
          width: 'min(540px, 86vw)',
          aspectRatio: '1 / 1',
          background: '#E5E5E5',
        }}
      />
    </div>
  ),
})

const font = minimal.font.primary
const mono = minimal.font.brutalistMono

const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4)
const newArrivals = products.filter((p) => p.isNew).slice(0, 8)
const heroProduct = products[0]

const categories = [
  { slug: 'diamond-rings', label: 'Rings', image: '/images/minimal-engagement-ring.jpg' },
  { slug: 'diamond-necklaces', label: 'Necklaces', image: '/images/minimal-necklace-pendant.jpg' },
  { slug: 'diamond-earrings', label: 'Earrings', image: '/images/minimal-diamond-studs.jpg' },
  { slug: 'diamond-bracelets', label: 'Bracelets', image: '/images/minimal-tennis-bracelet.jpg' },
  { slug: 'loose-diamonds', label: 'Diamonds', image: '/images/minimal-loose-diamond.jpg' },
]

const collections = [
  { title: 'Engagement', desc: 'Precision-set solitaires', image: '/images/minimal-engagement-ring.jpg', href: '/minimal/category/diamond-rings' },
  { title: 'Gold', desc: 'Pure metalwork', image: '/images/gold-jewelry-collection.jpg', href: '/minimal/category/gold-rings' },
  { title: 'Necklaces', desc: 'Architectural pendants', image: '/images/minimal-necklace-pendant.jpg', href: '/minimal/category/diamond-necklaces' },
  { title: 'Bridal', desc: 'Ceremony essentials', image: '/images/minimal-wedding-rings.jpg', href: '/minimal/category/wedding-bridal' },
  { title: 'Earrings', desc: 'Geometric studs', image: '/images/minimal-chandelier-earrings.jpg', href: '/minimal/category/diamond-earrings' },
  { title: 'Bracelets', desc: 'Linear precision', image: '/images/minimal-tennis-bracelet.jpg', href: '/minimal/category/diamond-bracelets' },
]

// Curated pieces for horizontal scroll section
const curatedPieces = products.filter(p => p.isBestseller || p.isNew).slice(0, 5)

// Frame stack for the 360° image viewer. We start with every angle of
// the hero product, then trail with the lead image of three other
// bestsellers so the spin lasts long enough to feel like a continuous
// orbit. De-duplicated so a repeated path doesn't waste a cycle.
const viewer360Images = Array.from(
  new Set(
    [
      ...heroProduct.images,
      ...bestsellers.slice(1, 4).flatMap((p) => p.images.slice(0, 1)),
    ].filter(Boolean),
  ),
)

// Brand band running between the hero and category showcase. Black band,
// monochrome type, ◆ separators — see MarqueeText for the visual contract.
const marqueeItems = [
  'Precision Cuts',
  'GIA Certified',
  'Bespoke Commissions',
  'Ethically Sourced',
  'Lifetime Service',
  'Hand Set',
  'Est. 1974',
]

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  void concept

  // ── New Arrivals carousel ─────────────────────────────────────────
  // Embla v8 with native CSS-gap support. Slides use `flex: 0 0 auto`
  // + responsive Tailwind widths (no calc-based flex-basis), which is
  // the pattern the Embla docs recommend for v8 — and the one that
  // doesn't silently leave the user stuck on slide #1 when the gap
  // value disagrees with the calc subtraction (the regression flagged
  // in the bug sprint). `containScroll: 'trimSnaps'` strips snap
  // points beyond the natural overflow so the user can never end up
  // pinned to "page 5 of 4". `dragFree: false` preserves the snap-to-
  // slide UX the original carousel was going for.
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      containScroll: 'trimSnaps',
      dragFree: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })],
  )
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  // Sync prev/next button enabled-state with Embla. With `loop: true`
  // both flags stay `true` always, which is the desired UX (arrows
  // never look "broken" mid-row). Re-init also runs on window resize
  // so the carousel recovers after orientation flips on iOS.
  useEffect(() => {
    if (!emblaApi) return

    const sync = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }
    const handleResize = () => emblaApi.reInit()

    sync()
    emblaApi.on('select', sync)
    emblaApi.on('reInit', sync)
    window.addEventListener('resize', handleResize)
    return () => {
      emblaApi.off('select', sync)
      emblaApi.off('reInit', sync)
      window.removeEventListener('resize', handleResize)
    }
  }, [emblaApi])

  return (
    <MinimalLayout>
      {/* ═══ SECTION 1: HERO — Brutalist Split-Screen + Diamond Dust ═══ */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="vm-hero-split"
      >
        {/* Left — Typography Panel */}
        <div
          style={{
            flex: '0 0 55%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(40px, 8vh, 120px) clamp(32px, 5vw, 96px)',
            backgroundColor: '#FFFFFF',
            position: 'relative',
          }}
          className="vm-hero-left"
        >
          {/* Decorative index number */}
          <span
            style={{
              position: 'absolute',
              top: 'clamp(80px, 10vh, 140px)',
              left: 'clamp(32px, 5vw, 96px)',
              fontFamily: mono,
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: '#9B9B9B',
            }}
          >
            07 / 10
          </span>

          <div>
            {/* Phase 6: Kinetic headline — line-by-line masked reveal */}
            <HeadlineReveal
              lines={['Precision.', 'Nothing', 'More.']}
              as="h1"
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl"
              style={{
                fontFamily: font,
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                color: '#050505',
                textTransform: 'uppercase',
                margin: 0,
              }}
              stagger={0.14}
              duration={0.9}
              start="top 95%"
            />

            {/* Data points — staggered reveal */}
            <StaggerReveal
              stagger={120}
              duration={500}
              direction="up"
              className=""
            >
              <div
                style={{
                  display: 'flex',
                  gap: 'clamp(24px, 3vw, 48px)',
                  marginTop: 'clamp(40px, 5vh, 72px)',
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { num: '01', text: 'GIA Certified' },
                  { num: '02', text: 'Flawless Clarity' },
                  { num: '03', text: 'Exacting Cut' },
                ].map((item) => (
                  <div key={item.num} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span
                      style={{
                        fontFamily: mono,
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        color: '#9B9B9B',
                      }}
                    >
                      {item.num}
                    </span>
                    <span
                      style={{
                        fontFamily: font,
                        fontSize: '10px',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: '#050505',
                        fontWeight: 500,
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </StaggerReveal>

            {/* CTA Buttons — staggered, magnetic on hover.
                Both CTAs share the `vm-hero-cta` class so they get an
                identical 220px min-width on tablet+ and full-width on
                mobile (handled in the global <style> block at the
                bottom of this file). Without that constraint the
                shorter "Bespoke" rendered ~140px while "Shop
                Collection" rendered ~220px — the regression the user
                flagged in the bug sprint. */}
            <StaggerReveal stagger={100} duration={500} direction="up" className="">
              <div style={{ display: 'flex', gap: '16px', marginTop: 'clamp(40px, 5vh, 64px)', flexWrap: 'wrap' }} className="w-full">
                <div className="w-full sm:w-auto">
                  <MagneticButton>
                    <Link
                      href="/minimal/collections"
                      className="vm-btn-primary vm-hero-cta w-full sm:w-auto"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        fontFamily: font,
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        color: '#FFFFFF',
                        backgroundColor: '#050505',
                        padding: '0 32px',
                        border: '1px solid #050505',
                        height: '52px',
                        boxSizing: 'border-box',
                      }}
                    >
                      Shop Collection
                    </Link>
                  </MagneticButton>
                </div>
                <div className="w-full sm:w-auto">
                  <MagneticButton>
                    <Link
                      href="/minimal/bespoke"
                      className="vm-btn-secondary vm-hero-cta w-full sm:w-auto"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: font,
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        color: '#050505',
                        backgroundColor: 'transparent',
                        padding: '0 32px',
                        border: '1px solid #050505',
                        height: '52px',
                        boxSizing: 'border-box',
                      }}
                    >
                      Bespoke
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </StaggerReveal>
          </div>
        </div>

        {/* Right — Full-bleed Image with Parallax + Diamond Dust overlay */}
        <div
          className="vm-hero-right"
          style={{
            flex: '0 0 45%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <ParallaxImage
            src="/images/diamond-melee-1.jpg"
            alt="Precision-cut diamond"
            speed={minimal.motion.parallax.bg}
          />
          <ParticleField />
        </div>
      </section>

      {/* ═══ SECTION 1B: BRAND BAND — Scrolling Marquee ═══ */}
      <MarqueeText items={marqueeItems} duration={45} />

      {/* ═══ SECTION 2: CATEGORY SHOWCASE — Staggered Grid ═══ */}
      <section className={minimal.cn.section}>
        <div className={minimal.cn.container}>
          <div className="mb-16 md:mb-20">
            <span className="brutalist-section-num">02 — Categories</span>
            <TextReveal delay={100} duration={700} as="h2">
              <span className={`${minimal.cn.sectionHeadline} mt-4`} style={{ fontFamily: font, display: 'block' }}>
                Shop by Category
              </span>
            </TextReveal>
          </div>
          <StaggerReveal className={minimal.cn.gridCategory}>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/minimal/category/${cat.slug}`}
                className="group block"
                style={{ textDecoration: 'none', color: '#050505' }}
              >
                <div style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden', backgroundColor: '#FAFAFA' }}>
                  <img
                    src={cat.image}
                    alt={cat.label}
                    loading="eager"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    
                  />
                </div>
                <p
                  style={{
                    fontFamily: font,
                    fontSize: '13px',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    marginTop: '14px',
                  }}
                  className="group-hover:underline underline-offset-4 decoration-[#050505]/20"
                >
                  {cat.label}
                </p>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <div className={minimal.cn.container}><div className={minimal.cn.divider} /></div>

      {/* ═══ SECTION 3: FEATURED PIECE — Editorial Layout with Parallax ═══ */}
      <section className={minimal.cn.section}>
        <div className={`${minimal.cn.container} grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
          <ParallaxSection speed={minimal.motion.parallax.bg}>
            <div style={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden', backgroundColor: '#FAFAFA' }}>
              <img
                src={heroProduct.images[0]}
                alt={heroProduct.name}
                loading="eager"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </ParallaxSection>
          <div>
            <span className="brutalist-section-num">03 — Featured Piece</span>
            {/* Phase 6: Per-character kinetic reveal on product name */}
            <KineticHeadline
              text={heroProduct.name}
              as="h2"
              variant="slide-up"
              className="mt-5 mb-4 text-xl sm:text-2xl md:text-3xl lg:text-5xl"
              style={{
                fontFamily: font,
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#050505',
                display: 'block',
              }}
              stagger={0.025}
              once
              duration={0.9}
              start="top 80%"
            />
            <p
              style={{
                fontFamily: font,
                fontSize: '14px',
                fontWeight: 400,
                color: '#6B6B6B',
                lineHeight: 1.8,
                marginBottom: '32px',
                maxWidth: '480px',
              }}
            >
              {heroProduct.description}
            </p>

            {/* 4Cs Grid */}
            {heroProduct.diamondSpecs && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px mb-10" style={{ backgroundColor: '#E5E5E5' }}>
                {Object.entries(heroProduct.diamondSpecs)
                  .filter(([k]) => ['carat', 'cut', 'color', 'clarity'].includes(k))
                  .map(([key, val]) => (
                    <div key={key} style={{ backgroundColor: '#FFFFFF', padding: '20px 0', textAlign: 'center' }}>
                      <p className={minimal.cn.label} style={{ fontFamily: mono }}>{key}</p>
                      <p
                        style={{
                          fontFamily: font,
                          fontSize: 'clamp(18px, 1.5vw, 24px)',
                        fontWeight: 600,
                        color: '#050505',
                        marginTop: '8px',
                        fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {val}
                      </p>
                    </div>
                  ))}
              </div>
            )}

            <p
              style={{
                fontFamily: font,
                fontSize: 'clamp(22px, 2vw, 32px)',
                fontWeight: 600,
                color: '#050505',
                marginBottom: '32px',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {heroProduct.priceDisplay}
            </p>
            <Link
              href={`/minimal/product/${heroProduct.slug}`}
              className={`${minimal.cn.btnPrimary} no-underline`}
            >
              Discover <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3B: 360° PRODUCT VIEWER ═══
          Image-sequence spinner with real product photography. Drag
          horizontally (mouse / touch) or use ←/→ keys to scrub. Pre-
          viously a WebGL canvas — see Minimal360Viewer JSDoc for why
          we abandoned that path. */}
      <section style={{ backgroundColor: '#050505' }}>
        <div className={minimal.cn.container} style={{ paddingTop: '40px', paddingBottom: '0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <span
                style={{
                  fontFamily: mono,
                  fontSize: '10px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#6B6B6B',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                Interactive
              </span>
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-5xl"
                style={{
                  fontFamily: font,
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                }}
              >
                360° View
              </h2>
            </div>
            <p
              style={{
                fontFamily: font,
                fontSize: '13px',
                fontWeight: 400,
                color: '#9B9B9B',
                maxWidth: 360,
                lineHeight: 1.7,
              }}
            >
              Drag the piece to inspect every facet. Each frame is a real studio shot — no renders, no shaders.
            </p>
          </div>
        </div>
        <Minimal360Viewer images={viewer360Images} alt={heroProduct.name} />
      </section>

      {/* ═══ SECTION 4: BRAND STORY — Full-width Dark Band with Text Reveal ═══ */}
      <section style={{ backgroundColor: '#050505', padding: 'clamp(80px, 12vh, 160px) 0' }}>
        <div className={minimal.cn.containerNarrow} style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: mono,
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#6B6B6B',
              display: 'block',
              marginBottom: 'clamp(32px, 5vh, 64px)',
            }}
          >
            Philosophy
          </span>
          <ScrollWordReveal
            text="Crafted with obsession. Worn with intention. Every facet, every angle, every proportion — calculated to maximize brilliance while minimizing everything else."
            as="p"
            baseOpacity={0.1}
            start="top 85%"
            end="top 25%"
          />
          <div style={{ width: '48px', height: '1px', backgroundColor: '#6B6B6B', margin: '48px auto 24px' }} />
          <p
            style={{
              fontFamily: mono,
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#6B6B6B',
            }}
          >
            Vault Maison — Est. 1974
          </p>
        </div>
      </section>

      {/* ═══ SECTION 4B: HORIZONTAL SCROLL SHOWCASE ═══ */}
      <HorizontalScroll
        panelCount={curatedPieces.length}
        title="Curated Selection"
        subtitle="Scroll to explore"
      >
        {curatedPieces.map((product) => (
          <HorizontalPanel key={product.id} width="70vw">
            <Link
              href={`/minimal/product/${product.slug}`}
              className="group block vm-featured-card"
              style={{
                textDecoration: 'none',
                color: '#050505',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                width: '100%',
                height: '70vh',
                alignItems: 'center',
              }}
            >
              <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', backgroundColor: '#FAFAFA', height: '100%' }}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  
                />
              </div>
              <div style={{ padding: '40px 0' }}>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#9B9B9B',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  {product.category}
                </span>
                <h3
                  style={{
                    fontFamily: font,
                    fontSize: 'clamp(24px, 2.5vw, 36px)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    marginBottom: '16px',
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    fontFamily: font,
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#6B6B6B',
                    lineHeight: 1.8,
                    maxWidth: '360px',
                    marginBottom: '24px',
                  }}
                >
                  {product.description}
                </p>
                <p
                  style={{
                    fontFamily: font,
                    fontSize: 'clamp(20px, 1.5vw, 28px)',
                    fontWeight: 600,
                    color: '#050505',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {product.priceDisplay}
                </p>
              </div>
            </Link>
          </HorizontalPanel>
        ))}
      </HorizontalScroll>

      {/* ═══ SECTION 5: COLLECTION GRID — Staggered ═══ */}
      <section className={minimal.cn.section}>
        <div className={minimal.cn.container}>
          <div className="flex justify-between items-end mb-16 md:mb-20">
            <div>
              <span className="brutalist-section-num">05 — Collections</span>
              {/* Phase 6: Per-character kinetic reveal */}
              <KineticHeadline
                text="Collections"
                as="h2"
                variant="slide-up"
                className={`${minimal.cn.sectionHeadline} mt-4`}
                style={{ fontFamily: font, display: 'block' }}
                stagger={0.03}
                once
                duration={0.8}
                start="top 82%"
              />
            </div>
            <Link href="/minimal/collections" className={`${minimal.cn.btnGhost} no-underline`}>
              View All <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
          </div>
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {collections.map((col) => (
              <Link
                key={col.title}
                href={col.href}
                className="group block"
                style={{ textDecoration: 'none', color: '#050505' }}
              >
                <div style={{ position: 'relative', aspectRatio: '3 / 4', overflow: 'hidden', backgroundColor: '#FAFAFA' }}>
                  <img
                    src={col.image}
                    alt={col.title}
                    loading="eager"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(5, 5, 5, 0.35)',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: 'clamp(20px, 3vw, 32px)', left: 'clamp(20px, 3vw, 32px)' }}>
                    <span
                      style={{
                        fontFamily: mono,
                        fontSize: '10px',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.5)',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      {col.desc}
                    </span>
                    <p
                      style={{
                        fontFamily: font,
                        fontSize: 'clamp(16px, 1.5vw, 22px)',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {col.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <div className={minimal.cn.container}><div className={minimal.cn.divider} /></div>

      {/* ═══ SECTION 6: TRUST METRICS — Animated CountUp + ScrollScrub ═══ */}
      <section className={minimal.cn.sectionCompact}>
        <div className={minimal.cn.container}>
          <ScrollScrub from={{ y: 40, opacity: 0 }} start="top 92%" end="top 55%">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: '#E5E5E5' }}>
            {[
              { value: 50, suffix: '+', label: 'Years of Expertise' },
              { value: 10000, suffix: '+', label: 'Pieces Crafted' },
              { value: 100, suffix: '%', label: 'GIA Certified' },
              { value: 30, suffix: '', label: 'Day Returns' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 'clamp(32px, 4vw, 56px) clamp(16px, 2vw, 32px)',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: mono,
                    fontSize: 'clamp(32px, 3.5vw, 56px)',
                    fontWeight: 700,
                    color: '#050505',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  <SmoothCounter to={stat.value} suffix={stat.suffix} />
                </p>
                <p
                  style={{
                    fontFamily: mono,
                    fontSize: '10px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#9B9B9B',
                    marginTop: '12px',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          </ScrollScrub>
        </div>
      </section>

      {/* ═══ SECTION 6A: BRAND MANIFESTO — Tier 4 Dark Inversion (brutalist contrast block) ═══ */}
      <section style={{ padding: 'clamp(80px, 12vh, 160px) 0', backgroundColor: '#050505', color: '#FFFFFF' }}>
        <div className={minimal.cn.container}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center' }}>
            <ScrollScrub from={{ y: 50, opacity: 0 }} start="top 85%" end="top 35%">
            <div>
              <span className="brutalist-section-num" style={{ display: 'block', marginBottom: '24px' }}>06A — Our Philosophy</span>
              {/* Phase 6: Per-character kinetic reveal on dark section */}
              <KineticHeadline
                text="Craft Is Our Language"
                as="h2"
                variant="slide-up"
                style={{
                  fontFamily: font,
                  fontSize: 'clamp(28px, 3vw, 48px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  color: '#FFFFFF',
                  margin: '0 0 24px',
                }}
                stagger={0.03}
                start="top 80%"
                end="top 35%"
              />
              <p
                style={{
                  fontFamily: font,
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.8,
                  margin: '0 0 16px',
                  maxWidth: '480px',
                }}
              >
                Vault Maison exists at the intersection of art and precision. Each piece begins as a conversation between material and maker — a dialogue refined over five decades of uncompromising craftsmanship.
              </p>
              <p
                style={{
                  fontFamily: font,
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.8,
                  margin: '0 0 32px',
                  maxWidth: '480px',
                }}
              >
                We believe jewelry should be felt before it is seen. The weight of 18-karat gold against skin. The way light fractures through a precisely cut diamond. These are the moments we design for.
              </p>
              <Link
                href="/minimal/craftsmanship"
                className="brutalist-underline-link"
                style={{
                  fontFamily: font,
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  transition: 'opacity 0.2s ease',
                }}
              >
                Discover Our Craft
              </Link>
            </div>
            </ScrollScrub>
            <ScrollScrub from={{ y: 60, opacity: 0 }} start="top 80%" end="top 30%">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
                <img
                  src="/images/minimal-engagement-ring.jpg"
                  alt="Vault Maison craftsmanship — precision setting"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', backgroundColor: '#F5F5F5', marginTop: '48px' }}>
                <img
                  src="/images/minimal-loose-diamond.jpg"
                  alt="Vault Maison — ethically sourced diamonds"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
            </ScrollScrub>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6B: BESTSELLERS — Staggered Grid ═══ */}
      <section className={minimal.cn.section} style={{ paddingTop: 0 }}>
        <div className={minimal.cn.container}>
          <div className="flex justify-between items-end mb-16 md:mb-20">
            <div>
              <span className="brutalist-section-num">06B — Most Loved</span>
              {/* Phase 6: Per-character kinetic reveal */}
              <KineticHeadline
                text="Bestsellers"
                as="h2"
                variant="fade"
                className={`${minimal.cn.sectionHeadline} mt-4`}
                style={{ fontFamily: font, display: 'block' }}
                stagger={0.03}
                once
                duration={0.8}
                start="top 82%"
              />
            </div>
            <Link href="/minimal/collections" className={`${minimal.cn.btnGhost} no-underline`}>
              View All <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
          </div>
          <StaggerReveal className={minimal.cn.gridProduct}>
            {bestsellers.map((p, i) => (
              <MinimalProductCard key={p.id} product={p} index={i + 1} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      <div className={minimal.cn.container}><div className={minimal.cn.divider} /></div>

      {/* ═══ SECTION 7: NEW ARRIVALS CAROUSEL ═══ */}
      <section className={minimal.cn.section}>
        <div className={minimal.cn.container}>
          <div className="flex justify-between items-end mb-16 md:mb-20">
            <div>
              <span className="brutalist-section-num">07 — Just In</span>
              {/* Phase 6: Per-character kinetic reveal */}
              <KineticHeadline
                text="New Arrivals"
                as="h2"
                variant="slide-up"
                className={`${minimal.cn.sectionHeadline} mt-4`}
                style={{ fontFamily: font, display: 'block' }}
                stagger={0.025}
                once
                duration={0.8}
                start="top 82%"
              />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canPrev}
                aria-label="Previous arrivals"
                className="vm-carousel-arrow"
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canNext}
                aria-label="Next arrivals"
                className="vm-carousel-arrow"
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          {/* Embla v8 viewport. The inner ".vm-embla-track" is a flex
              container with native CSS gap; each slide is `flex: 0 0
              auto` with responsive widths so we always get more
              snap points than visible columns and the arrows can
              actually advance the row. */}
          <div ref={emblaRef} className="overflow-hidden vm-embla-viewport">
            <div className="flex gap-4 md:gap-6 vm-embla-track">
              {(newArrivals.length > 0 ? newArrivals : products.slice(0, 8)).map((p, i) => (
                <div
                  key={p.id}
                  className="vm-embla-slide basis-[78%] sm:basis-[46%] md:basis-[32%] lg:basis-[23.5%]"
                >
                  <MinimalProductCard product={p} index={i + 1} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: NEWSLETTER — Minimal ═══ */}
      <section style={{ backgroundColor: '#FAFAFA', padding: 'clamp(64px, 10vh, 120px) 0' }}>
        <div className={minimal.cn.containerNarrow} style={{ textAlign: 'center' }}>
          <ScrollScrub from={{ y: 30, opacity: 0 }} start="top 90%" end="top 50%">
          <span className="brutalist-section-num" style={{ display: 'block', marginBottom: '20px' }}>08 — Stay Informed</span>
          <TextReveal duration={700} as="h2">
            <span
              className="text-xl sm:text-2xl md:text-3xl lg:text-5xl"
              style={{
                fontFamily: font,
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#050505',
                marginBottom: '16px',
                display: 'block',
              }}
            >
              Newsletter
            </span>
          </TextReveal>
          <p
            style={{
              fontFamily: font,
              fontSize: '15px',
              fontWeight: 400,
              color: '#6B6B6B',
              lineHeight: 1.7,
              marginBottom: '40px',
              maxWidth: '400px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Early access to new collections, exclusive pieces, and expert insights.
          </p>
          <div style={{ display: 'flex', maxWidth: '440px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Your email"
              aria-label="Email address"
              style={{
                flex: 1,
                height: '52px',
                padding: '0 20px',
                border: '1px solid #E5E5E5',
                borderRight: 'none',
                backgroundColor: '#FFFFFF',
                fontFamily: font,
                fontSize: '14px',
                fontWeight: 400,
                color: '#050505',
                outline: 'none',
              }}
            />
            <button
              style={{
                height: '52px',
                padding: '0 32px',
                backgroundColor: '#050505',
                color: '#FFFFFF',
                border: 'none',
                fontFamily: font,
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
              className="vm-btn-primary"
            >
              Subscribe
            </button>
          </div>
          </ScrollScrub>
        </div>
      </section>

      {/* ── Global Styles ── */}
      <style>{`
        /* Brutalist button — instant invert on hover */
        .vm-btn-primary:hover {
          background-color: #FFFFFF !important;
          color: #050505 !important;
          transition: none;
        }
        .vm-btn-secondary:hover {
          background-color: #050505 !important;
          color: #FFFFFF !important;
          transition: none;
        }

        /* Hero CTA pair — Shop Collection + Bespoke must render at the
           SAME width regardless of label length. We pin a 220 px floor
           on tablet+ (matches the natural width of "Shop Collection")
           so the shorter "Bespoke" stretches to match. On mobile each
           CTA is full-width (parent .w-full) so they stack as equal
           full-bleed rectangles. */
        .vm-hero-cta {
          width: 100%;
        }
        @media (min-width: 640px) {
          .vm-hero-cta {
            min-width: 220px;
            width: auto;
          }
        }

        /* New Arrivals carousel — Embla v8 modern slide pattern.
           ".vm-embla-viewport" wraps the track; ".vm-embla-track" is
           the flex container; ".vm-embla-slide" is each card. We pin
           flex-shrink: 0 so the responsive Tailwind basis stays the
           one source of truth for slide width. */
        .vm-embla-viewport { cursor: grab; }
        .vm-embla-viewport:active { cursor: grabbing; }
        .vm-embla-slide { flex-shrink: 0; min-width: 0; }

        /* Arrow buttons — same hairline border as elsewhere in the
           concept; disabled state grays out per WCAG contrast and
           prevents click while still being announced by AT. */
        .vm-carousel-arrow {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #E5E5E5;
          background-color: transparent;
          color: #050505;
          cursor: pointer;
          transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease;
        }
        .vm-carousel-arrow:hover:not(:disabled) {
          background-color: #050505;
          color: #FFFFFF;
          border-color: #050505;
        }
        .vm-carousel-arrow:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .vm-carousel-arrow:focus-visible {
          outline: 1px solid #050505;
          outline-offset: 2px;
        }

        /* Featured product card responsive */
        @media (max-width: 768px) {
          .vm-featured-card {
            grid-template-columns: 1fr !important;
            height: auto !important;
            gap: 20px !important;
          }
        }

        /* Hero responsive */
        @media (max-width: 1023px) {
          .vm-hero-split {
            flex-direction: column-reverse !important;
            min-height: 100vh;
            height: auto !important;
          }
          .vm-hero-left {
            flex: 1 1 auto !important;
            padding: 48px 24px 64px !important;
          }
          .vm-hero-right {
            flex: 0 0 45vh !important;
          }
        }

        /* SplitTextReveal in dark section */
        .${minimal.cn.containerNarrow?.split(' ')[0] || 'container'} p {
          font-family: ${font};
          font-size: clamp(20px, 2.5vw, 36px);
          font-weight: 600;
          color: #FFFFFF;
          line-height: 1.6;
          letter-spacing: -0.02em;
        }

        /* Tier 2: Opacity-based hover states */
        .tier2-manifesto-link:hover {
          opacity: 0.5;
        }

        /* Smooth focus states */
        input:focus {
          border-color: #050505 !important;
        }
      `}</style>
    </MinimalLayout>
  )
}
