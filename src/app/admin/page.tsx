'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, Users, FolderKanban, Target, DollarSign,
  BarChart3, LogOut, Home, TrendingUp, Mail, Phone, Plus,
  ChevronRight, CheckCircle2, Clock, AlertCircle, Loader,
  Sparkles, FileText, Send, Check, Shield,
} from 'lucide-react'
import { Sidebar, type SidebarItem } from '@/components/Sidebar'

// ── Dashboard ──

function StatCard({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub?: string; icon: any; color: string }) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="text-2xl font-heading font-bold dark:text-white">{value}</div>
      <div className="text-sm text-neutral-500 dark:text-neutral-400">{label}</div>
      {sub && <div className="text-xs text-neutral-400 mt-1">{sub}</div>}
    </div>
  )
}

// ── Lead Row ──

function LeadRow({ lead, onRefresh }: { lead: any; onRefresh: () => void }) {
  const [generating, setGenerating] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    qualified: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    proposal: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    won: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    lost: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  }

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id }),
      })
      onRefresh()
    } catch {}
    setGenerating(false)
  }

  const handleSend = async () => {
    setSending(true)
    try {
      await fetch('/api/email-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id }),
      })
      setSent(true)
    } catch {}
    setSending(false)
  }

  return (
    <tr className="border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
      <td className="py-3 px-3">
        <div className="font-medium text-sm dark:text-white">{lead.contact_name}</div>
        <div className="text-xs text-neutral-500">{lead.company}</div>
      </td>
      <td className="py-3 px-3 hidden sm:table-cell">
        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <Mail size={11} /> {lead.email}
        </div>
      </td>
      <td className="py-3 px-3 hidden lg:table-cell text-xs text-neutral-500">{lead.service_interest}</td>
      <td className="py-3 px-3">
        <span className={`chip text-xs ${statusColors[lead.status] || statusColors.new}`}>{lead.status}</span>
      </td>
      <td className="py-3 px-3 text-right">
        <div className="text-sm font-semibold dark:text-white">{lead.budget?.toLocaleString('en-IN') || '—'}</div>
      </td>
      <td className="py-3 px-3 text-right">
        <div className="flex items-center gap-1.5 justify-end">
          {(lead.status === 'new' || lead.status === 'qualified') && (
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 transition-all text-xs disabled:opacity-50"
            >
              {generating ? <Loader size={12} className="animate-spin" /> : <Sparkles size={12} />}
              <span className="hidden sm:inline ml-1">{generating ? '...' : 'Proposal'}</span>
            </button>
          )}
          {lead.status === 'proposal' && !sent && (
            <button
              onClick={handleSend}
              disabled={sending}
              className="chip bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-all text-xs disabled:opacity-50"
            >
              {sending ? <Loader size={12} className="animate-spin" /> : <Send size={12} />}
              <span className="hidden sm:inline ml-1">{sending ? '...' : 'Email'}</span>
            </button>
          )}
          {sent && <span className="chip text-xs bg-emerald-100 text-emerald-600"><Check size={11} /> Sent</span>}
          {lead.status === 'won' && <span className="chip text-xs bg-emerald-100 text-emerald-600">Won</span>}
          {lead.status === 'lost' && <span className="chip text-xs bg-red-100 text-red-600">Lost</span>}
          {lead.status === 'closed' && <span className="chip text-xs bg-neutral-100 text-neutral-600">Closed</span>}
          {lead.status === 'proposal' && !sent && <span className="text-xs text-neutral-400">—</span>}
        </div>
      </td>
    </tr>
  )
}

