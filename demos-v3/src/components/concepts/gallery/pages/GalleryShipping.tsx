'use client'

import React from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { Truck, RotateCcw, Shield, Globe } from 'lucide-react'

const policies = [
  { icon: Truck, title: 'Complimentary Shipping', desc: 'All orders ship free worldwide via insured courier. Domestic orders arrive within 3-5 business days; international within 7-14 business days.' },
  { icon: Shield, title: 'Fully Insured', desc: 'Every shipment is fully insured from our gallery to your door. Signature confirmation required for all deliveries.' },
  { icon: Globe, title: 'International Delivery', desc: 'We ship to over 60 countries. Import duties and taxes may apply and are the responsibility of the recipient.' },
  { icon: RotateCcw, title: '30-Day Returns', desc: 'Unworn pieces may be returned within 30 days of delivery in their original packaging for a full refund. Bespoke pieces are non-returnable.' },
]

export function GalleryShipping() {
  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 80px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <MuseumCaption align="center">Delivery & Returns</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, color: G.text, margin: '16px 0 16px' }}>
          Shipping & Returns
        </h1>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px 140px' }}>
        {policies.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 24, padding: '36px 0', borderBottom: `1px solid ${G.border}`, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, border: `1px solid ${G.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <p.icon size={18} color={G.accent} strokeWidth={1.5} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1rem', fontWeight: 400, color: G.text, margin: '0 0 8px' }}>{p.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: G.textSecondary, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </GalleryLayout>
  )
}
