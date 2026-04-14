'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { A, useScrollReveal } from '../AtelierLayout'

interface ProcessStep {
  number: string
  title: string
  description: string
  duration?: string
  image?: string
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
  title?: string
  subtitle?: string
}

function StepIndicator({ step, index, isActive, isPast, onClick }: {
  step: ProcessStep; index: number; isActive: boolean; isPast: boolean; onClick: () => void
}) {
  const { ref, isVisible } = useScrollReveal(0.1)
  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        flex: 1, textAlign: 'center', cursor: 'pointer',
        position: 'relative', zIndex: 1,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: isPast || isActive ? A.accent : A.surface,
        border: `2px solid ${isPast || isActive ? A.accent : A.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 12px',
        transition: 'all 0.4s ease',
        boxShadow: isActive ? `0 0 0 4px rgba(139,105,20,0.15)` : 'none',
        transform: isActive ? 'scale(1.1)' : 'scale(1)',
      }}>
        <span style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 15, fontWeight: 600,
          color: isPast || isActive ? '#FFF' : A.textSoft,
        }}>
          {step.number}
        </span>
      </div>
      <div style={{
        fontFamily: 'Cormorant Garamond, serif', fontSize: 15, fontWeight: 500,
        color: isActive ? A.ink : A.textSoft,
        transition: 'color 0.3s',
      }}>
        {step.title}
      </div>
      {step.duration && (
        <div style={{
          fontFamily: 'Caveat, cursive', fontSize: 12, color: A.sketch, marginTop: 4,
        }}>
          {step.duration}
        </div>
      )}
    </div>
  )
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

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 32, position: 'relative' }}>
        {/* Background line */}
        <div style={{
          position: 'absolute', top: 22, left: 24, right: 24,
          height: 2, background: A.border,
        }} />
        {/* Active progress line */}
        <div style={{
          position: 'absolute', top: 22, left: 24,
          height: 2, background: A.accent,
          width: steps.length > 1 ? `${(activeStep / (steps.length - 1)) * 100}%` : '0%',
          maxWidth: 'calc(100% - 48px)',
          transition: 'width 0.6s ease',
        }} />

        {steps.map((step, i) => (
          <StepIndicator
            key={i}
            step={step}
            index={i}
            isActive={i === activeStep}
            isPast={i < activeStep}
            onClick={() => setActiveStep(i)}
          />
        ))}
      </div>

      {/* Active step detail card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          style={{
            background: A.surface,
            border: `1px dashed ${A.sketch}`,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: `inset 0 1px 2px ${A.shadow}`,
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: steps[activeStep].image ? '1fr 1fr' : '1fr',
            minHeight: 220,
          }}>
            {steps[activeStep].image && (
              <div style={{
                backgroundImage: `url(${steps[activeStep].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 220,
              }} />
            )}
            <div style={{ padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 300,
                color: `${A.accent}25`, lineHeight: 1, marginBottom: 8,
              }}>
                {steps[activeStep].number}
              </div>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 500,
                color: A.ink, margin: '0 0 12px',
              }}>
                {steps[activeStep].title}
              </h3>
              <p style={{
                fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft,
                lineHeight: 1.7, margin: 0,
              }}>
                {steps[activeStep].description}
              </p>
              {steps[activeStep].duration && (
                <div style={{
                  fontFamily: 'Caveat, cursive', fontSize: 15, color: A.gold, marginTop: 16,
                }}>
                  Typical duration: {steps[activeStep].duration}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
