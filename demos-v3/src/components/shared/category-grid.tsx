'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { type ConceptConfig, allCategories, categoryLabels, categoryDescriptions, type ProductCategory } from '@/data/concepts'
import { buildCategoryUrl } from '@/lib/concept-utils'
import { getProductsByCategory } from '@/data/products'

interface CategoryGridProps {
  concept: ConceptConfig
  categories?: ProductCategory[]
}

const categoryImages: Record<ProductCategory, string> = {
  'diamond-rings': '/images/diamond-velvet-1.jpg',
  'diamond-necklaces': '/images/diamond-bokeh-1.jpg',
  'diamond-earrings': '/images/diamond-facets-1.jpg',
  'diamond-bracelets': '/images/diamond-collection-1.jpg',
  'gold-rings': '/images/diamond-dark-bg-1.jpg',
  'gold-necklaces': '/images/diamond-velvet-2.jpg',
  'gold-earrings': '/images/diamond-melee-1.jpg',
  'gold-bracelets': '/images/diamond-parcel-1.jpg',
  'loose-diamonds': '/images/round-brilliant-diagram.jpg',
  'wedding-bridal': '/images/oval-cut-1.jpg',
}

export function CategoryGrid({ concept, categories = allCategories }: CategoryGridProps) {
  const isMinimal = concept.id === 'minimal'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {categories.map((cat, i) => {
        const count = getProductsByCategory(cat).length
        return (
          <motion.div
            key={cat}
            initial={isMinimal ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
          >
            <Link
              href={buildCategoryUrl(concept.id, cat)}
              className="group block relative overflow-hidden"
              style={{ aspectRatio: '4/5' }}
            >
              <Image
                src={categoryImages[cat]}
                alt={categoryLabels[cat]}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                style={{ transitionDuration: isMinimal ? '0ms' : '800ms' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-6"
                style={{
                  background: `linear-gradient(to top, ${concept.palette.bg}dd, ${concept.palette.bg}00)`,
                }}
              >
                <h3
                  className={`text-sm uppercase tracking-[0.15em] font-light mb-1 ${concept.fonts.headingClass}`}
                  style={{ color: concept.palette.text }}
                >
                  {categoryLabels[cat]}
                </h3>
                <p
                  className="text-[10px] tracking-[0.1em] opacity-50"
                  style={{ color: concept.palette.text }}
                >
                  {count} piece{count !== 1 ? 's' : ''}
                </p>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
