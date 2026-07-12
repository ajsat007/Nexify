'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Landmark, HeartPulse, ShoppingCart, GraduationCap, Truck, Factory, Building2, Film, Globe } from 'lucide-react'

const industries = [
  { name: 'Fintech', icon: Landmark, description: 'Secure, compliant financial technology solutions — payment platforms, trading systems, risk analytics, and regulatory reporting.', clients: '12+', projects: '25+' },
  { name: 'Healthcare', icon: HeartPulse, description: 'HIPAA-compliant platforms — telemedicine, EHR systems, medical analytics, patient portals, and AI diagnostics.', clients: '8+', projects: '18+' },
  { name: 'E-commerce', icon: ShoppingCart, description: 'Scalable e-commerce platforms, recommendation engines, inventory management, payment gateways, and omnichannel solutions.', clients: '15+', projects: '32+' },
  { name: 'Edtech', icon: GraduationCap, description: 'Learning management systems, virtual classrooms, assessment platforms, AI tutoring, and adaptive learning paths.', clients: '10+', projects: '22+' },
  { name: 'Logistics', icon: Truck, description: 'Fleet management, route optimization, warehouse management, real-time tracking, and supply chain analytics.', clients: '7+', projects: '14+' },
  { name: 'Manufacturing', icon: Factory, description: 'Production planning, IoT integration, quality control dashboards, predictive maintenance, and supply chain optimization.', clients: '6+', projects: '12+' },
  { name: 'Real Estate', icon: Building2, description: 'Property management platforms, CRM for agents, virtual tour systems, real estate analytics, and marketplace solutions.', clients: '9+', projects: '16+' },
  { name: 'Media & Entertainment', icon: Film, description: 'Content management platforms, streaming solutions, recommendation engines, audience analytics, and monetization systems.', clients: '5+', projects: '10+' },
]

export default function IndustriesPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Industries</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Every Industry. <span className="text-primary-300">One Solution.</span></h1>
            <p className="text-xl text-neutral-300">Our AI agents adapt to your industry's unique challenges — from fintech compliance to healthcare regulation.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 reveal">
            {industries.map((ind, i) => {
              const Icon = ind.icon
              return (
                <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-xl hover:border-primary-500/20 transition-all group">
                  <Icon className="w-10 h-10 text-primary-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary-600 transition-colors">{ind.name}</h3>
                  <p className="text-sm text-neutral-800 mb-4">{ind.description}</p>
                  <div className="flex items-center gap-4 text-xs text-neutral-800 border-t border-neutral-100 pt-4">
                    <span>{ind.clients} clients</span>
                    <span>{ind.projects} projects</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Not Seeing Your Industry?</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">We work across industries. Tell us about yours and we'll show you how AI agents can help.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">Talk to Us <ArrowRight size={20} /></Link>
        </div>
      </section>
    </>
  )
}
