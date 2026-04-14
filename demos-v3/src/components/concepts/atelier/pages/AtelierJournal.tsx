'use client'
import React from 'react'
import Link from 'next/link'
import { AtelierLayout, A } from '../AtelierLayout'

const entries = [
  { title: 'The Art of Lost-Wax Casting', excerpt: 'A 6,000-year-old technique that remains the gold standard for fine jewelry. We walk through our process step by step.', date: 'March 2024', tag: 'Technique' },
  { title: 'Sourcing Burmese Rubies', excerpt: 'Our latest trip to Mogok Valley, where we hand-selected stones that will become the heart of our next collection.', date: 'February 2024', tag: 'Sourcing' },
  { title: 'Meet Elena: 22 Years at the Bench', excerpt: 'Our master stone setter shares her journey from apprentice to one of London\'s most respected craftspeople.', date: 'January 2024', tag: 'Artisan' },
  { title: 'The Geometry of a Perfect Setting', excerpt: 'Why millimeters matter: the mathematical precision behind invisible settings and tension mounts.', date: 'December 2023', tag: 'Craft' },
  { title: 'Sustainable Gold: Our Commitment', excerpt: 'How we source recycled and Fairmined gold, and why it matters for the future of fine jewelry.', date: 'November 2023', tag: 'Ethics' },
  { title: 'A Bespoke Journey: The Laurent Commission', excerpt: 'From first sketch to final unveiling — following one client\'s custom engagement ring through every stage.', date: 'October 2023', tag: 'Commission' },
]

export function AtelierJournal() {
  return (
    <AtelierLayout>
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
            From the Bench
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: A.ink, margin: '0 0 16px' }}>
            Workbench Journal
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7 }}>
            Stories of craft, sourcing, and the people behind every piece.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 32px 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {entries.map((entry, i) => (
            <div
              key={i}
              style={{
                padding: '32px 0',
                borderBottom: i < entries.length - 1 ? `1px solid ${A.border}` : 'none',
                display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32, alignItems: 'start',
              }}
            >
              <div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.textSoft, marginBottom: 8 }}>{entry.date}</div>
                <div style={{
                  display: 'inline-block', padding: '3px 10px',
                  fontFamily: 'Caveat, cursive', fontSize: 13, color: A.accent,
                  border: `1px solid ${A.border}`, borderRadius: 1,
                }}>
                  {entry.tag}
                </div>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, margin: '0 0 8px' }}>
                  {entry.title}
                </h3>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.7, margin: '0 0 12px' }}>
                  {entry.excerpt}
                </p>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.accent, cursor: 'pointer' }}>
                  Read More →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AtelierLayout>
  )
}
