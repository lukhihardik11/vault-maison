'use client'

import React, { useState, useMemo } from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { PedestalCard } from '../ui/PedestalCard'
import { MuseumCaption } from '../ui/MuseumCaption'
import { products } from '@/data/products'
import { Search } from 'lucide-react'

export function GallerySearch() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 60px', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <MuseumCaption align="center">Search the Collection</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, color: G.text, margin: '16px 0 32px' }}>
          Find Your Piece
        </h1>
        <div style={{ position: 'relative' }}>
          <Search size={16} color={G.caption} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, material, or category..."
            style={{
              width: '100%', padding: '16px 16px 16px 44px',
              fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: G.text,
              background: G.surface, border: `1px solid ${G.border}`, borderRadius: 0, outline: 'none',
            }}
          />
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 140px' }}>
        {query && (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: G.caption, marginBottom: 32 }}>
            {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
          </p>
        )}
        {results.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {results.map((p) => (
              <PedestalCard key={p.id} name={p.name} price={p.priceDisplay} image={p.images[0]} material={p.subtitle} href={`/gallery/product/${p.slug}`} isNew={p.isNew} />
            ))}
          </div>
        )}
        {query && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: G.textSecondary }}>No pieces found. Try a different search term.</p>
          </div>
        )}
      </section>
    </GalleryLayout>
  )
}
