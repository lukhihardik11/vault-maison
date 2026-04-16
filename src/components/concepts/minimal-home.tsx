'use client'

import { useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { MinimalLayout } from './minimal/MinimalLayout'
import { products } from '@/data/products'
import { GlassmorphismMetrics, CardFlip, SpotlightCards, ProductBounceCard, AnimatedSendButton, AnimatedSocialIcons, ExploreButton } from './minimal/ui'
import type { ConceptConfig } from '@/data/concepts'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4)
const newArrivals = products.filter((p) => p.isNew).slice(0, 8)
const heroProduct = products[0]

const categories = [
  { slug: 'diamond-rings', label: 'Rings', image: '/images/minimal-engagement-ring.jpg', desc: 'Handcrafted diamond rings' },
  { slug: 'diamond-necklaces', label: 'Necklaces', image: '/images/minimal-necklace-pendant.jpg', desc: 'Elegant pendant necklaces' },
  { slug: 'diamond-earrings', label: 'Earrings', image: '/images/minimal-diamond-studs.jpg', desc: 'Diamond stud earrings' },
  { slug: 'diamond-bracelets', label: 'Bracelets', image: '/images/minimal-tennis-bracelet.jpg', desc: 'Tennis bracelets' },
  { slug: 'loose-diamonds', label: 'Diamonds', image: '/images/minimal-loose-diamond.jpg', desc: 'Certified loose diamonds' },
]

const collections = [
  { title: 'Engagement Rings', image: '/images/minimal-engagement-ring.jpg', href: '/minimal/category/diamond-rings' },
  { title: 'Gold Collection', image: '/images/gold-jewelry-collection.jpg', href: '/minimal/category/gold-rings' },
  { title: 'Diamond Necklaces', image: '/images/minimal-necklace-pendant.jpg', href: '/minimal/category/diamond-necklaces' },
  { title: 'Bridal', image: '/images/minimal-wedding-rings.jpg', href: '/minimal/category/wedding-bridal' },
  { title: 'Earrings', image: '/images/minimal-chandelier-earrings.jpg', href: '/minimal/category/diamond-earrings' },
  { title: 'Bracelets', image: '/images/minimal-tennis-bracelet.jpg', href: '/minimal/category/diamond-bracelets' },
]

