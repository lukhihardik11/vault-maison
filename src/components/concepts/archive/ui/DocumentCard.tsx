'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AR } from '../ArchiveLayout'
import { Shield, FileText } from 'lucide-react'

interface DocumentCardProps {
  title: string
  subtitle?: string
  catalogNumber?: string
  image?: string
  href?: string
  period?: string
  authenticated?: boolean
  description?: string
  price?: string
  style?: React.CSSProperties
}

export function DocumentCard({
  title, subtitle, catalogNumber, image, href, period,
  authenticated, description, price, style = {}
}: DocumentCardProps) {
  const card = (
    <div style={{
      background: AR.docBg,
      border: `1px solid ${AR.docBorder}`,
      overflow: 'hidden',
      position: 'relative',
      ...style,
    }} className="archive-doc-hover">
      {/* Catalog number strip */}
      {catalogNumber && (
        <div style={{
          background: AR.docText,
          padding: '6px 16px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem',
            letterSpacing: '0.12em', color: AR.docBg, textTransform: 'uppercase',
          }}>
            CAT. {catalogNumber}
          </span>
          {period && (
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem',
              letterSpacing: '0.08em', color: AR.docBg + 'aa',
            }}>
              {period}
            </span>
          )}
        </div>
      )}

      {/* Image */}
      {image && (
        <div style={{ position: 'relative', height: 220, background: '#1a1412' }}>
          <Image src={image} alt={title} fill style={{ objectFit: 'contain', padding: 16 }} />
          {/* Authentication stamp overlay */}
          {authenticated && (
            <div style={{
              position: 'absolute', bottom: 12, right: 12,
              background: 'rgba(139, 46, 46, 0.9)',
              border: '1px solid rgba(168, 64, 64, 0.6)',
              borderRadius: '50%', width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Shield size={16} color="#E8DDD4" />
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '16px 20px' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif", fontSize: '1rem',
          fontWeight: 500, color: AR.docText, margin: '0 0 4px',
        }}>
          {title}
        </h3>

        {subtitle && (
          <p style={{
            fontFamily: "'Crimson Text', serif", fontSize: '0.85rem',
            color: AR.docText + 'aa', margin: '0 0 8px', fontStyle: 'italic',
          }}>
            {subtitle}
          </p>
        )}

        {description && (
          <p style={{
            fontFamily: "'Crimson Text', serif", fontSize: '0.85rem',
            color: AR.docText + '99', lineHeight: 1.5, margin: '0 0 12px',
          }}>
            {description}
          </p>
        )}

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          {price && (
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem',
              fontWeight: 600, color: AR.docText,
            }}>
              {price}
            </span>
          )}
          {authenticated && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <FileText size={12} color={AR.stamp} />
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem',
                letterSpacing: '0.08em', color: AR.stamp, textTransform: 'uppercase',
              }}>
                Authenticated
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (href) {
    return <Link href={href} style={{ textDecoration: 'none' }}>{card}</Link>
  }
  return card
}
