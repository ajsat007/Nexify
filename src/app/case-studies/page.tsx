'use client'

import { TrendingUp, Clock, DollarSign, CheckCircle2 } from 'lucide-react'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'
import { AnimatedSection } from '@/components/ScrollAnimations'

const cases = [
  { title: 'FinTech Trading Dashboard', industry: 'Fintech', problem: 'Manual trading with 15-min data latency', solution: 'AI-powered real-time trading dashboard with predictive analytics', result: '40% faster trades, $2Cr+ monthly volume', timeline: '6 weeks', budget: '$6,00,000', tech: ['React', 'Node.js', 'WebSockets', 'Python'] },
  { title: 'Healthcare Telemedicine App', industry: 'Healthcare', problem: '2-week wait for specialist appointments', solution: 'HIPAA-compliant telemedicine platform with AI triage', result: '80% reduction in wait time', timeline: '12 weeks', budget: '$10,00,000', tech: ['React Native', 'Node.js', 'WebRTC', 'AWS'] },
  { title: 'E-commerce Recommendation Engine', industry: 'E-commerce', problem: '2% conversion rate on generic recommendations', solution: 'AI recommendation engine with collaborative filtering', result: '42% increase in AOV', timeline: '8 weeks', budget: '$5,00,000', tech: ['Python', 'PyTorch', 'Redis', 'React'] },
  { title: 'Logistics Fleet Management', industry: 'Logistics', problem: '30% fuel waste due to manual route planning', solution: 'AI fleet management with real-time route optimization', result: '25% fuel savings, 35% faster deliveries', timeline: '10 weeks', budget: '$7,50,000', tech: ['React', 'Node.js', 'Python ML', 'IoT'] },
  { title: 'Manufacturing ERP System', industry: 'Manufacturing', problem: 'Disconnected systems causing 15% delays', solution: 'Custom ERP with production planning and inventory', result: '99.5% uptime, 40% efficiency gain', timeline: '16 weeks', budget: '$15,00,000', tech: ['Angular', 'Java', 'PostgreSQL', 'Docker'] },
  { title: 'AI Customer Support Chatbot', industry: 'E-commerce', problem: '10k+ repetitive queries handled manually', solution: 'AI chatbot with RAG pipeline and human handoff', result: '78% auto-resolution, CSAT 4.7/5', timeline: '5 weeks', budget: '$3,00,000', tech: ['LangChain', 'OpenAI', 'Next.js', 'Pinecone'] },
]

export default function CaseStudiesPage() {
  return (
    <PageLayout>
      <PageHeader badge="Case Studies" title="Real Results, Real Projects" subtitle="Every case study shows exactly what our AI agents delivered." />
      <PageSection>
        <div className="space-y-8">
          {cases.map((c, i) => (
            <AnimatedSection key={i} animation="fade-up" delay={i * 50}>
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all">
                <div className="flex flex-wrap items-start gap-4 mb-4">
                  <span className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs">{c.industry}</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-3 dark:text-white">{c.title}</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div><p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Problem</p><p className="text-sm text-neutral-600 dark:text-neutral-400">{c.problem}</p></div>
                  <div><p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Solution</p><p className="text-sm text-neutral-600 dark:text-neutral-400">{c.solution}</p></div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-700 pt-4">
                  <span className="flex items-center gap-1"><Clock size={14} /> {c.timeline}</span>
                  <span className="flex items-center gap-1"><DollarSign size={14} /> {c.budget}</span>
                  <span className="flex items-center gap-1 text-success"><TrendingUp size={14} /> {c.result}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {c.tech.map((t) => (<span key={t} className="chip bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs">{t}</span>))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </PageSection>
    </PageLayout>
  )
}
