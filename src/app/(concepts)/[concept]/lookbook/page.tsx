'use client'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { getConcept } from '@/data/concepts'
import { getBestsellers, getNewArrivals } from '@/data/products'
import { ConceptLayout, PageHeader, CTABanner } from '@/components/shared'
import { buildConceptUrl, buildProductUrl } from '@/lib/concept-utils'

const lookbookSections = [
  {
    title: 'The Art of Light',
    subtitle: 'Spring / Summer 2025',
    description: 'Diamonds that capture and refract light in extraordinary ways. This season celebrates the interplay between brilliance and subtlety, featuring pieces designed to illuminate every moment.',
    layout: 'full' as const,
  },
  {
    title: 'Golden Hour',
    subtitle: 'Eternal Collection',
    description: 'Gold pieces that embody warmth and timelessness. From delicate chains to bold statement cuffs, each piece is crafted to become an extension of your personal style.',
    layout: 'split' as const,
  },
  {
    title: 'Bridal Dreams',
    subtitle: 'Forever Collection',
    description: 'Engagement rings and bridal sets designed for life\'s most precious moments. Each piece carries the promise of forever, crafted with the precision and care that such moments deserve.',
    layout: 'grid' as const,
  },
]

export default function LookbookPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  const allProducts = [...getBestsellers(), ...getNewArrivals()]

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Lookbook"
        subtitle="A curated visual journey through our latest collections."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Lookbook', href: '#' },
        ]}
      />
      <div className="pb-16 lg:pb-24">
        {lookbookSections.map((section, sectionIdx) => {
          const sectionProducts = allProducts.slice(sectionIdx * 3, sectionIdx * 3 + 3)
          return (
            <section key={section.title} className="mb-16 lg:mb-24">
              {/* Section Header */}
              <div className="mx-auto max-w-[1440px] px-6 lg:px-12 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: concept.palette.accent }}>
                    {section.subtitle}
                  </p>
                  <h2 className={`text-2xl lg:text-3xl font-light tracking-[0.02em] mb-4 ${concept.fonts.headingClass}`}>
                    {section.title}
                  </h2>
                  <p className="text-sm font-light opacity-50 max-w-lg leading-relaxed">{section.description}</p>
                </motion.div>
              </div>

              {/* Editorial Grid */}
              <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                {section.layout === 'full' && sectionProducts[0] && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  >
                    <Link href={buildProductUrl(concept.id, sectionProducts[0].slug)} className="block relative group">
                      <div className="relative overflow-hidden" style={{ aspectRatio: '21/9' }}>
                        <Image
                          src={sectionProducts[0].images[0]}
                          alt={sectionProducts[0].name}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8">
                          <p className="text-white text-lg font-light">{sectionProducts[0].name}</p>
                          <p className="text-white/60 text-xs mt-1">{sectionProducts[0].priceDisplay}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {section.layout === 'split' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {sectionProducts.slice(0, 2).map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <Link href={buildProductUrl(concept.id, product.slug)} className="block relative group">
                          <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-1000 group-hover:scale-105"
                              sizes="50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6">
                              <p className="text-white text-sm font-light">{product.name}</p>
                              <p className="text-white/60 text-[10px] mt-1">{product.priceDisplay}</p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {section.layout === 'grid' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sectionProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                      >
                        <Link href={buildProductUrl(concept.id, product.slug)} className="block relative group">
                          <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-1000 group-hover:scale-105"
                              sizes="33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6">
                              <p className="text-white text-sm font-light">{product.name}</p>
                              <p className="text-white/60 text-[10px] mt-1">{product.priceDisplay}</p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>
      <CTABanner
        concept={concept}
        title="Explore the Full Collection"
        description="Every piece tells a story. Discover yours."
        ctaLabel={concept.ctaText.browse}
        ctaHref={buildConceptUrl(concept.id, 'collections')}
      />
    </ConceptLayout>
  )
}
