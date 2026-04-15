'use client'
import React from 'react'
import { AtelierLayout, A, AtelierSection, RevealSection, StaggerItem, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'

const careGuides = [
  { title: 'Daily Wear', icon: '✦', tips: ['Remove jewelry before exercising, swimming, or cleaning', 'Apply perfume and cosmetics before putting on jewelry', 'Store pieces separately to prevent scratching'] },
  { title: 'Cleaning', icon: '◇', tips: ['Use a soft lint-free cloth for regular polishing', 'Warm water with mild soap for deeper cleaning', 'Avoid ultrasonic cleaners for pieces with delicate settings'] },
  { title: 'Storage', icon: '○', tips: ['Store in the provided workshop pouch or box', 'Keep in a cool, dry place away from direct sunlight', 'Use anti-tarnish strips for silver pieces'] },
  { title: 'Professional Service', icon: '♡', tips: ['Annual inspection recommended for all fine jewelry', 'Prong tightening every 12–18 months', 'Professional cleaning restores original brilliance'] },
]

export function AtelierCare() {
  return (
    <AtelierLayout>
      <AtelierSection style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <RevealSection>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>Care Guide</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: A.ink, margin: '0 0 12px' }}>Caring for Your Piece</h1>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7 }}>
              A handcrafted piece deserves thoughtful care. Follow these guidelines to keep your jewelry looking its best for generations.
            </p>
          </div>
        </RevealSection>
      </AtelierSection>

      <AtelierSection alt style={{ padding: '48px 32px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {careGuides.map((g, i) => (
            <StaggerItem key={i} index={i}>
              <div style={{
                background: A.surface, border: `1px dashed ${A.sketch}`, borderRadius: 2,
                padding: '32px 28px', boxShadow: `inset 0 1px 2px ${A.shadow}`,
              }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: A.accent, marginBottom: 12, opacity: 0.5 }}>{g.icon}</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, marginBottom: 16 }}>{g.title}</h3>
                {g.tips.map((t, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={A.gold} strokeWidth="2" style={{ marginTop: 4, flexShrink: 0 }}>
                      <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5Z"/>
                    </svg>
                    <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>
          ))}
        </div>
      </AtelierSection>

      <AtelierSection style={{ padding: '60px 32px 80px' }}>
        <RevealSection>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: A.gold, marginBottom: 24 }}>
              Need professional care? Our artisans are always here to help.
            </p>
            <AtelierButton href="/atelier/contact">Book a Service</AtelierButton>
          </div>
        </RevealSection>
      </AtelierSection>
    </AtelierLayout>
  )
}
