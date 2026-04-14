'use client'
import React from 'react'
import { AtelierLayout, A } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'

export function AtelierWishlist() {
  return (
    <AtelierLayout>
      <section style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
            Saved Pieces
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 16px' }}>
            Your Wishlist
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7, marginBottom: 40 }}>
            Pieces you&apos;ve saved for later. Each one waiting for the right moment.
          </p>

          <div style={{ padding: '60px 32px', background: A.surface, border: `1px solid ${A.border}`, borderRadius: 2 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={A.sketch} strokeWidth="1" style={{ margin: '0 auto 20px', display: 'block' }}>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, marginBottom: 24 }}>
              Your wishlist is empty. Browse our workshop to find pieces that speak to you.
            </p>
            <AtelierButton href="/atelier/collections">Browse the Workshop</AtelierButton>
          </div>
        </div>
      </section>
    </AtelierLayout>
  )
}
