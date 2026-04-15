'use client'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Heart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader, ProductCard, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'
import { useWishlistStore } from '@/store/wishlist'
import { MinimalWishlist } from '@/components/concepts/minimal/pages'
import { TheaterWishlist } from '@/components/concepts/theater/pages'
import { VaultWishlist } from '@/components/concepts/vault/pages'
import { GalleryWishlist } from '@/components/concepts/gallery/pages'
import { SalonWishlist } from '@/components/concepts/salon/pages'
import { AtelierWishlist } from '@/components/concepts/atelier/pages'
import { ArchiveWishlist } from '@/components/concepts/archive/pages'
import { ObservatoryWishlist } from '@/components/concepts/observatory/pages'
import { MarketplaceWishlist } from '@/components/concepts/marketplace/pages'

export default function WishlistPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  const { items, removeItem, clearWishlist } = useWishlistStore()

  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalWishlist />
  if (concept.id === 'vault') return <VaultWishlist />
  if (concept.id === 'gallery') return <GalleryWishlist />
  if (concept.id === 'salon') return <SalonWishlist />
  if (concept.id === 'atelier') return <AtelierWishlist />
  if (concept.id === 'archive') return <ArchiveWishlist />
  if (concept.id === 'observatory') return <ObservatoryWishlist />
  if (concept.id === 'theater') return <TheaterWishlist />
  if (concept.id === 'marketplace') return <MarketplaceWishlist />

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Wishlist"
        subtitle="Your curated selection of coveted pieces."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Wishlist', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        {items.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs font-light opacity-50">
                {items.length} {items.length === 1 ? 'piece' : 'pieces'} saved
              </p>
              <button
                onClick={clearWishlist}
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] opacity-40 hover:opacity-100 transition-opacity"
              >
                <Trash2 size={12} strokeWidth={1.5} />
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {items.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative group"
                >
                  <ProductCard product={product} concept={concept} index={i} />
                  <button
                    onClick={() => removeItem(product.id)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: concept.palette.surface }}
                  >
                    <Heart size={14} fill={concept.palette.accent} color={concept.palette.accent} />
                  </button>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <Heart size={48} strokeWidth={0.5} className="mx-auto mb-6 opacity-20" />
            <h2 className={`text-xl font-light mb-3 ${concept.fonts.headingClass}`}>
              Your Wishlist is Empty
            </h2>
            <p className="text-sm font-light opacity-40 mb-8 max-w-sm mx-auto">
              Save pieces you love to revisit them later. Browse our collections to discover something extraordinary.
            </p>
            <Link
              href={buildConceptUrl(concept.id, 'collections')}
              className="inline-block px-8 py-3 text-[10px] uppercase tracking-[0.2em]"
              style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
            >
              {concept.ctaText.browse}
            </Link>
          </div>
        )}
      </div>
      <CTABanner
        concept={concept}
        title="Need Guidance?"
        description="Our experts can help you curate the perfect collection."
        ctaLabel={concept.ctaText.contact}
        ctaHref={buildConceptUrl(concept.id, 'contact')}
      />
    </ConceptLayout>
  )
}
