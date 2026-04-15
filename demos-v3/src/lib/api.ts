/**
 * Vault Maison — API Abstraction Layer
 * 
 * This module provides a backend-ready API interface. Currently, all methods
 * resolve against local data (products.ts, mock data). When a real backend
 * is implemented, only this file needs to change — all consumers remain untouched.
 * 
 * Future backend: Replace local imports with fetch() calls to your REST/GraphQL API.
 */

import { products, type Product } from '@/data/products'
import type { SearchFilters, ApiResponse, Order, UserProfile, ProductReview } from '@/types'

// ═══════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''
const USE_MOCK = !API_BASE // When no API URL is set, use local data

// ═══════════════════════════════════════════════════════════════
// PRODUCT API
// ═══════════════════════════════════════════════════════════════

export const productApi = {
  /** Fetch all products with optional filters */
  async getProducts(filters?: SearchFilters): Promise<ApiResponse<Product[]>> {
    if (USE_MOCK) {
      let filtered = [...products]

      if (filters?.category) {
        filtered = filtered.filter(p => p.category === filters.category)
      }
      if (filters?.material) {
        filtered = filtered.filter(p => p.material === filters.material)
      }
      if (filters?.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= filters.minPrice!)
      }
      if (filters?.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice!)
      }
      if (filters?.inStock !== undefined) {
        filtered = filtered.filter(p => p.inStock === filters.inStock)
      }

      // Sorting
      if (filters?.sortBy) {
        switch (filters.sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price)
            break
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price)
            break
          case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name))
            break
          case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name))
            break
          case 'newest':
            filtered = filtered.filter(p => p.isNew).concat(filtered.filter(p => !p.isNew))
            break
          case 'bestselling':
            filtered = filtered.filter(p => p.isBestseller).concat(filtered.filter(p => !p.isBestseller))
            break
        }
      }

      return {
        data: filtered,
        success: true,
        pagination: {
          page: 1,
          pageSize: filtered.length,
          totalItems: filtered.length,
          totalPages: 1,
        },
      }
    }

    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.set(key, String(value))
      })
    }
    const res = await fetch(`${API_BASE}/api/products?${params}`)
    return res.json()
  },

  /** Fetch a single product by slug */
  async getProduct(slug: string): Promise<ApiResponse<Product | null>> {
    if (USE_MOCK) {
      const product = products.find(p => p.slug === slug) || null
      return { data: product, success: !!product }
    }
    const res = await fetch(`${API_BASE}/api/products/${slug}`)
    return res.json()
  },

  /** Fetch related products (same category, excluding current) */
  async getRelatedProducts(productId: string, limit = 4): Promise<ApiResponse<Product[]>> {
    if (USE_MOCK) {
      const current = products.find(p => p.id === productId)
      if (!current) return { data: [], success: true }
      const related = products
        .filter(p => p.category === current.category && p.id !== productId)
        .slice(0, limit)
      return { data: related, success: true }
    }
    const res = await fetch(`${API_BASE}/api/products/${productId}/related?limit=${limit}`)
    return res.json()
  },

  /** Fetch recently viewed products (from localStorage) */
  getRecentlyViewed(limit = 4): Product[] {
    if (typeof window === 'undefined') return []
    const ids: string[] = JSON.parse(localStorage.getItem('vm_recently_viewed') || '[]')
    return ids
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => !!p)
      .slice(0, limit)
  },

  /** Track a product view */
  trackView(productId: string): void {
    if (typeof window === 'undefined') return
    const ids: string[] = JSON.parse(localStorage.getItem('vm_recently_viewed') || '[]')
    const updated = [productId, ...ids.filter(id => id !== productId)].slice(0, 20)
    localStorage.setItem('vm_recently_viewed', JSON.stringify(updated))
  },
}

// ═══════════════════════════════════════════════════════════════
// SEARCH API
// ═══════════════════════════════════════════════════════════════

export const searchApi = {
  /** Full-text search across products */
  async search(query: string, filters?: SearchFilters): Promise<ApiResponse<Product[]>> {
    if (USE_MOCK) {
      const q = query.toLowerCase().trim()
      if (!q) return { data: [], success: true }

      let results = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
      )

      // Apply additional filters
      if (filters?.minPrice !== undefined) {
        results = results.filter(p => p.price >= filters.minPrice!)
      }
      if (filters?.maxPrice !== undefined) {
        results = results.filter(p => p.price <= filters.maxPrice!)
      }

      return {
        data: results,
        success: true,
        pagination: {
          page: 1,
          pageSize: results.length,
          totalItems: results.length,
          totalPages: 1,
        },
      }
    }

    const params = new URLSearchParams({ q: query })
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.set(key, String(value))
      })
    }
    const res = await fetch(`${API_BASE}/api/search?${params}`)
    return res.json()
  },

  /** Get search suggestions (autocomplete) */
  async getSuggestions(query: string): Promise<string[]> {
    if (USE_MOCK) {
      const q = query.toLowerCase().trim()
      if (!q) return []
      const names = products
        .filter(p => p.name.toLowerCase().includes(q))
        .map(p => p.name)
        .slice(0, 5)
      const categories = ['Diamond Rings', 'Gold Necklaces', 'Diamond Earrings', 'Gold Bracelets', 'Wedding Bands']
        .filter(c => c.toLowerCase().includes(q))
      return [...new Set([...names, ...categories])].slice(0, 8)
    }
    const res = await fetch(`${API_BASE}/api/search/suggestions?q=${query}`)
    return res.json()
  },

  /** Get popular searches */
  getPopularSearches(): string[] {
    return ['Diamond Ring', 'Gold Necklace', 'Engagement Ring', 'Tennis Bracelet', 'Pearl Earrings', 'Wedding Band']
  },

  /** Get recent searches from localStorage */
  getRecentSearches(): string[] {
    if (typeof window === 'undefined') return []
    return JSON.parse(localStorage.getItem('vm_recent_searches') || '[]')
  },

  /** Save a search query */
  saveSearch(query: string): void {
    if (typeof window === 'undefined') return
    const searches: string[] = JSON.parse(localStorage.getItem('vm_recent_searches') || '[]')
    const updated = [query, ...searches.filter(s => s !== query)].slice(0, 10)
    localStorage.setItem('vm_recent_searches', JSON.stringify(updated))
  },
}

