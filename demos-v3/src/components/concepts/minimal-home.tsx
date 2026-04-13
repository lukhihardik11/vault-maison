'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Diamond, Shield, Gem, Clock } from 'lucide-react'
import { MinimalLayout } from './minimal/MinimalLayout'
import { products } from '@/data/products'
import type { ConceptConfig } from '@/data/concepts'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4)
const newArrivals = products.filter((p) => p.isNew).slice(0, 4)
const heroProduct = products[0]

const categories = [
  { slug: 'diamond-rings', label: 'Diamond Rings', image: '/images/minimal-engagement-ring.jpg' },
  { slug: 'diamond-necklaces', label: 'Necklaces', image: '/images/minimal-necklace-pendant.jpg' },
  { slug: 'diamond-earrings', label: 'Earrings', image: '/images/minimal-diamond-studs.jpg' },
  { slug: 'diamond-bracelets', label: 'Bracelets', image: '/images/minimal-tennis-bracelet.jpg' },
  { slug: 'gold-rings', label: 'Gold Rings', image: '/images/minimal-ring-gold.jpg' },
  { slug: 'gold-necklaces', label: 'Gold Chains', image: '/images/minimal-gold-chain.jpg' },
  { slug: 'gold-earrings', label: 'Gold Earrings', image: '/images/minimal-earrings-studs.jpg' },
  { slug: 'loose-diamonds', label: 'Loose Diamonds', image: '/images/minimal-loose-diamond.jpg' },
]

/* ── Fade-in on scroll hook ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('vm-visible'); observer.unobserve(el) } },
      { threshold: 0.1, rootMargin: '-30px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function FadeIn({ children, className = '', delay = 0, style = {} }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useFadeIn()
  return (
    <div ref={ref} className={`vm-fade ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ── Product Card ── */
