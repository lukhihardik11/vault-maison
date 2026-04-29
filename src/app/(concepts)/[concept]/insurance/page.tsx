'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { InfoPage } from '@/components/shared/info-page'
import { buildConceptUrl } from '@/lib/concept-utils'

export default function InsurancePage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }} />
  return (
    <InfoPage
      concept={concept}
      title="Jewelry Insurance"
      subtitle="Protect your investment with comprehensive jewelry insurance."
      sections={[
        { title: 'Why Insure?', content: 'Fine jewelry represents a significant investment. Insurance protects against loss, theft, damage, and mysterious disappearance. We strongly recommend insuring all fine jewelry pieces, especially those worn regularly.' },
        { title: 'Our Partners', content: 'We work with leading jewelry insurance providers to offer competitive rates and comprehensive coverage. Our partners specialize in fine jewelry and understand the unique needs of our clients.' },
        { title: 'What Is Covered', content: 'Theft and burglary\nAccidental loss\nDamage and breakage\nMysterious disappearance\nWorldwide coverage\nFull replacement value' },
        { title: 'Appraisals', content: 'Every Vault Maison purchase includes a detailed appraisal document suitable for insurance purposes. We also offer updated appraisals as market values change. Contact us to schedule an appraisal for any piece in our collection.' },
      ]}
      ctaTitle="Get an Insurance Quote"
      ctaDescription="We can connect you with our insurance partners."
      ctaHref={buildConceptUrl(concept.id, 'contact')}
    />
  )
}
