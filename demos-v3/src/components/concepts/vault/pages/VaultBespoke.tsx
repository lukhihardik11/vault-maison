'use client'
import { VaultLayout } from '../VaultLayout'
import { Diamond, Palette, Gem, Award } from 'lucide-react'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const MUTED = '#333333'
const TEXT = '#EAEAEA'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.03)',
  border: `1px solid ${MUTED}`, borderRadius: 4, color: TEXT, fontSize: 14, outline: 'none',
}

export function VaultBespoke() {
  return (
    <VaultLayout>
      {/* Hero */}
      <section style={{ position: 'relative', height: 450, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/images/vault/diamond-ring-dark-3.jpg" alt="Bespoke" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.2)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: 700, padding: '0 24px' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>Commission</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Bespoke Creations</h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(234,234,234,0.5)', marginTop: 16 }}>
            Transform your vision into an extraordinary piece of jewelry, crafted exclusively for you.
          </p>
        </div>
      </section>

      {/* Process */}
      <section style={{ maxWidth: 1440, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 400, color: TEXT }}>The Process</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {[
            { icon: Diamond, step: '01', title: 'Consultation', desc: 'Share your vision with our design team in a private session.' },
            { icon: Palette, step: '02', title: 'Design', desc: 'Our artisans create detailed sketches and 3D renderings.' },
            { icon: Gem, step: '03', title: 'Crafting', desc: 'Master jewelers bring the design to life over 6-12 weeks.' },
            { icon: Award, step: '04', title: 'Delivery', desc: 'Your one-of-a-kind piece, presented in our signature case.' },
          ].map((s) => (
            <div key={s.step} style={{ textAlign: 'center', padding: 32, borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)', backgroundColor: SURFACE }}>
              <div style={{ fontSize: 32, fontFamily: 'Cinzel, serif', color: 'rgba(212,175,55,0.2)', marginBottom: 16 }}>{s.step}</div>
              <s.icon size={28} color={GOLD} style={{ margin: '0 auto 16px', display: 'block' }} />
              <h3 style={{ fontSize: 16, fontWeight: 500, color: TEXT, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(234,234,234,0.5)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section style={{ backgroundColor: SURFACE, padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 400, color: TEXT }}>Begin Your Commission</h2>
            <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.5)', marginTop: 12 }}>Tell us about your dream piece and we&apos;ll arrange a consultation.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>First Name</label><input style={inputStyle} placeholder="First name" /></div>
            <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Last Name</label><input style={inputStyle} placeholder="Last name" /></div>
          </div>
          <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Email</label><input style={inputStyle} placeholder="Email" type="email" /></div>
          <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Piece Type</label>
            <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}>
              <option style={{ background: BG }}>Engagement Ring</option>
              <option style={{ background: BG }}>Necklace</option>
              <option style={{ background: BG }}>Earrings</option>
              <option style={{ background: BG }}>Bracelet</option>
              <option style={{ background: BG }}>Other</option>
            </select>
          </div>
          <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Budget Range</label>
            <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}>
              <option style={{ background: BG }}>$5,000 - $15,000</option>
              <option style={{ background: BG }}>$15,000 - $50,000</option>
              <option style={{ background: BG }}>$50,000 - $100,000</option>
              <option style={{ background: BG }}>$100,000+</option>
            </select>
          </div>
          <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Describe Your Vision</label>
            <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} placeholder="Tell us about the piece you envision..." />
          </div>
          <button style={{ marginTop: 24, width: '100%', padding: '16px', backgroundColor: GOLD, color: BG, border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Request Consultation
          </button>
        </div>
      </section>
    </VaultLayout>
  )
}
