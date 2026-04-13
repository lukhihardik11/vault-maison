'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalFAQ } from '@/components/concepts/minimal/pages'

const faqs = [
  { q: 'Are your diamonds certified?', a: 'Yes, every diamond above 0.30 carats comes with a certificate from GIA, AGS, or an equivalent independent grading laboratory. Our melee diamonds are batch-certified to ensure consistent quality.' },
  { q: 'Do you offer financing?', a: 'Yes, we offer flexible financing options through our banking partners. You can spread payments over 6, 12, or 24 months with competitive interest rates. Contact us for details.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy on all non-customized items. Bespoke and engraved pieces are final sale. Items must be returned in their original condition and packaging.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight delivery are also available. All orders are shipped fully insured via secure courier.' },
  { q: 'Can I see pieces in person?', a: 'Absolutely. We welcome you to visit our showroom in London by appointment. We also offer virtual consultations via video call for clients worldwide.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. International orders are shipped via insured express courier. Import duties and taxes may apply depending on your location.' },
  { q: 'How do I care for my jewelry?', a: 'We recommend cleaning your jewelry regularly with warm water and mild soap. Avoid exposure to harsh chemicals. Store pieces individually in soft pouches. We also offer complimentary professional cleaning and inspection.' },
  { q: 'Can I customize an existing design?', a: 'Yes, many of our designs can be customized with different stones, metals, or proportions. For fully custom designs, please explore our Bespoke service.' },
]

export default function FAQPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  const [open, setOpen] = useState<number | null>(null)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalFAQ />
  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our products, services, and policies."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'FAQ', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${concept.palette.muted}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-sm font-light pr-4">{faq.q}</span>
                {open === i ? <Minus size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs font-light leading-relaxed opacity-60 pb-5">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <CTABanner
        concept={concept}
        title="Still Have Questions?"
        description="Our team is here to help with any inquiries."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl(concept.id, 'contact')}
      />
    </ConceptLayout>
  )
}
