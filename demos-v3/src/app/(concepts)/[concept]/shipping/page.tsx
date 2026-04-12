'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { InfoPage } from '@/components/shared/info-page'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalShipping } from '@/components/concepts/minimal/pages'

export default function ShippingPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalShipping />
  return (
    <InfoPage
      concept={concept}
      title="Shipping & Returns"
      subtitle="Complimentary shipping on all orders. Hassle-free returns within 30 days."
      sections={[
        { title: 'Shipping Options', content: 'Standard Shipping (5-7 business days): Complimentary on all orders\nExpress Shipping (2-3 business days): $25\nOvernight Delivery (next business day): $50\n\nAll orders are shipped fully insured via secure courier with signature required upon delivery.' },
        { title: 'International Shipping', content: 'We ship to over 50 countries worldwide via insured express courier. International shipping rates are calculated at checkout based on destination. Please note that import duties and taxes may apply and are the responsibility of the recipient.' },
        { title: 'Returns', content: 'We offer a 30-day return policy on all non-customized items. To initiate a return, please contact our concierge team. Items must be returned in their original condition and packaging.\n\nBespoke, engraved, and custom-sized pieces are final sale and cannot be returned.' },
        { title: 'Exchanges', content: 'We are happy to exchange items for a different size or style within 30 days of delivery. Please contact us to arrange an exchange.' },
      ]}
      ctaTitle="Questions About Shipping?"
      ctaDescription="Our concierge team is available to assist."
      ctaHref={buildConceptUrl(concept.id, 'contact')}
    />
  )
}
