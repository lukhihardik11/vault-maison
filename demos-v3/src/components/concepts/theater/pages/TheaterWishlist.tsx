'use client'
import React from 'react'
import { TH, TheaterSection, StaggerItem, ActLabel } from '../TheaterLayout'
import { TheaterButton, SceneCard } from '../ui'
import { getBestsellers } from '@/data/products'
import { Heart } from 'lucide-react'

export function TheaterWishlist() {
  const wishlistItems = getBestsellers().slice(0, 3)

  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <ActLabel label="Saved Scenes" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.text }}>Wishlist</h1>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {wishlistItems.map((product, i) => (
            <StaggerItem key={product.slug} index={i}>
              <SceneCard image={product.images[0]} title={product.name} subtitle={product.subtitle} price={product.price} href={`/theater/product/${product.slug}`} />
            </StaggerItem>
          ))}
        </div>
      </TheaterSection>
    </>
  )
}
