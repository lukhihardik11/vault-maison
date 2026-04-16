'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { allCategories, categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'
import { ArrowRight } from 'lucide-react'
import { MINIMAL } from '../design-tokens'
import { ScrollReveal } from '../ScrollReveal'

const { colors, font } = MINIMAL

const categoryImages: Record<string, string> = {
  'diamond-rings': '/images/products/diamond-solitaire-ring.jpg',
  'diamond-necklaces': '/images/products/diamond-pendant-necklace.jpg',
  'diamond-earrings': '/images/products/classic-diamond-studs.jpg',
  'diamond-bracelets': '/images/products/diamond-tennis-bracelet.jpg',
  'gold-rings': '/images/products/gold-signet-ring.jpg',
  'gold-necklaces': '/images/products/gold-chain-necklace.jpg',
  'gold-earrings': '/images/products/gold-hoop-earrings.jpg',
  'gold-bracelets': '/images/products/gold-bangles-set.jpg',
  'loose-diamonds': '/images/products/loose-diamond-round.jpg',
  'wedding-bridal': '/images/products/classic-engagement-ring.jpg',
}

const categoryFeatures: Record<string, string[]> = {
  'diamond-rings': ['Solitaires', 'Halo Settings', 'Eternity Bands', 'Cocktail Rings'],
  'diamond-necklaces': ['Pendants', 'Chokers', 'Chains', 'Layered Designs'],
  'diamond-earrings': ['Studs', 'Drops', 'Hoops', 'Chandelier'],
  'diamond-bracelets': ['Tennis', 'Bangles', 'Cuffs', 'Chain Link'],
  'gold-rings': ['Signet', 'Bands', 'Statement', 'Stackable'],
  'gold-necklaces': ['Curb Chain', 'Layered', 'Pendant', 'Choker'],
  'gold-earrings': ['Hoops', 'Studs', 'Drops', 'Huggie'],
  'gold-bracelets': ['Bangles', 'Cuffs', 'Chain', 'Tennis'],
  'loose-diamonds': ['Round Brilliant', 'Oval', 'Emerald', 'Pear'],
  'wedding-bridal': ['Engagement', 'Wedding Bands', 'Bridal Sets', 'Anniversary'],
}

export function MinimalCollections() {
  return (
    <MinimalLayout>
      {/* Minimal header — no hero image, just typography */}
      <section style={{ padding: '60px 5vw 40px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.textSecondary, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
          <Link href="/minimal" style={{ color: colors.textSecondary, textDecoration: 'none' }} className="mn-underline-hover">Home</Link>
          <span>/</span>
          <span style={{ color: colors.text }}>Collections</span>
        </div>
        <ScrollReveal>
          <h1 style={{ fontFamily: font, fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 200, color: colors.text, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '16px' }}>
            Collections
          </h1>
          <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: colors.textSecondary, maxWidth: '520px', lineHeight: 1.7 }}>
            Ten curated categories spanning diamonds, gold, and bridal. Each piece crafted for timeless precision.
          </p>
        </ScrollReveal>
      </section>

      {/* Category Grid — 2 col on tablet, 3 on desktop */}
      <section style={{ padding: '0 5vw 80px', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="mn-coll-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {allCategories.map((cat: ProductCategory, idx: number) => {
            const count = getProductsByCategory(cat).length
            const features = categoryFeatures[cat] || []
            return (
              <ScrollReveal key={cat} delay={Math.min(idx * 60, 300)}>
                <Link href={`/minimal/category/${cat}`} className="group" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    {/* Image — no overlay, no gradient */}
                    <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: colors.hover }}>
                      <img
                        src={categoryImages[cat] || '/images/moody-jewelry-1.jpg'}
                        alt={categoryLabels[cat]}
                        className="group-hover:scale-[1.03]"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease-out' }}
                      />
                    </div>
                    {/* Info */}
                    <div style={{ padding: '16px 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                        <h3 className="mn-underline-hover" style={{ fontFamily: font, fontSize: '18px', fontWeight: 500, color: colors.text, letterSpacing: '-0.01em' }}>
                          {categoryLabels[cat]}
                        </h3>
                        <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: colors.textSecondary, fontVariantNumeric: 'tabular-nums' }}>
                          {count} {count === 1 ? 'piece' : 'pieces'}
                        </span>
                      </div>
                      <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, lineHeight: 1.6, color: colors.textSecondary, marginBottom: '12px' }}>
                        {categoryDescriptions[cat]}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        {features.map((f) => (
                          <span key={f} style={{ fontFamily: font, fontSize: '9px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.textSecondary, padding: '3px 8px', border: `1px solid ${colors.border}` }}>{f}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: colors.text }}>
                        Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      <style>{`
        @media (min-width: 1024px) { .mn-coll-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 640px) { .mn-coll-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </MinimalLayout>
  )
}
