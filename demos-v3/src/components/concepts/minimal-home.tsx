'use client'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig, categoryLabels } from '@/data/concepts'
import { MinimalLayout } from './minimal/MinimalLayout'
import { MinimalProductCard } from './minimal/MinimalProductCard'
import {
  HeroFashion,
  TypewriterTitle,
  CardStack,
  CardFlip,
  GlassmorphismMetrics,
  SpotlightCards,
  SlideTextButton,
  ShimmerText,
} from './minimal/ui'
import { products } from '@/data/products'
import { Diamond, Ruler, Sparkles, Phone } from 'lucide-react'
import type { SpotlightItem } from './minimal/ui/SpotlightCards'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

/* ── Data for CardStack featured products ── */
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

/* ── Category images for CardFlip ── */
const categoryImages: Record<string, string> = {
  'diamond-rings': '/images/minimal-engagement-ring.jpg',
  'diamond-necklaces': '/images/minimal-necklace-heart.jpg',
  'diamond-earrings': '/images/minimal-diamond-studs.jpg',
  'gold-rings': '/images/minimal-ring-gold.jpg',
  'wedding-bridal': '/images/minimal-wedding-rings.jpg',
}

const categoryDescriptions: Record<string, string> = {
  'diamond-rings': 'Solitaires, halos, and bands crafted with precision-cut stones.',
  'diamond-necklaces': 'Pendants and chains that frame the collarbone with light.',
  'diamond-earrings': 'Studs, drops, and hoops that catch every angle.',
  'gold-rings': 'Bands and statement rings in 18K and 24K gold.',
  'wedding-bridal': 'Engagement rings, wedding bands, and bridal sets.',
}

/* ── Services for SpotlightCards ── */
const services: SpotlightItem[] = [
  {
    icon: Diamond,
    title: 'Bespoke Design',
    description: 'Commission a one-of-a-kind piece. From sketch to setting, we bring your vision to life.',
  },
  {
    icon: Ruler,
    title: 'Expert Sizing',
    description: 'Complimentary ring sizing and bracelet adjustment with every purchase.',
  },
  {
    icon: Sparkles,
    title: 'Lifetime Care',
    description: 'Free cleaning, inspection, and re-polishing for the life of your piece.',
  },
  {
    icon: Phone,
    title: 'Private Consultation',
    description: 'Book a one-on-one appointment with our gemologists. In-person or virtual.',
  },
]

/* ── Brand values ── */
const brandValues = [
  'We believe in the quiet power of precision.',
  'Every stone is hand-selected. Every setting is intentional.',
  'No excess. No decoration. Only the essential geometry of precious materials.',
  'Restraint is the ultimate luxury.',
]

