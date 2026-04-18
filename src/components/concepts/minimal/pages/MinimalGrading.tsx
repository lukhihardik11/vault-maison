'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { Diamond, ArrowRight } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const fourCs = [
  {
    letter: 'C', title: 'Carat',
    desc: 'Carat refers to the weight of a diamond, not its size. One carat equals 200 milligrams. While larger diamonds are rarer and more valuable, carat weight alone does not determine a diamond\'s beauty — cut quality has the greatest impact on brilliance.',
    scale: ['0.25ct', '0.50ct', '0.75ct', '1.00ct', '1.50ct', '2.00ct', '3.00ct'],
  },
  {
    letter: 'C', title: 'Cut',
    desc: 'Cut is the most important factor in a diamond\'s beauty. It determines how well light enters, reflects, and exits the stone. A well-cut diamond will exhibit exceptional brilliance, fire, and scintillation regardless of its other characteristics.',
    scale: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent', 'Ideal'],
  },
  {
    letter: 'C', title: 'Color',
    desc: 'Diamond color is graded on a scale from D (colorless) to Z (light yellow). The most valuable diamonds are completely colorless, allowing maximum light to pass through. At Vault Maison, we primarily offer diamonds in the D-H range.',
    scale: ['D', 'E', 'F', 'G', 'H', 'I', 'J'],
  },
  {
    letter: 'C', title: 'Clarity',
    desc: 'Clarity measures the presence of internal inclusions and external blemishes. Most diamonds have tiny natural imperfections. Grades range from Flawless (FL) to Included (I). Diamonds graded VS2 and above are considered "eye-clean."',
    scale: ['I1', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'],
  },
]

export function MinimalGrading() {
  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '80px 5vw 0', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <Diamond size={32} strokeWidth={1} style={{ color: '#050505', marginBottom: '16px' }} />
        <h1 style={{ fontFamily: font, fontSize: '40px', fontWeight: 200, color: '#050505', marginBottom: '12px' }}>Diamond Grading Guide</h1>
        <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: '#9B9B9B', maxWidth: '550px', margin: '0 auto' }}>
          Understanding the 4Cs — Carat, Cut, Color, and Clarity — is essential to choosing the perfect diamond. This guide explains each factor and how they influence a diamond&apos;s beauty and value.
        </p>
      </section>

      {/* 4Cs */}
      <section style={{ padding: '60px 5vw 80px', maxWidth: '900px', margin: '0 auto' }}>
        {fourCs.map((c, i) => (
          <div key={i} style={{ padding: '40px 0', borderBottom: i < fourCs.length - 1 ? '1px solid #E5E5E5' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }} className="vm-grade-row">
              <div style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', flexShrink: 0 }}>
                <span style={{ fontFamily: font, fontSize: '24px', fontWeight: 200, color: '#050505' }}>{c.letter}</span>
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: font, fontSize: '24px', fontWeight: 300, color: '#050505', marginBottom: '12px' }}>{c.title}</h2>
                <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 300, lineHeight: 1.9, color: '#555', marginBottom: '20px' }}>{c.desc}</p>
                <div style={{ display: 'flex', gap: '0', overflow: 'auto' }}>
                  {c.scale.map((s, j) => (
                    <div key={j} style={{ flex: 1, minWidth: '60px', padding: '10px 8px', textAlign: 'center', backgroundColor: j >= c.scale.length - 2 ? '#050505' : '#FAFAFA', borderRight: j < c.scale.length - 1 ? '1px solid #FFFFFF' : 'none' }}>
                      <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, color: j >= c.scale.length - 2 ? '#FFFFFF' : '#050505' }}>{s}</span>
                    </div>
                  ))}
                </div>
                {i === 0 && <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9B9B', marginTop: '8px' }}>← Smaller · Larger →</p>}
                {i === 1 && <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9B9B', marginTop: '8px' }}>← Less Brilliant · More Brilliant →</p>}
                {i === 2 && <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9B9B', marginTop: '8px' }}>← Colorless · Near Colorless →</p>}
                {i === 3 && <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9B9B', marginTop: '8px' }}>← More Inclusions · Flawless →</p>}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 5vw 100px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ padding: '40px', backgroundColor: '#050505', textAlign: 'center' }}>
          <h3 style={{ fontFamily: font, fontSize: '20px', fontWeight: 300, color: '#FFFFFF', marginBottom: '12px' }}>Need Expert Guidance?</h3>
          <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
            Our GIA-certified gemologists are available for complimentary consultations to help you find the perfect diamond.
          </p>
          <Link href="/minimal/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', border: '1px solid #050505', color: '#050505', fontFamily: font, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Speak to a Gemologist <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </MinimalLayout>
  )
}
