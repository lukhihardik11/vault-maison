'use client'
import React from 'react'
import { AtelierLayout, A, AtelierSection, RevealSection, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'

export function AtelierWishlist() {
  return (
    <AtelierLayout>
      <AtelierSection style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <RevealSection>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
              Saved Pieces
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: A.ink, margin: '0 0 12px' }}>
              Your Wishlist
            </h1>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7, marginBottom: 40 }}>
              Pieces you&apos;ve saved for later. Each one waiting for the right moment.
            </p>
          </RevealSection>

          <RevealSection delay={200}>
            <div style={{
              padding: '72px 40px', background: A.surface,
              border: `1px dashed ${A.sketch}`, borderRadius: 2,
              boxShadow: `inset 0 1px 2px ${A.shadow}`,
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={A.sketch} strokeWidth="1" style={{ margin: '0 auto 24px', display: 'block', opacity: 0.5 }}>
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 400, color: A.ink, marginBottom: 12 }}>
                Nothing Saved Yet
              </h3>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7, marginBottom: 8, maxWidth: 400, margin: '0 auto 8px' }}>
                Browse our workshop to find pieces that speak to you. Save your favourites here for later.
              </p>
              <p style={{ fontFamily: 'Caveat, cursive', fontSize: 15, color: A.gold, marginBottom: 28 }}>
                Every great collection begins with a single piece.
              </p>
              <AtelierButton href="/atelier/collections">Browse the Workshop</AtelierButton>
            </div>
          </RevealSection>
        </div>
      </AtelierSection>
    </AtelierLayout>
  )
}
