'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Video } from 'lucide-react'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader, CTABanner } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

const appointmentTypes = [
  { id: 'showroom', icon: MapPin, title: 'Showroom Visit', desc: 'Visit our London showroom for a private viewing. By appointment only.', duration: '60 min' },
  { id: 'virtual', icon: Video, title: 'Virtual Consultation', desc: 'Connect with a specialist via video call from anywhere in the world.', duration: '45 min' },
  { id: 'bespoke', icon: Calendar, title: 'Bespoke Design Session', desc: 'Begin your custom creation journey with our master designers.', duration: '90 min' },
]

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

export default function AppointmentsPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!concept) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <ConceptLayout concept={concept}>
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <Calendar size={48} strokeWidth={0.5} className="mx-auto mb-6" style={{ color: concept.palette.accent }} />
            <h2 className={`text-2xl font-light mb-4 ${concept.fonts.headingClass}`}>Appointment Confirmed</h2>
            <p className="text-sm font-light opacity-60 mb-8">
              Thank you, {name}. We&apos;ve reserved your {appointmentTypes.find(t => t.id === selectedType)?.title.toLowerCase()} on {selectedDate} at {selectedTime}. A confirmation has been sent to {email}.
            </p>
            <a
              href={buildConceptUrl(concept.id)}
              className="inline-block px-8 py-3 text-[10px] uppercase tracking-[0.2em]"
              style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
            >
              Continue Browsing
            </a>
          </motion.div>
        </div>
      </ConceptLayout>
    )
  }

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Book an Appointment"
        subtitle="Schedule a private consultation with our jewelry specialists."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Appointments', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-12 pb-16 lg:pb-24">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Appointment Type */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] mb-4 opacity-60">Select Appointment Type</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {appointmentTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className="p-6 text-left transition-all"
                  style={{
                    border: `1px solid ${selectedType === type.id ? concept.palette.accent : concept.palette.muted}`,
                    backgroundColor: selectedType === type.id ? concept.palette.surface : 'transparent',
                  }}
                >
                  <type.icon size={20} strokeWidth={1} className="mb-3" style={{ color: concept.palette.accent }} />
                  <h3 className="text-xs uppercase tracking-[0.1em] mb-1">{type.title}</h3>
                  <p className="text-[10px] font-light opacity-50 leading-relaxed mb-2">{type.desc}</p>
                  <div className="flex items-center gap-1 opacity-40">
                    <Clock size={10} />
                    <span className="text-[10px]">{type.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] mb-2 block opacity-60">Preferred Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full py-3 text-sm font-light bg-transparent outline-none"
                style={{ borderBottom: `1px solid ${concept.palette.muted}`, color: concept.palette.text }}
                required
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] mb-2 block opacity-60">Preferred Time</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className="px-3 py-1.5 text-[10px] tracking-[0.1em] transition-all"
                    style={{
                      border: `1px solid ${selectedTime === slot ? concept.palette.accent : concept.palette.muted}`,
                      color: selectedTime === slot ? concept.palette.accent : concept.palette.text,
                      opacity: selectedTime === slot ? 1 : 0.6,
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">Your Details</p>
            {[
              { label: 'Full Name', value: name, setter: setName, type: 'text' },
              { label: 'Email', value: email, setter: setEmail, type: 'email' },
              { label: 'Phone', value: phone, setter: setPhone, type: 'tel' },
            ].map((field) => (
              <input
                key={field.label}
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.label}
                className="w-full py-3 text-sm font-light bg-transparent outline-none"
                style={{ borderBottom: `1px solid ${concept.palette.muted}`, color: concept.palette.text }}
                required
              />
            ))}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific pieces or topics you'd like to discuss? (Optional)"
              rows={3}
              className="w-full py-3 text-sm font-light bg-transparent outline-none resize-none"
              style={{ borderBottom: `1px solid ${concept.palette.muted}`, color: concept.palette.text }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
            style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </ConceptLayout>
  )
}
