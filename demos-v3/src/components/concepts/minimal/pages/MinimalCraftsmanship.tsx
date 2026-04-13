'use client'

import Image from 'next/image'
import { Gem, Ruler, Focus, Sparkles } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { SpotlightCards, SlideTextButton } from '../ui'
import type { SpotlightItem } from '../ui/SpotlightCards'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const craftSteps = [
  {
    num: '01',
    title: 'Stone Selection',
    text: 'Every diamond is hand-selected from a pool of thousands. Our gemologists evaluate each stone under controlled lighting conditions, assessing brilliance, fire, and scintillation beyond what certification alone can capture.',
    image: '/images/diamond-facets-1.jpg',
  },
  {
    num: '02',
    title: 'Design Engineering',
    text: 'Each setting is engineered to maximize light performance while maintaining structural integrity. CAD modeling allows us to test every angle before a single gram of metal is cast.',
    image: '/images/diamond-collection-1.jpg',
  },
  {
    num: '03',
    title: 'Precision Setting',
    text: 'Our master setters work under 10x magnification, placing each stone with sub-millimeter precision. The goal is invisible metalwork — the setting should disappear, leaving only the stone.',
    image: '/images/jewelry-ring-closeup.jpg',
  },
  {
    num: '04',
    title: 'Hand Finishing',
    text: 'Final polish is performed by hand. Each piece passes through seven stages of quality inspection before it receives the Vault Maison hallmark.',
    image: '/images/fine-jewelry-product.jpg',
  },
]

const principles: SpotlightItem[] = [
  { icon: Gem, title: 'Material Integrity', description: 'Only natural diamonds and recycled precious metals. No compromises on provenance or purity.' },
  { icon: Ruler, title: 'Sub-Millimeter Precision', description: 'Every prong, bezel, and channel is placed with mechanical accuracy under 10x magnification.' },
  { icon: Focus, title: 'Light Performance', description: 'Settings are designed to maximize brilliance, fire, and scintillation — the three pillars of diamond beauty.' },
  { icon: Sparkles, title: 'Seven-Stage QC', description: 'Each piece undergoes seven independent quality checks before receiving the Vault Maison hallmark.' },
]

export function MinimalCraftsmanship() {
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
            Craftsmanship
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            The Process Behind Every Piece
          </h1>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            maxWidth: '500px',
          }}>
            From raw stone to finished jewel — every step guided by precision, restraint, and decades of accumulated expertise.
          </p>
        </div>
      </section>

      {/* Alternating Image/Text Sections */}
      {craftSteps.map((step, i) => (
        <section key={step.num} style={{ padding: '80px 5vw', borderTop: i === 0 ? 'none' : '1px solid #E5E5E5' }}>
          <div
            className="minimal-craft-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '60px',
              alignItems: 'center',
              direction: i % 2 === 1 ? 'rtl' : 'ltr',
            }}
          >
            <div
              style={{ direction: 'ltr' }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
            </div>

            <div
              style={{ direction: 'ltr' }}
            >
              <span style={{
                fontFamily: font,
                fontSize: '11px',
                fontWeight: 400,
                color: '#050505',
                opacity: 0.2,
                display: 'block',
                marginBottom: '12px',
              }}>
                {step.num}
              </span>
              <h2 style={{
                fontFamily: font,
                fontSize: '22px',
                fontWeight: 200,
                letterSpacing: '0.02em',
                color: '#050505',
                marginBottom: '16px',
              }}>
                {step.title}
              </h2>
              <p style={{
                fontFamily: font,
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: '#050505',
                opacity: 0.6,
                maxWidth: '440px',
              }}>
                {step.text}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* SpotlightCards: Principles */}
      <section style={{ padding: '120px 5vw', borderTop: '1px solid #E5E5E5' }}>
        <SpotlightCards
          items={principles}
          eyebrow="Standards"
          heading="Our Guiding Principles"
        />
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 5vw 120px', borderTop: '1px solid #E5E5E5', textAlign: 'center' }}>
        <div
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          <h2 style={{
            fontFamily: font,
            fontSize: '20px',
            fontWeight: 200,
            color: '#050505',
            marginBottom: '16px',
          }}>
            Experience the Craft
          </h2>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            lineHeight: 1.8,
            marginBottom: '32px',
          }}>
            Commission a bespoke piece and witness our process firsthand.
          </p>
          <SlideTextButton
            text="Start a Commission"
            hoverText="Bespoke"
            href="/minimal/bespoke"
          />
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .minimal-craft-row {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </MinimalLayout>
  )
}
