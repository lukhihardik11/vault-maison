'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { MinimalLayout } from './minimal/MinimalLayout'

/*
 * THE MINIMAL MACHINE — Homepage
 *
 * Full white. Nav: "VAULT MAISON" left, "MENU" right. 11px.
 * Hero: Single product image, centered, max-width 600px.
 * Below: product name 13px, price 13px. Nothing else.
 * Scroll: 3 more products, one per section, 120px apart.
 * Footer: "© Vault Maison" + 4 links. 11px. That's it.
 */

const heroProducts = [
  {
    slug: 'celestial-diamond-ring',
    name: 'Celestial Solitaire',
    price: '$12,500',
    image: '/images/minimal-ring-white.jpg',
  },
  {
    slug: 'aurora-pendant-necklace',
    name: 'Aurora Pendant',
    price: '$4,200',
    image: '/images/minimal-necklace-pendant.jpg',
  },
  {
    slug: 'eternal-tennis-bracelet',
    name: 'Eternal Tennis Bracelet',
    price: '$12,800',
    image: '/images/minimal-tennis-bracelet.jpg',
  },
  {
    slug: 'classic-diamond-studs',
    name: 'Classic Diamond Studs',
    price: '$3,800',
    image: '/images/minimal-earrings-studs.jpg',
  },
]

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  return (
    <MinimalLayout>
      {heroProducts.map((product, i) => (
        <section
          key={product.slug}
          style={{
            padding: '120px 5vw',
          }}
          className="minimal-home-section"
        >
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <Link
              href={`/minimal/product/${product.slug}`}
              style={{ textDecoration: 'none', color: '#050505', display: 'block' }}
              className="minimal-home-link"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3 / 4',
                  overflow: 'hidden',
                  backgroundColor: '#F5F5F5',
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority={i === 0}
                  className="minimal-home-img"
                />
              </div>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  marginTop: '20px',
                  marginBottom: 0,
                }}
              >
                {product.name}
              </p>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 300,
                  marginTop: '4px',
                  marginBottom: 0,
                }}
              >
                {product.price}
              </p>
            </Link>
          </div>
        </section>
      ))}

      <style>{`
        @media (max-width: 768px) {
          .minimal-home-section {
            padding: 80px 20px !important;
          }
        }
        .minimal-home-img {
          opacity: 0.9;
        }
        .minimal-home-link:hover .minimal-home-img {
          opacity: 1;
        }
      `}</style>
    </MinimalLayout>
  )
}
