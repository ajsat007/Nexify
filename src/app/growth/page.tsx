'use client'

import { ArrowRight, Check, Target, TrendingUp, Users, DollarSign, BarChart3, Zap, Globe, Award, Rocket, Calendar } from 'lucide-react'

export default function GrowthPage() {
  const phases = [
    {
      period: '30 Days', icon: Zap, color: 'from-green-500 to-emerald-600',
      goals: ['Deploy 10 AI agents across all functions', 'Launch website with all 15+ pages', 'Activate SalesAgent-Mu for lead gen', 'Publish 15+ pieces of content', 'Onboard first 3 clients'],
      metrics: ['5 active projects', '12L pipeline', '50 LinkedIn followers', '3 published case studies'],
    },
    {
      period: '90 Days', icon: Target, color: 'from-blue-500 to-indigo-600',
      goals: ['Expand to 25 AI agents', 'Launch 3 SaaS products (FlowSprint, DeskFlow, SignFlow)', 'Reach 100+ LinkedIn followers', '10 published blog posts', '5 client testimonials'],
      metrics: ['15 active projects', '35L revenue', '15% conversion rate', '4.8 CSAT'],
    },
    {
      period: '6 Months', icon: Globe, color: 'from-violet-500 to-purple-600',
      goals: ['50 AI agents deployed', '5 SaaS products live', 'Client portal and admin panel refined', '200+ LinkedIn followers', 'Partnerships with 3 agencies'],
      metrics: ['30 active projects', '85L annualized revenue', '20% month-over-month growth', '50+ leads in pipeline'],
    },
    {
      period: '1 Year', icon: Award, color: 'from-amber-500 to-orange-600',
      goals: ['To be #1 AI-native software company in India', '100 AI agents', 'SaaS ARR of 25L', '500+ projects delivered', 'Global client base across 20 countries'],
      metrics: ['2.1Cr revenue', '96% profit margin', '50+ enterprise clients', '4.9/5 avg rating'],
    },
    {
      period: '3 Years', icon: Rocket, color: 'from-primary-500 to-accent-500',
      goals: ['IPO-ready company', '500+ AI agents', 'SaaS ARR 2Cr+', 'Global offices (AI-managed)', 'Industry leader in AI-native development'],
      metrics: ['12Cr+ revenue', '500+ employees (AI)', '10,000+ projects', 'Global top-10 AI services company'],
    },
    {
      period: '5 Years', icon: TrendingUp, color: 'from-red-500 to-rose-600',
      goals: ['50Cr+ valuation', 'Fully autonomous company', 'AI agents training other AI agents', 'Nexify AI Platform (agent marketplace)', 'Zero human employees'],
      metrics: ['50Cr+ revenue', '2,000+ AI agents', '100,000+ projects', '#1 AI-native company globally'],
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Step 19</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Growth <span className="text-primary-300">Roadmap</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">From 10 AI agents to a fully autonomous global corporation. Zero humans. Infinite scale.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="space-y-8">
            {phases.map((phase, i) => {
              const Icon = phase.icon
              return (
                <div key={i} className="relative">
                  {/* Timeline connector */}
                  {i < phases.length - 1 && <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-neutral-200 hidden lg:block" />}
                  <div className={`bg-gradient-to-r ${phase.color} rounded-2xl p-1`}>
                    <div className="bg-white rounded-xl p-6 lg:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        <div className="flex items-center gap-4 lg:w-48 shrink-0">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="text-2xl font-heading font-bold text-neutral-900">{phase.period}</div>
                            <div className="text-xs text-neutral-800">Phase {i + 1}</div>
                          </div>
                        </div>
                        <div className="flex-1 grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-xs font-semibold text-neutral-800 uppercase mb-3">Goals</h4>
                            <ul className="space-y-2">
                              {phase.goals.map((g, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-neutral-800">
                                  <Check size={16} className="text-success mt-0.5 shrink-0" />{g}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-neutral-800 uppercase mb-3">Target Metrics</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {phase.metrics.map((m, j) => (
                                <div key={j} className="bg-neutral-50 rounded-xl p-3 text-center">
                                  <div className="text-primary-500 font-heading font-bold text-lg">{m.split(' ')[0]}</div>
                                  <div className="text-[10px] text-neutral-800">{m}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary */}
          <div className="mt-12 bg-neutral-900 rounded-2xl p-8 text-center">
            <Rocket className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-white mb-2">The Destination</h2>
            <p className="text-neutral-800 max-w-xl mx-auto">A fully autonomous AI company. Zero humans. Zero operating cost. Unlimited scale. Generating 50Cr+ in revenue through AI agents building software for the world.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
