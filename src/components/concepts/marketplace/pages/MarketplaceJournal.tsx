'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MK, MarketplaceSection, RevealSection, StaggerItem, SectionLabel } from '../MarketplaceLayout'
import { Clock, ArrowRight } from 'lucide-react'

const articles = [
  { title: 'The Rise of Colored Diamond Investing', category: 'Market Insight', date: 'Mar 12, 2024', readTime: '8 min', image: '/images/marketplace/rare-emerald.jpg', excerpt: 'Colored diamonds have outperformed traditional investments by 12% annually over the past decade.' },
  { title: 'Authentication in the Digital Age', category: 'Technology', date: 'Mar 8, 2024', readTime: '6 min', image: '/images/marketplace/certificate.jpg', excerpt: 'How blockchain and AI are revolutionizing the way we verify and track precious jewelry provenance.' },
  { title: 'Record-Breaking Sapphire Sells for $14.2M', category: 'Auction Results', date: 'Mar 5, 2024', readTime: '4 min', image: '/images/marketplace/sapphire-closeup.jpg', excerpt: 'A rare Kashmir sapphire set a new world record at our Spring Exceptional Gems auction.' },
  { title: 'Consignment Guide: Maximizing Your Return', category: 'Guide', date: 'Feb 28, 2024', readTime: '10 min', image: '/images/marketplace/collector-desk.jpg', excerpt: 'Expert tips on preparing your pieces for consignment and achieving the best possible results.' },
  { title: 'Estate Jewelry: Hidden Treasures', category: 'Education', date: 'Feb 22, 2024', readTime: '7 min', image: '/images/marketplace/heritage-piece.jpg', excerpt: 'Why estate and vintage jewelry continues to captivate collectors and command premium prices.' },
  { title: 'Global Market Report Q1 2024', category: 'Report', date: 'Feb 15, 2024', readTime: '12 min', image: '/images/marketplace/gold-bars.jpg', excerpt: 'A comprehensive analysis of jewelry market trends, pricing data, and collector behavior.' },
]

export function MarketplaceJournal() {
  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Insights" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.text, margin: '0 0 8px' }}>Market Journal</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary }}>Expert analysis, auction results, and collector insights.</p>
        </div>
      </section>

      <MarketplaceSection>
        {/* Featured article */}
        <RevealSection>
          <Link href="#" style={{ textDecoration: 'none' }}>
            <div className="marketplace-card-hover" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, overflow: 'hidden', marginBottom: 40 }}>
              <div style={{ position: 'relative', height: 320 }}>
                <Image src={articles[0].image} alt={articles[0].title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: MK.accent, marginBottom: 8 }}>{articles[0].category}</span>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: MK.text, margin: '0 0 12px' }}>{articles[0].title}</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary, lineHeight: 1.7, marginBottom: 16 }}>{articles[0].excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={12} color={MK.textSecondary} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: MK.textSecondary }}>{articles[0].readTime} read • {articles[0].date}</span>
                </div>
              </div>
            </div>
          </Link>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {articles.slice(1).map((article, i) => (
            <StaggerItem key={i} index={i}>
              <Link href="#" style={{ textDecoration: 'none' }}>
                <div className="marketplace-card-hover" style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 180 }}>
                    <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 16 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: MK.accent }}>{article.category}</span>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: MK.text, margin: '6px 0 8px' }}>{article.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MK.textSecondary, lineHeight: 1.6, margin: '0 0 10px' }}>{article.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Clock size={10} color={MK.textSecondary} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MK.textSecondary }}>{article.readTime} • {article.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </MarketplaceSection>
    </>
  )
}
