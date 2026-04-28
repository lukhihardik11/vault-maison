'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { ArrowRight } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const articles = [
  { slug: 'understanding-the-4cs', title: 'Understanding the 4Cs: A Complete Guide', excerpt: 'Carat, cut, color, and clarity — the four pillars of diamond quality explained by our master gemologist.', category: 'Education', date: 'March 2025', image: '/images/products/diamond-round-ring.jpg', featured: true },
  { slug: 'gold-karat-guide', title: 'The Gold Karat Guide: 14K vs 18K vs 24K', excerpt: 'Choosing the right gold purity for your lifestyle. We break down durability, color, and value.', category: 'Guide', date: 'February 2025', image: '/images/products/classic-gold-ring.jpg', featured: false },
  { slug: 'engagement-ring-trends', title: 'Engagement Ring Trends for 2025', excerpt: 'From oval solitaires to east-west settings, discover the styles defining modern proposals.', category: 'Trends', date: 'January 2025', image: '/images/products/classic-engagement-ring.jpg', featured: false },
  { slug: 'lab-grown-vs-natural', title: 'Lab-Grown vs Natural Diamonds: An Honest Comparison', excerpt: 'We examine the science, ethics, and value proposition of both options without bias.', category: 'Education', date: 'December 2024', image: '/images/products/loose-round-diamond.jpg', featured: false },
  { slug: 'caring-for-fine-jewelry', title: 'How to Care for Fine Jewelry at Home', excerpt: 'Professional tips for keeping your pieces brilliant between professional cleanings.', category: 'Care', date: 'November 2024', image: '/images/products/gold-cuff-bracelet.jpg', featured: false },
  { slug: 'bespoke-journey', title: 'Inside the Bespoke Journey: From Sketch to Stone', excerpt: 'Follow a custom engagement ring from initial consultation through final setting in our atelier.', category: 'Behind the Scenes', date: 'October 2024', image: '/images/products/bracelet-on-wrist.jpg', featured: false },
]

export function MinimalJournal() {
  const featured = articles.find(a => a.featured)
  const rest = articles.filter(a => !a.featured)

  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '80px 5vw 0', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>The Journal</p>
        <h1 style={{ fontFamily: font, fontSize: '40px', fontWeight: 600, color: '#050505', marginBottom: '12px' }}>Stories, Guides & Insights</h1>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#9B9B9B', maxWidth: '500px', margin: '0 auto' }}>
          Expert knowledge from our gemologists, behind-the-scenes stories, and curated guides to help you make informed choices.
        </p>
      </section>

      {/* Featured Article */}
      {featured && (
        <section style={{ padding: '60px 5vw 0', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }} className="vm-journal-feat">
            <div className="vm-journal-feat-img" style={{ position: 'relative', aspectRatio: '16/10', backgroundColor: '#FAFAFA', overflow: 'hidden' }}>
              <img src={featured.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%",  objectFit: 'cover', transition: 'transform 600ms ease'  }} />
            </div>
            <div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#050505', padding: '4px 10px', border: '1px solid #050505' }}>{featured.category}</span>
                <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9B9B' }}>{featured.date}</span>
              </div>
              <h2 style={{ fontFamily: font, fontSize: '28px', fontWeight: 600, color: '#050505', marginBottom: '12px', lineHeight: 1.3 }}>{featured.title}</h2>
              <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: '#9B9B9B', marginBottom: '24px' }}>{featured.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#050505' }}>
                Read Article <ArrowRight size={12} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section style={{ padding: '60px 5vw 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }} className="vm-journal-grid">
          {rest.map((article) => (
            <div key={article.slug} className="vm-journal-card">
              <div className="vm-journal-card-img" style={{ position: 'relative', aspectRatio: '16/10', backgroundColor: '#FAFAFA', marginBottom: '16px', overflow: 'hidden' }}>
                <img src={article.image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%",  objectFit: 'cover', transition: 'transform 600ms ease'  }} />
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#050505' }}>{article.category}</span>
                <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9B9B' }}>{article.date}</span>
              </div>
              <h3 style={{ fontFamily: font, fontSize: '18px', fontWeight: 300, color: '#050505', marginBottom: '8px', lineHeight: 1.3 }}>{article.title}</h3>
              <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: '#9B9B9B', marginBottom: '16px' }}>{article.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#050505' }}>
                Read More <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .vm-journal-card-img:hover img, .vm-journal-feat-img:hover img { transform: scale(1.04) !important; }
        .vm-journal-card:hover { box-shadow: 0 4px 20px rgba(180, 170, 160, 0.12) !important; }
        @media (max-width: 1024px) { .vm-journal-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) {
          .vm-journal-grid { grid-template-columns: 1fr !important; }
          .vm-journal-feat { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
