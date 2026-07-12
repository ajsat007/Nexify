'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Star, Clock, DollarSign, TrendingUp } from 'lucide-react'

const projects = [
  { title: 'FinTech Trading Dashboard', industry: 'Fintech', problem: 'Manual trading processes with 15-minute data latency', solution: 'Real-time AI-powered trading dashboard with sub-second data refresh, predictive analytics, and automated trade execution', tech: ['React', 'Node.js', 'WebSockets', 'Python ML', 'PostgreSQL', 'Redis'], timeline: '6 weeks', budget: '₹6,00,000', result: '40% faster trades, ₹2Cr+ monthly volume' },
  { title: 'EdTech Learning Platform', industry: 'Edtech', problem: 'Outdated LMS with 60% student dropout rate', solution: 'AI-powered adaptive learning platform with personalized paths, gamification, and real-time progress analytics', tech: ['Next.js', 'Python', 'TensorFlow', 'MongoDB', 'AWS'], timeline: '10 weeks', budget: '₹8,00,000', result: '78% completion rate, 50k+ active users' },
  { title: 'Healthcare Telemedicine App', industry: 'Healthcare', problem: 'Patients waiting 2+ weeks for specialist appointments', solution: 'HIPAA-compliant telemedicine platform with AI triage, video consultations, e-prescriptions, and EHR integration', tech: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC', 'AWS'], timeline: '12 weeks', budget: '₹10,00,000', result: '80% reduction in wait time, 15k+ consultations/mo' },
  { title: 'E-commerce Recommendation Engine', industry: 'E-commerce', problem: 'Generic product recommendations with 2% conversion rate', solution: 'AI recommendation engine using collaborative filtering, real-time behavior analysis, and personalization', tech: ['Python', 'PyTorch', 'Redis', 'PostgreSQL', 'React'], timeline: '8 weeks', budget: '₹5,00,000', result: '42% increase in AOV, 28% conversion uplift' },
  { title: 'Logistics Fleet Management', industry: 'Logistics', problem: 'Manual route planning causing 30% fuel waste', solution: 'AI-powered fleet management platform with real-time tracking, predictive maintenance, and dynamic route optimization', tech: ['React', 'Node.js', 'PostgreSQL', 'Python ML', 'Map APIs', 'IoT'], timeline: '10 weeks', budget: '₹7,50,000', result: '25% fuel savings, 35% faster deliveries' },
  { title: 'Manufacturing ERP System', industry: 'Manufacturing', problem: 'Disconnected systems causing 15% production delays', solution: 'Custom ERP with production planning, inventory management, quality control, and real-time dashboards', tech: ['Angular', 'Java Spring', 'PostgreSQL', 'Redis', 'Docker'], timeline: '16 weeks', budget: '₹15,00,000', result: '99.5% uptime, 40% efficiency gain' },
  { title: 'Real Estate CRM Platform', industry: 'Real Estate', problem: 'Agents spending 60% time on manual data entry', solution: 'AI-powered CRM with auto lead capture, WhatsApp integration, property matching, and deal pipeline tracking', tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'WhatsApp API'], timeline: '8 weeks', budget: '₹4,00,000', result: '3x agent productivity, 200+ deals/mo tracked' },
  { title: 'Hospital Management System', industry: 'Healthcare', problem: 'Paper-based records causing 20% duplicate tests', solution: 'Digital hospital management with EMR, appointment scheduling, billing, lab integration, and analytics dashboards', tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'], timeline: '14 weeks', budget: '₹12,00,000', result: '30% cost reduction, 50k+ patient records digitalized' },
  { title: 'AI Customer Support Chatbot', industry: 'E-commerce', problem: 'Support team handling 10k+ repetitive queries monthly', solution: 'AI chatbot with RAG pipeline, order tracking, return processing, and human handoff for complex issues', tech: ['LangChain', 'OpenAI', 'Next.js', 'Pinecone', 'Node.js'], timeline: '5 weeks', budget: '₹3,00,000', result: '78% auto-resolution, CSAT 4.7/5' },
  { title: 'Retail Analytics Dashboard', industry: 'Retail', problem: 'No visibility into store-level performance across 50 branches', solution: 'Real-time analytics dashboard with sales tracking, inventory alerts, footfall analysis, and predictive stock ordering', tech: ['React', 'Python', 'ClickHouse', 'Metabase', 'AWS'], timeline: '6 weeks', budget: '₹3,50,000', result: '15% inventory cost reduction, real-time visibility' },
  { title: 'Food Delivery Aggregator Platform', industry: 'Food Tech', problem: 'Local restaurants struggling with online presence and ordering', solution: 'Multi-vendor food delivery platform with real-time tracking, payment gateway, rating system, and AI demand prediction', tech: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'Stripe'], timeline: '12 weeks', budget: '₹9,00,000', result: '500+ restaurants onboarded, 10k+ orders/day' },
  { title: 'HRMS & Payroll System', industry: 'Enterprise', problem: 'Manual payroll processing taking 5 days monthly', solution: 'Cloud-based HRMS with automated payroll, attendance, leave, expense management, and employee self-service portal', tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Redis'], timeline: '10 weeks', budget: '₹6,00,000', result: '99% payroll accuracy, 90% reduction in processing time' },
  { title: 'Social Media Analytics Tool', industry: 'Marketing', problem: 'Marketing team spending 20 hrs/week on manual reporting', solution: 'AI analytics tool with automated reporting, sentiment analysis, competitor tracking, and content recommendations', tech: ['Next.js', 'Python', 'PostgreSQL', 'OpenAI', 'Chart.js'], timeline: '8 weeks', budget: '₹4,50,000', result: 'Automated 90% reporting, 4x content engagement' },
  { title: 'Insurance Claim Processing System', industry: 'Insurance', problem: 'Claims processing averaging 15 days per claim', solution: 'AI-powered claims system with document OCR, fraud detection, automated adjudication, and real-time tracking portal', tech: ['React', 'Python ML', 'PostgreSQL', 'Redis', 'Docker'], timeline: '14 weeks', budget: '₹12,00,000', result: '95% faster processing, 30% cost reduction' },
  { title: 'Smart Campus IoT Platform', industry: 'Education', problem: 'No centralized campus operations visibility', solution: 'IoT-integrated campus management with access control, energy monitoring, attendance tracking, and emergency alerts', tech: ['React', 'Node.js', 'MongoDB', 'MQTT', 'AWS IoT'], timeline: '12 weeks', budget: '₹8,00,000', result: '30% energy savings, real-time campus monitoring' },
  { title: 'Legal Document Automation Platform', industry: 'Legal', problem: 'Lawyers spending 40% time on document drafting', solution: 'AI document automation platform with templates, clause libraries, auto-fill, e-signatures, and version control', tech: ['Next.js', 'Python', 'PostgreSQL', 'LangChain', 'PDF-Lib'], timeline: '10 weeks', budget: '₹7,00,000', result: '60% time savings, 5k+ documents processed/mo' },
  { title: 'Inventory Management SaaS', industry: 'Retail', problem: 'Retailers losing 8% revenue due to stockouts', solution: 'Multi-tenant inventory SaaS with real-time tracking, demand forecasting, automated reordering, and supplier portal', tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Python ML'], timeline: '12 weeks', budget: '₹8,00,000', result: '99.5% stock accuracy, 50% reduction in stockouts' },
  { title: 'AI Video Analytics Platform', industry: 'Security', problem: 'Manual CCTV monitoring missing 70% of incidents', solution: 'AI video analytics pipeline with object detection, anomaly detection, real-time alerts, and forensic search', tech: ['Python', 'PyTorch', 'OpenCV', 'React', 'PostgreSQL'], timeline: '14 weeks', budget: '₹15,00,000', result: '95% incident detection rate, real-time alerts' },
  { title: 'Corporate Learning LMS', industry: 'Edtech', problem: 'Employee training completion rate below 30%', solution: 'Modern LMS with micro-learning, AI course recommendations, gamification, and progress analytics for corporate teams', tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Python ML'], timeline: '10 weeks', budget: '₹6,00,000', result: '85% completion rate, 10k+ employees trained' },
  { title: 'Multi-Vendor Marketplace Platform', industry: 'E-commerce', problem: 'Vendors lacking unified online marketplace presence', solution: 'Full marketplace platform with vendor onboarding, catalog management, order processing, payments, and ratings', tech: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'Razorpay'], timeline: '14 weeks', budget: '₹10,00,000', result: '200+ vendors, 50k+ products, 15k+ orders/mo' },
]

export default function PortfolioPage() {
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
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Portfolio</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
              200+ Projects.{' '}
              <span className="text-primary-300">20 Industries. Zero Humans.</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl">Every project delivered by AI agents. Every client a success story.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 reveal">
            {[
              { label: 'Projects', value: '200+' },
              { label: 'Industries', value: '20' },
              { label: 'Avg Delivery', value: '9 weeks' },
              { label: 'Client Retention', value: '94%' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-heading font-bold gradient-text">{s.value}</div>
                <div className="text-sm text-neutral-800 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 reveal">
            {['All', 'Fintech', 'Healthcare', 'E-commerce', 'Edtech', 'Logistics', 'Manufacturing', 'Real Estate', 'Retail', 'Enterprise'].map((f, i) => (
              <button key={i} className={`chip ${i === 0 ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'} transition-all`}>{f}</button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8 reveal">
            {projects.map((project, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-xl hover:border-primary-500/20 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <span className="chip bg-primary-50 text-primary-600 text-xs">{project.industry}</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-600 transition-colors">{project.title}</h3>
                <div className="space-y-2 mb-4">
                  <div>
                    <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">Problem</span>
                    <p className="text-sm text-neutral-800 mt-0.5">{project.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">Solution</span>
                    <p className="text-sm text-neutral-800 mt-0.5">{project.solution}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, j) => (
                    <span key={j} className="chip bg-neutral-100 text-neutral-800 text-xs">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-800 border-t border-neutral-100 pt-4">
                  <span className="flex items-center gap-1"><Clock size={14} />{project.timeline}</span>
                  <span className="flex items-center gap-1">{project.budget}</span>
                  <span className="flex items-center gap-1 text-success"><TrendingUp size={14} />{project.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Want Results Like These?</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">Let our AI agents build your next project. Get a proposal in 24 hours.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">
            Start Your Project <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
