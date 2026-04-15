'use client'
import { VaultLayout } from '../VaultLayout'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

export function VaultCraftsmanship() {
  return (
    <VaultLayout>
      <section style={{ position: 'relative', height: 480, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}><img src="/images/vault/diamond-texture-dark.jpg" alt="Craftsmanship" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.18)' }} /></div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: 700, padding: '0 24px' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>The Art</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Craftsmanship</h1>
          <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '20px auto 0' }} />
        </div>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Dedication</span>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 400, color: TEXT, marginTop: 10, marginBottom: 28 }}>200+ Hours Per Piece</h2>
        <p style={{ fontSize: 16, lineHeight: 2.1, color: 'rgba(234,234,234,0.5)' }}>Every Vault Maison creation undergoes a meticulous journey from raw material to finished masterpiece. Our artisans, trained in the finest European ateliers, combine centuries-old techniques with cutting-edge technology to achieve perfection in every facet.</p>
      </section>

      <section style={{ backgroundColor: SURFACE, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>The Process</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 400, color: TEXT, marginTop: 10 }}>From Vision to Masterpiece</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { step: '01', title: 'Stone Selection', desc: 'Each gemstone is hand-selected from the world\'s finest mines, evaluated for cut, clarity, color, and carat weight.' },
              { step: '02', title: 'Design & CAD', desc: 'Our designers create detailed 3D models, ensuring every angle and proportion is perfect before production begins.' },
              { step: '03', title: 'Lost Wax Casting', desc: 'Using the ancient lost-wax technique refined over millennia, we create precise metal forms for each piece.' },
              { step: '04', title: 'Stone Setting', desc: 'Master setters place each stone by hand, ensuring perfect alignment and maximum brilliance.' },
              { step: '05', title: 'Polishing', desc: 'Multiple stages of hand-polishing bring out the mirror finish that defines Vault Maison quality.' },
              { step: '06', title: 'Quality Control', desc: 'Every piece undergoes 47 quality checkpoints before earning the Vault Maison hallmark.' },
            ].map((t) => (
              <div key={t.title} style={{
                padding: 36, borderRadius: 10,
                border: '1px solid rgba(212,175,55,0.08)',
                backgroundColor: 'rgba(212,175,55,0.02)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <div style={{ fontSize: 28, fontFamily: 'Cinzel, serif', color: 'rgba(212,175,55,0.2)', marginBottom: 16 }}>{t.step}</div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 400, color: TEXT, marginBottom: 10 }}>{t.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(234,234,234,0.4)' }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </VaultLayout>
  )
}
