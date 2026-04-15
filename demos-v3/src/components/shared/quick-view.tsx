'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/data/products'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'

interface QuickViewProps {
  product: Product
  conceptId: string
  onClose: () => void
  accentColor?: string
  bgColor?: string
  textColor?: string
}

export function QuickView({ product, conceptId, onClose, accentColor = '#D4AF37', bgColor = '#0A0A0A', textColor = '#EAEAEA' }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState('6')
  const [selectedMetal, setSelectedMetal] = useState('White Gold')
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)

  const sizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8']
  const metals = [
    { name: 'White Gold', color: '#E8E8E8' },
    { name: 'Yellow Gold', color: '#D4AF37' },
    { name: 'Rose Gold', color: '#B76E79' },
    { name: 'Platinum', color: '#C0C0C0' },
  ]

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedMetal)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: bgColor, border: `1px solid ${accentColor}20` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center"
          style={{ color: textColor }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4L16 16M16 4L4 16" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isNew && (
              <span
                className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-widest uppercase"
                style={{ backgroundColor: accentColor, color: bgColor }}
              >
                New
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <h2 className="text-xl font-light tracking-wide mb-1" style={{ color: textColor }}>
              {product.name}
            </h2>
            <p className="text-sm mb-4" style={{ color: `${textColor}80` }}>
              {product.subtitle}
            </p>
            <p className="text-lg mb-6" style={{ color: accentColor }}>
              {product.priceDisplay}
            </p>

            {/* Size selector */}
            <div className="mb-4">
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: `${textColor}80` }}>
                Ring Size
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className="w-10 h-10 text-xs flex items-center justify-center transition-all duration-200"
                    style={{
                      border: selectedSize === s ? `1px solid ${accentColor}` : `1px solid ${textColor}30`,
                      backgroundColor: selectedSize === s ? `${accentColor}15` : 'transparent',
                      color: selectedSize === s ? accentColor : textColor,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Metal selector */}
            <div className="mb-6">
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: `${textColor}80` }}>
                Metal
              </p>
              <div className="flex gap-3">
                {metals.map(m => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMetal(m.name)}
                    className="w-8 h-8 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: m.color,
                      border: selectedMetal === m.name ? `2px solid ${accentColor}` : '2px solid transparent',
                      boxShadow: selectedMetal === m.name ? `0 0 0 2px ${bgColor}, 0 0 0 4px ${accentColor}` : 'none',
                    }}
                    title={m.name}
                  />
                ))}
              </div>
            </div>

            <div className="mt-auto space-y-3">
              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300"
                style={{
                  backgroundColor: added ? '#22c55e' : accentColor,
                  color: bgColor,
                }}
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                className="w-full py-3 text-xs tracking-[0.2em] uppercase border transition-colors duration-200"
                style={{
                  borderColor: `${textColor}30`,
                  color: inWishlist ? '#ef4444' : textColor,
                }}
              >
                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>

              {/* View full details */}
              <Link
                href={`/${conceptId}/product/${product.slug}`}
                className="block text-center py-2 text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: accentColor }}
                onClick={onClose}
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
