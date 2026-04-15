'use client'
import React from 'react'
import { MK, MarketplaceSection, RevealSection, StaggerItem, SectionLabel } from '../MarketplaceLayout'
import { Truck, Shield, Globe, Clock, Package, MapPin } from 'lucide-react'

export function MarketplaceShipping() {
  const methods = [
    { icon: <Truck size={20} />, title: 'Insured Express', time: '2-3 Business Days', price: 'Free over $5,000', desc: 'Fully insured, temperature-controlled courier with signature and GPS tracking.' },
    { icon: <Clock size={20} />, title: 'Priority Overnight', time: 'Next Business Day', price: '$95', desc: 'Overnight delivery for urgent acquisitions. Domestic orders only.' },
    { icon: <Globe size={20} />, title: 'International', time: '5-7 Business Days', price: 'From $175', desc: 'Worldwide shipping with customs handling, full insurance, and duty calculation.' },
  ]

  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Delivery" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2.5rem', fontWeight: 700, color: MK.text, margin: '0 0 12px' }}>Shipping &amp; Delivery</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MK.textSecondary }}>Secure, insured delivery for every acquisition.</p>
        </div>
      </section>

      <MarketplaceSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {methods.map((method, i) => (
            <StaggerItem key={i} index={i}>
              <div className="marketplace-card-hover" style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, padding: 24 }}>
                <div style={{ color: MK.accent, marginBottom: 12 }}>{method.icon}</div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 600, color: MK.text, margin: '0 0 4px' }}>{method.title}</h3>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: MK.accent, marginBottom: 8 }}>{method.time} — {method.price}</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.textSecondary, lineHeight: 1.7, margin: 0 }}>{method.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </MarketplaceSection>

      <MarketplaceSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, textAlign: 'center' }}>
            {[
              { icon: <Shield size={24} />, label: 'Full Insurance', desc: 'Every shipment is fully insured against loss or damage.' },
              { icon: <Package size={24} />, label: 'Signature Required', desc: 'All deliveries require an adult signature for security.' },
              { icon: <MapPin size={24} />, label: 'GPS Tracking', desc: 'Real-time tracking from our vault to your door.' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ color: MK.accent, marginBottom: 10, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: MK.text, margin: '0 0 6px' }}>{item.label}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MK.textSecondary, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </MarketplaceSection>
    </>
  )
}
