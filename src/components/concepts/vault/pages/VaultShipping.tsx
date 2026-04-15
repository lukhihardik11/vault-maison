'use client'
import { VaultLayout } from '../VaultLayout'
import { Truck, Shield, Globe, RotateCcw } from 'lucide-react'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

export function VaultShipping() {
  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Delivery</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Shipping & Returns</h1>
          <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '20px auto 0' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 80 }}>
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'Complimentary insured shipping on all orders worldwide.' },
            { icon: Shield, title: 'Fully Insured', desc: 'Every shipment is fully insured from our vault to your door.' },
            { icon: Globe, title: 'Global Delivery', desc: 'We ship to over 40 countries with tracked, secure courier.' },
            { icon: RotateCcw, title: '30-Day Returns', desc: 'Full refund within 30 days for standard collection pieces.' },
          ].map((s) => (
            <div key={s.title} style={{
              textAlign: 'center', padding: 36, backgroundColor: SURFACE, borderRadius: 10,
              border: '1px solid rgba(212,175,55,0.08)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', margin: '0 auto 20px',
                backgroundColor: 'rgba(212,175,55,0.04)',
                border: '1px solid rgba(212,175,55,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <s.icon size={22} color={GOLD} />
              </div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 400, color: TEXT, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(234,234,234,0.4)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Worldwide</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 400, color: TEXT, marginTop: 10 }}>Delivery Times</h2>
          </div>
          <div style={{ backgroundColor: SURFACE, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '14px 28px', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
              <span style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase' }}>Region</span>
              <span style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase' }}>Delivery</span>
              <span style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase' }}>Cost</span>
            </div>
            {[
              { region: 'United States', time: '2-3 business days', cost: 'Complimentary' },
              { region: 'Canada', time: '3-5 business days', cost: 'Complimentary' },
              { region: 'Europe', time: '4-6 business days', cost: 'Complimentary' },
              { region: 'Asia Pacific', time: '5-7 business days', cost: 'Complimentary' },
              { region: 'Rest of World', time: '7-10 business days', cost: 'Complimentary' },
            ].map((r, i) => (
              <div key={r.region} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '16px 28px', borderBottom: i < 4 ? '1px solid rgba(212,175,55,0.04)' : 'none' }}>
                <span style={{ fontSize: 14, color: TEXT }}>{r.region}</span>
                <span style={{ fontSize: 14, color: 'rgba(234,234,234,0.4)' }}>{r.time}</span>
                <span style={{ fontSize: 14, color: GOLD }}>{r.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VaultLayout>
  )
}
