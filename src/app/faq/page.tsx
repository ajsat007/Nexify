'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Search } from 'lucide-react'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'

const categories = ['All', 'General', 'Services', 'Pricing', 'Process', 'Technology', 'Security']

const categorizedFaqs = [
  { category: 'General', q: 'How is Nexify different from a traditional software agency?', a: 'Nexify operates with an AI-native workforce — AI agents that work 24/7, zero delays, consistent quality, and significantly lower costs.' },
  { category: 'General', q: 'Is Nexify a real company?', a: 'Yes. We are a registered company serving 200+ clients across 12 countries with an AI workforce.' },
  { category: 'General', q: 'Who owns the intellectual property?', a: 'You do. Full IP rights transfer upon payment. Your source code, designs, and data are yours.' },
  { category: 'Services', q: 'What services do you offer?', a: 'Custom software, web development, mobile apps, AI/ML solutions, data analytics, UI/UX design, cloud & DevOps, and AI chatbots.' },
  { category: 'Services', q: 'What technologies do you use?', a: 'Technology-agnostic. Our agents adapt to your stack: Next.js/React, Node.js/Python, PostgreSQL, AWS/Azure, Docker/K8s, TensorFlow/PyTorch.' },
  { category: 'Pricing', q: 'How is pricing determined?', a: 'Fixed-price projects based on scope. Rates are 40-60% lower than traditional agencies — no human overhead.' },
  { category: 'Pricing', q: 'Do you offer refunds?', a: 'Yes. If we fail to deliver per the agreed specification, we offer free revisions. Satisfaction guaranteed.' },
  { category: 'Process', q: 'How does the development process work?', a: '1) Submit requirements → 2) AI generates proposal (24h) → 3) You approve → 4) AI agents build → 5) Daily updates → 6) Delivery & deployment.' },
  { category: 'Process', q: 'How do you handle revisions?', a: 'Our iterative process shows working software early. Feedback is processed quickly — most revisions within hours.' },
  { category: 'Security', q: 'Is my code and data secure?', a: 'Yes. Isolated, encrypted infrastructure. SOC 2 compliant. NDAs signed. Data encrypted at rest and in transit.' },
  { category: 'Security', q: 'Do you have compliance certifications?', a: 'SOC 2 framework. Supports HIPAA for healthcare and GDPR for EU clients. BAAs and DPAs available.' },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  const filtered = categorizedFaqs.filter(f =>
    (activeCategory === 'All' || f.category === activeCategory) &&
    (search === '' || f.q.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <PageLayout>
      <PageHeader badge="FAQ" title="Questions? We Have Answers." subtitle="Everything you need to know about working with an AI-powered software company." />

      <PageSection>
        <div className="max-w-3xl mx-auto">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input type="text" placeholder="Search questions..." className="input-field pl-12 py-4" value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`chip transition-all ${activeCategory === cat ? 'bg-primary-500 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">No questions found for &ldquo;{search}&rdquo;</div>
            ) : (
              filtered.map((faq, i) => (
                <div key={i} className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-all">
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <div className="flex items-center gap-3">
                      <span className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs hidden sm:inline-flex">{faq.category}</span>
                      <span className="font-medium text-neutral-900 dark:text-white">{faq.q}</span>
                    </div>
                    <ChevronRight size={20} className={`text-neutral-500 shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-90' : ''}`} />
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="px-5 pb-5 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </PageSection>

      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-primary-200 mb-8">Our AI support agent is available 24/7.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">Ask Our AI <ArrowRight size={20} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}
