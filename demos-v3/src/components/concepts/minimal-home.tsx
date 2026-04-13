'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { type ConceptConfig } from '@/data/concepts'
import { MinimalLayout } from './minimal/MinimalLayout'
import { TypewriterTitle, SlideTextButton, CardStack } from './minimal/ui'
import { MinimalProductCard } from './minimal/MinimalProductCard'
import { products, formatPrice } from '@/data/products'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const heroProducts = [
  {
    id: 'celestial-diamond-ring',
    slug: 'celestial-diamond-ring',
    title: 'Celestial Solitaire',
    subtitle: '1.5ct Round Brilliant · 18K White Gold',
    price: '$12,500',
    image: '/images/minimal-ring-white.jpg',
    specs: [
      { label: 'Carat', value: '1.50' },
      { label: 'Cut', value: 'Ideal' },
      { label: 'Color', value: 'D' },
      { label: 'Clarity', value: 'VVS1' },
    ],
  },
  {
    id: 'aurora-pendant-necklace',
    slug: 'aurora-pendant-necklace',
    title: 'Aurora Pendant',
    subtitle: '0.75ct Pear · 18K White Gold',
    price: '$4,200',
    image: '/images/minimal-necklace-pendant.jpg',
    specs: [
      { label: 'Carat', value: '0.75' },
      { label: 'Cut', value: 'Excellent' },
      { label: 'Color', value: 'F' },
      { label: 'Clarity', value: 'VS1' },
    ],
  },
  {
    id: 'eternal-tennis-bracelet',
    slug: 'eternal-tennis-bracelet',
    title: 'Eternal Tennis Bracelet',
    subtitle: '5.0ct Total · 18K White Gold',
    price: '$12,800',
    image: '/images/minimal-tennis-bracelet.jpg',
    specs: [
      { label: 'Total', value: '5.00ct' },
      { label: 'Stones', value: '42' },
      { label: 'Color', value: 'F-G' },
      { label: 'Clarity', value: 'VS' },
    ],
  },
  {
    id: 'classic-diamond-studs',
    slug: 'classic-diamond-studs',
    title: 'Classic Diamond Studs',
    subtitle: '1.0ct Total · 18K White Gold',
    price: '$3,800',
    image: '/images/minimal-earrings-studs.jpg',
    specs: [
      { label: 'Total', value: '1.00ct' },
      { label: 'Cut', value: 'Ideal' },
      { label: 'Color', value: 'E' },
      { label: 'Clarity', value: 'VVS2' },
    ],
  },
]

const categoryHighlights = [
  { slug: 'diamond-rings', label: 'Diamond Rings', image: '/images/minimal-engagement-ring.jpg' },
  { slug: 'diamond-necklaces', label: 'Necklaces', image: '/images/minimal-necklace-heart.jpg' },
  { slug: 'gold-rings', label: 'Gold Rings', image: '/images/minimal-ring-gold.jpg' },
  { slug: 'diamond-earrings', label: 'Earrings', image: '/images/minimal-diamond-studs.jpg' },
]

