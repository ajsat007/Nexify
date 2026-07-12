'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Clock, DollarSign, CheckCircle2 } from 'lucide-react'

const cases = [
  { title: 'FinTech Trading Dashboard', industry: 'Fintech', problem: 'Manual trading with 15-min data latency', solution: 'AI-powered real-time trading dashboard with predictive analytics', result: '40% faster trades, ₹2Cr+ monthly volume', timeline: '6 weeks', budget: '₹6,00,000', tech: ['React', 'Node.js', 'WebSockets', 'Python'] },
  { title: 'Healthcare Telemedicine App', industry: 'Healthcare', problem: '2-week wait for specialist appointments', solution: 'HIPAA-compliant telemedicine platform with AI triage', result: '80% reduction in wait time, 15k+ consults/mo', timeline: '12 weeks', budget: '₹10,00,000', tech: ['React Native', 'Node.js', 'WebRTC', 'AWS'] },
  { title: 'E-commerce Recommendation Engine', industry: 'E-commerce', problem: '2% conversion rate on generic recommendations', solution: 'AI recommendation engine with collaborative filtering', result: '42% increase in AOV, 28% conversion uplift', timeline: '8 weeks', budget: '₹5,00,000', tech: ['Python', 'PyTorch', 'Redis', 'React'] },
  { title: 'Logistics Fleet Management', industry: 'Logistics', problem: '30% fuel waste due to manual route planning', solution: 'AI fleet management with real-time route optimization', result: '25% fuel savings, 35% faster deliveries', timeline: '10 weeks', budget: '₹7,50,000', tech: ['React', 'Node.js', 'Python ML', 'IoT'] },
  { title: 'Manufacturing ERP System', industry: 'Manufacturing', problem: 'Disconnected systems causing 15% delays', solution: 'Custom ERP with production planning and inventory', result: '99.5% uptime, 40% efficiency gain', timeline: '16 weeks', budget: '₹15,00,000', tech: ['Angular', 'Java', 'PostgreSQL', 'Docker'] },
  { title: 'AI Customer Support Chatbot', industry: 'E-commerce', problem: '10k+ repetitive queries handled manually monthly', solution: 'AI chatbot with RAG pipeline and human handoff', result: '78% auto-resolution, CSAT 4.7/5', timeline: '5 weeks', budget: '₹3,00,000', tech: ['LangChain', 'OpenAI', 'Next.js', 'Pinecone'] },
]

export default function CaseStudiesPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Case Studies</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Real Results. <span className="text-primary-300">Real Impact.</span></h1>
            <p className="text-xl text-neutral-300">How our AI agents delivered measurable outcomes for clients across industries.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            {cases.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-xl hover:border-primary-500/20 transition-all group reveal">
                <div className="chip bg-primary-50 text-primary-600 text-xs mb-4">{c.industry}</div>
                <h2 className="text-xl font-heading font-bold mb-4 group-hover:text-primary-600 transition-colors">{c.title}</h2>
                <div className="space-y-3 mb-4">
                  <div><span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Problem</span><p className="text-sm text-neutral-600 mt-0.5">{c.problem}</p></div>
                  <div><span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Solution</span><p className="text-sm text-neutral-600 mt-0.5">{c.solution}</p></div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">{c.tech.map((t, j) => <span key={j} className="chip bg-neutral-100 text-neutral-600 text-xs">{t}</span>)}</div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 border-t border-neutral-100 pt-4">
                  <span className="flex items-center gap-1"><Clock size={14} />{c.timeline}</span>
                  <span className="flex items-center gap-1"><DollarSign size={14} />{c.budget}</span>
                  <span className="flex items-center gap-1 text-success"><TrendingUp size={14} />{c.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Want Results Like These?</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">Let our AI agents build your next success story.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">Start Your Project <ArrowRight size={20} /></Link>
        </div>
      </section>
    </>
  )
}
