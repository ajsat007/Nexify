'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Search, HelpCircle } from 'lucide-react'
import { PageLayout, PageHeader } from '@/components/PageLayout'

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

      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Search */}
            <div className="relative mb-6 sm:mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-surface-500" />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all text-sm sm:text-base"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Category filters — scrollable on mobile */}
            <div className="flex overflow-x-auto gap-2 pb-2 mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-none">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`chip whitespace-nowrap shrink-0 transition-all ${activeCategory === cat ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'}`}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-xs sm:text-sm text-surface-600 mb-4">{filtered.length} question{filtered.length !== 1 ? 's' : ''}</p>

            {/* FAQ list */}
            <div className="space-y-2 sm:space-y-3">
              {filtered.length === 0 ? (
                <div className="text-center py-16 text-surface-600">
                  <HelpCircle className="w-10 h-10 mx-auto mb-3 text-surface-400 dark:text-surface-700" />
                  <p>No questions found for &ldquo;{search}&rdquo;</p>
                  <button onClick={() => setSearch('')} className="text-primary-500 text-sm mt-2 hover:underline">Clear search</button>
                </div>
              ) : (
                filtered.map((faq, i) => (
                  <div key={i} className="bg-white dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden transition-all">
                    <button
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-3 min-h-[52px]"
                      aria-expanded={activeFaq === i}
                    >
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0">
                        <span className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs shrink-0 mt-0.5 sm:mt-0 hidden sm:inline-flex">{faq.category}</span>
                        <span className="font-medium text-sm sm:text-base text-surface-900 dark:text-white leading-snug">{faq.q}</span>
                      </div>
                      <ChevronRight size={18} className={`text-surface-600 shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-90' : ''}`} />
                    </button>
                    <div className={`transition-all duration-300 overflow-hidden ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-surface-700 dark:text-surface-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 sm:mb-4">Still Have Questions?</h2>
          <p className="text-primary-200 text-base sm:text-lg mb-6 sm:mb-8">Our AI support agent is available 24/7.</p>
          <Link href="/contact" className="btn-white text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4">Ask Our AI <ArrowRight size={18} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}
