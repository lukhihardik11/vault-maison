'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { GalleryLayout, G } from './gallery/GalleryLayout'
import { GalleryLabel } from './gallery/ui/GalleryLabel'
import { MuseumCaption } from './gallery/ui/MuseumCaption'
import { getBestsellers } from '@/data/products'
import { GalleryCircularShowcase, type ShowcaseItem } from './gallery/ui/GalleryCircularShowcase'
import { GalleryTypewriter } from './gallery/ui/GalleryTypewriter'
import { GalleryTimeline } from './gallery/ui/GalleryTimeline'
import { ArrowRight } from 'lucide-react'

const rooms = [
  { num: 'I', name: 'Diamond Rings', slug: 'diamond-rings', image: '/images/products/diamond-solitaire-ring.jpg' },
  { num: 'II', name: 'Gold Necklaces', slug: 'gold-necklaces', image: '/images/products/gold-chain-necklace.jpg' },
  { num: 'III', name: 'Earrings & Studs', slug: 'diamond-earrings', image: '/images/products/diamond-stud-earrings.jpg' },
  { num: 'IV', name: 'Bracelets & Bangles', slug: 'gold-bracelets', image: '/images/products/gold-bangle-bracelet.jpg' },
  { num: 'V', name: "Collector's Stones", slug: 'loose-diamonds', image: '/images/products/loose-round-diamond.jpg' },
]

