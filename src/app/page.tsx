'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, ChevronRight, Star, Check, Play, Zap,
  Code2, Globe, Smartphone, Brain, BarChart3, Palette,
  Cloud, MessageCircle, KanbanSquare, Activity, Headphones,
  FileSignature, Bot, Quote, Shield, Clock, Cpu,
  Users, TrendingUp, ArrowUpRight
} from 'lucide-react'
import { services, products, testimonials, faqs, teamStats, industries } from '@/lib/data'
import ActivityFeed from '@/components/ActivityFeed'
import Tilt3D from '@/components/Tilt3D'

const iconMap: Record<string, any> = {
  Code2, Globe, Smartphone, Brain, BarChart3, Palette, Cloud, MessageCircle,
  KanbanSquare, Activity, Headphones, FileSignature, Bot
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const Icon = iconMap[service.icon] || Zap
  return (
    <Link
      href={`/services#${service.id}`}
      className="group relative bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary-500/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-primary-500" />
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">{service.title}</h3>
      <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{service.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-primary-600 font-semibold text-sm">{service.price}</span>
        <span className="text-xs text-neutral-600">{service.timeline}</span>
      </div>
    </Link>
  )
}

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const numValue = parseInt(value.replace(/[^0-9]/g, ''))
  const hasPlus = value.includes('+')
  const hasPercent = value.includes('%')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const duration = 2000
          const step = Math.ceil(numValue / (duration / 16))
          const timer = setInterval(() => {
            start += step
            if (start >= numValue) {
              setCount(numValue)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, 16)
          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [numValue])

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-heading font-bold text-white">
      {count}{hasPercent ? '%' : ''}{hasPlus ? '+' : ''}{suffix}
    </div>
  )
}

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ===== 3D HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-neutral-900 scene-3d-tilt">
        {/* 3D Background Effects */}
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-blob depth-20" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 depth-30" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-blob animation-delay-4000 depth-10" />
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-50" />

        <div className="section-container relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-8 depth-20" style={{ transformStyle: 'preserve-3d' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium depth-10">
                <Cpu size={14} className="text-primary-400" />
                AI-Powered Software Development
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight text-3d-light depth-30">
                Software Built by{' '}
                <span className="gradient-text">Intelligent AI</span>{' '}
                Agents. Delivered in Days.
              </h1>

              <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-xl depth-20">
                Nexify is an AI-native software company. Our workforce of 50+ AI agents builds custom software,
                mobile apps, AI solutions, and SaaS products — 10x faster, at half the cost of traditional agencies.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  Start Your Project
                  <ArrowRight size={20} />
                </Link>
                <Link href="/portfolio" className="btn-secondary border-neutral-600 text-neutral-300 hover:bg-white hover:text-neutral-900 text-lg px-8 py-4">
                  View Our Work
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-2 border-neutral-900 flex items-center justify-center text-white text-xs font-bold">
                      {['R','P','A','S'][i-1]}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-neutral-400 text-xs font-medium">
                    +50
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-warning">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="text-neutral-400">Trusted by 200+ clients</span>
                </div>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="aspect-square rounded-3xl gradient-bg p-1">
                  <div className="w-full h-full rounded-2xl bg-neutral-900 p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6">
                      <Cpu size={40} className="text-white" />
                    </div>
                    <h3 className="text-white text-2xl font-heading font-bold mb-2">50+ AI Agents</h3>
                    <p className="text-neutral-400 mb-6">Working 24/7 on your projects</p>
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {[
                        { label: 'Uptime', value: '99.9%' },
                        { label: 'Delivery', value: '2x Faster' },
                        { label: 'Cost Savings', value: '60%' },
                        { label: 'CSAT', value: '4.9/5' },
                      ].map(stat => (
                        <div key={stat.label} className="bg-neutral-800 rounded-xl p-3">
                          <div className="text-white font-heading font-bold text-lg">{stat.value}</div>
                          <div className="text-neutral-600 text-xs">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Orbiting elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-accent-500/20 border border-accent-500/30 backdrop-blur-xl flex items-center justify-center animate-float">
                  <Code2 size={24} className="text-accent-400" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-primary-500/20 border border-primary-500/30 backdrop-blur-xl flex items-center justify-center animate-float animation-delay-2000">
                  <Brain size={24} className="text-primary-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <section className="relative -mt-16 z-20">
        <div className="section-container">
          <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700 shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
              {teamStats.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <AnimatedCounter value={stat.value} />
                  <div className="text-neutral-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <div className="chip bg-primary-50 text-primary-600 border border-primary-200 mb-4">Our Services</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Build & Scale</span>
            </h2>
            <p className="text-neutral-600 text-lg">
              20+ AI-powered services delivered by intelligent agents — from strategy to deployment, we handle it all.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 reveal">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <Link href="/services" className="btn-primary">
              View All Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <div className="chip bg-accent-50 text-accent-600 border border-accent-200 mb-4">Our SaaS Products</div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
              Purpose-Built{' '}
              <span className="gradient-text">SaaS Solutions</span>
            </h2>
            <p className="text-neutral-600 text-lg">
              Products we built, use ourselves, and now offer to the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
            {products.slice(0, 3).map((product, i) => {
              const Icon = iconMap[product.icon] || Zap
              return (
                <Link
                  key={product.id}
                  href={`/products#${product.id}`}
                  className="group bg-white rounded-2xl p-8 border border-neutral-200 hover:border-primary-500/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">{product.name}</h3>
                  <p className="text-neutral-600 text-sm mb-4 italic">{product.tagline}</p>
                  <p className="text-neutral-600 text-sm mb-6 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-semibold">{product.price}</span>
                    <span className="text-sm text-neutral-600 group-hover:text-primary-500 transition-colors flex items-center gap-1">
                      Learn more <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-12 reveal">
            <Link href="/products" className="btn-primary">
              Explore All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY NEXIFY ===== */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="chip bg-primary-50 text-primary-600 border border-primary-200 mb-4">Why Nexify?</div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
                AI-Native.{' '}
                <span className="gradient-text">Built Different.</span>
              </h2>
              <p className="text-neutral-600 text-lg mb-8">
                We don't have a team — we have a workforce of AI agents that never sleep, never take breaks,
                and never compromise on quality. This isn't automation. This is a new way to build software.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Zap, title: '10x Faster Delivery', desc: 'AI agents work in parallel, 24/7. What takes a human team 3 months, we deliver in 9 days.' },
                  { icon: Shield, title: 'Enterprise Quality', desc: 'Every agent follows strict standards. Automated code review. 90%+ test coverage. No human errors.' },
                  { icon: TrendingUp, title: '60% Cost Savings', desc: 'No salaries, no benefits, no office. You pay for output, not hours. Enterprise quality at startup prices.' },
                  { icon: Users, title: 'Scale Instantly', desc: 'Need more capacity? We spin up 10 more agents in minutes. No hiring, no onboarding, no delays.' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-1">{item.title}</h4>
                        <p className="text-neutral-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right visual */}
            <div className="relative reveal">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-primary-600/10 border border-neutral-200 p-8 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {[
                    { color: 'from-primary-500 to-blue-600', label: 'Development Agents', pct: '92%' },
                    { color: 'from-accent-500 to-purple-600', label: 'Design Agents', pct: '95%' },
                    { color: 'from-emerald-500 to-green-600', label: 'QA Agents', pct: '98%' },
                    { color: 'from-amber-500 to-orange-600', label: 'DevOps Agents', pct: '99%' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
                      <div className={`w-full h-2 rounded-full bg-gradient-to-r ${item.color} mb-3`} />
                      <div className="font-heading font-bold text-2xl text-neutral-900">{item.pct}</div>
                      <div className="text-neutral-600 text-xs mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative overflow-hidden py-20 gradient-bg">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMzBtMzAtMzBoNjB2NjBIMzB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="section-container relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
              Ready to Build with{' '}
              <span className="text-primary-300">AI Agents</span>?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Tell us about your project. Get a proposal within 24 hours — built by AI, reviewed by senior architects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-white text-lg px-8 py-4">
                Start Your Project
                <ArrowRight size={20} />
              </Link>
              <Link href="/pricing" className="btn-secondary border-white/30 text-white hover:bg-white hover:text-neutral-900 text-lg px-8 py-4">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS + LIVE FEED ===== */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 reveal">
              <div className="chip bg-primary-50 text-primary-600 border border-primary-200 mb-4">Testimonials</div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
                Trusted by{' '}
                <span className="gradient-text">200+ Clients</span>
              </h2>
              <p className="text-neutral-600 text-lg mb-8">Hear from our clients — real results, real satisfaction.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {testimonials.slice(0, 4).map((t, i) => (
                  <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:border-primary-500/20 transition-all duration-300">
                    <div className="flex items-center gap-1 mb-4 text-warning">
                      {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-6">"{t.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-neutral-900">{t.name}</div>
                        <div className="text-xs text-neutral-600">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 reveal">
              <ActivityFeed compact title="Live AI Agent Activity" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 reveal">
              <div className="chip bg-accent-50 text-accent-600 border border-accent-200 mb-4">FAQ</div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold">
                Frequently Asked{' '}
                <span className="gradient-text">Questions</span>
              </h2>
            </div>

            <div className="space-y-3 reveal">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-neutral-900 pr-4">{faq.q}</span>
                    <ChevronRight
                      size={20}
                      className={`text-neutral-600 shrink-0 transition-transform duration-300 ${
                        activeFaq === i ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-5 pb-5 text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 bg-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Let's Build Something{' '}
            <span className="gradient-text">Amazing</span>
          </h2>
          <p className="text-neutral-600 text-lg mb-8 max-w-xl mx-auto">
            Ready to experience the future of software development? Your project starts here.
          </p>
          <Link href="/contact" className="btn-primary text-lg px-8 py-4">
            Get in Touch
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