/* ── Scroll-triggered fade-in ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('vm-visible'); observer.unobserve(el) } },
      { threshold: 0.08, rootMargin: '-20px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function FadeIn({ children, className = '', delay = 0, style = {} }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useFadeIn()
  return <div ref={ref} className={`vm-fade ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>{children}</div>
}

/* ── Parallax Image ── */
function ParallaxImage({ src, alt, speed = 0.3 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const y = (rect.top - window.innerHeight / 2) * speed
      ref.current.style.transform = `translateY(${y}px) scale(1.15)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])
  return (
    <div style={{ position: 'absolute', inset: '-15%', willChange: 'transform' }} ref={ref}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

/* ── Word-by-word scroll reveal ── */
function ScrollRevealText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('.sr-word')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        words.forEach((w, i) => {
          setTimeout(() => (w as HTMLElement).style.opacity = '1', i * 80)
        })
        observer.unobserve(el)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="sr-word" style={{ opacity: 0.15, transition: 'opacity 0.5s ease', display: 'inline-block', marginRight: '0.3em' }}>
          {word}
        </span>
      ))}
    </div>
  )
}

/* ── Product Card ── */
function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <FadeIn delay={index * 100}>
      <Link href={`/minimal/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="vm-card-img" style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#F5F4F0', marginBottom: '16px', overflow: 'hidden', borderRadius: '8px' }}>
          <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)' }} />
          {product.isNew && (
            <span className="vm-glass-badge" style={{ position: 'absolute', top: '12px', left: '12px', fontFamily: font, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4A265', padding: '4px 10px' }}>New</span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="vm-glass-badge" style={{ position: 'absolute', top: '12px', left: '12px', fontFamily: font, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A1A', padding: '4px 10px' }}>Bestseller</span>
          )}
        </div>
        <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A', marginBottom: '4px' }}>{product.name}</p>
        <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9590', marginBottom: '6px' }}>{product.subtitle}</p>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{product.priceDisplay}</p>
      </Link>
    </FadeIn>
  )
}

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  // Embla carousel for new arrivals
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  )
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <MinimalLayout>
      {/* ═══ SECTION 1: HERO (brutalist split-screen) ═══ */}
      <section className="vm-hero-split" style={{ position: 'relative', height: '100vh', minHeight: '600px', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
        {/* Left panel — text content */}
        <div className="vm-hero-left" style={{ width: '55%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', padding: '0 5vw' }}>
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ fontFamily: font, fontSize: 'clamp(48px, 8vw, 120px)', fontWeight: 200, color: '#050505', lineHeight: 0.95, letterSpacing: '-0.04em', margin: 0, textAlign: 'left' }}>
              PRECISION.<br />NOTHING MORE.
            </h1>
            <div style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505' }}>01 — GIA CERTIFIED</span>
              <span style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505' }}>02 — FLAWLESS CLARITY</span>
              <span style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505' }}>03 — EXACTING CUT</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '48px', flexWrap: 'wrap' }}>
              <Link href="/minimal/collections" className="vm-hero-btn-primary" style={{ display: 'inline-block', fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: '#050505', padding: '18px 48px', textDecoration: 'none', border: '1px solid #050505', borderRadius: 0 }}>
                SHOP COLLECTION
              </Link>
              <Link href="/minimal/bespoke" className="vm-hero-btn-secondary" style={{ display: 'inline-block', fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', backgroundColor: 'transparent', padding: '18px 48px', textDecoration: 'none', border: '1px solid #050505', borderRadius: 0 }}>
                BESPOKE
              </Link>
            </div>
          </div>
        </div>
        {/* Right panel — product image */}
        <div className="vm-hero-right" style={{ width: '45%', position: 'relative' }}>
          <img src="/images/minimal-diamond-stone.jpg" alt="Precision diamond" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </section>

      {/* ═══ SECTION 2: CATEGORY SHOWCASE (CardFlip) ═══ */}
      <section style={{ padding: '120px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '16px' }}>Explore</p>
          <h2 style={{ fontFamily: font, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 200, color: '#1A1A1A' }}>Shop by Category</h2>
        </FadeIn>
        <div className="vm-cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {categories.map((cat, i) => (
            <FadeIn key={cat.slug} delay={i * 100}>
              <CardFlip
                title={cat.label}
                subtitle={cat.desc}
                description={`Explore our curated ${cat.label.toLowerCase()} collection`}
                image={cat.image}
                href={`/minimal/category/${cat.slug}`}
                features={['GIA Certified', 'Free Shipping', 'Lifetime Warranty']}
              />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 3: FEATURED PIECE (sticky parallax + ProductBounceCard) ═══ */}
      <section style={{ backgroundColor: '#F5F4F0', position: 'relative', overflow: 'hidden' }}>
        <div className="vm-featured-grid" style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 5vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <FadeIn>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEAE5' }}>
              <ProductBounceCard imageUrl={heroProduct.images[0]} alt={heroProduct.name} />
            </div>
          </FadeIn>
          <div>
            <FadeIn>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '20px' }}>Featured Piece</p>
              <h2 style={{ fontFamily: font, fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 200, color: '#1A1A1A', marginBottom: '12px' }}>{heroProduct.name}</h2>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590', marginBottom: '28px' }}>{heroProduct.subtitle}</p>
            </FadeIn>
            <FadeIn delay={100}>
              <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#555', lineHeight: 1.8, marginBottom: '36px' }}>{heroProduct.description}</p>
            </FadeIn>
            {heroProduct.diamondSpecs && (
              <FadeIn delay={200}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '36px' }}>
                  {Object.entries(heroProduct.diamondSpecs).filter(([k]) => ['carat','cut','color','clarity'].includes(k)).map(([key, val], i) => (
                    <div key={key} className="vm-neumorph-card" style={{ padding: '16px 12px', textAlign: 'center' }}>
                      <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B9590', marginBottom: '6px' }}>{key}</p>
                      <p style={{ fontFamily: font, fontSize: '20px', fontWeight: 300, color: '#1A1A1A' }}>{val}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
            <FadeIn delay={300}>
              <p style={{ fontFamily: font, fontSize: '28px', fontWeight: 300, color: '#1A1A1A', marginBottom: '36px' }}>{heroProduct.priceDisplay}</p>
              <Link href={`/minimal/product/${heroProduct.slug}`} className="vm-btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: font, fontSize: '12px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: '#C4A265', padding: '16px 36px', textDecoration: 'none', borderRadius: '2px' }}>
                Discover <ArrowRight size={14} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: BRAND STORY (kinetic typography) ═══ */}
      <section style={{ padding: '160px 5vw', backgroundColor: '#1A1A1A', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Floating parallax images behind text */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '200px', height: '260px', opacity: 0.08 }}>
          <ParallaxImage src="/images/diamond-facets-1.jpg" alt="" speed={0.2} />
        </div>
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '180px', height: '240px', opacity: 0.08 }}>
          <ParallaxImage src="/images/diamond-bokeh-1.jpg" alt="" speed={0.25} />
        </div>
        <FadeIn style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '40px' }}>Our Philosophy</p>
          <ScrollRevealText
            text="Crafted with obsession. Worn with intention. Every facet, every angle, every proportion is calculated to maximize brilliance while minimizing everything else."
            className="vm-brand-text"
          />
          <div style={{ width: '40px', height: '1px', backgroundColor: '#C4A265', margin: '48px auto 24px' }} />
          <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#9B9590', letterSpacing: '0.1em' }}>— Vault Maison, Est. 1974</p>
        </FadeIn>
      </section>

      {/* ═══ SECTION 5: COLLECTION GRID (stagger) ═══ */}
      <section style={{ padding: '120px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <FadeIn style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px' }}>
          <div>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>Curated</p>
            <h2 style={{ fontFamily: font, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 200, color: '#1A1A1A' }}>Collections</h2>
          </div>
          <ExploreButton text="View All" href="/minimal/collections" />
        </FadeIn>
        <div className="vm-coll-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {collections.map((col, i) => (
            <FadeIn key={col.title} delay={i * 120}>
              <Link href={col.href} style={{ display: 'block', position: 'relative', aspectRatio: i < 2 ? '3/4' : '4/3', overflow: 'hidden', borderRadius: '8px', textDecoration: 'none' }} className="vm-coll-card">
                <img src={col.image} alt={col.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 700ms cubic-bezier(0.25,0.46,0.45,0.94)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: '28px', left: '28px' }}>
                  <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '8px' }}>Collection</p>
                  <p style={{ fontFamily: font, fontSize: '20px', fontWeight: 200, color: '#FFFFFF' }}>{col.title}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 6: TRUST & CRAFTSMANSHIP (GlassmorphismMetrics) ═══ */}
      <section style={{ padding: '120px 5vw', background: 'linear-gradient(180deg, #F5F4F0 0%, #FAFAF8 100%)' }}>
        <FadeIn>
          <GlassmorphismMetrics />
        </FadeIn>
      </section>

      {/* ═══ SECTION 6B: SPOTLIGHT BESTSELLERS (SpotlightCards) ═══ */}
      <section style={{ padding: '80px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>Most Loved</p>
          <h2 style={{ fontFamily: font, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 200, color: '#1A1A1A' }}>Bestsellers</h2>
        </FadeIn>
        <SpotlightCards
          items={bestsellers.map((p) => ({
            title: p.name,
            description: `${p.subtitle} — ${p.priceDisplay}`,
            image: p.images[0],
            href: `/minimal/product/${p.slug}`,
          }))}
        />
      </section>

      {/* ═══ SECTION 7: NEW ARRIVALS CAROUSEL (Embla) ═══ */}
      <section style={{ padding: '120px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <FadeIn style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px' }}>
          <div>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>Just In</p>
            <h2 style={{ fontFamily: font, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 200, color: '#1A1A1A' }}>New Arrivals</h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={scrollPrev} className="vm-carousel-btn" aria-label="Previous"><ChevronLeft size={18} /></button>
            <button onClick={scrollNext} className="vm-carousel-btn" aria-label="Next"><ChevronRight size={18} /></button>
          </div>
        </FadeIn>
        <div ref={emblaRef} style={{ overflow: 'hidden', cursor: 'grab' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {(newArrivals.length > 0 ? newArrivals : products.slice(0, 8)).map((p) => (
              <div key={p.id} style={{ flex: '0 0 calc(25% - 18px)', minWidth: '220px' }}>
                <Link href={`/minimal/product/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="vm-card-img" style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#F5F4F0', marginBottom: '14px', overflow: 'hidden', borderRadius: '8px' }}>
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms ease' }} />
                    {p.isNew && <span className="vm-glass-badge" style={{ position: 'absolute', top: '10px', left: '10px', fontFamily: font, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4A265', padding: '4px 10px' }}>New</span>}
                  </div>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A', marginBottom: '4px' }}>{p.name}</p>
                  <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9590', marginBottom: '6px' }}>{p.subtitle}</p>
                  <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{p.priceDisplay}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: NEWSLETTER + CTA (AnimatedSendButton) ═══ */}
      <section style={{ padding: '120px 5vw', textAlign: 'center', borderTop: '1px solid #E8E5E0' }}>
        <FadeIn style={{ maxWidth: '520px', margin: '0 auto' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '20px' }}>Stay Connected</p>
          <h2 style={{ fontFamily: font, fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 200, color: '#1A1A1A', marginBottom: '12px' }}>Join the Maison</h2>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590', marginBottom: '40px', lineHeight: 1.7 }}>Receive early access to new collections, private events, and expert insights.</p>
          <div style={{ display: 'flex', gap: '0', maxWidth: '420px', margin: '0 auto', alignItems: 'stretch' }}>
            <input type="email" placeholder="Your email address" className="vm-neumorph-input" style={{ flex: 1, fontFamily: font, fontSize: '13px', fontWeight: 300, padding: '16px 18px', border: '1px solid #E8E5E0', borderRight: 'none', backgroundColor: '#F5F3F0', color: '#1A1A1A', outline: 'none', borderRadius: '8px 0 0 8px' }} />
            <AnimatedSendButton text="Subscribe" sentText="Subscribed!" />
          </div>
          {/* Social icons */}
          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
            <AnimatedSocialIcons />
          </div>
        </FadeIn>
      </section>

      {/* ── Global Styles ── */}
      <style>{`
        /* Fade-in on scroll */
        .vm-fade { opacity: 0; transform: translateY(28px); transition: opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94); }
        .vm-fade.vm-visible { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) { .vm-fade { opacity: 1 !important; transform: none !important; transition: none !important; } }

        /* Hero button hovers — instant, no transition */
        .vm-hero-btn-primary:hover { background-color: #FFFFFF !important; color: #050505 !important; border: 1px solid #050505 !important; }
        .vm-hero-btn-secondary:hover { background-color: #050505 !important; color: #FFFFFF !important; }

        /* Brand story text */
        .vm-brand-text { font-family: ${font}; font-size: clamp(22px, 3vw, 32px); font-weight: 200; color: #FFFFFF; line-height: 1.7; }

        /* Glassmorphism badge */
        .vm-glass-badge { background: rgba(250,250,248,0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.3); border-radius: 2px; }

        /* Neumorphism cards */
        .vm-neumorph-card { background: #F5F3F0; border-radius: 12px; box-shadow: 4px 4px 8px #d4d0cb, -4px -4px 8px #ffffff; }
        .vm-neumorph-input { box-shadow: inset 2px 2px 4px #d4d0cb, inset -2px -2px 4px #ffffff; }
        .vm-neumorph-input:focus { box-shadow: inset 2px 2px 4px #d4d0cb, inset -2px -2px 4px #ffffff, 0 0 0 2px rgba(196,162,101,0.3) !important; }

        /* Hover effects */
        .vm-card-img:hover img { transform: scale(1.05) !important; }
        .vm-card-img:hover { box-shadow: 0 8px 30px rgba(180,170,160,0.15) !important; }
        .vm-coll-card:hover img { transform: scale(1.05) !important; }
        .vm-btn-gold:hover { background-color: #B3924F !important; }

        /* Carousel buttons */
        .vm-carousel-btn { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid #E8E5E0; background: #F5F3F0; border-radius: 50%; cursor: pointer; color: #1A1A1A; box-shadow: 3px 3px 6px #d4d0cb, -3px -3px 6px #ffffff; transition: all 200ms ease; }
        .vm-carousel-btn:hover { box-shadow: 1px 1px 3px #d4d0cb, -1px -1px 3px #ffffff; color: #C4A265; }
        .vm-carousel-btn:active { box-shadow: inset 2px 2px 4px #d4d0cb, inset -2px -2px 4px #ffffff; transform: scale(0.97); }

        /* Micro-interactions */
        button:active { transform: scale(0.97); }
        a[class*="vm-btn"]:active { transform: scale(0.97); }

        /* Responsive */
        @media (max-width: 1024px) {
          .vm-cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .vm-featured-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 768px) {
          .vm-cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .vm-coll-grid { grid-template-columns: 1fr 1fr !important; }
          .vm-hero-split { flex-direction: column !important; height: auto !important; }
          .vm-hero-right { width: 100% !important; height: 40vh !important; order: -1; }
          .vm-hero-left { width: 100% !important; padding: 48px 5vw !important; }
        }
        @media (max-width: 480px) {
          .vm-cat-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