// Get 4 featured products from the data
const featuredProducts = products.slice(0, 4)

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  return (
    <MinimalLayout>
      {/* ─── SECTION 1: Hero with TypewriterTitle ─── */}
      <section
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 5vw',
          position: 'relative',
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: font,
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#050505',
            opacity: 0.4,
            marginBottom: '24px',
          }}
        >
          Vault Maison
        </motion.p>

        <div style={{ fontSize: '48px', fontWeight: 200, letterSpacing: '0.04em' }} className="minimal-hero-typewriter">
          <TypewriterTitle
            sequences={[
              { text: 'Diamonds', deleteAfter: true },
              { text: 'Gold', deleteAfter: true },
              { text: 'Eternity', deleteAfter: true },
            ]}
            typingSpeed={70}
            deleteSpeed={40}
            pauseBeforeDelete={1800}
            loopDelay={800}
            className="text-4xl md:text-6xl"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            marginTop: '32px',
            maxWidth: '400px',
            textAlign: 'center',
            lineHeight: 1.8,
          }}
        >
          Nothing more than what matters. Precision-cut diamonds and fine gold, presented without distraction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          style={{ marginTop: '48px', display: 'flex', gap: '16px' }}
        >
          <SlideTextButton
            text="Collections"
            hoverText="View All"
            href="/minimal/collections"
          />
          <SlideTextButton
            text="Bespoke"
            hoverText="Custom Design"
            href="/minimal/bespoke"
            variant="ghost"
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 2.5 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '40px',
              backgroundColor: '#050505',
            }}
          />
        </motion.div>
      </section>

      {/* ─── SECTION 2: Editorial Split ─── */}
      <section style={{ padding: '0 5vw 80px' }} className="minimal-editorial-section">
        <div className="minimal-editorial-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
              <Image
                src="/images/minimal-ring-white.jpg"
                alt="Celestial Solitaire Ring"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ maxWidth: '440px' }}
          >
            <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', opacity: 0.4, marginBottom: '16px' }}>
              Featured
            </p>
            <h2 style={{ fontFamily: font, fontSize: '28px', fontWeight: 200, letterSpacing: '0.02em', color: '#050505', lineHeight: 1.3, marginBottom: '20px' }}>
              Celestial Solitaire
            </h2>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505', opacity: 0.6, lineHeight: 1.8, marginBottom: '32px' }}>
              A breathtaking solitaire featuring a 1.5-carat round brilliant diamond set in a cathedral 18K white gold mounting. The six-prong setting maximizes light return while the thin band draws all attention to the extraordinary center stone.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
              {[
                { label: 'Carat', value: '1.50ct' },
                { label: 'Cut', value: 'Ideal' },
                { label: 'Color', value: 'D' },
                { label: 'Clarity', value: 'VVS1' },
              ].map((spec) => (
                <div key={spec.label}>
                  <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', opacity: 0.35, marginBottom: '4px' }}>
                    {spec.label}
                  </p>
                  <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#050505' }}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
            <SlideTextButton
              text="View Details"
              hoverText="$12,500"
              href="/minimal/product/celestial-diamond-ring"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── SECTION 3: CardStack — Featured Products ─── */}
      <section style={{ padding: '80px 5vw', borderTop: '1px solid #E5E5E5' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', opacity: 0.4, marginBottom: '12px' }}>
            Curated Selection
          </p>
          <h2 style={{ fontFamily: font, fontSize: '24px', fontWeight: 200, letterSpacing: '0.02em', color: '#050505' }}>
            Four Essential Pieces
          </h2>
        </motion.div>

        <CardStack products={heroProducts} />
      </section>

      {/* ─── SECTION 4: Category Strip ─── */}
      <section style={{ padding: '80px 5vw', borderTop: '1px solid #E5E5E5' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '40px' }}
        >
          <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', opacity: 0.4, marginBottom: '12px' }}>
            Categories
          </p>
          <h2 style={{ fontFamily: font, fontSize: '24px', fontWeight: 200, letterSpacing: '0.02em', color: '#050505' }}>
            Browse by Type
          </h2>
        </motion.div>

        <div className="minimal-category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {categoryHighlights.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/minimal/category/${cat.slug}`}
                style={{ textDecoration: 'none', color: '#050505', display: 'block' }}
                className="minimal-cat-card"
              >
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                    unoptimized
                    className="minimal-cat-img"
                  />
                </div>
                <div style={{ padding: '16px 0' }}>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, letterSpacing: '0.02em', color: '#050505' }}>
                    {cat.label}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 5: New Arrivals Grid ─── */}
      <section style={{ padding: '80px 5vw', borderTop: '1px solid #E5E5E5' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}
        >
          <div>
            <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', opacity: 0.4, marginBottom: '12px' }}>
              New Arrivals
            </p>
            <h2 style={{ fontFamily: font, fontSize: '24px', fontWeight: 200, letterSpacing: '0.02em', color: '#050505' }}>
              Recently Added
            </h2>
          </div>
          <Link
            href="/minimal/collections"
            style={{ fontFamily: font, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#050505', opacity: 0.4, textDecoration: 'none' }}
          >
            View All →
          </Link>
        </motion.div>

        <div className="minimal-arrivals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <MinimalProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 6: Philosophy Statement ─── */}
      <section style={{ padding: '100px 5vw', borderTop: '1px solid #E5E5E5', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', opacity: 0.4, marginBottom: '24px' }}>
            Philosophy
          </p>
          <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, letterSpacing: '0.02em', color: '#050505', lineHeight: 1.4, marginBottom: '24px' }}>
            Restraint is the ultimate luxury
          </h2>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505', opacity: 0.5, lineHeight: 1.8, marginBottom: '48px' }}>
            We believe in the power of reduction. Every piece in our collection exists because it must — not because it can. No excess. No decoration. Only the essential geometry of precious materials, presented with absolute clarity.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <SlideTextButton text="Our Story" hoverText="Learn More" href="/minimal/about" variant="ghost" />
            <SlideTextButton text="Contact" hoverText="Get in Touch" href="/minimal/contact" variant="ghost" />
          </div>
        </motion.div>
      </section>

      <style>{`
        .minimal-hero-typewriter {
          font-weight: 200;
          letter-spacing: 0.04em;
        }
        .minimal-cat-card:hover .minimal-cat-img {
          transform: scale(1.03);
        }
        @media (max-width: 768px) {
          .minimal-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .minimal-category-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .minimal-arrivals-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .minimal-hero-typewriter {
            font-size: 32px !important;
          }
        }
      `}</style>
    </MinimalLayout>
  )
}
