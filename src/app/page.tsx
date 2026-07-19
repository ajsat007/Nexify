'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, ChevronRight, Star, Zap, Sparkles,
  Code2, Globe, Smartphone, Brain, BarChart3, Palette,
  Cloud, MessageCircle, Bot, Shield, Clock, Cpu,
  Users, TrendingUp, ArrowUpRight, CheckCircle2,
  ChevronDown, Layers, Workflow, Radio,
} from 'lucide-react'
import { services, products, testimonials, faqs, teamStats } from '@/lib/data'
import ActivityFeed from '@/components/ActivityFeed'
import { ScrollToTop } from '@/components/ScrollAnimations'

const iconMap: Record<string, any> = {
  Code2, Globe, Smartphone, Brain, BarChart3, Palette, Cloud, MessageCircle,
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const Icon = iconMap[service.icon] || Zap
  return (
    <Link
      href={`/chatbot`}
      className="group relative card-hover overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-accent-500/0 to-primary-500/0 group-hover:from-primary-500/[0.02] group-hover:via-accent-500/[0.02] group-hover:to-primary-500/[0.02] transition-all duration-500" />
      <div className="relative p-5 sm:p-6 flex flex-col h-full">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center mb-3.5 group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-all duration-300 shrink-0">
          <Icon className="w-5.5 h-5.5 text-primary-500 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h3 className="text-base sm:text-[17px] font-bold mb-1.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors dark:text-white leading-snug">
          {service.title}
        </h3>
        <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
          {service.description}
        </p>
        {service.features && service.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {service.features.slice(0, 3).map((f: string) => (
              <span key={f} className="chip-surface text-[11px]">{f}</span>
            ))}
            {service.features.length > 3 && (
              <span className="chip-surface text-[11px]">+{service.features.length - 3}</span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-800">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-sm tracking-tight">{service.price}</span>
          <span className="text-xs text-surface-400 dark:text-surface-500 flex items-center gap-1.5">
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
      className="group relative card-hover overflow-hidden"
    >
      <div className="h-1.5 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20 group-hover:from-primary-500 group-hover:via-accent-500 group-hover:to-primary-500 transition-all duration-500" />
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary-500/20">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-heading font-bold dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{product.name}</h3>
            <p className="text-surface-500 text-xs italic mt-0.5 line-clamp-1">{product.tagline}</p>
          </div>
        </div>
        <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-auto">
          {product.features?.slice(0, 4).map((f: string) => (
            <span key={f} className="chip-surface text-[11px]">{f.length > 25 ? f.slice(0, 24) + '…' : f}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-100 dark:border-surface-800">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">{product.price}</span>
          <span className="text-sm text-surface-500 group-hover:text-primary-500 transition-colors flex items-center gap-1">
            Learn more <ArrowUpRight size={14} />
          </span>
        </div>
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
      <section className="relative min-h-[85vh] sm:min-h-[90dvh] flex items-center overflow-hidden gradient-bg-dark">
        {/* Aurora background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora">
            <div className="aurora-blob" style={{ width: '700px', height: '700px', background: 'rgba(99,102,241,0.12)', top: '-15%', left: '-10%' }} />
            <div className="aurora-blob" style={{ width: '600px', height: '600px', background: 'rgba(6,182,212,0.1)', top: '10%', right: '-5%', animationDelay: '-2s' }} />
            <div className="aurora-blob" style={{ width: '500px', height: '500px', background: 'rgba(139,92,246,0.08)', bottom: '-10%', left: '25%', animationDelay: '-4s' }} />
          </div>
          <div className="absolute inset-0 bg-grid-white opacity-30" />
        </div>

        <div className="section-container relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs sm:text-sm font-medium animate-fade-in">
                <Sparkles size={14} className="text-primary-400 shrink-0" />
                AI-Powered Software Development
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[1.05] tracking-tight">
                Software Built by{' '}
                <span className="text-gradient">Intelligent AI</span>{' '}
                <br className="hidden sm:block" />
                Agents.
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-surface-400 leading-relaxed max-w-xl">
                Nexify is an AI-native software company. 28 specialized AI agents build custom software, mobile apps, AI solutions, and SaaS products — 10x faster, at half the cost.
              </p>

              {/* CTAs */}
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                <Link href="/chatbot" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 text-center w-full xs:w-auto shadow-xl shadow-primary-500/20">
                  <Bot size={16} />
                  AI Chatbot — ₹15K
                  <ArrowRight size={15} />
                </Link>
                <Link href="/contact" className="btn-secondary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 text-center w-full xs:w-auto">
                  Start a Project
                </Link>
                <Link href="/portfolio" className="btn-ghost text-sm sm:text-base px-6 py-3 text-center w-full xs:w-auto">
                  Our Work <ArrowUpRight size={14} />
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4 sm:gap-8 pt-2 animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {['R', 'P', 'A', 'S'].map((l, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-2 border-surface-900 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        {l}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-surface-800 border-2 border-surface-900 flex items-center justify-center text-surface-400 text-xs font-medium">+50</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-400">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="currentColor" />)}
                  </div>
                  Trusted by 200+ clients
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                <div className="glass rounded-3xl p-8 border border-white/10">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6 shadow-2xl shadow-primary-500/20">
                      <Bot size={40} className="text-white" />
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 border-[3px] border-surface-900" />
                    </div>
                    <h3 className="text-white text-2xl font-heading font-bold mb-1">28 AI Agents</h3>
                    <p className="text-surface-400 mb-6 text-sm">Working 24/7 on your projects</p>
                    <div className="grid grid-cols-2 gap-3 w-full">
                      {[
                        { label: 'Uptime', value: '99.9%' },
                        { label: 'Delivery', value: '2x Faster' },
                        { label: 'Cost Savings', value: '60%' },
                        { label: 'CSAT', value: '4.9/5' },
                      ].map(stat => (
                        <div key={stat.label} className="bg-surface-800/50 backdrop-blur-sm rounded-xl p-3 border border-surface-700/50">
                          <div className="text-white font-heading font-bold text-lg">{stat.value}</div>
                          <div className="text-surface-500 text-xs">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Floating decorations */}
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 backdrop-blur-xl flex items-center justify-center animate-float">
                  <Code2 size={18} className="text-accent-400" />
                </div>
                <div className="absolute -bottom-3 -left-3 w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 backdrop-blur-xl flex items-center justify-center animate-float" style={{ animationDelay: '-2s' }}>
                  <Brain size={18} className="text-primary-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="relative z-20 -mt-8 sm:-mt-12">
        <div className="section-container">
          <div className="glass rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
              {teamStats.map((stat) => (
                <div key={stat.label} className="text-center py-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-surface-900 dark:text-white">{stat.value}</div>
                  <div className="text-surface-500 text-xs sm:text-sm mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="chip-primary mb-4">Our Services</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 dark:text-white">
              Everything You Need to <span className="text-gradient">Build & Scale</span>
            </h2>
            <p className="text-surface-600 dark:text-surface-400 text-base sm:text-lg">8 AI-powered services delivered by 28 specialized agents. All at a fraction of traditional cost.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          <div className="text-center mt-10 sm:mt-14">
            <Link href="/services" className="btn-secondary">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="section-padding bg-surface-50 dark:bg-surface-900/50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="chip-primary mb-4">SaaS Products</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 dark:text-white">
              Purpose-Built <span className="text-gradient">SaaS Solutions</span>
            </h2>
            <p className="text-surface-600 dark:text-surface-400 text-base sm:text-lg">Products we built, use ourselves, and now offer to the world.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.slice(0, 3).map((product, i) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10 sm:mt-14">
            <Link href="/products" className="btn-secondary">
              Explore All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY NEXIFY ===== */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="chip-primary mb-4">Why Nexify?</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 dark:text-white">
                AI-Native. <span className="text-gradient">Built Different.</span>
              </h2>
              <p className="text-surface-600 dark:text-surface-400 text-lg mb-8 leading-relaxed">
                We don&apos;t have a team — we have a workforce of 28 AI agents that never sleep, never take breaks, and never compromise on quality.
              </p>
              <div className="space-y-5">
                {[
                  { icon: Zap, title: '10x Faster Delivery', desc: 'AI agents work in parallel, 24/7. No bottlenecks, no delays.' },
                  { icon: Shield, title: 'Enterprise Quality', desc: '90%+ test coverage. AI code review. No human errors, no bad code days.' },
                  { icon: TrendingUp, title: '60% Cost Savings', desc: 'You pay for output, not hours. No agency overhead, no middlemen.' },
                  { icon: Users, title: 'Scale Instantly', desc: 'Need more capacity? Spin up 10 more agents in minutes, not weeks.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-surface-900 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-surface-600 dark:text-surface-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="glass rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-white/10">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { color: 'from-primary-500 to-blue-600', label: 'Development', pct: '92%' },
                    { color: 'from-accent-500 to-purple-600', label: 'Design', pct: '95%' },
                    { color: 'from-emerald-500 to-green-600', label: 'QA', pct: '98%' },
                    { color: 'from-amber-500 to-orange-600', label: 'DevOps', pct: '99%' },
                  ].map((item) => (
                    <div key={item.label} className="card p-4">
                      <div className={`w-full h-2 rounded-full bg-gradient-to-r ${item.color} mb-3`} />
                      <div className="font-heading font-bold text-xl sm:text-2xl text-surface-900 dark:text-white">{item.pct}</div>
                      <div className="text-surface-500 text-xs mt-0.5">{item.label} Agents</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative overflow-hidden py-20 sm:py-28 gradient-bg-primary">
        <div className="absolute inset-0 bg-grid-white opacity-20" />
        <div className="section-container relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4 inline-flex">Limited Launch Offer</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 sm:mb-6">
              Ready to Build with <span className="text-primary-200">AI Agents</span>?
            </h2>
            <p className="text-primary-200 text-base sm:text-lg mb-8 max-w-xl mx-auto">Tell us about your project. Get a proposal within 24 hours. First chatbot at ₹15K.</p>
            <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4">
              <Link href="/chatbot" className="btn-white text-base sm:text-lg px-8 py-3.5 sm:py-4 text-center shadow-xl">
                <Bot size={18} />
                Get AI Chatbot — ₹15K
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl font-medium border border-white/30 text-white hover:bg-white hover:text-surface-900 transition-all text-base sm:text-lg text-center">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <div className="chip-primary mb-4">Testimonials</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 dark:text-white">
                Trusted by <span className="text-gradient">200+ Clients</span>
              </h2>
              <p className="text-surface-600 dark:text-surface-400 text-base sm:text-lg mb-8">Hear from our clients about their experience working with AI agents.</p>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {testimonials.slice(0, 4).map((t, i) => (
                  <div key={i} className="card p-5 sm:p-6 flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-bl-3xl" />
                    <div className="flex items-center gap-1 mb-3 text-amber-400 relative">
                      {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed mb-4 sm:mb-6 flex-1 relative">&ldquo;{t.content}&rdquo;</p>
                    <div className="flex items-center gap-3 relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-sm text-surface-900 dark:text-white truncate">{t.name}</div>
                        <div className="text-xs text-surface-500 truncate">{t.role}</div>
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

      {/* ===== FAQ ===== */}
      <section className="section-padding bg-surface-50 dark:bg-surface-900/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="chip-primary mb-4">FAQ</div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-2 dark:text-white">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="card overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-3 min-h-[52px]"
                    aria-expanded={activeFaq === i}
                  >
                    <span className="font-medium text-sm sm:text-base text-surface-900 dark:text-white leading-snug">{faq.q}</span>
                    <ChevronDown size={16} className={`text-surface-500 shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-surface-600 dark:text-surface-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 sm:mt-10">
              <Link href="/faq" className="btn-ghost text-sm">
                View All FAQs <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 sm:py-28 bg-white dark:bg-surface-950">
        <div className="section-container text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-500/20">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 dark:text-white">
              Let&apos;s Build Something <span className="text-gradient">Amazing</span>
            </h2>
            <p className="text-surface-600 dark:text-surface-400 text-base sm:text-lg mb-8 max-w-lg mx-auto">Ready to experience the future of software development? Your AI workforce is waiting.</p>
            <div className="flex flex-col xs:flex-row justify-center gap-3">
              <Link href="/chatbot" className="btn-primary text-base sm:text-lg px-8 py-3.5">
                <Bot size={18} />
                Get AI Chatbot — ₹15K
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="btn-secondary text-base sm:text-lg px-8 py-3.5">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
