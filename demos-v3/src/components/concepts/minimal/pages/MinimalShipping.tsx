'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { Truck, Clock, Globe, Shield, Package, ArrowRight } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const methods = [
  { icon: Truck, title: 'Standard Shipping', time: '5-7 Business Days', price: 'Complimentary', desc: 'Fully insured FedEx delivery with signature required. Includes tracking and our signature packaging.' },
  { icon: Clock, title: 'Express Shipping', time: '2-3 Business Days', price: '$35', desc: 'Priority FedEx delivery with full insurance. Ideal for time-sensitive occasions.' },
  { icon: Package, title: 'White Glove Delivery', time: 'Next Business Day', price: '$75', desc: 'Premium hand-delivery service in select metropolitan areas. Your piece arrives in a presentation box with a personal note.' },
  { icon: Globe, title: 'International Shipping', time: '7-14 Business Days', price: 'From $50', desc: 'Insured international delivery to over 40 countries. Import duties and taxes may apply at destination.' },
]

export function MinimalShipping() {
  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '80px 5vw 0', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '16px' }}>Delivery</p>
        <h1 style={{ fontFamily: font, fontSize: '40px', fontWeight: 200, color: '#1A1A1A', marginBottom: '12px' }}>Shipping & Returns</h1>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: '#9B9590', maxWidth: '500px', margin: '0 auto' }}>
          Every order is carefully packaged and fully insured from our atelier to your door.
        </p>
      </section>

      {/* Shipping Methods */}
      <section style={{ padding: '60px 5vw', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="vm-ship-grid">
          {methods.map((m, i) => (
            <div key={i} style={{ padding: '32px', border: '1px solid #E8E5E0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <m.icon size={22} strokeWidth={1.5} style={{ color: '#C4A265' }} />
                <div>
                  <h3 style={{ fontFamily: font, fontSize: '16px', fontWeight: 500, color: '#1A1A1A' }}>{m.title}</h3>
                  <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9590' }}>{m.time}</p>
                </div>
              </div>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: '#555', marginBottom: '12px' }}>{m.desc}</p>
              <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: m.price === 'Complimentary' ? '#C4A265' : '#1A1A1A' }}>{m.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Returns */}
      <section style={{ padding: '60px 5vw 0', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ padding: '40px', backgroundColor: '#F5F4F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Shield size={22} strokeWidth={1.5} style={{ color: '#C4A265' }} />
            <h2 style={{ fontFamily: font, fontSize: '20px', fontWeight: 300, color: '#1A1A1A' }}>Returns & Exchanges</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="vm-returns-grid">
            <div>
              <h3 style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A', marginBottom: '8px' }}>30-Day Return Policy</h3>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#555' }}>
                We offer a hassle-free 30-day return policy for unworn items in their original condition and packaging. Bespoke and engraved pieces are final sale.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A', marginBottom: '8px' }}>How to Return</h3>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#555' }}>
                Contact our concierge team to initiate a return. We will provide a prepaid, insured shipping label. Refunds are processed within 5 business days of receiving your item.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 5vw 100px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#9B9590', marginBottom: '16px' }}>Have questions about your order?</p>
        <Link href="/minimal/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C4A265', textDecoration: 'none' }}>
          Contact Our Concierge <ArrowRight size={14} />
        </Link>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-ship-grid { grid-template-columns: 1fr !important; }
          .vm-returns-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
