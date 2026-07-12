'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, FolderKanban, FileText, Ticket, Bell,
  FileUp, BarChart3, Settings, LogOut, Menu, X,
  Plus, Search, Eye, Download, Clock, CheckCircle2, AlertCircle,
  Circle, MoreHorizontal, ChevronRight, Star, Users, DollarSign,
  Activity, Calendar, MessageSquare, Paperclip, ArrowUpRight,
  Filter, Trash2, Send, Upload, User, Briefcase, Home, TrendingUp
} from 'lucide-react'

// ===================== DATA LAYER (localStorage) =====================
const DB = {
  get(key: string) {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(`nexify_portal_${key}`)
    return data ? JSON.parse(data) : null
  },
  set(key: string, value: any) {
    if (typeof window === 'undefined') return
    localStorage.setItem(`nexify_portal_${key}`, JSON.stringify(value))
  },
  init() {
    if (this.get('initialized')) return
    this.set('client', { id: 'CLT-001', name: 'Rajesh Mehta', company: 'FinTech Labs', email: 'rajesh@fintechlabs.com', avatar: 'RM' })
    this.set('projects', [
      { id: 'PRJ-001', name: 'Trading Dashboard', description: 'Real-time AI-powered trading platform with predictive analytics', status: 'active', progress: 78, startDate: '2026-04-01', endDate: '2026-07-15', budget: '₹6,00,000', spent: '₹4,68,000', team: ['AI Dev Agent', 'AI Design Agent', 'AI QA Agent'], tasks: { total: 42, done: 33, inProgress: 6, todo: 3 } },
      { id: 'PRJ-002', name: 'Customer Portal Redesign', description: 'Complete redesign of customer portal with AI chat support', status: 'active', progress: 45, startDate: '2026-05-15', endDate: '2026-08-30', budget: '₹3,50,000', spent: '₹1,57,500', team: ['AI Design Agent', 'AI Dev Agent'], tasks: { total: 28, done: 13, inProgress: 8, todo: 7 } },
      { id: 'PRJ-003', name: 'Payment Gateway Integration', description: 'Razorpay and Stripe integration with reconciliation dashboard', status: 'review', progress: 92, startDate: '2026-06-01', endDate: '2026-07-10', budget: '₹1,80,000', spent: '₹1,66,000', team: ['AI Dev Agent', 'AI QA Agent'], tasks: { total: 18, done: 17, inProgress: 1, todo: 0 } },
      { id: 'PRJ-004', name: 'Analytics Dashboard', description: 'Real-time business analytics with AI insights', status: 'planning', progress: 15, startDate: '2026-07-10', endDate: '2026-09-15', budget: '₹4,00,000', spent: '₹60,000', team: ['AI Dev Agent', 'AI Design Agent', 'AI Data Agent'], tasks: { total: 35, done: 5, inProgress: 3, todo: 27 } },
    ])
    this.set('invoices', [
      { id: 'INV-001', project: 'Trading Dashboard', amount: 150000, date: '2026-07-01', dueDate: '2026-07-15', status: 'pending', description: 'Milestone 3: AI Engine Implementation' },
      { id: 'INV-002', project: 'Trading Dashboard', amount: 200000, date: '2026-06-01', dueDate: '2026-06-15', status: 'paid', paidDate: '2026-06-12', description: 'Milestone 2: Backend Architecture' },
      { id: 'INV-003', project: 'Trading Dashboard', amount: 250000, date: '2026-05-01', dueDate: '2026-05-15', status: 'paid', paidDate: '2026-05-10', description: 'Milestone 1: Design & Planning' },
      { id: 'INV-004', project: 'Customer Portal Redesign', amount: 87500, date: '2026-07-05', dueDate: '2026-07-19', status: 'pending', description: 'Sprint 3: Frontend Components' },
      { id: 'INV-005', project: 'Customer Portal Redesign', amount: 70000, date: '2026-06-05', dueDate: '2026-06-19', status: 'paid', paidDate: '2026-06-18', description: 'Sprint 2: Design System' },
    ])
    this.set('tickets', [
      { id: 'TCK-001', subject: 'Dashboard chart not loading on mobile', description: 'The candlestick chart on the trading dashboard doesn\'t render on iOS Safari.', status: 'open', priority: 'high', category: 'bug', date: '2026-07-10', lastUpdate: '2 hours ago', messages: [{ from: 'client', text: 'The candlestick chart on the trading dashboard doesn\'t render on iOS Safari. This is affecting my team\'s ability to monitor trades on mobile.', time: '2 hours ago' }, { from: 'agent', text: 'Thank you for reporting this. Our AI QA agent has identified the issue — it\'s a WebGL compatibility problem with Safari. We\'re deploying a fix using Canvas fallback. ETA: 4 hours.', time: '1 hour ago' }] },
      { id: 'TCK-002', subject: 'API rate limit increase request', description: 'We need the rate limit increased from 100 to 500 requests per minute for the production environment.', status: 'in-progress', priority: 'medium', category: 'feature', date: '2026-07-08', lastUpdate: '1 day ago', messages: [{ from: 'client', text: 'We\'re hitting the 100 req/min rate limit during peak hours. Can we increase this to 500?', time: '1 day ago' }, { from: 'agent', text: 'We\'ve reviewed your usage patterns and approved the increase. Our DevOps agent is updating the load balancer config. Estimated completion: 24 hours.', time: '20 hours ago' }] },
      { id: 'TCK-003', subject: 'User permission update for new hire', description: 'Need to add a new team member with viewer access to the analytics dashboard.', status: 'resolved', priority: 'low', category: 'account', date: '2026-07-05', lastUpdate: '3 days ago', messages: [{ from: 'client', text: 'Please add priya@fintechlabs.com with viewer access to the analytics project.', time: '3 days ago' }, { from: 'agent', text: 'Done. Priya has been added with viewer permissions. She\'ll receive an invite email shortly.', time: '3 days ago' }] },
    ])
    this.set('notifications', [
      { id: 'NOT-001', type: 'milestone', title: 'Milestone 4 completed', message: 'Trading Dashboard: Backend integration milestone has been completed ahead of schedule.', read: false, date: '2026-07-11' },
      { id: 'NOT-002', type: 'ticket', title: 'Ticket resolved', message: 'API rate limit ticket has been resolved. New limit: 500 req/min.', read: false, date: '2026-07-11' },
      { id: 'NOT-003', type: 'invoice', title: 'Invoice generated', message: 'INV-004 for ₹87,500 is ready for review.', read: false, date: '2026-07-05' },
      { id: 'NOT-004', type: 'update', title: 'Sprint review completed', message: 'Sprint 3 retrospective is available in your project dashboard.', read: true, date: '2026-07-04' },
    ])
    this.set('files', [
      { id: 'FILE-001', name: 'Trading_Dashboard_Architecture.pdf', project: 'Trading Dashboard', size: '2.4 MB', type: 'pdf', date: '2026-07-10', uploadedBy: 'AI Dev Agent' },
      { id: 'FILE-002', name: 'Sprint_3_Report.pdf', project: 'Trading Dashboard', size: '1.1 MB', type: 'pdf', date: '2026-07-09', uploadedBy: 'AI QA Agent' },
      { id: 'FILE-003', name: 'Design_Mockups_v2.fig', project: 'Customer Portal Redesign', size: '8.7 MB', type: 'figma', date: '2026-07-08', uploadedBy: 'AI Design Agent' },
      { id: 'FILE-004', name: 'API_Specification.yaml', project: 'Payment Gateway', size: '156 KB', type: 'yaml', date: '2026-07-07', uploadedBy: 'AI Dev Agent' },
      { id: 'FILE-005', name: 'Performance_Report_Q2.xlsx', project: 'Analytics Dashboard', size: '892 KB', type: 'xlsx', date: '2026-07-05', uploadedBy: 'AI Data Agent' },
    ])
    this.set('initialized', true)
  }
}

