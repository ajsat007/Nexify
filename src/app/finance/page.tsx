'use client'

import { ArrowRight, Check, DollarSign, TrendingUp, BarChart3, PieChart, Target, Calendar, Download } from 'lucide-react'

export default function FinancePage() {
  const projections = [
    { year: 'Year 1', revenue: '₹85L', expenses: '₹5.2L', profit: '₹79.8L', margin: '93.9%', clients: 25, agents: 15 },
    { year: 'Year 2', revenue: '₹2.1Cr', expenses: '₹8.5L', profit: '₹2.01Cr', margin: '95.9%', clients: 50, agents: 25 },
    { year: 'Year 3', revenue: '₹4.5Cr', expenses: '₹12L', profit: '₹4.38Cr', margin: '97.3%', clients: 100, agents: 50 },
    { year: 'Year 5', revenue: '₹12Cr', expenses: '₹25L', profit: '₹11.75Cr', margin: '97.9%', clients: 250, agents: 100 },
  ]

  const monthlyExpenses = [
    { category: 'AI API / Compute', amount: 45000, pct: 43 },
    { category: 'Cloud Infrastructure', amount: 32000, pct: 31 },
    { category: 'Domain & SaaS Tools', amount: 12000, pct: 12 },
    { category: 'Misc (research, datasets)', amount: 15000, pct: 14 },
  ]

  const totalMonthly = monthlyExpenses.reduce((s, e) => s + e.amount, 0)

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Step 10</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Financial <span className="text-primary-300">Projections</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">Zero human labor = 95%+ profit margins. All projections are conservative estimates.</p>
          </div>
        </div>
      </section>

      {/* Key metrics */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: DollarSign, label: 'Total Startup Cost', value: '₹0', sub: 'Zero capital required' },
              { icon: TrendingUp, label: 'Monthly Operating Cost', value: `₹${(totalMonthly/1000).toFixed(0)}K`, sub: 'All infra included' },
              { icon: BarChart3, label: 'Avg Project Margin', value: '96%', sub: 'vs 20% traditional agency' },
              { icon: Target, label: 'Break-even', value: 'Day 1', sub: 'No upfront investment' },
            ].map((s, i) => (
              <div key={i} className="text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
                <s.icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                <div className="text-2xl font-heading font-bold gradient-text">{s.value}</div>
                <div className="text-sm text-neutral-500 mt-1">{s.label}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Expense Breakdown */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
              <h2 className="font-semibold text-lg mb-4">Monthly Expenses (₹{totalMonthly.toLocaleString('en-IN')}/mo)</h2>
              <div className="space-y-4">
                {monthlyExpenses.map((e, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-neutral-700">{e.category}</span>
                      <span className="font-semibold text-neutral-900">₹{e.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2.5 border border-neutral-200">
                      <div className="h-2.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" style={{ width: `${e.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-white rounded-xl border border-neutral-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-neutral-900">Total Monthly Burn</span>
                  <span className="font-semibold text-neutral-900">₹{totalMonthly.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
              <h2 className="font-semibold text-lg mb-4">Profit Projection (5-Year)</h2>
              <div className="space-y-6">
                {projections.map((p, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-neutral-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-neutral-900">{p.year}</span>
                      <span className="text-success font-semibold">{p.margin} margin</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div><div className="font-medium text-neutral-900">{p.revenue}</div><div className="text-xs text-neutral-400">Revenue</div></div>
                      <div><div className="font-medium text-neutral-900">{p.expenses}</div><div className="text-xs text-neutral-400">Costs</div></div>
                      <div><div className="font-medium text-success">{p.profit}</div><div className="text-xs text-neutral-400">Profit</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cost Comparison */}
          <div className="bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl border border-primary-500/20 p-8">
            <h2 className="text-2xl font-heading font-bold mb-6 text-center">Cost Comparison: AI Agency vs Traditional</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 rounded-xl p-6 border border-neutral-200">
                <h3 className="font-semibold text-lg text-primary-600 mb-4">Nexify (AI-Only)</h3>
                <ul className="space-y-3">
                  {['₹0 labor cost', '₹1.04L/mo total operating cost', '99.9% profit margin on services', 'Unlimited scalability', '24/7/365 operation', 'Zero HR overhead'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm"><Check size={16} className="text-success shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/80 rounded-xl p-6 border border-neutral-200">
                <h3 className="font-semibold text-lg text-neutral-400 mb-4">Traditional Agency (10 people)</h3>
                <ul className="space-y-3">
                  {['₹5-8L/mo salary cost', '₹50K+/mo office & overhead', '15-25% profit margin', 'Limited by team size', '8-10 hrs/day operation', 'HR, payroll, benefits admin'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm"><span className="w-2 h-2 rounded-full bg-error shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
