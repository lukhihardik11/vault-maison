'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { allCategories, categoryLabels, categoryDescriptions } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export function GalleryCollections() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 80px', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
        <MuseumCaption align="center">Full Exhibition</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: G.text, margin: '16px 0 16px', lineHeight: 1.2 }}>
          The Permanent Collection
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.7 }}>
          Navigate through our exhibition rooms, each dedicated to a distinct category of exceptional jewelry and gemstones.
        </p>
      </section>

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 140px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {allCategories.map((cat, i) => {
            const products = getProductsByCategory(cat)
            const label = categoryLabels[cat] || cat.replace(/-/g, ' ')
            const desc = categoryDescriptions[cat] || ''
            return (
              <Link key={cat} href={`/gallery/category/${cat}`} style={{ textDecoration: 'none', color: 'inherit' }}
                onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '80px 120px 1fr auto', gap: 32, alignItems: 'center',
                  padding: '36px 0', borderBottom: `1px solid ${G.border}`,
                  transition: 'all 0.4s ease',
                  opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.3 : 1,
                }}>
                  <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.2rem', color: G.caption, fontWeight: 400 }}>
                    {ROMAN[i] || `${i + 1}`}
                  </span>
                  <div style={{ width: 80, height: 80, background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {products[0] && <img src={products[0].images[0]} alt={label} style={{ width: '75%', height: '75%', objectFit: 'contain' }} />}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.1rem', fontWeight: 400, color: G.text, margin: '0 0 4px' }}>{label}</h3>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: G.textSecondary, margin: 0, lineHeight: 1.6 }}>
                      {desc || `${products.length} pieces on view`}
                    </p>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: G.accent }}>
                    Enter Room →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </GalleryLayout>
  )
}
