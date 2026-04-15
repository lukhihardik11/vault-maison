'use client'
import React from 'react'
import { AR, ArchiveSection, RevealSection } from '../ArchiveLayout'
import { ArchiveButton } from '../ui'
import { Heart, BookOpen } from 'lucide-react'

export function ArchiveWishlist() {
  return (
    <>
      <section style={{ background: AR.bg, padding: '48px 32px 24px', borderBottom: `1px solid ${AR.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 8 }}>SAVED RECORDS</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: AR.text }}>Watchlist</h1>
        </div>
      </section>

      <ArchiveSection>
        <RevealSection>
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: AR.accentSoft, border: `1px solid ${AR.accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <Heart size={24} color={AR.accent} />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 500, color: AR.text, marginBottom: 12 }}>
              Your Watchlist is Empty
            </h2>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1rem', color: AR.textSecondary, marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
              Save pieces from the catalog to monitor availability and track price changes.
            </p>
            <ArchiveButton href="/archive/collections">Browse Catalog</ArchiveButton>
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
