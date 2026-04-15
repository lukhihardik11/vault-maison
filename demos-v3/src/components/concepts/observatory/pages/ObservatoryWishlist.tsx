'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { OB, ObservatorySection, RevealSection, StaggerItem, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton } from '../ui'
import { getBestsellers } from '@/data/products'
import { Heart, ShoppingBag, Trash2, Eye } from 'lucide-react'

export function ObservatoryWishlist() {
  const wishlistItems = getBestsellers().slice(0, 4)

  return (
    <>
      <section style={{ background: OB.bg, padding: '100px 0 40px', borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Heart size={16} color={OB.accent} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>WATCHLIST</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.text, margin: '0 0 8px' }}>Your Watchlist</h1>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: OB.textSecondary }}>{wishlistItems.length} pieces being monitored</p>
        </div>
      </section>

      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {wishlistItems.map((item, i) => (
            <StaggerItem key={i} index={i}>
              <div className="observatory-card-hover" style={{ background: OB.card, border: `1px solid ${OB.border}`, display: 'grid', gridTemplateColumns: '180px 1fr', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: 200 }}>
                  <Image src={item.images[0]} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 500, color: OB.text, margin: '0 0 4px' }}>{item.name}</h3>
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, margin: '0 0 8px' }}>{item.subtitle}</p>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', fontWeight: 600, color: OB.accent }}>${item.price.toLocaleString()}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <Link href={`/observatory/product/${item.slug}`} style={{ textDecoration: 'none' }}>
                      <ObservatoryButton size="sm" variant="secondary"><Eye size={12} /> View</ObservatoryButton>
                    </Link>
                    <ObservatoryButton size="sm"><ShoppingBag size={12} /> Add to Cart</ObservatoryButton>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ObservatorySection>
    </>
  )
}
