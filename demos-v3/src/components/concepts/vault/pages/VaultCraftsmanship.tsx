'use client'
import { VaultLayout } from '../VaultLayout'
import { ElegantDarkButton } from '../ui/ElegantDarkButton'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

export function VaultCraftsmanship() {
  return (
    <VaultLayout>
      <section style={{ position: 'relative', height: 450, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}><img src="/images/vault/diamond-texture-dark.jpg" alt="Craftsmanship" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.2)' }} /></div>
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: 700, padding: '0 24px' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>The Art</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Craftsmanship</h1>
        </div>
      </section>
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, color: TEXT, marginBottom: 24 }}>200+ Hours Per Piece</h2>
        <p style={{ fontSize: 16, lineHeight: 2, color: 'rgba(234,234,234,0.6)' }}>Every Vault Maison creation undergoes a meticulous journey from raw material to finished masterpiece. Our artisans, trained in the finest European ateliers, combine centuries-old techniques with cutting-edge technology to achieve perfection in every facet.</p>
      </section>
      <section style={{ backgroundColor: SURFACE, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {[
            { title: 'Stone Selection', desc: 'Each gemstone is hand-selected from the world\'s finest mines, evaluated for cut, clarity, color, and carat weight.' },
            { title: 'Design & CAD', desc: 'Our designers create detailed 3D models, ensuring every angle and proportion is perfect before production begins.' },
            { title: 'Lost Wax Casting', desc: 'Using the ancient lost-wax technique refined over millennia, we create precise metal forms for each piece.' },
            { title: 'Stone Setting', desc: 'Master setters place each stone by hand, ensuring perfect alignment and maximum brilliance.' },
            { title: 'Polishing', desc: 'Multiple stages of hand-polishing bring out the mirror finish that defines Vault Maison quality.' },
            { title: 'Quality Control', desc: 'Every piece undergoes 47 quality checkpoints before earning the Vault Maison hallmark.' },
          ].map((t) => (
            <div key={t.title} style={{ padding: 32, borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 500, color: TEXT, marginBottom: 8 }}>{t.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(234,234,234,0.5)' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </VaultLayout>
  )
}
