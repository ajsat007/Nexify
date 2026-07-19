'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Bot, MessageCircle, Zap, Clock, Smartphone, Globe, Star, Shield, ChevronDown, ChevronUp } from 'lucide-react'
import { PageLayout, PageHeader } from '@/components/PageLayout'
import { AnimatedSection } from '@/components/ScrollAnimations'

const features = [
  { icon: MessageCircle, title: '24/7 Lead Capture', desc: 'Never miss a potential customer. Your chatbot answers every visitor, every question, at any hour.' },
  { icon: Bot, title: 'Smart FAQ Resolution', desc: 'Answers 80%+ of common questions instantly. Your knowledge base, your brand voice.' },
  { icon: Smartphone, title: 'WhatsApp + Website', desc: 'Works on your website AND WhatsApp. One chatbot, two channels, double the leads.' },
  { icon: Clock, title: 'Built in 48 Hours', desc: 'From signup to live deployment in 2 days. We train the AI on your business, not weeks of setup.' },
  { icon: Globe, title: 'Multi-Language', desc: 'Supports English, Hindi, Marathi, and more. Talk to your customers in their language.' },
  { icon: Shield, title: 'No Data Leakage', desc: 'Self-hosted on your domain. Your customer data stays yours. SOC 2 compliant infrastructure.' },
]

const plans = [
  {
    name: 'Starter',
    price: '₹15,000',
    timeline: '48 hours',
    popular: false,
    items: [
      'Website chatbot widget',
      'WhatsApp integration',
      'Up to 50 FAQ Q&As',
      'Lead capture to email',
      'Appointment booking link',
      '1 month hosting included',
    ],
  },
  {
    name: 'Business',
    price: '₹25,000',
    timeline: '72 hours',
    popular: true,
    items: [
      'Everything in Starter',
      'Up to 200 FAQ Q&As',
      'Multi-language support',
      'CRM integration',
      'Custom knowledge base upload',
      'Analytics dashboard',
      '3 months hosting included',
    ],
  },
  {
    name: 'Enterprise',
    price: '₹50,000',
    timeline: '1 week',
    popular: false,
    items: [
      'Everything in Business',
      'Unlimited Q&As',
      'Voice call integration (AI receptionist)',
      'Custom AI training on your data',
      'Dedicated AI agent for your business',
      'Priority support 24/7',
      '12 months hosting included',
      'SLA guarantee',
    ],
  },
]

const faqs = [
  { q: 'How fast can I get a chatbot?', a: '48 hours for our Starter plan. We built the engine — most of the time is training it on your specific business information.' },
  { q: 'Do I need technical skills?', a: 'Zero. Send us your FAQs, your service list, and your preferred tone. We handle everything.' },
  { q: 'Where does the chatbot go?', a: 'On your website (as a chat widget) AND on WhatsApp. One bot, two channels.' },
  { q: 'What does it cost after setup?', a: '₹2,000/month for hosting and maintenance. Includes updates to your knowledge base, uptime monitoring, and priority support.' },
  { q: 'Can I try it before paying?', a: 'Yes. We build a prototype first — you see it working before you pay a rupee.' },
]

