'use client'

import Link from 'next/link'
import { ArrowRight, Check, KanbanSquare, Activity, Headphones, FileSignature, Bot, Zap } from 'lucide-react'
import { products } from '@/lib/data'
import { PageLayout, PageHeader } from '@/components/PageLayout'
import { AnimatedSection } from '@/components/ScrollAnimations'

const iconMap: Record<string, any> = { KanbanSquare, Activity, Headphones, FileSignature, Bot }

const productDetails = [
  { id: 'flowsprint', icon: 'KanbanSquare', name: 'FlowSprint', tagline: 'Project management that doesn\'t get in the way.', description: 'AI-powered sprint planning, Kanban, Gantt, time tracking, and resource management.', price: '499/user/mo', features: ['Task management with subtasks & dependencies', 'Kanban, Gantt, Calendar & Timeline views', 'AI-powered sprint planning & estimation', 'Built-in time tracking with billable rates', 'Resource management & workload heatmap', 'Integrations: Slack, GitHub, Figma, Zapier'], tech: ['Next.js 14', 'React', 'Node.js', 'PostgreSQL', 'Redis'], screens: ['Dashboard with My Tasks & Sprint Progress', 'Kanban Board with drag-drop', 'Gantt/Timeline View', 'Task Detail with comments & time log', 'Sprint Planning with capacity view', 'Team Workload Heatmap'], roles: ['Workspace Owner', 'Admin', 'Project Manager', 'Team Member', 'Viewer', 'Guest'] },
  { id: 'pulseai', icon: 'Activity', name: 'PulseAI', tagline: 'Your data. Intelligent. Real-time.', description: 'AI-powered BI platform with 20+ chart types, natural language query, and anomaly detection.', price: '2,499/mo', features: ['Connect 10+ data sources (SQL, NoSQL, APIs)', 'Drag-drop dashboard builder with 20+ chart types', 'Natural Language Query (ask in plain English)', 'AI anomaly detection & forecasting', 'Automated scheduled reports', 'Row-level security & audit logs'], tech: ['Next.js', 'TypeScript', 'Python (AI)', 'ClickHouse', 'LangChain'], screens: ['Dashboard Builder with drag-drop canvas', 'Query Editor (SQL + NLQ)', 'Data Source Connection Manager', 'Anomaly Detection Alerts', 'Scheduled Report Settings', 'Admin Panel with audit logs'], roles: ['Admin', 'Analyst', 'Viewer', 'Embed (read-only)'] },
  { id: 'deskflow', icon: 'Headphones', name: 'DeskFlow', tagline: 'Support that feels like conversation, not tickets.', description: 'Omnichannel customer support with AI auto-reply, knowledge base, and no-code chatbot builder.', price: '1,499/agent/mo', features: ['Unified omnichannel inbox (Email, Chat, WhatsApp, Social)', 'AI auto-reply suggestions & sentiment detection', 'Built-in knowledge base with versioning', 'Visual chatbot builder (no-code)', 'SLA management with breach alerts', 'CSAT surveys & NPS tracking'], tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'WebSockets'], screens: ['Unified Inbox with filters & priority', 'Conversation View with split pane', 'Knowledge Base Editor', 'Chatbot Flow Builder', 'SLA Dashboard & Breach Alerts', 'Reports & Agent Performance'], roles: ['Account Owner', 'Admin', 'Agent', 'Light Agent', 'Customer (Portal)'] },
  { id: 'signflow', icon: 'FileSignature', name: 'SignFlow', tagline: 'Signatures, simplified. Workflows, automated.', description: 'Digital signature platform with Aadhaar eSign, workflow builder, templates, and audit trails.', price: '999/mo', features: ['E-signatures (draw, type, upload, OTP)', 'Aadhaar eSign integration (India)', 'Visual workflow builder (sequential/parallel)', 'Reusable document templates with merge fields', 'Bulk send (1000+ recipients via CSV)', 'Tamper-proof audit trail (SHA-256)'], tech: ['Next.js', 'Node.js', 'PostgreSQL', 'PDF-Lib', 'AWS S3'], screens: ['Dashboard with pending & completed envelopes', 'Send for Signature (upload & place fields)', 'Template Library with categories', 'Workflow Builder (drag-drop stages)', 'Signing Interface (clean signer UI)', 'Audit Trail & Certificate of Completion'], roles: ['Account Owner', 'Admin', 'Sender', 'Signer', 'API'] },
  { id: 'botforge', icon: 'Bot', name: 'BotForge', tagline: 'Build intelligent chatbots. No code required.', description: 'No-code AI chatbot builder with multi-LLM support, RAG knowledge base, and omnichannel deployment.', price: '1,999/mo', features: ['Visual flow builder (drag-drop nodes)', 'Multi-LLM support (GPT-4, Claude, Llama)', 'Upload PDFs/website for knowledge base', 'Omnichannel deployment (web, WhatsApp, social)', 'Human handoff with conversation history', 'A/B test bot responses & flows'], tech: ['Next.js', 'React Flow', 'Python', 'LangChain', 'Pinecone'], screens: ['Dashboard with bot metrics & satisfaction', 'Flow Builder with drag-drop canvas', 'Knowledge Base Manager', 'Conversation Log with search', 'Channel Setup (WhatsApp QR, widget code)', 'Analytics & Intent Breakdown'], roles: ['Account Owner', 'Admin', 'Builder', 'Analyst', 'Agent'] },
]

