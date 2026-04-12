'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Minus, Plus, Shield, Truck, RotateCcw } from 'lucide-react'
import { type Product } from '@/data/products'
import { type ConceptConfig } from '@/data/concepts'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { ProductGrid } from './product-grid'
import { getRelatedProducts } from '@/data/products'

interface ProductDetailProps {
  product: Product
  concept: ConceptConfig
}

export function ProductDetail({ product, concept }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const wishlisted = isInWishlist(product.id)
  const related = getRelatedProducts(product.id, 4)
  const isMinimal = concept.id === 'minimal'

  return (
    <div style={{ backgroundColor: concept.palette.bg, color: concept.palette.text }}>
      {/* Main Product Section */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={isMinimal ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="relative w-16 h-20 overflow-hidden transition-opacity"
                    style={{
                      opacity: selectedImage === i ? 1 : 0.4,
                      border: selectedImage === i ? `1px solid ${concept.palette.accent}` : `1px solid ${concept.palette.muted}`,
                    }}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:py-8">
            <div className="space-y-6">
              {/* Breadcrumb */}
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">
                {product.category.replace(/-/g, ' ')}
              </p>

              {/* Title */}
              <div>
                <h1
                  className={`text-2xl lg:text-3xl font-light tracking-[0.02em] mb-2 ${concept.fonts.headingClass}`}
                >
                  {product.name}
                </h1>
                <p className="text-sm font-light opacity-60">{product.subtitle}</p>
              </div>

              {/* Price */}
              <p
                className="text-xl font-light tracking-[0.05em]"
                style={{ color: concept.palette.accent }}
              >
                {product.priceDisplay}
              </p>

              {/* Description */}
              <p className="text-sm leading-relaxed font-light opacity-70">
                {product.description}
              </p>

              {/* Diamond Specs */}
              {product.diamondSpecs && (
                <div
                  className="p-6 space-y-3"
                  style={{ backgroundColor: concept.palette.surface }}
                >
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium mb-4">
                    Diamond Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(product.diamondSpecs).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-[9px] uppercase tracking-[0.15em] opacity-40 mb-1">
                          {key}
                        </p>
                        <p className="text-xs font-light">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div
                    className="flex items-center border"
                    style={{ borderColor: concept.palette.muted }}
                  >
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 transition-opacity hover:opacity-60"
                    >
                      <Minus size={14} strokeWidth={1.5} />
                    </button>
                    <span className="w-10 text-center text-xs">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 transition-opacity hover:opacity-60"
                    >
                      <Plus size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      for (let i = 0; i < quantity; i++) addItem(product)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: concept.palette.accent,
                      color: concept.palette.bg,
                    }}
                  >
                    <ShoppingBag size={14} strokeWidth={1.5} />
                    {concept.ctaText.acquire}
                  </button>
                  <button
                    onClick={() => toggleItem(product)}
                    className="p-4 border transition-opacity hover:opacity-60"
                    style={{ borderColor: concept.palette.muted }}
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      size={16}
                      strokeWidth={1.5}
                      fill={wishlisted ? concept.palette.accent : 'none'}
                      color={wishlisted ? concept.palette.accent : concept.palette.text}
                    />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 pt-4">
                {product.features.map((feature) => (
                  <p key={feature} className="text-xs font-light opacity-60 flex items-center gap-2">
                    <span style={{ color: concept.palette.accent }}>—</span>
                    {feature}
                  </p>
                ))}
              </div>

              {/* Trust Badges */}
              <div
                className="grid grid-cols-3 gap-4 pt-6"
                style={{ borderTop: `1px solid ${concept.palette.muted}` }}
              >
                <div className="text-center">
                  <Truck size={16} strokeWidth={1} className="mx-auto mb-2 opacity-40" />
                  <p className="text-[9px] uppercase tracking-[0.1em] opacity-40">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield size={16} strokeWidth={1} className="mx-auto mb-2 opacity-40" />
                  <p className="text-[9px] uppercase tracking-[0.1em] opacity-40">Lifetime Warranty</p>
                </div>
                <div className="text-center">
                  <RotateCcw size={16} strokeWidth={1} className="mx-auto mb-2 opacity-40" />
                  <p className="text-[9px] uppercase tracking-[0.1em] opacity-40">30-Day Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16 lg:py-24">
          <h2
            className={`text-lg font-light tracking-[0.1em] mb-10 ${concept.fonts.headingClass}`}
          >
            You May Also Like
          </h2>
          <ProductGrid products={related} concept={concept} columns={4} />
        </div>
      )}
    </div>
  )
}
