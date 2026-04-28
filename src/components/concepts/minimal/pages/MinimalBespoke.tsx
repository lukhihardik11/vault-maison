'use client'

import { useState } from 'react'
import { MinimalLayout } from '../MinimalLayout'
import { Pencil, Gem, Hammer, Gift, Check } from 'lucide-react'
import { BlobGlassCard } from '../ui'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', border: '1px solid #E5E5E5',
  fontSize: '13px', fontWeight: 400, fontFamily: font, color: '#050505',
  backgroundColor: '#FFFFFF', outline: 'none', transition: 'border-color 200ms ease',
}

const labelStyle: React.CSSProperties = {
  fontFamily: font, fontSize: '11px', textTransform: 'uppercase',
  letterSpacing: '0.15em', fontWeight: 500, color: '#9B9B9B',
  display: 'block', marginBottom: '6px',
}

const steps = [
  { icon: Pencil, title: 'Consultation', desc: 'Share your vision with our design team. We discuss style, stones, budget, and timeline in a private session.' },
  { icon: Gem, title: 'Design & Render', desc: 'Our designers create detailed sketches and 3D renders. You review and refine until every detail is perfect.' },
  { icon: Hammer, title: 'Crafting', desc: 'Master artisans bring your design to life using traditional techniques and precision technology. 4-8 weeks.' },
  { icon: Gift, title: 'Delivery', desc: 'Your finished piece is inspected, certified, and presented in our signature packaging with a lifetime warranty.' },
]

export function MinimalBespoke() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <MinimalLayout>
      {/* Hero */}
      <section style={{ position: 'relative', height: '50vh', minHeight: '360px', backgroundColor: '#050505', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img src="/images/products/classic-gold-ring.jpg" alt="Bespoke" style={{ position: "absolute", inset: 0, width: "100%", height: "100%",  objectFit: 'cover', opacity: 0.35  }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 5vw', maxWidth: '600px' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>Bespoke Service</p>
          <h1 style={{ fontFamily: font, fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px', lineHeight: 1.1 }}>Your Vision, Our Craft</h1>
          <p style={{ fontFamily: font, fontSize: '15px', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.6)' }}>
            Create a one-of-a-kind piece designed exclusively for you, from initial sketch to final setting.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section style={{ padding: '80px 5vw', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', marginBottom: '12px' }}>The Process</p>
          <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 600, color: '#050505' }}>Four Steps to Your Masterpiece</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }} className="vm-bespoke-steps">
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: 0, border: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <s.icon size={22} strokeWidth={1.5} style={{ color: '#050505' }} />
              </div>
              <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#050505', marginBottom: '8px' }}>Step {i + 1}</p>
              <h3 style={{ fontFamily: font, fontSize: '16px', fontWeight: 500, color: '#050505', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, lineHeight: 1.7, color: '#9B9B9B' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Bespoke - BlobGlassCard */}
      <section style={{ padding: '80px 5vw', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="vm-bespoke-steps">
          <BlobGlassCard title="Unique Design" description="No two pieces are alike. Your jewelry is designed from scratch to reflect your personal story." />
          <BlobGlassCard title="Expert Guidance" description="Work directly with our master gemologists and designers throughout the entire creation process." />
          <BlobGlassCard title="Lifetime Value" description="Bespoke pieces appreciate over time. Each comes with full GIA certification and lifetime warranty." />
        </div>
      </section>

      {/* Consultation Form */}
      <section style={{ padding: '80px 5vw', backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', marginBottom: '12px' }}>Begin Your Journey</p>
            <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 600, color: '#050505', marginBottom: '12px' }}>Request a Consultation</h2>
            <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#9B9B9B' }}>
              Share your vision and we will arrange a private session with our design team.
            </p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '60px 40px', backgroundColor: '#FFFFFF' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 0, backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Check size={20} color="#FFFFFF" />
              </div>
              <h3 style={{ fontFamily: font, fontSize: '20px', fontWeight: 400, color: '#050505', marginBottom: '8px' }}>Request Received</h3>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#9B9B9B', lineHeight: 1.7 }}>
                Thank you for your interest in our bespoke service. A design consultant will contact you within 24 hours to schedule your private session.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="vm-bespoke-form" style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#FFFFFF', padding: '40px' }}>
              <div className="vm-bespoke-form-row">
                <div><label style={labelStyle}>First Name</label><input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} /></div>
                <div><label style={labelStyle}>Last Name</label><input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} /></div>
              </div>
              <div className="vm-bespoke-form-row">
                <div><label style={labelStyle}>Email</label><input type="email" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} /></div>
                <div><label style={labelStyle}>Phone</label><input type="tel" style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} /></div>
              </div>
              <div>
                <label style={labelStyle}>Piece Type</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'}>
                  <option>Engagement Ring</option>
                  <option>Wedding Band</option>
                  <option>Necklace / Pendant</option>
                  <option>Earrings</option>
                  <option>Bracelet</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Budget Range</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'}>
                  <option>$3,000 – $5,000</option>
                  <option>$5,000 – $10,000</option>
                  <option>$10,000 – $25,000</option>
                  <option>$25,000+</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Preferred Consultation</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['In-Person', 'Video Call', 'Phone'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#050505', cursor: 'pointer' }}>
                      <input type="radio" name="consultation" defaultChecked={opt === 'In-Person'} style={{ accentColor: '#050505' }} /> {opt}
                    </label>
                  ))}
                </div>
              </div>
              <div><label style={labelStyle}>Tell Us About Your Vision</label><textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Describe your ideal piece — style, stones, inspiration..." onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} /></div>
              <button type="submit" style={{ alignSelf: 'flex-start', padding: '16px 48px', backgroundColor: '#050505', color: '#FFFFFF', border: 'none', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Request Consultation
              </button>
            </form>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-bespoke-steps { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .vm-bespoke-steps { grid-template-columns: 1fr !important; }
        }
        /* Collapse two-column form rows on mobile */
        .vm-bespoke-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .vm-bespoke-form-row {
            grid-template-columns: 1fr !important;
          }
          .vm-bespoke-form {
            padding: 24px 16px !important;
          }
        }
      `}</style>
    </MinimalLayout>
  )
}
