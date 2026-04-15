'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { MK, MarketplaceSection, StaggerItem, SectionLabel } from '../MarketplaceLayout'
import { LotCard } from '../ui'
import { products } from '@/data/products'
import { categoryLabels } from '@/data/concepts'

export function MarketplaceCategory() {
  const params = useParams()
  const cat = params.category as string
  const label = categoryLabels[cat as keyof typeof categoryLabels] || cat
  const filtered = products.filter(p => p.category === cat)

  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Category" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.text, margin: '0 0 8px' }}>{label}</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary }}>{filtered.length} lots available</p>
        </div>
      </section>

      <MarketplaceSection>
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {filtered.map((product, i) => (
              <StaggerItem key={product.slug} index={i % 6}>
                <LotCard image={product.images[0]} title={product.name} subtitle={product.subtitle} price={product.price} href={`/marketplace/product/${product.slug}`} lotNumber={String(200 + i)} bids={Math.floor(Math.random() * 15) + 2} />
              </StaggerItem>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: MK.text }}>No lots available in this category.</p>
          </div>
        )}
      </MarketplaceSection>
    </>
  )
}
