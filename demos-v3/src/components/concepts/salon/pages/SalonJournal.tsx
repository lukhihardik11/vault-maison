'use client'

import React from 'react'
import Link from 'next/link'
import { SalonLayout, S } from '../SalonLayout'

const articles = [
  { title: 'How to Choose the Perfect Engagement Ring', author: 'Sophie Laurent', category: 'Guides', excerpt: 'Your complete guide to finding a ring that tells your love story. From diamond shapes to setting styles, we cover everything.', image: '/images/journal-engagement.jpg', slug: 'engagement-ring-guide', featured: true },
  { title: 'Understanding Diamond Grading', author: 'James Chen', category: 'Education', excerpt: 'The 4Cs explained in plain language. What really matters when choosing a diamond.', image: '/images/journal-grading.jpg', slug: 'diamond-grading' },
  { title: 'The Art of Layering Necklaces', author: 'Aria Patel', category: 'Styling', excerpt: 'Create a look that\'s uniquely yours with our layering tips and tricks.', image: '/images/journal-layering.jpg', slug: 'layering-necklaces' },
  { title: 'Caring for Your Fine Jewelry', author: 'Sophie Laurent', category: 'Care', excerpt: 'Simple daily habits that keep your pieces looking their best for generations.', image: '/images/journal-care.jpg', slug: 'jewelry-care' },
  { title: 'Investment Diamonds: A Beginner\'s Guide', author: 'James Chen', category: 'Investment', excerpt: 'Everything you need to know about diamonds as an alternative investment.', image: '/images/journal-investment.jpg', slug: 'investment-diamonds' },
  { title: 'Behind the Scenes: Custom Design Process', author: 'Aria Patel', category: 'Bespoke', excerpt: 'Follow a custom piece from initial sketch to final polish.', image: '/images/journal-bespoke.jpg', slug: 'custom-design-process' },
]

export function SalonJournal() {
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <SalonLayout>
      <section style={{ padding: '60px 32px 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>From Our Advisors</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>The Journal</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, maxWidth: 500, margin: '0 auto' }}>Stories, guides, and insights from our team of advisors and gemologists.</p>
      </section>

      {/* Featured article */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 60px' }}>
        <Link href={`/salon/journal/${featured.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="salon-featured-article" style={{
            display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0,
            borderRadius: S.radiusLg, overflow: 'hidden', border: `1px solid ${S.border}`,
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <div style={{ background: S.warmPanel, overflow: 'hidden', minHeight: 360 }}>
              <img src={featured.image} alt={featured.title} className="salon-feat-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} />
            </div>
            <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: S.surface }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>{featured.category} • Featured</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 400, color: S.text, margin: '0 0 12px', lineHeight: 1.3 }}>{featured.title}</h2>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, lineHeight: 1.7, margin: '0 0 20px' }}>{featured.excerpt}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: S.textSecondary }}>By {featured.author}</p>
            </div>
          </div>
        </Link>
      </section>

      {/* Article grid */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {rest.map((article) => (
            <Link key={article.slug} href={`/salon/journal/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="salon-article-card" style={{
                borderRadius: S.radiusLg, overflow: 'hidden', border: `1px solid ${S.border}`,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', background: S.surface,
              }}>
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', background: S.warmPanel }}>
                  <img src={article.image} alt={article.title} className="salon-art-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} />
                </div>
                <div style={{ padding: '20px 20px 24px' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: S.accent, margin: '0 0 8px' }}>{article.category}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 400, color: S.text, margin: '0 0 8px', lineHeight: 1.3 }}>{article.title}</h3>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: '0.78rem', color: S.textSecondary, lineHeight: 1.6, margin: '0 0 12px' }}>{article.excerpt}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: S.textSecondary }}>By {article.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .salon-featured-article:hover { transform: translateY(-4px); box-shadow: 0 16px 48px ${S.shadow}; }
        .salon-featured-article:hover .salon-feat-img { transform: scale(1.05); }
        .salon-article-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px ${S.shadow}; }
        .salon-article-card:hover .salon-art-img { transform: scale(1.05); }
      `}</style>
    </SalonLayout>
  )
}
