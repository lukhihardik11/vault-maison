'use client'
import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { A } from '../AtelierLayout'
import { AtelierButton } from './AtelierButton'
import { AtelierInput } from './AtelierInput'

/* ─── Types ─── */
interface WizardState {
  inspiration: string
  style: string
  metal: string
  stone: string
  budget: string
  name: string
  email: string
  notes: string
  timeline: string
}

const STEPS = [
  { num: '01', title: 'Inspiration', subtitle: 'What moves you' },
  { num: '02', title: 'Materials', subtitle: 'Choose your palette' },
  { num: '03', title: 'Design Brief', subtitle: 'Tell us your vision' },
  { num: '04', title: 'Review', subtitle: 'Confirm your brief' },
  { num: '05', title: 'Artisan Match', subtitle: 'Meet your maker' },
  { num: '06', title: 'Confirmation', subtitle: 'Your journey begins' },
]

const INSPIRATIONS = [
  { id: 'nature', label: 'Nature & Organic', desc: 'Flowing forms, botanical motifs, natural textures', icon: '🌿' },
  { id: 'geometric', label: 'Geometric & Art Deco', desc: 'Clean lines, symmetry, architectural precision', icon: '◇' },
  { id: 'vintage', label: 'Vintage & Heritage', desc: 'Antique settings, filigree, old-world charm', icon: '✦' },
  { id: 'modern', label: 'Modern & Sculptural', desc: 'Bold forms, negative space, contemporary art', icon: '○' },
  { id: 'celestial', label: 'Celestial & Cosmic', desc: 'Stars, moons, cosmic geometry', icon: '☆' },
  { id: 'personal', label: 'Personal Story', desc: 'A meaningful symbol, memory, or narrative', icon: '♡' },
]

const METALS = [
  { id: '18k-yellow', label: '18K Yellow Gold', color: '#D4A54A' },
  { id: '18k-rose', label: '18K Rose Gold', color: '#B76E79' },
  { id: '18k-white', label: '18K White Gold', color: '#E8E4DF' },
  { id: 'platinum', label: 'Platinum 950', color: '#C0C0C0' },
  { id: 'mixed', label: 'Mixed Metals', color: 'linear-gradient(135deg, #D4A54A, #C0C0C0)' },
]

const STONES = [
  { id: 'diamond', label: 'Diamond', desc: 'Brilliant, cushion, or emerald cut' },
  { id: 'sapphire', label: 'Sapphire', desc: 'Blue, pink, or padparadscha' },
  { id: 'emerald', label: 'Emerald', desc: 'Colombian or Zambian origin' },
  { id: 'ruby', label: 'Ruby', desc: 'Burmese pigeon blood' },
  { id: 'none', label: 'No Stone', desc: 'Metal-only design' },
  { id: 'other', label: 'Other / Custom', desc: 'Tell us what you envision' },
]

const ARTISANS = [
  { name: 'Elena Marchetti', specialty: 'Stone Setting & Pavé', years: 22, match: 'Best for intricate stone work' },
  { name: 'Thomas Ashworth', specialty: 'Hand Engraving', years: 18, match: 'Perfect for detailed metalwork' },
  { name: 'Yuki Tanaka', specialty: 'Sculptural Forms', years: 15, match: 'Ideal for modern, bold designs' },
]

/* ─── Main Component ─── */
export function CommissionWizard() {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<WizardState>({
    inspiration: '', style: '', metal: '', stone: '', budget: '',
    name: '', email: '', notes: '', timeline: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = useCallback((key: keyof WizardState, value: string) => {
    setState(prev => ({ ...prev, [key]: value }))
  }, [])

  const canNext = () => {
    switch (step) {
      case 0: return !!state.inspiration
      case 1: return !!state.metal
      case 2: return !!state.name && !!state.email
      case 3: return true
      case 4: return true
      case 5: return true
      default: return false
    }
  }

  const next = () => {
    if (step < 5) setStep(step + 1)
    else setSubmitted(true)
  }
  const prev = () => { if (step > 0) setStep(step - 1) }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Progress */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 48 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ flex: 1, cursor: i < step ? 'pointer' : 'default' }} onClick={() => { if (i < step) setStep(i) }}>
            <div style={{
              height: 3, borderRadius: 1,
              background: i <= step ? A.accent : A.border,
              transition: 'background 0.4s',
              marginBottom: 8,
            }} />
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: i === step ? A.accent : A.textSoft,
              transition: 'color 0.3s',
            }}>
              {s.num}
            </div>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 14, fontWeight: 500,
              color: i === step ? A.ink : A.sketch,
              transition: 'color 0.3s',
              display: 'none',
            }}
            className="atelier-wizard-step-title"
            >
              {s.title}
            </div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={submitted ? 'done' : step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {submitted ? (
            <ConfirmationStep state={state} />
          ) : (
            <>
              {step === 0 && <InspirationStep state={state} update={update} />}
              {step === 1 && <MaterialsStep state={state} update={update} />}
              {step === 2 && <BriefStep state={state} update={update} />}
              {step === 3 && <ReviewStep state={state} />}
              {step === 4 && <ArtisanMatchStep state={state} />}
              {step === 5 && <FinalStep />}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {!submitted && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 24, borderTop: `1px solid ${A.border}` }}>
          <AtelierButton variant="ghost" onClick={prev} disabled={step === 0}>
            ← Previous
          </AtelierButton>
          <AtelierButton onClick={next} disabled={!canNext()}>
            {step === 5 ? 'Submit Commission' : 'Continue →'}
          </AtelierButton>
        </div>
      )}

      <style jsx global>{`
        @media (min-width: 640px) {
          .atelier-wizard-step-title { display: block !important; }
        }
      `}</style>
    </div>
  )
}

