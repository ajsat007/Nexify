'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, MapPin, MessageSquare, Clock, Check, Send, Loader } from 'lucide-react'

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate AI processing
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <>
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Contact</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
              Let's Build.{' '}
              <span className="text-primary-300">Get a Proposal in 24h.</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl">
              Tell us about your project. Our AI agents analyze requirements and generate a detailed proposal — no meetings, no delays, no pressure.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3 reveal">
              {submitted ? (
                <div className="bg-success/5 rounded-2xl border border-success/20 p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold mb-3">Proposal Being Generated! 🚀</h2>
                  <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                    Our AI agents are analyzing your requirements. You'll receive a detailed proposal with timeline, pricing, and technical approach within 24 hours.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg text-sm text-neutral-600">
                    <Clock size={16} />
                    Expect response by tomorrow
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold mb-2">Tell Us About Your Project</h2>
                  <p className="text-neutral-400 mb-6">Every field helps our AI generate a more accurate proposal.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Name *</label>
                      <input required className="input-field" placeholder="Your name" value={formState.name} onChange={e => setFormState(s => ({...s, name: e.target.value}))} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
                      <input required type="email" className="input-field" placeholder="you@company.com" value={formState.email} onChange={e => setFormState(s => ({...s, email: e.target.value}))} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Company</label>
                      <input className="input-field" placeholder="Your company" value={formState.company} onChange={e => setFormState(s => ({...s, company: e.target.value}))} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Service Needed</label>
                      <select className="input-field" value={formState.service} onChange={e => setFormState(s => ({...s, service: e.target.value}))}>
                        <option value="">Select a service</option>
                        <option value="custom-software">Custom Software</option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-apps">Mobile App Development</option>
                        <option value="ai-solutions">AI Solutions</option>
                        <option value="data-analytics">Data Analytics</option>
                        <option value="ui-ux">UI/UX Design</option>
                        <option value="cloud-devops">Cloud & DevOps</option>
                        <option value="chatbots">AI Chatbots</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Budget Range</label>
                    <select className="input-field" value={formState.budget} onChange={e => setFormState(s => ({...s, budget: e.target.value}))}>
                      <option value="">Select budget</option>
                      <option value="lt-1l">Under ₹1,00,000</option>
                      <option value="1l-3l">₹1,00,000 - ₹3,00,000</option>
                      <option value="3l-10l">₹3,00,000 - ₹10,00,000</option>
                      <option value="10l-25l">₹10,00,000 - ₹25,00,000</option>
                      <option value="gt-25l">₹25,00,000+</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Project Details *</label>
                    <textarea required rows={5} className="input-field resize-none" placeholder="Describe your project, goals, timeline, and any specific requirements..." value={formState.message} onChange={e => setFormState(s => ({...s, message: e.target.value}))} />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                    {loading ? (
                      <>Generating Proposal... <Loader size={18} className="animate-spin" /></>
                    ) : (
                      <>Get Your AI Proposal <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 reveal">
              <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 sticky top-28 space-y-8">
                <div>
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">Email</div>
                        <a href="mailto:hello@nexify.tech" className="text-sm text-neutral-500 hover:text-primary-500">hello@nexify.tech</a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">Phone</div>
                        <a href="tel:+911800123456" className="text-sm text-neutral-500 hover:text-primary-500">1800-123-4567</a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">Location</div>
                        <div className="text-sm text-neutral-500">Bangalore, India · Remote-First</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">Response Time</div>
                        <div className="text-sm text-neutral-500">AI responds in under 2 minutes</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-neutral-200 pt-8">
                  <h3 className="font-semibold mb-3">What Happens Next</h3>
                  <ol className="space-y-4">
                    {[
                      'AI analyzes your requirements',
                      'Generates custom proposal (24h)',
                      'Reviews & refines with you',
                      'AI agents start building',
                      'Daily progress updates',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-sm text-neutral-600">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
