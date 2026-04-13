'use client'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig, categoryLabels } from '@/data/concepts'
import { MinimalLayout } from './minimal/MinimalLayout'
import { products, getBestsellers, getNewArrivals } from '@/data/products'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

/* ── Style constants cloned from Celine/Mejuri ── */
const eyebrow: React.CSSProperties = {
  fontFamily: font, fontSize: '10px', textTransform: 'uppercase',
  letterSpacing: '0.25em', color: 'rgba(5,5,5,0.4)', fontWeight: 400,
}
const heading: React.CSSProperties = {
  fontFamily: font, fontWeight: 200, letterSpacing: '-0.02em', color: '#050505',
}
const body: React.CSSProperties = {
  fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.7,
  color: 'rgba(5,5,5,0.6)',
}
const linkStyle: React.CSSProperties = {
  fontFamily: font, fontSize: '11px', textTransform: 'uppercase',
  letterSpacing: '0.2em', color: '#050505', textDecoration: 'none',
  borderBottom: '1px solid #050505', paddingBottom: '4px', fontWeight: 400,
}

/* ── Category data ── */
const categories = [
  { slug: 'diamond-rings', label: 'Diamond Rings', image: '/images/products/diamond-solitaire-ring.jpg' },
  { slug: 'diamond-necklaces', label: 'Necklaces', image: '/images/products/diamond-pendant-necklace.jpg' },
  { slug: 'diamond-earrings', label: 'Earrings', image: '/images/products/classic-diamond-studs.jpg' },
  { slug: 'gold-rings', label: 'Gold Rings', image: '/images/products/gold-signet-ring.jpg' },
  { slug: 'gold-necklaces', label: 'Gold Chains', image: '/images/products/gold-chain-necklace.jpg' },
  { slug: 'gold-earrings', label: 'Gold Earrings', image: '/images/products/gold-hoop-earrings.jpg' },
  { slug: 'diamond-bracelets', label: 'Bracelets', image: '/images/products/diamond-tennis-bracelet.jpg' },
  { slug: 'wedding-bridal', label: 'Bridal', image: '/images/products/classic-engagement-ring.jpg' },
]

const bestsellers = getBestsellers().slice(0, 4)
const newArrivals = getNewArrivals().slice(0, 4)

