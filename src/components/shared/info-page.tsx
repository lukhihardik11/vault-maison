'use client'

import { type ConceptConfig } from '@/data/concepts'
import { ConceptLayout, PageHeader, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

interface InfoSection {
  title: string
  content: string
}

interface InfoPageProps {
  concept: ConceptConfig
  title: string
  subtitle: string
  sections: InfoSection[]
  ctaTitle?: string
  ctaDescription?: string
  ctaLabel?: string
  ctaHref?: string
}

export function InfoPage({
  concept,
  title,
  subtitle,
  sections,
  ctaTitle,
  ctaDescription,
  ctaLabel,
  ctaHref,
}: InfoPageProps) {
  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: title, href: '#' },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2
                className={`text-sm uppercase tracking-[0.15em] font-medium mb-4 ${concept.fonts.headingClass}`}
                style={{ color: concept.palette.text }}
              >
                {section.title}
              </h2>
              <div className="text-sm font-light leading-relaxed opacity-60 whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      {ctaTitle && ctaHref && (
        <CTABanner
          concept={concept}
          title={ctaTitle}
          description={ctaDescription || ''}
          ctaLabel={ctaLabel || concept.ctaText.contact}
          ctaHref={ctaHref}
        />
      )}
    </ConceptLayout>
  )
}
