'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { Truck, Clock, Globe, Shield, Package, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react'

const F = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const methods = [
  { icon: Truck, title: 'Standard Shipping', time: '5–7 Business Days', price: 'Complimentary', desc: 'Fully insured FedEx delivery with signature required. Includes real-time tracking and our signature packaging. Available for all domestic orders.' },
  { icon: Clock, title: 'Express Shipping', time: '2–3 Business Days', price: '$35', desc: 'Priority FedEx delivery with full insurance and signature confirmation. Ideal for time-sensitive occasions. Order by 2:00 PM EST for same-day dispatch.' },
  { icon: Package, title: 'White Glove Delivery', time: 'Next Business Day', price: '$75', desc: 'Premium hand-delivery service in select metropolitan areas (NYC, LA, Chicago, Miami, SF). Your piece arrives in a presentation box with a personal note.' },
  { icon: Globe, title: 'International Shipping', time: '7–14 Business Days', price: 'From $50', desc: 'Insured international delivery to over 40 countries via FedEx International Priority. Import duties and taxes are calculated at checkout for select destinations.' },
]

const packagingFeatures = [
  'Tamper-evident security seal on every package',
  'Signature jewelry box with magnetic closure',
  'Microfiber polishing cloth included',
  'Certificate of authenticity enclosed',
  'Discreet exterior packaging — no branding visible',
  'Recyclable and sustainably sourced materials',
]

const faqs = [
  { q: 'Can I change my shipping address after placing an order?', a: 'Yes, within 2 hours of placing your order. Contact our concierge team immediately. Once the package has been dispatched, the address cannot be changed.' },
  { q: 'What happens if I am not home for delivery?', a: 'All shipments require a signature. If you are unavailable, FedEx will attempt redelivery the next business day. After 3 attempts, the package will be held at the nearest FedEx location for 7 days.' },
  { q: 'Do you ship to P.O. boxes?', a: 'No. Due to the high value of our products and the signature requirement, we cannot ship to P.O. boxes or APO/FPO addresses.' },
  { q: 'How do I track my order?', a: 'You will receive a tracking number via email within 24 hours of dispatch. You can also track your order in real-time from your account dashboard.' },
  { q: 'What if my item arrives damaged?', a: 'In the unlikely event of damage during transit, contact us within 48 hours with photos. We will arrange an immediate replacement or full refund at no cost to you. All shipments are fully insured.' },
  { q: 'Can I return a custom or engraved piece?', a: 'Custom, bespoke, and engraved items are final sale and cannot be returned unless there is a manufacturing defect. We recommend reviewing all customization details carefully before confirming your order.' },
]

