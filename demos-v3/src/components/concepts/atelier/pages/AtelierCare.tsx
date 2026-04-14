'use client'
import React from 'react'
import { AtelierLayout, A } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'

const careGuides = [
  { title: 'Daily Wear', tips: ['Remove jewelry before exercising, swimming, or cleaning', 'Apply perfume and cosmetics before putting on jewelry', 'Store pieces separately to prevent scratching'] },
  { title: 'Cleaning', tips: ['Use a soft lint-free cloth for regular polishing', 'Warm water with mild soap for deeper cleaning', 'Avoid ultrasonic cleaners for pieces with delicate settings'] },
  { title: 'Storage', tips: ['Store in the provided workshop pouch or box', 'Keep in a cool, dry place away from direct sunlight', 'Use anti-tarnish strips for silver pieces'] },
  { title: 'Professional Service', tips: ['Annual inspection recommended for all fine jewelry', 'Prong tightening every 12–18 months', 'Professional cleaning restores original brilliance'] },
]

export function AtelierCare() {
  return (
    <AtelierLayout>
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>Care Guide</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 16px' }}>Caring for Your Piece</h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7 }}>
            A handcrafted piece deserves thoughtful care. Follow these guidelines to keep your jewelry looking its best for generations.
          </p>
        </div>
      </section>
      <section style={{ padding: '0 32px 100px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {careGuides.map((g, i) => (
            <div key={i} style={{ background: A.surface, border: `1px solid ${A.border}`, borderRadius: 2, padding: 32 }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, marginBottom: 16 }}>{g.title}</h3>
              {g.tips.map((t, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: A.accent, fontSize: 14, marginTop: 2 }}>✦</span>
                  <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '40px 32px 80px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: 16, color: A.sketch, marginBottom: 24 }}>Need professional care? Our artisans are always here to help.</p>
        <AtelierButton href="/atelier/contact">Book a Service</AtelierButton>
      </section>
    </AtelierLayout>
  )
}
