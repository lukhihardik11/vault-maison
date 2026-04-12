'use client'

import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, CheckoutFlow } from '@/components/shared'

export default function CheckoutPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  return (
    <ConceptLayout concept={concept} hideFooter>
      <CheckoutFlow concept={concept} />
    </ConceptLayout>
  )
}
