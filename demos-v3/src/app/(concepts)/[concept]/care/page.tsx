'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { InfoPage } from '@/components/shared/info-page'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalCare } from '@/components/concepts/minimal/pages'
import { VaultCare } from '@/components/concepts/vault/pages'
import { GalleryCare } from '@/components/concepts/gallery/pages'
import { SalonCare } from '@/components/concepts/salon/pages'
import { AtelierCare } from '@/components/concepts/atelier/pages'

export default function CarePage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalCare />
  if (concept.id === 'vault') return <VaultCare />
  if (concept.id === 'gallery') return <GalleryCare />
  if (concept.id === 'salon') return <SalonCare />
  if (concept.id === 'atelier') return <AtelierCare />
  return (
    <InfoPage
      concept={concept}
      title="Jewelry Care Guide"
      subtitle="Preserve the beauty of your pieces with proper care and maintenance."
      sections={[
        { title: 'Daily Care', content: 'Remove jewelry before swimming, bathing, or exercising. Avoid contact with perfumes, lotions, and household chemicals. Put jewelry on last when dressing and remove it first when undressing.' },
        { title: 'Cleaning', content: 'Clean your jewelry regularly using warm water and mild dish soap. Soak for 15-20 minutes, then gently brush with a soft toothbrush. Rinse thoroughly and pat dry with a lint-free cloth.\n\nFor a deeper clean, bring your pieces to our showroom for complimentary professional cleaning.' },
        { title: 'Storage', content: 'Store each piece separately in a soft pouch or lined jewelry box to prevent scratching. Keep pieces away from direct sunlight and extreme temperatures. For diamond jewelry, wrap in soft tissue before placing in storage.' },
        { title: 'Professional Service', content: 'We recommend having your jewelry professionally inspected once a year. Our jewelers will check settings, clasps, and overall condition. This service is complimentary for all Vault Maison pieces.' },
      ]}
      ctaTitle="Book a Complimentary Cleaning"
      ctaDescription="Visit our showroom for professional care."
      ctaHref={buildConceptUrl(concept.id, 'contact')}
    />
  )
}
