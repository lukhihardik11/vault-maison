'use client'

import React from 'react'

interface AccordionItem {
  image: string
  label: string
  subtitle?: string
}

interface VaultAccordionGalleryProps {
  items: AccordionItem[]
  height?: number
}

export function VaultAccordionGallery({ items, height = 420 }: VaultAccordionGalleryProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, height, width: '100%' }}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="vault-accordion-strip"
          style={{
            position: 'relative',
            flexGrow: 1,
            width: 80,
            height: '100%',
            borderRadius: 8,
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
        >
          <img
            src={item.image}
            alt={item.label}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
            }}
          />
          {/* Dark overlay gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
            transition: 'opacity 0.4s',
          }} />
          {/* Gold accent line at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            opacity: 0.6,
          }} />
          {/* Label */}
          <div className="vault-accordion-label" style={{
            position: 'absolute', bottom: 20, left: 20, right: 20,
            transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
          }}>
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(0.7rem, 1.2vw, 1rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '0.05em',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>
              {item.label}
            </p>
            {item.subtitle && (
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                color: 'rgba(212,175,55,0.8)',
                margin: '4px 0 0',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                opacity: 0,
                transition: 'opacity 0.4s 0.2s',
              }}
              className="vault-accordion-subtitle"
              >
                {item.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}
      <style>{`
        .vault-accordion-strip:hover {
          width: 100% !important;
          flex-grow: 3 !important;
          border-color: rgba(212,175,55,0.4) !important;
        }
        .vault-accordion-strip:hover img {
          transform: scale(1.05);
        }
        .vault-accordion-strip:hover .vault-accordion-subtitle {
          opacity: 1 !important;
        }
        .vault-accordion-strip:not(:hover) {
          flex-grow: 1;
        }
      `}</style>
    </div>
  )
}
