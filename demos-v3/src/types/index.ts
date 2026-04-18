/**
 * Vault Maison — Comprehensive Type Definitions
 * 
 * This file contains all TypeScript interfaces and types used across the platform.
 * It serves as the single source of truth for data structures, ensuring consistency
 * between the frontend and the future backend API.
 */

// ═══════════════════════════════════════════════════════════════
// PRODUCT TYPES
// ═══════════════════════════════════════════════════════════════

export type ProductCategory =
  | 'diamond-rings' | 'diamond-necklaces' | 'diamond-earrings' | 'diamond-bracelets'
  | 'gold-rings' | 'gold-necklaces' | 'gold-earrings' | 'gold-bracelets'
  | 'loose-diamonds' | 'wedding-bridal'

export type MetalType = 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum'
export type RingSize = '4' | '4.5' | '5' | '5.5' | '6' | '6.5' | '7' | '7.5' | '8' | '8.5' | '9'
export type GoldKarat = '14K' | '18K' | '24K'
export type GoldColor = 'Yellow' | 'White' | 'Rose'
export type DiamondOrigin = 'Lab-Grown' | 'Natural'
export type MaterialType = 'Diamond' | 'Gold' | 'Diamond & Gold' | 'Platinum'

export interface DiamondSpecs {
  carat: string
  cut: string
  color: string
  clarity: string
  shape: string
  origin: DiamondOrigin
  certification: string
}

export interface Product {
  id: string
  slug: string
  name: string
  subtitle: string
  category: ProductCategory
  price: number
  priceDisplay: string
  material: MaterialType
  goldKarat?: GoldKarat
  goldColor?: GoldColor
  diamondSpecs?: DiamondSpecs
  images: string[]
  description: string
  features: string[]
  inStock: boolean
  isNew?: boolean
  isBestseller?: boolean
  isLimited?: boolean
  /** GemHub media ID for 360° viewer integration */
  gemhubId?: string
  /** GemHub share link URL */
  gemhubUrl?: string
}

// ═══════════════════════════════════════════════════════════════
// CART TYPES
// ═══════════════════════════════════════════════════════════════

export interface CartItem {
  product: Product
  quantity: number
  size?: string
  metal?: MetalType
  giftWrap?: boolean
  engraving?: string
}

export interface CartState {
  items: CartItem[]
  promoCode: string | null
  promoDiscount: number
  giftMessage: string | null
  addItem: (product: Product, size?: string, metal?: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  applyPromoCode: (code: string) => boolean
  removePromoCode: () => void
  setGiftMessage: (message: string | null) => void
  getSubtotal: () => number
  getDiscount: () => number
  getShipping: () => number
  getTotal: () => number
  getItemCount: () => number
}

// ═══════════════════════════════════════════════════════════════
// WISHLIST TYPES
// ═══════════════════════════════════════════════════════════════

export interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

// ═══════════════════════════════════════════════════════════════
// USER / ACCOUNT TYPES
// ═══════════════════════════════════════════════════════════════

export interface Address {
  id: string
  label: string
  firstName: string
  lastName: string
  street: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault: boolean
}

export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: string
  addresses: Address[]
  preferences: {
    newsletter: boolean
    smsNotifications: boolean
    preferredMetal?: MetalType
    ringSize?: RingSize
  }
}

// ═══════════════════════════════════════════════════════════════
// ORDER TYPES
// ═══════════════════════════════════════════════════════════════

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
export type ShippingMethod = 'standard' | 'express' | 'overnight'

export interface OrderItem {
  product: Product
  quantity: number
  size?: string
  metal?: MetalType
  priceAtPurchase: number
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: OrderStatus
  items: OrderItem[]
  shippingAddress: Address
  billingAddress: Address
  shippingMethod: ShippingMethod
  subtotal: number
  shippingCost: number
  tax: number
  discount: number
  total: number
  trackingNumber?: string
  estimatedDelivery?: string
  giftMessage?: string
  giftWrap: boolean
}

// ═══════════════════════════════════════════════════════════════
// CHECKOUT TYPES
// ═══════════════════════════════════════════════════════════════

export type CheckoutStep = 'information' | 'shipping' | 'payment'

export interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  shippingMethod: ShippingMethod
  giftWrap: boolean
  giftMessage?: string
  saveAddress: boolean
  createAccount: boolean
}

// ═══════════════════════════════════════════════════════════════
// REVIEW TYPES
// ═══════════════════════════════════════════════════════════════

export interface ProductReview {
  id: string
  productId: string
  author: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
  images?: string[]
  helpfulCount: number
  size?: string
  metal?: MetalType
}

// ═══════════════════════════════════════════════════════════════
// SEARCH TYPES
// ═══════════════════════════════════════════════════════════════

export interface SearchResult {
  products: Product[]
  totalCount: number
  query: string
  suggestions: string[]
}

export interface SearchFilters {
  category?: ProductCategory
  minPrice?: number
  maxPrice?: number
  material?: MaterialType
  inStock?: boolean
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | 'bestselling'
}

// ═══════════════════════════════════════════════════════════════
// CONCEPT TYPES
// ═══════════════════════════════════════════════════════════════

export interface ConceptPalette {
  bg: string
  text: string
  accent: string
  muted: string
  surface: string
}

export interface ConceptFonts {
  heading: string
  body: string
  headingClass: string
  bodyClass: string
}

export interface ConceptConfig {
  id: string
  number: string
  name: string
  tagline: string
  dna: string
  palette: ConceptPalette
  fonts: ConceptFonts
  components: string[]
  ctaText: {
    acquire: string
    browse: string
    contact: string
    viewCollection: string
    bespoke: string
  }
  route: string
  heroImage: string
  description: string
}

// ═══════════════════════════════════════════════════════════════
// GEMHUB TYPES
// ═══════════════════════════════════════════════════════════════

export interface GemHubAsset {
  id: string
  productId: string
  type: '360-video' | 'image' | 'ar-model'
  url: string
  thumbnailUrl: string
  width: number
  height: number
}

export interface GemHubConfig {
  enabled: boolean
  baseUrl: string
  customDomain?: string
  defaultSettings: {
    showBanner: boolean
    showLogo: boolean
    showContact: boolean
    showCart: boolean
  }
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION TYPES
// ═══════════════════════════════════════════════════════════════

export interface MegaMenuItem {
  label: string
  href: string
  badge?: string
  children?: MegaMenuColumn[]
}

export interface MegaMenuColumn {
  title: string
  links: { label: string; href: string; badge?: string }[]
  image?: string
}

// ═══════════════════════════════════════════════════════════════
// API RESPONSE TYPES
// ═══════════════════════════════════════════════════════════════

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  pagination?: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, string>
}
