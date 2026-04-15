'use client'
import React from 'react'
import Image from 'next/image'
import { AR, ArchiveSection, RevealSection, StaggerItem, GoldRule } from '../ArchiveLayout'
import { ArchiveButton } from '../ui'
import { BookOpen, Calendar, User } from 'lucide-react'

export function ArchiveJournal() {
  const featured = {
    title: 'The Kashmir Sapphire: A Century of Provenance',
    excerpt: 'Tracing the remarkable journey of one of the world\'s most coveted gemstones from the Himalayan mines to the great auction houses of Europe.',
    author: 'Dr. Helena Voss',
    date: 'March 2024',
    image: '/images/archive/emerald-necklace-dark.webp',
    readTime: '12 min read',
  }

  const articles = [
    { title: 'Understanding Art Deco Diamond Cuts', excerpt: 'How the geometric precision of the 1920s transformed diamond cutting forever.', author: 'Prof. James Whitfield', date: 'February 2024', readTime: '8 min', image: '/images/archive/diamond-velvet.jpg' },
    { title: 'Gold Hallmarks: A Collector\'s Guide', excerpt: 'Decoding the stamps and marks that reveal a piece\'s origin, purity, and age.', author: 'Dr. Helena Voss', date: 'January 2024', readTime: '10 min', image: '/images/archive/gold-hallmark.jpg' },
    { title: 'The Ethics of Provenance Research', excerpt: 'Navigating the complex history of jewelry ownership in the modern era.', author: 'Sarah Chen, GG', date: 'December 2023', readTime: '6 min', image: '/images/archive/leather-books.jpg' },
    { title: 'Gemstone Fluorescence: What It Reveals', excerpt: 'How UV light testing helps authenticate and grade precious stones.', author: 'Dr. Marcus Webb', date: 'November 2023', readTime: '7 min', image: '/images/archive/diamond-inspection.jpg' },
  ]

  return (
    <>
      {/* Header */}
      <section style={{ background: AR.bg, padding: '64px 32px 32px', textAlign: 'center', borderBottom: `1px solid ${AR.border}` }}>
        <p className="archive-hero-fade" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
          RESEARCH & SCHOLARSHIP
        </p>
        <h1 className="archive-hero-fade-delay-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: AR.text, margin: '0 0 16px' }}>
          Scholar&rsquo;s Notes
        </h1>
        <p className="archive-hero-fade-delay-2" style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary, maxWidth: 600, margin: '0 auto' }}>
          Research articles, historical essays, and gemological studies from our team of experts.
        </p>
      </section>

      {/* Featured Article */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
            <div style={{ position: 'relative', height: 360, overflow: 'hidden' }}>
              <Image src={featured.image} alt={featured.title} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 16, left: 16, background: AR.accent, padding: '4px 12px' }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: '#1E1614', fontWeight: 600 }}>FEATURED</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: AR.textSecondary, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Calendar size={12} /> {featured.date}
                </span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: AR.textSecondary }}>
                  {featured.readTime}
                </span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 500, color: AR.text, margin: '0 0 16px', lineHeight: 1.3 }}>
                {featured.title}
              </h2>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, lineHeight: 1.7, marginBottom: 16 }}>
                {featured.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <User size={14} color={AR.accent} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: AR.accent }}>
                  {featured.author}
                </span>
              </div>
              <ArchiveButton variant="secondary">Read Article</ArchiveButton>
            </div>
          </div>
        </RevealSection>
      </ArchiveSection>

      <GoldRule />

      {/* Article Grid */}
      <ArchiveSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {articles.map((article, i) => (
            <StaggerItem key={i} index={i}>
              <div style={{ background: AR.card, border: `1px solid ${AR.border}`, overflow: 'hidden' }} className="archive-doc-hover">
                <div style={{ position: 'relative', height: 180 }}>
                  <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: AR.textSecondary }}>
                      {article.date}
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: AR.textSecondary }}>
                      {article.readTime}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 500, color: AR.text, margin: '0 0 8px', lineHeight: 1.3 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.85rem', color: AR.textSecondary, lineHeight: 1.5, marginBottom: 12 }}>
                    {article.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <BookOpen size={12} color={AR.accent} />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: AR.accent }}>
                      {article.author}
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ArchiveSection>
    </>
  )
}
