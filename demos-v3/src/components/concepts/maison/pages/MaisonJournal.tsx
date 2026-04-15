'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MS, MaisonSection, RevealSection, StaggerItem, SectionLabel } from '../MaisonLayout'
import { Clock } from 'lucide-react'

const articles = [
  { title: 'The Art of Layering Fine Jewelry', category: 'Style', date: 'Mar 12, 2024', readTime: '6 min', image: '/images/maison/elegant-bracelet.jpg', excerpt: 'Discover the timeless art of combining pieces for a look that is uniquely yours.' },
  { title: 'Caring for Your Heirloom Pieces', category: 'Care', date: 'Mar 8, 2024', readTime: '5 min', image: '/images/maison/gold-ring-detail.jpg', excerpt: 'Essential tips for preserving the beauty and value of your fine jewelry collection.' },
  { title: 'Spring Collection Preview', category: 'Collections', date: 'Mar 5, 2024', readTime: '4 min', image: '/images/maison/pearl-necklace.jpg', excerpt: 'A first look at our upcoming spring collection inspired by Mediterranean light.' },
  { title: 'The Story Behind Our Signature Setting', category: 'Craftsmanship', date: 'Feb 28, 2024', readTime: '8 min', image: '/images/maison/artisan-hands.jpg', excerpt: 'How our master jewelers developed the distinctive setting technique that defines our house.' },
  { title: 'Choosing the Perfect Engagement Ring', category: 'Guide', date: 'Feb 22, 2024', readTime: '10 min', image: '/images/maison/diamond-ring.jpg', excerpt: 'A comprehensive guide to finding the ring that tells your love story.' },
  { title: 'Sustainability in Fine Jewelry', category: 'Values', date: 'Feb 15, 2024', readTime: '7 min', image: '/images/maison/gemstone-collection.jpg', excerpt: 'Our commitment to ethical sourcing and environmentally conscious practices.' },
]

export function MaisonJournal() {
  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Stories" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 600, color: MS.text, margin: '0 0 8px' }}>The Journal</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary }}>Stories of craft, style, and the art of fine jewelry.</p>
        </div>
      </section>

      <MaisonSection>
        <RevealSection>
          <Link href="#" style={{ textDecoration: 'none' }}>
            <div className="maison-card-hover" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: MS.card, border: `1px solid ${MS.borderLight}`, borderRadius: 4, overflow: 'hidden', marginBottom: 40 }}>
              <div style={{ position: 'relative', height: 340 }}>
                <Image src={articles[0].image} alt={articles[0].title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: MS.accent, marginBottom: 8 }}>{articles[0].category}</span>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 600, color: MS.text, margin: '0 0 12px' }}>{articles[0].title}</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MS.textSecondary, lineHeight: 1.7, marginBottom: 16 }}>{articles[0].excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={12} color={MS.textSecondary} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: MS.textSecondary }}>{articles[0].readTime} read • {articles[0].date}</span>
                </div>
              </div>
            </div>
          </Link>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {articles.slice(1).map((article, i) => (
            <StaggerItem key={i} index={i}>
              <Link href="#" style={{ textDecoration: 'none' }}>
                <div className="maison-card-hover" style={{ background: MS.card, border: `1px solid ${MS.borderLight}`, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 200 }}>
                    <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 18 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: MS.accent }}>{article.category}</span>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: MS.text, margin: '6px 0 8px' }}>{article.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MS.textSecondary, lineHeight: 1.6, margin: '0 0 10px' }}>{article.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Clock size={10} color={MS.textSecondary} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MS.textSecondary }}>{article.readTime} • {article.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </MaisonSection>
    </>
  )
}
