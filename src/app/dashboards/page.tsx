'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, TrendingUp, Users, DollarSign, Target, BarChart3, Cpu, Headphones, Settings, ArrowRight, Activity, RefreshCw, ExternalLink, Zap, Star, PieChart, Download, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { BarChart, LineChart, DonutChart, MetricCard } from '@/components/Charts'

const dashboardDetail = [
  {
    id: 'ceo', role: 'CEO Dashboard', icon: LayoutDashboard, color: 'from-amber-500 to-orange-600',
    summary: 'Company-wide performance. All metrics AI-generated in real-time.',
    metrics: [
      { label: 'Revenue (YTD)', value: '₹79.8L', trend: '+28%', chartData: [120, 180, 220, 280, 340, 420, 510, 620, 720, 798] },
      { label: 'Active Projects', value: '6', trend: '+2', chartData: [3, 3, 4, 4, 5, 5, 5, 6, 6, 6] },
      { label: 'Pipeline Value', value: '₹63.5L', trend: '+18%', chartData: [25, 32, 38, 42, 48, 52, 55, 58, 61, 63.5] },
      { label: 'Agent Efficiency', value: '95.2%', trend: '+3.2%', chartData: [88, 89, 91, 92, 92, 93, 94, 94, 95, 95.2] },
    ],
    barData: [{ label: 'Jan', value: 12 }, { label: 'Feb', value: 18 }, { label: 'Mar', value: 22 }, { label: 'Apr', value: 28 }, { label: 'May', value: 34 }, { label: 'Jun', value: 42 }],
    donutData: [{ label: 'Services', value: 65, color: '#3B82F6' }, { label: 'SaaS', value: 20, color: '#8B5CF6' }, { label: 'Support', value: 10, color: '#10B981' }, { label: 'Consulting', value: 5, color: '#F59E0B' }],
  },
  {
    id: 'finance', role: 'Finance Dashboard', icon: DollarSign, color: 'from-emerald-500 to-green-600',
    summary: 'Real-time financial health. Zero labor costs, 94%+ margins.',
    metrics: [
      { label: 'Income (MTD)', value: '₹10.85L', trend: '+32%', chartData: [2, 3.5, 4.8, 6.2, 7.5, 8.8, 10.85] },
      { label: 'Expenses (MTD)', value: '₹1.04L', trend: '-5%', chartData: [1.2, 1.15, 1.1, 1.08, 1.06, 1.05, 1.04] },
      { label: 'Profit Margin', value: '90.4%', trend: '+2.1%', chartData: [82, 84, 86, 87, 88, 89, 90.4] },
      { label: 'Monthly Burn', value: '₹1.04L', trend: '₹0 labor', chartData: [0.3, 0.5, 0.7, 0.8, 0.9, 1.0, 1.04] },
    ],
    barData: [{ label: 'Apr', value: 6.2 }, { label: 'May', value: 8.5 }, { label: 'Jun', value: 10.85 }, { label: 'Jul', value: 12 }, { label: 'Aug', value: 14 }, { label: 'Sep', value: 16.5 }],
    donutData: [{ label: 'Infra', value: 45, color: '#10B981' }, { label: 'API Cost', value: 35, color: '#F59E0B' }, { label: 'Tools', value: 15, color: '#3B82F6' }, { label: 'Other', value: 5, color: '#8B5CF6' }],
  },
  {
    id: 'sales', role: 'Sales Dashboard', icon: Target, color: 'from-violet-500 to-purple-600',
    summary: 'AI-powered pipeline with auto-lead scoring and proposals.',
    metrics: [
      { label: 'Pipeline Value', value: '₹63.5L', trend: '+18%', chartData: [32, 38, 42, 48, 52, 58, 63.5] },
      { label: 'Won (Qtr)', value: '₹18.5L', trend: '+12%', chartData: [4, 6, 8.5, 11, 13.5, 16, 18.5] },
      { label: 'Conversion', value: '34%', trend: '+8%', chartData: [22, 24, 26, 28, 30, 32, 34] },
      { label: 'Active Deals', value: '10', trend: '+3', chartData: [5, 6, 6, 7, 8, 9, 10] },
    ],
    barData: [{ label: 'New', value: 2 }, { label: 'Qualified', value: 3 }, { label: 'Proposal', value: 3 }, { label: 'Negotiation', value: 2 }, { label: 'Closed', value: 3 }],
  },
  {
    id: 'hr', role: 'HR / Agent Dashboard', icon: Users, color: 'from-blue-500 to-indigo-600',
    summary: 'AI workforce management. Zero HR costs, 100% uptime.',
    metrics: [
      { label: 'Active Agents', value: '11/12', trend: '92%', chartData: [8, 10, 10, 11, 11, 11, 11] },
      { label: 'Avg Efficiency', value: '95.2%', trend: '+2.1%', chartData: [89, 91, 92, 93, 94, 94.5, 95.2] },
      { label: 'Tasks Today', value: '78', trend: '+12', chartData: [42, 51, 58, 63, 68, 72, 78] },
      { label: 'System Uptime', value: '99.99%', trend: '100%', chartData: [99.9, 99.92, 99.95, 99.97, 99.98, 99.99, 99.99] },
    ],
    donutData: [{ label: 'Dev', value: 5, color: '#3B82F6' }, { label: 'AI/ML', value: 2, color: '#8B5CF6' }, { label: 'QA', value: 1, color: '#10B981' }, { label: 'DevOps', value: 1, color: '#F59E0B' }, { label: 'Design', value: 1, color: '#EF4444' }, { label: 'Sales', value: 1, color: '#06B6D4' }],
  },
]

