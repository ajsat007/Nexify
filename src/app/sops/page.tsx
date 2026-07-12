'use client'

import { Check, ArrowRight, ClipboardList, Code2, Shield, Users, DollarSign, TrendingUp, Headphones, Settings, Bot } from 'lucide-react'

export default function SOPsPage() {
  const sops = [
    { dept: 'Sales', icon: TrendingUp, steps: ['AI scans LinkedIn/website for lead signals', 'Lead captured and qualified automatically', 'AI generates personalized proposal', 'Proposal sent via email + WhatsApp', 'Follow-up sequence triggers based on engagement', 'Deal moved to negotiation → closed'], owner: 'SalesAgent-Mu' },
    { dept: 'Development', icon: Code2, steps: ['Requirements analyzed by AI architect', 'Sprint backlog generated automatically', 'Tasks assigned to specialized dev agents', 'Code generated, reviewed, and tested', 'CI/CD pipeline builds and deploys', 'AI QA agent validates and reports'], owner: 'DevAgent-Alpha' },
    { dept: 'Testing', icon: ClipboardList, steps: ['AI reads feature specification', 'Generates comprehensive test cases', 'Executes automated tests (unit/integration/e2e)', 'Performance testing with k6', 'Security scanning with OWASP ZAP', 'Generates QA report with coverage metrics'], owner: 'QAAgent-Delta' },
    { dept: 'Deployment', icon: Settings, steps: ['Code merged to staging branch', 'Auto-builds Docker images', 'Runs integration test suite', 'Deploys to staging environment', 'Smoke tests pass automatically', 'Promotes to production with zero downtime'], owner: 'DevOpsAgent-Epsilon' },
    { dept: 'Support', icon: Headphones, steps: ['Ticket auto-assigned by AI triage', 'AI searches knowledge base for solution', 'Responds with contextual answer', 'Escalates to specialized agent if needed', 'Follows up for CSAT rating', 'Updates knowledge base from resolution'], owner: 'SupportAgent' },
    { dept: 'HR/AI Management', icon: Bot, steps: ['Monitor agent performance metrics', 'Identify underperforming agents', 'Trigger fine-tuning or retraining', 'Update agent model versions', 'Log all changes in audit trail', 'Report weekly to orchestrator'], owner: 'Orchestrator' },
    { dept: 'Finance', icon: DollarSign, steps: ['Track all project milestones', 'Generate invoice on milestone completion', 'Send invoice to client', 'Monitor payment status', 'Trigger reminders on due dates', 'Reconcile payments in dashboard'], owner: 'FinanceAgent' },
    { dept: 'Security', icon: Shield, steps: ['Daily vulnerability scans', 'Monitor access logs for anomalies', 'Review agent actions for compliance', 'Run penetration tests monthly', 'Update security patches automatically', 'Generate compliance reports'], owner: 'SecurityAgent-Iota' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Step 16</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Standard Operating <span className="text-primary-300">Procedures</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">Every process documented · AI-executed · Continuously optimized.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-6">
            {sops.map((sop, i) => {
              const Icon = sop.icon
              return (
                <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:shadow-xl hover:border-primary-500/20 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center"><Icon className="w-5 h-5 text-primary-500" /></div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{sop.dept}</h3>
                      <span className="text-xs text-neutral-600">Owned by: {sop.owner}</span>
                    </div>
                  </div>
                  <ol className="space-y-2">
                    {sop.steps.map((step, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{j + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
