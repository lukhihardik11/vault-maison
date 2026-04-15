'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

interface NeuProductCardProps {
  name: string
  price: number
  image: string
  href: string
  material?: string
  carat?: string
  certification?: string
  isNew?: boolean
  onWishlist?: () => void
  wishlisted?: boolean
}

export const NeuProductCard: React.FC<NeuProductCardProps> = ({
  name,
  price,
  image,
  href,
  material = '18K Gold',
  carat,
  certification,
  isNew = false,
  onWishlist,
  wishlisted = false,
}) => {
  const [liked, setLiked] = useState(wishlisted)

  return (
    <div className="vm-neu-card" style={{
      position: 'relative',
      width: '100%',
      background: '#FAFAF8',
      borderRadius: '14px',
      padding: '6px',
      boxShadow: '0 8px 24px rgba(100,100,111,0.08)',
      transition: 'all 350ms ease',
    }}>
      {/* Image container */}
      <Link href={href} style={{ textDecoration: 'none' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '12px',
          backgroundColor: '#F5F4F0',
        }}>
          <img
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 350ms ease' }}
            className="vm-neu-img"
          />
          {/* Price badge */}
          <span style={{
            position: 'absolute',
            right: '10px',
            bottom: '-10px',
            background: '#FAFAF8',
            color: '#C4A265',
            fontWeight: 600,
            fontSize: '13px',
            fontFamily: font,
            padding: '6px 12px',
            borderRadius: '10px 10px 14px 14px',
            boxShadow: '0 2px 10px rgba(100,100,111,0.1)',
            letterSpacing: '0.02em',
          }}>
            ${price.toLocaleString()}
          </span>
          {isNew && (
            <span style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: '#C4A265',
              color: '#fff',
              fontFamily: font,
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              borderRadius: '4px',
            }}>New</span>
          )}
        </div>
      </Link>

      {/* Wishlist heart */}
      <button
        onClick={() => { setLiked(!liked); onWishlist?.() }}
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          background: 'rgba(255,255,255,0.85)',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 3,
          transition: 'transform 350ms ease',
        }}
        className="vm-neu-heart"
      >
        <Heart
          size={15}
          strokeWidth={1.5}
          fill={liked ? '#C4A265' : 'none'}
          color={liked ? '#C4A265' : '#9B9590'}
          style={{ transition: 'all 350ms ease' }}
        />
      </button>

      {/* Content */}
      <div style={{ padding: '4px 10px 8px' }}>
        <p style={{
          fontFamily: font,
          fontSize: '11px',
          fontWeight: 500,
          color: '#9B9590',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '4px',
        }}>{material}</p>
        <Link href={href} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: font,
            fontSize: '14px',
            fontWeight: 500,
            color: '#1A1A1A',
            marginBottom: '8px',
            lineHeight: 1.3,
          }}>{name}</h3>
        </Link>

        {/* Metal + Carat + Cert row */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
          {carat && (
            <span style={{
              fontFamily: font,
              fontSize: '11px',
              fontWeight: 400,
              color: '#9B9590',
            }}>{carat}</span>
          )}
          {certification && (
            <span style={{
              fontFamily: font,
              fontSize: '9px',
              fontWeight: 500,
              color: '#C4A265',
              border: '1px solid #C4A265',
              padding: '2px 6px',
              borderRadius: '4px',
              letterSpacing: '0.05em',
            }}>{certification}</span>
          )}
        </div>

        {/* Add to cart */}
        <Link href={href} className="vm-neu-cta" style={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
          padding: '10px',
          borderRadius: '10px 10px 8px 8px',
          border: 'none',
          background: '#1A1A1A',
          color: '#FFFFFF',
          fontFamily: font,
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'all 350ms ease',
        }}>
          View Details
        </Link>
      </div>

      <style>{`
        .vm-neu-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(180,170,160,0.15); }
        .vm-neu-card:hover .vm-neu-img { transform: scale(1.04); }
        .vm-neu-heart:hover { transform: scale(1.15); }
        .vm-neu-cta:hover { background: #C4A265 !important; }
      `}</style>
    </div>
  )
}

export default NeuProductCard
