'use client'

import { Check, ArrowRight, Cpu, Bot, MessageSquare, Pen, DollarSign, Users, BarChart3, FileText, Briefcase, Sparkles } from 'lucide-react'

export default function AIAutomationPage() {
  const agents = [
    { icon: Bot, name: 'Sales Assistant (SalesAgent-Mu)', desc: 'Lead qualification, outreach, follow-ups, proposal generation across email, LinkedIn, and WhatsApp.', status: 'Active' },
    { icon: MessageSquare, name: 'Customer Support Agent', desc: '24/7 multi-channel support with RAG knowledge base, sentiment analysis, and human handoff.', status: 'Active' },
    { icon: Pen, name: 'Coding Assistant (DevAgent-Alpha)', desc: 'Full-stack code generation, debugging, code review, and refactoring across multiple languages.', status: 'Active' },
    { icon: Users, name: 'HR Assistant', desc: 'Agent onboarding, performance tracking, schedule management, and compliance monitoring.', status: 'Active' },
    { icon: DollarSign, name: 'Finance Assistant', desc: 'Invoice generation, expense tracking, profit calculation, and financial reporting.', status: 'Active' },
    { icon: BarChart3, name: 'Marketing Assistant', desc: 'Content generation, SEO analysis, social media scheduling, campaign performance tracking.', status: 'Active' },
    { icon: FileText, name: 'Proposal Generator', desc: 'AI analyzes lead data, company profile, and requirements to generate personalized proposals.', status: 'Active' },
    { icon: BarChart3, name: 'Analytics Assistant', desc: 'Dashboard generation, KPI tracking, anomaly detection, and automated insight reports.', status: 'Active' },
    { icon: FileText, name: 'Document Generator', desc: 'Creates contracts, NDAs, invoices, project plans, and technical documentation.', status: 'Active' },
    { icon: Briefcase, name: 'Meeting Summarizer', desc: 'Transcribes meetings, extracts action items, generates summaries, and updates project tickets.', status: 'Active' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Step 13</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">AI Agent <span className="text-primary-300">Workforce</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">10 specialized AI agents running 24/7 · Zero cost · Unlimited scalability.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-4">
            {agents.map((a, i) => {
              const Icon = a.icon
              return (
                <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:shadow-xl hover:border-primary-500/20 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0"><Icon className="w-6 h-6 text-white" /></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-neutral-900">{a.name}</h3>
                        <span className="chip bg-success/10 text-success text-[10px]">{a.status}</span>
                      </div>
                      <p className="text-sm text-neutral-500">{a.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
