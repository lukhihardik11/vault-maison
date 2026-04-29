'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { InfoPage } from '@/components/shared/info-page'
import { buildConceptUrl } from '@/lib/concept-utils'

const sections = [
  {
    title: 'Return Policy Overview',
    content: 'We want you to be completely satisfied with your purchase. If for any reason you are not, we offer a 30-day return policy on all non-customized items. Returns must be initiated within 30 calendar days of delivery. Items must be in their original, unworn condition with all tags and packaging intact.',
  },
  {
    title: 'Eligible Items',
    content: 'Standard collection pieces (rings, necklaces, earrings, bracelets) in their original condition are eligible for return. Loose diamonds with intact GIA/AGS certification seals are also eligible. Items must show no signs of wear, alteration, or damage.',
  },
  {
    title: 'Non-Returnable Items',
    content: 'The following items are final sale and cannot be returned:\n\n• Bespoke and custom-designed pieces\n• Engraved or personalized items\n• Resized rings (unless sizing was performed by our team and is within warranty)\n• Items purchased during final sale events\n• Gift cards',
  },
  {
    title: 'How to Initiate a Return',
    content: 'To begin a return, contact our client services team via email or phone. You will receive a prepaid, insured shipping label and detailed instructions. All returns are shipped via secure courier with full insurance coverage at no cost to you.',
  },
  {
    title: 'Refund Processing',
    content: 'Once we receive and inspect your return, refunds are processed within 5-7 business days. Refunds are issued to the original payment method. For wire transfers, please allow an additional 3-5 business days for the funds to appear in your account.',
  },
  {
    title: 'Exchanges',
    content: 'We are happy to facilitate exchanges for a different size, metal, or piece of equal or greater value. For exchanges of greater value, the difference will be charged to your preferred payment method. Exchanges follow the same 30-day window as returns.',
  },
  {
    title: 'International Returns',
    content: 'International clients may return items following the same process. We provide prepaid international shipping labels. Please note that any import duties or taxes paid at the time of delivery are the responsibility of the local customs authority and may take additional time to refund.',
  },
]

export default function ReturnsPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }} />

  return (
    <InfoPage
      concept={concept}
      title="Returns & Exchanges"
      subtitle="Our commitment to your complete satisfaction."
      sections={sections}
      ctaTitle="Need Assistance?"
      ctaDescription="Our client services team is here to help with any return or exchange."
      ctaLabel={concept.ctaText.contact}
      ctaHref={buildConceptUrl(concept.id, 'contact')}
    />
  )
}
