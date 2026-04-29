'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getConcept, type ProductCategory } from '@/data/concepts'
import { products } from '@/data/products'
import { collections } from '@/data/collections'
import { ConceptLayout, PageHeader } from '@/components/shared'
import { buildConceptUrl, buildCategoryUrl, buildProductUrl } from '@/lib/concept-utils'

const categories: { slug: ProductCategory; label: string }[] = [
  { slug: 'diamond-rings', label: 'Diamond Rings' },
  { slug: 'diamond-necklaces', label: 'Diamond Necklaces' },
  { slug: 'diamond-earrings', label: 'Diamond Earrings' },
  { slug: 'diamond-bracelets', label: 'Diamond Bracelets' },
  { slug: 'gold-rings', label: 'Gold Rings' },
  { slug: 'gold-necklaces', label: 'Gold Necklaces' },
  { slug: 'gold-earrings', label: 'Gold Earrings' },
  { slug: 'gold-bracelets', label: 'Gold Bracelets' },
  { slug: 'loose-diamonds', label: 'Loose Diamonds' },
  { slug: 'wedding-bridal', label: 'Wedding & Bridal' },
]

const pages = [
  { href: '', label: 'Home' },
  { href: 'about', label: 'About' },
  { href: 'collections', label: 'Collections' },
  { href: 'new-arrivals', label: 'New Arrivals' },
  { href: 'bestsellers', label: 'Bestsellers' },
  { href: 'bespoke', label: 'Bespoke Service' },
  { href: 'journal', label: 'Journal' },
  { href: 'lookbook', label: 'Lookbook' },
  { href: 'gifts', label: 'Gift Guide' },
  { href: 'craftsmanship', label: 'Craftsmanship' },
  { href: 'sustainability', label: 'Sustainability' },
  { href: 'stores', label: 'Our Stores' },
  { href: 'appointments', label: 'Book Appointment' },
  { href: 'reviews', label: 'Client Reviews' },
  { href: 'press', label: 'Press & Media' },
  { href: 'contact', label: 'Contact' },
  { href: 'search', label: 'Search' },
  { href: 'cart', label: 'Shopping Bag' },
  { href: 'checkout', label: 'Checkout' },
  { href: 'wishlist', label: 'Wishlist' },
  { href: 'account', label: 'Account' },
  { href: 'faq', label: 'FAQ' },
  { href: 'sizing', label: 'Ring Sizing Guide' },
  { href: 'grading', label: 'Diamond Grading' },
  { href: 'engraving', label: 'Engraving Service' },
  { href: 'care', label: 'Jewelry Care' },
  { href: 'insurance', label: 'Insurance' },
  { href: 'shipping', label: 'Shipping' },
  { href: 'returns', label: 'Returns & Exchanges' },
  { href: 'privacy', label: 'Privacy Policy' },
  { href: 'terms', label: 'Terms & Conditions' },
  { href: 'accessibility', label: 'Accessibility' },
]

export default function SitemapPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }} />

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Sitemap"
        subtitle="A complete overview of all pages within this experience."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Sitemap', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-12 pb-16 lg:pb-24">
        {/* Main Pages */}
        <div className="mb-12">
          <h2
            className={`text-sm uppercase tracking-[0.15em] font-medium mb-4 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.accent }}
          >
            Pages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
            {pages.map((page) => (
              <Link
                key={page.href}
                href={buildConceptUrl(concept.id, page.href)}
                className="text-xs font-light opacity-60 hover:opacity-100 transition-opacity py-1"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2
            className={`text-sm uppercase tracking-[0.15em] font-medium mb-4 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.accent }}
          >
            Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={buildCategoryUrl(concept.id, cat.slug)}
                className="text-xs font-light opacity-60 hover:opacity-100 transition-opacity py-1"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="mb-12">
          <h2
            className={`text-sm uppercase tracking-[0.15em] font-medium mb-4 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.accent }}
          >
            Collections
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
            {collections.map((col) => (
              <span key={col.id} className="text-xs font-light opacity-60 py-1">
                {col.name}
              </span>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <h2
            className={`text-sm uppercase tracking-[0.15em] font-medium mb-4 ${concept.fonts.headingClass}`}
            style={{ color: concept.palette.accent }}
          >
            Products ({products.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={buildProductUrl(concept.id, product.slug)}
                className="text-xs font-light opacity-60 hover:opacity-100 transition-opacity py-1"
              >
                {product.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ConceptLayout>
  )
}
