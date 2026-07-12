'use client'

import { Check, ArrowRight, RefreshCw, FileText, Download, CreditCard, Bell, Calendar, TrendingUp, BarChart3, Users } from 'lucide-react'

export default function BusinessAutomationPage() {
  const automations = [
    { name: 'Client Onboarding', trigger: 'Contract signed', steps: ['Welcome email sent', 'Project space created', 'GitHub repo initialized', 'Sprint 0 scheduled', 'Client portal access granted'], time: '30 seconds' },
    { name: 'Proposal Creation', trigger: 'Lead qualified', steps: ['AI analyzes lead data', 'Generates scope document', 'Calculates pricing', 'Creates professional PDF', 'Sent via email + WhatsApp'], time: '2 minutes' },
    { name: 'Contract Generation', trigger: 'Proposal accepted', steps: ['Pulls proposal data', 'Generates legal contract', 'Adds e-signature fields', 'Sends for signing', 'Stores signed copy'], time: '1 minute' },
    { name: 'Invoice Generation', trigger: 'Milestone completed', steps: ['AI calculates billing', 'Generates invoice PDF', 'Sends to client', 'Updates finance dashboard', 'Sets payment reminder'], time: '30 seconds' },
    { name: 'Payment Collection', trigger: 'Invoice due', steps: ['Sends payment reminder (Day 1)', 'Follow-up with link (Day 3)', 'WhatsApp reminder (Day 5)', 'Escalation notice (Day 7)', 'Auto-pauses project (Day 10)'], time: 'Automated lifecycle' },
    { name: 'Project Updates', trigger: 'Daily at 9 AM', steps: ['Compiles sprint progress', 'Generates status report', 'Updates client dashboard', 'Sends email summary', 'Logs to project timeline'], time: '15 seconds' },
    { name: 'Sprint Review', trigger: 'Sprint end', steps: ['Collates completed tasks', 'Generates velocity report', 'Creates retrospective', 'Plans next sprint', 'Updates stakeholders'], time: '2 minutes' },
    { name: 'Client Reporting', trigger: 'Weekly', steps: ['Aggregates all metrics', 'Generates visual report', 'Compare vs targets', 'Anomaly detection', 'PDF delivered to portal'], time: '45 seconds' },
    { name: 'Employee Attendance', trigger: 'Real-time', steps: ['Monitors agent status', 'Logs active hours', 'Tracks tasks completed', 'Calculates efficiency', 'Updates HR dashboard'], time: 'Continuous' },
    { name: 'Leave & Time-off', trigger: 'Not applicable', steps: ['AI agents don\'t take leaves', '24/7/365 operation', 'Zero absenteeism', 'Zero scheduling conflicts', 'No backup needed'], time: 'N/A' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Step 14</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Business <span className="text-primary-300">Automation</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">Every business process fully automated. From lead to delivery — zero manual intervention.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-4">
            {automations.map((a, i) => (
              <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:shadow-lg hover:border-primary-500/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-neutral-900">{a.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-neutral-800"><RefreshCw size={12} /> {a.time}</div>
                </div>
                <div className="text-xs text-neutral-800 mb-2">Trigger: {a.trigger}</div>
                <ol className="space-y-1.5">
                  {a.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-neutral-800">
                      <Check size={14} className="text-success mt-0.5 shrink-0" />
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
