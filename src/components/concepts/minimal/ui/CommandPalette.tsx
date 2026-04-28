'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '@/data/products'

// Navigation pages for the command palette
const pages = [
  { name: 'Home', path: '/minimal', shortcut: 'G H' },
  { name: 'Collections', path: '/minimal/collections', shortcut: 'G C' },
  { name: 'About', path: '/minimal/about', shortcut: 'G A' },
  { name: 'Craftsmanship', path: '/minimal/craftsmanship', shortcut: '' },
  { name: 'Sustainability', path: '/minimal/sustainability', shortcut: '' },
  { name: 'Bespoke', path: '/minimal/bespoke', shortcut: '' },
  { name: 'Journal', path: '/minimal/journal', shortcut: '' },
  { name: 'Contact', path: '/minimal/contact', shortcut: '' },
  { name: 'FAQ', path: '/minimal/faq', shortcut: '' },
  { name: 'Size Guide', path: '/minimal/sizing', shortcut: '' },
  { name: 'Appointments', path: '/minimal/appointments', shortcut: '' },
  { name: 'Grading', path: '/minimal/grading', shortcut: '' },
  { name: 'Care Guide', path: '/minimal/care', shortcut: '' },
  { name: 'Authenticity', path: '/minimal/authenticity', shortcut: '' },
  { name: 'Shipping & Returns', path: '/minimal/shipping', shortcut: '' },
  { name: 'Privacy Policy', path: '/minimal/privacy', shortcut: '' },
]

const actions = [
  { name: 'View Cart', path: '/minimal/cart', shortcut: 'G S', icon: 'cart' },
  { name: 'View Wishlist', path: '/minimal/wishlist', shortcut: '', icon: 'heart' },
  { name: 'Book Appointment', path: '/minimal/appointments', shortcut: '', icon: 'calendar' },
  { name: 'Contact Us', path: '/minimal/contact', shortcut: '', icon: 'mail' },
]

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setSearch('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const handleSelect = useCallback((path: string) => {
    onOpenChange(false)
    router.push(path)
  }, [router, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[10000] flex items-start justify-center pt-[20vh]"
          >
            <Command
              className="w-full max-w-[640px] bg-[#0A0A0A] border border-white/10 overflow-hidden"
              loop
              shouldFilter={true}
            >
              {/* Input */}
              <div className="flex items-center border-b border-white/10 px-6">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white/40 mr-3 flex-shrink-0"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <Command.Input
                  ref={inputRef}
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search or jump to..."
                  className="w-full h-14 bg-transparent text-white text-[16px] placeholder:text-white/30 outline-none border-none"
                />
                <kbd className="hidden sm:flex items-center gap-1 text-[11px] text-white/30 bg-white/5 px-2 py-1 ml-3 flex-shrink-0">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <Command.List className="max-h-[360px] overflow-y-auto p-2 transition-[height] duration-100 ease-out">
                <Command.Empty className="py-8 text-center text-white/30 text-sm">
                  No results found.
                </Command.Empty>

                {/* Pages */}
                <Command.Group heading="Pages" className="mb-2">
                  {pages.map((page) => (
                    <Command.Item
                      key={page.path}
                      value={page.name}
                      onSelect={() => handleSelect(page.path)}
                      className="flex items-center justify-between px-4 py-3 text-white/60 text-sm cursor-pointer data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                          <polyline points="13 2 13 9 20 9" />
                        </svg>
                        <span>{page.name}</span>
                      </div>
                      {page.shortcut && (
                        <div className="flex items-center gap-1">
                          {page.shortcut.split(' ').map((key, i) => (
                            <kbd key={i} className="text-[10px] text-white/25 bg-white/5 px-1.5 py-0.5 min-w-[20px] text-center">
                              {key}
                            </kbd>
                          ))}
                        </div>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Products */}
                <Command.Group heading="Products" className="mb-2">
                  {products.slice(0, 8).map((product) => (
                    <Command.Item
                      key={product.slug}
                      value={`${product.name} ${product.category} ${product.material}`}
                      onSelect={() => handleSelect(`/minimal/product/${product.slug}`)}
                      className="flex items-center justify-between px-4 py-3 text-white/60 text-sm cursor-pointer data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                          <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                        <div>
                          <span>{product.name}</span>
                          <span className="ml-2 text-white/25">{product.priceDisplay}</span>
                        </div>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Actions */}
                <Command.Group heading="Actions" className="mb-2">
                  {actions.map((action) => (
                    <Command.Item
                      key={action.path + action.name}
                      value={action.name}
                      onSelect={() => handleSelect(action.path)}
                      className="flex items-center justify-between px-4 py-3 text-white/60 text-sm cursor-pointer data-[selected=true]:bg-white/5 data-[selected=true]:text-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ActionIcon type={action.icon} />
                        <span>{action.name}</span>
                      </div>
                      {action.shortcut && (
                        <div className="flex items-center gap-1">
                          {action.shortcut.split(' ').map((key, i) => (
                            <kbd key={i} className="text-[10px] text-white/25 bg-white/5 px-1.5 py-0.5 min-w-[20px] text-center">
                              {key}
                            </kbd>
                          ))}
                        </div>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 text-[11px] text-white/25">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white/5 px-1 py-0.5">↑↓</kbd> navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white/5 px-1 py-0.5">↵</kbd> select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white/5 px-1 py-0.5">esc</kbd> close
                  </span>
                </div>
                <span>⌘K to search</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ActionIcon({ type }: { type: string }) {
  switch (type) {
    case 'cart':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    case 'heart':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    case 'calendar':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    case 'mail':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    default:
      return null
  }
}

export default CommandPalette
