import { MetadataRoute } from 'next'
import { concepts } from '@/data/concepts'
import { products } from '@/data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vault-maison.vercel.app'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
  ]

  // Concept home pages
  const conceptPages = concepts.map((c) => ({
    url: `${baseUrl}/${c.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Concept sub-pages
  const subPages = ['about', 'collections', 'craftsmanship', 'journal', 'bespoke', 'contact', 'cart', 'search', 'account', 'faq', 'care', 'shipping', 'grading']
  const conceptSubPages = concepts.flatMap((c) =>
    subPages.map((page) => ({
      url: `${baseUrl}/${c.id}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  // Product pages
  const productPages = concepts.flatMap((c) =>
    products.map((p) => ({
      url: `${baseUrl}/${c.id}/product/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

  // Category pages
  const categories = ['rings', 'necklaces', 'earrings', 'bracelets']
  const categoryPages = concepts.flatMap((c) =>
    categories.map((cat) => ({
      url: `${baseUrl}/${c.id}/category/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

  return [...staticPages, ...conceptPages, ...conceptSubPages, ...productPages, ...categoryPages]
}
