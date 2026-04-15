'use client'

import React from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { GalleryButton } from '../ui/GalleryButton'

export function GalleryWishlist() {
  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 140px', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <MuseumCaption align="center">Your Collection</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, color: G.text, margin: '16px 0 24px' }}>
          Saved Pieces
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.7, marginBottom: 36 }}>
          Your personal collection of saved pieces. Click the heart icon on any piece to add it here.
        </p>
        <div style={{ padding: '60px 0', borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: G.textSecondary, marginBottom: 24 }}>
            No saved pieces yet.
          </p>
          <GalleryButton href="/gallery/collections">Explore the Exhibition</GalleryButton>
        </div>
      </section>
    </GalleryLayout>
  )
}
