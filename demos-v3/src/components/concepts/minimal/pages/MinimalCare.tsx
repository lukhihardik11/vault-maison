'use client'

import { MinimalPage } from '../MinimalPage'

const sections = [
  {
    title: 'Daily Wear',
    content: 'Remove jewelry before exercising, swimming, or applying lotions and perfumes. Chemicals and abrasives can dull the surface of precious metals and damage stone settings over time.',
  },
  {
    title: 'Cleaning',
    content: 'Clean your pieces at home using warm water and a small amount of mild dish soap. Soak for 10–15 minutes, then gently brush with a soft-bristled toothbrush. Rinse thoroughly and pat dry with a lint-free cloth.',
  },
  {
    title: 'Storage',
    content: 'Store each piece individually in a soft pouch or lined compartment. Diamonds can scratch other gemstones and metals. Keep jewelry in a cool, dry place away from direct sunlight.',
  },
  {
    title: 'Professional Service',
    content: 'We recommend professional cleaning and inspection once per year. Our complimentary service includes ultrasonic cleaning, prong tightening, and rhodium replating for white gold pieces.',
  },
  {
    title: 'Insurance',
    content: 'We recommend insuring all fine jewelry purchases. Our certificates and appraisals are accepted by all major insurance providers. Contact us for updated valuations at any time.',
  },
]

export function MinimalCare() {
  return (
    <MinimalPage title="Care" subtitle="Preserve the brilliance of your pieces.">
      <div style={{ maxWidth: '600px' }}>
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 400, marginBottom: '12px' }}>{section.title}</h2>
            <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>{section.content}</p>
          </div>
        ))}
      </div>
    </MinimalPage>
  )
}
