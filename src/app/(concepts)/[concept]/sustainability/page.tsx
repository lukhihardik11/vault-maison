'use client'

import { useParams } from 'next/navigation'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader, SplitSection, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalSustainability } from '@/components/concepts/minimal/pages'

export default function SustainabilityPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalSustainability />

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Sustainability"
        subtitle="Our commitment to ethical sourcing, environmental stewardship, and positive social impact."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Sustainability', href: '#' },
        ]}
      />
      <SplitSection
        concept={concept}
        title="Ethical Sourcing"
        description="Every diamond in our collection is sourced through established, transparent supply chains that comply with the Kimberley Process and go beyond its requirements. We work directly with mines and cutting houses that maintain the highest ethical standards, ensuring fair wages, safe working conditions, and zero tolerance for conflict diamonds."
        image="/images/diamond-collection-1.jpg"
      />
      <SplitSection
        concept={concept}
        title="Environmental Responsibility"
        description="We are committed to minimizing our environmental footprint at every stage. Our packaging uses recycled and recyclable materials. Our showroom is powered by renewable energy. We offset our carbon emissions and continuously seek ways to reduce waste throughout our operations."
        image="/images/diamond-bokeh-1.jpg"
        reverse
      />
      <SplitSection
        concept={concept}
        title="Community Impact"
        description="We believe luxury should create positive change. A portion of every sale supports education and healthcare initiatives in diamond-producing communities. We also partner with local artisan training programs to preserve traditional jewelry-making skills for future generations."
        image="/images/diamond-velvet-1.jpg"
      />
      <CTABanner
        concept={concept}
        title="Learn More About Our Practices"
        description="We are always happy to discuss our sustainability initiatives in detail."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl(concept.id, 'contact')}
      />
    </ConceptLayout>
  )
}
