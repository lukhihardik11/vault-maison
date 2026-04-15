'use client'

import { Suspense, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getConcept } from '@/data/concepts'
import { ConceptLayout } from '@/components/shared'
import { Check, Package, ArrowRight, Loader2 } from 'lucide-react'

interface OrderData {
  id: string
  orderNumber: string
  status: string
  total: number
  items: Array<{
    product_name: string
    quantity: number
    unit_price: number
  }>
  shippingAddress?: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zip: string
  }
}

function ConfirmationContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const concept = getConcept(params.concept as string)
  const orderNumber = searchParams.get('order')
  const [order, setOrder] = useState<OrderData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!orderNumber) {
      setIsLoading(false)
      return
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderNumber}`)
        if (res.ok) {
          const data = await res.json()
          setOrder(data.order)
        }
      } catch {
        // Order fetch failed — show generic confirmation
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [orderNumber])

  if (!concept) return null

  const accent = concept.palette.accent
  const bg = concept.palette.bg
  const text = concept.palette.text
  const muted = concept.palette.muted
  const surface = concept.palette.surface

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)

  return (
    <ConceptLayout concept={concept}>
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-lg text-center" style={{ fontFamily: concept.fonts.body }}>
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={32} className="animate-spin" style={{ color: accent }} />
              <p className="text-sm opacity-60 tracking-wide">Loading order details...</p>
            </div>
          ) : (
            <>
              {/* Success checkmark */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ backgroundColor: `${accent}15` }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: accent }}
                >
                  <Check size={28} style={{ color: bg }} strokeWidth={3} />
                </div>
              </div>

              {/* Thank you */}
              <h1
                className="text-3xl tracking-wider mb-3"
                style={{ fontFamily: concept.fonts.heading }}
              >
                Thank You
              </h1>
              <p className="text-sm opacity-60 tracking-wide mb-8">
                Your order has been placed successfully
              </p>

              {/* Order number */}
              <div
                className="p-6 mb-8"
                style={{ backgroundColor: surface, border: `1px solid ${muted}` }}
              >
                <p className="text-xs tracking-widest uppercase opacity-50 mb-2">
                  Order Number
                </p>
                <p
                  className="text-xl tracking-wider font-medium"
                  style={{ color: accent }}
                >
                  {orderNumber || 'VM-PENDING'}
                </p>
              </div>

              {/* Order items (if fetched) */}
              {order?.items && order.items.length > 0 && (
                <div
                  className="p-6 mb-6 text-left"
                  style={{ backgroundColor: surface, border: `1px solid ${muted}` }}
                >
                  <p className="text-xs tracking-widest uppercase opacity-50 mb-4">
                    Order Summary
                  </p>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span>
                          {item.product_name}
                          {item.quantity > 1 && (
                            <span className="opacity-50"> x{item.quantity}</span>
                          )}
                        </span>
                        <span style={{ color: accent }}>
                          {formatPrice(item.unit_price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  {order.total && (
                    <div
                      className="flex justify-between items-center text-sm font-medium mt-4 pt-4"
                      style={{ borderTop: `1px solid ${muted}` }}
                    >
                      <span>Total</span>
                      <span style={{ color: accent }}>{formatPrice(order.total)}</span>
                    </div>
                  )}
                </div>
              )}

              {/* What's next */}
              <div
                className="p-6 mb-8 text-left"
                style={{ backgroundColor: surface, border: `1px solid ${muted}` }}
              >
                <p className="text-xs tracking-widest uppercase opacity-50 mb-4">
                  What Happens Next
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Package size={16} style={{ color: accent }} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Order Confirmation</p>
                      <p className="text-xs opacity-50 mt-0.5">
                        A confirmation email has been sent to your email address
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package size={16} style={{ color: accent }} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Preparation</p>
                      <p className="text-xs opacity-50 mt-0.5">
                        Your piece will be carefully inspected and prepared for shipping
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package size={16} style={{ color: accent }} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Insured Delivery</p>
                      <p className="text-xs opacity-50 mt-0.5">
                        Fully insured shipping with signature confirmation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/${concept.id}/account`}
                  className="flex-1 py-3.5 text-xs tracking-widest uppercase font-medium
                    flex items-center justify-center gap-2 transition-all"
                  style={{
                    backgroundColor: accent,
                    color: bg,
                  }}
                >
                  Track Your Order
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href={`/${concept.id}`}
                  className="flex-1 py-3.5 text-xs tracking-widest uppercase font-medium
                    flex items-center justify-center gap-2 transition-all"
                  style={{
                    border: `1px solid ${muted}`,
                    color: text,
                  }}
                >
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </ConceptLayout>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 size={32} className="animate-spin" style={{ color: '#C4A265' }} />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
