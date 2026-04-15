'use client'

import React, { useState, useId } from 'react'
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

interface SalonAppointmentPickerProps {
  onSelect?: (date: string, time: string) => void
}

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function SalonAppointmentPicker({ onSelect }: SalonAppointmentPickerProps) {
  const uid = useId().replace(/:/g, '')
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1) }
    else setMonth(month - 1)
    setSelectedDate(null)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1) }
    else setMonth(month + 1)
    setSelectedDate(null)
  }

  const isPast = (day: number) => {
    const d = new Date(year, month, day)
    const t = new Date(); t.setHours(0, 0, 0, 0)
    return d < t
  }

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onSelect?.(`${monthNames[month]} ${selectedDate}, ${year}`, selectedTime)
    }
  }

  return (
    <>
      <style>{`
        .sap-${uid} {
          background: white;
          border: 1px solid #E8E0D4;
          border-radius: 16px;
          padding: 28px;
          max-width: 380px;
          font-family: Inter, sans-serif;
        }
        .sap-${uid} .sap-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .sap-${uid} .sap-month {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: #2D2A26;
        }
        .sap-${uid} .sap-nav {
          background: none;
          border: 1px solid #E8E0D4;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #8B6914;
          transition: all 0.2s;
          padding: 0;
        }
        .sap-${uid} .sap-nav:hover {
          background: #FDF6E9;
          border-color: #8B6914;
        }
        .sap-${uid} .sap-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          text-align: center;
        }
        .sap-${uid} .sap-dayname {
          font-size: 0.6rem;
          font-weight: 500;
          color: #B8B0A4;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 4px 0;
        }
        .sap-${uid} .sap-day {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: #2D2A26;
          cursor: pointer;
          border: none;
          background: none;
          transition: all 0.2s;
          margin: 0 auto;
          padding: 0;
        }
        .sap-${uid} .sap-day:hover:not(.past):not(.selected) {
          background: #FDF6E9;
        }
        .sap-${uid} .sap-day.selected {
          background: #8B6914;
          color: white;
          font-weight: 600;
        }
        .sap-${uid} .sap-day.past {
          color: #D4CFC8;
          cursor: default;
        }
        .sap-${uid} .sap-day.today {
          border: 1px solid #8B6914;
        }
        .sap-${uid} .sap-times {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #E8E0D4;
        }
        .sap-${uid} .sap-times-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          color: #8B6914;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .sap-${uid} .sap-time-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }
        .sap-${uid} .sap-time {
          padding: 8px 4px;
          border: 1px solid #E8E0D4;
          border-radius: 8px;
          background: none;
          font-size: 0.7rem;
          color: #2D2A26;
          cursor: pointer;
          transition: all 0.2s;
          font-family: Inter, sans-serif;
        }
        .sap-${uid} .sap-time:hover:not(.active) {
          border-color: #8B6914;
          background: #FDF6E9;
        }
        .sap-${uid} .sap-time.active {
          background: #8B6914;
          color: white;
          border-color: #8B6914;
        }
        .sap-${uid} .sap-confirm {
          margin-top: 16px;
          width: 100%;
          padding: 12px;
          background: #8B6914;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: 0.05em;
        }
        .sap-${uid} .sap-confirm:hover { background: #7A5C10; }
        .sap-${uid} .sap-confirm:disabled {
          background: #D4CFC8;
          cursor: default;
        }
      `}</style>
      <div className={`sap-${uid}`}>
        <div className="sap-header">
          <button className="sap-nav" onClick={prevMonth}><ChevronLeft size={14} /></button>
          <span className="sap-month">{monthNames[month]} {year}</span>
          <button className="sap-nav" onClick={nextMonth}><ChevronRight size={14} /></button>
        </div>
        <div className="sap-grid">
          {dayNames.map((d) => <div key={d} className="sap-dayname">{d}</div>)}
          {days.map((day, i) => (
            <div key={i}>
              {day ? (
                <button
                  className={`sap-day ${selectedDate === day ? 'selected' : ''} ${isPast(day) ? 'past' : ''} ${day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? 'today' : ''}`}
                  onClick={() => !isPast(day) && setSelectedDate(day)}
                >
                  {day}
                </button>
              ) : null}
            </div>
          ))}
        </div>
        {selectedDate && (
          <div className="sap-times">
            <div className="sap-times-label"><Clock size={14} /> Available Times</div>
            <div className="sap-time-grid">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  className={`sap-time ${selectedTime === t ? 'active' : ''}`}
                  onClick={() => setSelectedTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              className="sap-confirm"
              disabled={!selectedTime}
              onClick={handleConfirm}
            >
              Confirm Appointment
            </button>
          </div>
        )}
      </div>
    </>
  )
}
