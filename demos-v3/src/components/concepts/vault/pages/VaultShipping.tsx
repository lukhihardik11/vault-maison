'use client'
import { VaultLayout } from '../VaultLayout'
import { Truck, Shield, Globe, RotateCcw } from 'lucide-react'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

export function VaultShipping() {
  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>Delivery</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 42, fontWeight: 400, color: TEXT, marginTop: 12 }}>Shipping & Returns</h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 60 }}>
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'Complimentary insured shipping on all orders worldwide.' },
            { icon: Shield, title: 'Fully Insured', desc: 'Every shipment is fully insured from our vault to your door.' },
            { icon: Globe, title: 'Global Delivery', desc: 'We ship to over 40 countries with tracked, secure courier.' },
            { icon: RotateCcw, title: '30-Day Returns', desc: 'Full refund within 30 days for standard collection pieces.' },
          ].map((s) => (
            <div key={s.title} style={{ textAlign: 'center', padding: 32, backgroundColor: SURFACE, borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)' }}>
              <s.icon size={28} color={GOLD} style={{ margin: '0 auto 16px', display: 'block' }} />
              <h3 style={{ fontSize: 16, fontWeight: 500, color: TEXT, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(234,234,234,0.5)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, color: TEXT, marginBottom: 24 }}>Delivery Times</h2>
          <div style={{ backgroundColor: SURFACE, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.1)' }}>
            {[
              { region: 'United States', time: '2-3 business days', cost: 'Complimentary' },
              { region: 'Canada', time: '3-5 business days', cost: 'Complimentary' },
              { region: 'Europe', time: '4-6 business days', cost: 'Complimentary' },
              { region: 'Asia Pacific', time: '5-7 business days', cost: 'Complimentary' },
              { region: 'Rest of World', time: '7-10 business days', cost: 'Complimentary' },
            ].map((r, i) => (
              <div key={r.region} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '16px 24px', borderBottom: i < 4 ? '1px solid rgba(212,175,55,0.05)' : 'none' }}>
                <span style={{ fontSize: 14, color: TEXT }}>{r.region}</span>
                <span style={{ fontSize: 14, color: 'rgba(234,234,234,0.5)' }}>{r.time}</span>
                <span style={{ fontSize: 14, color: GOLD }}>{r.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VaultLayout>
  )
}
