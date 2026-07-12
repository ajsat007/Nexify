'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, HelpCircle, Zap, Calculator } from 'lucide-react'
import PricingCalculator from '@/components/PricingCalculator'

const servicePricing = [
  {
    name: 'Web Development',
    tiers: [
      { name: 'Basic', price: '₹80,000', popular: false, features: ['5-page static site', 'Responsive design', 'SEO basics', 'Contact form', 'Hosting setup', '1 month support'] },
      { name: 'Business', price: '₹1,50,000', popular: true, features: ['Dynamic CMS (20 pages)', 'Blog + admin panel', 'Analytics integration', 'Email system', 'API integrations', '3 months support'] },
      { name: 'Enterprise', price: '₹4,00,000+', popular: false, features: ['Custom web app', 'Multi-role auth', 'Payment gateway', 'Dashboard', 'Custom integrations', '6 months support'] },
    ]
  },
  {
    name: 'Mobile Apps',
    tiers: [
      { name: 'MVP', price: '₹2,50,000', popular: false, features: ['Single platform', '5-8 screens', 'Basic auth', 'REST API', 'App store submission', '1 month support'] },
      { name: 'Standard', price: '₹5,00,000', popular: true, features: ['Both platforms', '10-20 screens', 'Push notifications', 'Payment integration', 'Offline mode', '3 months support'] },
      { name: 'Premium', price: '₹12,00,000+', popular: false, features: ['Full-featured app', 'Real-time sync', 'Admin dashboard', 'Advanced analytics', 'AR/VR features', '6 months support'] },
    ]
  },
  {
    name: 'AI Solutions',
    tiers: [
      { name: 'AI Audit', price: '₹1,00,000', popular: false, features: ['Feasibility report', 'Data assessment', 'PoC roadmap', 'ROI analysis', 'Technology recommendations', 'Executive summary'] },
      { name: 'AI MVP', price: '₹4,00,000', popular: true, features: ['Working prototype', 'Trained model', 'API endpoint', 'Basic monitoring', 'Model card docs', '3 months support'] },
      { name: 'Enterprise', price: '₹10,00,000+', popular: false, features: ['Production system', 'MLOps pipeline', 'Model monitoring', 'Auto-retraining', 'A/B testing infra', 'SLA & dedicated support'] },
    ]
  },
  {
    name: 'UI/UX Design',
    tiers: [
      { name: 'UX Audit', price: '₹30,000', popular: false, features: ['Heuristic evaluation', 'Usability report', 'Quick fix recommendations', 'Priority matrix', 'Competitive analysis', 'Executive summary'] },
      { name: 'Full Design', price: '₹60,000', popular: true, features: ['10-20 screens', 'Wireframes + hi-fi', 'Interactive prototype', 'Design system basics', 'Developer handoff', '2 rounds revisions'] },
      { name: 'Design System', price: '₹2,00,000+', popular: false, features: ['Complete design system', 'React component library', 'Dark/light mode', 'Accessibility audit', 'Design tokens', 'Documentation'] },
    ]
  },
]

const productPricing = [
  {
    name: 'FlowSprint',
    tiers: [
      { name: 'Free', price: '₹0', popular: false, features: ['Up to 5 users', '2 projects', '100 MB storage', 'Basic tasks', 'Board view', 'Community support'] },
      { name: 'Starter', price: '₹499/user/mo', popular: true, features: ['Unlimited projects', '5 GB storage', 'All views', 'Time tracking', 'Integrations', 'Email support'] },
      { name: 'Business', price: '₹999/user/mo', popular: false, features: ['Unlimited users', '25 GB storage', 'AI features', 'Advanced reporting', 'Priority support', 'Custom fields'] },
    ]
  },
  {
    name: 'DeskFlow',
    tiers: [
      { name: 'Free', price: '₹0', popular: false, features: ['2 agents', '100 tickets/mo', 'Email + Chat', 'Basic inbox', '1 KB', 'Community support'] },
      { name: 'Starter', price: '₹1,499/agent/mo', popular: true, features: ['5,000 tickets/mo', 'All channels', 'AI suggestions', 'Knowledge base', 'Canned responses', 'Email support'] },
      { name: 'Business', price: '₹2,999/agent/mo', popular: false, features: ['50,000 tickets/mo', 'Chatbot builder', 'Automation rules', 'SLA management', 'CSAT surveys', 'Priority support'] },
    ]
  },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

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
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Pricing</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
              Enterprise Quality.{' '}
              <span className="text-primary-300">Startup Prices.</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl">
              No humans = no overhead. You pay for output, not hours. 40-60% less than traditional agencies with faster delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Product SaaS Pricing */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">SaaS <span className="gradient-text">Pricing</span></h2>
            <p className="text-neutral-600">Start free, upgrade when you grow. 20% off with annual billing.</p>
          </div>

          {productPricing.map((product) => (
            <div key={product.name} className="mb-16 last:mb-0 reveal">
              <h3 className="text-2xl font-heading font-bold mb-8">{product.name}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {product.tiers.map((tier, i) => (
                  <div key={i} className={`pricing-card ${tier.popular ? 'pricing-card-popular' : ''}`}>
                    {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-semibold rounded-full">Most Popular</div>}
                    <h4 className="text-lg font-semibold mb-1">{tier.name}</h4>
                    <div className="text-3xl font-heading font-bold mb-1">{yearly ? `₹${parseInt(tier.price.replace(/[^0-9]/g,'')) * 10}/yr` : tier.price}</div>
                    {yearly && <p className="text-xs text-success mb-4">Save 20% annually</p>}
                    <ul className="space-y-3 my-6">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-neutral-600"><Check size={16} className="text-success shrink-0 mt-0.5" />{f}</li>
                      ))}
                    </ul>
                    <Link href="/contact" className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-center transition-all ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}>
                      {tier.price === '₹0' ? 'Get Started Free' : 'Start Free Trial'}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <div className="chip bg-accent-50 text-accent-600 border border-accent-200 mb-4">Interactive Tool</div>
            <h2 className="text-3xl font-heading font-bold mb-4">AI <span className="gradient-text">Cost Calculator</span></h2>
            <p className="text-neutral-600">Select your requirements and get an instant estimate — powered by AI pricing models.</p>
          </div>
          <div className="max-w-2xl mx-auto reveal">
            <PricingCalculator />
          </div>
        </div>
      </section>

      {/* Service Pricing */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">Service <span className="gradient-text">Packages</span></h2>
            <p className="text-neutral-600">Fixed-price packages for common needs. Custom projects priced individually.</p>
          </div>

          {servicePricing.map((service) => (
            <div key={service.name} className="mb-16 last:mb-0 reveal">
              <h3 className="text-2xl font-heading font-bold mb-8">{service.name}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {service.tiers.map((tier, i) => (
                  <div key={i} className={`pricing-card ${tier.popular ? 'pricing-card-popular' : ''}`}>
                    {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-semibold rounded-full">Recommended</div>}
                    <h4 className="text-lg font-semibold mb-1">{tier.name}</h4>
                    <div className="text-3xl font-heading font-bold mb-4">{tier.price}</div>
                    <ul className="space-y-3 my-6">
                      {tier.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-neutral-600"><Check size={16} className="text-success shrink-0 mt-0.5" />{f}</li>
                      ))}
                    </ul>
                    <Link href="/contact" className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-center transition-all ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}>
                      Get Started <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Need Something Custom?</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">Tell our AI about your project. Get a detailed proposal with exact pricing within 24 hours, free.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">
            Get Custom Quote
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