// ===================== COMPONENTS =====================
const statusColors: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/20',
  review: 'bg-warning/10 text-warning border-warning/20',
  planning: 'bg-info/10 text-info border-info/20',
  completed: 'bg-primary-50 text-primary-600 border-primary-200',
  paid: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  overdue: 'bg-error/10 text-error border-error/20',
  open: 'bg-error/10 text-error border-error/20',
  'in-progress': 'bg-info/10 text-info border-info/20',
  resolved: 'bg-success/10 text-success border-success/20',
  low: 'bg-neutral-100 text-neutral-600 border-neutral-200',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-error/10 text-error border-error/20',
  bug: 'bg-error/10 text-error border-error/20',
  feature: 'bg-accent-50 text-accent-600 border-accent-200',
  account: 'bg-primary-50 text-primary-600 border-primary-200',
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`chip text-xs capitalize border ${statusColors[status] || 'bg-neutral-100 text-neutral-600'}`}>
      {status}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, trend, variant = 'default' }: { icon: any; label: string; value: string; trend?: string; variant?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-neutral-200 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${variant === 'primary' ? 'bg-primary-50' : variant === 'success' ? 'bg-success/10' : variant === 'warning' ? 'bg-warning/10' : 'bg-neutral-100'}`}>
          <Icon className={`w-5 h-5 ${variant === 'primary' ? 'text-primary-500' : variant === 'success' ? 'text-success' : variant === 'warning' ? 'text-warning' : 'text-neutral-600'}`} />
        </div>
        {trend && <span className="text-xs text-success font-medium">{trend}</span>}
      </div>
      <div className="text-2xl font-heading font-bold text-neutral-900">{value}</div>
      <div className="text-sm text-neutral-600">{label}</div>
    </div>
  )
}

function ProgressBar({ value }: { value: number }) {
  const color = value >= 80 ? 'bg-success' : value >= 40 ? 'bg-primary-500' : 'bg-warning'
  return (
    <div className="w-full bg-neutral-100 rounded-full h-2">
      <div className={`h-2 rounded-full transition-all duration-500 ${color}`} style={{ width: `${value}%` }} />
    </div>
  )
}

// ===================== PORTAL PAGES =====================
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      DB.init()
      onLogin()
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
            <span className="text-white font-heading font-bold text-2xl">N</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-white">Client Portal</h1>
          <p className="text-primary-200 mt-2">Nexify Technologies</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Sign In</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-200 mb-1.5">Email</label>
              <input type="email" required className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-200 mb-1.5">Password</label>
              <input type="password" required className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-white text-primary-900 font-semibold hover:bg-primary-50 transition-all disabled:opacity-50">
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
          <p className="text-center text-primary-300 text-xs mt-4">Demo: enter any email/password to access portal</p>
        </form>
      </div>
    </div>
  )
}

function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [invoices, setInvoices] = useState<any[]>([])
  const [tickets, setTickets] = useState<any[]>([])

  useEffect(() => {
    setProjects(DB.get('projects') || [])
    setInvoices(DB.get('invoices') || [])
    setTickets(DB.get('tickets') || [])
  }, [])

  const activeProjects = projects.filter(p => p.status === 'active')
  const totalBudget = projects.reduce((s, p) => s + parseInt(p.budget.replace(/[^0-9]/g, '')), 0)
  const totalSpent = projects.reduce((s, p) => s + parseInt(p.spent.replace(/[^0-9]/g, '')), 0)
  const pendingInvoices = invoices.filter(i => i.status === 'pending')
  const pendingAmount = pendingInvoices.reduce((s, i) => s + i.amount, 0)
  const openTickets = tickets.filter(t => t.status !== 'resolved')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Dashboard</h1>
          <p className="text-neutral-600 text-sm">Welcome back! Here's your project overview.</p>
        </div>
        <div className="text-sm text-neutral-600">Last updated: AI agent sync 2 min ago</div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FolderKanban} label="Active Projects" value={String(activeProjects.length)} variant="primary" />
        <StatCard icon={DollarSign} label="Total Budget" value={`₹${(totalBudget/100000).toFixed(1)}L`} trend="+12%" variant="success" />
        <StatCard icon={FileText} label="Pending Invoices" value={`₹${(pendingAmount/1000).toFixed(0)}K`} variant="warning" />
        <StatCard icon={Ticket} label="Open Tickets" value={String(openTickets.length)} variant="primary" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Projects */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Active Projects</h2>
            <Link href="/portal?tab=projects" className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">View all <ArrowUpRight size={14} /></Link>
          </div>
          <div className="space-y-4">
            {projects.filter(p => p.status !== 'planning').map(p => (
              <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-primary-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-neutral-900 truncate">{p.name}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <ProgressBar value={p.progress} />
                    <span className="text-xs text-neutral-600 shrink-0">{p.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity / Tickets */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Tickets</h2>
            <Link href="/portal?tab=tickets" className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">View all <ArrowUpRight size={14} /></Link>
          </div>
          <div className="space-y-3">
            {tickets.map(t => (
              <div key={t.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-all">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${t.priority === 'high' ? 'bg-error/10' : 'bg-neutral-100'}`}>
                  {t.status === 'resolved' ? <CheckCircle2 className="w-4 h-4 text-success" /> : <AlertCircle className={`w-4 h-4 ${t.priority === 'high' ? 'text-error' : 'text-neutral-600'}`} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-900 truncate">{t.subject}</span>
                    <StatusBadge status={t.status} />
                  </div>
                  <div className="text-xs text-neutral-600 mt-1 flex items-center gap-2">
                    <span>{t.id}</span>
                    <span>·</span>
                    <span>{t.lastUpdate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget vs Spent */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold mb-4">Budget Overview</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map(p => {
            const budget = parseInt(p.budget.replace(/[^0-9]/g, ''))
            const spent = parseInt(p.spent.replace(/[^0-9]/g, ''))
            const pct = Math.round((spent / budget) * 100)
            return (
              <div key={p.id} className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="text-sm font-medium text-neutral-900 mb-2">{p.name}</div>
                <div className="flex items-center justify-between text-xs text-neutral-600 mb-1">
                  <span>Spent: ₹{(spent/100000).toFixed(1)}L</span>
                  <span>Budget: ₹{(budget/100000).toFixed(1)}L</span>
                </div>
                <ProgressBar value={pct} />
                <div className="text-xs text-neutral-600 mt-1 text-right">{pct}% utilized</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    setProjects(DB.get('projects') || [])
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Projects</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
          <input className="pl-9 pr-4 py-2 rounded-xl border border-neutral-200 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary-500/30" placeholder="Search projects..." />
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-heading font-bold">{p.name}</h2>
                  <StatusBadge status={p.status} />
                  <span className="text-xs text-neutral-600">{p.id}</span>
                </div>
                <p className="text-sm text-neutral-600 mb-4">{p.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {p.startDate} → {p.endDate}</span>
                  <span className="flex items-center gap-1"><DollarSign size={12} /> {p.budget}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {p.team.join(', ')}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-semibold text-neutral-900">{p.progress}%</div>
                <ProgressBar value={p.progress} />
                <div className="text-xs text-neutral-600 mt-1">{p.tasks.done}/{p.tasks.total} tasks</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>{p.tasks.done} done</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span>{p.tasks.inProgress} in progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-neutral-300" />
                <span>{p.tasks.todo} todo</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([])

  useEffect(() => {
    setInvoices(DB.get('invoices') || [])
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Invoices</h1>
          <p className="text-neutral-600 text-sm">Track payments and manage billing</p>
        </div>
        <button className="btn-primary text-sm"><Plus size={16} /> Request Payment Plan</button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left p-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Invoice</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Project</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Amount</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Date</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Due</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Status</th>
                <th className="text-right p-4 text-xs font-semibold text-neutral-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-neutral-50 transition-all">
                  <td className="p-4 text-sm font-medium text-neutral-900">{inv.id}</td>
                  <td className="p-4 text-sm text-neutral-600">{inv.project}</td>
                  <td className="p-4 text-sm font-semibold text-neutral-900">₹{inv.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-sm text-neutral-600">{inv.date}</td>
                  <td className="p-4 text-sm text-neutral-600">{inv.dueDate}</td>
                  <td className="p-4"><StatusBadge status={inv.status} /></td>
                  <td className="p-4 text-right">
                    <button className="text-primary-500 hover:text-primary-600 text-sm flex items-center gap-1 ml-auto"><Download size={14} /> PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([])
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [showDetail, setShowDetail] = useState<string | null>(null)
  const [newTicket, setNewTicket] = useState({ subject: '', description: '', priority: 'medium', category: 'bug' })

  useEffect(() => {
    setTickets(DB.get('tickets') || [])
  }, [])

  const createTicket = () => {
    const tickets = DB.get('tickets') || []
    const newId = `TCK-${String(tickets.length + 1).padStart(3, '0')}`
    const ticket = {
      id: newId,
      subject: newTicket.subject,
      description: newTicket.description,
      status: 'open',
      priority: newTicket.priority,
      category: newTicket.category,
      date: new Date().toISOString().split('T')[0],
      lastUpdate: 'Just now',
      messages: [{ from: 'client', text: newTicket.description, time: 'Just now' }]
    }
    tickets.unshift(ticket)
    DB.set('tickets', tickets)
    setTickets(tickets)
    setShowNewTicket(false)
    setNewTicket({ subject: '', description: '', priority: 'medium', category: 'bug' })
  }

  if (showDetail) {
    const ticket = tickets.find(t => t.id === showDetail)
    if (!ticket) return null
    return (
      <div className="space-y-6">
        <button onClick={() => setShowDetail(null)} className="text-primary-500 hover:text-primary-600 text-sm flex items-center gap-1">← Back to Tickets</button>
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-heading font-bold">{ticket.subject}</h1>
                <StatusBadge status={ticket.status} />
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-600">
                <span>{ticket.id}</span><span>·</span><StatusBadge status={ticket.priority} /><span>·</span><StatusBadge status={ticket.category} /><span>·</span><span>{ticket.date}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {ticket.messages.map((msg: any, i: number) => (
              <div key={i} className={`flex gap-3 ${msg.from === 'client' ? '' : 'flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${msg.from === 'client' ? 'bg-primary-500 text-white' : 'bg-accent-500 text-white'}`}>
                  {msg.from === 'client' ? 'C' : 'AI'}
                </div>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.from === 'client' ? 'bg-neutral-100 text-neutral-700' : 'bg-accent-50 text-accent-700'}`}>
                  <p>{msg.text}</p>
                  <div className="text-xs text-neutral-600 mt-1">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <div className="flex gap-2">
              <input className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30" placeholder="Type a reply... AI agent will respond within minutes." />
              <button className="btn-primary text-sm"><Send size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Support Tickets</h1>
          <p className="text-neutral-600 text-sm">AI agents respond within minutes, 24/7</p>
        </div>
        <button onClick={() => setShowNewTicket(true)} className="btn-primary text-sm"><Plus size={16} /> New Ticket</button>
      </div>

      {showNewTicket && (
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="font-semibold mb-4">Create New Ticket</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
              <input className="input-field" placeholder="Brief title" value={newTicket.subject} onChange={e => setNewTicket(s => ({...s, subject: e.target.value}))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Priority</label>
                <select className="input-field" value={newTicket.priority} onChange={e => setNewTicket(s => ({...s, priority: e.target.value}))}>
                  <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
                <select className="input-field" value={newTicket.category} onChange={e => setNewTicket(s => ({...s, category: e.target.value}))}>
                  <option value="bug">Bug Report</option><option value="feature">Feature Request</option><option value="account">Account</option><option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
              <textarea className="input-field resize-none" rows={4} placeholder="Describe the issue in detail..." value={newTicket.description} onChange={e => setNewTicket(s => ({...s, description: e.target.value}))} />
            </div>
            <div className="flex gap-2">
              <button onClick={createTicket} className="btn-primary text-sm"><Send size={16} /> Submit Ticket</button>
              <button onClick={() => setShowNewTicket(false)} className="btn-secondary text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {tickets.map(t => (
          <button key={t.id} onClick={() => setShowDetail(t.id)} className="w-full bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg hover:border-primary-500/20 transition-all text-left">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium text-neutral-900 truncate">{t.subject}</span>
                  <StatusBadge status={t.status} />
                </div>
                <p className="text-sm text-neutral-600 truncate">{t.description}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <StatusBadge status={t.priority} />
                  <StatusBadge status={t.category} />
                </div>
                <div className="text-xs text-neutral-600">{t.lastUpdate}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function FilesPage() {
  const [files, setFiles] = useState<any[]>([])

  useEffect(() => {
    setFiles(DB.get('files') || [])
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Files & Documents</h1>
          <p className="text-neutral-600 text-sm">All project files in one place</p>
        </div>
        <button className="btn-primary text-sm"><Upload size={16} /> Upload File</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map(f => (
          <div key={f.id} className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg hover:border-primary-500/20 transition-all group">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${f.type === 'pdf' ? 'bg-error/10' : f.type === 'figma' ? 'bg-accent-50' : f.type === 'yaml' ? 'bg-primary-50' : 'bg-success/10'}`}>
                <FileText className={`w-6 h-6 ${f.type === 'pdf' ? 'text-error' : f.type === 'figma' ? 'text-accent-500' : f.type === 'yaml' ? 'text-primary-500' : 'text-success'}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-sm text-neutral-900 truncate group-hover:text-primary-600 transition-colors">{f.name}</div>
                <div className="text-xs text-neutral-600 mt-1">{f.size}</div>
                <div className="text-xs text-neutral-600">{f.project}</div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
                  <span className="text-xs text-neutral-600">by {f.uploadedBy}</span>
                  <button className="text-primary-500 hover:text-primary-600"><Download size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    setNotifications(DB.get('notifications') || [])
  }, [])

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }))
    DB.set('notifications', updated)
    setNotifications(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Notifications</h1>
        <button onClick={markAllRead} className="text-sm text-primary-500 hover:text-primary-600">Mark all as read</button>
      </div>
      <div className="space-y-2">
        {notifications.map(n => (
          <div key={n.id} className={`bg-white rounded-xl border p-4 transition-all hover:shadow-md ${n.read ? 'border-neutral-200' : 'border-primary-500/30 bg-primary-50/30'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'milestone' ? 'bg-success/10' : n.type === 'ticket' ? 'bg-info/10' : n.type === 'invoice' ? 'bg-warning/10' : 'bg-neutral-100'}`}>
                {n.type === 'milestone' ? <Star className="w-5 h-5 text-success" /> : n.type === 'ticket' ? <Ticket className="w-5 h-5 text-info" /> : n.type === 'invoice' ? <FileText className="w-5 h-5 text-warning" /> : <Bell className="w-5 h-5 text-neutral-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-neutral-900">{n.title}</span>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                </div>
                <p className="text-sm text-neutral-600 mt-0.5">{n.message}</p>
                <span className="text-xs text-neutral-600 mt-1 block">{n.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReportsPage() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    setProjects(DB.get('projects') || [])
  }, [])

  const totalTasks = projects.reduce((s, p) => s + p.tasks.total, 0)
  const doneTasks = projects.reduce((s, p) => s + p.tasks.done, 0)
  const avgProgress = Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length)
  const totalBudget = projects.reduce((s, p) => s + parseInt(p.budget.replace(/[^0-9]/g, '')), 0)
  const totalSpent = projects.reduce((s, p) => s + parseInt(p.spent.replace(/[^0-9]/g, '')), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Reports</h1>
          <p className="text-neutral-600 text-sm">AI-generated project insights</p>
        </div>
        <button className="btn-primary text-sm"><Download size={16} /> Export Report</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Activity} label="Overall Progress" value={`${avgProgress}%`} variant="primary" />
        <StatCard icon={CheckCircle2} label="Tasks Complete" value={`${doneTasks}/${totalTasks}`} variant="success" />
        <StatCard icon={DollarSign} label="Budget Utilization" value={`${Math.round(totalSpent/totalBudget*100)}%`} variant="warning" />
        <StatCard icon={TrendingUp} label="On-Time Delivery" value="94%" variant="success" />
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold mb-4">Project Progress Comparison</h2>
        <div className="space-y-4">
          {projects.map(p => (
            <div key={p.id}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-neutral-900 font-medium">{p.name}</span>
                <span className="text-neutral-600">{p.progress}%</span>
              </div>
              <ProgressBar value={p.progress} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h2 className="font-semibold mb-3">Timeline Status</h2>
          <div className="space-y-3">
            {projects.map(p => {
              const end = new Date(p.endDate)
              const now = new Date()
              const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
              const isOnTrack = p.progress >= 30 && daysLeft > 0
              return (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">{p.name}</span>
                  <span className={`flex items-center gap-1 text-xs ${isOnTrack ? 'text-success' : 'text-warning'}`}>
                    {isOnTrack ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <h2 className="font-semibold mb-3">AI Agent Insights</h2>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0" /> Trading Dashboard pacing 12% ahead of schedule</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" /> Portal Redesign sprint velocity stable</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0" /> Payment Gateway integration ahead of timeline</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-info mt-1.5 shrink-0" /> Analytics Dashboard resource allocation optimized</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold">Profile & Settings</h1>
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-heading font-bold text-xl">RM</div>
          <div>
            <h2 className="text-xl font-heading font-bold">Rajesh Mehta</h2>
            <p className="text-neutral-600">FinTech Labs</p>
            <p className="text-neutral-600 text-sm">rajesh@fintechlabs.com</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Company</label>
            <input className="input-field" value="FinTech Labs" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input className="input-field" value="rajesh@fintechlabs.com" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
            <input className="input-field" placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Notification Preferences</label>
            <select className="input-field">
              <option>All notifications</option>
              <option>Important only</option>
              <option>None</option>
            </select>
          </div>
        </div>
        <button className="btn-primary text-sm mt-4">Save Changes</button>
      </div>
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="font-semibold mb-3">Client Details</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-neutral-50 rounded-xl"><span className="text-neutral-600 block">Client ID</span><span className="font-medium text-neutral-900">CLT-001</span></div>
          <div className="p-4 bg-neutral-50 rounded-xl"><span className="text-neutral-600 block">Account Type</span><span className="font-medium text-neutral-900">Enterprise</span></div>
          <div className="p-4 bg-neutral-50 rounded-xl"><span className="text-neutral-600 block">Since</span><span className="font-medium text-neutral-900">April 2026</span></div>
        </div>
      </div>
    </div>
  )
}

// ===================== MAIN PORTAL =====================
export default function PortalPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)

  useEffect(() => {
    DB.init()
    const notifs = DB.get('notifications') || []
    setUnreadNotifications(notifs.filter((n: any) => !n.read).length)
  }, [])

  // Handle query params for deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    if (tab && ['dashboard','projects','invoices','tickets','files','notifications','reports','profile'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [authenticated])

  if (!authenticated) return <LoginPage onLogin={() => setAuthenticated(true)} />

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'files', label: 'Files', icon: FileUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'profile', label: 'Settings', icon: Settings },
  ]

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPage />
      case 'projects': return <ProjectsPage />
      case 'invoices': return <InvoicesPage />
      case 'tickets': return <TicketsPage />
      case 'files': return <FilesPage />
      case 'notifications': return <NotificationsPage />
      case 'reports': return <ReportsPage />
      case 'profile': return <ProfilePage />
      default: return <DashboardPage />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-full w-64 bg-white border-r border-neutral-200 z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">N</span>
            </div>
            <div>
              <h2 className="text-white font-heading font-bold text-sm leading-none bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Nexify</h2>
              <p className="text-neutral-600 text-xs">Client Portal</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-600 border border-primary-200'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-700'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
              {tab.id === 'notifications' && unreadNotifications > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">{unreadNotifications}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">RM</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-neutral-900 truncate">Rajesh Mehta</div>
              <div className="text-xs text-neutral-600">Client</div>
            </div>
            <button onClick={() => setAuthenticated(false)} className="text-neutral-600 hover:text-error transition-colors"><LogOut size={16} /></button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 min-w-0">
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-neutral-200 z-20">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <button className="lg:hidden text-neutral-600" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <div className="flex items-center gap-3 ml-auto">
              <Link href="/" className="text-xs text-neutral-600 hover:text-primary-500 flex items-center gap-1"><Home size={12} /> Main Site</Link>
              <button onClick={() => setActiveTab('notifications')} className="relative p-2 rounded-xl hover:bg-neutral-100 transition-all">
                <Bell size={18} className="text-neutral-600" />
                {unreadNotifications > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-500" />}
              </button>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">RM</div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}
