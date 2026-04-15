'use client'
import React from 'react'
import { OB, ObservatorySection, RevealSection, StaggerItem, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton } from '../ui'
import { Truck, Shield, Clock, Globe, Package, MapPin } from 'lucide-react'

export function ObservatoryShipping() {
  const shippingOptions = [
    { icon: <Truck size={20} />, title: 'Standard Insured', time: '3-5 Business Days', price: 'Complimentary', desc: 'Fully insured courier delivery with signature confirmation and GPS tracking.' },
    { icon: <Clock size={20} />, title: 'Priority Express', time: '1-2 Business Days', price: '$75', desc: 'Next-day delivery with dedicated courier, temperature-controlled transport, and real-time tracking.' },
    { icon: <Globe size={20} />, title: 'International', time: '5-7 Business Days', price: 'From $150', desc: 'Worldwide delivery with customs handling, full insurance, and door-to-door tracking.' },
  ]

  return (
    <>
      <section style={{ background: OB.bg, padding: '100px 0 40px', borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <Package size={20} color={OB.accent} style={{ margin: '0 auto 12px' }} />
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: OB.text, margin: '0 0 12px' }}>Shipping & Delivery</h1>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary }}>Secure, insured delivery for every acquisition.</p>
        </div>
      </section>

      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {shippingOptions.map((opt, i) => (
            <StaggerItem key={i} index={i}>
              <div className="observatory-card-hover" style={{ background: OB.card, border: `1px solid ${OB.border}`, padding: 32, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: OB.accent, marginBottom: 16 }}>{opt.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', fontWeight: 500, color: OB.text, margin: '0 0 8px' }}>{opt.title}</h3>
                <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.accent }}>{opt.time}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.success }}>{opt.price}</span>
                </div>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary, lineHeight: 1.7, margin: 0, flex: 1 }}>{opt.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ObservatorySection>

      <ObservatorySection alt>
        <RevealSection>
          <ScanLine label="Security Protocols" style={{ marginBottom: 32 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { icon: <Shield size={16} />, title: 'Full Insurance', desc: 'Every shipment is insured for the full retail value of its contents from our facility to your door.' },
              { icon: <MapPin size={16} />, title: 'GPS Tracking', desc: 'Real-time GPS tracking allows you to monitor your package at every stage of transit.' },
              { icon: <Package size={16} />, title: 'Tamper-Evident', desc: 'Custom tamper-evident packaging with unique serial numbers ensures your piece arrives untouched.' },
              { icon: <Clock size={16} />, title: 'Signature Required', desc: 'All deliveries require in-person signature from the registered recipient for security.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: 20, background: OB.card, border: `1px solid ${OB.border}` }}>
                <span style={{ color: OB.accent }}>{item.icon}</span>
                <div>
                  <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: OB.text, margin: '0 0 4px' }}>{item.title}</h4>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </ObservatorySection>
    </>
  )
}
