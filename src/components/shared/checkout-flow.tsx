'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lock, CreditCard, Truck, Check } from 'lucide-react'
import { type ConceptConfig } from '@/data/concepts'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/data/products'

interface CheckoutFlowProps {
  concept: ConceptConfig
}

type Step = 'information' | 'shipping' | 'payment' | 'confirmation'

export function CheckoutFlow({ concept }: CheckoutFlowProps) {
  const [step, setStep] = useState<Step>('information')
  const { items, getTotal, clearCart } = useCartStore()

  const steps: { id: Step; label: string; icon: typeof Lock }[] = [
    { id: 'information', label: 'Information', icon: Lock },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'confirmation', label: 'Confirmation', icon: Check },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === step)

  const inputStyle = {
    backgroundColor: 'transparent',
    borderColor: concept.palette.muted,
    color: concept.palette.text,
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: concept.palette.bg, color: concept.palette.text }}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 py-8 lg:py-16">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-4">
              <button
                onClick={() => i <= currentStepIndex && setStep(s.id)}
                className="flex items-center gap-2 transition-opacity"
                style={{ opacity: i <= currentStepIndex ? 1 : 0.3 }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                  style={{
                    backgroundColor: i <= currentStepIndex ? concept.palette.accent : concept.palette.muted,
                    color: i <= currentStepIndex ? concept.palette.bg : concept.palette.text,
                  }}
                >
                  {i < currentStepIndex ? <Check size={12} /> : i + 1}
                </div>
                <span className="text-[10px] uppercase tracking-[0.15em] hidden sm:inline">
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className="w-8 h-px"
                  style={{
                    backgroundColor: i < currentStepIndex ? concept.palette.accent : concept.palette.muted,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {step === 'information' && (
                <div className="space-y-6">
                  <h2 className={`text-lg font-light tracking-[0.05em] ${concept.fonts.headingClass}`}>
                    Contact Information
                  </h2>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
                    style={inputStyle}
                  />
                  <h3 className="text-xs uppercase tracking-[0.15em] font-medium pt-4">
                    Shipping Address
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="First name" className="border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                    <input placeholder="Last name" className="border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                  </div>
                  <input placeholder="Address" className="w-full border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                  <input placeholder="Apartment, suite, etc. (optional)" className="w-full border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                  <div className="grid grid-cols-3 gap-4">
                    <input placeholder="City" className="border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                    <input placeholder="State" className="border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                    <input placeholder="ZIP code" className="border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                  </div>
                  <input placeholder="Phone (optional)" className="w-full border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                  <button
                    onClick={() => setStep('shipping')}
                    className="w-full py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                    style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
                  >
                    Continue to Shipping
                  </button>
                </div>
              )}

              {step === 'shipping' && (
                <div className="space-y-6">
                  <h2 className={`text-lg font-light tracking-[0.05em] ${concept.fonts.headingClass}`}>
                    Shipping Method
                  </h2>
                  {[
                    { id: 'standard', label: 'Standard Shipping', time: '5-7 business days', price: 'Free' },
                    { id: 'express', label: 'Express Shipping', time: '2-3 business days', price: '$25' },
                    { id: 'overnight', label: 'Overnight Delivery', time: 'Next business day', price: '$50' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center justify-between p-4 border cursor-pointer transition-all hover:opacity-80"
                      style={{ borderColor: concept.palette.muted }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full border" style={{ borderColor: concept.palette.accent }} />
                        <div>
                          <p className="text-xs font-light">{method.label}</p>
                          <p className="text-[10px] opacity-40">{method.time}</p>
                        </div>
                      </div>
                      <span className="text-xs" style={{ color: concept.palette.accent }}>{method.price}</span>
                    </label>
                  ))}
                  <button
                    onClick={() => setStep('payment')}
                    className="w-full py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                    style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-6">
                  <h2 className={`text-lg font-light tracking-[0.05em] ${concept.fonts.headingClass}`}>
                    Payment
                  </h2>
                  <div className="flex items-center gap-2 text-[10px] opacity-60">
                    <Lock size={12} />
                    <span>All transactions are secure and encrypted</span>
                  </div>
                  <input placeholder="Card number" className="w-full border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                  <input placeholder="Name on card" className="w-full border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="MM / YY" className="border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                    <input placeholder="CVV" className="border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none" style={inputStyle} />
                  </div>
                  <button
                    onClick={() => {
                      setStep('confirmation')
                      clearCart()
                    }}
                    className="w-full py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                    style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
                  >
                    Place Order — {formatPrice(getTotal())}
                  </button>
                </div>
              )}

              {step === 'confirmation' && (
                <div className="text-center py-16 space-y-6">
                  <div
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                    style={{ backgroundColor: concept.palette.accent }}
                  >
                    <Check size={24} color={concept.palette.bg} />
                  </div>
                  <h2 className={`text-2xl font-light tracking-[0.05em] ${concept.fonts.headingClass}`}>
                    Order Confirmed
                  </h2>
                  <p className="text-sm font-light opacity-60 max-w-md mx-auto">
                    Thank you for your purchase. You will receive a confirmation email shortly
                    with your order details and tracking information.
                  </p>
                  <p className="text-xs opacity-40">Order #VM-{Date.now().toString(36).toUpperCase()}</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="p-6" style={{ backgroundColor: concept.palette.surface }}>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium mb-6">
                Order Summary
              </h3>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-14 h-16 flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                      <span
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center"
                        style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
                      >
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-light truncate">{item.product.name}</p>
                      <p className="text-[10px] opacity-40">{item.product.subtitle}</p>
                    </div>
                    <p className="text-xs">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-4" style={{ borderTop: `1px solid ${concept.palette.muted}` }}>
                <div className="flex justify-between text-xs opacity-60">
                  <span>Subtotal</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between text-xs opacity-60">
                  <span>Shipping</span>
                  <span>Calculated next</span>
                </div>
                <div className="flex justify-between text-sm font-light pt-2" style={{ borderTop: `1px solid ${concept.palette.muted}` }}>
                  <span>Total</span>
                  <span style={{ color: concept.palette.accent }}>{formatPrice(getTotal())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
