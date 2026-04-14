'use client'
import React, { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { AtelierLayout, A, AtelierSection, RevealSection, StaggerItem, WarmDivider } from '../AtelierLayout'
import { AtelierCard } from '../ui/AtelierCard'
import { AtelierButton } from '../ui/AtelierButton'
import { getProductsByCategory } from '@/data/products'
import { allCategories, categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'

const artisanNames = ['Elena M.', 'Thomas A.', 'Yuki T.', 'Marie D.']

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

export function AtelierCategory() {
  const params = useParams()
  const categorySlug = params.category as string
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured')

  const categoryLabel = categoryLabels[categorySlug as keyof typeof categoryLabels] || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const categoryDesc = categoryDescriptions[categorySlug as keyof typeof categoryDescriptions] || ''
  const craft = craftNotes[categorySlug] || 'Handcrafted with care in our London workshop'
  const products = useMemo(() => getProductsByCategory(categorySlug as ProductCategory), [categorySlug])

  const sorted = useMemo(() => {
    const arr = [...products]
    if (sortBy === 'price-asc') arr.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') arr.sort((a, b) => b.price - a.price)
    return arr
  }, [products, sortBy])

  return (
    <AtelierLayout>
      {/* ═══ HEADER ═══ */}
      <AtelierSection style={{ padding: '80px 32px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32,
            padding: '12px 0', borderBottom: `1px dashed ${A.sketch}`,
          }}>
            <Link href="/atelier" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft, textDecoration: 'none' }}>Workshop</Link>
            <span style={{ color: A.sketch, fontSize: 11 }}>→</span>
            <Link href="/atelier/collections" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft, textDecoration: 'none' }}>Collections</Link>
            <span style={{ color: A.sketch, fontSize: 11 }}>→</span>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.accent }}>{categoryLabel}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: A.accent, marginBottom: 8 }}>
                Collection
              </div>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: A.ink, margin: '0 0 8px', textTransform: 'capitalize' }}>
                {categoryLabel}
              </h1>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, marginBottom: 4 }}>
                {categoryDesc || `${sorted.length} piece${sorted.length !== 1 ? 's' : ''} — each handcrafted in our London workshop`}
              </p>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: A.gold }}>
                ✦ {craft}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['featured', 'price-asc', 'price-desc'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  style={{
                    padding: '8px 16px',
                    border: `1px ${sortBy === s ? 'solid' : 'dashed'} ${sortBy === s ? A.accent : A.sketch}`,
                    background: sortBy === s ? 'rgba(139,105,20,0.06)' : 'transparent',
                    color: sortBy === s ? A.accent : A.textSoft,
                    fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    cursor: 'pointer', borderRadius: 2, transition: 'all 0.3s',
                  }}
                >
                  {s === 'featured' ? 'Featured' : s === 'price-asc' ? 'Price ↑' : 'Price ↓'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AtelierSection>

      {/* ═══ PRODUCT GRID ═══ */}
      <AtelierSection alt style={{ padding: '48px 32px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {sorted.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: A.textSoft }}>
                No pieces in this category yet. Our artisans are at work.
              </p>
              <AtelierButton href="/atelier/collections" style={{ marginTop: 24 }}>Browse All</AtelierButton>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 24 }}>
              {sorted.map((p, i) => (
                <StaggerItem key={p.slug} index={i}>
                  <AtelierCard
                    title={p.name}
                    subtitle={p.subtitle || p.category.replace(/-/g, ' ')}
                    price={`£${p.price.toLocaleString()}`}
                    image={p.images?.[0]}
                    href={`/atelier/product/${p.slug}`}
                    artisan={artisanNames[i % artisanNames.length]}
                    materials={p.material || undefined}
                    badge={p.isNew ? 'New from the bench' : p.isBestseller ? 'Workshop favourite' : undefined}
                  />
                </StaggerItem>
              ))}
            </div>
          )}
        </div>
      </AtelierSection>

      {/* ═══ COMMISSION CTA ═══ */}
      <section style={{ position: 'relative', padding: '72px 32px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/goldsmith-crafting.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.2)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(44,38,32,0.5)' }} />
        <RevealSection>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 300, color: '#FEFCF8', marginBottom: 12 }}>
              Looking for Something Unique?
            </h2>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: 'rgba(232,226,216,0.7)', lineHeight: 1.7, marginBottom: 24 }}>
              Commission a bespoke piece tailored to your exact vision.
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
