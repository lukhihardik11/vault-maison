'use client'
import React from 'react'
import { MS, MaisonSection, StaggerItem, SectionLabel } from '../MaisonLayout'
import { ElegantCard } from '../ui'
import { getBestsellers } from '@/data/products'

export function MaisonWishlist() {
  const items = getBestsellers().slice(0, 3)

  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Saved" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: MS.text }}>Wishlist</h1>
        </div>
      </section>

      <MaisonSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {items.map((product, i) => (
            <StaggerItem key={product.slug} index={i}>
              <ElegantCard image={product.images[0]} title={product.name} subtitle={product.subtitle} price={product.price} href={`/maison/product/${product.slug}`} />
            </StaggerItem>
          ))}
        </div>
      </MaisonSection>
    </>
  )
}
