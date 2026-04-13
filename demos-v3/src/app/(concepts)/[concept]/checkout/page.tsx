'use client'

import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, CheckoutFlow } from '@/components/shared'
import { MinimalCheckout } from '@/components/concepts/minimal/pages'

export default function CheckoutPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalCheckout />

  return (
    <ConceptLayout concept={concept} hideFooter>
      <CheckoutFlow concept={concept} />
    </ConceptLayout>
  )
}