function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <FadeIn delay={index * 100}>
      <Link href={`/minimal/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="vm-card-img" style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#F5F4F0', marginBottom: '16px', overflow: 'hidden' }}>
          <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)' }} />
          {product.isNew && (
            <span style={{ position: 'absolute', top: '12px', left: '12px', fontFamily: font, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4A265', backgroundColor: 'rgba(250,250,248,0.92)', padding: '4px 10px', backdropFilter: 'blur(4px)' }}>New</span>
          )}
          {product.isBestseller && !product.isNew && (
            <span style={{ position: 'absolute', top: '12px', left: '12px', fontFamily: font, fontSize: '9px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A1A', backgroundColor: 'rgba(250,250,248,0.92)', padding: '4px 10px', backdropFilter: 'blur(4px)' }}>Bestseller</span>
          )}
        </div>
        <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A', marginBottom: '4px' }}>{product.name}</p>
        <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9590', marginBottom: '6px' }}>{product.subtitle}</p>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{product.priceDisplay}</p>
      </Link>
    </FadeIn>
  )
}

/* ── Section Heading ── */
function SectionHeading({ label, title, align = 'left', right }: { label: string; title: string; align?: 'left' | 'center'; right?: React.ReactNode }) {
  return (
    <FadeIn style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', textAlign: align }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>{label}</p>
        <h2 style={{ fontFamily: font, fontSize: '28px', fontWeight: 200, color: '#1A1A1A', letterSpacing: '-0.01em' }}>{title}</h2>
      </div>
      {right}
    </FadeIn>
  )
}

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  return (
    <MinimalLayout>
      {/* ═══ 1. HERO ═══ */}
      <section className="vm-hero-animate" style={{ position: 'relative', height: '90vh', minHeight: '600px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/images/moody-jewelry-1.jpg" alt="Vault Maison" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,26,26,0.78) 0%, rgba(26,26,26,0.4) 50%, transparent 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, padding: '0 5vw', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <p className="vm-hero-text" style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '20px', animationDelay: '0.3s' }}>
            The Minimal Machine
          </p>
          <h1 className="vm-hero-text" style={{ fontFamily: font, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 200, color: '#FFFFFF', lineHeight: 1.1, marginBottom: '24px', maxWidth: '600px', animationDelay: '0.5s' }}>
            Precision-Cut<br /><span style={{ color: '#C4A265' }}>Diamonds</span>
          </h1>
          <p className="vm-hero-text" style={{ fontFamily: font, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.7)', maxWidth: '420px', marginBottom: '40px', lineHeight: 1.7, animationDelay: '0.7s' }}>
            Every stone is hand-selected by third-generation gemologists. GIA certified. Crafted to last generations.
          </p>
          <div className="vm-hero-text" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', animationDelay: '0.9s' }}>
            <Link href="/minimal/collections" className="vm-btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: font, fontSize: '12px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: '#C4A265', padding: '14px 32px', textDecoration: 'none' }}>
              Shop Collection <ArrowRight size={14} />
            </Link>
            <Link href="/minimal/bespoke" className="vm-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: font, fontSize: '12px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.4)', padding: '14px 32px', textDecoration: 'none' }}>
              Bespoke Design
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 2. SHOP BY CATEGORY ═══ */}
      <section style={{ padding: '100px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeading label="Explore" title="Shop by Category" align="center" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '32px' }}>
          {categories.map((cat, i) => (
            <FadeIn key={cat.slug} delay={i * 80}>
              <Link href={`/minimal/category/${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', textAlign: 'center' }}>
                <div className="vm-card-img" style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', overflow: 'hidden', marginBottom: '14px', backgroundColor: '#F5F4F0' }}>
                  <img src={cat.image} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)' }} />
                </div>
                <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, color: '#1A1A1A', letterSpacing: '0.05em' }}>{cat.label}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ 3. FEATURED PRODUCT ═══ */}
      <section style={{ backgroundColor: '#F5F4F0' }}>
        <div className="vm-grid-2col" style={{ maxWidth: '1400px', margin: '0 auto', padding: '100px 5vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <FadeIn>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
              <img src={heroProduct.images[0]} alt={heroProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '16px' }}>Featured Piece</p>
            <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#1A1A1A', marginBottom: '12px' }}>{heroProduct.name}</h2>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590', marginBottom: '24px' }}>{heroProduct.subtitle}</p>
            <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.8, marginBottom: '32px' }}>{heroProduct.description}</p>
            {heroProduct.diamondSpecs && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {Object.entries(heroProduct.diamondSpecs).filter(([k]) => ['carat','cut','color','clarity'].includes(k)).map(([key, val]) => (
                  <div key={key}>
                    <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B9590', marginBottom: '4px' }}>{key}</p>
                    <p style={{ fontFamily: font, fontSize: '18px', fontWeight: 300, color: '#1A1A1A' }}>{val}</p>
                  </div>
                ))}
              </div>
            )}
            <p style={{ fontFamily: font, fontSize: '24px', fontWeight: 300, color: '#1A1A1A', marginBottom: '32px' }}>{heroProduct.priceDisplay}</p>
            <Link href={`/minimal/product/${heroProduct.slug}`} className="vm-btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: font, fontSize: '12px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: '#C4A265', padding: '14px 32px', textDecoration: 'none' }}>
              View Details <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 4. BESTSELLERS ═══ */}
      <section style={{ padding: '100px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeading label="Most Loved" title="Bestsellers" right={
          <Link href="/minimal/collections" style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B9590', textDecoration: 'none' }}>View All →</Link>
        } />
        <div className="vm-grid-products" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* ═══ 5. BRAND MANIFESTO ═══ */}
      <section style={{ padding: '120px 5vw', backgroundColor: '#1A1A1A', textAlign: 'center' }}>
        <FadeIn style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '32px' }}>Our Philosophy</p>
          <p style={{ fontFamily: font, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 200, color: '#FFFFFF', lineHeight: 1.6, marginBottom: '32px' }}>
            &ldquo;We believe in the quiet power of precision. Every facet, every angle, every proportion is calculated to maximize brilliance while minimizing everything else.&rdquo;
          </p>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#C4A265', margin: '0 auto 24px' }} />
          <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#9B9590', letterSpacing: '0.1em' }}>— Vault Maison, Est. 1974</p>
        </FadeIn>
      </section>

      {/* ═══ 6. EDITORIAL CAMPAIGN ═══ */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '100px 5vw' }}>
        <SectionHeading label="Editorial" title="The Campaign" />
        <div className="vm-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <FadeIn>
            <Link href="/minimal/category/diamond-necklaces" style={{ display: 'block', position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img src="/images/moody-jewelry-2.jpg" alt="Necklace editorial" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms ease' }} className="vm-editorial-img" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '32px', left: '32px' }}>
                <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '8px' }}>Collection</p>
                <p style={{ fontFamily: font, fontSize: '22px', fontWeight: 200, color: '#FFFFFF' }}>Diamond Necklaces</p>
              </div>
            </Link>
          </FadeIn>
          <FadeIn delay={120}>
            <Link href="/minimal/category/gold-rings" style={{ display: 'block', position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img src="/images/gold-jewelry-collection.jpg" alt="Gold editorial" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms ease' }} className="vm-editorial-img" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '32px', left: '32px' }}>
                <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '8px' }}>Collection</p>
                <p style={{ fontFamily: font, fontSize: '22px', fontWeight: 200, color: '#FFFFFF' }}>Gold Collection</p>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ 7. NEW ARRIVALS ═══ */}
      <section style={{ padding: '0 5vw 100px', maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeading label="Just In" title="New Arrivals" right={
          <Link href="/minimal/collections" style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B9590', textDecoration: 'none' }}>View All →</Link>
        } />
        <div className="vm-grid-products" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {(newArrivals.length > 0 ? newArrivals : products.slice(4, 8)).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* ═══ 8. TRUST METRICS ═══ */}
      <section style={{ padding: '80px 5vw', borderTop: '1px solid #E8E5E0', borderBottom: '1px solid #E8E5E0' }}>
        <div className="vm-grid-metrics" style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
          {[
            { icon: Diamond, value: '1,000+', label: 'Certified Diamonds' },
            { icon: Shield, value: 'GIA', label: 'Every Stone Certified' },
            { icon: Gem, value: '50+', label: 'Years of Expertise' },
            { icon: Clock, value: 'Lifetime', label: 'Warranty Included' },
          ].map((m, i) => (
            <FadeIn key={i} delay={i * 100}>
              <m.icon size={28} strokeWidth={1} style={{ color: '#C4A265', marginBottom: '12px', display: 'inline-block' }} />
              <p style={{ fontFamily: font, fontSize: '28px', fontWeight: 200, color: '#1A1A1A', marginBottom: '4px' }}>{m.value}</p>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9590' }}>{m.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ 9. NEWSLETTER ═══ */}
      <section style={{ padding: '100px 5vw', textAlign: 'center' }}>
        <FadeIn style={{ maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '16px' }}>Stay Connected</p>
          <h2 style={{ fontFamily: font, fontSize: '24px', fontWeight: 200, color: '#1A1A1A', marginBottom: '12px' }}>Join the Vault</h2>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590', marginBottom: '32px' }}>Receive early access to new collections, private events, and expert insights.</p>
          <div style={{ display: 'flex', gap: '0', maxWidth: '400px', margin: '0 auto' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, fontFamily: font, fontSize: '13px', fontWeight: 300, padding: '14px 16px', border: '1px solid #E8E5E0', borderRight: 'none', backgroundColor: 'transparent', color: '#1A1A1A', outline: 'none' }} />
            <button className="vm-btn-gold" style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 24px', backgroundColor: '#C4A265', color: '#FFFFFF', border: '1px solid #C4A265', cursor: 'pointer' }}>Subscribe</button>
          </div>
        </FadeIn>
      </section>

      {/* ── CSS Animations ── */}
      <style>{`
        /* Fade-in on scroll */
        .vm-fade {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .vm-fade.vm-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hero entrance */
        .vm-hero-animate {
          animation: vmHeroFade 1.2s ease forwards;
        }
        @keyframes vmHeroFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .vm-hero-text {
          opacity: 0;
          transform: translateY(20px);
          animation: vmHeroText 0.8s ease forwards;
        }
        @keyframes vmHeroText {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Hover effects */
        .vm-card-img:hover img { transform: scale(1.04) !important; }
        .vm-card-img:hover { box-shadow: 0 4px 20px rgba(180, 170, 160, 0.12) !important; }
        .vm-editorial-img:hover { transform: scale(1.03) !important; }
        .vm-btn-gold:hover { background-color: #B3924F !important; }
        .vm-btn-outline:hover { border-color: #C4A265 !important; color: #C4A265 !important; }

        /* Responsive */
        @media (max-width: 768px) {
          .vm-grid-2col { grid-template-columns: 1fr !important; }
          .vm-grid-products { grid-template-columns: repeat(2, 1fr) !important; }
          .vm-grid-metrics { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
