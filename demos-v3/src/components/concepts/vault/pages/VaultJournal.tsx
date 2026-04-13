'use client'
import Link from 'next/link'
import { VaultLayout } from '../VaultLayout'
import { ArrowRight } from 'lucide-react'
import { VaultHoverPeek } from '../ui/VaultHoverPeek'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

const articles = [
  { title: 'The Art of the Perfect Solitaire', excerpt: 'Exploring the geometry and optics behind the world\'s most iconic diamond cut.', image: '/images/vault/diamond-ring-dark-1.jpg', date: 'March 2026', category: 'Craftsmanship' },
  { title: 'Gold Through the Ages', excerpt: 'From ancient Egypt to modern haute joaillerie, the enduring allure of gold.', image: '/images/vault/gold-flatlay-dark.jpg', date: 'February 2026', category: 'Heritage' },
  { title: 'Behind the Vault: Our Atelier', excerpt: 'A rare glimpse into the workshop where our master artisans bring visions to life.', image: '/images/vault/diamond-texture-dark.jpg', date: 'January 2026', category: 'Behind the Scenes' },
  { title: 'Choosing Your Engagement Ring', excerpt: 'Expert guidance on selecting a ring that tells your unique love story.', image: '/images/vault/diamond-ring-dark-3.jpg', date: 'December 2025', category: 'Guide' },
  { title: 'The Rise of Ethical Diamonds', excerpt: 'How the industry is transforming to ensure responsible sourcing and sustainability.', image: '/images/vault/diamond-macro-dark.jpg', date: 'November 2025', category: 'Industry' },
  { title: 'Caring for Your Fine Jewelry', excerpt: 'Essential tips to keep your precious pieces looking their best for generations.', image: '/images/vault/gold-necklace-dark-1.jpg', date: 'October 2025', category: 'Care' },
]

export function VaultJournal() {
  return (
    <VaultLayout>
      <style jsx global>{`
        .vault-article-card { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.4s ease; }
        .vault-article-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(212,175,55,0.08); border-color: rgba(212,175,55,0.3) !important; }
        .vault-article-card:hover img { transform: scale(1.05); }
        .vault-article-card:hover .vault-read-more { color: #E8C84A; }
        .vault-article-card:hover .vault-read-more::after { width: 100%; }
        .vault-read-more { position: relative; display: inline-flex; align-items: center; gap: 6px; transition: color 0.3s ease; }
        .vault-read-more::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: ${GOLD}; transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>The Vault Journal</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Stories & Insights</h1>
          <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '20px auto 0' }} />
        </div>

        {/* Featured Article — with HoverPeek */}
        <VaultHoverPeek imageSrc={articles[0].image} label={articles[0].title} peekWidth={320} peekHeight={200}>
          <Link href="#" style={{ textDecoration: 'none', display: 'block', marginBottom: 60 }}>
            <div className="vault-article-card" style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
              borderRadius: 10, overflow: 'hidden',
              border: '1px solid rgba(212,175,55,0.1)', backgroundColor: SURFACE,
            }}>
              <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                <img src={articles[0].image} alt={articles[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              </div>
              <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: 10, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>{articles[0].category} · {articles[0].date}</span>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 400, color: TEXT, marginTop: 14, marginBottom: 16, lineHeight: 1.3 }}>{articles[0].title}</h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(234,234,234,0.45)', marginBottom: 28 }}>{articles[0].excerpt}</p>
                <span className="vault-read-more" style={{ fontSize: 13, color: GOLD, letterSpacing: '0.08em' }}>Read Article <ArrowRight size={14} /></span>
              </div>
            </div>
          </Link>
        </VaultHoverPeek>

        {/* Article Grid — with HoverPeek on each */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {articles.slice(1).map((a) => (
            <VaultHoverPeek key={a.title} imageSrc={a.image} label={a.title}>
              <Link href="#" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="vault-article-card" style={{
                  borderRadius: 10, overflow: 'hidden',
                  border: '1px solid rgba(212,175,55,0.08)', backgroundColor: SURFACE,
                }}>
                  <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                    <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                  </div>
                  <div style={{ padding: 24 }}>
                    <span style={{ fontSize: 9, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>{a.category} · {a.date}</span>
                    <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 17, fontWeight: 400, color: TEXT, marginTop: 10, marginBottom: 10, lineHeight: 1.3 }}>{a.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(234,234,234,0.4)' }}>{a.excerpt}</p>
                  </div>
                </div>
              </Link>
            </VaultHoverPeek>
          ))}
        </div>
      </div>
    </VaultLayout>
  )
}
