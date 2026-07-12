'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Search } from 'lucide-react'
import { faqs } from '@/lib/data'

const categories = ['All', 'General', 'Services', 'Pricing', 'Process', 'Technology', 'Security']

const categorizedFaqs = [
  { category: 'General', q: 'How is Nexify different from a traditional software agency?', a: 'Nexify operates with an AI-native workforce — our developers, designers, QA engineers, and project managers are all AI agents. This means 24/7 execution, zero delays, consistent quality, and significantly lower costs.' },
  { category: 'General', q: 'Is Nexify a real company?', a: 'Yes. We are a registered company with a team of AI agents working 24/7. While our workforce is AI, we are a legitimate business entity serving 200+ clients across 12 countries.' },
  { category: 'General', q: 'Who owns the intellectual property?', a: 'You do. Full IP rights transfer to you upon payment. Your source code, designs, and data are yours. We retain nothing.' },
  { category: 'Services', q: 'What services do you offer?', a: 'Custom software development, web development, mobile apps, AI/ML solutions, data analytics, UI/UX design, cloud & DevOps, AI chatbots, and IT consulting. 20+ services delivered by specialized AI agents.' },
  { category: 'Services', q: 'What technologies do you use?', a: 'We\'re technology-agnostic. Our AI agents adapt to your stack. Common choices: Next.js/React, Node.js/Python, PostgreSQL/MongoDB, AWS/Azure, Docker/Kubernetes, TensorFlow/PyTorch, LangChain.' },
  { category: 'Services', q: 'Can you work with our existing team and tools?', a: 'Absolutely. Our agents integrate with GitHub, Jira, Slack, Figma, and most development tools.' },
  { category: 'Pricing', q: 'How is pricing determined?', a: 'Fixed-price projects based on scope, complexity, and timeline. Since we have no human overhead, our rates are 40-60% lower than traditional agencies.' },
  { category: 'Pricing', q: 'Do you offer refunds?', a: 'Yes. If we fail to deliver according to the agreed specification, we offer revisions at no cost. Client satisfaction is guaranteed.' },
  { category: 'Pricing', q: 'Are there any hidden costs?', a: 'None. We quote transparently. Infrastructure costs (hosting, APIs, third-party services) are discussed upfront and are either included or billed at actuals with your approval.' },
  { category: 'Process', q: 'How does the development process work?', a: '1) You submit requirements via our form → 2) AI analyzes and generates proposal (24h) → 3) You approve → 4) AI agents start building → 5) You get daily updates → 6) Delivery and deployment.' },
  { category: 'Process', q: 'How do you handle revisions and feedback?', a: 'Our iterative process means you see working software early and often. Feedback is processed by our orchestration layer. Most revisions are implemented within hours.' },
  { category: 'Process', q: 'What if the AI encounters something it cannot handle?', a: 'Our multi-agent system has fallback protocols. Complex problems escalate to specialized agents or the orchestrator. 99%+ of tasks are handled independently.' },
  { category: 'Technology', q: 'Do you build on specific platforms?', a: 'We build on any platform. Web (React/Next.js), mobile (React Native/Flutter), desktop (Electron/Tauri), cloud (AWS/Azure/GCP).' },
  { category: 'Technology', q: 'Can you integrate with third-party APIs?', a: 'Yes. Our API integration agents specialize in connecting to Stripe, Razorpay, Shopify, Salesforce, HubSpot, Google APIs, and hundreds more.' },
  { category: 'Technology', q: 'How do you ensure code quality?', a: 'Every agent follows strict coding standards, writes tests, and undergoes automated code review by specialized review agents. We achieve >90% test coverage.' },
  { category: 'Security', q: 'Is my code and data secure?', a: 'Yes. We operate on isolated, encrypted infrastructure. Your code never leaves your cloud environment. We\'re SOC 2 compliant and sign NDAs.' },
  { category: 'Security', q: 'Where is my data stored?', a: 'On your infrastructure or our secure cloud (your choice). Data is encrypted at rest and in transit. We support India (Mumbai), US (Virginia), and EU (Frankfurt) regions.' },
  { category: 'Security', q: 'Do you have compliance certifications?', a: 'We operate under SOC 2 framework. Our infrastructure supports HIPAA compliance for healthcare and GDPR for EU clients. We can sign BAAs and DPAs.' },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const filtered = categorizedFaqs.filter(f =>
    (activeCategory === 'All' || f.category === activeCategory) &&
    (search === '' || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <>
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">FAQ</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
              Questions?{' '}
              <span className="text-primary-300">We Have Answers.</span>
            </h1>
            <p className="text-xl text-neutral-300">Everything you need to know about working with an AI-powered software company.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Search */}
            <div className="relative mb-8 reveal">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600" />
              <input
                type="text"
                placeholder="Search questions..."
                className="input-field pl-12 py-4"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8 reveal">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`chip transition-all ${activeCategory === cat ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-3 reveal">
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-neutral-600">
                  <p>No questions found for "{search}"</p>
                </div>
              ) : (
                filtered.map((faq, i) => (
                  <div key={i} className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="chip bg-primary-50 text-primary-600 text-xs hidden sm:inline-flex">{faq.category}</span>
                        <span className="font-medium text-neutral-900">{faq.q}</span>
                      </div>
                      <ChevronRight size={20} className={`text-neutral-600 shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-90' : ''}`} />
                    </button>
                    <div className={`transition-all duration-300 overflow-hidden ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="px-5 pb-5 text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">Our AI support agent is available 24/7. Ask anything, get an instant answer.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">
            Ask Our AI
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
