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
  occasion: string
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
  { id: 'nature', label: 'Nature & Organic', desc: 'Flowing forms, botanical motifs, natural textures', image: '/images/atelier/goldsmith-crafting.jpg' },
  { id: 'geometric', label: 'Geometric & Art Deco', desc: 'Clean lines, symmetry, architectural precision', image: '/images/atelier/engraving-closeup.jpg' },
  { id: 'vintage', label: 'Vintage & Heritage', desc: 'Antique settings, filigree, old-world charm', image: '/images/atelier/hand-engraving.jpg' },
  { id: 'modern', label: 'Modern & Sculptural', desc: 'Bold forms, negative space, contemporary art', image: '/images/atelier/wax-carving.jpg' },
  { id: 'celestial', label: 'Celestial & Cosmic', desc: 'Stars, moons, cosmic geometry', image: '/images/atelier/gemstone-inspection.jpg' },
  { id: 'personal', label: 'Personal Story', desc: 'A meaningful symbol, memory, or narrative', image: '/images/atelier/jewelry-sketch.jpg' },
  { id: 'minimalist', label: 'Minimalist & Refined', desc: 'Understated elegance, subtle details', image: '/images/atelier/jeweler-ring-work.jpg' },
  { id: 'statement', label: 'Statement & Bold', desc: 'Eye-catching, dramatic, conversation pieces', image: '/images/atelier/molten-gold.jpg' },
]

const METALS = [
  { id: '18k-yellow', label: '18K Yellow Gold', color: '#D4A54A', desc: 'Warm, classic, timeless' },
  { id: '18k-rose', label: '18K Rose Gold', color: '#B76E79', desc: 'Romantic, contemporary' },
  { id: '18k-white', label: '18K White Gold', color: '#E8E4DF', desc: 'Cool, sophisticated' },
  { id: 'platinum', label: 'Platinum 950', color: '#C0C0C0', desc: 'Rare, durable, prestigious' },
  { id: 'mixed', label: 'Mixed Metals', color: '#D4A54A', desc: 'Two-tone, creative' },
]

const STONES = [
  { id: 'diamond', label: 'Diamond', desc: 'Brilliant, cushion, or emerald cut', color: '#E8E4DF' },
  { id: 'sapphire', label: 'Sapphire', desc: 'Blue, pink, or padparadscha', color: '#2B4C8C' },
  { id: 'emerald', label: 'Emerald', desc: 'Colombian or Zambian origin', color: '#2D6A4F' },
  { id: 'ruby', label: 'Ruby', desc: 'Burmese pigeon blood', color: '#9B2335' },
  { id: 'none', label: 'No Stone', desc: 'Metal-only design', color: '#B8ADA0' },
  { id: 'other', label: 'Other / Custom', desc: 'Tell us what you envision', color: '#8B6914' },
]

const ARTISANS = [
  { name: 'Elena Marchetti', specialty: 'Stone Setting & Pavé', years: 22, match: 'Best for intricate stone work', image: '/images/atelier/female-jeweler.jpg' },
  { name: 'Thomas Ashworth', specialty: 'Hand Engraving', years: 18, match: 'Perfect for detailed metalwork', image: '/images/atelier/artisan-portrait-1.jpg' },
  { name: 'Yuki Tanaka', specialty: 'Sculptural Forms', years: 15, match: 'Ideal for modern, bold designs', image: '/images/atelier/artisan-portrait-2.jpg' },
]

