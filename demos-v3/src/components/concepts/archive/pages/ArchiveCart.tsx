'use client'
import React from 'react'
import { AR, ArchiveSection, RevealSection, GoldRule } from '../ArchiveLayout'
import { ArchiveButton } from '../ui'
import { Shield } from 'lucide-react'
import { formatPrice } from '@/data/products'

const sampleItems = [
  { id: 'VM-DR001', name: 'Art Deco Diamond Solitaire', period: 'c. 1925', price: 12800, authenticated: true },
  { id: 'VM-GN003', name: 'Victorian Gold Locket Necklace', period: 'c. 1880', price: 4200, authenticated: true },
]

export function ArchiveCart() {
  const items = sampleItems
  const total = items.reduce((s, i) => s + i.price, 0)

  return (
    <>
      <section style={{ background: AR.bg, padding: '48px 32px 24px', borderBottom: `1px solid ${AR.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 8 }}>
            ACQUISITION LIST
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: AR.text }}>
            Your Selections
          </h1>
        </div>
      </section>

      <ArchiveSection>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48 }}>
          <div>
            {items.map((item, i) => (
              <RevealSection key={item.id} delay={i * 100}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0',
                  borderBottom: `1px solid ${AR.border}`,
                }}>
                  <div>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: AR.accent, marginBottom: 4 }}>
                      CAT. {item.id}
                    </p>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 500, color: AR.text, marginBottom: 4 }}>
                      {item.name}
                    </h3>
                    <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.85rem', color: AR.textSecondary }}>
                      {item.period} &middot; {item.authenticated ? 'Authenticated' : 'Pending'}
                    </p>
                  </div>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.95rem', color: AR.text, fontWeight: 600 }}>
                    {formatPrice(item.price)}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>

          <div style={{ background: AR.card, border: `1px solid ${AR.border}`, padding: '32px', alignSelf: 'start' }}>
            <h3 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: AR.accent, marginBottom: 24 }}>
              ORDER SUMMARY
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: "'Crimson Text', serif", color: AR.textSecondary }}>Subtotal</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: AR.text }}>{formatPrice(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontFamily: "'Crimson Text', serif", color: AR.textSecondary }}>Authentication</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: '#4CAF50', fontSize: '0.85rem' }}>Included</span>
            </div>
            <GoldRule style={{ marginBottom: 16 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: AR.text }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: AR.accent, fontWeight: 600 }}>{formatPrice(total)}</span>
            </div>
            <ArchiveButton style={{ width: '100%' }} href="/archive/checkout">Proceed to Acquisition</ArchiveButton>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, justifyContent: 'center' }}>
              <Shield size={14} color={AR.accent} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: AR.textSecondary }}>
                Includes certificate of authenticity
              </span>
            </div>
          </div>
        </div>
      </ArchiveSection>
    </>
  )
}
