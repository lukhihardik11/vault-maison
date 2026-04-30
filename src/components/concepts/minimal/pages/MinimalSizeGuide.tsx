'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { ArrowRight } from 'lucide-react'
import { minimal } from '../design-system';

const F = "'Inter', 'Helvetica Neue', sans-serif"
const MONO = "'Space Mono', 'SF Mono', monospace"

/* ── Data ─────────────────────────────────────────────────────────── */

const ringSizes = [
  { us: '4', uk: 'H', eu: '46.8', diameter: '14.9', circ: '46.8' },
  { us: '4.5', uk: 'I', eu: '47.8', diameter: '15.3', circ: '47.8' },
  { us: '5', uk: 'J½', eu: '49.3', diameter: '15.7', circ: '49.3' },
  { us: '5.5', uk: 'K½', eu: '50.3', diameter: '16.1', circ: '50.3' },
  { us: '6', uk: 'L½', eu: '51.9', diameter: '16.5', circ: '51.9' },
  { us: '6.5', uk: 'M½', eu: '52.8', diameter: '16.9', circ: '52.8' },
  { us: '7', uk: 'O', eu: '54.4', diameter: '17.3', circ: '54.4' },
  { us: '7.5', uk: 'P', eu: '55.3', diameter: '17.7', circ: '55.3' },
  { us: '8', uk: 'Q', eu: '57.0', diameter: '18.1', circ: '57.0' },
  { us: '8.5', uk: 'Q½', eu: '57.8', diameter: '18.5', circ: '57.8' },
  { us: '9', uk: 'R½', eu: '59.5', diameter: '18.9', circ: '59.5' },
  { us: '9.5', uk: 'S½', eu: '60.3', diameter: '19.3', circ: '60.3' },
  { us: '10', uk: 'T½', eu: '62.1', diameter: '19.8', circ: '62.1' },
]

const braceletSizes = [
  { size: 'XS', wrist: '14.0 – 15.0', length: '16.5' },
  { size: 'S', wrist: '15.0 – 16.0', length: '17.5' },
  { size: 'M', wrist: '16.0 – 17.0', length: '18.5' },
  { size: 'L', wrist: '17.0 – 18.0', length: '19.5' },
  { size: 'XL', wrist: '18.0 – 19.0', length: '20.5' },
]

const necklaceLengths = [
  { style: 'Choker', length: '35–40 cm / 14–16"', placement: 'Sits close to the neck' },
  { style: 'Princess', length: '43–48 cm / 17–19"', placement: 'Falls just below the collarbone' },
  { style: 'Matinee', length: '50–60 cm / 20–24"', placement: 'Rests at or above the bust' },
  { style: 'Opera', length: '70–90 cm / 28–36"', placement: 'Falls at the sternum or waist' },
]

const measurementTips = [
  {
    title: 'Ring Sizing at Home',
    steps: [
      'Wrap a thin strip of paper or string snugly around the base of your finger.',
      'Mark where the ends overlap with a fine pen.',
      'Measure the length in millimeters — this is your circumference.',
      'Compare to the chart below to find your size.',
    ],
  },
  {
    title: 'Bracelet Sizing at Home',
    steps: [
      'Wrap a flexible tape measure around your wrist, just above the wrist bone.',
      'Note the measurement in centimeters.',
      'Add 1.5–2.0 cm for a comfortable fit.',
      'Match to the bracelet size chart below.',
    ],
  },
]

type Tab = 'rings' | 'bracelets' | 'necklaces'