/* ─── Step 1: Inspiration ─── */
function InspirationStep({ state, update }: { state: WizardState; update: (k: keyof WizardState, v: string) => void }) {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 8 }}>
          Step 01
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0, marginBottom: 8 }}>
          What Inspires You?
        </h2>
        <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.6 }}>
          Every bespoke piece begins with a spark. Choose the aesthetic direction that resonates with your vision.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {INSPIRATIONS.map(ins => (
          <motion.div
            key={ins.id}
            onClick={() => update('inspiration', ins.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '24px 20px', cursor: 'pointer',
              background: state.inspiration === ins.id ? 'rgba(139,105,20,0.06)' : A.surface,
              border: `1.5px solid ${state.inspiration === ins.id ? A.accent : A.border}`,
              borderRadius: 2, transition: 'all 0.3s',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{ins.icon}</div>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 500,
              color: A.ink, marginBottom: 4,
            }}>
              {ins.label}
            </div>
            <div style={{
              fontFamily: 'Source Serif 4, serif', fontSize: 13, color: A.textSoft, lineHeight: 1.5,
            }}>
              {ins.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Step 2: Materials ─── */
function MaterialsStep({ state, update }: { state: WizardState; update: (k: keyof WizardState, v: string) => void }) {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 8 }}>
          Step 02
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0, marginBottom: 8 }}>
          Choose Your Materials
        </h2>
        <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.6 }}>
          The foundation of every masterwork. Select the metals and stones that will bring your vision to life.
        </p>
      </div>

      {/* Metals */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 16 }}>
          Metal
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {METALS.map(m => (
            <motion.div
              key={m.id}
              onClick={() => update('metal', m.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 20px', cursor: 'pointer',
                background: state.metal === m.id ? 'rgba(139,105,20,0.06)' : A.surface,
                border: `1.5px solid ${state.metal === m.id ? A.accent : A.border}`,
                borderRadius: 2, transition: 'all 0.3s',
              }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: m.color,
                border: `1px solid ${A.border}`,
              }} />
              <span style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500, color: A.ink,
              }}>
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stones */}
      <div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 16 }}>
          Primary Stone
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {STONES.map(s => (
            <motion.div
              key={s.id}
              onClick={() => update('stone', s.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '16px', cursor: 'pointer',
                background: state.stone === s.id ? 'rgba(139,105,20,0.06)' : A.surface,
                border: `1.5px solid ${state.stone === s.id ? A.accent : A.border}`,
                borderRadius: 2, transition: 'all 0.3s',
              }}
            >
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 500, color: A.ink, marginBottom: 2 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: 12, color: A.textSoft }}>
                {s.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Step 3: Brief ─── */
function BriefStep({ state, update }: { state: WizardState; update: (k: keyof WizardState, v: string) => void }) {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 8 }}>
          Step 03
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0, marginBottom: 8 }}>
          Your Design Brief
        </h2>
        <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.6 }}>
          Share the details that will help our artisans understand your vision perfectly.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <AtelierInput label="Your Name" placeholder="Full name" required value={state.name} onChange={e => update('name', e.target.value)} />
        <AtelierInput label="Email" placeholder="your@email.com" type="email" required value={state.email} onChange={e => update('email', e.target.value)} />
      </div>

      <AtelierInput label="Design Notes" placeholder="Describe your vision — the story, the feeling, any specific details..." multiline rows={5} value={state.notes} onChange={e => update('notes', e.target.value)} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 12 }}>
            Budget Range
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['£2k–5k', '£5k–10k', '£10k–25k', '£25k+'].map(b => (
              <motion.div
                key={b}
                onClick={() => update('budget', b)}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '8px 16px', cursor: 'pointer',
                  background: state.budget === b ? 'rgba(139,105,20,0.08)' : A.surface,
                  border: `1px solid ${state.budget === b ? A.accent : A.border}`,
                  borderRadius: 2, transition: 'all 0.3s',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: state.budget === b ? A.accent : A.textSoft,
                }}
              >
                {b}
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 12 }}>
            Timeline
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['4–6 weeks', '8–12 weeks', 'No rush'].map(t => (
              <motion.div
                key={t}
                onClick={() => update('timeline', t)}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '8px 16px', cursor: 'pointer',
                  background: state.timeline === t ? 'rgba(139,105,20,0.08)' : A.surface,
                  border: `1px solid ${state.timeline === t ? A.accent : A.border}`,
                  borderRadius: 2, transition: 'all 0.3s',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: state.timeline === t ? A.accent : A.textSoft,
                }}
              >
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Step 4: Review ─── */
function ReviewStep({ state }: { state: WizardState }) {
  const insLabel = INSPIRATIONS.find(i => i.id === state.inspiration)?.label || '—'
  const metalLabel = METALS.find(m => m.id === state.metal)?.label || '—'
  const stoneLabel = STONES.find(s => s.id === state.stone)?.label || '—'

  const rows = [
    { label: 'Inspiration', value: insLabel },
    { label: 'Metal', value: metalLabel },
    { label: 'Stone', value: stoneLabel },
    { label: 'Budget', value: state.budget || '—' },
    { label: 'Timeline', value: state.timeline || '—' },
    { label: 'Name', value: state.name },
    { label: 'Email', value: state.email },
  ]

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 8 }}>
          Step 04
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0, marginBottom: 8 }}>
          Review Your Brief
        </h2>
        <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.6 }}>
          Please review the details below. You can go back to any step to make changes.
        </p>
      </div>

      <div style={{ background: A.surface, border: `1px solid ${A.border}`, borderRadius: 2, padding: 32 }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 0',
            borderBottom: i < rows.length - 1 ? `1px solid ${A.border}` : 'none',
          }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.textSoft }}>
              {r.label}
            </span>
            <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.ink }}>
              {r.value}
            </span>
          </div>
        ))}

        {state.notes && (
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${A.border}` }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 8 }}>
              Design Notes
            </div>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.ink, lineHeight: 1.7, fontStyle: 'italic' }}>
              &ldquo;{state.notes}&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Step 5: Artisan Match ─── */
function ArtisanMatchStep({ state }: { state: WizardState }) {
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 8 }}>
          Step 05
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0, marginBottom: 8 }}>
          Meet Your Artisan
        </h2>
        <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.6 }}>
          Based on your brief, we&apos;ve matched you with our most suited master craftspeople.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {ARTISANS.map((art, i) => (
          <motion.div
            key={i}
            onClick={() => setSelected(i)}
            whileHover={{ y: -4 }}
            style={{
              padding: 24, cursor: 'pointer', textAlign: 'center',
              background: selected === i ? 'rgba(139,105,20,0.06)' : A.surface,
              border: `1.5px solid ${selected === i ? A.accent : A.border}`,
              borderRadius: 2, transition: 'all 0.3s',
            }}
          >
            {/* Avatar */}
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: A.workshop, margin: '0 auto 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: A.accent,
              border: `2px solid ${selected === i ? A.accent : A.border}`,
              transition: 'border-color 0.3s',
            }}>
              {art.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 500, color: A.ink, marginBottom: 4 }}>
              {art.name}
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.accent, marginBottom: 8 }}>
              {art.specialty}
            </div>
            <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: 13, color: A.textSoft, marginBottom: 4 }}>
              {art.years} years of mastery
            </div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: A.gold, marginTop: 8 }}>
              {art.match}
            </div>

            {selected === i && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  marginTop: 12, padding: '6px 12px',
                  background: A.accent, color: '#FFF',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  display: 'inline-block', borderRadius: 1,
                }}
              >
                Selected
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Step 6: Final ─── */
function FinalStep() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 8 }}>
          Step 06
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: 0, marginBottom: 8 }}>
          Begin Your Commission
        </h2>
        <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.6, maxWidth: 500, margin: '0 auto' }}>
          Click &ldquo;Submit Commission&rdquo; below to send your brief to our workshop. Your assigned artisan will reach out within 48 hours to begin the design conversation.
        </p>
      </div>

      <div style={{
        background: A.surface, border: `1px solid ${A.border}`, borderRadius: 2,
        padding: 40, maxWidth: 480, margin: '0 auto',
      }}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 24, color: A.accent, marginBottom: 16 }}>
          What happens next?
        </div>
        {[
          'Your artisan reviews the brief and prepares initial sketches',
          'A video consultation to refine the design together',
          'Wax model creation for your approval',
          'Final crafting with progress updates at each stage',
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            padding: '12px 0',
            borderBottom: i < 3 ? `1px solid ${A.border}` : 'none',
            textAlign: 'left',
          }}>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 600,
              color: A.accent, minWidth: 24,
            }}>
              {i + 1}.
            </span>
            <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.ink, lineHeight: 1.6 }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Confirmation (after submit) ─── */
function ConfirmationStep({ state }: { state: WizardState }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'rgba(139,105,20,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={A.accent} strokeWidth="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </motion.div>

      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: A.ink, margin: '0 0 12px' }}>
        Commission Submitted
      </h2>
      <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: A.textSoft, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px' }}>
        Thank you, {state.name}. Your bespoke commission has been received. Your artisan will contact you at {state.email} within 48 hours.
      </p>

      <div style={{
        fontFamily: 'Caveat, cursive', fontSize: 20, color: A.gold,
        padding: '16px 32px',
        border: `1px solid ${A.border}`,
        display: 'inline-block', borderRadius: 2,
        background: A.surface,
      }}>
        Commission Reference: VM-{Date.now().toString(36).toUpperCase().slice(-6)}
      </div>
    </div>
  )
}