/* ─── Main Component ─── */
export function CommissionWizard() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [state, setState] = useState<WizardState>({
    inspiration: '', style: '', metal: '', stone: '', budget: '',
    name: '', email: '', notes: '', timeline: '', occasion: '',
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
    if (step < 5) { setDirection(1); setStep(step + 1) }
    else setSubmitted(true)
  }
  const prev = () => { if (step > 0) { setDirection(-1); setStep(step - 1) } }

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      {/* Progress Bar */}
      <div style={{
        display: 'flex', gap: 0, marginBottom: 48,
        background: A.surface,
        border: `1px dashed ${A.sketch}`,
        borderRadius: 2,
        padding: '20px 24px',
        boxShadow: `inset 0 1px 2px ${A.shadow}`,
      }}>
        {STEPS.map((s, i) => (
          <div
            key={i}
            style={{ flex: 1, cursor: i < step ? 'pointer' : 'default', position: 'relative' }}
            onClick={() => { if (i < step) { setDirection(-1); setStep(i) } }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: i <= step ? A.accent : 'transparent',
                border: `2px solid ${i <= step ? A.accent : A.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.4s',
                flexShrink: 0,
              }}>
                {i < step ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                ) : (
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 700,
                    color: i === step ? '#FFF' : A.textSoft,
                  }}>
                    {s.num}
                  </span>
                )}
              </div>
              <div className="atelier-wizard-step-title" style={{ display: 'none' }}>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
                  color: i === step ? A.accent : A.textSoft,
                  letterSpacing: '0.04em',
                  transition: 'color 0.3s',
                }}>
                  {s.title}
                </div>
              </div>
            </div>
            {/* Progress line */}
            <div style={{
              height: 3, borderRadius: 2,
              background: i < step ? A.accent : i === step ? `linear-gradient(90deg, ${A.accent}, ${A.border})` : A.border,
              transition: 'background 0.4s',
            }} />
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={submitted ? 'done' : step}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {submitted ? (
            <ConfirmationStep state={state} />
          ) : (
            <>
              {step === 0 && <InspirationStep state={state} update={update} />}
              {step === 1 && <MaterialsStep state={state} update={update} />}
              {step === 2 && <BriefStep state={state} update={update} />}
              {step === 3 && <ReviewStep state={state} />}
              {step === 4 && <ArtisanMatchStep />}
              {step === 5 && <FinalStep />}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {!submitted && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 24,
          borderTop: `1px solid ${A.border}`,
        }}>
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

/* ─── Step 1: Inspiration (Image Grid) ─── */
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
          Every bespoke piece begins with a spark. Choose the aesthetic direction that resonates with your vision — select one or more moods that speak to you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
        {INSPIRATIONS.map(ins => (
          <motion.div
            key={ins.id}
            onClick={() => update('inspiration', ins.id)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            style={{
              cursor: 'pointer',
              background: A.surface,
              border: `1.5px ${state.inspiration === ins.id ? 'solid' : 'dashed'} ${state.inspiration === ins.id ? A.accent : A.sketch}`,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: state.inspiration === ins.id ? `0 8px 24px ${A.shadowMd}` : `inset 0 1px 2px ${A.shadow}`,
              transition: 'all 0.3s',
            }}
          >
            {/* Image */}
            <div style={{
              height: 130, overflow: 'hidden',
              backgroundImage: `url(${ins.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}>
              {state.inspiration === ins.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    position: 'absolute', top: 8, right: 8,
                    width: 28, height: 28, borderRadius: '50%',
                    background: A.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                </motion.div>
              )}
            </div>
            <div style={{ padding: '14px 14px 16px' }}>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 500,
                color: A.ink, marginBottom: 4,
              }}>
                {ins.label}
              </div>
              <div style={{
                fontFamily: 'Source Serif 4, serif', fontSize: 12, color: A.textSoft, lineHeight: 1.5,
              }}>
                {ins.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Step 2: Materials (Visual Swatches) ─── */
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

      {/* Metals — Large visual swatches */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 16 }}>
          Metal
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14 }}>
          {METALS.map(m => (
            <motion.div
              key={m.id}
              onClick={() => update('metal', m.id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              style={{
                cursor: 'pointer',
                background: A.surface,
                border: `1.5px ${state.metal === m.id ? 'solid' : 'dashed'} ${state.metal === m.id ? A.accent : A.sketch}`,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: state.metal === m.id ? `0 8px 24px ${A.shadowMd}` : `inset 0 1px 2px ${A.shadow}`,
                transition: 'all 0.3s',
                textAlign: 'center',
                padding: '20px 12px',
              }}
            >
              {/* Large swatch circle */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: m.color,
                margin: '0 auto 14px',
                border: `3px solid ${state.metal === m.id ? A.accent : 'rgba(255,255,255,0.5)'}`,
                boxShadow: `inset 0 2px 8px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)`,
                transition: 'border-color 0.3s',
              }} />
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: 15, fontWeight: 500, color: A.ink, marginBottom: 2,
              }}>
                {m.label}
              </div>
              <div style={{
                fontFamily: 'Source Serif 4, serif', fontSize: 11, color: A.textSoft,
              }}>
                {m.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stones — Color-coded cards */}
      <div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 16 }}>
          Primary Stone
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14 }}>
          {STONES.map(s => (
            <motion.div
              key={s.id}
              onClick={() => update('stone', s.id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              style={{
                cursor: 'pointer',
                background: A.surface,
                border: `1.5px ${state.stone === s.id ? 'solid' : 'dashed'} ${state.stone === s.id ? A.accent : A.sketch}`,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: state.stone === s.id ? `0 8px 24px ${A.shadowMd}` : `inset 0 1px 2px ${A.shadow}`,
                transition: 'all 0.3s',
                textAlign: 'center',
                padding: '20px 12px',
              }}
            >
              {/* Stone color indicator */}
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, ${s.color}CC, ${s.color})`,
                margin: '0 auto 12px',
                boxShadow: `0 4px 12px ${s.color}40`,
              }} />
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 500, color: A.ink, marginBottom: 2 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: 'Source Serif 4, serif', fontSize: 11, color: A.textSoft }}>
                {s.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Step 3: Brief (Rich Form) ─── */
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
          Share the details that will help our artisans understand your vision perfectly. The more you share, the closer we can get to your dream piece.
        </p>
      </div>

      <div style={{
        background: A.surface,
        border: `1px dashed ${A.sketch}`,
        borderRadius: 2,
        padding: 32,
        boxShadow: `inset 0 1px 2px ${A.shadow}`,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <AtelierInput label="Your Name" placeholder="Full name" required value={state.name} onChange={e => update('name', e.target.value)} />
          <AtelierInput label="Email" placeholder="your@email.com" type="email" required value={state.email} onChange={e => update('email', e.target.value)} />
        </div>

        {/* Occasion dropdown */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 12 }}>
            Occasion
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Engagement', 'Wedding', 'Anniversary', 'Birthday', 'Self-Purchase', 'Other'].map(o => (
              <motion.div
                key={o}
                onClick={() => update('occasion', o)}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '10px 18px', cursor: 'pointer',
                  background: state.occasion === o ? 'rgba(139,105,20,0.08)' : 'transparent',
                  border: `1px ${state.occasion === o ? 'solid' : 'dashed'} ${state.occasion === o ? A.accent : A.sketch}`,
                  borderRadius: 2, transition: 'all 0.3s',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: state.occasion === o ? A.accent : A.textSoft,
                }}
              >
                {o}
              </motion.div>
            ))}
          </div>
        </div>

        <AtelierInput label="Design Notes" placeholder="Describe your vision — the story, the feeling, any specific details you'd like us to know..." multiline rows={5} value={state.notes} onChange={e => update('notes', e.target.value)} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 12 }}>
              Budget Range
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['£2k–5k', '£5k–10k', '£10k–25k', '£25k–50k', '£50k+'].map(b => (
                <motion.div
                  key={b}
                  onClick={() => update('budget', b)}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '8px 16px', cursor: 'pointer',
                    background: state.budget === b ? 'rgba(139,105,20,0.08)' : 'transparent',
                    border: `1px ${state.budget === b ? 'solid' : 'dashed'} ${state.budget === b ? A.accent : A.sketch}`,
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
              {['4–6 weeks', '8–12 weeks', '3–6 months', 'No rush'].map(t => (
                <motion.div
                  key={t}
                  onClick={() => update('timeline', t)}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '8px 16px', cursor: 'pointer',
                    background: state.timeline === t ? 'rgba(139,105,20,0.08)' : 'transparent',
                    border: `1px ${state.timeline === t ? 'solid' : 'dashed'} ${state.timeline === t ? A.accent : A.sketch}`,
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
    </div>
  )
}

/* ─── Step 4: Review (Beautiful Summary) ─── */
function ReviewStep({ state }: { state: WizardState }) {
  const insLabel = INSPIRATIONS.find(i => i.id === state.inspiration)?.label || '—'
  const insImage = INSPIRATIONS.find(i => i.id === state.inspiration)?.image
  const metalLabel = METALS.find(m => m.id === state.metal)?.label || '—'
  const metalColor = METALS.find(m => m.id === state.metal)?.color || A.border
  const stoneLabel = STONES.find(s => s.id === state.stone)?.label || '—'
  const stoneColor = STONES.find(s => s.id === state.stone)?.color || A.border

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

      <div style={{
        background: A.surface,
        border: `1px dashed ${A.sketch}`,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: `inset 0 1px 2px ${A.shadow}`,
      }}>
        {/* Visual header with inspiration image */}
        {insImage && (
          <div style={{
            height: 160,
            backgroundImage: `linear-gradient(to bottom, transparent 50%, ${A.surface}), url(${insImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        )}

        <div style={{ padding: 32 }}>
          {/* Key selections with visual indicators */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 8 }}>Inspiration</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: A.ink }}>{insLabel}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 8 }}>Metal</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: metalColor, border: `1px solid ${A.border}` }} />
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: A.ink }}>{metalLabel}</span>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 8 }}>Stone</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: stoneColor, border: `1px solid ${A.border}` }} />
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: A.ink }}>{stoneLabel}</span>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${A.border}, transparent)`, margin: '20px 0' }} />

          {/* Detail rows */}
          {[
            { label: 'Occasion', value: state.occasion || '—' },
            { label: 'Budget', value: state.budget || '—' },
            { label: 'Timeline', value: state.timeline || '—' },
            { label: 'Name', value: state.name },
            { label: 'Email', value: state.email },
          ].map((r, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0',
              borderBottom: `1px solid ${A.border}20`,
            }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: A.textSoft }}>{r.label}</span>
              <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.ink }}>{r.value}</span>
            </div>
          ))}

          {state.notes && (
            <div style={{ marginTop: 20, paddingTop: 16 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.textSoft, marginBottom: 8 }}>Design Notes</div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.ink, lineHeight: 1.7, fontStyle: 'italic', background: `${A.bgAlt}80`, padding: 16, borderRadius: 2, border: `1px dashed ${A.sketch}` }}>
                &ldquo;{state.notes}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Step 5: Artisan Match (with portraits) ─── */
function ArtisanMatchStep() {
  const [selected, setSelected] = useState(0)
  const [matched, setMatched] = useState(false)

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
          Based on your brief, we&apos;ve matched you with our most suited master craftspeople. Select the artisan who resonates with your vision.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
        {ARTISANS.map((art, i) => (
          <motion.div
            key={i}
            onClick={() => { setSelected(i); setMatched(true) }}
            whileHover={{ y: -6 }}
            style={{
              cursor: 'pointer',
              background: A.surface,
              border: `1.5px ${selected === i && matched ? 'solid' : 'dashed'} ${selected === i && matched ? A.accent : A.sketch}`,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: selected === i && matched ? `0 12px 32px ${A.shadowMd}` : `inset 0 1px 2px ${A.shadow}`,
              transition: 'all 0.3s',
            }}
          >
            {/* Portrait */}
            <div style={{
              height: 200,
              backgroundImage: `url(${art.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              position: 'relative',
            }}>
              {selected === i && matched && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    position: 'absolute', top: 12, right: 12,
                    padding: '6px 14px',
                    background: A.accent,
                    color: '#FFF',
                    fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    borderRadius: 1,
                  }}
                >
                  ✦ Matched
                </motion.div>
              )}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(44,38,32,0.6))',
                padding: '24px 16px 12px',
              }}>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.gold, fontWeight: 600, letterSpacing: '0.06em' }}>
                  {art.years} years of mastery
                </div>
              </div>
            </div>

            <div style={{ padding: '18px 18px 22px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, marginBottom: 4 }}>
                {art.name}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.accent, marginBottom: 8 }}>
                {art.specialty}
              </div>
              <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${A.border}, transparent)`, margin: '8px 0 12px' }} />
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 15, color: A.gold }}>
                {art.match}
              </div>
            </div>
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

      {/* Sketch illustration placeholder */}
      <div style={{
        width: 120, height: 120, borderRadius: '50%',
        border: `2px dashed ${A.sketch}`,
        margin: '0 auto 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${A.bgAlt}80`,
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={A.accent} strokeWidth="1">
          <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5Z"/>
        </svg>
      </div>

      <div style={{
        background: A.surface, border: `1px dashed ${A.sketch}`, borderRadius: 2,
        padding: 40, maxWidth: 520, margin: '0 auto',
        boxShadow: `inset 0 1px 2px ${A.shadow}`,
      }}>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 24, color: A.accent, marginBottom: 20 }}>
          What happens next?
        </div>
        {[
          { step: '1', text: 'Your artisan reviews the brief and prepares initial sketches' },
          { step: '2', text: 'A video consultation to refine the design together' },
          { step: '3', text: 'Wax model creation for your approval' },
          { step: '4', text: 'Final crafting with progress updates at each stage' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, alignItems: 'flex-start',
            padding: '14px 0',
            borderBottom: i < 3 ? `1px dashed ${A.sketch}` : 'none',
            textAlign: 'left',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: `${A.accent}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, fontWeight: 600, color: A.accent }}>
                {item.step}
              </span>
            </div>
            <span style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.ink, lineHeight: 1.6 }}>
              {item.text}
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
          width: 88, height: 88, borderRadius: '50%',
          background: `${A.accent}15`,
          border: `2px solid ${A.accent}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={A.accent} strokeWidth="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </motion.div>

      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: A.ink, margin: '0 0 12px' }}>
        Commission Submitted
      </h2>
      <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 16, color: A.textSoft, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px' }}>
        Thank you, {state.name}. Your bespoke commission has been received. Your artisan will contact you at {state.email} within 48 hours to begin the design conversation.
      </p>

      <div style={{
        fontFamily: 'Caveat, cursive', fontSize: 20, color: A.gold,
        padding: '18px 36px',
        border: `1px dashed ${A.sketch}`,
        display: 'inline-block', borderRadius: 2,
        background: A.surface,
        boxShadow: `inset 0 1px 2px ${A.shadow}`,
      }}>
        Commission Reference: VM-{Date.now().toString(36).toUpperCase().slice(-6)}
      </div>
    </div>
  )
}
