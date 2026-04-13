'use client'

import { Droplets, Sun, Box, Wrench, Shield } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { SlideTextButton } from '../ui'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const sections = [
  {
    icon: Sun,
    title: 'Daily Wear',
    content: 'Remove jewelry before exercising, swimming, or applying lotions and perfumes. Chemicals and abrasives can dull the surface of precious metals and damage stone settings over time.',
  },
  {
    icon: Droplets,
    title: 'Cleaning',
    content: 'Clean your pieces at home using warm water and a small amount of mild dish soap. Soak for 10–15 minutes, then gently brush with a soft-bristled toothbrush. Rinse thoroughly and pat dry with a lint-free cloth.',
  },
  {
    icon: Box,
    title: 'Storage',
    content: 'Store each piece individually in a soft pouch or lined compartment. Diamonds can scratch other gemstones and metals. Keep jewelry in a cool, dry place away from direct sunlight.',
  },
  {
    icon: Wrench,
    title: 'Professional Service',
    content: 'We recommend professional cleaning and inspection once per year. Our complimentary service includes ultrasonic cleaning, prong tightening, and rhodium replating for white gold pieces.',
  },
  {
    icon: Shield,
    title: 'Insurance',
    content: 'We recommend insuring all fine jewelry purchases. Our certificates and appraisals are accepted by all major insurance providers. Contact us for updated valuations at any time.',
  },
]

export function MinimalCare() {
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
            Care Guide
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            Preserve the Brilliance
          </h1>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            maxWidth: '500px',
          }}>
            Simple practices to maintain the beauty and integrity of your fine jewelry for generations.
          </p>
        </div>
      </section>

      {/* Care Sections */}
      <section style={{ padding: '60px 5vw 80px', maxWidth: '700px' }}>
        {sections.map((section, i) => {
          const Icon = section.icon
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr',
                gap: '20px',
                padding: '32px 0',
                borderBottom: '1px solid #E5E5E5',
              }}
            >
              <Icon size={20} strokeWidth={1} style={{ color: '#050505', opacity: 0.3, marginTop: '2px' }} />
              <div>
                <h2 style={{
                  fontFamily: font,
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#050505',
                  marginBottom: '8px',
                }}>
                  {section.title}
                </h2>
                <p style={{
                  fontFamily: font,
                  fontSize: '13px',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: '#050505',
                  opacity: 0.6,
                }}>
                  {section.content}
                </p>
              </div>
            </div>
          )
        })}
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
            Need Professional Care?
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
            Schedule a complimentary cleaning and inspection at our atelier.
          </p>
          <SlideTextButton text="Book Service" hoverText="Schedule" href="/minimal/contact" />
        </div>
      </section>
    </MinimalLayout>
  )
}
