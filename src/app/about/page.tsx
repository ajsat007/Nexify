'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Cpu, Zap, Shield, TrendingUp, Users, Globe, Heart, Target, Eye, Quote, Check, Star } from 'lucide-react'
import { teamStats } from '@/lib/data'

const values = [
  { icon: Zap, title: 'Ship with Velocity', desc: 'Speed is a feature. Our AI agents work in parallel, 24/7. We move fast, iterate faster, and break nothing.' },
  { icon: Shield, title: 'Own the Outcome', desc: 'Every agent thinks like a founder. No finger-pointing. Every line of code is owned, every decision is accountable.' },
  { icon: Cpu, title: 'AI-First by Default', desc: 'Automate everything that can be automated. Free human creativity for what matters. We eat our own dog food.' },
  { icon: TrendingUp, title: 'Radical Transparency', desc: 'Clients see real-time dashboards, not sugar-coated status reports. Every metric, every commit, every decision.' },
  { icon: Star, title: 'Craft over Chaos', desc: 'Clean code, beautiful UI, solid docs. No shortcuts. Our AI agents are trained on best practices, not quick fixes.' },
  { icon: Users, title: 'Clients as Partners', desc: 'We don\'t take orders; we solve problems. Strategic partnership, not body shop. Our success = your success.' },
]

export default function AboutPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">About Us</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
              We're Not a Team.{' '}
              <span className="text-primary-300">We're an AI Workforce.</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl">
              Nexify is the world's first AI-native software company. Zero humans. 50+ specialized AI agents. One mission: build exceptional software at unprecedented speed and value.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center reveal">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">The <span className="gradient-text">Story</span></h2>
              <div className="space-y-4 text-neutral-500 leading-relaxed">
                <p><strong className="text-neutral-900">The problem:</strong> Most software agencies treat clients like order-takers. Requirements → quote → build → deliver → ghost. No strategic partnership. No velocity. No transparency.</p>
                <p><strong className="text-neutral-900">The insight:</strong> What if an agency ran like a product company? What if it had its own SaaS products, its own AI agents, its own internal tools? What if it ate its own dog food before serving it to clients?</p>
                <p><strong className="text-neutral-900">The result:</strong> Nexify doesn't just build software. We run on the same systems we build for clients. Our internal AI agents, dashboards, and automation pipelines are the same ones we deploy for clients. Every process is battle-tested internally first.</p>
                <p><strong className="text-neutral-900">Today:</strong> 50+ AI agents serving clients across 12 countries, with 5 internal SaaS products generating recurring revenue and a growing AI automation practice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">Our <span className="gradient-text">Values</span></h2>
            <p className="text-neutral-500">The principles that guide every AI agent and every decision we make.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
            {[
              { icon: Zap, title: 'Ship with Velocity', desc: 'Speed is a feature. Our AI agents work in parallel, 24/7. We move fast, iterate faster, and break nothing.' },
              { icon: Shield, title: 'Own the Outcome', desc: 'Every agent thinks like a founder. No finger-pointing. Every line of code is owned.' },
              { icon: Cpu, title: 'AI-First by Default', desc: 'Automate everything that can be automated. Free human creativity for what matters.' },
              { icon: TrendingUp, title: 'Radical Transparency', desc: 'Clients see real-time dashboards, not sugar-coated status reports.' },
              { icon: Star, title: 'Craft over Chaos', desc: 'Clean code, beautiful UI, solid docs. Our AI agents are trained on best practices.' },
              { icon: Users, title: 'Clients as Partners', desc: 'We don\'t take orders; we solve problems. Strategic partnership, not body shop.' },
            ].map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">{v.title}</h4>
                    <p className="text-neutral-500 text-sm">{v.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
