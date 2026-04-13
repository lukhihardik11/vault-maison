'use client'
import { VaultLayout } from '../VaultLayout'
import { Sparkles, Droplets, Shield, Clock } from 'lucide-react'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

export function VaultCare() {
  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Jewelry Care</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Caring for Your Pieces</h1>
          <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '20px auto 0' }} />
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(234,234,234,0.45)', maxWidth: 600, margin: '24px auto 0' }}>
            Preserve the brilliance and beauty of your Vault Maison treasures with these essential care guidelines.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 960, margin: '0 auto' }}>
          {[
            { icon: Sparkles, title: 'Cleaning', desc: 'Gently clean your jewelry with a soft cloth after each wear. For deeper cleaning, use warm water with mild soap and a soft brush. Avoid ultrasonic cleaners for pieces with delicate settings.' },
            { icon: Droplets, title: 'Storage', desc: 'Store each piece separately in the provided Vault Maison pouch or box to prevent scratching. Keep away from humidity and direct sunlight. Use anti-tarnish strips for silver pieces.' },
            { icon: Shield, title: 'Protection', desc: 'Remove jewelry before swimming, exercising, or using chemicals. Apply perfume and cosmetics before putting on your jewelry. Avoid exposing gemstones to extreme temperatures.' },
            { icon: Clock, title: 'Maintenance', desc: 'We recommend professional inspection every 12 months. Vault Maison offers complimentary lifetime cleaning and inspection for all purchases. Prong tightening is included.' },
          ].map((c) => (
            <div key={c.title} style={{
              padding: 36, backgroundColor: SURFACE, borderRadius: 10,
              border: '1px solid rgba(212,175,55,0.08)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', marginBottom: 20,
                backgroundColor: 'rgba(212,175,55,0.04)',
                border: '1px solid rgba(212,175,55,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <c.icon size={22} color={GOLD} />
              </div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 400, color: TEXT, marginBottom: 12 }}>{c.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(234,234,234,0.4)' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </VaultLayout>
  )
}
