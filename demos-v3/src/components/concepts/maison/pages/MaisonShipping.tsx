'use client'
import React from 'react'
import { MS, MaisonSection, RevealSection, StaggerItem, SectionLabel } from '../MaisonLayout'
import { FeatureIcon } from '../ui'
import { Truck, Shield, Globe, Clock, Package, Gift } from 'lucide-react'

export function MaisonShipping() {
  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionLabel label="Delivery" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 600, color: MS.text, margin: '0 0 12px' }}>Shipping &amp; Delivery</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MS.textSecondary }}>Every piece delivered with the care it deserves.</p>
        </div>
      </section>

      <MaisonSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { icon: <Truck size={22} />, title: 'Standard Delivery', desc: '3-5 business days. Complimentary on orders over $5,000. Fully insured with tracking.' },
            { icon: <Clock size={22} />, title: 'Express Delivery', desc: 'Next business day. Available for domestic orders. $75 flat rate.' },
            { icon: <Globe size={22} />, title: 'International', desc: '5-10 business days. Worldwide delivery with customs handling and full insurance.' },
          ].map((item, i) => (
            <StaggerItem key={i} index={i}>
              <div className="maison-card-hover" style={{ background: MS.card, border: `1px solid ${MS.borderLight}`, borderRadius: 4, padding: 28, textAlign: 'center' }}>
                <div style={{ color: MS.accent, marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 600, color: MS.text, margin: '0 0 8px' }}>{item.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </MaisonSection>

      <MaisonSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, textAlign: 'center' }}>
            <FeatureIcon icon={<Shield size={22} />} title="Fully Insured" description="Every shipment is insured against loss or damage." />
            <FeatureIcon icon={<Package size={22} />} title="Signature Required" description="All deliveries require an adult signature." />
            <FeatureIcon icon={<Gift size={22} />} title="Gift Wrapping" description="Complimentary gift wrapping with every order." />
          </div>
        </RevealSection>
      </MaisonSection>
    </>
  )
}
