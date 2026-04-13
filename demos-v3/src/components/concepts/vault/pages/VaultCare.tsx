'use client'
import { VaultLayout } from '../VaultLayout'
import { Sparkles, Droplets, Shield, Clock } from 'lucide-react'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

export function VaultCare() {
  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>Jewelry Care</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 42, fontWeight: 400, color: TEXT, marginTop: 12 }}>Caring for Your Pieces</h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 900, margin: '0 auto' }}>
          {[
            { icon: Sparkles, title: 'Cleaning', desc: 'Gently clean your jewelry with a soft cloth after each wear. For deeper cleaning, use warm water with mild soap and a soft brush. Avoid ultrasonic cleaners for pieces with delicate settings.' },
            { icon: Droplets, title: 'Storage', desc: 'Store each piece separately in the provided Vault Maison pouch or box to prevent scratching. Keep away from humidity and direct sunlight. Use anti-tarnish strips for silver pieces.' },
            { icon: Shield, title: 'Protection', desc: 'Remove jewelry before swimming, exercising, or using chemicals. Apply perfume and cosmetics before putting on your jewelry. Avoid exposing gemstones to extreme temperatures.' },
            { icon: Clock, title: 'Maintenance', desc: 'We recommend professional inspection every 12 months. Vault Maison offers complimentary lifetime cleaning and inspection for all purchases. Prong tightening is included.' },
          ].map((c) => (
            <div key={c.title} style={{ padding: 32, backgroundColor: SURFACE, borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)' }}>
              <c.icon size={28} color={GOLD} style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 500, color: TEXT, marginBottom: 12 }}>{c.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(234,234,234,0.5)' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </VaultLayout>
  )
}
