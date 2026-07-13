'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, MapPin, Clock, Check, Send, Loader } from 'lucide-react'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'

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
      const leads = JSON.parse(localStorage.getItem('nexify_leads') || '[]')
      leads.unshift({ id: `LD-${String(leads.length + 1).padStart(3, '0')}`, ...formState, source: 'Website', status: 'new', date: new Date().toISOString().split('T')[0] })
      localStorage.setItem('nexify_leads', JSON.stringify(leads))
      setLoading(false)
      setSubmitted(true)
    } catch {
      setError('Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <PageLayout>
      <PageHeader badge="Contact" title={"Let's Build. Get a Proposal in 24h."} subtitle="Tell us about your project." />
      <PageSection>
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-success/5 rounded-2xl border border-success/20 p-12 text-center">
                <Check className="w-12 h-12 text-success mx-auto mb-4" />
                <h2 className="text-2xl font-heading font-bold mb-3 dark:text-white">Proposal Being Generated!</h2>
                <p className="text-neutral-600 dark:text-neutral-400">Our AI agents are analyzing your requirements. You&apos;ll receive a proposal within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-heading font-bold mb-2 dark:text-white">Tell Us About Your Project</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Name *</label>
                    <input required className="input-field" value={formState.name} onChange={e => setFormState(s => ({...s, name: e.target.value}))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
                    <input required type="email" className="input-field" value={formState.email} onChange={e => setFormState(s => ({...s, email: e.target.value}))} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Company</label>
                    <input className="input-field" value={formState.company} onChange={e => setFormState(s => ({...s, company: e.target.value}))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Service Needed</label>
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
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Project Details *</label>
                  <textarea required rows={4} className="input-field" value={formState.message} onChange={e => setFormState(s => ({...s, message: e.target.value}))} />
                </div>
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? <>Generating... <Loader size={18} className="animate-spin" /></> : <>Get Your AI Proposal <ArrowRight size={18} /></>}
                </button>
              </form>
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 space-y-6">
              <h3 className="font-semibold dark:text-white">What Happens Next</h3>
              <ol className="space-y-3">
                {['AI analyzes requirements', 'Custom proposal (24h)', 'Review & refine', 'AI agents build', 'Daily updates'].map((s, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </PageSection>
    </PageLayout>
  )
}
