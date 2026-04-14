'use client'
import React, { useState, useMemo } from 'react'
import { AtelierLayout, A } from '../AtelierLayout'
import { AtelierCard } from '../ui/AtelierCard'
import { products } from '@/data/products'

export function AtelierSearch() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    ).slice(0, 12)
  }, [query])

  return (
    <AtelierLayout>
      <section style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
              Search
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 32px' }}>
              Find Your Piece
            </h1>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, material, or style..."
              style={{
                width: '100%', maxWidth: 500, padding: '14px 0',
                fontFamily: 'Source Serif 4, serif', fontSize: 18, color: A.ink,
                background: 'transparent', border: 'none',
                borderBottom: `2px solid ${A.accent}`,
                outline: 'none', textAlign: 'center',
              }}
            />
          </div>

          {query && results.length === 0 && (
            <p style={{ textAlign: 'center', fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft }}>
              No pieces found for &ldquo;{query}&rdquo;. Try a different search or <a href="/atelier/collections" style={{ color: A.accent }}>browse all pieces</a>.
            </p>
          )}

          {results.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
              {results.map(p => (
                <AtelierCard
                  key={p.slug}
                  title={p.name}
                  subtitle={p.category.replace(/-/g, ' ')}
                  price={`£${p.price.toLocaleString()}`}
                  image={p.images?.[0]}
                  href={`/atelier/product/${p.slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </AtelierLayout>
  )
}
