'use client'

import { MinimalLayout } from '../MinimalLayout'
import { Gem, Ruler, Eye, Sparkles } from 'lucide-react'
import MinimalHeroSection from '../ui/MinimalHeroSection'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const techniques = [
  { icon: Gem, title: 'Stone Selection', desc: 'Every diamond is hand-selected by our GIA-certified gemologists, evaluating hundreds of stones to find those with exceptional brilliance and fire.' },
  { icon: Ruler, title: 'Precision Setting', desc: 'Our master setters use microscopes and specialized tools to ensure each stone is perfectly aligned, maximizing light performance and security.' },
  { icon: Eye, title: 'Quality Control', desc: 'Each piece undergoes a 47-point inspection process before leaving our atelier, ensuring flawless finish and structural integrity.' },
  { icon: Sparkles, title: 'Final Polish', desc: 'A multi-stage polishing process using progressively finer compounds creates our signature mirror finish that defines Vault Maison pieces.' },
]

export function MinimalCraftsmanship() {
  return (
    <MinimalLayout>
      {/* Hero (MinimalHeroSection - KokonutUI) */}
      <MinimalHeroSection
        eyebrow="Our Craft"
        title="The Art Behind Every Piece"
        subtitle="Where generations of mastery meet modern precision"
        image="/images/products/classic-pendant.jpg"
        overlay="dark"
      />

      {/* Intro */}
      <section style={{ padding: '80px 5vw', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: font, fontSize: '15px', fontWeight: 300, lineHeight: 2, color: '#555' }}>
          At Vault Maison, craftsmanship is not a marketing term — it is the foundation of everything we create. Our atelier in New York houses twelve master artisans, each with over twenty years of experience in fine jewelry making. From the initial sketch to the final polish, every step is performed by hand with meticulous attention to detail.
        </p>
      </section>

      {/* Techniques */}
      <section style={{ padding: '0 5vw 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }} className="vm-craft-grid">
          {techniques.map((t, i) => (
            <div key={i} style={{ padding: '32px', backgroundColor: '#FAFAFA' }}>
              <t.icon size={24} strokeWidth={1.5} style={{ color: '#050505', marginBottom: '16px' }} />
              <h3 style={{ fontFamily: font, fontSize: '16px', fontWeight: 500, color: '#050505', marginBottom: '10px' }}>{t.title}</h3>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: '#9B9B9B' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Materials */}
      <section style={{ padding: '80px 5vw', backgroundColor: '#050505' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#050505', marginBottom: '12px' }}>Materials</p>
            <h2 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#FFFFFF' }}>Only the Finest</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="vm-materials-grid">
            {[
              { title: '18K Gold', desc: 'We use 18-karat gold exclusively for its ideal balance of purity, durability, and rich color. Available in yellow, white, and rose.' },
              { title: 'GIA Diamonds', desc: 'Every diamond above 0.30ct is independently certified by the Gemological Institute of America, ensuring verified quality and origin.' },
              { title: 'Platinum 950', desc: 'Our platinum pieces use 950 grade — 95% pure platinum — prized for its density, hypoallergenic properties, and eternal luster.' },
            ].map((m, i) => (
              <div key={i} style={{ padding: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontFamily: font, fontSize: '18px', fontWeight: 300, color: '#050505', marginBottom: '12px' }}>{m.title}</h3>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-craft-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .vm-materials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
