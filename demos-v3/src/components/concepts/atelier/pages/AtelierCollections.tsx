'use client'
import React from 'react'
import Link from 'next/link'
import { AtelierLayout, A } from '../AtelierLayout'
import { allCategories, categoryLabels, categoryDescriptions } from '@/data/concepts'

const craftNotes: Record<string, string> = {
  'engagement-rings': 'Each setting is hand-carved from a single block of wax before casting',
  'wedding-bands': 'Forged and shaped on the anvil, then hand-finished to a mirror polish',
  'necklaces': 'Chain links individually soldered, pendants hand-set with loupe precision',
  'earrings': 'Balanced to the milligram for all-day comfort, hand-polished to perfection',
  'bracelets': 'Articulated links tested for fluid movement, clasps hand-fitted',
  'rings': 'Each shank hand-forged, stones set under 10x magnification',
  'brooches': 'Pin mechanisms hand-tested 1000 times for reliability',
  'watches': 'Cases hand-finished with Geneva stripes, movements assembled by hand',
  'pendants': 'Bail and setting carved as one piece for seamless elegance',
  'anklets': 'Delicate chains hand-linked, charms individually attached',
  'cufflinks': 'Toggle mechanisms precision-engineered, faces hand-engraved',
  'tiaras': 'Wire framework hand-bent, each stone individually positioned',
}

export function AtelierCollections() {
  return (
    <AtelierLayout>
      {/* Header */}
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
            The Workshop
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: A.ink, margin: '0 0 16px' }}>
            Browse by Craft
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7 }}>
            Each category represents a distinct discipline of our workshop. Every piece is made by hand.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '0 32px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {allCategories.map((catSlug, i) => {
              const label = categoryLabels[catSlug] || catSlug.replace(/-/g, ' ')
              const desc = categoryDescriptions[catSlug] || ''
              const craft = craftNotes[catSlug] || 'Handcrafted with care in our London workshop'
              return (
                <Link key={catSlug} href={`/atelier/category/${catSlug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    background: A.surface, border: `1px solid ${A.border}`, borderRadius: 2,
                    padding: '32px 28px', transition: 'all 0.3s', cursor: 'pointer',
                    minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = A.accent }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = A.border }}
                  >
                    <div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 300, color: A.accent, opacity: 0.25, marginBottom: 8 }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, marginBottom: 8, textTransform: 'capitalize' }}>
                        {label}
                      </h3>
                      <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.6, marginBottom: 16 }}>
                        {desc}
                      </p>
                    </div>
                    <div style={{
                      fontFamily: 'Caveat, cursive', fontSize: 14, color: A.sketch,
                      borderTop: `1px solid ${A.border}`, paddingTop: 12,
                    }}>
                      ✦ {craft}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </AtelierLayout>
  )
}
