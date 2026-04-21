'use client'

import { Suspense, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getConcept } from '@/data/concepts'
import { ConceptLayout } from '@/components/shared'
import { Check, Package, ArrowRight, Loader2, ClipboardCheck, Warehouse, Ship, PackageCheck, Home } from 'lucide-react'
import { OrderConfirmationCard } from '@/components/ui/order-confirmation-card'
import { TrackingTimeline, type TimelineItem } from '@/components/ui/order-history'

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
  // Support both 'order' and 'orderId' query params for compatibility
  const orderNumber = searchParams.get('order') || searchParams.get('orderId')
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

  const isMinimal = concept.id === 'minimal'
  const accent = concept.palette.accent
  const bg = concept.palette.bg
  const text = concept.palette.text
  const muted = concept.palette.muted
  const surface = concept.palette.surface

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)

  const now = new Date()
  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  // TrackingTimeline items for the minimal concept
  const trackingItems: TimelineItem[] = [
    {
      id: 1,
      status: 'completed',
      title: 'Order Placed',
      date: formatDate(now),
      icon: <ClipboardCheck className="h-4 w-4 text-[#FFFFFF]" />,
    },
    {
      id: 2,
      status: 'in-progress',
      title: 'Processing & Inspection',
      date: 'In progress',
      icon: <Package className="h-4 w-4 text-[#050505]" />,
    },
    {
      id: 3,
      status: 'pending',
      title: 'Quality Assurance',
      date: 'Estimated 1-2 days',
      icon: <Warehouse className="h-4 w-4 text-[#9B9B9B]" />,
    },
    {
      id: 4,
      status: 'pending',
      title: 'Shipped',
      date: 'Estimated 3-5 days',
      icon: <Ship className="h-4 w-4 text-[#9B9B9B]" />,
    },
    {
      id: 5,
      status: 'pending',
      title: 'Out for Delivery',
      date: 'Estimated 5-7 days',
      icon: <PackageCheck className="h-4 w-4 text-[#9B9B9B]" />,
    },
    {
      id: 6,
      status: 'pending',
      title: 'Delivered',
      date: 'Estimated 7 days',
      icon: <Home className="h-4 w-4 text-[#9B9B9B]" />,
    },
  ]

  // Minimal concept uses 21st.dev components
  if (isMinimal) {
    return (
      <ConceptLayout concept={concept}>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-[#FFFFFF]">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={32} className="animate-spin" style={{ color: '#050505' }} />
              <p className="text-sm text-[#9B9B9B] tracking-wide">Loading order details...</p>
            </div>
          ) : (
            <div className="w-full max-w-lg flex flex-col items-center gap-10">
              {/* 21st.dev OrderConfirmationCard */}
              <OrderConfirmationCard
                orderId={orderNumber || 'VM-PENDING'}
                paymentMethod="Credit Card"
                dateTime={formatDate(now)}
                totalAmount={order?.total ? formatPrice(order.total) : 'Pending'}
                onGoToAccount={() => {
                  window.location.href = `/${concept.id}/account`
                }}
                title="Order Confirmed"
                buttonText="View My Account"
              />

              {/* 21st.dev TrackingTimeline */}
              <div className="w-full max-w-sm border border-[#E5E5E5] bg-[#FFFFFF] p-6">
                <h3 className="text-lg font-semibold text-[#050505] mb-6">Order Tracking</h3>
                <TrackingTimeline items={trackingItems} />
              </div>

              {/* Continue Shopping */}
              <Link
                href={`/${concept.id}`}
                className="flex items-center justify-center gap-2 py-3.5 px-8 text-xs tracking-widest uppercase font-medium border border-[#E5E5E5] text-[#050505] hover:bg-[#050505] hover:text-[#FFFFFF] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </ConceptLayout>
    )
  }

  // Non-minimal concepts use the original generic confirmation UI
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
                className="w-20 h-20 flex items-center justify-center mx-auto mb-8"
                style={{ backgroundColor: `${accent}15` }}
              >
                <div
                  className="w-14 h-14 flex items-center justify-center"
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
          <Loader2 size={32} className="animate-spin" style={{ color: '#050505' }} />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