export default function ProductsPage() {
  return (
    <PageLayout>
      <PageHeader badge="SaaS Products" title="Products We Build, Use & Ship" subtitle="Every product on this page we built for ourselves first. They power our AI agents daily. Now they're available for you." />

      <section className="section-padding bg-white dark:bg-neutral-950">
        <div className="section-container">
          {/* Quick nav — scrollable row on mobile, grid on desktop */}
          <div className="flex overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 sm:gap-4 pb-2 mb-10 sm:mb-16 sm:grid sm:grid-cols-5 scrollbar-none snap-x">
            {products.map((p) => {
              const Icon = iconMap[p.icon] || Zap
              return (
                <Link key={p.id} href={`#${p.id}`} className="snap-start shrink-0 sm:shrink bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 hover:border-primary-500/30 hover:bg-white dark:hover:bg-neutral-700 transition-all text-center group min-w-[120px] sm:min-w-0">
                  <Icon className="w-5 h-5 text-primary-500 mx-auto mb-1.5 group-hover:scale-105 transition-transform" />
                  <div className="font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white group-hover:text-primary-600 transition-colors leading-tight">{p.name}</div>
                  <div className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">{p.price}</div>
                </Link>
              )
            })}
          </div>

          {/* Product details */}
          <div className="space-y-24 sm:space-y-32">
            {productDetails.map((product) => {
              const Icon = iconMap[product.icon] || Zap
              return (
                <AnimatedSection key={product.id} animation="fade-up">
                  <div id={product.id} className="grid lg:grid-cols-5 gap-8 lg:gap-12 scroll-mt-24">
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-2xl sm:text-3xl font-heading font-bold dark:text-white">{product.name}</h2>
                          <p className="text-neutral-500 dark:text-neutral-400 italic text-sm truncate">{product.tagline}</p>
                        </div>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">{product.description}</p>

                      <h3 className="font-semibold mb-3 sm:mb-4 dark:text-white text-sm">Key Features</h3>
                      <ul className="grid sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
                        {product.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                            <Check size={15} className="text-success mt-0.5 shrink-0" />
                            <span className="leading-snug">{f}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="min-w-0">
                          <h4 className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold mb-2">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.tech.map((t) => (
                              <span key={t} className="chip bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs">{t}</span>
                            ))}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold mb-2">User Roles</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.roles.map((r) => (
                              <span key={r} className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs">{r}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 lg:sticky lg:top-28">
                        <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Starting from</div>
                        <div className="text-2xl sm:text-3xl font-heading font-bold text-primary-600 dark:text-primary-400 mb-6">{product.price}</div>
                        <Link href="/contact" className="btn-primary w-full text-center mb-6">Start Free Trial <ArrowRight size={18} /></Link>
                        <h4 className="font-semibold text-sm mb-3 dark:text-white">App Screens</h4>
                        <ul className="space-y-2">
                          {product.screens.map((s, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                              <span className="leading-snug">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 sm:mb-4">Try Any Product Free for 14 Days</h2>
          <p className="text-primary-200 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">No credit card required. AI-powered software that works.</p>
          <Link href="/contact" className="btn-white text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4">Start Free Trial <ArrowRight size={18} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}
