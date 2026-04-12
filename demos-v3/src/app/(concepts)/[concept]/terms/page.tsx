'use client'
import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { InfoPage } from '@/components/shared/info-page'
import { buildConceptUrl } from '@/lib/concept-utils'

export default function TermsPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null
  return (
    <InfoPage
      concept={concept}
      title="Terms of Service"
      subtitle="Please read these terms carefully before using our services."
      sections={[
        { title: 'General', content: 'By accessing and using the Vault Maison website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.' },
        { title: 'Products & Pricing', content: 'All products are subject to availability. Prices are displayed in USD and may be subject to change without notice. We reserve the right to limit quantities and to refuse any order. Product images are for illustrative purposes; actual items may vary slightly due to the natural characteristics of gemstones and precious metals.' },
        { title: 'Intellectual Property', content: 'All content on this website, including text, images, designs, and logos, is the property of Vault Maison and is protected by copyright and trademark laws. Unauthorized use is prohibited.' },
        { title: 'Limitation of Liability', content: 'Vault Maison shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability shall not exceed the purchase price of the product in question.' },
      ]}
    />
  )
}
