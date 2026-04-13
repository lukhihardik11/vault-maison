'use client'
import { VaultLayout } from '../VaultLayout'
import { Diamond, Palette, Gem, Award } from 'lucide-react'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'
import { DarkNeumorphicInput } from '../ui/DarkNeumorphicInput'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

const selectStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px',
  backgroundColor: 'rgba(20,20,20,0.8)',
  border: '1px solid rgba(212,175,55,0.1)',
  borderRadius: 8, color: TEXT, fontSize: 14, outline: 'none',
  cursor: 'pointer', appearance: 'none',
  transition: 'border-color 0.3s ease',
}

export function VaultBespoke() {
  return (
    <VaultLayout>
      {/* Hero */}
      <section style={{ position: 'relative', height: 480, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/images/vault/diamond-ring-dark-3.jpg" alt="Bespoke" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.18)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: 700, padding: '0 24px' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Commission</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Bespoke Creations</h1>
          <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '20px auto 0' }} />
          <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(234,234,234,0.45)', marginTop: 20 }}>
            Transform your vision into an extraordinary piece of jewelry, crafted exclusively for you.
          </p>
        </div>
      </section>

      {/* Process */}
      <section style={{ maxWidth: 1440, margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>How It Works</span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(26px, 3.5vw, 34px)', fontWeight: 400, color: TEXT, marginTop: 10 }}>The Process</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[
            { icon: Diamond, step: '01', title: 'Consultation', desc: 'Share your vision with our design team in a private session.' },
            { icon: Palette, step: '02', title: 'Design', desc: 'Our artisans create detailed sketches and 3D renderings.' },
            { icon: Gem, step: '03', title: 'Crafting', desc: 'Master jewelers bring the design to life over 6-12 weeks.' },
            { icon: Award, step: '04', title: 'Delivery', desc: 'Your one-of-a-kind piece, presented in our signature case.' },
          ].map((s) => (
            <div key={s.step} style={{
              textAlign: 'center', padding: 36, borderRadius: 10,
              border: '1px solid rgba(212,175,55,0.08)', backgroundColor: SURFACE,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <div style={{ fontSize: 36, fontFamily: 'Cinzel, serif', color: 'rgba(212,175,55,0.15)', marginBottom: 16, fontWeight: 300 }}>{s.step}</div>
              <div style={{
                width: 52, height: 52, borderRadius: 12, margin: '0 auto 18px',
                backgroundColor: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <s.icon size={22} color={GOLD} />
              </div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 400, color: TEXT, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(234,234,234,0.4)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form — with DarkNeumorphicInput */}
      <section style={{ backgroundColor: SURFACE, padding: '100px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Start Your Journey</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 400, color: TEXT, marginTop: 10 }}>Begin Your Commission</h2>
            <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.4)', marginTop: 12, lineHeight: 1.7 }}>Tell us about your dream piece and we&apos;ll arrange a consultation.</p>
          </div>
          <div style={{
            padding: 44, borderRadius: 12,
            backgroundColor: BG, border: '1px solid rgba(212,175,55,0.08)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>First Name</label>
                <DarkNeumorphicInput placeholder="First name" />
              </div>
              <div>
                <label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Last Name</label>
                <DarkNeumorphicInput placeholder="Last name" />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Email</label>
              <DarkNeumorphicInput placeholder="Email address" type="email" />
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Piece Type</label>
              <select style={selectStyle}>
                <option style={{ background: BG }}>Engagement Ring</option>
                <option style={{ background: BG }}>Necklace</option>
                <option style={{ background: BG }}>Earrings</option>
                <option style={{ background: BG }}>Bracelet</option>
                <option style={{ background: BG }}>Other</option>
              </select>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Budget Range</label>
              <select style={selectStyle}>
                <option style={{ background: BG }}>$5,000 - $15,000</option>
                <option style={{ background: BG }}>$15,000 - $50,000</option>
                <option style={{ background: BG }}>$50,000 - $100,000</option>
                <option style={{ background: BG }}>$100,000+</option>
              </select>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Describe Your Vision</label>
              <textarea style={{
                width: '100%', padding: '14px 16px', minHeight: 140, resize: 'vertical',
                backgroundColor: 'rgba(20,20,20,0.8)',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: 8, color: TEXT, fontSize: 14, outline: 'none',
                fontFamily: 'Inter, sans-serif', lineHeight: 1.6,
                transition: 'border-color 0.3s ease',
              }} placeholder="Tell us about the piece you envision..." />
            </div>
            <div style={{ marginTop: 32 }}><SparkleGlowButton>Request Consultation</SparkleGlowButton></div>
          </div>
        </div>
      </section>
    </VaultLayout>
  )
}
