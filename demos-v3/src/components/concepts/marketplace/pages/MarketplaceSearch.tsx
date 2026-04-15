'use client'
import React, { useState } from 'react'
import { MK, MarketplaceSection, StaggerItem, SectionLabel } from '../MarketplaceLayout'
import { LotCard } from '../ui'
import { products } from '@/data/products'
import { Search } from 'lucide-react'

export function MarketplaceSearch() {
  const [query, setQuery] = useState('')
  const filtered = query.length > 1 ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.subtitle.toLowerCase().includes(query.toLowerCase())) : []

  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Search Lots" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <div style={{ position: 'relative' }}>
            <Search size={18} color={MK.textSecondary} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, category, or keyword..."
              style={{
                width: '100%', padding: '14px 14px 14px 48px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem',
                color: MK.text, background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, outline: 'none',
              }}
            />
          </div>
        </div>
      </section>

      <MarketplaceSection>
        {filtered.length > 0 ? (
          <>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.textSecondary, marginBottom: 20 }}>{filtered.length} lots found</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {filtered.slice(0, 9).map((product, i) => (
                <StaggerItem key={product.slug} index={i}>
                  <LotCard image={product.images[0]} title={product.name} subtitle={product.subtitle} price={product.price} href={`/marketplace/product/${product.slug}`} lotNumber={String(400 + i)} />
                </StaggerItem>
              ))}
            </div>
          </>
        ) : query.length > 1 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: MK.text }}>No lots found</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary }}>Try a different search term.</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MK.textSecondary }}>Enter a search term to find lots.</p>
          </div>
        )}
      </MarketplaceSection>
    </>
  )
}
