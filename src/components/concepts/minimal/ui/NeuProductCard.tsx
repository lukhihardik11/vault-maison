'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { minimal } from '../design-system';

const font = "'Inter', 'Helvetica Neue', sans-serif"

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
      borderRadius: 0,
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
          borderRadius: 0,
          overflow: 'hidden',
          marginBottom: '12px',
          backgroundColor: '#FAFAFA',
        }}>
          <img
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 350ms ease' }}
            className="vm-neu-img" loading="lazy" decoding="async"/>
          {/* Price badge */}
          <span style={{
            position: 'absolute',
            right: '10px',
            bottom: '-10px',
            background: '#FAFAF8',
            color: '#050505',
            fontWeight: 600,
            fontSize: minimal.type.bodySm,
            fontFamily: font,
            padding: '6px 12px',
            borderRadius: 0,
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
              background: '#050505',
              color: '#fff',
              fontFamily: font,
              fontSize: minimal.type.micro,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '3px 8px',
              borderRadius: 0,
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
          borderRadius: 0,
          width: '44px',
          height: '44px',
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
          fill={liked ? '#050505' : 'none'}
          color={liked ? '#050505' : '#767676'}
          style={{ transition: 'all 350ms ease' }}
        />
      </button>

      {/* Content */}
      <div style={{ padding: '4px 10px 8px' }}>
        <p style={{
          fontFamily: font,
          fontSize: minimal.type.caption,
          fontWeight: 500,
          color: '#767676',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '4px',
        }}>{material}</p>
        <Link href={href} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: font,
            fontSize: minimal.type.body,
            fontWeight: 500,
            color: '#050505',
            marginBottom: '8px',
            lineHeight: 1.3,
          }}>{name}</h3>
        </Link>

        {/* Metal + Carat + Cert row */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
          {carat && (
            <span style={{
              fontFamily: font,
              fontSize: minimal.type.caption,
              fontWeight: 400,
              color: '#767676',
            }}>{carat}</span>
          )}
          {certification && (
            <span style={{
              fontFamily: font,
              fontSize: minimal.type.micro,
              fontWeight: 500,
              color: '#050505',
              border: '1px solid #050505',
              padding: '2px 6px',
              borderRadius: 0,
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
          borderRadius: 0,
          border: 'none',
          background: '#050505',
          color: '#FFFFFF',
          fontFamily: font,
          fontSize: minimal.type.caption,
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
        .vm-neu-cta:hover { background: #050505 !important; }
      `}</style>
    </div>
  )
}

export default NeuProductCard
