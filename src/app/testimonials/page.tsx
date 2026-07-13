'use client'

import Link from 'next/link'
import { ArrowRight, Star, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'
import { StaggerGroup } from '@/components/ScrollAnimations'

const stats = [{ label: 'Client Satisfaction', value: '98%' }, { label: 'Projects Delivered', value: '200+' }, { label: 'Repeat Clients', value: '87%' }, { label: 'Avg NPS Score', value: '72' }]

export default function TestimonialsPage() {
  return (
    <PageLayout>
      <PageHeader badge="Testimonials" title="What Our Clients Say" subtitle="Trusted by 200+ clients across 12 countries. Our AI agents deliver results that speak for themselves." />
      <PageSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-heading font-bold text-primary-600 dark:text-primary-400">{s.value}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500/20 transition-all">
              <Quote className="w-8 h-8 text-primary-200 dark:text-primary-800 mb-3" />
              <div className="flex items-center gap-1 mb-4 text-amber-400">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}</div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">{t.name.split(' ').map(n => n[0]).join('')}</div>
                <div><div className="font-semibold text-sm text-neutral-900 dark:text-white">{t.name}</div><div className="text-xs text-neutral-500">{t.role}</div></div>
              </div>
            </div>
          ))}
        </StaggerGroup>
      </PageSection>
      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Join 200+ Happy Clients</h2>
          <p className="text-primary-200 mb-8">Experience the future of software development.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">Start Your Project <ArrowRight size={20} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}
