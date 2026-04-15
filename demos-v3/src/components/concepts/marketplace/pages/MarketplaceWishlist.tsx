'use client'
import React from 'react'
import { MK, MarketplaceSection, StaggerItem, SectionLabel } from '../MarketplaceLayout'
import { LotCard } from '../ui'
import { getBestsellers } from '@/data/products'

export function MarketplaceWishlist() {
  const items = getBestsellers().slice(0, 3)

  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Saved" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.text }}>Watchlist</h1>
        </div>
      </section>

      <MarketplaceSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {items.map((product, i) => (
            <StaggerItem key={product.slug} index={i}>
              <LotCard image={product.images[0]} title={product.name} subtitle={product.subtitle} price={product.price} href={`/marketplace/product/${product.slug}`} lotNumber={String(500 + i)} bids={Math.floor(Math.random() * 10) + 2} />
            </StaggerItem>
          ))}
        </div>
      </MarketplaceSection>
    </>
  )
}