export function MinimalShipping() {
  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '80px 5vw 0', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: F, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>Delivery</p>
        <h1 style={{ fontFamily: F, fontSize: '40px', fontWeight: 600, color: '#050505', marginBottom: '12px', letterSpacing: '-0.02em' }}>Shipping & Returns</h1>
        <p style={{ fontFamily: F, fontSize: '14px', fontWeight: 400, lineHeight: 1.8, color: '#9B9B9B', maxWidth: '500px', margin: '0 auto' }}>
          Every order is carefully packaged and fully insured from our atelier to your door.
        </p>
      </section>

      {/* Shipping Methods */}
      <section style={{ padding: '60px 5vw', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="vm-ship-grid">
          {methods.map((m, i) => (
            <div key={i} style={{ padding: '32px', border: '1px solid #E5E5E5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <m.icon size={22} strokeWidth={1.5} style={{ color: '#050505' }} />
                <div>
                  <h3 style={{ fontFamily: F, fontSize: '16px', fontWeight: 500, color: '#050505', margin: 0 }}>{m.title}</h3>
                  <p style={{ fontFamily: F, fontSize: '11px', fontWeight: 400, color: '#9B9B9B', margin: 0 }}>{m.time}</p>
                </div>
              </div>
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, lineHeight: 1.7, color: '#555', marginBottom: '12px' }}>{m.desc}</p>
              <p style={{ fontFamily: F, fontSize: '14px', fontWeight: 500, color: '#050505' }}>{m.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packaging */}
      <section style={{ padding: '0 5vw 60px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: F, fontSize: '20px', fontWeight: 400, color: '#050505', marginBottom: '24px' }}>Our Packaging</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="vm-pack-grid">
          {packagingFeatures.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckCircle size={14} strokeWidth={1.5} style={{ color: '#050505', marginTop: '2px', flexShrink: 0 }} />
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, lineHeight: 1.7, color: '#555', margin: 0 }}>{f}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Insurance */}
      <section style={{ padding: '0 5vw 60px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ border: '1px solid #050505', padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Shield size={20} strokeWidth={1.5} style={{ color: '#050505' }} />
            <h2 style={{ fontFamily: F, fontSize: '18px', fontWeight: 400, color: '#050505', margin: 0 }}>Full Insurance Coverage</h2>
          </div>
          <p style={{ fontFamily: F, fontSize: '14px', fontWeight: 400, lineHeight: 1.9, color: '#555', marginBottom: '12px' }}>
            Every shipment is insured for its full retail value from the moment it leaves our facility until it is signed for at your door. In the event of loss, theft, or damage during transit, we will replace the item or issue a complete refund — no deductibles, no claims process, no exceptions.
          </p>
          <p style={{ fontFamily: F, fontSize: '12px', fontWeight: 400, color: '#9B9B9B' }}>
            Insurance is included at no additional cost on all shipping methods.
          </p>
        </div>
      </section>

      {/* Returns */}
      <section style={{ padding: '0 5vw 60px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ padding: '40px', backgroundColor: '#FAFAFA' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Shield size={22} strokeWidth={1.5} style={{ color: '#050505' }} />
            <h2 style={{ fontFamily: F, fontSize: '20px', fontWeight: 400, color: '#050505', margin: 0 }}>Returns & Exchanges</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="vm-returns-grid">
            <div>
              <h3 style={{ fontFamily: F, fontSize: '14px', fontWeight: 500, color: '#050505', marginBottom: '8px' }}>30-Day Return Policy</h3>
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, lineHeight: 1.8, color: '#555', marginBottom: '12px' }}>
                We offer a hassle-free 30-day return policy for unworn items in their original condition and packaging with all tags and certificates intact.
              </p>
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, lineHeight: 1.8, color: '#555' }}>
                Bespoke, custom, and engraved pieces are final sale unless there is a manufacturing defect.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: F, fontSize: '14px', fontWeight: 500, color: '#050505', marginBottom: '8px' }}>How to Return</h3>
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, lineHeight: 1.8, color: '#555', marginBottom: '12px' }}>
                1. Contact our concierge team via email or phone to initiate a return.
              </p>
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, lineHeight: 1.8, color: '#555', marginBottom: '12px' }}>
                2. We will provide a prepaid, fully insured shipping label within 24 hours.
              </p>
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, lineHeight: 1.8, color: '#555', marginBottom: '12px' }}>
                3. Pack the item securely in its original packaging and drop off at any FedEx location.
              </p>
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, lineHeight: 1.8, color: '#555' }}>
                4. Refunds are processed within 5–10 business days of receiving and inspecting the item.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 5vw 60px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <HelpCircle size={20} strokeWidth={1.5} style={{ color: '#050505' }} />
          <h2 style={{ fontFamily: F, fontSize: '20px', fontWeight: 400, color: '#050505', margin: 0 }}>Frequently Asked Questions</h2>
        </div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid #E5E5E5', paddingBottom: '20px', marginBottom: '20px' }}>
            <p style={{ fontFamily: F, fontSize: '14px', fontWeight: 500, color: '#050505', marginBottom: '8px' }}>{faq.q}</p>
            <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 400, lineHeight: 1.8, color: '#555', margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </section>

      {/* CTA + Cross-links */}
      <section style={{ padding: '0 5vw 100px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: F, fontSize: '14px', fontWeight: 400, color: '#9B9B9B', marginBottom: '16px' }}>Have questions about your order?</p>
        <Link href="/minimal/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: F, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#050505', textDecoration: 'none', marginBottom: '32px' }}>
          Contact Our Concierge <ArrowRight size={14} />
        </Link>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px' }}>
          <Link href="/minimal/privacy" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Privacy Policy
          </Link>
          <Link href="/minimal/terms" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Terms of Service
          </Link>
          <Link href="/minimal/authenticity" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Authenticity Guarantee
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-ship-grid { grid-template-columns: 1fr !important; }
          .vm-returns-grid { grid-template-columns: 1fr !important; }
          .vm-pack-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
