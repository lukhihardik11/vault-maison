'use client'
import React from 'react'
import { MK, MarketplaceSection, RevealSection, StaggerItem, SectionLabel } from '../MarketplaceLayout'
import { LotCard, CountdownTimer } from '../ui'
import { products } from '@/data/products'

export function MarketplaceCollections() {
  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <SectionLabel label="Current Auction" style={{ marginBottom: 16 }} />
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.text, margin: '0 0 8px' }}>Available Lots</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary }}>{products.length} lots currently available</p>
          </div>
          <CountdownTimer days={2} hours={14} minutes={32} seconds={17} label="Auction Closes In" />
        </div>
      </section>

      <MarketplaceSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {products.map((product, i) => (
            <StaggerItem key={product.slug} index={i % 6}>
              <LotCard
                image={product.images[0]}
                title={product.name}
                subtitle={product.subtitle}
                price={product.price}
                href={`/marketplace/product/${product.slug}`}
                lotNumber={String(100 + i)}
                bids={Math.floor(Math.random() * 20) + 3}
                endingSoon={i < 3}
              />
            </StaggerItem>
          ))}
        </div>
      </MarketplaceSection>
    </>
  )
}
