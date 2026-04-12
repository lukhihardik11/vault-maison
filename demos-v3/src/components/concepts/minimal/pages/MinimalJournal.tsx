'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MinimalPage } from '../MinimalPage'

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
  return (
    <MinimalPage title="Journal" subtitle="Notes on craft, material, and design.">
      <div style={{ maxWidth: '800px' }}>
        {/* Featured Article */}
        <Link
          href="#"
          style={{
            display: 'block',
            marginBottom: '60px',
            textDecoration: 'none',
            color: '#050505',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              overflow: 'hidden',
              backgroundColor: '#F5F5F5',
              marginBottom: '20px',
            }}
          >
            <Image
              src={articles[0].image}
              alt={articles[0].title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.4, marginBottom: '8px' }}>
            {articles[0].category} &middot; {articles[0].readTime}
          </p>
          <h2 style={{ fontSize: '22px', fontWeight: 300, marginBottom: '8px' }}>
            {articles[0].title}
          </h2>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7, opacity: 0.6 }}>
            {articles[0].excerpt}
          </p>
        </Link>

        {/* Article List */}
        <div style={{ borderTop: '1px solid #E5E5E5' }}>
          {articles.slice(1).map((article) => (
            <Link
              key={article.slug}
              href="#"
              style={{
                display: 'flex',
                gap: '24px',
                padding: '24px 0',
                borderBottom: '1px solid #E5E5E5',
                textDecoration: 'none',
                color: '#050505',
                alignItems: 'flex-start',
              }}
              className="minimal-journal-item"
            >
              <div
                style={{
                  position: 'relative',
                  width: '120px',
                  height: '80px',
                  flexShrink: 0,
                  backgroundColor: '#F5F5F5',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="120px"
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.3, marginBottom: '4px' }}>
                  {article.category} &middot; {article.readTime}
                </p>
                <h3 style={{ fontSize: '15px', fontWeight: 300, marginBottom: '4px' }}>
                  {article.title}
                </h3>
                <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.6, opacity: 0.5 }}>
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MinimalPage>
  )
}
