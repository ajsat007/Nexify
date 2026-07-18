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
      className="group relative flex flex-col bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-400/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 overflow-hidden"
    >
      <div className="h-1 w-full bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center mb-3.5 group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-colors duration-300 shrink-0">
          <Icon className="w-5.5 h-5.5 text-primary-500 group-hover:scale-110 transition-transform duration-300" />
        </div>

        <h3 className="text-base sm:text-[17px] font-bold mb-1.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors dark:text-white leading-snug">
          {service.title}
        </h3>

        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-3 line-clamp-2">
          {service.description}
        </p>

        {service.features && service.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {service.features.slice(0, 3).map((f: string) => (
              <span
                key={f}
                className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-700/60 text-neutral-500 dark:text-neutral-400 text-[11px] font-medium leading-tight"
              >
                {f}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-700/60 text-neutral-400 dark:text-neutral-500 text-[11px] font-medium leading-tight">
                +{service.features.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex-1 min-h-0" />

        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-700/50">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-sm tracking-tight">{service.price}</span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
            {service.timeline}
          </span>
        </div>
      </div>
    </Link>
  )
}

function ProductCard({ product }: { product: any }) {
  const Icon = iconMap[product.icon] || Zap
  return (
    <Link
      href={`/products#${product.id}`}
      className="group flex flex-col bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Gradient header strip */}
      <div className="relative h-2 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20 group-hover:from-primary-500 group-hover:via-accent-500 group-hover:to-primary-500 transition-all duration-500" />

      <div className="flex flex-col flex-1 p-6 sm:p-7">
        {/* Icon + tagline row */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-heading font-bold dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{product.name}</h3>
            <p className="text-neutral-500 text-xs italic mt-0.5 line-clamp-1">{product.tagline}</p>
          </div>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-1.5 mb-auto">
          {product.features?.slice(0, 4).map((f: string) => (
            <span key={f} className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-700/60 text-neutral-500 dark:text-neutral-400 text-[11px] font-medium leading-tight">
              {f.length > 25 ? f.slice(0, 24) + '…' : f}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-700/50">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">{product.price}</span>
          <span className="text-sm text-neutral-500 group-hover:text-primary-500 transition-colors flex items-center gap-1">
            Learn more <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}

const agentLetters = ['R', 'P', 'A', 'S']

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  return (
    <>
      <ScrollToTop />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[80vh] sm:min-h-[90dvh] flex items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary-500/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-accent-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary-400/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-50" />

        <div className="section-container relative z-10 pt-24 sm:pt-32 pb-12 sm:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-5 sm:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs sm:text-sm font-medium">
                <Cpu size={14} className="text-primary-400 shrink-0" />
                <span className="hidden xs:inline">AI-Powered Software Development</span>
                <span className="xs:hidden">AI Software Company</span>
              </div>

              <h1 className="text-[clamp(1.5rem,6vw,3rem)] sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[1.1] sm:leading-tight">
                Software Built by{' '}
                <span className="text-primary-400">Intelligent AI</span>{' '}
                Agents. Delivered in Days.
              </h1>

              <p className="text-sm sm:text-lg lg:text-xl text-neutral-300 leading-relaxed max-w-xl">
                Nexify is an AI-native software company. Our workforce of 50+ AI agents builds custom software, mobile apps, AI solutions, and SaaS products — 10x faster, at half the cost of traditional agencies.
              </p>

              {/* CTAs */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                <Link href="/contact" className="btn-primary text-sm sm:text-lg px-5 sm:px-8 py-3 sm:py-4 text-center w-full xs:w-auto">
                  Start Your Project <ArrowRight size={16} />
                </Link>
                <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-medium border border-neutral-600 text-neutral-300 hover:bg-white hover:text-neutral-900 transition-all text-sm sm:text-lg text-center w-full xs:w-auto">
                  View Our Work
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4 sm:gap-8 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {agentLetters.map((l, i) => (
                      <div key={i} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-2 border-neutral-900 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">{l}</div>
                    ))}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-800 border-2 border-neutral-900 flex items-center justify-center text-neutral-400 text-[10px] sm:text-xs font-medium">+50</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={13} fill="currentColor" />)}
                  </div>
                  <span className="text-neutral-400">Trusted by 200+ clients</span>
                </div>
              </div>
            </div>

            {/* Right visual — hidden on mobile */}
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
                <div className="absolute -top-4 -right-4 w-14 h-14 rounded-xl bg-accent-500/20 border border-accent-500/30 backdrop-blur-xl flex items-center justify-center animate-float">
                  <Code2 size={22} className="text-accent-400" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-xl bg-primary-500/20 border border-primary-500/30 backdrop-blur-xl flex items-center justify-center animate-float animation-delay-2000">
                  <Brain size={22} className="text-primary-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <AnimatedSection animation="fade-up">
        <section className="relative -mt-12 sm:-mt-16 z-20">
          <div className="section-container">
            <div className="bg-neutral-800 rounded-2xl p-5 sm:p-8 border border-neutral-700 shadow-2xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
                {teamStats.map((stat) => (
                  <div key={stat.label} className="text-center py-2">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white">{stat.value}</div>
                    <div className="text-neutral-400 text-xs sm:text-sm mt-0.5 sm:mt-1">{stat.label}</div>
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
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <div className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 mb-4">Our Services</div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-3 sm:mb-4 dark:text-white">
                Everything You Need to <span className="text-primary-600 dark:text-primary-400">Build & Scale</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">20+ AI-powered services delivered by intelligent agents.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {services.map((service, i) => (
                <AnimatedSection key={service.id} animation="fade-up" delay={i * 50}>
                  <ServiceCard service={service} index={i} />
                </AnimatedSection>
              ))}
            </div>
            <div className="text-center mt-8 sm:mt-12">
              <Link href="/services" className="btn-primary">View All Services <ArrowRight size={18} /></Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== PRODUCTS ===== */}
      <AnimatedSection animation="fade-up">
        <section className="section-padding bg-neutral-50 dark:bg-neutral-900">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <div className="chip bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 border border-accent-200 dark:border-accent-800 mb-4">Our SaaS Products</div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-3 sm:mb-4 dark:text-white">
                Purpose-Built <span className="text-primary-600 dark:text-primary-400">SaaS Solutions</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">Products we built, use ourselves, and now offer to the world.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.slice(0, 3).map((product, i) => (
                <AnimatedSection key={product.id} animation="fade-up" delay={i * 80}>
                  <ProductCard product={product} />
                </AnimatedSection>
              ))}
            </div>
            <div className="text-center mt-8 sm:mt-12">
              <Link href="/products" className="btn-primary">Explore All Products <ArrowRight size={18} /></Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== WHY NEXIFY ===== */}
      <AnimatedSection animation="fade-up">
        <section className="section-padding bg-white dark:bg-neutral-950">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">{item.title}</h4>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-primary-600/10 border border-neutral-200 dark:border-neutral-700 p-6 sm:p-8 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                    {[
                      { color: 'from-primary-500 to-blue-600', label: 'Development Agents', pct: '92%' },
                      { color: 'from-accent-500 to-purple-600', label: 'Design Agents', pct: '95%' },
                      { color: 'from-emerald-500 to-green-600', label: 'QA Agents', pct: '98%' },
                      { color: 'from-amber-500 to-orange-600', label: 'DevOps Agents', pct: '99%' },
                    ].map((item) => (
                      <div key={item.label} className="bg-white dark:bg-neutral-800 rounded-xl p-3 sm:p-4 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                        <div className={`w-full h-1.5 sm:h-2 rounded-full bg-gradient-to-r ${item.color} mb-2 sm:mb-3`} />
                        <div className="font-heading font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white">{item.pct}</div>
                        <div className="text-neutral-500 text-[11px] sm:text-xs mt-0.5">{item.label}</div>
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
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-r from-neutral-900 via-primary-900 to-accent-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMzBtMzAtMzBoNjB2NjBIMzB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="section-container relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4 sm:mb-6">
              Ready to Build with <span className="text-primary-300">AI Agents</span>?
            </h2>
            <p className="text-primary-200 text-base sm:text-lg mb-6 sm:mb-8">Tell us about your project. Get a proposal within 24 hours.</p>
            <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4">
              <Link href="/contact" className="btn-white text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 text-center">Start Your Project <ArrowRight size={18} /></Link>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-medium border border-white/30 text-white hover:bg-white hover:text-neutral-900 transition-all text-base sm:text-lg text-center">View Pricing</Link>
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
                <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-3 sm:mb-4 dark:text-white">
                  Trusted by <span className="text-primary-600 dark:text-primary-400">200+ Clients</span>
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg mb-6 sm:mb-8">Hear from our clients.</p>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {testimonials.slice(0, 4).map((t, i) => (
                    <div key={i} className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-5 sm:p-6 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500/20 transition-all duration-300 flex flex-col">
                      <div className="flex items-center gap-1 mb-3 sm:mb-4 text-amber-400">
                        {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 sm:mb-6 flex-1">&ldquo;{t.content}&rdquo;</p>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {t.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-neutral-900 dark:text-white truncate">{t.name}</div>
                          <div className="text-xs text-neutral-500 truncate">{t.role}</div>
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
              <div className="text-center mb-10 sm:mb-12">
                <div className="chip bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 border border-accent-200 dark:border-accent-800 mb-4">FAQ</div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-2 dark:text-white">
                  Frequently Asked <span className="text-primary-600 dark:text-primary-400">Questions</span>
                </h2>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-3 min-h-[52px]"
                      aria-expanded={activeFaq === i}
                    >
                      <span className="font-medium text-neutral-900 dark:text-white text-sm sm:text-base leading-snug">{faq.q}</span>
                      <ChevronRight size={18} className={`text-neutral-500 shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-90' : ''}`} />
                    </button>
                    <div className={`transition-all duration-300 overflow-hidden ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8 sm:mt-10">
                <Link href="/faq" className="btn-secondary text-sm">View All FAQs <ArrowRight size={16} /></Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 sm:py-20 bg-white dark:bg-neutral-950">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-3 sm:mb-4 dark:text-white">
            Let&apos;s Build Something <span className="text-primary-600 dark:text-primary-400">Amazing</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">Ready to experience the future of software development?</p>
          <Link href="/contact" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4">Get in Touch <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  )
}
