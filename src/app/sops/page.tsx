'use client'

import { TrendingUp, Code2, ClipboardList, Shield, DollarSign, Headphones, Settings, Bot } from 'lucide-react'
import { PageLayout, PageHeader, PageSection } from '@/components/PageLayout'
import { StaggerGroup } from '@/components/ScrollAnimations'

const sops = [
  { dept: 'Sales', icon: TrendingUp, steps: ['AI scans LinkedIn/website for lead signals', 'Lead captured and qualified automatically', 'AI generates personalized proposal', 'Proposal sent via email + WhatsApp', 'Follow-up sequence triggers based on engagement'], owner: 'SalesAgent-Mu' },
  { dept: 'Development', icon: Code2, steps: ['Requirements analyzed by AI architect', 'Sprint backlog generated automatically', 'Tasks assigned to specialized dev agents', 'Code generated, reviewed, and tested', 'CI/CD pipeline builds and deploys'], owner: 'DevAgent-Alpha' },
  { dept: 'Testing', icon: ClipboardList, steps: ['AI reads feature specification', 'Generates comprehensive test cases', 'Executes automated tests (unit/integration/e2e)', 'Performance testing with k6', 'Security scanning with OWASP ZAP'], owner: 'QAAgent-Delta' },
  { dept: 'Deployment', icon: Settings, steps: ['Code merged to staging branch', 'Auto-builds Docker images', 'Runs integration test suite', 'Deploys to staging environment', 'Promotes to production with zero downtime'], owner: 'DevOpsAgent-Epsilon' },
  { dept: 'Support', icon: Headphones, steps: ['Ticket auto-assigned by AI triage', 'AI searches knowledge base for solution', 'Responds with contextual answer', 'Escalates to specialized agent if needed', 'Follows up for CSAT rating'], owner: 'SupportAgent' },
  { dept: 'Finance', icon: DollarSign, steps: ['Track all project milestones', 'Generate invoice on milestone completion', 'Send invoice to client', 'Monitor payment status', 'Reconcile payments in dashboard'], owner: 'FinanceAgent' },
  { dept: 'Security', icon: Shield, steps: ['Daily vulnerability scans', 'Monitor access logs for anomalies', 'Review agent actions for compliance', 'Run penetration tests monthly', 'Generate compliance reports'], owner: 'SecurityAgent-Iota' },
  { dept: 'HR/AI Management', icon: Bot, steps: ['Monitor agent performance metrics', 'Identify underperforming agents', 'Trigger fine-tuning or retraining', 'Update agent model versions', 'Report weekly to orchestrator'], owner: 'Orchestrator' },
]

export default function SOPsPage() {
  return (
    <PageLayout>
      <PageHeader badge="SOPs" title="Standard Operating Procedures" subtitle="Every process documented · AI-executed · Continuously optimized." />
      <PageSection>
        <StaggerGroup className="grid md:grid-cols-2 gap-6">
          {sops.map((sop) => {
            const Icon = sop.icon
            return (
              <div key={sop.dept} className="card-responsive hover:shadow-lg hover:border-primary-500/20 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white">{sop.dept}</h3>
                    <span className="text-xs text-neutral-500">Owned by: {sop.owner}</span>
                  </div>
                </div>
                <ol className="space-y-2">
                  {sop.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{j + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )
          })}
        </StaggerGroup>
      </PageSection>
    </PageLayout>
  )
}
