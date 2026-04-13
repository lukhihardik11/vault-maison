'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { getConcept } from '@/data/concepts'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/data/products'
import { ConceptLayout, PageHeader, FeaturedProducts } from '@/components/shared'
import { getBestsellers } from '@/data/products'
import { buildConceptUrl } from '@/lib/concept-utils'
import { MinimalCart } from '@/components/concepts/minimal/pages'

export default function CartPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  if (!concept) return null

  if (concept.id === 'minimal') return <MinimalCart />

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Your Selection"
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Cart', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-8">
              Your collection is empty
            </p>
            <Link
              href={buildConceptUrl(concept.id, 'collections')}
              className="inline-block px-8 py-4 text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
              style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
            >
              {concept.ctaText.browse}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-6 pb-6"
                  style={{ borderBottom: `1px solid ${concept.palette.muted}` }}
                >
                  <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-light">{item.product.name}</h3>
                    <p className="text-[10px] opacity-40 mt-1">{item.product.subtitle}</p>
                    <p className="text-sm mt-2" style={{ color: concept.palette.accent }}>
                      {item.product.priceDisplay}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border" style={{ borderColor: concept.palette.muted }}>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2"><Minus size={12} /></button>
                        <span className="w-8 text-center text-xs">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2"><Plus size={12} /></button>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="opacity-40 hover:opacity-100 transition-opacity">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-light">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="p-6" style={{ backgroundColor: concept.palette.surface }}>
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs opacity-60">
                    <span>Subtotal</span><span>{formatPrice(getTotal())}</span>
                  </div>
                  <div className="flex justify-between text-xs opacity-60">
                    <span>Shipping</span><span>Calculated at checkout</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm font-light pt-4" style={{ borderTop: `1px solid ${concept.palette.muted}` }}>
                  <span>Total</span>
                  <span style={{ color: concept.palette.accent }}>{formatPrice(getTotal())}</span>
                </div>
                <Link
                  href={buildConceptUrl(concept.id, 'checkout')}
                  className="block w-full text-center mt-6 py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                  style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <FeaturedProducts concept={concept} products={getBestsellers()} title="You May Also Like" />
    </ConceptLayout>
  )
}
