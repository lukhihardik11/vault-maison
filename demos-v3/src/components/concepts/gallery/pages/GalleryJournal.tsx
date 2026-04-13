'use client'

import React from 'react'
import Link from 'next/link'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'

const articles = [
  { title: 'The Art of the Solitaire', subtitle: 'How a single stone can command an entire room', date: 'March 2025', image: '/images/products/diamond-solitaire-ring.jpg', category: 'Exhibition Notes' },
  { title: 'Gold Through the Ages', subtitle: 'From ancient Egypt to the modern gallery wall', date: 'February 2025', image: '/images/products/gold-chain-necklace.jpg', category: 'History' },
  { title: 'The Four Cs, Reimagined', subtitle: 'Why traditional grading only tells half the story', date: 'January 2025', image: '/images/products/loose-round-diamond.jpg', category: 'Education' },
  { title: 'Bespoke: A Conversation', subtitle: 'The intimate process of commissioning a one-of-a-kind piece', date: 'December 2024', image: '/images/products/diamond-tennis-bracelet.jpg', category: 'Process' },
  { title: 'Ethical Sourcing in 2025', subtitle: 'Our commitment to transparent supply chains', date: 'November 2024', image: '/images/diamond-facets-1.jpg', category: 'Sustainability' },
  { title: 'The Language of Earrings', subtitle: 'How studs, hoops, and drops communicate different stories', date: 'October 2024', image: '/images/products/diamond-stud-earrings.jpg', category: 'Style' },
]

export function GalleryJournal() {
  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 80px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <MuseumCaption align="center">The Journal</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, color: G.text, margin: '16px 0 16px' }}>
          Curator&apos;s Notes
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.7 }}>
          Insights, stories, and reflections from our gallery — exploring the art, craft, and culture of fine jewelry.
        </p>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 140px' }}>
        {/* Featured article */}
        {articles[0] && (
          <Link href="/gallery/journal" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 48, marginBottom: 80, alignItems: 'center' }} className="gallery-editorial-row">
              <div style={{ aspectRatio: '16/10', background: '#F8F6F2', border: `1px solid ${G.border}`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={articles[0].image} alt={articles[0].title} className="gallery-editorial-img"
                  style={{ width: '70%', height: '70%', objectFit: 'contain', transition: 'transform 0.6s ease' }} />
              </div>
              <div>
                <MuseumCaption>{articles[0].category}</MuseumCaption>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.6rem', fontWeight: 400, color: G.text, margin: '8px 0 8px', lineHeight: 1.3 }}>{articles[0].title}</h2>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.7, margin: '0 0 12px' }}>{articles[0].subtitle}</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: G.caption, letterSpacing: '0.1em' }}>{articles[0].date}</p>
              </div>
            </div>
          </Link>
        )}

        {/* Article list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {articles.slice(1).map((article, i) => (
            <Link key={i} href="/gallery/journal" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 24, alignItems: 'center',
                padding: '28px 0', borderBottom: `1px solid ${G.border}`,
                transition: 'opacity 0.3s',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
                <div style={{ width: 80, height: 80, background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={article.image} alt={article.title} style={{ width: '75%', height: '75%', objectFit: 'contain' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: G.accent, margin: '0 0 4px' }}>{article.category}</p>
                  <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1rem', fontWeight: 400, color: G.text, margin: '0 0 4px' }}>{article.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: G.textSecondary, margin: 0 }}>{article.subtitle}</p>
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: G.caption }}>{article.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .gallery-editorial-row:hover .gallery-editorial-img { transform: scale(1.03); }
      `}</style>
    </GalleryLayout>
  )
}
