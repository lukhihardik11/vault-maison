'use client'
import { VaultLayout } from '../VaultLayout'
import { Diamond, Shield, Award, Clock, Users, Globe } from 'lucide-react'
import { PhotoGallery } from '../ui/PhotoGallery'
import { VaultFeatureBucket } from '../ui/VaultFeatureBucket'
import { VaultAboutSection } from '../ui/VaultAboutSection'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

export function VaultAbout() {
  return (
    <VaultLayout>
      {/* About Section with Parallax, Services, Stats */}
      <VaultAboutSection />

      {/* Hero */}
      <section style={{ position: 'relative', height: 520, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/images/vault/diamond-texture-dark.jpg" alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.18)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: 700, padding: '0 24px' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Our Story</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>The Vault Maison</h1>
          <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '20px auto 0' }} />
          <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(234,234,234,0.45)', marginTop: 20 }}>
            A legacy of excellence spanning five decades, where every piece tells a story of uncompromising craftsmanship.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Heritage</span>
        <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 400, color: TEXT, marginTop: 10, marginBottom: 28 }}>Founded on Passion</h2>
        <p style={{ fontSize: 16, lineHeight: 2.1, color: 'rgba(234,234,234,0.5)' }}>
          Vault Maison was born from a singular vision: to create a sanctuary where the world&apos;s most extraordinary gemstones find their ultimate expression. For over fifty years, we have curated and crafted pieces that transcend mere adornment, becoming heirlooms that carry stories across generations.
        </p>
        <p style={{ fontSize: 16, lineHeight: 2.1, color: 'rgba(234,234,234,0.5)', marginTop: 24 }}>
          Our master artisans, trained in the finest ateliers of Europe, bring centuries of accumulated knowledge to every piece. From the initial sketch to the final polish, each creation undergoes over 200 hours of meticulous handwork.
        </p>
      </section>

      {/* Gallery */}
      <section style={{ padding: '40px 24px 100px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Our Atelier</span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 400, color: TEXT, marginTop: 10 }}>Behind the Craft</h2>
        </div>
        <PhotoGallery
          images={[
            { src: '/images/vault/diamond-ring-dark-1.jpg', alt: 'Diamond Ring Craftsmanship' },
            { src: '/images/vault/gold-necklace-dark-1.jpg', alt: 'Gold Necklace Detail' },
            { src: '/images/vault/diamond-earring-dark-1.jpg', alt: 'Diamond Earring Artistry' },
            { src: '/images/vault/gold-bracelets-dark-3.jpg', alt: 'Gold Bracelet Collection' },
            { src: '/images/vault/diamond-macro-dark.jpg', alt: 'Diamond Macro Detail' },
          ]}
        />
      </section>

      {/* Values */}
      <section style={{ backgroundColor: SURFACE, padding: '100px 24px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Our Philosophy</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 400, color: TEXT, marginTop: 10 }}>What We Stand For</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: Diamond, title: 'Uncompromising Quality', desc: 'Only the top 1% of gemstones meet our exacting standards. Every stone is hand-selected by our master gemologists.' },
              { icon: Shield, title: 'Ethical Sourcing', desc: 'We maintain complete traceability from mine to masterpiece, ensuring every gem is responsibly sourced.' },
              { icon: Award, title: 'Master Craftsmanship', desc: 'Our artisans undergo 10+ years of training before crafting their first Vault Maison piece.' },
              { icon: Users, title: 'Personal Service', desc: 'Every client receives dedicated attention from our team of gemologists and design consultants.' },
              { icon: Globe, title: 'Global Presence', desc: 'Private showrooms in New York, London, Paris, Hong Kong, and Dubai serve our worldwide clientele.' },
              { icon: Clock, title: 'Timeless Design', desc: 'We create pieces meant to be treasured for generations, never following fleeting trends.' },
            ].map((v) => (
              <div key={v.title} style={{
                padding: 36, borderRadius: 10,
                border: '1px solid rgba(212,175,55,0.08)',
                backgroundColor: 'rgba(212,175,55,0.02)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 10,
                  backgroundColor: 'rgba(212,175,55,0.05)',
                  border: '1px solid rgba(212,175,55,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <v.icon size={22} color={GOLD} />
                </div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 400, color: TEXT, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(234,234,234,0.4)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
          {[
            { value: '1974', label: 'Year Founded' },
            { value: '50+', label: 'Master Artisans' },
            { value: '10,000+', label: 'Pieces Created' },
            { value: '40+', label: 'Countries Served' },
          ].map((n) => (
            <div key={n.label} style={{
              padding: '32px 16px',
              borderRadius: 10,
              border: '1px solid rgba(212,175,55,0.06)',
            }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 40, color: GOLD, marginBottom: 10, fontWeight: 400 }}>{n.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{n.label}</div>
            </div>
          ))}
        </div>
      </section>
    </VaultLayout>
  )
}