// ═══════════════════════════════════════════════════════════════
// ORDER API
// ═══════════════════════════════════════════════════════════════

export const orderApi = {
  /** Place a new order */
  async placeOrder(/* orderData: CheckoutFormData, items: CartItem[] */): Promise<ApiResponse<Order>> {
    // Mock: generate a fake order
    const order: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: `VM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      date: new Date().toISOString(),
      status: 'confirmed',
      items: [],
      shippingAddress: {} as Order['shippingAddress'],
      billingAddress: {} as Order['billingAddress'],
      shippingMethod: 'standard',
      subtotal: 0,
      shippingCost: 0,
      tax: 0,
      discount: 0,
      total: 0,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      giftWrap: false,
    }
    return { data: order, success: true, message: 'Order placed successfully' }
  },

  /** Get order by ID */
  async getOrder(orderId: string): Promise<ApiResponse<Order | null>> {
    // Mock: return null (no orders in mock mode)
    return { data: null, success: false, message: `Order ${orderId} not found` }
  },

  /** Get all orders for current user */
  async getOrders(): Promise<ApiResponse<Order[]>> {
    // Mock: return sample orders
    return { data: [], success: true }
  },
}

// ═══════════════════════════════════════════════════════════════
// USER API
// ═══════════════════════════════════════════════════════════════

export const userApi = {
  /** Get current user profile */
  async getProfile(): Promise<ApiResponse<UserProfile | null>> {
    // Mock: return null (not logged in)
    return { data: null, success: false, message: 'Not authenticated' }
  },

  /** Update user profile */
  async updateProfile(data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    return { data: data as UserProfile, success: true, message: 'Profile updated' }
  },
}

// ═══════════════════════════════════════════════════════════════
// REVIEW API
// ═══════════════════════════════════════════════════════════════

/** Sample reviews for mock mode */
const mockReviews: ProductReview[] = [
  {
    id: 'rev-1',
    productId: 'celestial-diamond-ring',
    author: 'Sarah M.',
    rating: 5,
    title: 'Absolutely stunning',
    body: 'The brilliance of this ring is breathtaking. My fiancée was speechless when she saw it. The craftsmanship is impeccable and the diamond catches light beautifully from every angle.',
    date: '2025-12-15',
    verified: true,
    helpfulCount: 24,
    size: '6',
    metal: 'White Gold',
  },
  {
    id: 'rev-2',
    productId: 'celestial-diamond-ring',
    author: 'James K.',
    rating: 5,
    title: 'Perfect engagement ring',
    body: 'I spent months researching and this was the best choice I could have made. The quality exceeds what I expected at this price point. Highly recommend.',
    date: '2025-11-28',
    verified: true,
    helpfulCount: 18,
    size: '5.5',
    metal: 'Platinum',
  },
  {
    id: 'rev-3',
    productId: 'celestial-diamond-ring',
    author: 'Emily R.',
    rating: 4,
    title: 'Beautiful but sizing was tricky',
    body: 'The ring itself is gorgeous and the diamond is flawless. I had to exchange for a half size up, but the process was smooth and quick.',
    date: '2025-10-03',
    verified: true,
    helpfulCount: 12,
    size: '7',
    metal: 'Rose Gold',
  },
]

export const reviewApi = {
  /** Get reviews for a product */
  async getReviews(productId: string): Promise<ApiResponse<ProductReview[]>> {
    if (USE_MOCK) {
      // Return mock reviews for any product
      const reviews = mockReviews.map(r => ({ ...r, productId }))
      return { data: reviews, success: true }
    }
    const res = await fetch(`${API_BASE}/api/products/${productId}/reviews`)
    return res.json()
  },

  /** Submit a review */
  async submitReview(review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>): Promise<ApiResponse<ProductReview>> {
    const newReview: ProductReview = {
      ...review,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString(),
      helpfulCount: 0,
    }
    return { data: newReview, success: true, message: 'Review submitted' }
  },
}