export function MinimalHome({ concept }: { concept: ConceptConfig }) {
  return (
    <MinimalLayout>
      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HERO — Clone Celine full-viewport editorial
          Dark background, centered brand name, large type
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background image with overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
          <Image
            src="/images/products/diamond-solitaire-ring.jpg"
            alt="Diamond ring editorial"
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
            priority
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 20px' }}>
          <p style={{
            fontFamily: font, fontSize: '10px', textTransform: 'uppercase',
            letterSpacing: '0.4em', color: 'rgba(255,255,255,0.5)', marginBottom: '24px',
          }}>
            Collection 2025
          </p>
          <h1 style={{
            fontFamily: font, fontSize: 'clamp(48px, 10vw, 120px)', fontWeight: 200,
            color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '32px',
          }}>
            VAULT MAISON
          </h1>
          <p style={{
            fontFamily: font, fontSize: '13px', fontWeight: 300,
            color: 'rgba(255,255,255,0.6)', maxWidth: '400px', margin: '0 auto 40px',
            lineHeight: 1.8, letterSpacing: '0.02em',
          }}>
            Precision-cut diamonds and fine gold, presented without distraction.
          </p>
          <Link
            href="/minimal/collections"
            style={{
              fontFamily: font, fontSize: '11px', textTransform: 'uppercase',
              letterSpacing: '0.2em', color: '#FFFFFF', textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '6px',
            }}
          >
            Discover the Collection
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: EDITORIAL CAMPAIGN — Clone Celine 2-col images
          Two large editorial images side by side
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px', padding: '0 5vw' }}>
          <p style={eyebrow}>The Atelier</p>
          <h2 style={{ ...heading, fontSize: 'clamp(24px, 3vw, 36px)', marginTop: '12px' }}>
            Where Precision Meets Permanence
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            <Image
              src="/images/products/classic-engagement-ring.jpg"
              alt="Engagement ring editorial"
              fill
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          </div>
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            <Image
              src="/images/products/diamond-pendant-necklace.jpg"
              alt="Diamond pendant editorial"
              fill
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '40px 5vw' }}>
          <Link href="/minimal/craftsmanship" style={linkStyle}>
            Discover the Process
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: SHOP BY CATEGORY — Clone Mejuri horizontal scroll
          8 categories in a scrollable row with circular/square images
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(5,5,5,0.06)' }}>
        <div style={{ padding: '0 5vw', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={eyebrow}>Shop by Category</p>
            <h2 style={{ ...heading, fontSize: '24px', marginTop: '8px' }}>Collections</h2>
          </div>
          <Link href="/minimal/collections" style={linkStyle}>View All</Link>
        </div>
        <div style={{
          display: 'flex', gap: '24px', overflowX: 'auto', padding: '0 5vw',
          scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
        }}>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/minimal/category/${cat.slug}`}
              style={{ textDecoration: 'none', flexShrink: 0, width: '140px', textAlign: 'center' }}
            >
              <div style={{
                width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden',
                backgroundColor: '#F5F5F5', marginBottom: '12px', position: 'relative',
              }}>
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
              <p style={{
                fontFamily: font, fontSize: '11px', textTransform: 'uppercase',
                letterSpacing: '0.15em', color: '#050505', fontWeight: 400,
              }}>
                {cat.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: FEATURED PRODUCT — Clone Celine editorial split
          Full-width image left, text right
      ═══════════════════════════════════════════════════════ */}
      <section style={{ borderTop: '1px solid rgba(5,5,5,0.06)' }}>
        <div className="grid md:grid-cols-2" style={{ minHeight: '70vh' }}>
          <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
            <Image
              src="/images/products/diamond-solitaire-ring.jpg"
              alt="Celestial Diamond Ring"
              fill
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '60px 5vw' }}>
            <div style={{ maxWidth: '420px' }}>
              <p style={{ ...eyebrow, marginBottom: '16px' }}>Featured</p>
              <h2 style={{ ...heading, fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: '16px', lineHeight: 1.2 }}>
                Celestial Diamond Ring
              </h2>
              <p style={{ ...body, marginBottom: '32px' }}>
                A breathtaking 1.5-carat round brilliant diamond set in a cathedral
                18K white gold mounting. Six-prong setting maximizes light return.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                {[
                  { label: 'Carat', value: '1.50ct' },
                  { label: 'Cut', value: 'Ideal' },
                  { label: 'Color', value: 'D' },
                  { label: 'Clarity', value: 'VVS1' },
                ].map((spec) => (
                  <div key={spec.label}>
                    <p style={{ ...eyebrow, marginBottom: '4px' }}>{spec.label}</p>
                    <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#050505' }}>{spec.value}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Link href="/minimal/product/celestial-diamond-ring" style={linkStyle}>
                  View Details
                </Link>
                <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, color: '#050505' }}>
                  $12,500
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: BESTSELLERS — Clone Mejuri 4-col product grid
          4 products with image, name, price, material
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 5vw', borderTop: '1px solid rgba(5,5,5,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <p style={eyebrow}>Most Loved</p>
              <h2 style={{ ...heading, fontSize: '24px', marginTop: '8px' }}>Bestsellers</h2>
            </div>
            <Link href="/minimal/collections" style={linkStyle}>Shop All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '24px' }}>
            {bestsellers.map((product) => (
              <Link
                key={product.id}
                href={`/minimal/product/${product.slug}`}
                style={{ textDecoration: 'none' }}
                className="minimal-product-card"
              >
                <div style={{
                  position: 'relative', aspectRatio: '1', overflow: 'hidden',
                  backgroundColor: '#F5F5F5', marginBottom: '12px',
                }}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                  {product.isBestseller && (
                    <span style={{
                      position: 'absolute', top: '10px', left: '10px',
                      fontFamily: font, fontSize: '9px', textTransform: 'uppercase',
                      letterSpacing: '0.15em', color: '#050505', fontWeight: 500,
                      backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 8px',
                    }}>
                      Bestseller
                    </span>
                  )}
                </div>
                <p style={{
                  fontFamily: font, fontSize: '12px', textTransform: 'uppercase',
                  letterSpacing: '0.08em', color: '#050505', fontWeight: 500, marginBottom: '4px',
                }}>
                  {product.name}
                </p>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>
                  {product.priceDisplay}
                </p>
                <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: 'rgba(5,5,5,0.45)', marginTop: '2px' }}>
                  {product.material}{product.goldKarat ? ` · ${product.goldKarat} ${product.goldColor}` : ''}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: BRAND MANIFESTO — Clone Aesop long-form text
          Large centered text, generous whitespace
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        padding: '100px 5vw', borderTop: '1px solid rgba(5,5,5,0.06)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ ...eyebrow, marginBottom: '32px' }}>Our Philosophy</p>
          <blockquote style={{
            fontFamily: font, fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 200,
            lineHeight: 1.5, color: '#050505', letterSpacing: '-0.01em',
            margin: '0 0 24px', padding: 0, border: 'none',
          }}>
            We believe in the quiet power of precision.
          </blockquote>
          <p style={{ ...body, maxWidth: '500px', margin: '0 auto 40px' }}>
            Every stone is hand-selected. Every setting is intentional.
            No excess. No decoration. Only the essential geometry of precious materials.
          </p>
          <Link href="/minimal/about" style={linkStyle}>
            Read Our Story
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: SECOND EDITORIAL — Clone Celine campaign images
          Single full-width image with text overlay
      ═══════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '60vh', overflow: 'hidden' }}>
        <Image
          src="/images/products/diamond-tennis-bracelet.jpg"
          alt="Tennis bracelet editorial"
          fill
          style={{ objectFit: 'cover' }}
          unoptimized
        />
        <div style={{
          position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center', padding: '0 20px' }}>
            <p style={{
              fontFamily: font, fontSize: '10px', textTransform: 'uppercase',
              letterSpacing: '0.3em', color: 'rgba(255,255,255,0.6)', marginBottom: '16px',
            }}>
              The Eternal Collection
            </p>
            <h2 style={{
              fontFamily: font, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 200,
              color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '24px',
            }}>
              Tennis Bracelets
            </h2>
            <Link
              href="/minimal/category/diamond-bracelets"
              style={{
                fontFamily: font, fontSize: '11px', textTransform: 'uppercase',
                letterSpacing: '0.2em', color: '#FFFFFF', textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '6px',
              }}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8: NEW ARRIVALS — Clone Mejuri product grid
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 5vw', borderTop: '1px solid rgba(5,5,5,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <p style={eyebrow}>Just Added</p>
              <h2 style={{ ...heading, fontSize: '24px', marginTop: '8px' }}>New Arrivals</h2>
            </div>
            <Link href="/minimal/collections" style={linkStyle}>View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '24px' }}>
            {newArrivals.map((product) => (
              <Link
                key={product.id}
                href={`/minimal/product/${product.slug}`}
                style={{ textDecoration: 'none' }}
                className="minimal-product-card"
              >
                <div style={{
                  position: 'relative', aspectRatio: '1', overflow: 'hidden',
                  backgroundColor: '#F5F5F5', marginBottom: '12px',
                }}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px',
                    fontFamily: font, fontSize: '9px', textTransform: 'uppercase',
                    letterSpacing: '0.15em', color: '#050505', fontWeight: 500,
                    backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 8px',
                  }}>
                    New
                  </span>
                </div>
                <p style={{
                  fontFamily: font, fontSize: '12px', textTransform: 'uppercase',
                  letterSpacing: '0.08em', color: '#050505', fontWeight: 500, marginBottom: '4px',
                }}>
                  {product.name}
                </p>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>
                  {product.priceDisplay}
                </p>
                <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: 'rgba(5,5,5,0.45)', marginTop: '2px' }}>
                  {product.material}{product.goldKarat ? ` · ${product.goldKarat} ${product.goldColor}` : ''}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 9: TRUST / METRICS — Clean stat counters
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 5vw', borderTop: '1px solid rgba(5,5,5,0.06)', borderBottom: '1px solid rgba(5,5,5,0.06)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ maxWidth: '1200px', margin: '0 auto', gap: '40px', textAlign: 'center' }}>
          {[
            { number: '1,000+', label: 'Diamonds Sourced' },
            { number: '50+', label: 'Years of Heritage' },
            { number: '2,400', label: 'Bespoke Designs' },
            { number: '98%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label}>
              <p style={{ fontFamily: font, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 200, color: '#050505', marginBottom: '8px' }}>
                {stat.number}
              </p>
              <p style={{ ...eyebrow, fontSize: '10px' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 10: SERVICES — 3 columns, icon + text
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 5vw' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={eyebrow}>Services</p>
            <h2 style={{ ...heading, fontSize: '24px', marginTop: '8px' }}>Beyond the Purchase</h2>
          </div>
          <div className="grid md:grid-cols-3" style={{ gap: '48px' }}>
            {[
              { title: 'Bespoke Design', desc: 'Commission a one-of-a-kind piece. From sketch to setting, we bring your vision to life in 6-8 weeks.', link: '/minimal/bespoke' },
              { title: 'Lifetime Care', desc: 'Complimentary cleaning, inspection, and re-polishing for the life of your piece. Because permanence is our promise.', link: '/minimal/care' },
              { title: 'Private Consultation', desc: 'Book a one-on-one appointment with our gemologists. In-person at our atelier or virtual from anywhere.', link: '/minimal/contact' },
            ].map((service) => (
              <div key={service.title} style={{ textAlign: 'center' }}>
                <h3 style={{ fontFamily: font, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 500, color: '#050505', marginBottom: '12px' }}>
                  {service.title}
                </h3>
                <p style={{ ...body, fontSize: '13px', marginBottom: '16px' }}>
                  {service.desc}
                </p>
                <Link href={service.link} style={{ ...linkStyle, fontSize: '10px' }}>
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 11: NEWSLETTER CTA — Clone Mejuri footer CTA
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        padding: '80px 5vw', borderTop: '1px solid rgba(5,5,5,0.06)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <p style={{ ...eyebrow, marginBottom: '16px' }}>Stay Informed</p>
          <h2 style={{ ...heading, fontSize: 'clamp(20px, 2.5vw, 28px)', marginBottom: '12px' }}>
            Exclusive access to new collections
          </h2>
          <p style={{ ...body, fontSize: '13px', marginBottom: '32px' }}>
            Be the first to discover new pieces, private events, and bespoke opportunities.
          </p>
          <div style={{ display: 'flex', gap: '0', maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Email address"
              style={{
                flex: 1, fontFamily: font, fontSize: '12px', padding: '14px 16px',
                border: '1px solid rgba(5,5,5,0.15)', borderRight: 'none',
                backgroundColor: 'transparent', outline: 'none', color: '#050505',
                letterSpacing: '0.05em',
              }}
            />
            <button
              style={{
                fontFamily: font, fontSize: '11px', textTransform: 'uppercase',
                letterSpacing: '0.15em', padding: '14px 24px',
                backgroundColor: '#050505', color: '#FFFFFF', border: 'none',
                cursor: 'pointer', fontWeight: 400,
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Hover styles for product cards */}
      <style>{`
        .minimal-product-card:hover img {
          transform: scale(1.03);
          transition: transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .minimal-product-card img {
          transition: transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @media (max-width: 768px) {
          .grid.md\\:grid-cols-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
