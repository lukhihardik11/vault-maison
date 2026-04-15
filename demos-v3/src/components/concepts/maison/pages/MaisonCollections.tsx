'use client'
import React from 'react'
import { MS, MaisonSection, RevealSection, StaggerItem, SectionLabel } from '../MaisonLayout'
import { ElegantCard } from '../ui'
import { products } from '@/data/products'

export function MaisonCollections() {
  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Our Collection" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 600, color: MS.text, margin: '0 0 8px' }}>All Pieces</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary }}>{products.length} curated pieces</p>
        </div>
      </section>

      <MaisonSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {products.map((product, i) => (
            <StaggerItem key={product.slug} index={i % 6}>
              <ElegantCard image={product.images[0]} title={product.name} subtitle={product.subtitle} price={product.price} href={`/maison/product/${product.slug}`} badge={i < 3 ? 'Signature' : undefined} />
            </StaggerItem>
          ))}
        </div>
      </MaisonSection>
    </>
  )
}
