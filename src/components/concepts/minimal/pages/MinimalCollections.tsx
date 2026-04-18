'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { minimal } from '../design-system'
import { allCategories, categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'
import { ArrowRight } from 'lucide-react'

const font = minimal.font.primary
const mono = minimal.font.mono

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

export function MinimalCollections() {
  return (
    <MinimalLayout>
      {/* Header */}
      <div style={{ padding: 'clamp(64px, 10vh, 120px) 0 clamp(32px, 4vh, 48px)' }}>
        <div className={minimal.cn.container}>
          <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9B9B9B', display: 'block', marginBottom: '16px' }}>
            Vault Maison
          </span>
          <h1 style={{ fontFamily: font, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#050505', margin: '0 0 16px' }}>
            Collections
          </h1>
          <p style={{ fontFamily: font, fontSize: '15px', fontWeight: 300, color: '#6B6B6B', lineHeight: 1.8, maxWidth: '520px', margin: 0 }}>
            Ten curated categories spanning diamonds, gold, and bridal — each piece crafted for timeless precision.
          </p>
        </div>
      </div>

      <div className={minimal.cn.container}><div className={minimal.cn.divider} /></div>

      {/* Category Grid */}
      <div style={{ padding: 'clamp(48px, 8vh, 96px) 0 clamp(64px, 10vh, 120px)' }}>
        <div className={minimal.cn.container}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allCategories.map((cat: ProductCategory) => {
              const count = getProductsByCategory(cat).length
              return (
                <Link
                  key={cat}
                  href={`/minimal/category/${cat}`}
                  className="group block"
                  style={{ textDecoration: 'none', color: '#050505' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', backgroundColor: '#FAFAFA' }}>
                    <img
                      src={categoryImages[cat] || '/images/moody-jewelry-1.jpg'}
                      alt={categoryLabels[cat]}
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
                  <div style={{ paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <h3 style={{ fontFamily: font, fontSize: '16px', fontWeight: 400, letterSpacing: '-0.01em', color: '#050505', margin: 0 }}>
                        {categoryLabels[cat]}
                      </h3>
                      <span style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '0.2em', color: '#9B9B9B' }}>
                        {count} pieces
                      </span>
                    </div>
                    <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9B9B', lineHeight: 1.6, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {categoryDescriptions[cat]}
                    </p>
                    <span
                      style={{
                        fontFamily: font,
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#050505',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      Explore <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </MinimalLayout>
  )
}
