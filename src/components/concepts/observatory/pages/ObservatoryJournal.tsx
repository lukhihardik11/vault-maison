'use client'
import React from 'react'
import Image from 'next/image'
import { OB, ObservatorySection, RevealSection, StaggerItem, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton } from '../ui'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'

const articles = [
  { title: 'Understanding Diamond Fluorescence: A Data-Driven Analysis', excerpt: 'Our spectroscopic study of 5,000 diamonds reveals surprising correlations between fluorescence intensity and perceived brilliance.', image: '/images/observatory/diamond-dark.jpg', date: 'Mar 2024', readTime: '8 min', category: 'Research' },
  { title: 'The Science of Color Grading: Beyond the D-Z Scale', excerpt: 'How advanced colorimetry is changing the way we evaluate and appreciate color in diamonds and colored gemstones.', image: '/images/observatory/gemstone-blue.jpg', date: 'Feb 2024', readTime: '12 min', category: 'Analysis' },
  { title: 'Lab-Grown vs Natural: A Spectroscopic Comparison', excerpt: 'Detailed analysis of the optical and physical properties that distinguish natural diamonds from their lab-grown counterparts.', image: '/images/observatory/crystal-structure.jpg', date: 'Jan 2024', readTime: '15 min', category: 'Research' },
  { title: 'Market Intelligence: Q1 2024 Diamond Price Trends', excerpt: 'Data-driven analysis of global diamond pricing trends, supply chain dynamics, and investment-grade stone performance.', image: '/images/observatory/data-screen.jpg', date: 'Jan 2024', readTime: '10 min', category: 'Market Data' },
  { title: 'The Precision of Modern Diamond Cutting', excerpt: 'How computer-aided design and laser cutting technology have revolutionized the art of diamond faceting.', image: '/images/observatory/precision-tools.jpg', date: 'Dec 2023', readTime: '7 min', category: 'Technology' },
  { title: 'Sapphire Origins: Tracing Provenance Through Trace Elements', excerpt: 'Advanced geochemical analysis can now pinpoint the geographic origin of sapphires with 95% accuracy.', image: '/images/observatory/sapphire-ring.jpg', date: 'Nov 2023', readTime: '11 min', category: 'Research' },
]

export function ObservatoryJournal() {
  return (
    <>
      <section style={{ background: OB.bg, padding: '100px 0 40px', borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <BookOpen size={14} color={OB.accent} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>RESEARCH & INSIGHTS</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: OB.text, margin: '0 0 12px' }}>Observatory Journal</h1>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary }}>Data-driven insights from our gemological research team.</p>
        </div>
      </section>

      <ObservatorySection>
        {/* Featured Article */}
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 48 }}>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src={articles[0].image} alt={articles[0].title} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 16, left: 16, background: OB.accent, padding: '4px 10px' }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: OB.bg, fontWeight: 600 }}>FEATURED</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.accent }}>{articles[0].category}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary }}>{articles[0].date}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary }}><Clock size={10} style={{ display: 'inline', marginRight: 4 }} />{articles[0].readTime}</span>
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.6rem', fontWeight: 500, color: OB.text, margin: '0 0 16px', lineHeight: 1.3 }}>{articles[0].title}</h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.7, marginBottom: 24 }}>{articles[0].excerpt}</p>
              <ObservatoryButton variant="secondary" style={{ alignSelf: 'flex-start' }}>Read Full Analysis</ObservatoryButton>
            </div>
          </div>
        </RevealSection>

        <ScanLine label="Latest Articles" style={{ marginBottom: 32 }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {articles.slice(1).map((article, i) => (
            <StaggerItem key={i} index={i}>
              <div className="observatory-card-hover" style={{ background: OB.card, border: `1px solid ${OB.border}`, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: 180 }}>
                  <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: OB.accent }}>{article.category}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', color: OB.textSecondary }}>{article.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 500, color: OB.text, margin: '0 0 8px', lineHeight: 1.3 }}>{article.title}</h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, lineHeight: 1.6, margin: 0 }}>{article.excerpt.substring(0, 100)}...</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ObservatorySection>
    </>
  )
}
