'use client'

import Link from 'next/link'
import { ShoppingBag, Heart, Package, Search } from 'lucide-react'
import { type ConceptConfig } from '@/data/concepts'

interface EmptyStateProps {
  concept: ConceptConfig
  type: 'cart' | 'wishlist' | 'orders' | 'search'
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

const defaults = {
  cart: {
    icon: ShoppingBag,
    title: 'Your Cart is Empty',
    description: 'Discover our curated collection of fine jewelry',
    actionLabel: 'Explore Collections',
  },
  wishlist: {
    icon: Heart,
    title: 'Your Wishlist is Empty',
    description: 'Save pieces you love for later',
    actionLabel: 'Browse Collections',
  },
  orders: {
    icon: Package,
    title: 'No Orders Yet',
    description: 'Your order history will appear here',
    actionLabel: 'Start Shopping',
  },
  search: {
    icon: Search,
    title: 'No Results Found',
    description: 'Try adjusting your search terms',
    actionLabel: 'View All Products',
  },
}

export function EmptyState({
  concept,
  type,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  const config = defaults[type]
  const Icon = config.icon
  const accent = concept.palette.accent
  const bg = concept.palette.bg
  const muted = concept.palette.muted

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: `${accent}10` }}
      >
        <Icon size={32} style={{ color: muted }} strokeWidth={1} />
      </div>
      <h2
        className="text-xl tracking-wider mb-2"
        style={{ fontFamily: concept.fonts.heading }}
      >
        {title || config.title}
      </h2>
      <p className="text-sm opacity-50 mb-8 max-w-sm">
        {description || config.description}
      </p>
      <Link
        href={actionHref || `/${concept.id}/collections`}
        className="px-8 py-3 text-xs tracking-widest uppercase font-medium transition-all"
        style={{ backgroundColor: accent, color: bg }}
      >
        {actionLabel || config.actionLabel}
      </Link>
    </div>
  )
}
