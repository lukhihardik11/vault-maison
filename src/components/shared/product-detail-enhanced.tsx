'use client'

import { useState, useEffect } from 'react'
import { Heart, ShoppingBag, Shield, Truck, RotateCcw, Check, Gift } from 'lucide-react'
import { type Product, getRelatedProducts, formatPrice } from '@/data/products'
import { type ConceptConfig } from '@/data/concepts'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { ImageGallery } from './image-gallery'
import { SizeSelector, MetalSelector, QuantitySelector } from './product-selectors'
import { GemHubViewer } from './gemhub-viewer'
import { ProductGrid } from './product-grid'

interface ProductDetailEnhancedProps {
  product: Product
  concept: ConceptConfig
}

export function ProductDetailEnhanced({ product, concept }: ProductDetailEnhancedProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedMetal, setSelectedMetal] = useState(
    product.goldColor === 'Rose' ? 'rose-gold' :
    product.goldColor === 'White' ? 'white-gold' :
    product.material === 'Platinum' ? 'platinum' : 'yellow-gold'
  )
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care'>('details')

  const { addItem } = useCartStore()
  const { toggleItem, isInWishlist } = useWishlistStore()
  const wishlisted = isInWishlist(product.id)
  const related = getRelatedProducts(product.id, 4)

  const handleAddToCart = () => {
    addItem(product, selectedSize || undefined, selectedMetal || undefined)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const conceptTheme = concept.id as 'minimal' | 'vault' | 'gallery' | 'salon' | 'atelier' | 'archive' | 'observatory' | 'theater' | 'marketplace' | 'maison'

  return (
    <div style={{ backgroundColor: concept.palette.bg, color: concept.palette.text }}>
      {/* Main Product Section */}
      <div className="mx-auto max-w-[1440px] px-4 lg:px-12 py-6 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
          {/* Left: Images */}
          <div className="space-y-4">
            {/* GemHub 360° Viewer */}
            <GemHubViewer
              shareUrl={product.gemhubUrl}
              gemhubId={product.gemhubId}
              productName={product.name}
              fallbackImage={product.images[0]}
              concept={concept}
            />

            {/* Image Gallery */}
            <ImageGallery
              images={product.images}
              alt={product.name}
              concept={concept}
            />
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Title & Price */}
            <div>
              {product.isNew && (
                <span
                  className="inline-block px-3 py-1 text-[9px] uppercase tracking-[0.2em] mb-3"
                  style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
                >
                  New Arrival
                </span>
              )}
              {product.isBestseller && (
                <span
                  className="inline-block px-3 py-1 text-[9px] uppercase tracking-[0.2em] mb-3 ml-2"
                  style={{ border: `1px solid ${concept.palette.accent}`, color: concept.palette.accent }}
                >
                  Bestseller
                </span>
              )}
              <h1 className={`text-2xl lg:text-3xl font-light tracking-[0.02em] ${concept.fonts.headingClass}`}>
                {product.name}
              </h1>
              <p className="text-sm opacity-50 mt-1">{product.subtitle}</p>
              <p
                className="text-xl lg:text-2xl font-light mt-4"
                style={{ color: concept.palette.accent }}
              >
                {product.priceDisplay}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed opacity-70">{product.description}</p>

            {/* Diamond Specs */}
            {product.diamondSpecs && (
              <div
                className="p-4"
                style={{ backgroundColor: concept.palette.surface, border: `1px solid ${concept.palette.muted}` }}
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

            {/* Size Selector */}
            <SizeSelector
              concept={concept}
              category={product.category}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />

            {/* Metal Selector */}
            <MetalSelector
              concept={concept}
              selectedMetal={selectedMetal}
              onMetalChange={setSelectedMetal}
            />

            {/* Quantity */}
            <QuantitySelector
              concept={concept}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />

            {/* Add to Cart + Wishlist */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 text-[10px] uppercase tracking-[0.2em] transition-all active:scale-[0.97] min-h-[44px]"
                style={{
                  backgroundColor: addedToCart ? '#22c55e' : concept.palette.accent,
                  color: concept.palette.bg,
                }}
              >
                {addedToCart ? (
                  <>
                    <Check size={14} strokeWidth={2} />
                    Added to Collection
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} strokeWidth={1.5} />
                    {concept.ctaText.acquire}
                  </>
                )}
              </button>
              <button
                onClick={() => toggleItem(product)}
                className="p-4 border transition-all active:scale-[0.97] min-w-[44px] min-h-[44px]"
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

            {/* Features */}
            <div className="space-y-2 pt-2">
              {product.features.map((feature) => (
                <p key={feature} className="text-xs font-light opacity-60 flex items-center gap-2">
                  <span style={{ color: concept.palette.accent }}>—</span>
                  {feature}
                </p>
              ))}
            </div>

            {/* Tabs: Details / Specs / Care */}
            <div className="pt-4">
              <div
                className="flex gap-0"
                style={{ borderBottom: `1px solid ${concept.palette.muted}` }}
              >
                {(['details', 'specs', 'care'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all relative"
                    style={{
                      opacity: activeTab === tab ? 1 : 0.4,
                      borderBottom: activeTab === tab ? `2px solid ${concept.palette.accent}` : '2px solid transparent',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="py-4 text-xs leading-relaxed opacity-70">
                {activeTab === 'details' && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <p>
                      Crafted with meticulous attention to detail, this piece represents the pinnacle
                      of fine jewelry artisanship. Each element has been carefully considered to ensure
                      both aesthetic beauty and lasting durability.
                    </p>
                    <p>
                      Material: {product.material}
                      {product.goldKarat && ` · ${product.goldKarat}`}
                      {product.goldColor && ` · ${product.goldColor}`}
                    </p>
                  </div>
                )}
                {activeTab === 'specs' && product.diamondSpecs && (
                  <div className="space-y-2">
                    {Object.entries(product.diamondSpecs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1.5" style={{ borderBottom: `1px solid ${concept.palette.muted}` }}>
                        <span className="uppercase tracking-[0.1em] opacity-60">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="space-y-3">
                    <p>Store in the provided jewelry box when not wearing. Avoid contact with perfumes, lotions, and harsh chemicals.</p>
                    <p>Clean gently with a soft cloth. For deeper cleaning, use warm water with mild soap and a soft brush.</p>
                    <p>Professional cleaning and inspection recommended every 6-12 months to maintain brilliance and check settings.</p>
                    <p>This piece comes with a lifetime warranty covering manufacturing defects and complimentary annual maintenance.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4"
              style={{ borderTop: `1px solid ${concept.palette.muted}` }}
            >
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Insured delivery' },
                { icon: Shield, label: 'Lifetime Warranty', sub: 'Full coverage' },
                { icon: RotateCcw, label: '30-Day Returns', sub: 'No questions asked' },
                { icon: Gift, label: 'Gift Wrapping', sub: 'Complimentary' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon size={16} strokeWidth={1} className="mx-auto mb-2 opacity-40" />
                  <p className="text-[9px] uppercase tracking-[0.1em] opacity-60">{label}</p>
                  <p className="text-[8px] opacity-30 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mx-auto max-w-[1440px] px-4 lg:px-12 py-12 lg:py-24">
          <h2
            className={`text-lg font-light tracking-[0.1em] mb-10 ${concept.fonts.headingClass}`}
          >
            You May Also Like
          </h2>
          <ProductGrid products={related} concept={concept} columns={4} />
        </div>
      )}

      {/* Bottom padding for mobile nav */}
      <div className="h-20 lg:hidden" />
    </div>
  )
}
