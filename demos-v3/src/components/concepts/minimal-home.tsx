'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Diamond, Shield, Gem, Clock } from 'lucide-react'
import { MinimalLayout } from './minimal/MinimalLayout'
import { products } from '@/data/products'
import { categoryLabels } from '@/data/concepts'
import type { ConceptConfig } from '@/data/concepts'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.6, delay: i * 0.1 },
})

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

/* ── Product Card ── */
function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <motion.div {...stagger(index)}>
      <Link href={`/minimal/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="vm-card-img" style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#F5F4F0', marginBottom: '16px', overflow: 'hidden' }}>
          <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover', transition: 'transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)' }} unoptimized />
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
    </motion.div>
  )
}

/* ── Section Heading ── */
function SectionHeading({ label, title, align = 'left', right }: { label: string; title: string; align?: 'left' | 'center'; right?: React.ReactNode }) {
  return (
    <motion.div {...fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', textAlign: align }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '12px' }}>{label}</p>
        <h2 style={{ fontFamily: font, fontSize: '28px', fontWeight: 200, color: '#1A1A1A', letterSpacing: '-0.01em' }}>{title}</h2>
      </div>
      {right}
    </motion.div>
  )
}

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  return (
    <MinimalLayout>
      {/* ═══ 1. HERO ═══ */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{ position: 'relative', height: '90vh', minHeight: '600px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/diamond-velvet-1.jpg" alt="Vault Maison" fill style={{ objectFit: 'cover' }} priority unoptimized />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,26,26,0.75) 0%, rgba(26,26,26,0.35) 50%, transparent 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, padding: '0 5vw', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '20px' }}>
            The Minimal Machine
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
            style={{ fontFamily: font, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 200, color: '#FFFFFF', lineHeight: 1.1, marginBottom: '24px', maxWidth: '600px' }}>
            Precision-Cut<br /><span style={{ color: '#C4A265' }}>Diamonds</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            style={{ fontFamily: font, fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.7)', maxWidth: '420px', marginBottom: '40px', lineHeight: 1.7 }}>
            Every stone is hand-selected by third-generation gemologists. GIA certified. Crafted to last generations.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/minimal/collections" className="vm-btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: font, fontSize: '12px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', backgroundColor: '#C4A265', padding: '14px 32px', textDecoration: 'none' }}>
              Shop Collection <ArrowRight size={14} />
            </Link>
            <Link href="/minimal/bespoke" className="vm-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: font, fontSize: '12px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.4)', padding: '14px 32px', textDecoration: 'none' }}>
              Bespoke Design
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ 2. SHOP BY CATEGORY ═══ */}
      <section style={{ padding: '100px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeading label="Explore" title="Shop by Category" align="center" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '32px' }}>
          {categories.map((cat, i) => (
            <motion.div key={cat.slug} {...stagger(i)}>
              <Link href={`/minimal/category/${cat.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', textAlign: 'center' }}>
                <div className="vm-card-img" style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', overflow: 'hidden', marginBottom: '14px', backgroundColor: '#F5F4F0' }}>
                  <Image src={cat.image} alt={cat.label} width={200} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)' }} unoptimized />
                </div>
                <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 400, color: '#1A1A1A', letterSpacing: '0.05em' }}>{cat.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ 3. FEATURED PRODUCT ═══ */}
      <section style={{ backgroundColor: '#F5F4F0' }}>
        <div className="vm-grid-2col" style={{ maxWidth: '1400px', margin: '0 auto', padding: '100px 5vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <motion.div {...fadeUp}>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
              <Image src={heroProduct.images[0]} alt={heroProduct.name} fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }}>
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
          </motion.div>
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
        <motion.div {...fadeUp} style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '32px' }}>Our Philosophy</p>
          <p style={{ fontFamily: font, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 200, color: '#FFFFFF', lineHeight: 1.6, marginBottom: '32px' }}>
            &ldquo;We believe in the quiet power of precision. Every facet, every angle, every proportion is calculated to maximize brilliance while minimizing everything else.&rdquo;
          </p>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#C4A265', margin: '0 auto 24px' }} />
          <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#9B9590', letterSpacing: '0.1em' }}>— Vault Maison, Est. 1974</p>
        </motion.div>
      </section>

      {/* ═══ 6. EDITORIAL CAMPAIGN ═══ */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '100px 5vw' }}>
        <SectionHeading label="Editorial" title="The Campaign" />
        <div className="vm-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <motion.div {...fadeUp}>
            <Link href="/minimal/category/diamond-necklaces" style={{ display: 'block', position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <Image src="/images/fine-jewelry-necklace.jpg" alt="Necklace editorial" fill style={{ objectFit: 'cover', transition: 'transform 600ms ease' }} className="vm-editorial-img" unoptimized />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '32px', left: '32px' }}>
                <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '8px' }}>Collection</p>
                <p style={{ fontFamily: font, fontSize: '22px', fontWeight: 200, color: '#FFFFFF' }}>Diamond Necklaces</p>
              </div>
            </Link>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }}>
            <Link href="/minimal/category/gold-rings" style={{ display: 'block', position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <Image src="/images/gold-diamond-jewelry.jpg" alt="Gold editorial" fill style={{ objectFit: 'cover', transition: 'transform 600ms ease' }} className="vm-editorial-img" unoptimized />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '32px', left: '32px' }}>
                <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '8px' }}>Collection</p>
                <p style={{ fontFamily: font, fontSize: '22px', fontWeight: 200, color: '#FFFFFF' }}>Gold Collection</p>
              </div>
            </Link>
          </motion.div>
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
            <motion.div key={i} {...stagger(i)}>
              <m.icon size={28} strokeWidth={1} style={{ color: '#C4A265', marginBottom: '12px', display: 'inline-block' }} />
              <p style={{ fontFamily: font, fontSize: '28px', fontWeight: 200, color: '#1A1A1A', marginBottom: '4px' }}>{m.value}</p>
              <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9590' }}>{m.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ 9. NEWSLETTER ═══ */}
      <section style={{ padding: '100px 5vw', textAlign: 'center' }}>
        <motion.div {...fadeUp} style={{ maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '16px' }}>Stay Connected</p>
          <h2 style={{ fontFamily: font, fontSize: '24px', fontWeight: 200, color: '#1A1A1A', marginBottom: '12px' }}>Join the Vault</h2>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590', marginBottom: '32px' }}>Receive early access to new collections, private events, and expert insights.</p>
          <div style={{ display: 'flex', gap: '0', maxWidth: '400px', margin: '0 auto' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, fontFamily: font, fontSize: '13px', fontWeight: 300, padding: '14px 16px', border: '1px solid #E8E5E0', borderRight: 'none', backgroundColor: 'transparent', color: '#1A1A1A', outline: 'none' }} />
            <button className="vm-btn-gold" style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px 24px', backgroundColor: '#C4A265', color: '#FFFFFF', border: '1px solid #C4A265', cursor: 'pointer' }}>Subscribe</button>
          </div>
        </motion.div>
      </section>

      {/* ── Hover CSS ── */}
      <style>{`
        .vm-card-img:hover img { transform: scale(1.04) !important; }
        .vm-card-img:hover { box-shadow: 0 4px 20px rgba(180, 170, 160, 0.12) !important; }
        .vm-editorial-img:hover { transform: scale(1.03) !important; }
        .vm-btn-gold:hover { background-color: #B3924F !important; }
        .vm-btn-outline:hover { border-color: #C4A265 !important; color: #C4A265 !important; }
        @media (max-width: 768px) {
          .vm-grid-2col { grid-template-columns: 1fr !important; }
          .vm-grid-products { grid-template-columns: repeat(2, 1fr) !important; }
          .vm-grid-metrics { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