export function MinimalSizeGuide() {
  const [activeTab, setActiveTab] = useState<Tab>('rings')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'rings', label: 'Rings' },
    { key: 'bracelets', label: 'Bracelets' },
    { key: 'necklaces', label: 'Necklaces' },
  ]

  return (
    <MinimalLayout>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{ padding: '120px 5vw 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <span className="brutalist-section-num" style={{ display: 'block', marginBottom: '24px' }}>01 — Size Guide</span>
        <h1 style={{
          fontFamily: F, fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 600,
          color: '#050505', lineHeight: 1.1, letterSpacing: '-0.03em',
          marginBottom: '24px', maxWidth: '800px',
        }}>
          Find Your<br />
          Perfect Fit.
        </h1>
        <p style={{
          fontFamily: F, fontSize: minimal.type.body, fontWeight: 400,
          lineHeight: 1.9, color: '#6B6B6B', maxWidth: '560px',
        }}>
          Accurate sizing is essential for comfort and security. Use our comprehensive
          guides to find the right size, or visit our atelier for a professional fitting.
        </p>
      </section>

      {/* ── How to Measure ─────────────────────────────────────── */}
      <section style={{ padding: '0 5vw 64px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
          backgroundColor: '#E5E5E5',
        }} className="vm-size-measure">
          {measurementTips.map((tip, i) => (
            <div key={i} style={{ padding: '32px', backgroundColor: '#FAFAFA' }}>
              <h3 style={{
                fontFamily: F, fontSize: minimal.type.body, fontWeight: 500,
                color: '#050505', marginBottom: '20px',
              }}>
                {tip.title}
              </h3>
              <ol style={{ margin: 0, paddingLeft: '16px' }}>
                {tip.steps.map((step, j) => (
                  <li key={j} style={{
                    fontFamily: F, fontSize: minimal.type.bodySm, fontWeight: 400,
                    lineHeight: 1.8, color: '#555',
                    marginBottom: j < tip.steps.length - 1 ? '8px' : '0',
                  }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tab Navigation ─────────────────────────────────────── */}
      <section style={{ padding: '0 5vw', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #E5E5E5' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: F, fontSize: minimal.type.caption, fontWeight: 500,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '16px 24px',
                border: 'none', backgroundColor: 'transparent',
                color: activeTab === tab.key ? '#050505' : '#767676',
                borderBottom: activeTab === tab.key ? '2px solid #050505' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Size Charts ────────────────────────────────────────── */}
      <section style={{ padding: '32px 5vw 80px', maxWidth: '900px', margin: '0 auto' }}>
        {activeTab === 'rings' && (
          <div>
            <h2 style={{
              fontFamily: F, fontSize: minimal.type.h4, fontWeight: 400,
              color: '#050505', marginBottom: '24px',
            }}>
              Ring Size Chart
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%', borderCollapse: 'collapse',
                fontFamily: F, fontSize: minimal.type.bodySm,
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #050505' }}>
                    {['US', 'UK', 'EU', 'Diameter (mm)', 'Circumference (mm)'].map((h) => (
                      <th key={h} style={{
                        fontWeight: 500, fontSize: minimal.type.caption,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: '#050505', padding: '12px 16px',
                        textAlign: 'left',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ringSizes.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #E5E5E5' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#050505' }}>{row.us}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 400, color: '#555' }}>{row.uk}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 400, color: '#555' }}>{row.eu}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 400, color: '#555' }}>{row.diameter}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 400, color: '#555' }}>{row.circ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'bracelets' && (
          <div>
            <h2 style={{
              fontFamily: F, fontSize: minimal.type.h4, fontWeight: 400,
              color: '#050505', marginBottom: '24px',
            }}>
              Bracelet Size Chart
            </h2>
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              fontFamily: F, fontSize: minimal.type.bodySm,
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #050505' }}>
                  {['Size', 'Wrist (cm)', 'Bracelet Length (cm)'].map((h) => (
                    <th key={h} style={{
                      fontWeight: 500, fontSize: minimal.type.caption,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: '#050505', padding: '12px 16px',
                      textAlign: 'left',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {braceletSizes.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #E5E5E5' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: '#050505' }}>{row.size}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 400, color: '#555' }}>{row.wrist}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 400, color: '#555' }}>{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p style={{
              fontFamily: F, fontSize: minimal.type.caption, fontWeight: 400,
              color: '#767676', marginTop: '16px', lineHeight: 1.7,
            }}>
              Bangle sizes are measured by internal diameter. For a snug fit, measure across the widest
              part of your hand when fingers are together. For a loose fit, add 0.5 cm.
            </p>
          </div>
        )}

        {activeTab === 'necklaces' && (
          <div>
            <h2 style={{
              fontFamily: F, fontSize: minimal.type.h4, fontWeight: 400,
              color: '#050505', marginBottom: '24px',
            }}>
              Necklace Length Guide
            </h2>
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              fontFamily: F, fontSize: minimal.type.bodySm,
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #050505' }}>
                  {['Style', 'Length', 'Placement'].map((h) => (
                    <th key={h} style={{
                      fontWeight: 500, fontSize: minimal.type.caption,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: '#050505', padding: '12px 16px',
                      textAlign: 'left',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {necklaceLengths.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #E5E5E5' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: '#050505' }}>{row.style}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 400, color: '#555' }}>{row.length}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 400, color: '#555' }}>{row.placement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Pro Tips ───────────────────────────────────────────── */}
      <section style={{ padding: '0 5vw 80px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ borderLeft: '2px solid #050505', paddingLeft: '24px' }}>
          <h3 style={{
            fontFamily: F, fontSize: minimal.type.bodyLg, fontWeight: 500,
            color: '#050505', marginBottom: '12px',
          }}>
            Professional Tips
          </h3>
          <ul style={{ margin: 0, paddingLeft: '16px' }}>
            {[
              'Measure at the end of the day when fingers are at their largest.',
              'Temperature affects finger size — cold weather shrinks, warm weather expands.',
              'If between sizes, choose the larger size for wider bands (5mm+).',
              'Dominant hand fingers are typically 0.5 size larger than the other hand.',
              'For surprise gifts, borrow a ring they wear on the intended finger and trace the inner circle.',
            ].map((tip, i) => (
              <li key={i} style={{
                fontFamily: F, fontSize: minimal.type.bodySm, fontWeight: 400,
                lineHeight: 1.8, color: '#555',
                marginBottom: i < 4 ? '8px' : '0',
              }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Complimentary Resizing ─────────────────────────────── */}
      <section style={{ padding: '0 5vw 80px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ padding: '32px', backgroundColor: '#FAFAFA' }}>
          <h3 style={{
            fontFamily: F, fontSize: minimal.type.bodyLg, fontWeight: 400,
            color: '#050505', marginBottom: '12px',
          }}>
            Complimentary Resizing
          </h3>
          <p style={{
            fontFamily: F, fontSize: minimal.type.bodySm, fontWeight: 400,
            lineHeight: 1.8, color: '#555', margin: 0,
          }}>
            All Vault Maison rings include one complimentary resizing within the first year
            of purchase. Additional resizings are available for a nominal fee. Please note
            that some designs with continuous stone settings (eternity bands, channel-set rings)
            may have limited sizing options — our team will advise on feasibility.
          </p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section style={{ padding: '0 5vw 100px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ border: '1px solid #050505', padding: '48px 32px' }}>
          <h2 style={{
            fontFamily: F, fontSize: minimal.type.h4, fontWeight: 400,
            color: '#050505', marginBottom: '12px',
          }}>
            Still Unsure?
          </h2>
          <p style={{
            fontFamily: F, fontSize: minimal.type.body, fontWeight: 400,
            lineHeight: 1.8, color: '#555', marginBottom: '24px',
            maxWidth: '480px', margin: '0 auto 24px',
          }}>
            Book a complimentary sizing appointment at our atelier.
            Our team will ensure a perfect fit.
          </p>
          <Link
            href="/minimal/appointments"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: F, fontSize: minimal.type.caption, fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#FFFFFF', backgroundColor: '#050505',
              padding: '14px 32px', textDecoration: 'none',
            }}
          >
            Book Sizing Appointment <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px' }}>
          <Link href="/minimal/collections" style={{ fontFamily: F, fontSize: minimal.type.caption, color: '#767676', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Collections
          </Link>
          <Link href="/minimal/care" style={{ fontFamily: F, fontSize: minimal.type.caption, color: '#767676', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Jewelry Care
          </Link>
          <Link href="/minimal/contact" style={{ fontFamily: F, fontSize: minimal.type.caption, color: '#767676', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Contact Us
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-size-measure { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
