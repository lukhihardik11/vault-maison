'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TH, TheaterSection, RevealSection, StaggerItem, ActLabel } from '../TheaterLayout'
import { TheaterButton, SceneCard } from '../ui'
import { allCategories, categoryLabels, categoryDescriptions } from '@/data/concepts'
import { getProductsByCategory } from '@/data/products'
import { Layers } from 'lucide-react'

const collectionImages: Record<string, string> = {
  'diamond-rings': '/images/theater/dramatic-ring.jpg',
  'diamond-necklaces': '/images/theater/diamond-glow.jpg',
  'diamond-earrings': '/images/theater/jewel-box.jpg',
  'diamond-bracelets': '/images/theater/crimson-silk.jpg',
  'gold-rings': '/images/theater/gold-mask.jpg',
  'gold-necklaces': '/images/theater/chandelier.jpg',
  'gold-earrings': '/images/theater/spotlight.jpg',
  'gold-bracelets': '/images/theater/golden-light.jpg',
  'loose-diamonds': '/images/theater/dark-elegance.jpg',
  'wedding-bridal': '/images/theater/red-velvet.jpg',
}

export function TheaterCollections() {
  return (
    <>
      <section style={{
        position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(12,10,13,0.7), rgba(12,10,13,0.9)), url('/images/theater/velvet-curtain.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 60px', textAlign: 'center' }}>
          <ActLabel label="The Repertoire" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: TH.text, margin: '0 0 12px' }}>Collections</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary }}>Each collection is a new act in our ongoing performance of luxury.</p>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {allCategories.map((cat, i) => {
            const count = getProductsByCategory(cat).length
            return (
              <StaggerItem key={cat} index={i % 4}>
                <Link href={`/theater/category/${cat}`} style={{ textDecoration: 'none' }}>
                  <div className="theater-card-hover" style={{ background: TH.card, border: `1px solid ${TH.border}`, overflow: 'hidden', display: 'grid', gridTemplateColumns: '200px 1fr' }}>
                    <div style={{ position: 'relative', height: 180 }}>
                      <Image src={collectionImages[cat] || '/images/theater/dramatic-ring.jpg'} alt={categoryLabels[cat]} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: TH.accent, marginBottom: 8 }}>ACT {String(i + 1).padStart(2, '0')} — {count} SCENES</div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 500, color: TH.text, margin: '0 0 8px' }}>{categoryLabels[cat]}</h3>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', color: TH.textSecondary, lineHeight: 1.6, margin: 0 }}>{categoryDescriptions[cat].substring(0, 100)}...</p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </div>
      </TheaterSection>
    </>
  )
}
