'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, ArrowUpRight, Star, KanbanSquare, Activity, Headphones, FileSignature, Bot, Zap, Users, Shield, TrendingUp, Cpu } from 'lucide-react'
import { products } from '@/lib/data'

const iconMap: Record<string, any> = {
  KanbanSquare, Activity, Headphones, FileSignature, Bot
}

const productDetails = [
  {
    id: 'flowsprint',
    icon: 'KanbanSquare',
    name: 'FlowSprint',
    tagline: 'Project management that doesn\'t get in the way.',
    description: 'Modern project management platform built for software teams, agencies, and operations. AI-powered sprint planning, Kanban, Gantt, time tracking, and resource management.',
    price: '₹499/user/mo',
    features: ['Task management with subtasks & dependencies', 'Kanban, Gantt, Calendar & Timeline views', 'AI-powered sprint planning & estimation', 'Built-in time tracking with billable rates', 'Resource management & workload heatmap', 'Integrations: Slack, GitHub, Figma, Zapier'],
    tech: ['Next.js 14', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets'],
    screens: ['Dashboard with My Tasks & Sprint Progress', 'Kanban Board with drag-drop', 'Gantt/Timeline View', 'Task Detail with comments & time log', 'Sprint Planning with capacity view', 'Team Workload Heatmap', 'Analytics & Reports'],
    roles: ['Workspace Owner', 'Admin', 'Project Manager', 'Team Member', 'Viewer', 'Guest'],
  },
  {
    id: 'pulseai',
    icon: 'Activity',
    name: 'PulseAI',
    tagline: 'Your data. Intelligent. Real-time.',
    description: 'AI-powered BI platform. Connect databases, upload CSVs, or use our API — get beautiful dashboards, anomaly detection, and natural-language query in minutes.',
    price: '₹2,499/mo',
    features: ['Connect 10+ data sources (SQL, NoSQL, APIs)', 'Drag-drop dashboard builder with 20+ chart types', 'Natural Language Query (ask in plain English)', 'AI anomaly detection & forecasting', 'Automated scheduled reports', 'Row-level security & audit logs'],
    tech: ['Next.js', 'TypeScript', 'Python (AI)', 'ClickHouse', 'PostgreSQL', 'LangChain'],
    screens: ['Dashboard Builder with drag-drop canvas', 'Query Editor (SQL + NLQ)', 'Data Source Connection Manager', 'Anomaly Detection Alerts', 'Scheduled Report Settings', 'Admin Panel with audit logs'],
    roles: ['Admin', 'Analyst', 'Viewer', 'Embed (read-only)'],
  },
  {
    id: 'deskflow',
    icon: 'Headphones',
    name: 'DeskFlow',
    tagline: 'Support that feels like conversation, not tickets.',
    description: 'Omnichannel customer support platform with AI-powered responses, knowledge base, chatbot builder, and team collaboration. Designed for the AI era.',
    price: '₹1,499/agent/mo',
    features: ['Unified omnichannel inbox (Email, Chat, WhatsApp, Social)', 'AI auto-reply suggestions & sentiment detection', 'Built-in knowledge base with versioning', 'Visual chatbot builder (no-code)', 'SLA management with breach alerts', 'CSAT surveys & NPS tracking'],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'Elasticsearch', 'WebSockets'],
    screens: ['Unified Inbox with filters & priority', 'Conversation View with split pane', 'Knowledge Base Editor', 'Chatbot Flow Builder', 'SLA Dashboard & Breach Alerts', 'Reports & Agent Performance'],
    roles: ['Account Owner', 'Admin', 'Agent', 'Light Agent', 'Customer (Portal)'],
  },
  {
    id: 'signflow',
    icon: 'FileSignature',
    name: 'SignFlow',
    tagline: 'Signatures, simplified. Workflows, automated.',
    description: 'Digital signature platform — send documents for signature, create approval workflows, manage templates, and get legally binding e-signatures with full audit trails.',
    price: '₹999/mo',
    features: ['E-signatures (draw, type, upload, OTP)', 'Aadhaar eSign integration (India)', 'Visual workflow builder (sequential/parallel)', 'Reusable document templates with merge fields', 'Bulk send (1000+ recipients via CSV)', 'Tamper-proof audit trail (SHA-256)'],
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'PDF-Lib', 'AWS S3', 'Auth0'],
    screens: ['Dashboard with pending & completed envelopes', 'Send for Signature (upload & place fields)', 'Template Library with categories', 'Workflow Builder (drag-drop stages)', 'Signing Interface (clean signer UI)', 'Audit Trail & Certificate of Completion'],
    roles: ['Account Owner', 'Admin', 'Sender', 'Signer', 'API'],
  },
  {
    id: 'botforge',
    icon: 'Bot',
    name: 'BotForge',
    tagline: 'Build intelligent chatbots. No code required.',
    description: 'No-code AI chatbot builder. Build, train, and deploy conversational AI agents across website, WhatsApp, Messenger, and Slack — in minutes.',
    price: '₹1,999/mo',
    features: ['Visual flow builder (drag-drop nodes)', 'Multi-LLM support (GPT-4, Claude, Llama)', 'Upload PDFs/website for knowledge base', 'Omnichannel deployment (web, WhatsApp, social)', 'Human handoff with conversation history', 'A/B test bot responses & flows'],
    tech: ['Next.js', 'React Flow', 'Python', 'LangChain', 'Pinecone', 'OpenAI/Claude'],
    screens: ['Dashboard with bot metrics & satisfaction', 'Flow Builder with drag-drop canvas', 'Knowledge Base Manager', 'Conversation Log with search', 'Channel Setup (WhatsApp QR, widget code)', 'Analytics & Intent Breakdown'],
    roles: ['Account Owner', 'Admin', 'Builder', 'Analyst', 'Agent'],
  },
]

