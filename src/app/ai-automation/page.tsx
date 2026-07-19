'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Bot, MessageSquare, Code2, Users, DollarSign, BarChart3, FileText, Briefcase, Sparkles, Zap, Cpu, Loader, Send, CheckCircle2 } from 'lucide-react'

const agentData = [
  { id: 'sales', name: 'Sales Assistant', emoji: '💰', color: 'from-emerald-500 to-teal-500', desc: 'Lead qualification, outreach, follow-ups, and proposal generation across email, LinkedIn, and WhatsApp.', skills: ['Lead gen', 'Proposals', 'Follow-ups', 'CRM'], model: 'Claude Sonnet 5' },
  { id: 'support', name: 'Customer Support', emoji: '🎧', color: 'from-blue-500 to-indigo-500', desc: '24/7 multi-channel support with RAG knowledge base, sentiment analysis, and human handoff.', skills: ['Tickets', 'KB search', 'Sentiment', 'Handoff'], model: 'Claude Opus 4.8' },
  { id: 'coding', name: 'Coding Assistant', emoji: '🤖', color: 'from-purple-500 to-pink-500', desc: 'Full-stack code gen, debugging, code review, and refactoring across multiple languages and frameworks.', skills: ['Code gen', 'Review', 'Debug', 'Deploy'], model: 'Claude Opus 4.8' },
  { id: 'hr', name: 'HR Assistant', emoji: '👥', color: 'from-orange-500 to-red-500', desc: 'Agent onboarding, performance tracking, schedule management, and compliance monitoring.', skills: ['Onboarding', 'Reviews', 'Schedules', 'Compliance'], model: 'Claude Sonnet 5' },
  { id: 'finance', name: 'Finance Assistant', emoji: '📊', color: 'from-green-500 to-emerald-500', desc: 'Invoicing, expense tracking, financial reporting, and budget forecasting with 99.99% accuracy.', skills: ['Invoices', 'Expenses', 'Forecasts', 'Reports'], model: 'Claude Sonnet 5' },
  { id: 'marketing', name: 'Marketing Assistant', emoji: '📈', color: 'from-cyan-500 to-blue-500', desc: 'Content calendars, copywriting, campaign analysis, and optimization strategies.', skills: ['Content', 'SEO', 'Campaigns', 'Analytics'], model: 'Claude Opus 4.8' },
  { id: 'proposal', name: 'Proposal Generator', emoji: '📄', color: 'from-violet-500 to-purple-500', desc: 'Professional proposals, quotations, contracts, and pitch decks personalized to each client.', skills: ['Analysis', 'Scoping', 'Pricing', 'Contracts'], model: 'Claude Opus 4.8' },
  { id: 'analytics', name: 'Analytics Assistant', emoji: '📉', color: 'from-rose-500 to-pink-500', desc: 'Dashboards, anomaly detection, trend analysis, and predictive modeling from raw data.', skills: ['Dashboards', 'Anomalies', 'Trends', 'Forecasts'], model: 'Claude Haiku 4.5' },
  { id: 'docgen', name: 'Document Generator', emoji: '📝', color: 'from-amber-500 to-orange-500', desc: 'Technical docs, user manuals, API documentation, and reports from code and conversations.', skills: ['API docs', 'Manuals', 'Specs', 'Changelogs'], model: 'Claude Sonnet 5' },
  { id: 'meeting', name: 'Meeting Summarizer', emoji: '🎥', color: 'from-sky-500 to-indigo-500', desc: 'Joins meetings, takes notes, extracts action items, and distributes summaries automatically.', skills: ['Transcribe', 'Actions', 'Summaries', 'Follow-up'], model: 'Claude Opus 4.8' },
]