// ── Main Page ──

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [metrics, setMetrics] = useState<any>(null)
  const [leads, setLeads] = useState<any[]>([])
  const [proposals, setProposals] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const [metricsRes, leadsRes, proposalsRes, projectsRes] = await Promise.all([
        fetch('/api/metrics').then(r => r.json()),
        fetch('/api/leads').then(r => r.json()),
        fetch('/api/proposals').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
      ])
      setMetrics(metricsRes)
      setLeads(leadsRes.leads || [])
      setProposals(proposalsRes.proposals || [])
      setProjects(projectsRes.projects || [])
    } catch (e) { console.error('Failed to fetch admin data', e) }
    setLoading(false)
  }

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/session')
        const data = await res.json()
        if (data.authenticated) {
          setAuthenticated(true)
          fetchData()
        } else {
          setShowLogin(true)
          setLoading(false)
        }
      } catch {
        setShowLogin(true)
        setLoading(false)
      }
    }
    checkSession()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, role: 'admin' }),
      })
      const data = await res.json()
      if (data.success) {
        setShowLogin(false)
        setAuthenticated(true)
        fetchData()
      }
    } catch {}
  }

  const handleLogout = async () => {
    await fetch('/api/session', { method: 'DELETE' })
    setAuthenticated(false)
    setShowLogin(true)
  }

  const sidebarItems: SidebarItem[] = [
    { label: 'Dashboard', href: '#dashboard', icon: LayoutDashboard, active: activeTab === 'dashboard', onClick: () => setActiveTab('dashboard') },
    { label: 'Leads', href: '#leads', icon: Target, active: activeTab === 'leads', onClick: () => setActiveTab('leads') },
    { label: 'Proposals', href: '#proposals', icon: FileText, active: activeTab === 'proposals', onClick: () => setActiveTab('proposals') },
    { label: 'Projects', href: '#projects', icon: FolderKanban, active: activeTab === 'projects', onClick: () => setActiveTab('projects') },
  ]

  if (showLogin) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold dark:text-white">Admin Login</h1>
            <p className="text-sm text-neutral-500 mt-2">Enter your email to access the dashboard.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" required className="input-field" placeholder="admin@nexify.tech" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            <button type="submit" className="btn-primary w-full">Access Dashboard</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Sidebar items={sidebarItems} title="Nexify Admin" subtitle="AI Operations" onLogout={handleLogout} />

      <div className="lg:pl-64">
        {/* Mobile header spacer */}
        <div className="lg:hidden h-16" />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold dark:text-white">Admin Dashboard</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Real data from your database</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={fetchData} className="btn-primary text-sm" disabled={loading}>
                {loading ? <Loader size={14} className="animate-spin" /> : null}
                Refresh
              </button>
            </div>
          </div>

          {loading && !metrics ? (
            <div className="flex items-center justify-center py-20">
              <Loader size={24} className="animate-spin text-primary-500" />
            </div>
          ) : (
            <>
              {/* ── MAIN DASHBOARD ── */}
              {activeTab === 'dashboard' && (
                <>
                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard label="Total Leads" value={String(metrics?.sales?.leads || 0)} sub={`${metrics?.sales?.conversion || 0}% conversion`} icon={Target} color="bg-blue-500" />
                    <StatCard label="Active Projects" value={String(metrics?.projects?.active || 0)} sub={`${metrics?.projects?.planning || 0} planning`} icon={FolderKanban} color="bg-emerald-500" />
                    <StatCard label="Revenue" value={`${(metrics?.finance?.income || 0).toLocaleString('en-IN')}`} sub={`${metrics?.finance?.profitMargin || 0}% margin`} icon={TrendingUp} color="bg-purple-500" />
                    <StatCard label="AI Agents" value={String(metrics?.agents?.active || 0)} sub={`${metrics?.agents?.uptime || 0}% uptime`} icon={Users} color="bg-amber-500" />
                  </div>

                  {/* Agent activity + Recent leads */}
                  <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    {/* Recent Leads */}
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5">
                      <h3 className="font-semibold text-sm mb-4 dark:text-white flex items-center gap-2">
                        <Target size={16} className="text-primary-500" /> Recent Leads
                      </h3>
                      <div className="space-y-3">
                        {leads.slice(0, 5).map((l: any) => (
                          <div key={l.id} className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                            <div className="min-w-0">
                              <div className="text-sm font-medium dark:text-white truncate">{l.contact_name}</div>
                              <div className="text-xs text-neutral-500 truncate">{l.company} · {l.service_interest}</div>
                            </div>
                            <span className={`chip text-[10px] ${
                              l.status === 'new' ? 'bg-blue-100 text-blue-600' :
                              l.status === 'qualified' ? 'bg-purple-100 text-purple-600' :
                              l.status === 'proposal' ? 'bg-amber-100 text-amber-600' :
                              'bg-emerald-100 text-emerald-600'
                            }`}>{l.status}</span>
                          </div>
                        ))}
                        {leads.length === 0 && <p className="text-sm text-neutral-400">No leads yet. Submit a contact form!</p>}
                      </div>
                    </div>

                    {/* Proposals Summary */}
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5">
                      <h3 className="font-semibold text-sm mb-4 dark:text-white flex items-center gap-2">
                        <FileText size={16} className="text-primary-500" /> Proposals
                      </h3>
                      <div className="space-y-3">
                        {proposals.slice(0, 5).map((p: any) => (
                          <div key={p.id} className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
                            <div className="min-w-0">
                              <div className="text-sm font-medium dark:text-white truncate">{p.title}</div>
                              <div className="text-xs text-neutral-500">{p.price_range}</div>
                            </div>
                            <span className={`chip text-[10px] ${
                              p.status === 'draft' ? 'bg-neutral-100 text-neutral-600' :
                              p.status === 'sent' ? 'bg-blue-100 text-blue-600' :
                              p.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' :
                              'bg-red-100 text-red-600'
                            }`}>{p.status}</span>
                          </div>
                        ))}
                        {proposals.length === 0 && <p className="text-sm text-neutral-400">No proposals yet. Generate from leads.</p>}
                      </div>
                    </div>
                  </div>

                  {/* Performance chart */}
                  <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5">
                    <h3 className="font-semibold text-sm mb-4 dark:text-white">Monthly Performance</h3>
                    <div className="flex items-end gap-2 sm:gap-4 h-32">
                      {metrics?.performance?.map((p: any) => (
                        <div key={p.month} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full bg-primary-500/20 rounded-t-md relative" style={{ height: `${(p.tasks / 3000) * 100}%` }}>
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500 font-medium">{p.tasks}</div>
                          </div>
                          <div className="text-[10px] text-neutral-400">{p.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ── LEADS TABLE ── */}
              {activeTab === 'leads' && (
                <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                  <div className="p-4 border-b border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
                    <h3 className="font-semibold text-sm dark:text-white">All Leads ({leads.length})</h3>
                    <button onClick={() => window.location.href = '/contact'} className="btn-primary text-xs">
                      <Plus size={14} /> Add Lead
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-neutral-100 dark:border-neutral-700 text-left text-xs text-neutral-500 uppercase tracking-wider">
                          <th className="py-3 px-3 font-medium">Contact</th>
                          <th className="py-3 px-3 hidden sm:table-cell font-medium">Email</th>
                          <th className="py-3 px-3 hidden lg:table-cell font-medium">Service</th>
                          <th className="py-3 px-3 font-medium">Status</th>
                          <th className="py-3 px-3 text-right font-medium">Budget</th>
                          <th className="py-3 px-3 text-right font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead: any) => (
                          <LeadRow key={lead.id} lead={lead} onRefresh={fetchData} />
                        ))}
                        {leads.length === 0 && (
                          <tr><td colSpan={6} className="py-8 text-center text-neutral-400">No leads found. Submit a contact form to create one.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── PROPOSALS ── */}
              {activeTab === 'proposals' && (
                <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5">
                  <h3 className="font-semibold text-sm mb-4 dark:text-white">AI-Generated Proposals ({proposals.length})</h3>
                  <div className="space-y-3">
                    {proposals.map((p: any) => (
                      <div key={p.id} className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h4 className="font-semibold text-sm dark:text-white">{p.title}</h4>
                            <p className="text-xs text-neutral-500 mt-1">
                              {p.price_range} · {p.timeline} · Generated {new Date(p.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-neutral-400 mt-2 line-clamp-3">{p.content.slice(0, 300)}...</p>
                          </div>
                          <span className={`chip text-xs shrink-0 ${
                            p.status === 'draft' ? 'bg-neutral-100 text-neutral-600' :
                            p.status === 'sent' ? 'bg-blue-100 text-blue-600' :
                            p.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' :
                            'bg-red-100 text-red-600'
                          }`}>{p.status}</span>
                        </div>
                      </div>
                    ))}
                    {proposals.length === 0 && (
                      <p className="text-sm text-neutral-400 text-center py-8">No proposals yet. Go to Leads tab and click "AI Proposal" to generate one.</p>
                    )}
                  </div>
                </div>
              )}

              {/* ── PROJECTS ── */}
              {activeTab === 'projects' && (
                <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5">
                  <h3 className="font-semibold text-sm mb-4 dark:text-white">Projects ({projects.length})</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {projects.map((p: any) => (
                      <div key={p.id} className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-4 border border-neutral-100 dark:border-neutral-700">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm dark:text-white">{p.name}</h4>
                          <span className={`chip text-[10px] ${
                            p.status === 'active' ? 'bg-emerald-100 text-emerald-600' :
                            p.status === 'planning' ? 'bg-blue-100 text-blue-600' :
                            p.status === 'completed' ? 'bg-green-100 text-green-600' :
                            'bg-amber-100 text-amber-600'
                          }`}>{p.status}</span>
                        </div>
                        <p className="text-xs text-neutral-500 mb-2">{p.client} · {p.value?.toLocaleString('en-IN')}</p>
                        {p.progress > 0 && (
                          <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-600">
                            <div className="h-full rounded-full bg-primary-500" style={{ width: `${p.progress}%` }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
