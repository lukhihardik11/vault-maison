'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { MinimalLayout } from './minimal/MinimalLayout'
import { MinimalProductCard } from './minimal/MinimalProductCard'
import { ScrollReveal } from './minimal/ScrollReveal'
import { minimal } from './minimal/design-system'
import { products } from '@/data/products'
import type { ConceptConfig } from '@/data/concepts'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const font = "'Helvetica Neue', Helvetica, Arial, sans-serif"

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
  { title: 'Engagement Rings', image: '/images/minimal-engagement-ring.jpg', href: '/minimal/category/diamond-rings' },
  { title: 'Gold Collection', image: '/images/gold-jewelry-collection.jpg', href: '/minimal/category/gold-rings' },
  { title: 'Diamond Necklaces', image: '/images/minimal-necklace-pendant.jpg', href: '/minimal/category/diamond-necklaces' },
  { title: 'Bridal', image: '/images/minimal-wedding-rings.jpg', href: '/minimal/category/wedding-bridal' },
  { title: 'Earrings', image: '/images/minimal-chandelier-earrings.jpg', href: '/minimal/category/diamond-earrings' },
  { title: 'Bracelets', image: '/images/minimal-tennis-bracelet.jpg', href: '/minimal/category/diamond-bracelets' },
]

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  )
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <MinimalLayout>
      {/* ═══ SECTION 1: HERO (brutalist split-screen) — DO NOT MODIFY ═══ */}
      <section className="vm-hero-split h-screen flex flex-col lg:flex-row" style={{ minHeight: '600px' }}>
        <div
          className="flex flex-col justify-end lg:w-[60%] w-full"
          style={{ backgroundColor: '#FFFFFF', padding: '10vh 5vw' }}
        >
          <div>
            <h1
              className="tracking-tighter leading-none uppercase"
              style={{
                fontFamily: font,
                fontSize: 'clamp(52px, 9vw, 140px)',
                fontWeight: 800,
                color: '#050505',
              }}
            >
              PRECISION.
              <br />
              NOTHING
              <br />
              MORE.
            </h1>

            <div className="flex flex-col gap-2" style={{ marginTop: '48px' }}>
              {['01 — GIA CERTIFIED', '02 — FLAWLESS CLARITY', '03 — EXACTING CUT'].map((line) => (
                <p
                  key={line}
                  style={{
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '11px',
                    fontWeight: 400,
                    color: '#050505',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {line}
                </p>
              ))}
            </div>

            <div style={{ marginTop: '48px' }}>
              <Link
                href="/minimal/collections"
                className="vm-brutalist-btn"
                style={{
                  display: 'inline-block',
                  fontFamily: font,
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  backgroundColor: '#050505',
                  padding: '18px 44px',
                  border: '1px solid #050505',
                  borderRadius: '0px',
                }}
              >
                Purchase
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:w-[40%] w-full h-[50vh] lg:h-auto overflow-hidden" style={{ backgroundColor: '#050505' }}>
          <img
            src="/images/diamond-melee-1.jpg"
            alt="Precision-cut diamond"
            className="w-full h-full"
            style={{ objectFit: 'cover', display: 'block' }}
          />
        </div>
      </section>

      {/* ═══ SECTION 2: CATEGORY SHOWCASE ═══ */}
      <section className={minimal.cn.section}>
        <div className={minimal.cn.container}>
          <ScrollReveal className="mb-12">
            <span className={minimal.cn.label}>Explore</span>
            <h2 className={`${minimal.cn.sectionHeadline} mt-3`}>Shop by Category</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.slug} delay={i * 80}>
                <Link href={`/minimal/category/${cat.slug}`} className="group block no-underline" style={{ color: '#050505' }}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#FAFAFA]">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="text-[13px] font-medium tracking-tight mt-3 group-hover:underline underline-offset-4 decoration-[#050505]/30">
                    {cat.label}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className={`${minimal.cn.container} ${minimal.cn.divider}`} />

      {/* ═══ SECTION 3: FEATURED PIECE ═══ */}
      <section className={minimal.cn.section}>
        <div className={`${minimal.cn.container} grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center`}>
          <ScrollReveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#FAFAFA]">
              <img src={heroProduct.images[0]} alt={heroProduct.name} className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>
          <div>
            <ScrollReveal>
              <span className={minimal.cn.label}>Featured Piece</span>
              <h2 className={`${minimal.cn.sectionHeadline} mt-3 mb-2`}>{heroProduct.name}</h2>
              <p className="text-sm text-[#6B6B6B] mb-6">{heroProduct.subtitle}</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className={`${minimal.cn.body} mb-8`}>{heroProduct.description}</p>
            </ScrollReveal>
            {heroProduct.diamondSpecs && (
              <ScrollReveal delay={120}>
                <div className="grid grid-cols-4 gap-3 mb-8">
                  {Object.entries(heroProduct.diamondSpecs).filter(([k]) => ['carat','cut','color','clarity'].includes(k)).map(([key, val]) => (
                    <div key={key} className="py-4 text-center border border-[#E5E5E5]">
                      <p className={minimal.cn.label}>{key}</p>
                      <p className="text-xl font-light text-[#050505] mt-1 tabular-nums">{val}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
            <ScrollReveal delay={160}>
              <p className="text-2xl font-light tabular-nums text-[#050505] mb-8">{heroProduct.priceDisplay}</p>
              <Link href={`/minimal/product/${heroProduct.slug}`} className={`${minimal.cn.btnPrimary} no-underline gap-2`}>
                Discover <ArrowRight size={14} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: BRAND STORY ═══ */}
      <section className="py-20 md:py-32 bg-[#050505]">
        <div className={`${minimal.cn.container} text-center`}>
          <ScrollReveal className="max-w-2xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#9B9B9B] block mb-10">Our Philosophy</span>
            <p className="text-xl md:text-3xl font-light text-white leading-relaxed tracking-tight">
              Crafted with obsession. Worn with intention. Every facet, every angle, every proportion is calculated to maximize brilliance while minimizing everything else.
            </p>
            <div className="w-10 h-px bg-[#6B6B6B] mx-auto mt-12 mb-6" />
            <p className="text-[11px] text-[#9B9B9B] tracking-[0.1em]">— Vault Maison, Est. 1974</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 5: COLLECTION GRID ═══ */}
      <section className={minimal.cn.section}>
        <div className={minimal.cn.container}>
          <ScrollReveal className="flex justify-between items-end mb-12">
            <div>
              <span className={minimal.cn.label}>Curated</span>
              <h2 className={`${minimal.cn.sectionHeadline} mt-3`}>Collections</h2>
            </div>
            <Link href="/minimal/collections" className={`${minimal.cn.btnSecondary} no-underline`}>
              View All
            </Link>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {collections.map((col, i) => (
              <ScrollReveal key={col.title} delay={i * 80}>
                <Link href={col.href} className="group block no-underline relative overflow-hidden" style={{ color: '#050505' }}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#FAFAFA]">
                    <img src={col.image} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 50%)' }} />
                    <div className="absolute bottom-6 left-6">
                      <span className="text-[11px] uppercase tracking-[0.15em] text-white/60 block mb-1">Collection</span>
                      <p className="text-lg font-medium text-white tracking-tight">{col.title}</p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className={`${minimal.cn.container} ${minimal.cn.divider}`} />

      {/* ═══ SECTION 6: TRUST METRICS ═══ */}
      <section className={minimal.cn.section}>
        <div className={minimal.cn.container}>
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { value: '50+', label: 'Years of expertise' },
                { value: '10,000+', label: 'Pieces crafted' },
                { value: '100%', label: 'GIA certified' },
                { value: '30-Day', label: 'Return policy' },
              ].map((stat) => (
                <div key={stat.label} className="py-8 text-center border border-[#E5E5E5]">
                  <p className="text-3xl md:text-4xl font-light text-[#050505] tabular-nums">{stat.value}</p>
                  <p className={`${minimal.cn.label} mt-2`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 6B: BESTSELLERS ═══ */}
      <section className={minimal.cn.section} style={{ paddingTop: 0 }}>
        <div className={minimal.cn.container}>
          <ScrollReveal className="mb-12">
            <span className={minimal.cn.label}>Most Loved</span>
            <h2 className={`${minimal.cn.sectionHeadline} mt-3`}>Bestsellers</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.map((p) => (
              <div key={p.id}>
                <MinimalProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`${minimal.cn.container} ${minimal.cn.divider}`} />

      {/* ═══ SECTION 7: NEW ARRIVALS CAROUSEL ═══ */}
      <section className={minimal.cn.section}>
        <div className={minimal.cn.container}>
          <ScrollReveal className="flex justify-between items-end mb-12">
            <div>
              <span className={minimal.cn.label}>Just In</span>
              <h2 className={`${minimal.cn.sectionHeadline} mt-3`}>New Arrivals</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 flex items-center justify-center border border-[#E5E5E5] bg-transparent cursor-pointer text-[#050505] hover:bg-[#050505] hover:text-white transition-colors duration-300"
                style={{ borderRadius: 0 }}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 flex items-center justify-center border border-[#E5E5E5] bg-transparent cursor-pointer text-[#050505] hover:bg-[#050505] hover:text-white transition-colors duration-300"
                style={{ borderRadius: 0 }}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </ScrollReveal>
          <div ref={emblaRef} className="overflow-hidden cursor-grab">
            <div className="flex gap-4 md:gap-6">
              {(newArrivals.length > 0 ? newArrivals : products.slice(0, 8)).map((p) => (
                <div key={p.id} className="flex-[0_0_calc(25%-14px)] min-w-[220px]">
                  <MinimalProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: NEWSLETTER ═══ */}
      <section className={`${minimal.cn.section} ${minimal.cn.divider}`}>
        <div className={`${minimal.cn.container} text-center`}>
          <ScrollReveal className="max-w-md mx-auto">
            <span className={minimal.cn.label}>Stay Connected</span>
            <h2 className={`${minimal.cn.sectionHeadline} mt-3 mb-3`}>Newsletter</h2>
            <p className={`${minimal.cn.body} mb-10`}>
              Receive early access to new collections and expert insights.
            </p>
            <div className="flex max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 h-12 px-4 border border-[#E5E5E5] border-r-0 bg-transparent text-sm text-[#050505] placeholder:text-[#9B9B9B] focus:outline-none focus:border-[#050505] transition-colors"
                style={{ borderRadius: 0 }}
              />
              <button
                className="h-12 px-6 bg-[#050505] text-white text-[11px] uppercase tracking-[0.15em] hover:bg-[#1a1a1a] transition-colors border-none cursor-pointer"
                style={{ borderRadius: 0 }}
              >
                Join
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Global Styles ── */}
      <style>{`
        /* Brutalist button — instant invert on hover */
        .vm-brutalist-btn:hover { background-color: #FFFFFF !important; color: #050505 !important; transition: none; }

        /* Brutalist hero responsive */
        @media (max-width: 1023px) {
          .vm-hero-split { height: auto !important; min-height: 100vh; }
        }
      `}</style>
    </MinimalLayout>
  )
}
