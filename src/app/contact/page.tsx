'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, MapPin, Check, Send, Loader, Clock } from 'lucide-react'
import { PageLayout, PageHeader } from '@/components/PageLayout'

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setLoading(false)
      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <PageLayout>
      <PageHeader badge="Contact" title={"Let's Build. Get a Proposal in 24h."} subtitle="Tell us about your project and our AI agents will generate a detailed proposal." />

      <section className="section-padding bg-white dark:bg-neutral-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-success/5 rounded-2xl border border-success/20 p-8 sm:p-12 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-5">
                    <Check className="w-7 h-7 text-success" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold mb-3 dark:text-white">Proposal Being Generated!</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
                    Our AI agents are analyzing your requirements. You&apos;ll receive a proposal within 24 hours.
                  </p>
                  <Link href="/" className="btn-primary mt-6 inline-flex text-sm">Back to Home <ArrowRight size={16} /></Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <h2 className="text-xl sm:text-2xl font-heading font-bold mb-1 dark:text-white">Tell Us About Your Project</h2>
                  <p className="text-sm text-neutral-500 mb-4">All fields marked with * are required.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Name *</label>
                      <input required className="input-field" placeholder="Your name" value={formState.name} onChange={e => setFormState(s => ({...s, name: e.target.value}))} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Email *</label>
                      <input required type="email" className="input-field" placeholder="you@company.com" value={formState.email} onChange={e => setFormState(s => ({...s, email: e.target.value}))} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Company</label>
                      <input className="input-field" placeholder="Your company" value={formState.company} onChange={e => setFormState(s => ({...s, company: e.target.value}))} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Service Needed</label>
                      <select className="input-field" value={formState.service} onChange={e => setFormState(s => ({...s, service: e.target.value}))}>
                        <option value="">Select...</option>
                        <option value="custom-software">Custom Software</option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-apps">Mobile App Development</option>
                        <option value="ai-solutions">AI Solutions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Project Details *</label>
                    <textarea required rows={4} className="input-field" placeholder="Describe your project, goals, timeline, and any specific requirements..." value={formState.message} onChange={e => setFormState(s => ({...s, message: e.target.value}))} />
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 rounded-xl p-3">{error}</div>
                  )}

                  <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
                    {loading ? <><Loader size={18} className="animate-spin" /> Generating Your Proposal...</> : <><Send size={18} /> Get Your AI Proposal</>}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* What happens next */}
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-5 sm:p-8 border border-neutral-200 dark:border-neutral-700">
                <h3 className="font-semibold mb-4 dark:text-white text-sm">What Happens Next</h3>
                <ol className="space-y-3">
                  {[
                    { step: 'AI analyzes your requirements', time: 'Instant' },
                    { step: 'Custom proposal generated', time: '24 hours' },
                    { step: 'Review & refine scope', time: '1-2 days' },
                    { step: 'AI agents start building', time: 'Day 1' },
                    { step: 'Daily updates delivered', time: 'Every day' },
                  ].map((s, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="flex-1">{s.step}</span>
                      <span className="text-xs text-neutral-400 flex items-center gap-1"><Clock size={11} /> {s.time}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Contact info */}
              <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-5 sm:p-8 border border-neutral-200 dark:border-neutral-700 space-y-4">
                <h3 className="font-semibold dark:text-white text-sm">Reach Us Directly</h3>
                <div className="space-y-3">
                  <a href="mailto:ajinkyasatkar5@gmail.com" className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 transition-colors">
                    <Mail size={16} className="text-primary-500 shrink-0" />
                    ajinkyasatkar5@gmail.com
                  </a>
                  <a href="tel:+919373955349" className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 transition-colors">
                    <Phone size={16} className="text-primary-500 shrink-0" />
                    +91 9373955349
                  </a>
                  <div className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <MapPin size={16} className="text-primary-500 mt-0.5 shrink-0" />
                    <span>Pune, Maharashtra, India · Remote-First</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