export function GalleryHome({ concept }: { concept: any }) {
  const featured = getBestsellers().slice(0, 3)
  const [parallaxY, setParallaxY] = useState(0)
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const handleScroll = () => setParallaxY(window.scrollY * 0.05)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <GalleryLayout>
      {/* ═══ SECTION 1: EXHIBITION ENTRANCE (100vh) ═══ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '120px 32px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <p style={{
          fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          fontWeight: 400, letterSpacing: '0.35em', textTransform: 'uppercase',
          color: G.text, margin: '0 0 32px', opacity: 0.7,
        }}>
          Vault Maison
        </p>
        <MuseumCaption align="center">Current Exhibition</MuseumCaption>
        <h1 style={{
          fontFamily: "'Libre Baskerville', 'Playfair Display', serif",
          fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 400,
          color: G.text, margin: '20px 0 48px', lineHeight: 1.15, maxWidth: 800, letterSpacing: '-0.01em',
        }}>
          Luminescence<br />
          <span style={{ fontStyle: 'italic', opacity: 0.6, fontSize: '0.65em' }}>
            The Diamond Collection, 2025
          </span>
        </h1>
        <div style={{ width: '70vw', maxWidth: 900, aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
          <img src="/images/diamond-collection-1.jpg" alt="Luminescence Exhibition"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `translateY(${parallaxY}px)`, transition: 'transform 0.1s linear' }} />
        </div>
        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: G.caption }}>
            Scroll to Explore
          </span>
          <div style={{ width: 1, height: 32, background: G.border }} />
        </div>
      </section>

      {/* ═══ SECTION 2: CURATED SELECTION (3 pieces, editorial) ═══ */}
      <section style={{ padding: '140px 32px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 100 }}>
          <MuseumCaption align="center">Selected Works</MuseumCaption>
          <h2 style={{
            fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
            fontWeight: 400, color: G.text, margin: '16px 0 0', lineHeight: 1.3,
          }}>
            Curated for the Discerning Eye
          </h2>
        </div>

        {/* Piece 1: Image left (60%), text right (40%) */}
        {featured[0] && (
          <Link href={`/gallery/product/${featured[0].slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="gallery-editorial-row" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 48, marginBottom: 140, alignItems: 'center' }}>
              <div style={{ background: G.surface, border: `1px solid ${G.border}`, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={featured[0].images[0]} alt={featured[0].name} className="gallery-editorial-img"
                  style={{ width: '80%', height: '80%', objectFit: 'contain', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              </div>
              <div style={{ padding: '0 24px' }}>
                <GalleryLabel title={featured[0].name} material={featured[0].subtitle}
                  specs={featured[0].diamondSpecs ? `${featured[0].diamondSpecs.carat}ct ${featured[0].diamondSpecs.shape} · ${featured[0].diamondSpecs.color} Color ${featured[0].diamondSpecs.clarity}` : undefined}
                  edition="2025 — Limited Edition" price={featured[0].priceDisplay} year="2025" />
                <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8, color: G.accent }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>View Piece</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Piece 2: Text left (40%), image right (60%) */}
        {featured[1] && (
          <Link href={`/gallery/product/${featured[1].slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="gallery-editorial-row" style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 48, marginBottom: 140, alignItems: 'center' }}>
              <div style={{ padding: '0 24px', textAlign: 'right' }}>
                <GalleryLabel title={featured[1].name} material={featured[1].subtitle}
                  specs={featured[1].diamondSpecs ? `${featured[1].diamondSpecs.carat}ct ${featured[1].diamondSpecs.shape} · ${featured[1].diamondSpecs.color} Color ${featured[1].diamondSpecs.clarity}` : undefined}
                  edition="2025 — Limited Edition" price={featured[1].priceDisplay} year="2025" align="right" />
                <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8, color: G.accent, justifyContent: 'flex-end' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>View Piece</span>
                  <ArrowRight size={14} />
                </div>
              </div>
              <div style={{ background: G.surface, border: `1px solid ${G.border}`, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={featured[1].images[0]} alt={featured[1].name} className="gallery-editorial-img"
                  style={{ width: '80%', height: '80%', objectFit: 'contain', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              </div>
            </div>
          </Link>
        )}

        {/* Piece 3: Full-width image, text below centered */}
        {featured[2] && (
          <Link href={`/gallery/product/${featured[2].slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="gallery-editorial-row">
              <div style={{ background: G.surface, border: `1px solid ${G.border}`, aspectRatio: '21/9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 32 }}>
                <img src={featured[2].images[0]} alt={featured[2].name} className="gallery-editorial-img"
                  style={{ width: '60%', height: '80%', objectFit: 'contain', transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <GalleryLabel title={featured[2].name} material={featured[2].subtitle}
                  specs={featured[2].diamondSpecs ? `${featured[2].diamondSpecs.carat}ct ${featured[2].diamondSpecs.shape} · ${featured[2].diamondSpecs.color} Color ${featured[2].diamondSpecs.clarity}` : undefined}
                  edition="2025 — Limited Edition" price={featured[2].priceDisplay} year="2025" align="center" />
              </div>
            </div>
          </Link>
        )}
      </section>

      {/* ═══ SECTION 3: EXHIBITION ROOMS ═══ */}
      <section style={{ padding: '140px 32px', borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <MuseumCaption align="center">Exhibition Rooms</MuseumCaption>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 400, color: G.text, margin: '16px 0 0' }}>
              Navigate the Collection
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
            {rooms.map((room, i) => (
              <Link key={room.slug} href={`/gallery/category/${room.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}
                onMouseEnter={() => setHoveredRoom(i)} onMouseLeave={() => setHoveredRoom(null)}>
                <div style={{
                  border: `1px solid ${hoveredRoom === i ? G.accent : G.border}`, background: G.surface, padding: 16,
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: hoveredRoom !== null && hoveredRoom !== i ? 0.4 : 1,
                  transform: hoveredRoom === i ? 'translateY(-4px)' : 'none',
                }}>
                  <div style={{ aspectRatio: '3/4', overflow: 'hidden', marginBottom: 16, background: '#F8F6F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={room.image} alt={room.name}
                      style={{ width: '75%', height: '75%', objectFit: 'contain', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)', transform: hoveredRoom === i ? 'scale(1.06)' : 'scale(1)' }} />
                  </div>
                  <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.1em', color: G.caption, margin: '0 0 4px' }}>
                    Room {room.num}
                  </p>
                  <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '0.85rem', fontWeight: 400, color: G.text, margin: 0 }}>
                    {room.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CIRCULAR SHOWCASE — 3D rotating exhibition display ═══ */}
      <section style={{ padding: '120px 32px', borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <MuseumCaption align="center">Exhibition Showcase</MuseumCaption>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 400, color: G.text, margin: '16px 0 0' }}>
              Rotating Display
            </h2>
          </div>
          <GalleryCircularShowcase
            items={[
              { title: 'Celestial Solitaire', subtitle: 'Diamond Ring, 2025', image: '/images/products/diamond-solitaire-ring.jpg' },
              { title: 'Aurora Chain', subtitle: 'Gold Necklace, 2025', image: '/images/products/gold-chain-necklace.jpg' },
              { title: 'Lumière Studs', subtitle: 'Diamond Earrings, 2025', image: '/images/products/diamond-stud-earrings.jpg' },
              { title: 'Heritage Bangle', subtitle: 'Gold Bracelet, 2025', image: '/images/products/gold-bangle-bracelet.jpg' },
              { title: 'Brilliant Round', subtitle: 'Loose Diamond, 2025', image: '/images/products/loose-round-diamond.jpg' },
              { title: 'Eternity Band', subtitle: 'Diamond Ring, 2025', image: '/images/products/diamond-eternity-band.jpg' },
            ]}
            radius={480}
            autoRotateSpeed={0.012}
          />
        </div>
      </section>

      {/* ═══ SECTION 4: COLLECTION STATEMENT (dark room) ═══ */}
      <section style={{ background: G.dark, padding: '160px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(253,251,247,0.4)', marginBottom: 32 }}>
            Curator&apos;s Note
          </p>
          <blockquote style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 400, color: G.cream, lineHeight: 1.5, margin: '0 0 32px', fontStyle: 'italic' }}>
            &ldquo;Every piece begins as an idea.<br />Every idea becomes a legacy.&rdquo;
          </blockquote>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 300, color: 'rgba(253,251,247,0.5)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto' }}>
            At Vault Maison, we believe jewelry is not merely worn — it is exhibited on the body. Each piece in our collection has been selected for its ability to transcend the ordinary, to become a conversation between artisan and wearer that endures across generations.
          </p>
        </div>
      </section>

      {/* ═══ BRAND TIMELINE ═══ */}
      <section style={{ padding: '100px 32px', background: G.bg }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <MuseumCaption align="center">Our Heritage</MuseumCaption>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 400, color: G.text, margin: '16px 0 60px' }}>
            <GalleryTypewriter texts={['A Legacy of Extraordinary Craft']} />
          </h2>
          <GalleryTimeline
            events={[
              { year: '1987', title: 'The Beginning', description: 'Founded in a small London atelier with a vision to create jewelry as art.' },
              { year: '1995', title: 'First Exhibition', description: 'Debuted at the Victoria & Albert Museum, establishing our gallery approach.' },
              { year: '2008', title: 'Maison Expansion', description: 'Opened our flagship salon on New Bond Street, London.' },
              { year: '2019', title: 'Digital Gallery', description: 'Launched our online exhibition space, bringing the gallery experience worldwide.' },
              { year: '2024', title: 'The Vault Collection', description: 'Introduced our most exclusive line of one-of-a-kind masterpieces.' },
            ]}
          />
        </div>
      </section>

      {/* ═══ SECTION 5: GUEST BOOK (newsletter) ═══ */}
      <section style={{ padding: '140px 32px', background: G.bg }}>
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
          <MuseumCaption align="center">Guest Book</MuseumCaption>
          <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 400, color: G.text, margin: '16px 0 12px' }}>
            Join Our Private Viewings
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.textSecondary, lineHeight: 1.7, marginBottom: 36 }}>
            Receive invitations to new exhibitions, private previews, and curator&apos;s notes delivered to your inbox.
          </p>
          <div style={{ display: 'flex', gap: 0 }}>
            <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1, padding: '14px 20px', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: G.text, background: G.surface, border: `1px solid ${G.border}`, borderRight: 'none', borderRadius: 0, outline: 'none', transition: 'border-color 0.3s' }} />
            <button style={{ padding: '14px 28px', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', background: G.accent, color: '#fff', border: 'none', borderRadius: 0, cursor: 'pointer', transition: 'background 0.3s' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = G.accentHover }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = G.accent }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .gallery-editorial-row:hover .gallery-editorial-img { transform: scale(1.03); }
        @media (max-width: 768px) {
          .gallery-editorial-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </GalleryLayout>
  )
}
