'use client'

import { useCallback } from 'react'
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

// Phase-2 homepage primitives — see docs/research/ui-ux-pro-max-recommendations.md
import { MarqueeText } from './minimal/ui/MarqueeText'
import { MagneticButton } from './minimal/ui/MagneticButton'
import { GlitchText } from './minimal/ui/GlitchText'
import { SmoothCounter } from './minimal/ui/SmoothCounter'

const ParticleField = dynamic(() => import('./minimal/3d/ParticleField'), {
  ssr: false,
})

const Minimal3DViewer = dynamic(() => import('./minimal/3d/Minimal3DViewer'), {
  ssr: false,
  loading: () => (
    <div className="aspect-square w-full max-w-md mx-auto animate-pulse bg-[#F0F0F0]" />
  ),
})

const font = minimal.font.primary
const mono = minimal.font.mono

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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  )
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

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
              color: '#ABABAB',
            }}
          >
            07 / 10
          </span>

          <div>
            {/* Animated headline with clip-path reveal + per-line glitch on hover */}
            <TextReveal duration={800}>
              <h1
                className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl"
                style={{
                  fontFamily: font,
                  fontWeight: 100,
                  letterSpacing: '-0.05em',
                  lineHeight: 0.88,
                  color: '#050505',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                <GlitchText>Precision.</GlitchText>
                <br />
                <GlitchText>Nothing</GlitchText>
                <br />
                <GlitchText>More.</GlitchText>
              </h1>
            </TextReveal>

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
                        color: '#ABABAB',
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

            {/* CTA Buttons — staggered, magnetic on hover */}
            <StaggerReveal stagger={100} duration={500} direction="up" className="">
              <div style={{ display: 'flex', gap: '16px', marginTop: 'clamp(40px, 5vh, 64px)', flexWrap: 'wrap' }} className="w-full">
                <div className="w-full sm:w-auto">
                  <MagneticButton>
                    <Link
                      href="/minimal/collections"
                      className="vm-btn-primary w-full sm:w-auto"
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
                        padding: '20px 48px',
                        border: '1px solid #050505',
                        height: '52px',
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
                      className="vm-btn-secondary w-full sm:w-auto"
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
                        padding: '20px 48px',
                        border: '1px solid #050505',
                        height: '52px',
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
            speed={0.15}
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
            <span className={minimal.cn.label} style={{ fontFamily: mono }}>Categories</span>
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
                    className="group-hover:scale-[1.04]"
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
          <ParallaxSection speed={0.1}>
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
            <span className={minimal.cn.label} style={{ fontFamily: mono }}>Featured Piece</span>
            <TextReveal delay={100} duration={700} as="h2">
              <span
                className="mt-5 mb-4 text-xl sm:text-2xl md:text-3xl lg:text-5xl"
                style={{
                  fontFamily: font,
                  fontWeight: 200,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: '#050505',
                  display: 'block',
                }}
              >
                {heroProduct.name}
              </span>
            </TextReveal>
            <p
              style={{
                fontFamily: font,
                fontSize: '14px',
                fontWeight: 300,
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
                          fontWeight: 200,
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
                fontWeight: 200,
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

      {/* ═══ SECTION 3B: 3D PRODUCT VIEWER ═══ */}
      <section style={{ backgroundColor: '#050505' }}>
        <div className={minimal.cn.container} style={{ paddingTop: '40px', paddingBottom: '0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
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
                  fontWeight: 200,
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                }}
              >
                360° View
              </h2>
            </div>
          </div>
        </div>
        <Minimal3DViewer />
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
          <SplitTextReveal
            text="Crafted with obsession. Worn with intention. Every facet, every angle, every proportion — calculated to maximize brilliance while minimizing everything else."
            as="p"
            stagger={30}
            duration={500}
            className=""
          />
          <div style={{ width: '48px', height: '1px', backgroundColor: '#333333', margin: '48px auto 24px' }} />
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
              className="group block"
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
                  className="group-hover:scale-[1.03]"
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
                    fontWeight: 200,
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
                    fontWeight: 300,
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
                    fontWeight: 200,
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
              <span className={minimal.cn.label} style={{ fontFamily: mono }}>Curated</span>
              <TextReveal delay={100} duration={700} as="h2">
                <span className={`${minimal.cn.sectionHeadline} mt-4`} style={{ fontFamily: font, display: 'block' }}>
                  Collections
                </span>
              </TextReveal>
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
                    className="group-hover:scale-[1.04]"
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

      {/* ═══ SECTION 6: TRUST METRICS — Animated CountUp ═══ */}
      <section className={minimal.cn.sectionCompact}>
        <div className={minimal.cn.container}>
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
                    fontFamily: font,
                    fontSize: 'clamp(32px, 3.5vw, 56px)',
                    fontWeight: 100,
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
        </div>
      </section>

      {/* ═══ SECTION 6B: BESTSELLERS — Staggered Grid ═══ */}
      <section className={minimal.cn.section} style={{ paddingTop: 0 }}>
        <div className={minimal.cn.container}>
          <div className="flex justify-between items-end mb-16 md:mb-20">
            <div>
              <span className={minimal.cn.label} style={{ fontFamily: mono }}>Most Loved</span>
              <TextReveal delay={100} duration={700} as="h2">
                <span className={`${minimal.cn.sectionHeadline} mt-4`} style={{ fontFamily: font, display: 'block' }}>
                  Bestsellers
                </span>
              </TextReveal>
            </div>
            <Link href="/minimal/collections" className={`${minimal.cn.btnGhost} no-underline`}>
              View All <ArrowRight size={12} strokeWidth={1.5} />
            </Link>
          </div>
          <StaggerReveal className={minimal.cn.gridProduct}>
            {bestsellers.map((p) => (
              <MinimalProductCard key={p.id} product={p} />
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
              <span className={minimal.cn.label} style={{ fontFamily: mono }}>Just In</span>
              <TextReveal delay={100} duration={700} as="h2">
                <span className={`${minimal.cn.sectionHeadline} mt-4`} style={{ fontFamily: font, display: 'block' }}>
                  New Arrivals
                </span>
              </TextReveal>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={scrollPrev}
                aria-label="Previous"
                style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E5E5E5',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: '#050505',
                  transition: 'all 0.2s ease',
                }}
                className="hover:!bg-[#050505] hover:!text-white hover:!border-[#050505]"
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next"
                style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E5E5E5',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: '#050505',
                  transition: 'all 0.2s ease',
                }}
                className="hover:!bg-[#050505] hover:!text-white hover:!border-[#050505]"
              >
                <ChevronRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div ref={emblaRef} className="overflow-hidden" style={{ cursor: 'grab' }}>
            <div style={{ display: 'flex', gap: 'clamp(16px, 2vw, 24px)' }}>
              {(newArrivals.length > 0 ? newArrivals : products.slice(0, 8)).map((p) => (
                <div key={p.id} style={{ flex: '0 0 calc(25% - 18px)', minWidth: '240px' }}>
                  <MinimalProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: NEWSLETTER — Minimal ═══ */}
      <section style={{ backgroundColor: '#FAFAFA', padding: 'clamp(64px, 10vh, 120px) 0' }}>
        <div className={minimal.cn.containerNarrow} style={{ textAlign: 'center' }}>
          <span className={minimal.cn.label} style={{ fontFamily: mono, display: 'block', marginBottom: '20px' }}>
            Stay Informed
          </span>
          <TextReveal duration={700} as="h2">
            <span
              className="text-xl sm:text-2xl md:text-3xl lg:text-5xl"
              style={{
                fontFamily: font,
                fontWeight: 200,
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
              fontWeight: 300,
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
                fontWeight: 300,
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
          font-weight: 200;
          color: #FFFFFF;
          line-height: 1.6;
          letter-spacing: -0.02em;
        }

        /* Smooth focus states */
        input:focus {
          border-color: #050505 !important;
        }
      `}</style>
    </MinimalLayout>
  )
}
