'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { A } from '../AtelierLayout'

interface ProcessStep {
  number: string
  title: string
  description: string
  duration?: string
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
  title?: string
  subtitle?: string
}

export function ProcessTimeline({ steps, title, subtitle }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div>
      {title && (
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: A.accent, marginBottom: 12,
          }}>
            {subtitle || 'The Making Process'}
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400,
            color: A.ink, margin: 0,
          }}>
            {title}
          </h2>
        </div>
      )}

      <div style={{ display: 'flex', gap: 0, position: 'relative' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute', top: 24, left: 24, right: 24,
          height: 1, background: A.border,
        }}>
          <motion.div
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ height: '100%', background: A.accent }}
          />
        </div>

        {steps.map((step, i) => (
          <div
            key={i}
            onClick={() => setActiveStep(i)}
            style={{
              flex: 1, textAlign: 'center', cursor: 'pointer',
              position: 'relative', zIndex: 1,
            }}
          >
            {/* Circle */}
            <motion.div
              animate={{
                background: i <= activeStep ? A.accent : A.surface,
                borderColor: i <= activeStep ? A.accent : A.border,
                scale: i === activeStep ? 1.15 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: 48, height: 48, borderRadius: '50%',
                border: '2px solid',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 600,
                color: i <= activeStep ? '#FFF' : A.textSoft,
              }}
            >
              {step.number}
            </motion.div>

            {/* Title */}
            <div style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 500,
              color: i === activeStep ? A.ink : A.textSoft,
              marginBottom: 4, transition: 'color 0.3s',
            }}>
              {step.title}
            </div>

            {/* Description (only for active) */}
            <motion.div
              animate={{ opacity: i === activeStep ? 1 : 0, height: i === activeStep ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <p style={{
                fontFamily: 'Source Serif 4, serif', fontSize: 13, color: A.textSoft,
                lineHeight: 1.6, maxWidth: 200, margin: '8px auto 0',
              }}>
                {step.description}
              </p>
              {step.duration && (
                <span style={{
                  fontFamily: 'Caveat, cursive', fontSize: 13, color: A.accent,
                  display: 'inline-block', marginTop: 4,
                }}>
                  ~ {step.duration}
                </span>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