const otherDashboards = [
  { role: 'Marketing', icon: BarChart3, color: 'from-pink-500 to-rose-600', kpis: '2,450 visits/wk · 24 leads · 45% open rate' },
  { role: 'Projects', icon: Activity, color: 'from-cyan-500 to-teal-600', kpis: '6 active · 4 on track · 92% completion' },
  { role: 'Client Success', icon: Headphones, color: 'from-primary-500 to-accent-500', kpis: '8 clients · 4.9/5 CSAT · 94% retention' },
  { role: 'Operations', icon: Settings, color: 'from-neutral-600 to-neutral-800', kpis: '99.99% uptime · 78 tasks · ₹0/task' },
]

const lineData = [{ label: 'W1', value: 42 }, { label: 'W2', value: 55 }, { label: 'W3', value: 48 }, { label: 'W4', value: 62 }, { label: 'W5', value: 58 }, { label: 'W6', value: 71 }, { label: 'W7', value: 65 }, { label: 'W8', value: 78 }]

export default function DashboardsPage() {
  const [active, setActive] = useState(dashboardDetail[0])
  const [anim, setAnim] = useState(false)

  useEffect(() => {
    setAnim(true)
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => { setAnim(false); setTimeout(() => setAnim(true), 50) }, [active])

  const chartColor = (c: string) => c.includes('emerald') ? '#10B981' : c.includes('violet') ? '#8B5CF6' : c.includes('blue') || c.includes('indigo') ? '#3B82F6' : '#3B82F6'

  return (
    <>
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Dashboards</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Executive <span className="text-primary-300">Dashboards</span></h1>
            <p className="text-xl text-neutral-300">Live AI-generated dashboards with real KPIs, interactive SVG charts, and forecasting.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-neutral-950">
        <div className="section-container">
          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-8 reveal">
            {dashboardDetail.map(d => (
              <button key={d.id} onClick={() => setActive(d)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                  active.id === d.id
                    ? `bg-gradient-to-r ${d.color} text-white shadow-lg`
                    : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
                }`}>
                <d.icon size={16} />{d.role.replace(' Dashboard', '')}
              </button>
            ))}
          </div>

          {/* Active Dashboard */}
          <div className="space-y-6" key={active.id}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${active.color} flex items-center justify-center`}><active.icon className="w-5 h-5 text-white" /></div>
                  <h2 className="text-2xl font-heading font-bold">{active.role}</h2>
                </div>
                <p className="text-neutral-800 text-sm ml-[52px]">{active.summary}</p>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {active.metrics.map((m, i) => (
                <MetricCard key={i} label={m.label} value={m.value} trend={m.trend} data={m.chartData}
                  color={i === 0 ? '#3B82F6' : i === 1 ? '#10B981' : i === 2 ? '#8B5CF6' : '#F59E0B'} />
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card-surface p-6">
                <h3 className="font-semibold text-sm mb-4">Revenue / Metrics</h3>
                <div className="h-52">{anim && <BarChart data={active.barData || []} height={200} color={chartColor(active.color)} />}</div>
              </div>
              <div className="card-surface p-6">
                <h3 className="font-semibold text-sm mb-4">Weekly Performance</h3>
                <div className="h-52">{anim && <LineChart data={lineData} height={200} color={chartColor(active.color)} />}</div>
              </div>
            </div>

            {/* Donut */}
            {active.donutData && (
              <div className="card-surface p-6">
                <h3 className="font-semibold text-sm mb-4">Distribution</h3>
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="w-48">{anim && <DonutChart data={active.donutData} size={180} thickness={36} />}</div>
                  <div className="flex-1 space-y-3 w-full">
                    {active.donutData.map((d, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="text-sm text-neutral-800 dark:text-neutral-300 flex-1">{d.label}</span>
                        <span className="text-sm font-semibold">{d.value}%</span>
                        <div className="w-32 sm:w-48 bg-neutral-100 dark:bg-neutral-700 rounded-full h-2">
                          <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${d.value}%`, backgroundColor: d.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-neutral-800"><RefreshCw size={12} /> Auto-updates every 30s · AI-generated data</div>
          </div>

          {/* Other dashboards */}
          <div className="mt-20 reveal">
            <h2 className="text-2xl font-heading font-bold text-center mb-8">All <span className="gradient-text">Dashboards</span></h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherDashboards.map((d, i) => {
                const Icon = d.icon
                return (
                  <div key={i} className="card-surface p-5 hover:shadow-xl transition-all group">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${d.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}><Icon className="w-5 h-5 text-white" /></div>
                    <h3 className="font-semibold mb-2">{d.role}</h3>
                    <p className="text-xs text-neutral-800">{d.kpis}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl border border-primary-500/20 p-8 text-center reveal">
            <h2 className="text-2xl font-heading font-bold mb-2">Live in Every Portal</h2>
            <p className="text-neutral-800 mb-6">These dashboards are built into the Admin Panel and Client Portal with real-time updates.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/admin" className="btn-primary">Admin Panel <ArrowRight size={16} /></Link>
              <Link href="/portal" className="btn-secondary">Client Portal <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
