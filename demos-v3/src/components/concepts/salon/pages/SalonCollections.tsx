'use client'

import React from 'react'
import Link from 'next/link'
import { SalonLayout, S } from '../SalonLayout'
import { allCategories, categoryLabels, categoryDescriptions } from '@/data/concepts'

export function SalonCollections() {
  return (
    <SalonLayout>
      <section style={{ padding: '60px 32px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>Our Collection</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: S.text, margin: '0 0 16px' }}>
            Browse by Category
          </h1>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, lineHeight: 1.7 }}>
            Each collection has been thoughtfully curated by our advisors. Find your perfect piece.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {allCategories.map((catSlug, i) => {
            const label = categoryLabels[catSlug] || catSlug.replace(/-/g, ' ')
            const desc = categoryDescriptions[catSlug] || 'Discover our curated selection.'
            return (
              <Link key={catSlug} href={`/salon/category/${catSlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="salon-collection-card" style={{
                  background: S.surface, borderRadius: S.radiusLg, overflow: 'hidden',
                  border: `1px solid ${S.border}`, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 220,
                }}>
                  <div style={{ background: S.warmPanel, overflow: 'hidden' }}>
                    <img src={`/images/category-${catSlug}.jpg`} alt={label}
                      className="salon-coll-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} />
                  </div>
                  <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: S.accent, margin: '0 0 8px' }}>
                      Collection {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, color: S.text, margin: '0 0 8px' }}>
                      {label}
                    </h3>
                    <p style={{ fontFamily: "'Lora', serif", fontSize: '0.8rem', color: S.textSecondary, lineHeight: 1.6, margin: '0 0 16px' }}>
                      {desc}
                    </p>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: S.accent, fontWeight: 500 }}>
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <style>{`
        .salon-collection-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px ${S.shadow}; border-color: ${S.accent}20; }
        .salon-collection-card:hover .salon-coll-img { transform: scale(1.05); }
      `}</style>
    </SalonLayout>
  )
}
