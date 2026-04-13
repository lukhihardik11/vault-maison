'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const articles = [
  {
    slug: 'art-of-the-solitaire',
    title: 'The Art of the Solitaire',
    excerpt: 'Why the single-stone ring remains the ultimate expression of clarity and intention.',
    image: '/images/diamond-facets-1.jpg',
    date: '2024-03-15',
    category: 'Design',
    readTime: '4 min',
  },
  {
    slug: 'understanding-the-4cs',
    title: 'Understanding the 4Cs',
    excerpt: 'A concise guide to cut, color, clarity, and carat — and why cut matters most.',
    image: '/images/diamond-collection-1.jpg',
    date: '2024-03-01',
    category: 'Education',
    readTime: '6 min',
  },
  {
    slug: 'lab-grown-vs-natural',
    title: 'Lab-Grown vs. Natural',
    excerpt: 'An honest comparison of origin, value, and the science behind both.',
    image: '/images/diamond-melee-1.jpg',
    date: '2024-02-15',
    category: 'Science',
    readTime: '5 min',
  },
  {
    slug: 'gold-through-the-ages',
    title: 'Gold Through the Ages',
    excerpt: 'From ancient Egypt to modern minimalism — how gold has shaped jewelry design.',
    image: '/images/diamond-velvet-1.jpg',
    date: '2024-02-01',
    category: 'History',
    readTime: '7 min',
  },
  {
    slug: 'caring-for-your-pieces',
    title: 'Caring for Your Pieces',
    excerpt: 'Simple maintenance practices that preserve brilliance for generations.',
    image: '/images/fine-jewelry-product.jpg',
    date: '2024-01-15',
    category: 'Care',
    readTime: '3 min',
  },
  {
    slug: 'the-bespoke-process',
    title: 'The Bespoke Process',
    excerpt: 'From initial sketch to final polish — inside our custom design workflow.',
    image: '/images/diamond-dark-bg-1.jpg',
    date: '2024-01-01',
    category: 'Process',
    readTime: '5 min',
  },
]

export function MinimalJournal() {
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '100px 5vw 0' }}>
        <div
        >
          <p style={{
            fontFamily: font,
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#050505',
            opacity: 0.4,
            marginBottom: '8px',
          }}>
            Journal
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            Notes on Craft
          </h1>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            maxWidth: '500px',
          }}>
            Observations on material, design, and the pursuit of precision.
          </p>
        </div>
      </section>

      {/* Featured Article — Full Width */}
      <section style={{ padding: '60px 5vw 0' }}>
        <div
        >
          <Link
            href="#"
            style={{ textDecoration: 'none', color: '#050505', display: 'block' }}
            className="minimal-journal-featured"
          >
            <div className="minimal-journal-featured-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '40px', alignItems: 'center' }}>
              <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                  unoptimized
                  className="minimal-journal-featured-img"
                />
              </div>
              <div>
                <p style={{
                  fontFamily: font,
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#050505',
                  opacity: 0.35,
                  marginBottom: '12px',
                }}>
                  {featured.category} &middot; {featured.readTime}
                </p>
                <h2 style={{
                  fontFamily: font,
                  fontSize: '26px',
                  fontWeight: 200,
                  letterSpacing: '0.01em',
                  color: '#050505',
                  lineHeight: 1.3,
                  marginBottom: '16px',
                }}>
                  {featured.title}
                </h2>
                <p style={{
                  fontFamily: font,
                  fontSize: '13px',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: '#050505',
                  opacity: 0.6,
                  marginBottom: '24px',
                }}>
                  {featured.excerpt}
                </p>
                <span style={{
                  fontFamily: font,
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#050505',
                  opacity: 0.5,
                }}>
                  Read Article &rarr;
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Article Grid — 3 columns */}
      <section style={{ padding: '80px 5vw 120px' }}>
        <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '48px' }}>
          <div className="minimal-journal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {rest.map((article, i) => (
              <div
                key={article.slug}
              >
                <Link
                  href="#"
                  style={{ textDecoration: 'none', color: '#050505', display: 'block' }}
                  className="minimal-journal-card"
                >
                  <div style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden', backgroundColor: '#F5F5F5', marginBottom: '16px' }}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      style={{ objectFit: 'cover', transition: 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                      unoptimized
                      className="minimal-journal-card-img"
                    />
                  </div>
                  <p style={{
                    fontFamily: font,
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#050505',
                    opacity: 0.35,
                    marginBottom: '8px',
                  }}>
                    {article.category} &middot; {article.readTime}
                  </p>
                  <h3 style={{
                    fontFamily: font,
                    fontSize: '16px',
                    fontWeight: 300,
                    letterSpacing: '0.01em',
                    color: '#050505',
                    lineHeight: 1.3,
                    marginBottom: '8px',
                  }}>
                    {article.title}
                  </h3>
                  <p style={{
                    fontFamily: font,
                    fontSize: '12px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: '#050505',
                    opacity: 0.5,
                  }}>
                    {article.excerpt}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .minimal-journal-featured:hover .minimal-journal-featured-img {
          transform: scale(1.03);
        }
        .minimal-journal-card:hover .minimal-journal-card-img {
          transform: scale(1.03);
        }
        @media (max-width: 768px) {
          .minimal-journal-featured-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .minimal-journal-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .minimal-journal-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </MinimalLayout>
  )
}
