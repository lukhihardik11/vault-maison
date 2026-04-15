'use client'
import { useParams } from 'next/navigation'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { getConcept } from '@/data/concepts'
import { getCollection, collections } from '@/data/collections'
import { products } from '@/data/products'
import { ConceptLayout, PageHeader, ProductCard, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export default function CollectionDetailPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  const collection = getCollection(params.collectionId as string)

  if (!concept || !collection) return null

  const collectionProducts = products.filter((p) =>
    collection.categories.includes(p.category)
  )

  return (
    <ConceptLayout concept={concept}>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={collection.heroImage}
          alt={collection.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-3">{collection.subtitle}</p>
            <h1 className={`text-3xl lg:text-5xl font-light text-white mb-4 ${concept.fonts.headingClass}`}>
              {collection.name}
            </h1>
            <p className="text-sm text-white/60 font-light max-w-lg leading-relaxed">{collection.description}</p>
          </motion.div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <PageHeader
        concept={concept}
        title=""
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Collections', href: buildConceptUrl(concept.id, 'collections') },
          { label: collection.name, href: '#' },
        ]}
      />

      {/* Products */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        <p className="text-xs font-light opacity-50 mb-8">
          {collectionProducts.length} {collectionProducts.length === 1 ? 'piece' : 'pieces'} in this collection
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {collectionProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} concept={concept} index={i} />
          ))}
        </div>
      </div>

      <CTABanner
        concept={concept}
        title="Explore All Collections"
        description="Discover more curated selections from our atelier."
        ctaLabel={concept.ctaText.viewCollection}
        ctaHref={buildConceptUrl(concept.id, 'collections')}
      />
    </ConceptLayout>
  )
}
