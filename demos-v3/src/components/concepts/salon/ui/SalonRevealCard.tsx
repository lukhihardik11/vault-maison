'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { S } from '../SalonLayout'

interface SalonRevealCardProps {
  name: string
  slug: string
  price: string
  image: string
  category?: string
  advisorNote?: string
  isNew?: boolean
  concept?: string
}

export function SalonRevealCard({
  name,
  slug,
  price,
  image,
  category,
  advisorNote,
  isNew,
  concept = 'salon',
}: SalonRevealCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFav, setIsFav] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1',
        cursor: 'pointer',
      }}
    >
      {/* Circle preview — visible by default, fades on hover */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75%',
          height: '75%',
          borderRadius: isHovered ? '16px' : '50%',
          background: S.warmPanel,
          boxShadow: `0 0 3px 1px rgba(44,36,32,0.1), 2px 2px 6px rgba(44,36,32,0.15), inset 2px 2px 4px rgba(255,255,255,0.6)`,
          opacity: isHovered ? 0 : 1,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
          transitionDelay: isHovered ? '0s' : '0.5s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: '65%',
            height: '65%',
            objectFit: 'contain',
            filter: 'drop-shadow(2px 2px 4px rgba(44,36,32,0.2))',
            opacity: isHovered ? 0 : 1,
            transition: 'opacity 0.3s ease',
            transitionDelay: isHovered ? '0s' : '0.3s',
          }}
        />
      </div>

      {/* Expanded content — hidden by default, reveals on hover */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isHovered ? '100%' : '75%',
          height: isHovered ? '100%' : '75%',
          borderRadius: '16px',
          background: S.surface,
          boxShadow: isHovered
            ? `0 8px 32px rgba(44,36,32,0.15), 0 2px 8px rgba(44,36,32,0.1)`
            : `0 0 3px 1px rgba(44,36,32,0.1)`,
          visibility: isHovered ? 'visible' : 'hidden',
          opacity: isHovered ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDelay: isHovered ? '0.35s' : '0s',
          display: 'flex',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        {/* Left: Details */}
        <div
          style={{
            flex: 1,
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            transitionDelay: isHovered ? '0.55s' : '0s',
          }}
        >
          <div>
            {isNew && (
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.55rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  background: `linear-gradient(135deg, ${S.accent}, #D4A017)`,
                  padding: '3px 10px',
                  borderRadius: '6px',
                  marginBottom: 8,
                }}
              >
                New
              </span>
            )}
            {category && (
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: S.textSecondary,
                  margin: '0 0 6px',
                }}
              >
                {category}
              </p>
            )}
            <Link href={`/${concept}/product/${slug}`} style={{ textDecoration: 'none' }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: S.text,
                  margin: '0 0 4px',
                  lineHeight: 1.3,
                }}
              >
                {name}
              </h3>
            </Link>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: S.accent,
                margin: '0 0 8px',
              }}
            >
              {price}
            </p>
            {advisorNote && (
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '0.65rem',
                  fontStyle: 'italic',
                  color: S.textSecondary,
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {advisorNote}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <Link
              href={`/${concept}/product/${slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 500,
                color: '#fff',
                background: S.accent,
                border: 'none',
                borderRadius: '8px',
                padding: '6px 14px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              <ShoppingBag size={12} /> View
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsFav(!isFav)
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: `1px solid ${S.border}`,
                borderRadius: '8px',
                padding: '6px 10px',
                cursor: 'pointer',
                color: isFav ? '#E74C3C' : S.textSecondary,
                transition: 'all 0.2s',
              }}
            >
              <Heart size={12} fill={isFav ? '#E74C3C' : 'none'} />
            </button>
          </div>
        </div>

        {/* Right: Product image */}
        <div
          style={{
            position: 'relative',
            width: '45%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={image}
            alt={name}
            style={{
              width: '85%',
              height: '85%',
              objectFit: 'contain',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(0.5)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: isHovered ? '0.45s' : '0s',
              filter: 'drop-shadow(2px 4px 8px rgba(44,36,32,0.15))',
            }}
          />
        </div>
      </div>

      {/* Premium ribbon badge */}
      {isNew && !isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '8%',
            left: '8%',
            width: 60,
            height: 60,
            overflow: 'hidden',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '150%',
              height: 22,
              background: `linear-gradient(45deg, ${S.accent}, #D4A017, ${S.accent})`,
              transform: 'rotate(-45deg) translateY(-6px)',
              transformOrigin: 'top left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.5rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
              top: 14,
              left: -6,
            }}
          >
            New
          </div>
        </div>
      )}
    </div>
  )
}
