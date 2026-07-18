'use client'

import Link from 'next/link'
import { ArrowRight, Cpu, Zap, Shield, TrendingUp, Users, Star, ChevronRight } from 'lucide-react'
import { PageLayout, PageHeader } from '@/components/PageLayout'
import { AnimatedSection } from '@/components/ScrollAnimations'

const values = [
  { icon: Zap, title: 'Ship with Velocity', desc: 'Speed is a feature. Our AI agents work in parallel, 24/7. We move fast, iterate faster, and break nothing.' },
  { icon: Shield, title: 'Own the Outcome', desc: 'Every agent thinks like a founder. No finger-pointing. Every line of code is owned, every decision is accountable.' },
  { icon: Cpu, title: 'AI-First by Default', desc: 'Automate everything that can be automated. Free human creativity for what matters. We eat our own dog food.' },
  { icon: TrendingUp, title: 'Radical Transparency', desc: 'Clients see real-time dashboards, not sugar-coated status reports. Every metric, every commit, every decision.' },
  { icon: Star, title: 'Craft over Chaos', desc: 'Clean code, beautiful UI, solid docs. No shortcuts. Our AI agents are trained on best practices, not quick fixes.' },
  { icon: Users, title: 'Clients as Partners', desc: 'We don\'t take orders; we solve problems. Strategic partnership, not body shop.' },
]

export default function AboutPage() {
  return (
    <PageLayout>
      <PageHeader
        badge="About Us"
        title="We're Not a Team. We're an AI Workforce."
        subtitle="Nexify is the world's first AI-native software company. Zero humans. 50+ specialized AI agents. One mission: build exceptional software at unprecedented speed and value."
      />

      {/* Story */}
      <section className="section-padding bg-white dark:bg-neutral-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-5 sm:mb-6 dark:text-white">
                The <span className="text-primary-600 dark:text-primary-400">Story</span>
              </h2>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm sm:text-base">
                <p><strong className="text-neutral-900 dark:text-white">The problem:</strong> Most software agencies treat clients like order-takers. Requirements → quote → build → deliver → ghost. No strategic partnership. No velocity. No transparency.</p>
                <p><strong className="text-neutral-900 dark:text-white">The insight:</strong> What if an agency ran like a product company? What if it had its own SaaS products, its own AI agents, its own internal tools? What if it ate its own dog food before serving it to clients?</p>
                <p><strong className="text-neutral-900 dark:text-white">The result:</strong> Nexify doesn&apos;t just build software. We run on the same systems we build for clients. Every process is battle-tested internally first.</p>
                <p><strong className="text-neutral-900 dark:text-white">Today:</strong> 50+ AI agents serving clients across 12 countries, with 5 internal SaaS products generating recurring revenue.</p>
              </div>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white text-sm">Nexify Technologies</div>
                  <div className="text-xs text-neutral-500">AI-Native Software Company</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'AI Agents', value: '50+' },
                  { label: 'Countries', value: '12' },
                  { label: 'Projects', value: '200+' },
                  { label: 'SaaS Products', value: '5' },
                ].map((s) => (
                  <div key={s.label} className="bg-white dark:bg-neutral-700/50 rounded-xl p-3 text-center">
                    <div className="font-heading font-bold text-lg sm:text-xl text-primary-600 dark:text-primary-400">{s.value}</div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-300">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-neutral-50 dark:bg-neutral-900">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <div className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 mb-3 sm:mb-4">Our Values</div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 sm:mb-4 dark:text-white">
              What We <span className="text-primary-600 dark:text-primary-400">Stand For</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">The principles that guide every AI agent and every decision we make.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} animation="fade-up" delay={i * 50}>
                <div className="flex gap-4 bg-white dark:bg-neutral-800 rounded-2xl p-5 sm:p-6 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500/20 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                    <v.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-1 text-sm">{v.title}</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 sm:mb-4">Ready to Work with Us?</h2>
          <p className="text-primary-200 text-base sm:text-lg mb-6 sm:mb-8">Let&apos;s build something amazing together.</p>
          <Link href="/contact" className="btn-white text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4">Get in Touch <ArrowRight size={18} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}
