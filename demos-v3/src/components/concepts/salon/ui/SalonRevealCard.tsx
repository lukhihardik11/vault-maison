'use client'

import React, { useState, useId } from 'react'
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
  const [isFav, setIsFav] = useState(false)
  const uid = useId().replace(/:/g, '')

  return (
    <>
      <style>{`
        .src-${uid} {
          position: relative;
          width: 100%;
          cursor: pointer;
        }
        /* ── Circle state (default) ── */
        .src-${uid} .src-circle {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: ${S.warmPanel};
          box-shadow: 0 2px 12px rgba(44,36,32,0.08), inset 0 1px 3px rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
        }
        .src-${uid} .src-circle img {
          width: 60%;
          height: 60%;
          object-fit: contain;
          filter: drop-shadow(2px 2px 6px rgba(44,36,32,0.15));
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        /* ── Hover: expand to rounded rectangle ── */
        .src-${uid}:hover .src-circle {
          border-radius: 16px;
          aspect-ratio: auto;
          height: auto;
          min-height: 320px;
          box-shadow: 0 12px 40px rgba(44,36,32,0.12), 0 4px 12px rgba(44,36,32,0.08);
          background: ${S.surface};
          border-color: ${S.accent}30;
        }
        .src-${uid}:hover .src-circle img {
          width: 50%;
          height: auto;
          max-height: 140px;
        }
        /* ── Details panel: hidden by default, slides in on hover ── */
        .src-${uid} .src-details {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          padding: 0 20px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.15s;
        }
        .src-${uid}:hover .src-details {
          max-height: 300px;
          opacity: 1;
          padding: 16px 20px 20px;
        }
        /* ── "New" badge ── */
        .src-${uid} .src-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 3;
          font-family: Inter, sans-serif;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, ${S.accent}, #D4A017);
          padding: 4px 12px;
          border-radius: 20px;
          box-shadow: 0 2px 8px rgba(139,105,20,0.3);
          transition: opacity 0.3s;
        }
        /* ── Favorite button ── */
        .src-${uid} .src-fav {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 3;
          background: rgba(255,255,255,0.85);
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s;
          backdrop-filter: blur(4px);
        }
        .src-${uid}:hover .src-fav {
          opacity: 1;
          transform: scale(1);
        }
        .src-${uid} .src-fav:hover {
          background: rgba(255,255,255,1);
          transform: scale(1.1);
        }
        /* ── View button ── */
        .src-${uid} .src-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: Inter, sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #fff;
          background: ${S.accent};
          border: none;
          border-radius: 8px;
          padding: 8px 18px;
          text-decoration: none;
          transition: all 0.3s;
          cursor: pointer;
        }
        .src-${uid} .src-view-btn:hover {
          background: ${S.accentHover};
          box-shadow: 0 4px 12px rgba(139,105,20,0.3);
        }
        /* ── Warm glow ring on hover ── */
        .src-${uid}::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid transparent;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .src-${uid}:hover::after {
          border-radius: 20px;
          border-color: ${S.accent}20;
          box-shadow: 0 0 20px ${S.accent}10;
        }
      `}</style>

      <div className={`src-${uid}`}>
        {/* New badge */}
        {isNew && <span className="src-badge">New</span>}

        {/* Favorite button */}
        <button
          className="src-fav"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsFav(!isFav)
          }}
          style={{ color: isFav ? '#E74C3C' : S.textSecondary }}
        >
          <Heart size={14} fill={isFav ? '#E74C3C' : 'none'} />
        </button>

        {/* Main card body */}
        <Link href={`/${concept}/product/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="src-circle">
            <img src={image} alt={name} />
          </div>

          {/* Details panel — expands on hover */}
          <div className="src-details">
            {category && (
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.55rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: S.textSecondary,
                margin: '0 0 4px',
              }}>
                {category}
              </p>
            )}
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.05rem',
              fontWeight: 500,
              color: S.text,
              margin: '0 0 4px',
              lineHeight: 1.3,
            }}>
              {name}
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: S.accent,
              margin: '0 0 8px',
            }}>
              {price}
            </p>
            {advisorNote && (
              <p style={{
                fontFamily: "'Lora', serif",
                fontSize: '0.7rem',
                fontStyle: 'italic',
                color: S.textSecondary,
                margin: '0 0 12px',
                lineHeight: 1.5,
              }}>
                &ldquo;{advisorNote}&rdquo;
              </p>
            )}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="src-view-btn">
                <ShoppingBag size={12} /> View Details
              </span>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
