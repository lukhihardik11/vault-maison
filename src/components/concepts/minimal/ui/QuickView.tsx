'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'

interface QuickViewProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function QuickView({ isOpen, onClose, children }: QuickViewProps) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5, 5, 5, 0.4)',
              zIndex: 999,
            }}
          />
          <motion.div
            initial={shouldReduceMotion ? { y: 0 } : { y: 20, opacity: 1 }}
            animate={shouldReduceMotion ? { y: 0 } : { y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { y: 0 } : { y: 20, opacity: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 900,
              maxHeight: '90vh',
              backgroundColor: '#FFFFFF',
              zIndex: 1000,
              overflowY: 'auto',
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                zIndex: 10,
                color: '#050505',
                padding: 8,
              }}
            >
              <X size={24} strokeWidth={1.5} />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