const featuredCategories = ['diamond-rings', 'diamond-necklaces', 'diamond-earrings', 'gold-rings', 'wedding-bridal']
const featuredProducts = products.slice(0, 4)

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  return (
    <MinimalLayout>
      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HeroFashion — Editorial 2-col hero
      ═══════════════════════════════════════════════════════ */}
      <HeroFashion
        brandName="Vault Maison."
        season="COLLECTION 2025"
        description="Precision-cut diamonds and fine gold, presented without distraction. Each piece exists because it must — not because it can."
        heroImage="/images/minimal-ring-white.jpg"
        heroImageAlt="Diamond solitaire ring on white background"
        categories={[
          { label: 'Diamond Rings', href: '/minimal/category/diamond-rings' },
          { label: 'Necklaces & Pendants', href: '/minimal/category/diamond-necklaces' },
          { label: 'Earrings', href: '/minimal/category/diamond-earrings' },
          { label: 'Gold Collection', href: '/minimal/category/gold-rings' },
          { label: 'Wedding & Bridal', href: '/minimal/category/wedding-bridal' },
        ]}
        ctaHref="/minimal/collections"
        ctaLabel="View All Collections"
      />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: TypewriterTitle — Animated tagline
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 px-5 text-center border-t border-[#050505]/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#050505]/40 mb-6" style={{ fontFamily: font }}>
            Crafted for
          </p>
          <div className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-[#050505]" style={{ fontFamily: font }}>
            <TypewriterTitle
              sequences={[
                { text: 'Diamonds', deleteAfter: true },
                { text: 'Gold', deleteAfter: true },
                { text: 'Eternity', deleteAfter: true },
                { text: 'You', deleteAfter: true },
              ]}
              typingSpeed={70}
              deleteSpeed={40}
              pauseBeforeDelete={2000}
              loopDelay={600}
              className="text-4xl md:text-5xl lg:text-6xl"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: Shop by Category — CardFlip grid
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 px-5 border-t border-[#050505]/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#050505]/40 mb-3" style={{ fontFamily: font }}>
                Shop by Category
              </p>
              <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-[#050505]" style={{ fontFamily: font }}>
                Collections
              </h2>
            </div>
            <Link
              href="/minimal/collections"
              className="text-[11px] uppercase tracking-[0.2em] text-[#050505]/40 hover:text-[#050505] transition-colors"
              style={{ fontFamily: font }}
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredCategories.map((cat) => (
              <div key={cat}>
                <CardFlip
                  title={categoryLabels[cat as keyof typeof categoryLabels] || cat}
                  subtitle={`${products.filter(p => p.category === cat).length} pieces`}
                  description={categoryDescriptions[cat] || ''}
                  image={categoryImages[cat] || '/images/minimal-ring-white.jpg'}
                  href={`/minimal/category/${cat}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: Editorial Split — Featured Product
      ═══════════════════════════════════════════════════════ */}
      <section className="py-0 border-t border-[#050505]/5">
        <div className="grid md:grid-cols-2 min-h-[70vh]">
          <div className="relative aspect-square md:aspect-auto overflow-hidden bg-[#F5F5F5]">
            <Image
              src="/images/minimal-ring-white.jpg"
              alt="Celestial Solitaire Ring"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex items-center px-8 md:px-16 py-16">
            <div className="max-w-md">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#050505]/40 mb-4" style={{ fontFamily: font }}>
                Featured
              </p>
              <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-[#050505] mb-5 leading-tight" style={{ fontFamily: font }}>
                Celestial Solitaire
              </h2>
              <p className="text-sm text-[#050505]/60 leading-relaxed mb-8" style={{ fontFamily: font, fontWeight: 300 }}>
                A breathtaking solitaire featuring a 1.5-carat round brilliant diamond set in a cathedral 18K white gold mounting. The six-prong setting maximizes light return while the thin band draws all attention to the extraordinary center stone.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { label: 'Carat', value: '1.50ct' },
                  { label: 'Cut', value: 'Ideal' },
                  { label: 'Color', value: 'D' },
                  { label: 'Clarity', value: 'VVS1' },
                ].map((spec) => (
                  <div key={spec.label}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#050505]/35 mb-1" style={{ fontFamily: font }}>{spec.label}</p>
                    <p className="text-sm text-[#050505]" style={{ fontFamily: font, fontWeight: 300 }}>{spec.value}</p>
                  </div>
                ))}
              </div>
              <SlideTextButton
                text="View Details"
                hoverText="$12,500"
                href="/minimal/product/celestial-diamond-ring"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: Featured Products — CardStack
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 px-5 border-t border-[#050505]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#050505]/40 mb-3" style={{ fontFamily: font }}>
              Featured
            </p>
            <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-[#050505]" style={{ fontFamily: font }}>
              <ShimmerText text="The Celestial Collection" className="text-2xl md:text-3xl font-extralight" />
            </h2>
          </div>
          <CardStack products={heroProducts} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: Brand Manifesto
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 px-5 border-t border-[#050505]/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#050505]/40 mb-8" style={{ fontFamily: font }}>
            Our Philosophy
          </p>
          {brandValues.map((text, i) => (
            <p
              key={i}
              className="text-xl md:text-2xl lg:text-3xl font-extralight tracking-tight text-[#050505] leading-relaxed"
              style={{
                fontFamily: font,
                opacity: 1 - i * 0.15,
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: Trust Metrics — GlassmorphismMetrics
      ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-[#050505]/5">
        <GlassmorphismMetrics
          eyebrow="Our Promise"
          heading="Numbers that speak for themselves"
          subheading="Every diamond is hand-selected. Every setting is precision-crafted. Every client is a relationship, not a transaction."
          ctaText="Book a Consultation"
          ctaHref="/minimal/bespoke"
          ctaDescription="Private appointments available for bespoke commissions and collection viewings."
        />
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8: New Arrivals — Product Grid
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 px-5 border-t border-[#050505]/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#050505]/40 mb-3" style={{ fontFamily: font }}>
                New Arrivals
              </p>
              <h2 className="text-2xl font-extralight tracking-tight text-[#050505]" style={{ fontFamily: font }}>
                Recently Added
              </h2>
            </div>
            <Link
              href="/minimal/collections"
              className="text-[11px] uppercase tracking-[0.2em] text-[#050505]/40 hover:text-[#050505] transition-colors"
              style={{ fontFamily: font }}
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id}>
                <MinimalProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 9: Services — SpotlightCards
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 px-5 border-t border-[#050505]/5">
        <div className="max-w-7xl mx-auto">
          <SpotlightCards
            eyebrow="Services"
            heading="Beyond the Purchase"
            items={services}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 10: Newsletter / Final CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="py-24 px-5 border-t border-[#050505]/5 text-center">
        <div className="max-w-lg mx-auto">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#050505]/40 mb-4" style={{ fontFamily: font }}>
            Stay Informed
          </p>
          <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-[#050505] mb-4" style={{ fontFamily: font }}>
            Exclusive access to new collections
          </h2>
          <p className="text-sm text-[#050505]/50 mb-8 leading-relaxed" style={{ fontFamily: font, fontWeight: 300 }}>
            Be the first to discover new pieces, private events, and bespoke opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <SlideTextButton text="Our Story" hoverText="Learn More" href="/minimal/about" variant="ghost" />
            <SlideTextButton text="Contact Us" hoverText="Get in Touch" href="/minimal/contact" />
          </div>
        </div>
      </section>
    </MinimalLayout>
  )
}
