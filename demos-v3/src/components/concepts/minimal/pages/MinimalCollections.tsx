'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { allCategories, categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'
import { ArrowRight } from 'lucide-react'
import MinimalHeroSection from '../ui/MinimalHeroSection'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

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
      {/* Hero (MinimalHeroSection - KokonutUI) */}
      <MinimalHeroSection
        eyebrow="Vault Maison"
        title="Collections"
        subtitle="Ten curated categories spanning diamonds, gold, and bridal — each piece crafted for timeless elegance."
        image="/images/products/editorial-model-jewelry.jpg"
        overlay="gradient"
      />

      {/* Category Grid */}
      <section style={{ padding: '80px 5vw', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="vm-coll-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {allCategories.map((cat: ProductCategory) => {
            const count = getProductsByCategory(cat).length
            const features = categoryFeatures[cat] || []
            return (
              <Link key={cat} href={`/minimal/category/${cat}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="vm-coll-card" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#F5F4F0' }}>
                  <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                    <img src={categoryImages[cat] || '/images/moody-jewelry-1.jpg'} alt={categoryLabels[cat]} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms ease' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,26,0.5) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                      <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '6px' }}>{count} {count === 1 ? 'Piece' : 'Pieces'}</p>
                      <h3 style={{ fontFamily: font, fontSize: '22px', fontWeight: 300, color: '#FFFFFF' }}>{categoryLabels[cat]}</h3>
                    </div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: '#9B9590', marginBottom: '16px' }}>
                      {categoryDescriptions[cat]}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {features.map((f) => (
                        <span key={f} style={{ fontFamily: font, fontSize: '10px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9B9590', padding: '4px 10px', border: '1px solid #E8E5E0' }}>{f}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4A265' }}>
                      Explore <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <style>{`
        .vm-coll-card:hover .vm-coll-img { transform: scale(1.04) !important; }
        .vm-coll-card:hover { box-shadow: 0 4px 20px rgba(180, 170, 160, 0.12) !important; }
        @media (min-width: 769px) { .vm-coll-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (min-width: 1200px) { .vm-coll-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (max-width: 768px) { .vm-coll-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </MinimalLayout>
  )
}
