'use client'

import { useState } from 'react'
import { Minus, Plus, X, Ruler } from 'lucide-react'
import { type ConceptConfig } from '@/data/concepts'

// ═══════════════════════════════════════════════════════════════
// SIZE SELECTOR
// ═══════════════════════════════════════════════════════════════

interface SizeSelectorProps {
  concept: ConceptConfig
  category: string
  selectedSize: string
  onSizeChange: (size: string) => void
}

const ringSizes = ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
const braceletSizes = ['XS', 'S', 'M', 'L', 'XL']
const necklaceSizes = ['16"', '18"', '20"', '22"', '24"']
const earringSizes = ['Small', 'Medium', 'Large']

const sizeChartData: Record<string, { label: string; measurement: string }[]> = {
  ring: [
    { label: 'Size 5', measurement: '15.7mm / 49.3mm' },
    { label: 'Size 6', measurement: '16.5mm / 51.8mm' },
    { label: 'Size 7', measurement: '17.3mm / 54.4mm' },
    { label: 'Size 8', measurement: '18.1mm / 57.0mm' },
    { label: 'Size 9', measurement: '19.0mm / 59.5mm' },
    { label: 'Size 10', measurement: '19.8mm / 62.1mm' },
    { label: 'Size 11', measurement: '20.6mm / 64.6mm' },
    { label: 'Size 12', measurement: '21.4mm / 67.2mm' },
  ],
  bracelet: [
    { label: 'XS', measurement: '6.0" / 15.2cm' },
    { label: 'S', measurement: '6.5" / 16.5cm' },
    { label: 'M', measurement: '7.0" / 17.8cm' },
    { label: 'L', measurement: '7.5" / 19.0cm' },
    { label: 'XL', measurement: '8.0" / 20.3cm' },
  ],
  necklace: [
    { label: '16"', measurement: 'Choker length' },
    { label: '18"', measurement: 'Princess length' },
    { label: '20"', measurement: 'Matinee length' },
    { label: '22"', measurement: 'Opera length' },
    { label: '24"', measurement: 'Rope length' },
  ],
}

function getSizesForCategory(category: string): string[] {
  if (category.includes('ring') || category.includes('wedding')) return ringSizes
  if (category.includes('bracelet')) return braceletSizes
  if (category.includes('necklace')) return necklaceSizes
  if (category.includes('earring')) return earringSizes
  return ringSizes
}

function getSizeChartType(category: string): string {
  if (category.includes('ring') || category.includes('wedding')) return 'ring'
  if (category.includes('bracelet')) return 'bracelet'
  if (category.includes('necklace')) return 'necklace'
  return 'ring'
}

export function SizeSelector({ concept, category, selectedSize, onSizeChange }: SizeSelectorProps) {
  const [showGuide, setShowGuide] = useState(false)
  const sizes = getSizesForCategory(category)
  const chartType = getSizeChartType(category)
  const chartData = sizeChartData[chartType] || sizeChartData.ring

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] font-medium">
          Size: {selectedSize || 'Select'}
        </p>
        <button
          onClick={() => setShowGuide(true)}
          className="flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{ color: concept.palette.accent }}
        >
          <Ruler size={12} />
          Size Guide
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className="min-w-[40px] h-10 px-3 text-xs tracking-wide transition-all"
            style={{
              backgroundColor: selectedSize === size ? concept.palette.accent : 'transparent',
              color: selectedSize === size ? concept.palette.bg : concept.palette.text,
              border: `1px solid ${selectedSize === size ? concept.palette.accent : concept.palette.muted}`,
            }}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Size Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `${concept.palette.bg}cc` }}
            onClick={() => setShowGuide(false)}
          />
          <div
            className="relative z-10 w-full max-w-md p-8"
            style={{
              backgroundColor: concept.palette.surface,
              border: `1px solid ${concept.palette.muted}`,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm uppercase tracking-[0.2em] font-medium">Size Guide</h3>
              <button onClick={() => setShowGuide(false)} className="opacity-60 hover:opacity-100">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {chartData.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between py-2 text-xs"
                  style={{ borderBottom: `1px solid ${concept.palette.muted}` }}
                >
                  <span className="font-medium">{row.label}</span>
                  <span className="opacity-60">{row.measurement}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[10px] opacity-40 leading-relaxed">
              For the most accurate fit, we recommend visiting a professional jeweler
              for sizing. Complimentary resizing is available within 30 days of purchase.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// METAL SELECTOR
// ═══════════════════════════════════════════════════════════════

interface MetalSelectorProps {
  concept: ConceptConfig
  selectedMetal: string
  onMetalChange: (metal: string) => void
}

const metals = [
  { id: 'yellow-gold', label: 'Yellow Gold', color: '#D4AF37' },
  { id: 'white-gold', label: 'White Gold', color: '#E8E8E8' },
  { id: 'rose-gold', label: 'Rose Gold', color: '#B76E79' },
  { id: 'platinum', label: 'Platinum', color: '#C0C0C0' },
]

export function MetalSelector({ concept, selectedMetal, onMetalChange }: MetalSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.2em] font-medium">
        Metal: {metals.find((m) => m.id === selectedMetal)?.label || 'Select'}
      </p>
      <div className="flex gap-3">
        {metals.map((metal) => (
          <button
            key={metal.id}
            onClick={() => onMetalChange(metal.id)}
            className="flex flex-col items-center gap-2 group"
            title={metal.label}
          >
            <div
              className="w-8 h-8 rounded-full transition-all"
              style={{
                backgroundColor: metal.color,
                border: selectedMetal === metal.id
                  ? `2px solid ${concept.palette.accent}`
                  : '2px solid transparent',
                boxShadow: selectedMetal === metal.id
                  ? `0 0 0 2px ${concept.palette.bg}, 0 0 0 4px ${concept.palette.accent}`
                  : 'none',
              }}
            />
            <span
              className="text-[9px] uppercase tracking-[0.1em] transition-opacity"
              style={{ opacity: selectedMetal === metal.id ? 1 : 0.4 }}
            >
              {metal.label.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// QUANTITY SELECTOR
// ═══════════════════════════════════════════════════════════════

interface QuantitySelectorProps {
  concept: ConceptConfig
  quantity: number
  onQuantityChange: (qty: number) => void
  max?: number
}

export function QuantitySelector({ concept, quantity, onQuantityChange, max = 10 }: QuantitySelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.2em] font-medium">Quantity</p>
      <div
        className="inline-flex items-center"
        style={{ border: `1px solid ${concept.palette.muted}` }}
      >
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          className="p-3 transition-opacity disabled:opacity-20 hover:opacity-60"
          style={{ color: concept.palette.text }}
        >
          <Minus size={14} strokeWidth={1.5} />
        </button>
        <span
          className="w-12 text-center text-sm font-medium tabular-nums"
          style={{ color: concept.palette.text }}
        >
          {quantity}
        </span>
        <button
          onClick={() => onQuantityChange(Math.min(max, quantity + 1))}
          disabled={quantity >= max}
          className="p-3 transition-opacity disabled:opacity-20 hover:opacity-60"
          style={{ color: concept.palette.text }}
        >
          <Plus size={14} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
