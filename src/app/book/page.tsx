'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Check, ArrowRight, ChevronLeft, ChevronRight, Loader, Video, Phone, MessageSquare, Mail, Zap, Sparkles, Bot } from 'lucide-react'

const services = [
  { id: 'quick', name: 'Quick Chat (15 min)', desc: 'Brief introduction, discuss your project idea', icon: Phone, color: 'from-emerald-500 to-teal-500' },
  { id: 'consultation', name: 'Consultation Call (30 min)', desc: 'Deep dive into requirements, get expert advice', icon: Video, color: 'from-primary-500 to-accent-500' },
  { id: 'tech-review', name: 'Code/Architecture Review (45 min)', desc: 'I review your codebase or architecture and provide feedback', icon: MessageSquare, color: 'from-violet-500 to-purple-500' },
  { id: 'project', name: 'Project Scoping (60 min)', desc: 'Full project planning with timeline, cost, and deliverables', icon: Calendar, color: 'from-amber-500 to-orange-500' },
]

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

const weekDates = Array.from({ length: 14 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), month: d.toLocaleDateString('en-US', { month: 'short' }), full: d.toISOString().split('T')[0] }
})

const bookingReplies = [
  "Perfect! I've added this to my calendar. You'll receive a confirmation email with the meeting link shortly.",
  "Great choice! Looking forward to our conversation. A calendar invite is on its way to your email.",
  "Excellent! I'm excited to discuss your project. Check your email for the confirmation and meeting details.",
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [booking, setBooking] = useState(false)
  const [booked, setBooked] = useState(false)
  const [weekOffset, setWeekOffset] = useState(0)

  const displayDates = weekDates.slice(weekOffset * 7, weekOffset * 7 + 7)

  const handleBook = () => {
    setBooking(true)
    setTimeout(() => {
      const bookings = JSON.parse(localStorage.getItem('nexify_bookings') || '[]')
      bookings.unshift({
        id: `BK-${String(bookings.length + 1).padStart(3, '0')}`,
        service: services.find(s => s.id === selectedService)?.name,
        date: selectedDate,
        time: selectedTime,
        clientName: name,
        clientEmail: email,
        message,
        bookedAt: new Date().toISOString(),
        status: 'confirmed',
      })
      localStorage.setItem('nexify_bookings', JSON.stringify(bookings))
      setBooking(false)
      setBooked(true)
    }, 1500)
  }

  const selected = services.find(s => s.id === selectedService)

  if (booked) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center mx-auto mb-6 border border-success/20">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-3">You're Booked! 🎉</h1>
          <p className="text-neutral-600 mb-6">{bookingReplies[Math.floor(Math.random() * bookingReplies.length)]}</p>
          <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 mb-8 space-y-3">
            <div className="flex items-center gap-3 text-sm"><Calendar className="w-5 h-5 text-primary-500" /><span className="text-neutral-700 dark:text-neutral-200 font-medium">{selectedDate}</span></div>
            <div className="flex items-center gap-3 text-sm"><Clock className="w-5 h-5 text-primary-500" /><span className="text-neutral-700 dark:text-neutral-200 font-medium">{selectedTime}</span></div>
            <div className="flex items-center gap-3 text-sm"><Zap className="w-5 h-5 text-primary-500" /><span className="text-neutral-700 dark:text-neutral-200 font-medium">{selected?.name}</span></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary">Back to Home <ArrowRight size={16} /></Link>
            <Link href="/freelancer" className="btn-secondary">Freelancer Hub</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Book a Call</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Let's Talk About <span className="text-primary-300">Your Project</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">Pick a time that works for you. No sales pitch — just a conversation about how I can help.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-neutral-950">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Steps Progress */}
            <div className="flex items-center justify-center gap-2 mb-12">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-600'}`}>{s}</div>
                  <span className={`text-xs hidden sm:inline ${step >= s ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-neutral-600'}`}>{s === 1 ? 'Service' : s === 2 ? 'Time' : 'Details'}</span>
                  {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-primary-500' : 'bg-neutral-200 dark:bg-neutral-700'}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="reveal space-y-6">
                <h2 className="text-2xl font-heading font-bold text-center">What type of call?</h2>
                <p className="text-neutral-600 text-center">Choose the option that best fits your needs</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map(s => {
                    const Icon = s.icon
                    return (
                      <button key={s.id} onClick={() => setSelectedService(s.id)}
                        className={`text-left p-6 rounded-2xl border-2 transition-all ${
                          selectedService === s.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 shadow-lg'
                            : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/50 hover:border-neutral-300'
                        }`}>
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}><Icon className="w-6 h-6 text-white" /></div>
                        <h3 className="font-semibold mb-1">{s.name}</h3>
                        <p className="text-sm text-neutral-600">{s.desc}</p>
                      </button>
                    )
                  })}
                </div>
                <div className="text-center">
                  <button disabled={!selectedService} onClick={() => setStep(2)} className="btn-primary text-lg px-10">Continue <ArrowRight size={18} /></button>
                </div>
              </div>
            )}

            {/* Step 2: Pick Date & Time */}
            {step === 2 && (
              <div className="reveal space-y-6">
                <h2 className="text-2xl font-heading font-bold text-center">Pick a Date & Time</h2>
                <p className="text-neutral-600 text-center">{selected?.name}</p>

                {/* Date Picker */}
                <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))} disabled={weekOffset === 0} className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-30"><ChevronLeft size={18} /></button>
                    <span className="text-sm font-medium">{displayDates[0]?.month} {displayDates[0]?.date} — {displayDates[6]?.date}</span>
                    <button onClick={() => setWeekOffset(weekOffset + 1)} disabled={weekOffset >= 1} className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-30"><ChevronRight size={18} /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {displayDates.map(d => (
                      <button key={d.full} onClick={() => setSelectedDate(`${d.month} ${d.date}, 2026`)}
                        className={`p-3 rounded-xl text-center transition-all ${
                          selectedDate.includes(String(d.date))
                            ? 'bg-primary-500 text-white shadow-lg'
                            : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                        }`}>
                        <div className="text-xs font-medium">{d.day}</div>
                        <div className="text-lg font-heading font-bold">{d.date}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Available Time Slots</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map(t => (
                      <button key={t} onClick={() => setSelectedTime(t)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          selectedTime === t
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                        }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                  <button disabled={!selectedDate || !selectedTime} onClick={() => setStep(3)} className="btn-primary">Continue <ArrowRight size={18} /></button>
                </div>
              </div>
            )}

            {/* Step 3: Your Details */}
            {step === 3 && (
              <div className="reveal space-y-6 max-w-lg mx-auto">
                <h2 className="text-2xl font-heading font-bold text-center">Almost Done!</h2>
                <p className="text-neutral-600 text-center">Share your details and I'll send the confirmation</p>

                <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <Calendar className="w-5 h-5 text-primary-500" />
                    <div><div className="text-sm font-medium">{selectedDate}</div><div className="text-xs text-neutral-600">{selectedTime}</div></div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <Zap className="w-5 h-5 text-primary-500" />
                    <div><div className="text-sm font-medium">{selected?.name}</div><div className="text-xs text-neutral-600">{selected?.desc}</div></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Your Name *</label>
                    <input className="input-field" placeholder="e.g. Rahul Sharma" value={name} onChange={e => setName(e.target.value)} /></div>
                  <div><label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email *</label>
                    <input type="email" className="input-field" placeholder="rahul@company.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
                  <div><label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Project Details (optional)</label>
                    <textarea className="input-field" rows={3} placeholder="Briefly describe your project..." value={message} onChange={e => setMessage(e.target.value)} /></div>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setStep(2)} className="btn-secondary">Back</button>
                  <button onClick={handleBook} disabled={!name || !email || booking} className="btn-primary text-lg px-8">
                    {booking ? <><Loader size={18} className="animate-spin" /> Booking...</> : <><Calendar size={18} /> Confirm Booking</>}
                  </button>
                </div>

                <p className="text-xs text-neutral-600 text-center">By booking, you agree to the terms. Your data is secure.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
