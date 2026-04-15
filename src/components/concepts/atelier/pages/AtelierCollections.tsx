'use client'
import React from 'react'
import Link from 'next/link'
import { AtelierLayout, A, AtelierSection, RevealSection, StaggerItem, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'
import { allCategories, categoryLabels, categoryDescriptions } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'

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
      {/* ═══ HERO ═══ */}
      <section style={{
        position: 'relative', minHeight: '45vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/jewelry-making-hands.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.3)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.4)' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1, padding: '72px 32px 60px' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.gold, marginBottom: 16 }}>
            The Workshop
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#FEFCF8', margin: '0 0 16px' }}>
            Browse by Craft
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: 'rgba(232,226,216,0.8)', lineHeight: 1.7 }}>
            Each category represents a distinct discipline of our workshop. Every piece is made by hand.
          </p>
        </div>
      </section>

      {/* ═══ CATEGORY GRID ═══ */}
      <AtelierSection style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
            {allCategories.map((catSlug, i) => {
              const label = categoryLabels[catSlug] || catSlug.replace(/-/g, ' ')
              const desc = categoryDescriptions[catSlug] || ''
              const craft = craftNotes[catSlug] || 'Handcrafted with care in our London workshop'
              const products = getProductsByCategory(catSlug as any)
              const heroImage = products[0]?.images?.[0]

              return (
                <StaggerItem key={catSlug} index={i}>
                  <Link href={`/atelier/category/${catSlug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                      background: A.surface, border: `1px dashed ${A.sketch}`, borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: `inset 0 1px 2px ${A.shadow}`,
                      transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.borderColor = A.accent
                      el.style.boxShadow = `0 8px 24px ${A.shadowMd}`
                      el.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.borderColor = A.sketch
                      el.style.boxShadow = `inset 0 1px 2px ${A.shadow}`
                      el.style.transform = 'translateY(0)'
                    }}
                    >
                      {/* Category image */}
                      {heroImage && (
                        <div style={{
                          height: 180,
                          backgroundImage: `url(${heroImage})`,
                          backgroundSize: 'cover', backgroundPosition: 'center',
                          borderBottom: `1px dashed ${A.sketch}`,
                        }} />
                      )}
                      <div style={{ padding: '24px 28px 28px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 300, color: `${A.accent}30` }}>
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.sketch }}>
                            {products.length} piece{products.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 500, color: A.ink, marginBottom: 8, textTransform: 'capitalize' }}>
                          {label}
                        </h3>
                        <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.6, marginBottom: 16 }}>
                          {desc}
                        </p>
                        <div style={{
                          fontFamily: 'Caveat, cursive', fontSize: 14, color: A.gold,
                          borderTop: `1px dashed ${A.sketch}`, paddingTop: 12,
                        }}>
                          ✦ {craft}
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </div>
        </div>
      </AtelierSection>

      {/* ═══ CTA ═══ */}
      <section style={{ position: 'relative', padding: '80px 32px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/goldsmith-crafting.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.2)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.5)' }} />
        <RevealSection>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 300, color: '#FEFCF8', marginBottom: 16 }}>
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: 'rgba(232,226,216,0.7)', lineHeight: 1.7, marginBottom: 28 }}>
              Commission a bespoke piece, designed and crafted exclusively for you.
            </p>
            <AtelierButton href="/atelier/bespoke" style={{ background: A.gold, color: A.ink }}>
              Begin a Commission
            </AtelierButton>
          </div>
        </RevealSection>
      </section>
    </AtelierLayout>
  )
}
