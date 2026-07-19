'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react'
import { PageLayout, PageHeader } from '@/components/PageLayout'
import { AnimatedSection } from '@/components/ScrollAnimations'

const projects = [
  { title: 'FinTech Trading Dashboard', industry: 'Fintech', problem: 'Manual trading processes with 15-minute data latency', solution: 'Real-time AI-powered trading dashboard with sub-second data refresh and predictive analytics', tech: ['React', 'Node.js', 'WebSockets', 'Python ML'], timeline: '6 weeks', budget: '6,00,000', result: '40% faster trades, 2Cr+ monthly volume' },
  { title: 'EdTech Learning Platform', industry: 'Edtech', problem: 'Outdated LMS with 60% student dropout rate', solution: 'AI-powered adaptive learning platform with personalized paths and gamification', tech: ['Next.js', 'Python', 'TensorFlow', 'MongoDB'], timeline: '10 weeks', budget: '8,00,000', result: '78% completion rate, 50k+ active users' },
  { title: 'Healthcare Telemedicine App', industry: 'Healthcare', problem: 'Patients waiting 2+ weeks for specialist appointments', solution: 'HIPAA-compliant telemedicine platform with AI triage and video consultations', tech: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC'], timeline: '12 weeks', budget: '10,00,000', result: '80% reduction in wait time' },
  { title: 'E-commerce Recommendation Engine', industry: 'E-commerce', problem: 'Generic product recommendations with 2% conversion rate', solution: 'AI recommendation engine using collaborative filtering and real-time behavior analysis', tech: ['Python', 'PyTorch', 'Redis', 'React'], timeline: '8 weeks', budget: '5,00,000', result: '42% increase in AOV' },
  { title: 'AI Customer Support Chatbot', industry: 'E-commerce', problem: 'Support team handling 10k+ repetitive queries monthly', solution: 'AI chatbot with RAG pipeline, order tracking, and human handoff', tech: ['LangChain', 'OpenAI', 'Next.js', 'Pinecone'], timeline: '5 weeks', budget: '3,00,000', result: '78% auto-resolution, CSAT 4.7/5' },
  { title: 'Logistics Fleet Management', industry: 'Logistics', problem: 'Manual route planning causing 30% fuel waste', solution: 'AI-powered fleet management with real-time tracking and dynamic route optimization', tech: ['React', 'Node.js', 'PostgreSQL', 'Python ML'], timeline: '10 weeks', budget: '7,50,000', result: '25% fuel savings' },
  { title: 'Manufacturing ERP System', industry: 'Manufacturing', problem: 'Disconnected systems causing 15% production delays', solution: 'Custom ERP with production planning, inventory, and real-time dashboards', tech: ['Angular', 'Java Spring', 'PostgreSQL', 'Docker'], timeline: '16 weeks', budget: '15,00,000', result: '40% efficiency gain' },
  { title: 'HRMS & Payroll System', industry: 'Enterprise', problem: 'Manual payroll processing taking 5 days monthly', solution: 'Cloud-based HRMS with automated payroll and employee self-service portal', tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'], timeline: '10 weeks', budget: '6,00,000', result: '99% payroll accuracy' },
  { title: 'Multi-Vendor Marketplace', industry: 'E-commerce', problem: 'Vendors lacking unified online marketplace presence', solution: 'Full marketplace platform with catalog, payments, and ratings', tech: ['Next.js', 'Node.js', 'MongoDB', 'Razorpay'], timeline: '14 weeks', budget: '10,00,000', result: '200+ vendors, 50k+ products' },
  { title: 'AI Video Analytics Platform', industry: 'Security', problem: 'Manual CCTV monitoring missing 70% of incidents', solution: 'AI video analytics with object detection and real-time alerts', tech: ['Python', 'PyTorch', 'OpenCV', 'React'], timeline: '14 weeks', budget: '15,00,000', result: '95% incident detection rate' },
  { title: 'Smart Campus IoT Platform', industry: 'Education', problem: 'No centralized campus operations visibility', solution: 'IoT-integrated campus management with access control and energy monitoring', tech: ['React', 'Node.js', 'MongoDB', 'MQTT'], timeline: '12 weeks', budget: '8,00,000', result: '30% energy savings' },
  { title: 'Insurance Claim Processing System', industry: 'Insurance', problem: 'Claims processing averaging 15 days per claim', solution: 'AI-powered claims system with OCR and fraud detection', tech: ['React', 'Python ML', 'PostgreSQL', 'Docker'], timeline: '14 weeks', budget: '12,00,000', result: '95% faster processing' },
]

const industries = ['All', 'Fintech', 'Healthcare', 'E-commerce', 'Edtech', 'Logistics', 'Manufacturing', 'Enterprise', 'Security', 'Insurance', 'Education']

const stats = [
  { label: 'Projects Delivered', value: '200+' },
  { label: 'Industries Served', value: '20' },
  { label: 'Avg Delivery Time', value: '9 weeks' },
  { label: 'Client Retention', value: '94%' },
]

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? projects : projects.filter(p => p.industry === filter)

  return (
    <PageLayout>
      <PageHeader badge="Portfolio" title="200+ Projects. 20 Industries. Zero Humans." subtitle="Every project delivered by AI agents. Every client a success story." />

      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="section-container">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-10 sm:mb-16">
            {stats.map((s) => (
              <div key={s.label} className="text-center bg-surface-50 dark:bg-surface-900 rounded-2xl p-4 sm:p-6 border border-surface-100 dark:border-surface-800">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary-600 dark:text-primary-400">{s.value}</div>
                <div className="text-xs sm:text-sm text-surface-700 dark:text-surface-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filters — scrollable on mobile */}
          <div className="flex overflow-x-auto gap-2 pb-2 mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-none">
            {industries.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`chip whitespace-nowrap transition-all shrink-0 ${filter === f ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-6">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</p>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
            {filtered.map((project, i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 50}>
                <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5 sm:p-6 hover:shadow-xl hover:border-primary-500/20 transition-all duration-300 group flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs">{project.industry}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-bold mb-3 dark:text-white group-hover:text-primary-600 transition-colors leading-snug">{project.title}</h3>
                  <div className="space-y-1.5 mb-4 flex-1">
                    <p className="text-xs text-surface-600 font-semibold uppercase tracking-wider">Problem</p>
                    <p className="text-sm text-surface-700 dark:text-surface-400 leading-relaxed">{project.problem}</p>
                    <p className="text-xs text-surface-600 font-semibold uppercase tracking-wider mt-3">Solution</p>
                    <p className="text-sm text-surface-700 dark:text-surface-400 leading-relaxed">{project.solution}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="chip bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 text-xs">{t}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-surface-700 dark:text-surface-400 border-t border-surface-100 dark:border-surface-700 pt-4">
                    <span className="flex items-center gap-1"><Clock size={13} /> {project.timeline}</span>
                    <span className="flex items-center gap-1"><DollarSign size={13} /> {project.budget}</span>
                    <span className="flex items-center gap-1 text-success font-medium"><TrendingUp size={13} /> {project.result}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-surface-600">
              No projects found for this filter.
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
