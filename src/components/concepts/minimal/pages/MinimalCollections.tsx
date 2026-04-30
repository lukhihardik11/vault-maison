'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { minimal } from '../design-system'
import { allCategories, categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'
import { KineticHeadline } from '../animations/KineticType'
import { PageEntrance } from '../animations/PageEntrance'

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
  'loose-diamonds': '/images/products/loose-round-diamond.jpg',
  'wedding-bridal': '/images/products/classic-engagement-ring.jpg',
}

export function MinimalCollections() {
  return (
    <MinimalLayout>
      {/* Header */}
      <div style={{ padding: 'clamp(40px, 6vh, 80px) 0 clamp(20px, 3vh, 32px)' }}>
        <div className={minimal.cn.container}>
          <PageEntrance variant="standard" delay={0.05}>
          <span style={{ fontFamily: mono, fontSize: minimal.type.micro, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#767676', display: 'block', marginBottom: '16px' }}>
            Vault Maison
          </span>
          {/* Phase 6: Per-character kinetic headline */}
          <KineticHeadline
            text="Collections"
            as="h1"
            variant="slide-up"
            style={{ fontFamily: font, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#050505', margin: '0 0 16px' }}
            stagger={0.03}
            once
            duration={0.9}
            start="top 95%"
          />
          <p style={{ fontFamily: font, fontSize: minimal.type.body, fontWeight: 400, color: '#6B6B6B', lineHeight: 1.8, maxWidth: '520px', margin: 0 }}>
            Ten curated categories spanning diamonds, gold, and bridal — each piece crafted for timeless precision.
          </p>
          </PageEntrance>
        </div>
      </div>

      <div className={minimal.cn.container}><div className={minimal.cn.divider} /></div>

      {/* Category Grid — Tier 2: no zoom, opacity hover, editorial CTA */}
      <div style={{ padding: 'clamp(32px, 4vh, 56px) 0 clamp(48px, 6vh, 80px)' }}>
        <div className={minimal.cn.container}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allCategories.map((cat: ProductCategory) => {
              const count = getProductsByCategory(cat).length
              return (
                <Link
                  key={cat}
                  href={`/minimal/category/${cat}`}
                  className="tier2-collection-tile"
                  style={{ textDecoration: 'none', color: '#050505', display: 'block' }}
                >
                  {/* Image — no zoom on hover, just opacity dim */}
                  <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
                    <img
                      src={categoryImages[cat] || '/images/moody-jewelry-1.jpg'}
                      alt={categoryLabels[cat]}
                      loading="eager"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                  <div style={{ paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <h3 style={{ fontFamily: font, fontSize: minimal.type.bodyLg, fontWeight: 400, letterSpacing: '-0.01em', color: '#050505', margin: 0 }}>
                        {categoryLabels[cat]}
                      </h3>
                      <span style={{ fontFamily: mono, fontSize: minimal.type.micro, letterSpacing: '0.2em', color: '#555555' }}>
                        {count} pieces
                      </span>
                    </div>
                    <p style={{ fontFamily: font, fontSize: minimal.type.bodySm, fontWeight: 400, color: '#767676', lineHeight: 1.6, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {categoryDescriptions[cat]}
                    </p>
                    <span
                      style={{
                        fontFamily: font,
                        fontSize: minimal.type.caption,
                        fontWeight: 500,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#050505',
                        borderBottom: '1px solid #050505',
                        paddingBottom: '2px',
                      }}
                    >
                      Discover
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .tier2-collection-tile {
          transition: opacity 0.2s ease;
        }
        .tier2-collection-tile:hover {
          opacity: 0.75;
        }
      `}</style>
    </MinimalLayout>
  )
}
