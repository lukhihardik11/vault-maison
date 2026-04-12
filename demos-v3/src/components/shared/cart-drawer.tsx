'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { type ConceptConfig } from '@/data/concepts'
import { useCartStore } from '@/store/cart'
import { buildConceptUrl } from '@/lib/concept-utils'
import { formatPrice } from '@/data/products'

interface CartDrawerProps {
  concept: ConceptConfig
}

export function CartDrawer({ concept }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[95] w-full max-w-md flex flex-col"
            style={{
              backgroundColor: concept.palette.bg,
              color: concept.palette.text,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: `1px solid ${concept.palette.muted}` }}
            >
              <h2
                className={`text-xs uppercase tracking-[0.2em] font-light ${concept.fonts.headingClass}`}
              >
                Your Selection ({items.length})
              </h2>
              <button onClick={closeCart} className="transition-opacity hover:opacity-60">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-6">
                    Your collection is empty
                  </p>
                  <button
                    onClick={closeCart}
                    className="text-[10px] uppercase tracking-[0.2em] px-6 py-3 border transition-opacity hover:opacity-60"
                    style={{ borderColor: concept.palette.muted }}
                  >
                    {concept.ctaText.browse}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4"
                    >
                      <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-light tracking-[0.05em] truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] opacity-40 mt-1">{item.product.subtitle}</p>
                        <p className="text-xs mt-2" style={{ color: concept.palette.accent }}>
                          {item.product.priceDisplay}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="opacity-60 hover:opacity-100 transition-opacity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="opacity-60 hover:opacity-100 transition-opacity"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="ml-auto opacity-40 hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-6 space-y-4"
                style={{ borderTop: `1px solid ${concept.palette.muted}` }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Subtotal</span>
                  <span className="text-sm font-light">{formatPrice(getTotal())}</span>
                </div>
                <p className="text-[10px] opacity-40">
                  Shipping and taxes calculated at checkout
                </p>
                <Link
                  href={buildConceptUrl(concept.id, 'checkout')}
                  onClick={closeCart}
                  className="block w-full text-center py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: concept.palette.accent,
                    color: concept.palette.bg,
                  }}
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full text-center py-3 text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
