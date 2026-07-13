'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, ChevronRight, Star, Check, Zap,
  Code2, Globe, Smartphone, Brain, BarChart3, Palette,
  Cloud, MessageCircle, KanbanSquare, Activity, Headphones,
  FileSignature, Bot, Shield, Clock, Cpu,
  Users, TrendingUp, ArrowUpRight
} from 'lucide-react'
import { services, products, testimonials, faqs, teamStats } from '@/lib/data'
import ActivityFeed from '@/components/ActivityFeed'
import Tilt3D from '@/components/Tilt3D'
import { AnimatedSection, StaggerGroup, AnimatedCounter, ScrollToTop } from '@/components/ScrollAnimations'

const iconMap: Record<string, any> = {
  Code2, Globe, Smartphone, Brain, BarChart3, Palette, Cloud, MessageCircle,
  KanbanSquare, Activity, Headphones, FileSignature, Bot,
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const Icon = iconMap[service.icon] || Zap
  return (
    <Link
      href={`/services#${service.id}`}
      className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-primary-500" />
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors dark:text-white">{service.title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">{service.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-primary-600 font-semibold text-sm">{service.price}</span>
        <span className="text-xs text-neutral-500">{service.timeline}</span>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  return (
    <>
      <ScrollToTop />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-50" />

        <div className="section-container relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium">
                <Cpu size={14} className="text-primary-400" />
                AI-Powered Software Development
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight">
                Software Built by{' '}
                <span className="text-primary-400">Intelligent AI</span>{' '}
                Agents. Delivered in Days.
              </h1>
              <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-xl">
                Nexify is an AI-native software company. Our workforce of 50+ AI agents builds custom software, mobile apps, AI solutions, and SaaS products — 10x faster, at half the cost of traditional agencies.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                  Start Your Project <ArrowRight size={20} />
                </Link>
                <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium border border-neutral-600 text-neutral-300 hover:bg-white hover:text-neutral-900 transition-all text-lg">
                  View Our Work
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-2">
                  {['R', 'P', 'A', 'S'].map((l, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-2 border-neutral-900 flex items-center justify-center text-white text-xs font-bold">{l}</div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-neutral-400 text-xs font-medium">+50</div>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="text-neutral-400">Trusted by 200+ clients</span>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-1">
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
                          <div className="text-neutral-500 text-xs">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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

      {/* ===== STATS ===== */}
      <AnimatedSection animation="fade-up">
        <section className="relative -mt-16 z-20">
          <div className="section-container">
            <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700 shadow-2xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                {teamStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl sm:text-4xl font-heading font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-neutral-400 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== SERVICES ===== */}
      <AnimatedSection animation="fade-up">
        <section className="section-padding bg-white dark:bg-neutral-950">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 mb-4">Our Services</div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 dark:text-white">
                Everything You Need to <span className="text-primary-600 dark:text-primary-400">Build & Scale</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg">20+ AI-powered services delivered by intelligent agents.</p>
            </div>
            <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </StaggerGroup>
            <div className="text-center mt-12">
              <Link href="/services" className="btn-primary">View All Services <ArrowRight size={18} /></Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== PRODUCTS ===== */}
      <AnimatedSection animation="fade-up">
        <section className="section-padding bg-neutral-50 dark:bg-neutral-900">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="chip bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 border border-accent-200 dark:border-accent-800 mb-4">Our SaaS Products</div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 dark:text-white">
                Purpose-Built <span className="text-primary-600 dark:text-primary-400">SaaS Solutions</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg">Products we built, use ourselves, and now offer to the world.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product, i) => {
                const Icon = iconMap[product.icon] || Zap
                return (
                  <Link key={product.id} href={`/products#${product.id}`}
                    className="group bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-2 dark:text-white">{product.name}</h3>
                    <p className="text-neutral-500 text-sm mb-4 italic">{product.tagline}</p>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-6 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-semibold">{product.price}</span>
                      <span className="text-sm text-neutral-500 group-hover:text-primary-500 transition-colors flex items-center gap-1">Learn more <ArrowUpRight size={14} /></span>
                    </div>
                  </Link>
                )
              })}
            </div>
            <div className="text-center mt-12">
              <Link href="/products" className="btn-primary">Explore All Products <ArrowRight size={18} /></Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== WHY NEXIFY ===== */}
      <AnimatedSection animation="fade-up">
        <section className="section-padding bg-white dark:bg-neutral-950">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 mb-4">Why Nexify?</div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6 dark:text-white">
                  AI-Native. <span className="text-primary-600 dark:text-primary-400">Built Different.</span>
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8">
                  We don&apos;t have a team — we have a workforce of AI agents that never sleep, never take breaks, and never compromise on quality.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: Zap, title: '10x Faster Delivery', desc: 'AI agents work in parallel, 24/7.' },
                    { icon: Shield, title: 'Enterprise Quality', desc: '90%+ test coverage. No human errors.' },
                    { icon: TrendingUp, title: '60% Cost Savings', desc: 'You pay for output, not hours.' },
                    { icon: Users, title: 'Scale Instantly', desc: 'Spin up 10 more agents in minutes.' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">{item.title}</h4>
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-primary-600/10 border border-neutral-200 dark:border-neutral-700 p-8 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {[
                      { color: 'from-primary-500 to-blue-600', label: 'Development Agents', pct: '92%' },
                      { color: 'from-accent-500 to-purple-600', label: 'Design Agents', pct: '95%' },
                      { color: 'from-emerald-500 to-green-600', label: 'QA Agents', pct: '98%' },
                      { color: 'from-amber-500 to-orange-600', label: 'DevOps Agents', pct: '99%' },
                    ].map((item) => (
                      <div key={item.label} className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                        <div className={`w-full h-2 rounded-full bg-gradient-to-r ${item.color} mb-3`} />
                        <div className="font-heading font-bold text-2xl text-neutral-900 dark:text-white">{item.pct}</div>
                        <div className="text-neutral-500 text-xs mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== CTA BANNER ===== */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-r from-neutral-900 via-primary-900 to-accent-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMzBtMzAtMzBoNjB2NjBIMzB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="section-container relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
              Ready to Build with <span className="text-primary-300">AI Agents</span>?
            </h2>
            <p className="text-primary-200 text-lg mb-8">Tell us about your project. Get a proposal within 24 hours.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-white text-lg px-8 py-4">Start Your Project <ArrowRight size={20} /></Link>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium border border-white/30 text-white hover:bg-white hover:text-neutral-900 transition-all text-lg">View Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <AnimatedSection animation="fade-up">
        <section className="section-padding bg-white dark:bg-neutral-950">
          <div className="section-container">
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <div className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 mb-4">Testimonials</div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 dark:text-white">
                  Trusted by <span className="text-primary-600 dark:text-primary-400">200+ Clients</span>
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8">Hear from our clients.</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {testimonials.slice(0, 4).map((t, i) => (
                    <div key={i} className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500/20 transition-all duration-300">
                      <div className="flex items-center gap-1 mb-4 text-amber-400">
                        {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                          {t.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-neutral-900 dark:text-white">{t.name}</div>
                          <div className="text-xs text-neutral-500">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <ActivityFeed compact title="Live AI Agent Activity" />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== FAQ ===== */}
      <AnimatedSection animation="fade-up">
        <section className="section-padding bg-neutral-50 dark:bg-neutral-900">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="chip bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 border border-accent-200 dark:border-accent-800 mb-4">FAQ</div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold dark:text-white">
                  Frequently Asked <span className="text-primary-600 dark:text-primary-400">Questions</span>
                </h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-all duration-300">
                    <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left" aria-expanded={activeFaq === i}>
                      <span className="font-medium text-neutral-900 dark:text-white pr-4">{faq.q}</span>
                      <ChevronRight size={20} className={`text-neutral-500 shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-90' : ''}`} />
                    </button>
                    <div className={`transition-all duration-300 overflow-hidden ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="px-5 pb-5 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== FINAL CTA ===== */}
      <AnimatedSection animation="fade-up">
        <section className="py-20 bg-white dark:bg-neutral-950">
          <div className="section-container text-center">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 dark:text-white">
              Let&apos;s Build Something <span className="text-primary-600 dark:text-primary-400">Amazing</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8 max-w-xl mx-auto">Ready to experience the future of software development?</p>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">Get in Touch <ArrowRight size={20} /></Link>
          </div>
        </section>
      </AnimatedSection>
    </>
  )
}
