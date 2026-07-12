'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Settings, CheckCircle2 } from 'lucide-react'

const ops = [
  { area: 'Client Onboarding', process: 'Automated intake form → AI qualification → Contract generation → Agent assignment → Welcome sequence → Kickoff call scheduling → Access provisioning', owner: 'SalesAgent-Mu + Orchestrator' },
  { area: 'Project Delivery', process: 'Requirements analysis → Sprint planning → Development → Code review → QA testing → Deployment → Client sign-off → Documentation', owner: 'DevAgent-Alpha + QAAgent-Delta' },
  { area: 'Quality Assurance', process: 'Test plan creation → Automated test execution → Bug tracking → Regression testing → Performance testing → Security scanning → Report generation', owner: 'QAAgent-Delta' },
  { area: 'Client Communication', process: 'Daily progress updates → Milestone notifications → Dashboard refresh → Weekly summary → Feedback collection → Satisfaction survey', owner: 'Orchestrator (auto)' },
  { area: 'Invoice & Payments', process: 'Timesheet sync → Invoice generation → Client approval → Payment collection → Receipt delivery → Reconciliation → Reporting', owner: 'FinanceAgent (auto)' },
  { area: 'Incident Response', process: 'Alert detection → Severity classification → Agent routing → Resolution → Post-mortem → Prevention implementation', owner: 'SecurityAgent-Iota' },
]

export default function OpsPage() {
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
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Operations</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">AI-Driven <span className="text-primary-300">Operations</span></h1>
            <p className="text-xl text-neutral-300">Every process is automated, monitored, and optimized — 24/7, zero human intervention.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="space-y-6 reveal">
            {ops.map((o, i) => (
              <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-heading font-bold">{o.area}</h2>
                  <span className="chip bg-primary-50 text-primary-600 text-xs">{o.owner}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600">
                  {o.process.split('→').map((step, j) => (
                    <span key={j} className="flex items-center gap-1">
                      <CheckCircle2 size={14} className="text-success shrink-0" />
                      <span>{step.trim()}</span>
                      {j < o.process.split('→').length - 1 && <span className="text-neutral-300 mx-1">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Operational Excellence, Automated</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">Every process runs on AI. No delays, no errors, no excuses.</p>
          <Link href="/contact" className="btn-white text-lg px-8 py-4">See It in Action <ArrowRight size={20} /></Link>
        </div>
      </section>
    </>
  )
}
