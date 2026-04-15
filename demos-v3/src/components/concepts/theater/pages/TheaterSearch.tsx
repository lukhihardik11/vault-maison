'use client'
import React, { useState } from 'react'
import { TH, TheaterSection, StaggerItem, ActLabel } from '../TheaterLayout'
import { SceneCard } from '../ui'
import { products } from '@/data/products'
import { Search } from 'lucide-react'

export function TheaterSearch() {
  const [query, setQuery] = useState('')
  const filtered = query.length > 1 ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.subtitle.toLowerCase().includes(query.toLowerCase())) : []

  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <ActLabel label="Search the Repertoire" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <div style={{ position: 'relative' }}>
            <Search size={18} color={TH.textSecondary} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search our collection..."
              style={{
                width: '100%', padding: '16px 16px 16px 48px', fontFamily: "'Playfair Display', serif", fontSize: '1rem',
                color: TH.text, background: TH.card, border: `1px solid ${TH.border}`, outline: 'none',
              }}
            />
          </div>
        </div>
      </section>

      <TheaterSection>
        {filtered.length > 0 ? (
          <>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary, marginBottom: 24 }}>{filtered.length} results found</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {filtered.slice(0, 9).map((product, i) => (
                <StaggerItem key={product.slug} index={i}>
                  <SceneCard image={product.images[0]} title={product.name} subtitle={product.subtitle} price={product.price} href={`/theater/product/${product.slug}`} />
                </StaggerItem>
              ))}
            </div>
          </>
        ) : query.length > 1 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: TH.text }}>No scenes found</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary }}>Try a different search term.</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary }}>Enter a search term to explore our collection.</p>
          </div>
        )}
      </TheaterSection>
    </>
  )
}
