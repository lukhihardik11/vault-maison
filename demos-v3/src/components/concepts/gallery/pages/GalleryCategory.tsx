'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { GalleryLayout, G } from '../GalleryLayout'
import { PedestalCard } from '../ui/PedestalCard'
import { MuseumCaption } from '../ui/MuseumCaption'
import { getProductsByCategory } from '@/data/products'
import { categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { SlidersHorizontal, Grid2X2, LayoutList } from 'lucide-react'
import { GalleryViewToggle } from '../ui/GalleryViewToggle'

const ROMAN_MAP: Record<string, string> = {
  'diamond-rings': 'I', 'diamond-necklaces': 'II', 'diamond-earrings': 'III',
  'diamond-bracelets': 'IV', 'gold-rings': 'V', 'gold-necklaces': 'VI',
  'gold-earrings': 'VII', 'gold-bracelets': 'VIII', 'loose-diamonds': 'IX',
  'wedding-bridal': 'X',
}

export function GalleryCategory({ category }: { category: ProductCategory }) {
  const products = getProductsByCategory(category)
  const label = categoryLabels[category] || category.replace(/-/g, ' ')
  const description = categoryDescriptions[category] || ''
  const roman = ROMAN_MAP[category] || ''
  const [sortBy, setSortBy] = useState('featured')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  return (
    <GalleryLayout>
      {/* Room header */}
      <section style={{ padding: '160px 32px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <MuseumCaption align="center">Room {roman}</MuseumCaption>
        <h1 style={{
          fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400, color: G.text, margin: '16px 0 16px', lineHeight: 1.2,
        }}>
          {label}
        </h1>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary,
          lineHeight: 1.7, maxWidth: 520, margin: '0 auto',
        }}>
          {description || `A curated selection of ${label.toLowerCase()} from our permanent collection, each chosen for its exceptional craftsmanship and artistic merit.`}
        </p>
        {/* Breadcrumbs */}
        <nav style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
          <Link href="/gallery" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: G.caption, textDecoration: 'none' }}>Gallery</Link>
          <span style={{ color: G.border, fontSize: '0.6rem' }}>/</span>
          <Link href="/gallery/collections" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: G.caption, textDecoration: 'none' }}>Exhibition</Link>
          <span style={{ color: G.border, fontSize: '0.6rem' }}>/</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: G.accent }}>{label}</span>
        </nav>
      </section>

      {/* Controls bar */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 40px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: `1px solid ${G.border}`, paddingBottom: 16,
        }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: G.caption }}>
            {products.length} {products.length === 1 ? 'piece' : 'pieces'} on view
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: G.text,
                background: 'transparent', border: `1px solid ${G.border}`, padding: '6px 12px',
                cursor: 'pointer', borderRadius: 0,
              }}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name">Alphabetical</option>
            </select>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setView('grid')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: view === 'grid' ? G.accent : G.caption, padding: 4 }}>
                <Grid2X2 size={16} strokeWidth={1.5} />
              </button>
              <button onClick={() => setView('list')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: view === 'list' ? G.accent : G.caption, padding: 4 }}>
                <LayoutList size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid with dim-siblings */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 140px' }}>
        {view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
            {sorted.map((product, i) => (
              <div key={product.id}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.35 : 1,
                }}>
                <PedestalCard
                  name={product.name}
                  price={product.priceDisplay}
                  image={product.images[0]}
                  material={product.subtitle}
                  edition={product.diamondSpecs ? `${product.diamondSpecs.certification}` : undefined}
                  href={`/gallery/product/${product.slug}`}
                  isNew={product.isNew}
                  category={label}
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {sorted.map((product, i) => (
              <Link key={product.id} href={`/gallery/product/${product.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 24, alignItems: 'center',
                  padding: '24px 0', borderBottom: `1px solid ${G.border}`,
                  transition: 'opacity 0.4s ease',
                  opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.35 : 1,
                }}>
                  <div style={{ width: 100, height: 100, background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={product.images[0]} alt={product.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '0.95rem', fontWeight: 400, color: G.text, margin: '0 0 4px' }}>{product.name}</h3>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: G.textSecondary, margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{product.subtitle}</p>
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: G.text }}>{product.priceDisplay}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </GalleryLayout>
  )
}
