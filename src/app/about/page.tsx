'use client'

import Link from 'next/link'
import { ArrowRight, Cpu, Zap, Shield, TrendingUp, Users, Star } from 'lucide-react'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'
import { AnimatedSection, StaggerGroup } from '@/components/ScrollAnimations'

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
      <PageSection>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6 dark:text-white">
              The <span className="text-primary-600 dark:text-primary-400">Story</span>
            </h2>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p><strong className="text-neutral-900 dark:text-white">The problem:</strong> Most software agencies treat clients like order-takers. Requirements → quote → build → deliver → ghost. No strategic partnership. No velocity. No transparency.</p>
              <p><strong className="text-neutral-900 dark:text-white">The insight:</strong> What if an agency ran like a product company? What if it had its own SaaS products, its own AI agents, its own internal tools? What if it ate its own dog food before serving it to clients?</p>
              <p><strong className="text-neutral-900 dark:text-white">The result:</strong> Nexify doesn&apos;t just build software. We run on the same systems we build for clients. Every process is battle-tested internally first.</p>
              <p><strong className="text-neutral-900 dark:text-white">Today:</strong> 50+ AI agents serving clients across 12 countries, with 5 internal SaaS products generating recurring revenue.</p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Values */}
      <PageSection dark>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 mb-4">Our Values</div>
          <h2 className="text-3xl font-heading font-bold mb-4 dark:text-white">
            What We <span className="text-primary-600 dark:text-primary-400">Stand For</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">The principles that guide every AI agent and every decision we make.</p>
        </div>
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = v.icon
            return (
              <div key={v.title} className="flex gap-4 bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">{v.title}</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">{v.desc}</p>
                </div>
              </div>
            )
          })}
        </StaggerGroup>
      </PageSection>

      {/* CTA */}
      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Ready to Work with Us?</h2>
          <p className="text-primary-200 text-lg mb-8">Let's build something amazing together.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">Get in Touch <ArrowRight size={20} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}