export default function AIAutomationPage() {
  const [activeAgent, setActiveAgent] = useState(agentData[0])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const display = showAll ? agentData : agentData.slice(0, 6)

  return (
    <>
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">AI Automation</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6"><span className="text-primary-300">AI Agent</span> Workforce</h1>
            <p className="text-xl text-surface-400">10 specialized AI agents running 24/7 · Zero cost · Unlimited scalability.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12 reveal">
            {[
              { label: 'Active Agents', value: '10', c: 'from-primary-500 to-accent-500' },
              { label: 'Avg Response', value: '< 30s', c: 'from-emerald-500 to-teal-500' },
              { label: 'Tasks/Day', value: '2,456', c: 'from-violet-500 to-purple-500' },
              { label: 'Uptime', value: '99.99%', c: 'from-cyan-500 to-blue-500' },
              { label: 'Labor Cost', value: '0', c: 'from-rose-500 to-pink-500' },
            ].map((s, i) => (
              <div key={i} className="text-center p-6 bg-surface-50 rounded-2xl border border-surface-100 hover:shadow-lg transition-all">
                <div className={`text-3xl font-heading font-bold bg-gradient-to-r ${s.c} bg-clip-text text-transparent`}>{s.value}</div>
                <div className="text-sm text-surface-800 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Agent cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
            {display.map(agent => (
              <button key={agent.id} onClick={() => { setActiveAgent(agent); setShowAll(true) }}
                className={`text-left bg-white rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${activeAgent.id === agent.id ? 'border-primary-500 shadow-lg ring-2 ring-primary-500/20' : 'border-surface-200'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl`}>{agent.emoji}</div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-success"><span className="w-2 h-2 rounded-full bg-success animate-pulse" /> active</span>
                </div>
                <h3 className="text-lg font-heading font-bold mb-1">{agent.name}</h3>
                <p className="text-sm text-surface-800 mb-3 line-clamp-2">{agent.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {agent.skills.map((s, i) => <span key={i} className="chip bg-surface-100 text-surface-800 text-xs">{s}</span>)}
                </div>
                <div className="mt-3 text-xs text-surface-800">Model: {agent.model}</div>
              </button>
            ))}
          </div>

          {!showAll && <div className="text-center mt-8"><button onClick={() => setShowAll(true)} className="btn-secondary">Show All 10 Agents</button></div>}

          {/* Active Agent Detail */}
          <div className="mt-16 reveal">
            <div className="bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-3xl border border-primary-500/20 p-8">
              <div className="flex items-start gap-6">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${activeAgent.color} flex items-center justify-center text-4xl shrink-0`}>{activeAgent.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-heading font-bold">{activeAgent.name}</h2>
                    <span className="flex items-center gap-1.5 text-xs text-success bg-success/10 px-3 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />Running</span>
                  </div>
                  <p className="text-surface-800 mb-4">{activeAgent.desc}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div><span className="text-surface-800 text-xs block">Model</span><span className="font-medium">{activeAgent.model}</span></div>
                    <div><span className="text-surface-800 text-xs block">Response Time</span><span className="font-medium text-success">{'<'} 30s</span></div>
                    <div><span className="text-surface-800 text-xs block">Tasks Today</span><span className="font-medium">{Math.floor(Math.random() * 100 + 50)}</span></div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {activeAgent.skills.map((s, i) => <span key={i} className="chip bg-primary-50 text-primary-600 text-xs">{s}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow */}
          <div className="mt-20 reveal">
            <h2 className="text-2xl font-heading font-bold text-center mb-12">How Agents <span className="gradient-text">Work Together</span></h2>
            <div className="grid sm:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Orchestrator', desc: 'Receives task → Analyzes → Selects team', c: 'from-primary-500 to-blue-600' },
                { step: '02', title: 'Agent Swarm', desc: 'Parallel work → Coordination → Auto review', c: 'from-accent-500 to-purple-600' },
                { step: '03', title: 'Quality Gate', desc: 'Tests → Security scan → Performance check', c: 'from-emerald-500 to-teal-600' },
                { step: '04', title: 'Delivery', desc: 'Deploy → Document → Notify client', c: 'from-amber-500 to-orange-600' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.c} flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg`}>{item.step}</div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-surface-800">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Want AI Agents for Your Business?</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">We build custom AI agents tailored to your workflows. Deployed in days, not months.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">Build Your AI Agent <ArrowRight size={20} /></Link>
        </div>
      </section>
    </>
  )
}
