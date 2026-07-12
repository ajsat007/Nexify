'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'

export default function TestimonialsPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const stats = [{ label: 'Client Satisfaction', value: '98%' }, { label: 'Projects Delivered', value: '200+' }, { label: 'Repeat Clients', value: '87%' }, { label: 'Avg NPS Score', value: '72' }]

  return (
    <>
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Testimonials</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">What Our <span className="text-primary-300">Clients Say</span></h1>
            <p className="text-xl text-neutral-300">Trusted by 200+ clients across 12 countries. Our AI agents deliver results that speak for themselves.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 reveal">
            {stats.map((s, i) => (
              <div key={i} className="text-center"><div className="text-3xl font-heading font-bold gradient-text">{s.value}</div><div className="text-sm text-neutral-600 mt-1">{s.label}</div></div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:border-primary-500/20 transition-all">
                <Quote className="w-8 h-8 text-primary-200 mb-3" />
                <div className="flex items-center gap-1 mb-4 text-warning">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">{t.name.split(' ').map(n => n[0]).join('')}</div>
                  <div><div className="font-semibold text-sm text-neutral-900">{t.name}</div><div className="text-xs text-neutral-600">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Join 200+ Happy Clients</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">Experience the future of software development. AI-powered, human-trusted.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">Start Your Project <ArrowRight size={20} /></Link>
        </div>
      </section>
    </>
  )
}
