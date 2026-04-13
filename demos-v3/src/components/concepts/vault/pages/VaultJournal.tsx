'use client'
import Link from 'next/link'
import { VaultLayout } from '../VaultLayout'
import { ArrowRight } from 'lucide-react'

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
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>The Vault Journal</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 42, fontWeight: 400, color: TEXT, marginTop: 12 }}>Stories & Insights</h1>
        </div>

        {/* Featured Article */}
        <Link href="#" style={{ textDecoration: 'none', display: 'block', marginBottom: 60 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.15)', backgroundColor: SURFACE }}>
            <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
              <img src={articles[0].image} alt={articles[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '40px 40px 40px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase' }}>{articles[0].category} · {articles[0].date}</span>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 400, color: TEXT, marginTop: 12, marginBottom: 16 }}>{articles[0].title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(234,234,234,0.5)', marginBottom: 24 }}>{articles[0].excerpt}</p>
              <span style={{ fontSize: 13, color: GOLD, display: 'flex', alignItems: 'center', gap: 6 }}>Read Article <ArrowRight size={14} /></span>
            </div>
          </div>
        </Link>

        {/* Article Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {articles.slice(1).map((a) => (
            <Link key={a.title} href="#" style={{ textDecoration: 'none' }}>
              <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.15)', backgroundColor: SURFACE, transition: 'transform 0.4s ease' }}>
                <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <span style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase' }}>{a.category} · {a.date}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 500, color: TEXT, marginTop: 8, marginBottom: 8 }}>{a.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(234,234,234,0.5)' }}>{a.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </VaultLayout>
  )
}
