'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Zap, Calculator } from 'lucide-react'
import PricingCalculator from '@/components/PricingCalculator'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'
import { AnimatedSection, StaggerGroup } from '@/components/ScrollAnimations'

const servicePricing = [
  {
    name: 'Web Development',
    tiers: [
      { name: 'Basic', price: '₹80,000', popular: false, features: ['5-page static site', 'Responsive design', 'SEO basics', 'Contact form', 'Hosting setup', '1 month support'] },
      { name: 'Business', price: '₹1,50,000', popular: true, features: ['Dynamic CMS (20 pages)', 'Blog + admin panel', 'Analytics integration', 'Email system', 'API integrations', '3 months support'] },
      { name: 'Enterprise', price: '₹4,00,000+', popular: false, features: ['Custom web app', 'Multi-role auth', 'Payment gateway', 'Dashboard', 'Custom integrations', '6 months support'] },
    ],
  },
  {
    name: 'Mobile Apps',
    tiers: [
      { name: 'MVP', price: '₹2,50,000', popular: false, features: ['Single platform', '5-8 screens', 'Basic auth', 'REST API', 'App store submission', '1 month support'] },
      { name: 'Standard', price: '₹5,00,000', popular: true, features: ['Both platforms', '10-20 screens', 'Push notifications', 'Payment integration', 'Offline mode', '3 months support'] },
      { name: 'Premium', price: '₹12,00,000+', popular: false, features: ['Full-featured app', 'Real-time sync', 'Admin dashboard', 'Advanced analytics', 'AR/VR features', '6 months support'] },
    ],
  },
  {
    name: 'AI Solutions',
    tiers: [
      { name: 'AI Audit', price: '₹1,00,000', popular: false, features: ['Feasibility report', 'Data assessment', 'PoC roadmap', 'ROI analysis', 'Technology recommendations', 'Executive summary'] },
      { name: 'AI MVP', price: '₹4,00,000', popular: true, features: ['Working prototype', 'Trained model', 'API endpoint', 'Basic monitoring', 'Model card docs', '3 months support'] },
      { name: 'Enterprise', price: '₹10,00,000+', popular: false, features: ['Production system', 'MLOps pipeline', 'Model monitoring', 'Auto-retraining', 'A/B testing infra', 'SLA & dedicated support'] },
    ],
  },
  {
    name: 'UI/UX Design',
    tiers: [
      { name: 'UX Audit', price: '₹30,000', popular: false, features: ['Heuristic evaluation', 'Usability report', 'Quick fix recommendations', 'Priority matrix', 'Competitive analysis', 'Executive summary'] },
      { name: 'Full Design', price: '₹60,000', popular: true, features: ['10-20 screens', 'Wireframes + hi-fi', 'Interactive prototype', 'Design system basics', 'Developer handoff', '2 rounds revisions'] },
      { name: 'Design System', price: '₹2,00,000+', popular: false, features: ['Complete design system', 'React component library', 'Dark/light mode', 'Accessibility audit', 'Design tokens', 'Documentation'] },
    ],
  },
]

const productPricing = [
  {
    name: 'FlowSprint',
    tiers: [
      { name: 'Free', price: '₹0', popular: false, features: ['Up to 5 users', '2 projects', '100 MB storage', 'Basic tasks', 'Board view', 'Community support'] },
      { name: 'Starter', price: '₹499/user/mo', popular: true, features: ['Unlimited projects', '5 GB storage', 'All views', 'Time tracking', 'Integrations', 'Email support'] },
      { name: 'Business', price: '₹999/user/mo', popular: false, features: ['Unlimited users', '25 GB storage', 'AI features', 'Advanced reporting', 'Priority support', 'Custom fields'] },
    ],
  },
]

export default function PricingPage() {
  const [service, setService] = useState(servicePricing[0]?.name || '')

  return (
    <PageLayout>
      <PageHeader
        badge="Pricing"
        title="Transparent Pricing, Enterprise Quality"
        subtitle="Fixed-price projects and SaaS subscriptions. No hidden costs, no surprises — just exceptional software delivered by AI agents."
      />

      {/* Service Pricing */}
      <PageSection dark>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4 dark:text-white">Service <span className="text-primary-600 dark:text-primary-400">Packages</span></h2>
          <p className="text-neutral-600 dark:text-neutral-400">Choose the package that fits your needs. All include AI-powered delivery.</p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {servicePricing.map((s) => (
            <button
              key={s.name}
              onClick={() => setService(s.name)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                service === s.name
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {servicePricing
            .find((s) => s.name === service)
            ?.tiers.map((tier, i) => (
              <AnimatedSection key={tier.name} animation="fade-up" delay={i * 100}>
                <div className={`rounded-2xl p-8 border-2 transition-all duration-300 ${
                  tier.popular
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 dark:border-primary-400 shadow-lg shadow-primary-500/10 relative'
                    : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
                }`}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary-500 text-white text-xs font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className="text-lg font-heading font-bold mb-1 dark:text-white">{tier.name}</div>
                  <div className="text-3xl font-heading font-bold mb-6 dark:text-white">{tier.price}</div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                        <Check size={16} className="text-success mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                    tier.popular
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  }`}>
                    Get Started <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
        </div>
      </PageSection>

      {/* Calculator */}
      <PageSection>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="chip bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 border border-accent-200 dark:border-accent-800 mb-4">
              <Calculator size={14} /> Cost Calculator
            </div>
            <h2 className="text-3xl font-heading font-bold mb-2 dark:text-white">Estimate Your <span className="text-primary-600 dark:text-primary-400">Project Cost</span></h2>
          </div>
          <PricingCalculator />
        </div>
      </PageSection>

      {/* CTA */}
      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Need a Custom Quote?</h2>
          <p className="text-primary-200 text-lg mb-8">Tell us about your project and we&apos;ll provide a detailed estimate within 24 hours.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">Get a Quote <ArrowRight size={20} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}
