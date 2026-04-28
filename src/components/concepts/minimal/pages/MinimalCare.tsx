'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { Droplets, ShieldCheck, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const tips = [
  { icon: Droplets, title: 'Cleaning', items: ['Clean gently with a soft, lint-free cloth after each wear', 'Use warm water with mild soap for deeper cleaning', 'Pat dry thoroughly — never use paper towels or tissues', 'Professional ultrasonic cleaning recommended every 6 months'] },
  { icon: ShieldCheck, title: 'Storage', items: ['Store each piece separately in its original box or a soft pouch', 'Keep away from direct sunlight and extreme temperatures', 'Use anti-tarnish strips for silver and white gold pieces', 'Store necklaces unclasped to prevent tangling'] },
  { icon: Sparkles, title: 'Wearing', items: ['Put jewelry on last — after perfume, lotion, and hairspray', 'Remove before swimming, exercising, or sleeping', 'Avoid contact with household chemicals and chlorine', 'Have prongs and settings checked annually by a professional'] },
  { icon: AlertTriangle, title: 'What to Avoid', items: ['Harsh chemicals, bleach, and abrasive cleaners', 'Ultrasonic cleaners for pearls, emeralds, or opals', 'Wearing jewelry during contact sports or heavy lifting', 'Storing multiple pieces together without separation'] },
]

export function MinimalCare() {
  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '80px 5vw 0', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>Jewelry Care</p>
        <h1 style={{ fontFamily: font, fontSize: '40px', fontWeight: 600, color: '#050505', marginBottom: '12px' }}>Care Guide</h1>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, lineHeight: 1.8, color: '#9B9B9B', maxWidth: '500px', margin: '0 auto' }}>
          Proper care ensures your Vault Maison pieces maintain their brilliance for generations. Follow these guidelines to protect your investment.
        </p>
      </section>

      {/* Tips Grid */}
      <section style={{ padding: '60px 5vw 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }} className="vm-care-grid">
          {tips.map((t, i) => (
            <div key={i} style={{ padding: '32px', backgroundColor: '#FAFAFA' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <t.icon size={22} strokeWidth={1.5} style={{ color: '#050505' }} />
                <h3 style={{ fontFamily: font, fontSize: '18px', fontWeight: 400, color: '#050505' }}>{t.title}</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {t.items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0', fontFamily: font, fontSize: '13px', fontWeight: 400, lineHeight: 1.6, color: '#555' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: 0, backgroundColor: '#050505', flexShrink: 0, marginTop: '8px' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Complimentary Service */}
      <section style={{ padding: '60px 5vw 100px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ padding: '40px', backgroundColor: '#050505', textAlign: 'center' }}>
          <h3 style={{ fontFamily: font, fontSize: '20px', fontWeight: 400, color: '#FFFFFF', marginBottom: '12px' }}>Complimentary Lifetime Service</h3>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Every Vault Maison purchase includes complimentary lifetime cleaning, inspection, and minor repairs. Visit our atelier or ship your piece to us.
          </p>
          <Link href="/minimal/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', border: '1px solid #050505', color: '#050505', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Schedule Service <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) { .vm-care-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </MinimalLayout>
  )
}
