'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { AR, RevealSection } from '../ArchiveLayout'
import { FileText, Shield, MapPin, Calendar } from 'lucide-react'

export interface ProvenanceEntry {
  year: string
  title: string
  description: string
  location?: string
  document?: string
  verified?: boolean
  image?: string
}

interface ProvenanceTimelineProps {
  entries: ProvenanceEntry[]
  style?: React.CSSProperties
}

export function ProvenanceTimeline({ entries, style = {} }: ProvenanceTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div style={{ position: 'relative', ...style }}>
      {/* Vertical line */}
      <div style={{
        position: 'absolute', left: 24, top: 0, bottom: 0, width: 1,
        background: `linear-gradient(180deg, transparent, ${AR.accent}, ${AR.accent}, transparent)`,
      }} />

      {entries.map((entry, i) => (
        <RevealSection key={i} delay={i * 100}>
          <div
            style={{
              display: 'flex', gap: 24, marginBottom: 32, cursor: 'pointer',
              paddingLeft: 0,
            }}
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
          >
            {/* Timeline node */}
            <div style={{
              flexShrink: 0, width: 48, height: 48,
              borderRadius: '50%',
              background: entry.verified ? AR.accent : AR.card,
              border: `2px solid ${entry.verified ? AR.accent : AR.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1,
              boxShadow: entry.verified ? `0 0 16px ${AR.accent}44` : 'none',
            }}>
              {entry.verified ? (
                <Shield size={18} color="#1E1614" />
              ) : (
                <Calendar size={16} color={AR.textSecondary} />
              )}
            </div>

            {/* Content card */}
            <div style={{
              flex: 1,
              background: AR.card,
              border: `1px solid ${expandedIndex === i ? AR.accent + '66' : AR.border}`,
              padding: '20px 24px',
              transition: 'all 0.3s ease',
            }} className="archive-doc-hover">
              {/* Year badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem',
                  letterSpacing: '0.1em', color: AR.accent, fontWeight: 600,
                }}>
                  {entry.year}
                </span>
                {entry.verified && (
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#4CAF50', background: 'rgba(76, 175, 80, 0.1)',
                    padding: '2px 8px', border: '1px solid rgba(76, 175, 80, 0.2)',
                  }}>
                    VERIFIED
                  </span>
                )}
              </div>

              <h4 style={{
                fontFamily: "'Playfair Display', serif", fontSize: '1.1rem',
                fontWeight: 500, color: AR.text, margin: '0 0 8px',
              }}>
                {entry.title}
              </h4>

              <p style={{
                fontFamily: "'Crimson Text', serif", fontSize: '0.9rem',
                color: AR.textSecondary, lineHeight: 1.6, margin: 0,
              }}>
                {entry.description}
              </p>

              {/* Expanded details */}
              {expandedIndex === i && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${AR.border}` }}>
                  {entry.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <MapPin size={14} color={AR.accent} />
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: AR.textSecondary }}>
                        {entry.location}
                      </span>
                    </div>
                  )}
                  {entry.document && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <FileText size={14} color={AR.accent} />
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: AR.textSecondary }}>
                        {entry.document}
                      </span>
                    </div>
                  )}
                  {entry.image && (
                    <div style={{ marginTop: 12, position: 'relative', height: 160, borderRadius: 2, overflow: 'hidden' }}>
                      <Image src={entry.image} alt={entry.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </RevealSection>
      ))}
    </div>
  )
}
