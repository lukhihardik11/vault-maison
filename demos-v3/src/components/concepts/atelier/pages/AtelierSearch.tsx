'use client'
import React, { useState, useMemo } from 'react'
import { AtelierLayout, A, AtelierSection, RevealSection, StaggerItem, WarmDivider } from '../AtelierLayout'
import { AtelierCard } from '../ui/AtelierCard'
import { products } from '@/data/products'

const popularSearches = ['Diamond', 'Gold', 'Ring', 'Necklace', 'Bespoke', 'Platinum']
const artisanNames = ['Elena M.', 'Thomas A.', 'Yuki T.', 'Marie D.']

export function AtelierSearch() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q)
    ).slice(0, 12)
  }, [query])

  return (
    <AtelierLayout>
      <AtelierSection style={{ padding: '80px 32px 48px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
            Search
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: A.ink, margin: '0 0 32px' }}>
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
              borderBottom: `2px dashed ${A.accent}`,
              outline: 'none', textAlign: 'center',
            }}
          />
          {/* Popular searches */}
          {!query && (
            <div style={{ marginTop: 24, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {popularSearches.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  style={{
                    padding: '6px 14px', border: `1px dashed ${A.sketch}`, borderRadius: 2,
                    background: 'transparent', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 500,
                    letterSpacing: '0.05em', textTransform: 'uppercase', color: A.textSoft,
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = A.accent; (e.currentTarget as HTMLButtonElement).style.color = A.accent }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = A.sketch; (e.currentTarget as HTMLButtonElement).style.color = A.textSoft }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </AtelierSection>

      <AtelierSection alt style={{ padding: '32px 32px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {query && results.length === 0 && (
            <RevealSection>
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: A.textSoft, marginBottom: 16 }}>
                  No pieces found for &ldquo;{query}&rdquo;
                </p>
                <p style={{ fontFamily: 'Caveat, cursive', fontSize: 15, color: A.gold }}>
                  Try a different search or <a href="/atelier/collections" style={{ color: A.accent, textDecoration: 'underline' }}>browse all pieces</a>
                </p>
              </div>
            </RevealSection>
          )}

          {results.length > 0 && (
            <>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft, marginBottom: 24 }}>
                {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
                {results.map((p, i) => (
                  <StaggerItem key={p.slug} index={i}>
                    <AtelierCard
                      title={p.name}
                      subtitle={p.category.replace(/-/g, ' ')}
                      price={`£${p.price.toLocaleString()}`}
                      image={p.images?.[0]}
                      href={`/atelier/product/${p.slug}`}
                      artisan={artisanNames[i % artisanNames.length]}
                    />
                  </StaggerItem>
                ))}
              </div>
            </>
          )}
        </div>
      </AtelierSection>
    </AtelierLayout>
  )
}
