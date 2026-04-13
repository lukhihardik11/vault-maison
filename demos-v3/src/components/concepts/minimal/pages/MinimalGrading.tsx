'use client'

import { Scissors, Palette, Eye, Scale } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { SpotlightCards, SlideTextButton } from '../ui'
import type { SpotlightItem } from '../ui/SpotlightCards'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const fourCs: SpotlightItem[] = [
  { icon: Scissors, title: 'Cut', description: 'The precision of facets determines light return. We stock only Excellent and Ideal cut grades.' },
  { icon: Palette, title: 'Color', description: 'Measured D–Z, with D being colorless. Our collection ranges from D to H, ensuring exceptional whiteness.' },
  { icon: Eye, title: 'Clarity', description: 'Rated Flawless to Included. We select stones graded VS2 and above — eye-clean under all conditions.' },
  { icon: Scale, title: 'Carat', description: 'A measure of weight, not size. Our gemologists maximize face-up appearance relative to carat weight.' },
]

export function MinimalGrading() {
  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '100px 5vw 0' }}>
        <div
        >
          <p style={{
            fontFamily: font,
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#050505',
            opacity: 0.4,
            marginBottom: '8px',
          }}>
            Certification
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            Every Stone, Verified
          </h1>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            maxWidth: '540px',
            lineHeight: 1.8,
          }}>
            Every diamond in our collection above 0.30 carats is independently certified by the Gemological Institute of America (GIA) or the International Gemological Institute (IGI). These certificates provide an objective assessment of each stone&apos;s quality characteristics.
          </p>
        </div>
      </section>

      {/* 4Cs SpotlightCards */}
      <section style={{ padding: '80px 5vw' }}>
        <SpotlightCards
          items={fourCs}
          eyebrow="The Standard"
          heading="The 4Cs of Diamond Quality"
        />
      </section>

      {/* Documentation */}
      <section style={{ padding: '80px 5vw 120px', borderTop: '1px solid #E5E5E5' }}>
        <div className="minimal-grading-docs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', maxWidth: '900px' }}>
          <div
          >
            <p style={{
              fontFamily: font,
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#050505',
              opacity: 0.35,
              marginBottom: '16px',
            }}>
              Documentation
            </p>
            <h2 style={{
              fontFamily: font,
              fontSize: '20px',
              fontWeight: 200,
              color: '#050505',
              marginBottom: '16px',
            }}>
              Complete Provenance
            </h2>
            <p style={{
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#050505',
              opacity: 0.6,
            }}>
              Every purchase includes the original grading certificate, a Vault Maison certificate of authenticity, and a detailed appraisal for insurance purposes. Digital copies are available through your account.
            </p>
          </div>
          <div
          >
            <p style={{
              fontFamily: font,
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#050505',
              opacity: 0.35,
              marginBottom: '16px',
            }}>
              Included with Every Purchase
            </p>
            <div>
              {['GIA or IGI Certificate', 'Vault Maison Authenticity Certificate', 'Insurance Appraisal Document', 'Digital Archive Access'].map((item, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid #E5E5E5' }}>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#050505' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '32px' }}>
              <SlideTextButton text="View Collections" hoverText="Browse" href="/minimal/collections" />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .minimal-grading-docs { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