export default function ChatbotPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <PageLayout>
      <PageHeader
        badge="Nexify Chatbots"
        title="AI Chatbot for Your Business — ₹15,000"
        subtitle="Custom-trained on your business. Built in 48 hours. Works on your website and WhatsApp. Capture leads while you sleep."
      >
        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/contact" className="btn-white text-sm">
            Get Your Chatbot Now <ArrowRight size={16} />
          </Link>
          <a href="#plans" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all text-sm">
            See Plans
          </a>
        </div>
      </PageHeader>

      {/* Social proof bar */}
      <section className="bg-white dark:bg-surface-950 border-b border-surface-200 dark:border-surface-800">
        <div className="section-container py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-surface-600 dark:text-surface-400">
            <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-400" fill="currentColor" /> Built by AI agents</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-400" /> 48h delivery guarantee</span>
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-primary-500" /> ₹0 operating cost for you</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={14} className="text-accent-500" /> WhatsApp + Web</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 dark:text-white">
              Your Business Never Sleeps. <span className="text-primary-600">Why Should Your Customer Support?</span>
            </h2>
            <p className="text-surface-700 dark:text-surface-400 text-base sm:text-lg">
              Most businesses lose 60% of leads because nobody responds within 5 minutes. Our AI chatbot responds instantly, 24/7.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} animation="fade-up" delay={i * 50}>
                <div className="bg-surface-50 dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 hover:border-primary-500/20 transition-all h-full">
                  <f.icon className="w-8 h-8 text-primary-500 mb-4" />
                  <h3 className="font-bold text-lg mb-2 dark:text-white">{f.title}</h3>
                  <p className="text-sm text-surface-700 dark:text-surface-400 leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="section-padding bg-surface-50 dark:bg-surface-900">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 dark:text-white">
              Simple Pricing. <span className="text-primary-600">No Hidden Fees.</span>
            </h2>
            <p className="text-surface-700 dark:text-surface-400 text-base sm:text-lg">
              One-time build fee + low monthly hosting. No contracts. Cancel anytime.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <AnimatedSection key={plan.name} animation="fade-up" delay={i * 100}>
                <div className={`rounded-2xl p-6 sm:p-8 border-2 transition-all flex flex-col h-full ${
                  plan.popular
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 shadow-lg shadow-primary-500/10 relative'
                    : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary-500 text-white text-xs font-semibold whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1">{plan.name}</div>
                  <div className="text-3xl font-heading font-bold mb-1 dark:text-white">{plan.price}</div>
                  <div className="text-xs text-surface-600 mb-6">Built in {plan.timeline} · ₹2K/mo hosting</div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                        <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all text-center ${
                    plan.popular
                      ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-md'
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-900 dark:text-white hover:bg-surface-200'
                  }`}>
                    Get Started <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <p className="text-center text-xs text-surface-500 mt-6">All plans include free updates, uptime monitoring, and priority email support.</p>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 dark:text-white">
                What's a Missed Lead <span className="text-primary-600">Costing You?</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: 'Monthly visitors', value: '1,000', calc: 'Average business website' },
                { label: 'Convert with chatbot', value: '5-10%', calc: 'Industry avg. chatbot conversion' },
                { label: 'Monthly value', value: '₹75K-₹1.5L', calc: 'At ₹1,500 avg. customer value' },
              ].map((s) => (
                <div key={s.label} className="bg-surface-50 dark:bg-surface-800 rounded-xl p-5 text-center border border-surface-200 dark:border-surface-700">
                  <div className="text-xs text-surface-600 mb-1">{s.label}</div>
                  <div className="text-2xl font-heading font-bold text-primary-600 dark:text-primary-400">{s.value}</div>
                  <div className="text-xs text-surface-500 mt-1">{s.calc}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-surface-600 mt-6">
              A ₹15,000 chatbot that generates ₹75K+/month in leads pays for itself in under a week.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-surface-50 dark:bg-surface-900">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 dark:text-white">
              From Signup to Live in <span className="text-primary-600">48 Hours</span>
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              { step: '1', title: 'Tell us about your business', desc: 'Share your FAQs, services, contact info, and brand voice. Takes 15 minutes.' },
              { step: '2', title: 'We train the AI', desc: 'Our agents build your chatbot knowledge base. We test it against real scenarios.' },
              { step: '3', title: 'You review & approve', desc: 'We send you a live demo link. See it working before you pay.' },
              { step: '4', title: 'We deploy', desc: 'Chatbot goes live on your website and WhatsApp. You start capturing leads immediately.' },
              { step: '5', title: 'We monitor & improve', desc: 'Monthly performance report. We tune the bot based on real conversations.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center font-bold shrink-0">{s.step}</div>
                <div>
                  <h4 className="font-semibold dark:text-white">{s.title}</h4>
                  <p className="text-sm text-surface-700 dark:text-surface-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-center mb-8 dark:text-white">Common Questions</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left gap-3"
                  >
                    <span className="font-medium text-sm dark:text-white">{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={16} className="shrink-0 text-surface-600" /> : <ChevronDown size={16} className="shrink-0 text-surface-600" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-surface-700 dark:text-surface-400">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">Ready to Never Miss a Lead Again?</h2>
          <p className="text-primary-200 text-base sm:text-lg mb-8 max-w-xl mx-auto">₹15,000. Built in 48 hours. First week free if it doesn't generate a lead.</p>
          <Link href="/contact" className="btn-white text-base sm:text-lg px-8 py-4">Get Your Chatbot Now <ArrowRight size={18} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}
