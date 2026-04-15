'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MK } from '../MarketplaceLayout'

interface LotCardProps {
  image: string; title: string; subtitle: string; price?: number; href: string; lotNumber?: string; bids?: number; endingSoon?: boolean
}

export function LotCard({ image, title, subtitle, price, href, lotNumber, bids, endingSoon }: LotCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div className="marketplace-card-hover" style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: 260 }}>
          <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
          {lotNumber && (
            <div style={{ position: 'absolute', top: 10, left: 10, background: `${MK.bg}e0`, padding: '3px 8px', borderRadius: 2 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.1em', color: MK.textSecondary }}>LOT {lotNumber}</span>
            </div>
          )}
          {endingSoon && (
            <div style={{ position: 'absolute', top: 10, right: 10, background: `${MK.urgent}e0`, padding: '3px 8px', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: MK.text, animation: 'marketplace-pulse 1.5s infinite' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 600, color: MK.text }}>ENDING SOON</span>
            </div>
          )}
        </div>
        <div style={{ padding: 16 }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: MK.text, margin: '0 0 4px' }}>{title}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MK.textSecondary, margin: '0 0 12px' }}>{subtitle}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {price && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: MK.accent }}>${price.toLocaleString()}</span>}
            {bids !== undefined && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MK.textSecondary }}>{bids} bids</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
