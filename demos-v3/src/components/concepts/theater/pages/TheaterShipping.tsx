'use client'
import React from 'react'
import { TH, TheaterSection, RevealSection, StaggerItem, ActLabel, GoldRule } from '../TheaterLayout'
import { Truck, Shield, Globe, Clock, Package, MapPin } from 'lucide-react'

export function TheaterShipping() {
  const methods = [
    { icon: <Truck size={20} />, title: 'Insured Express', time: '2-3 Business Days', price: 'Complimentary', desc: 'Fully insured, temperature-controlled courier with signature requirement.' },
    { icon: <Clock size={20} />, title: 'Priority Overnight', time: 'Next Business Day', price: '$75', desc: 'Overnight delivery for urgent needs. Available for domestic orders only.' },
    { icon: <Globe size={20} />, title: 'International', time: '5-7 Business Days', price: 'From $150', desc: 'Worldwide shipping with customs handling and full insurance coverage.' },
  ]

  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <ActLabel label="Delivery" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: TH.text, margin: '0 0 12px' }}>Shipping &amp; Delivery</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary }}>Every delivery is a performance in itself — secure, discreet, and impeccable.</p>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {methods.map((method, i) => (
            <StaggerItem key={i} index={i}>
              <div className="theater-card-hover" style={{ background: TH.card, border: `1px solid ${TH.border}`, padding: 28 }}>
                <div style={{ color: TH.gold, marginBottom: 16 }}>{method.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 500, color: TH.text, margin: '0 0 4px' }}>{method.title}</h3>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', color: TH.accent, marginBottom: 8 }}>{method.time} — {method.price}</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary, lineHeight: 1.7, margin: 0 }}>{method.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </TheaterSection>

      <TheaterSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, textAlign: 'center' }}>
            {[
              { icon: <Shield size={24} />, label: 'Full Insurance', desc: 'Every shipment is fully insured against loss or damage.' },
              { icon: <Package size={24} />, label: 'Signature Required', desc: 'All deliveries require an adult signature for security.' },
              { icon: <MapPin size={24} />, label: 'GPS Tracking', desc: 'Real-time tracking from our vault to your door.' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ color: TH.gold, marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', color: TH.text, margin: '0 0 8px' }}>{item.label}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: TH.textSecondary, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </TheaterSection>
    </>
  )
}