export default function ProductsPage() {
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
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">SaaS Products</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
              Products We Build,{' '}
              <span className="text-primary-300">Use & Ship</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-2xl">
              Every product on this page we built for ourselves first. They power our AI agents daily. Now they're available for you.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          {/* Quick comparison */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16 reveal">
            {products.map((p, i) => {
              const Icon = iconMap[p.icon] || Zap
              return (
                <Link key={p.id} href={`#${p.id}`} className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 hover:border-primary-500/30 hover:bg-white transition-all text-center group">
                  <Icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                  <div className="font-semibold text-sm text-neutral-900 group-hover:text-primary-600 transition-colors">{p.name}</div>
                  <div className="text-xs text-neutral-800 mt-1">{p.price}</div>
                </Link>
              )
            })}
          </div>

          {/* Detail sections */}
          <div className="space-y-32">
            {productDetails.map((product, idx) => {
              const Icon = iconMap[product.icon] || Zap
              return (
                <div key={product.id} id={product.id} className="reveal scroll-mt-24">
                  <div className="grid lg:grid-cols-5 gap-12">
                    {/* Left - Main content */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-heading font-bold">{product.name}</h2>
                          <p className="text-neutral-800 italic">{product.tagline}</p>
                        </div>
                      </div>
                      <p className="text-neutral-800 mb-8 leading-relaxed text-lg">{product.description}</p>

                      <h3 className="font-semibold mb-4">Key Features</h3>
                      <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                        {product.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-800">
                            <Check size={16} className="text-success mt-0.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-6">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-neutral-800 font-semibold mb-2">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.tech.map((t, i) => (
                              <span key={i} className="chip bg-neutral-100 text-neutral-800 text-xs">{t}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-neutral-800 font-semibold mb-2">User Roles</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.roles.map((r, i) => (
                              <span key={i} className="chip bg-primary-50 text-primary-600 text-xs">{r}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right - Sidebar */}
                    <div className="lg:col-span-2">
                      <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 sticky top-28">
                        <div className="text-sm text-neutral-800 mb-1">Starting from</div>
                        <div className="text-3xl font-heading font-bold gradient-text mb-6">{product.price}</div>

                        <Link href="/contact" className="btn-primary w-full mb-4">
                          Start Free Trial
                          <ArrowRight size={18} />
                        </Link>

                        <h4 className="font-semibold text-sm mb-3">App Screens</h4>
                        <ul className="space-y-2">
                          {product.screens.map((s, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-neutral-800">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Try Any Product Free for 14 Days</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">No credit card required. No human sales calls. Just AI-powered software that works.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">
            Start Free Trial
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
