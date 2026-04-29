'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { InfoPage } from '@/components/shared/info-page'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalSizeGuide } from '@/components/concepts/minimal/pages'

export default function SizingPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }} />

  if (concept.id === 'minimal') return <MinimalSizeGuide />

  return (
    <InfoPage
      concept={concept}
      title="Ring Sizing Guide"
      subtitle="Find your perfect fit with our comprehensive sizing guide."
      sections={[
        { title: 'How to Measure', content: 'The most accurate way to determine your ring size is to visit a professional jeweler. However, you can also measure at home using a piece of string or paper wrapped around your finger. Mark where the ends meet, then measure the length in millimeters and compare to our size chart.\n\nFor the most accurate results, measure your finger at the end of the day when it is at its largest, and ensure the ring can pass comfortably over your knuckle.' },
        { title: 'Size Chart', content: 'US 4 — 14.9mm diameter — 46.8mm circumference\nUS 5 — 15.7mm diameter — 49.3mm circumference\nUS 6 — 16.5mm diameter — 51.9mm circumference\nUS 7 — 17.3mm diameter — 54.4mm circumference\nUS 8 — 18.1mm diameter — 57.0mm circumference\nUS 9 — 18.9mm diameter — 59.5mm circumference\nUS 10 — 19.8mm diameter — 62.1mm circumference' },
        { title: 'Complimentary Sizing', content: 'All Vault Maison rings include one complimentary resizing within the first year of purchase. Additional resizings are available for a nominal fee. Please note that some designs with continuous stone settings may have limited sizing options.' },
      ]}
      ctaTitle="Need Help With Sizing?"
      ctaDescription="Our team is happy to assist you in finding the perfect fit."
      ctaHref={buildConceptUrl(concept.id, 'contact')}
    />
  )
}
