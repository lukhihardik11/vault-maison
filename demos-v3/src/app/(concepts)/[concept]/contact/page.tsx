'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { getConcept } from '@/data/concepts'
import { ConceptLayout, PageHeader } from '@/components/shared'
import { buildConceptUrl } from '@/lib/concept-utils'

export default function ContactPage() {
  const params = useParams()
  const concept = getConcept(params.concept as string)
  if (!concept) return null

  const contactInfo = [
    { icon: MapPin, label: 'Visit Us', value: '47 Hatton Garden, London EC1N 8YS' },
    { icon: Phone, label: 'Call Us', value: '+44 (0)20 7405 1234' },
    { icon: Mail, label: 'Email Us', value: 'concierge@vaultmaison.com' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10am–6pm · By appointment' },
  ]

  return (
    <ConceptLayout concept={concept}>
      <PageHeader
        concept={concept}
        title="Contact"
        subtitle="We would love to hear from you. Reach out for inquiries, appointments, or simply to learn more."
        breadcrumbs={[
          { label: concept.name, href: buildConceptUrl(concept.id) },
          { label: 'Contact', href: '#' },
        ]}
      />
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <item.icon size={18} strokeWidth={1} style={{ color: concept.palette.accent }} className="mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium mb-1">{item.label}</h3>
                  <p className="text-sm font-light opacity-60">{item.value}</p>
                </div>
              </motion.div>
            ))}

            <div className="pt-8" style={{ borderTop: `1px solid ${concept.palette.muted}` }}>
              <h3 className={`text-lg font-light tracking-[0.05em] mb-4 ${concept.fonts.headingClass}`}>
                Private Appointments
              </h3>
              <p className="text-sm font-light opacity-60 leading-relaxed">
                For a truly personalized experience, we offer private viewings in our London showroom.
                Our gemologists will guide you through our collection, answer your questions, and help
                you find the perfect piece. Appointments are available Monday through Saturday.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className={`text-lg font-light tracking-[0.05em] mb-6 ${concept.fonts.headingClass}`}>
              Send a Message
            </h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
                  style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
                  style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
                style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
              />
              <input
                type="tel"
                placeholder="Phone Number (optional)"
                className="w-full bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
                style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
              />
              <select
                className="w-full bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none"
                style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
              >
                <option value="">Subject</option>
                <option value="general">General Inquiry</option>
                <option value="appointment">Book an Appointment</option>
                <option value="bespoke">Bespoke Commission</option>
                <option value="order">Order Inquiry</option>
                <option value="press">Press & Media</option>
              </select>
              <textarea
                placeholder="Your message..."
                rows={5}
                className="w-full bg-transparent border px-4 py-3 text-xs tracking-[0.1em] focus:outline-none resize-none"
                style={{ borderColor: concept.palette.muted, color: concept.palette.text }}
              />
              <button
                type="submit"
                className="w-full py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
                style={{ backgroundColor: concept.palette.accent, color: concept.palette.bg }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </ConceptLayout>
  )
}
