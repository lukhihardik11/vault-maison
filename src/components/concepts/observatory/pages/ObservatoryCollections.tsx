'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { OB, ObservatorySection, RevealSection, StaggerItem, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton, GemDataCard } from '../ui'
import { allCategories, categoryLabels, categoryDescriptions } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'
import { Layers, Grid, Filter } from 'lucide-react'

const collectionImages: Record<string, string> = {
  'diamond-rings': '/images/observatory/diamond-dark.jpg',
  'diamond-necklaces': '/images/observatory/diamond-necklace.jpg',
  'diamond-earrings': '/images/observatory/diamond-closeup.jpg',
  'diamond-bracelets': '/images/observatory/jewelry-display.jpg',
  'gold-rings': '/images/observatory/gold-ring-dark.jpg',
  'gold-necklaces': '/images/observatory/sapphire-ring.jpg',
  'gold-earrings': '/images/observatory/gemstone-blue.jpg',
  'gold-bracelets': '/images/observatory/crystal-structure.jpg',
  'loose-diamonds': '/images/observatory/diamond-loupe.jpg',
  'wedding-bridal': '/images/observatory/nebula.jpg',
}

export function ObservatoryCollections() {
  return (
    <>
      {/* Hero */}
      <section style={{
        position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(10,14,26,0.8), rgba(10,14,26,0.9)), url('/images/observatory/starfield.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 60px', textAlign: 'center' }}>
          <div className="observatory-hero-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <Layers size={14} color={OB.accent} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>
              CURATED CATALOG
            </span>
          </div>
          <h1 className="observatory-hero-fade-delay-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: OB.text, margin: '0 0 16px' }}>
            Collections
          </h1>
          <p className="observatory-hero-fade-delay-2" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.7 }}>
            Every piece in our catalog has been analyzed, verified, and documented with scientific precision.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {allCategories.map((cat, i) => {
            const count = getProductsByCategory(cat).length
            return (
              <StaggerItem key={cat} index={i % 4}>
                <Link href={`/observatory/category/${cat}`} style={{ textDecoration: 'none' }}>
                  <div className="observatory-card-hover" style={{ background: OB.card, border: `1px solid ${OB.border}`, overflow: 'hidden', display: 'grid', gridTemplateColumns: '200px 1fr' }}>
                    <div style={{ position: 'relative', height: 180 }}>
                      <Image src={collectionImages[cat] || '/images/observatory/diamond-dark.jpg'} alt={categoryLabels[cat]} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: OB.accent, marginBottom: 8 }}>
                        {count} PIECES VERIFIED
                      </div>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem', fontWeight: 500, color: OB.text, margin: '0 0 8px' }}>
                        {categoryLabels[cat]}
                      </h3>
                      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.textSecondary, lineHeight: 1.6, margin: 0 }}>
                        {categoryDescriptions[cat].substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </div>
      </ObservatorySection>

      {/* CTA */}
      <ObservatorySection alt style={{ textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 500, color: OB.text, margin: '0 0 16px' }}>
            Need Expert Guidance?
          </h2>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, marginBottom: 32 }}>
            Our gemologists can help you find the perfect piece based on your specifications.
          </p>
          <ObservatoryButton href="/observatory/contact">Schedule Analysis Session</ObservatoryButton>
        </RevealSection>
      </ObservatorySection>
    </>
  )
}
