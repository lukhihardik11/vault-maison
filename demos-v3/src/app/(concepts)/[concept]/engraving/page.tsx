'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { InfoPage } from '@/components/shared/info-page'
import { buildConceptUrl } from '@/lib/concept-utils'

export default function EngravingPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null
  return (
    <InfoPage
      concept={concept}
      title="Engraving Services"
      subtitle="Add a personal touch to your piece with our expert engraving services."
      sections={[
        { title: 'Hand Engraving', content: 'Our master engravers use traditional hand tools to create inscriptions and designs of exceptional quality. Hand engraving offers a warmth and character that machine engraving cannot replicate. Available on rings, pendants, and bracelets.' },
        { title: 'Options', content: 'Text: Names, dates, messages, or quotes in a variety of fonts\nSymbols: Hearts, infinity signs, stars, or custom symbols\nMonograms: Elegant intertwined initials\nCustom Designs: Work with our engravers to create something truly unique' },
        { title: 'Pricing', content: 'Basic text engraving: Complimentary on new purchases\nCustom hand engraving: From $150 depending on complexity\nExisting pieces: Engraving available from $75\n\nPlease allow 3-5 additional business days for engraved pieces.' },
        { title: 'Important Notes', content: 'Engraved pieces are considered custom and are final sale. We recommend keeping inscriptions concise for the best visual result. Our team will advise on the maximum character count based on the specific piece.' },
      ]}
      ctaTitle="Request Engraving"
      ctaDescription="Contact us to discuss your engraving needs."
      ctaHref={buildConceptUrl(concept.id, 'contact')}
    />
  )
}
