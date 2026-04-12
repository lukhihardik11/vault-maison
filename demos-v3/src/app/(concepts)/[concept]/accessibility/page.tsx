'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { InfoPage } from '@/components/shared/info-page'
import { buildConceptUrl } from '@/lib/concept-utils'

const sections = [
  {
    title: 'Our Commitment',
    content: 'Vault Maison is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards to ensure we provide equal access to all users.',
  },
  {
    title: 'Conformance Status',
    content: 'We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.',
  },
  {
    title: 'Measures Taken',
    content: 'We have taken the following measures to ensure accessibility:\n\n• Semantic HTML structure throughout the site\n• ARIA labels and roles for interactive elements\n• Keyboard navigation support for all interactive features\n• Sufficient color contrast ratios (minimum 4.5:1 for text)\n• Alt text for all product images\n• Responsive design that works across all screen sizes\n• Skip navigation links for screen reader users\n• Focus indicators for keyboard navigation',
  },
  {
    title: 'Assistive Technologies',
    content: 'Our website is designed to be compatible with the following assistive technologies:\n\n• Screen readers (JAWS, NVDA, VoiceOver)\n• Screen magnification software\n• Speech recognition software\n• Keyboard-only navigation\n• Switch access devices',
  },
  {
    title: 'Known Limitations',
    content: 'While we strive for full accessibility, some areas may have limitations:\n\n• Some third-party content may not fully meet accessibility standards\n• Complex interactive features (3D product views) may have limited screen reader support\n• PDF documents may not be fully accessible; alternative formats are available upon request',
  },
  {
    title: 'In-Store Accessibility',
    content: 'All Vault Maison locations are fully wheelchair accessible with:\n\n• Step-free access to all areas\n• Accessible restroom facilities\n• Hearing loop systems\n• Large print materials available on request\n• Trained staff to assist customers with disabilities',
  },
  {
    title: 'Feedback & Contact',
    content: 'We welcome your feedback on the accessibility of our website and stores. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:\n\nEmail: accessibility@vaultmaison.com\nPhone: +44 20 7946 0958\n\nWe aim to respond to accessibility feedback within 2 business days.',
  },
]

export default function AccessibilityPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  return (
    <InfoPage
      concept={concept}
      title="Accessibility"
      subtitle="Making luxury accessible to everyone."
      sections={sections}
      ctaTitle="Need Assistance?"
      ctaDescription="Contact us for any accessibility-related inquiries or to request alternative formats."
      ctaLabel={concept.ctaText.contact}
      ctaHref={buildConceptUrl(concept.id, 'contact')}
    />
  )
}
