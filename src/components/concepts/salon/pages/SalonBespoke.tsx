'use client'

import React from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { SalonInput } from '../ui/SalonInput'
import { SalonButton } from '../ui/SalonButton'
import { MessageCircle, PenTool, Gem, Package } from 'lucide-react'

const steps = [
  { icon: <MessageCircle size={22} />, title: 'Share Your Vision', desc: 'Tell us about the piece you dream of. A sketch, a photo, or just words — we start wherever you are.' },
  { icon: <PenTool size={22} />, title: 'Design Together', desc: 'Aria works with you to create detailed sketches and 3D renders. We refine until it\'s perfect.' },
  { icon: <Gem size={22} />, title: 'Craft with Care', desc: 'Our master artisans bring the design to life, with regular updates so you can follow the journey.' },
  { icon: <Package size={22} />, title: 'Unveil Your Creation', desc: 'The moment you\'ve been waiting for. Your one-of-a-kind piece, presented in our signature packaging.' },
]

export function SalonBespoke() {
  return (
    <SalonLayout>
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>Custom Design</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: S.text, margin: '0 0 16px' }}>Create Something Uniquely Yours</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
          From the first spark of an idea to the final polish, we&apos;ll guide you through every step of creating a bespoke piece.
        </p>
      </section>

      {/* Process */}
      <section style={{ padding: '0 32px 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {steps.map((step, i) => (
            <div key={step.title} style={{ textAlign: 'center', padding: '24px 16px', position: 'relative' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', fontWeight: 300, color: `${S.accent}15`, position: 'absolute', top: 0, right: 16 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ width: 56, height: 56, borderRadius: S.radius, background: S.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.accent, margin: '0 auto 16px' }}>{step.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 400, color: S.text, margin: '0 0 8px' }}>{step.title}</h3>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.8rem', color: S.textSecondary, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: '80px 32px 100px', background: S.surface }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 400, color: S.text, margin: '0 0 8px', textAlign: 'center' }}>Start Your Journey</h2>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, textAlign: 'center', marginBottom: 32 }}>Tell us about your dream piece and we&apos;ll be in touch within 24 hours.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <SalonInput label="First Name" placeholder="Your first name" required />
            <SalonInput label="Last Name" placeholder="Your last name" required />
          </div>
          <SalonInput label="Email" type="email" placeholder="your@email.com" required />
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textSecondary, marginBottom: 6, fontWeight: 500 }}>Type of Piece</label>
            <select style={{ width: '100%', padding: '12px 16px', fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.text, background: '#fff', border: `1.5px solid ${S.border}`, borderRadius: S.radius, outline: 'none' }}>
              <option>Engagement Ring</option><option>Wedding Band</option><option>Necklace</option><option>Earrings</option><option>Bracelet</option><option>Other</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: S.textSecondary, marginBottom: 6, fontWeight: 500 }}>Describe Your Vision</label>
            <textarea rows={5} placeholder="Tell us about the piece you have in mind..." style={{ width: '100%', padding: '12px 16px', fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.text, background: '#fff', border: `1.5px solid ${S.border}`, borderRadius: S.radius, outline: 'none', resize: 'vertical' }} />
          </div>
          <SalonButton fullWidth>Begin Your Custom Journey</SalonButton>
        </div>
      </section>
    </SalonLayout>
  )
}
