'use client'

import React from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { SalonButton } from '../ui/SalonButton'
import { Truck, Clock, RotateCcw, Shield } from 'lucide-react'

const policies = [
  { icon: <Truck size={20} />, title: 'Complimentary Delivery', desc: 'All orders ship free via insured express courier. Your piece arrives in our signature gift packaging.' },
  { icon: <Clock size={20} />, title: 'Delivery Times', desc: 'Standard: 3-5 business days. Express: 1-2 business days. International: 5-10 business days.' },
  { icon: <RotateCcw size={20} />, title: '30-Day Returns', desc: 'Not quite right? Return within 30 days for a full refund. We\'ll even arrange the pickup.' },
  { icon: <Shield size={20} />, title: 'Fully Insured', desc: 'Every shipment is fully insured from our atelier to your door. Track your order in real-time.' },
]

export function SalonShipping() {
  return (
    <SalonLayout>
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>Delivery & Returns</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: S.text, margin: '0 0 16px' }}>Shipping & Returns</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          We make the delivery experience as special as the piece itself.
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {policies.map((p) => (
            <div key={p.title} style={{ background: S.surface, borderRadius: S.radiusLg, padding: '28px', border: `1px solid ${S.border}` }}>
              <div style={{ width: 48, height: 48, borderRadius: S.radius, background: S.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.accent, marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 400, color: S.text, margin: '0 0 8px' }}>{p.title}</h3>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.82rem', color: S.textSecondary, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '60px 32px 80px', background: S.warmPanel, textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>Questions About Your Order?</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, marginBottom: 24 }}>Our team is here to help with any delivery concerns.</p>
        <SalonButton href="/salon/contact">Get in Touch</SalonButton>
      </section>
    </SalonLayout>
  )
}
