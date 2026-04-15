'use client'
import React, { useState } from 'react'
import { MS, MaisonSection, StaggerItem, SectionLabel } from '../MaisonLayout'
import { ElegantCard } from '../ui'
import { products } from '@/data/products'
import { Search } from 'lucide-react'

export function MaisonSearch() {
  const [query, setQuery] = useState('')
  const filtered = query.length > 1 ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.subtitle.toLowerCase().includes(query.toLowerCase())) : []

  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Discover" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <div style={{ position: 'relative' }}>
            <Search size={18} color={MS.textSecondary} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search our collection..."
              style={{
                width: '100%', padding: '14px 14px 14px 48px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
                color: MS.text, background: MS.card, border: `1px solid ${MS.border}`, borderRadius: 4, outline: 'none',
              }}
            />
          </div>
        </div>
      </section>

      <MaisonSection>
        {filtered.length > 0 ? (
          <>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary, marginBottom: 20 }}>{filtered.length} pieces found</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {filtered.slice(0, 9).map((product, i) => (
                <StaggerItem key={product.slug} index={i}>
                  <ElegantCard image={product.images[0]} title={product.name} subtitle={product.subtitle} price={product.price} href={`/maison/product/${product.slug}`} />
                </StaggerItem>
              ))}
            </div>
          </>
        ) : query.length > 1 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: MS.text }}>No pieces found</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary }}>Try a different search term.</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MS.textSecondary }}>Enter a search term to discover pieces.</p>
          </div>
        )}
      </MaisonSection>
    </>
  )
}
