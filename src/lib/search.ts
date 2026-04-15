/**
 * Client-side fuzzy search powered by Fuse.js.
 *
 * Searches across product name, category, material, description,
 * and subtitle with weighted relevance scoring.
 *
 * When Supabase is configured, the API route (/api/products/search)
 * provides server-side full-text search. This module serves as the
 * fast client-side fallback and is used by the SearchOverlay component.
 */

import Fuse, { type IFuseOptions } from 'fuse.js'
import { products } from '@/data/products'
import type { Product } from '@/types'

const fuseOptions: IFuseOptions<Product> = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'category', weight: 0.2 },
    { name: 'material', weight: 0.15 },
    { name: 'description', weight: 0.15 },
    { name: 'subtitle', weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2,
}

// Lazy-initialize the Fuse index (only created once)
let fuseInstance: Fuse<Product> | null = null

function getFuse(): Fuse<Product> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(products, fuseOptions)
  }
  return fuseInstance
}

/**
 * Search products by query string.
 * Returns matching products sorted by relevance.
 */
export function searchProducts(query: string, limit = 20): Product[] {
  if (!query.trim() || query.trim().length < 2) return []
  const results = getFuse().search(query.trim(), { limit })
  return results.map((r) => r.item)
}

/**
 * Get search suggestions (autocomplete).
 * Returns product names that match the partial query.
 */
export function getSearchSuggestions(query: string, limit = 5): string[] {
  if (!query.trim() || query.trim().length < 2) return []
  const results = getFuse().search(query.trim(), { limit })
  return results.map((r) => r.item.name)
}

/**
 * Search products by category.
 */
export function searchByCategory(category: string): Product[] {
  return products.filter((p) =>
    p.category.toLowerCase().includes(category.toLowerCase())
  )
}

/**
 * Search products by price range.
 */
export function searchByPriceRange(min: number, max: number): Product[] {
  return products.filter((p) => p.price >= min && p.price <= max)
}

/**
 * Get trending/popular search terms based on product data.
 */
export function getTrendingSearchTerms(): string[] {
  return [
    'Diamond Ring',
    'Gold Necklace',
    'Emerald',
    'Wedding Band',
    'Sapphire Earrings',
    'Tennis Bracelet',
    'Solitaire',
    'Platinum',
  ]
}
