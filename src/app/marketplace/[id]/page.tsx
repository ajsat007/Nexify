'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Star, Clock, CheckCircle2, Zap, Bot, Cpu,
  Shield, Users, TrendingUp, Code2, Sparkles, Layers,
  Download, Copy, Check, ExternalLink, ChevronRight,
} from 'lucide-react'
import { PageLayout } from '@/components/PageLayout'
import { getAgentById } from '@/lib/agents/catalog'
import { AnimatedSection } from '@/components/ScrollAnimations'

const categoryIcons: Record<string, any> = {
  research: Cpu, coding: Code2, data: Layers, content: Sparkles,
  communication: Zap, finance: Cpu, healthcare: Shield, legal: Shield,
  marketing: TrendingUp, sales: Users, support: Bot, devops: Cpu,
  security: Shield, hr: Users, productivity: Zap, education: Cpu,
  ecommerce: Users, social: Users, travel: Zap, analytics: Layers,
}

const pricingLabels: Record<string, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
}

const pricingColors: Record<string, string> = {
  free: 'chip-success',
  starter: 'chip-primary',
  pro: 'chip-warning',
  enterprise: 'chip-error',
}

export default function AgentDetailPage() {
  const params = useParams()
  const agent = getAgentById(params.id as string)
  const Icon = categoryIcons[agent?.category || 'research'] || Bot

  if (!agent) {
    return (
      <PageLayout>
        <div className="section-container py-20 text-center">
          <Bot size={48} className="mx-auto mb-4 text-surface-300" />
          <h1 className="text-2xl font-heading font-bold mb-2 dark:text-white">Agent Not Found</h1>
          <p className="text-surface-500 mb-4">This agent doesn't exist in our catalog yet.</p>
          <Link href="/marketplace" className="btn-primary">Browse Marketplace</Link>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-surface-950 border-b border-surface-100 dark:border-surface-800">
        <div className="section-container py-3">
          <div className="flex items-center gap-2 text-xs text-surface-500 dark:text-surface-400">
            <Link href="/marketplace" className="hover:text-primary-500 transition-colors">Marketplace</Link>
            <ChevronRight size={12} />
            <span className="text-surface-700 dark:text-surface-300">{agent.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white dark:bg-surface-950 border-b border-surface-100 dark:border-surface-800">
        <div className="section-container py-10 sm:py-14">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/20">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-heading font-bold dark:text-white">{agent.name}</h1>
                    <span className={`chip ${pricingColors[agent.pricing] || 'chip-surface'} text-[10px]`}>{pricingLabels[agent.pricing]}</span>
                  </div>
                  <p className="text-surface-500 dark:text-surface-400 text-sm">{agent.description}</p>
                </div>
              </div>

              <p className="text-surface-700 dark:text-surface-300 text-sm leading-relaxed mb-6">
                {agent.longDescription}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-3 sm:gap-6 text-xs">
                <span className="flex items-center gap-1.5 text-surface-500"><Star size={13} className="text-amber-400" fill="currentColor" />{agent.rating} rating</span>
                <span className="flex items-center gap-1.5 text-surface-500"><Download size={13} />{agent.downloads.toLocaleString()} downloads</span>
                <span className="flex items-center gap-1.5 text-surface-500"><Clock size={13} />{agent.latencyEstimate}</span>
                <span className="flex items-center gap-1.5 text-surface-500">{agent.costEstimate}</span>
                <span className={`flex items-center gap-1.5 ${agent.deploymentStatus === 'ready' ? 'text-emerald-500' : 'text-amber-500'}`}>
                  <CheckCircle2 size={13} /> {agent.deploymentStatus === 'ready' ? 'Ready to deploy' : 'Requires setup'}
                </span>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-6 space-y-4">
                <Link href="/contact" className="btn-primary w-full text-center text-sm">
                  <Zap size={14} /> Deploy This Agent
                </Link>
                <button className="btn-secondary w-full text-sm">
                  <Copy size={14} /> Clone Configuration
                </button>

                <div className="pt-4 border-t border-surface-100 dark:border-surface-800 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-surface-500">Framework</span>
                    <span className="font-medium dark:text-white capitalize">{agent.framework}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Version</span>
                    <span className="font-medium dark:text-white">{agent.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Model</span>
                    <span className="font-medium dark:text-white">{agent.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Security</span>
                    <span className="font-medium capitalize dark:text-white">{agent.securityLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Memory</span>
                    <span className={`font-medium ${agent.memory ? 'text-emerald-500' : 'text-surface-400'}`}>{agent.memory ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">Knowledge Base</span>
                    <span className={`font-medium ${agent.knowledgeBase ? 'text-emerald-500' : 'text-surface-400'}`}>{agent.knowledgeBase ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-surface-500">MCP Compatible</span>
                    <span className={`font-medium ${agent.mcpCompatible ? 'text-emerald-500' : 'text-surface-400'}`}>{agent.mcpCompatible ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="section-padding bg-white dark:bg-surface-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Workflows */}
            <AnimatedSection animation="fade-up">
              <div className="card p-6">
                <h3 className="font-semibold text-sm mb-4 dark:text-white">Workflow</h3>
                <div className="space-y-3">
                  {agent.workflows.map((wf, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-primary-500">
                        {wf.split(' → ').map((step, j) => (
                          <span key={j} className="flex items-center gap-1.5">
                            <span className="chip-primary text-[10px]">{step}</span>
                            {j < wf.split(' → ').length - 1 && <ChevronRight size={12} className="text-surface-300" />}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Tools */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="card p-6">
                <h3 className="font-semibold text-sm mb-4 dark:text-white">Required Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {agent.tools.map(t => (
                    <span key={t} className="chip-surface text-xs">{t.replace(/_/g, ' ')}</span>
                  ))}
                </div>
                <h3 className="font-semibold text-sm mt-6 mb-4 dark:text-white">APIs</h3>
                <div className="flex flex-wrap gap-2">
                  {agent.apis.map(api => (
                    <span key={api} className="chip-primary text-xs">{api}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* System Prompt */}
            <AnimatedSection animation="fade-up">
              <div className="card p-6">
                <h3 className="font-semibold text-sm mb-4 dark:text-white">System Prompt</h3>
                <div className="bg-surface-50 dark:bg-surface-900 rounded-xl p-4 text-xs font-mono text-surface-700 dark:text-surface-300 leading-relaxed whitespace-pre-wrap">
                  {agent.systemPrompt}
                </div>
              </div>
            </AnimatedSection>

            {/* Setup */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="card p-6">
                <h3 className="font-semibold text-sm mb-4 dark:text-white">Quick Setup</h3>
                <div className="space-y-2">
                  {agent.setupCommands.map((cmd, i) => (
                    <div key={i} className="bg-surface-900 dark:bg-surface-900 rounded-lg px-4 py-2.5 text-xs font-mono text-emerald-400 flex items-center justify-between">
                      <span>$ {cmd}</span>
                      <button className="text-surface-500 hover:text-white transition-colors shrink-0 ml-2">
                        <Copy size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Example Conversation */}
            <AnimatedSection animation="fade-up">
              <div className="card p-6 lg:col-span-2">
                <h3 className="font-semibold text-sm mb-4 dark:text-white">Example Conversation</h3>
                <div className="space-y-3">
                  {agent.exampleConversation.map((conv, i) => (
                    <div key={i} className={`flex gap-3 ${i % 2 === 0 ? 'items-start' : 'items-start flex-row-reverse'}`}>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        i % 2 === 0 ? 'bg-primary-500 text-white' : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-300'
                      }`}>
                        {i % 2 === 0 ? 'U' : 'A'}
                      </div>
                      <div className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed ${
                        i % 2 === 0
                          ? 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300'
                          : 'bg-primary-500/10 text-surface-700 dark:text-surface-300'
                      }`}>
                        {conv}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
