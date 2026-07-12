'use client'

import { LayoutDashboard, TrendingUp, Users, DollarSign, Target, BarChart3, Cpu, Headphones, Settings, PieChart, Activity, ArrowRight } from 'lucide-react'

export default function DashboardsPage() {
  const dashboards = [
    { role: 'CEO', icon: LayoutDashboard, kpis: ['Revenue: ₹79.8L (Y1)', 'Active Projects: 6', 'Pipeline: ₹63.5L', 'Agent Efficiency: 95.2%', 'Client NPS: 72'], charts: ['Revenue Trend', 'Project Health', 'Pipeline Funnel', 'Agent Performance'], color: 'from-amber-500 to-orange-600' },
    { role: 'Finance', icon: DollarSign, kpis: ['Income: ₹10.85L (MTD)', 'Expenses: ₹1.04L', 'Profit Margin: 90.4%', 'Pending Invoices: ₹2.37L', 'Cash Flow: Positive'], charts: ['P&L Statement', 'Cash Flow', 'Expense Breakdown', 'Revenue Forecast'], color: 'from-emerald-500 to-green-600' },
    { role: 'HR', icon: Users, kpis: ['Active Agents: 11/12', 'Avg Efficiency: 95.2%', 'Tasks Today: 78', 'Uptime: 99.95%', 'Zero Absenteeism'], charts: ['Agent Status', 'Efficiency Trend', 'Task Distribution', 'Performance Rank'], color: 'from-blue-500 to-indigo-600' },
    { role: 'Sales', icon: Target, kpis: ['Pipeline: ₹63.5L', 'Weighted: ₹28.7L', 'Won (Qtr): ₹18.5L', 'Conversion: 34%', 'Leads: 24 (30d)'], charts: ['Pipeline Funnel', 'Win Rate', 'Lead Sources', 'Sales Velocity'], color: 'from-violet-500 to-purple-600' },
    { role: 'Marketing', icon: BarChart3, kpis: ['Website Visits: 2,450/wk', 'Leads Generated: 24', 'Email Open Rate: 45%', 'Social Followers: 4,500', 'Content Published: 32'], charts: ['Traffic Sources', 'Conversion Funnel', 'Social Growth', 'Content Performance'], color: 'from-pink-500 to-rose-600' },
    { role: 'Projects', icon: Activity, kpis: ['Active: 6', 'On Track: 4', 'At Risk: 1', 'Completed (Mo): 2', 'Avg Completion: 92%'], charts: ['Project Timeline', 'Sprint Velocity', 'Resource Allocation', 'Risk Matrix'], color: 'from-cyan-500 to-teal-600' },
    { role: 'Client Success', icon: Headphones, kpis: ['Active Clients: 8', 'CSAT: 4.9/5', 'Open Tickets: 2', 'Avg Response: <2min', 'Retention: 94%'], charts: ['Satisfaction Trend', 'Ticket Volume', 'Response Time', 'NPS Score'], color: 'from-primary-500 to-accent-500' },
    { role: 'Operations', icon: Settings, kpis: ['System Uptime: 99.99%', 'Tasks Completed: 78', 'Deployments: 12', 'Agent Idle: 1', 'Cost per Task: ₹0'], charts: ['System Health', 'Task Volume', 'Deployment Frequency', 'Cost Analysis'], color: 'from-neutral-600 to-neutral-800' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Step 15</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Executive <span className="text-primary-300">Dashboards</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">Live AI-generated dashboards for every department. Real-time KPIs, charts, and forecasting.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboards.map((d, i) => {
              const Icon = d.icon
              return (
                <div key={i} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-all group">
                  <div className={`bg-gradient-to-r ${d.color} p-4 text-white`}>
                    <div className="flex items-center gap-2"><Icon size={18} /><h3 className="font-semibold">{d.role}</h3></div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-neutral-400 uppercase mb-2">Key KPIs</div>
                      {d.kpis.map((kpi, j) => <div key={j} className="text-sm text-neutral-600 py-1 border-b border-neutral-100 last:border-0">{kpi}</div>)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-400 uppercase mb-2">Charts</div>
                      <div className="flex flex-wrap gap-1.5">
                        {d.charts.map((c, j) => <span key={j} className="chip bg-primary-50 text-primary-600 text-[10px]">{c}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl border border-primary-500/20 p-8 text-center">
            <h2 className="text-2xl font-heading font-bold mb-2">Built Into Every Portal</h2>
            <p className="text-neutral-500">These dashboards are live in the Admin Panel and Client Portal. Every KPI updates in real-time via AI agents.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
