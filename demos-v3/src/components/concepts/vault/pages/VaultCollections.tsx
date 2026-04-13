'use client'
import Link from 'next/link'
import { allCategories, categoryLabels, categoryDescriptions } from '@/data/concepts'
import { VaultLayout } from '../VaultLayout'
import { ArrowRight } from 'lucide-react'
import { ElegantDarkButton } from '../ui/ElegantDarkButton'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

const categoryImages: Record<string, string> = {
  'diamond-rings': '/images/vault/diamond-ring-dark-1.jpg',
  'gold-rings': '/images/vault/gold-flatlay-dark.jpg',
  'necklaces': '/images/vault/gold-necklace-dark-1.jpg',
  'earrings': '/images/vault/diamond-earring-dark-1.jpg',
  'bracelets': '/images/vault/gold-bracelets-dark-3.jpg',
  'watches': '/images/vault/diamond-macro-dark.jpg',
}

export function VaultCollections() {
  return (
    <VaultLayout>
      {/* Hero */}
      <section style={{ position: 'relative', height: 400, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/images/vault/diamond-macro-dark.jpg" alt="Collections" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>The Vault</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Our Collections</h1>
          <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.5)', marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
            Explore our curated categories of extraordinary jewelry
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section style={{ maxWidth: 1440, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {allCategories.map((cat) => (
            <Link key={cat} href={`/vault/category/${cat}`} style={{ textDecoration: 'none' }}>
              <div style={{
                position: 'relative', borderRadius: 8, overflow: 'hidden',
                aspectRatio: '4/3', backgroundColor: SURFACE,
                border: '1px solid rgba(212,175,55,0.15)',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              }}>
                <img
                  src={categoryImages[cat] || '/images/vault/diamond-macro-dark.jpg'}
                  alt={categoryLabels[cat]}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)', transition: 'transform 0.6s ease, filter 0.4s ease' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28 }}>
                  <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: TEXT, fontWeight: 400, marginBottom: 8 }}>{categoryLabels[cat]}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(234,234,234,0.5)', marginBottom: 16, lineHeight: 1.5 }}>{categoryDescriptions[cat]?.slice(0, 80)}...</p>
                  <span style={{ fontSize: 12, color: GOLD, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 6 }}>
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </VaultLayout>
  )
}
