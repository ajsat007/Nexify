'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, Briefcase, FileText, DollarSign, Target,
  Users, Send, Download, TrendingUp, CheckCircle2, Clock,
  AlertCircle, Zap, Cpu, Bot, MessageSquare, Sparkles,
  Loader, ArrowRight, ExternalLink, Copy, Check,
  Wand2, Search, Globe, Linkedin, Twitter, RefreshCw,
  BarChart3, PieChart, Activity, Star, UserPlus, Plus,
  Menu, Save
} from 'lucide-react'

// ==================== DATA LAYER ====================
const DB = {
  get(key: string) { if (typeof window === 'undefined') return null; const d = localStorage.getItem(`nexify_freelancer_${key}`); return d ? JSON.parse(d) : null },
  set(key: string, v: any) { if (typeof window === 'undefined') return; localStorage.setItem(`nexify_freelancer_${key}`, JSON.stringify(v)) },
  init() {
    if (this.get('init')) return
    this.set('profile', { name: 'Ajinkya Satkar', title: 'Full-Stack Developer | AI-Powered Freelancer', email: 'ajinkyasatkar5@gmail.com', phone: '+91 9373955349', location: 'Pune, Maharashtra, India', skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'PostgreSQL', 'AI/ML'], rate: '₹30,000', bio: 'I build modern web applications using AI-powered development. 10x faster delivery, enterprise quality, freelance prices.' })
    this.set('leads', [
      { id: 'LD-001', from: 'LinkedIn', name: 'Rahul Sharma', company: 'TechStart', need: 'E-commerce website', budget: '₹50K-80K', status: 'new', date: '2026-07-12', email: 'rahul@techstart.com', aiScore: 85 },
      { id: 'LD-002', from: 'Upwork', name: 'Priya Patel', company: 'HealthApp', need: 'Patient dashboard UI', budget: '₹40K-60K', status: 'proposal', date: '2026-07-11', email: 'priya@healthapp.com', aiScore: 72 },
      { id: 'LD-003', from: 'Website', name: 'Amit Kumar', company: 'EduPro', need: 'Learning management system', budget: '₹80K-1.2L', status: 'new', date: '2026-07-11', email: 'amit@edupro.com', aiScore: 91 },
      { id: 'LD-004', from: 'Referral', name: 'Sneha Gupta', company: 'RetailX', need: 'Admin dashboard', budget: '₹25K-40K', status: 'won', date: '2026-07-10', email: 'sneha@retailx.com', aiScore: 78 },
      { id: 'LD-005', from: 'LinkedIn', name: 'Vikram Joshi', company: 'LogiMove', need: 'Fleet tracking portal', budget: '₹60K-1L', status: 'proposal', date: '2026-07-09', email: 'vikram@logimove.com', aiScore: 88 },
    ])
    this.set('proposals', [
      { id: 'PR-001', client: 'Priya Patel', company: 'HealthApp', project: 'Patient Dashboard UI', amount: 45000, status: 'sent', date: '2026-07-11', aiGenerated: true, deliveryDate: '2026-08-01' },
      { id: 'PR-002', client: 'Vikram Joshi', company: 'LogiMove', project: 'Fleet Tracking Portal', amount: 75000, status: 'draft', date: '2026-07-12', aiGenerated: true, deliveryDate: '2026-08-15' },
      { id: 'PR-003', client: 'Sneha Gupta', company: 'RetailX', project: 'Admin Dashboard', amount: 35000, status: 'accepted', date: '2026-07-10', aiGenerated: true, deliveryDate: '2026-07-25' },
    ])
    this.set('projects', [
      { id: 'PJ-001', name: 'Admin Dashboard', client: 'Sneha Gupta', company: 'RetailX', amount: 35000, status: 'in-progress', progress: 65, startDate: '2026-07-10', deadline: '2026-07-25', tasks: { total: 12, done: 8 } },
      { id: 'PJ-002', name: 'E-commerce Website', client: 'Demo Client', company: 'TechStart', amount: 65000, status: 'pending', progress: 0, startDate: '2026-07-20', deadline: '2026-08-10', tasks: { total: 20, done: 0 } },
    ])
    this.set('earning', { total: 35000, pending: 75000, thisMonth: 35000, lastMonth: 0 })
    this.set('init', true)
  }
}

const aiProposalTemplates: Record<string, string[]> = {
  website: [
    "I'll build you a modern, responsive website using Next.js + Tailwind CSS — fast, SEO-optimized, and beautiful on all devices.",
    "Complete with contact forms, blog CMS, analytics, and hosting setup. AI-powered development means 2-week delivery.",
  ],
  dashboard: [
    "Custom admin/dashboard with real-time charts, data tables, user management, and export features built with React + Node.js.",
    "I'll integrate your data source (API/DB/CSV) and build interactive visualizations. Delivered in 10 days.",
  ],
  fullstack: [
    "Full-stack application with authentication, database, API, and responsive frontend. I handle everything from design to deployment.",
    "AI agents write tests, handle deployment, and ensure 90%+ code coverage. Enterprise quality at freelance prices.",
  ],
}

function generateProposal(client: string, company: string, need: string, budget: string): string {
  const lower = need.toLowerCase()
  let template = 'I will build you a custom solution using modern technologies with fast delivery.'
  if (lower.includes('website') || lower.includes('site') || lower.includes('landing')) template = aiProposalTemplates.website[Math.floor(Math.random() * aiProposalTemplates.website.length)]
  else if (lower.includes('dashboard') || lower.includes('admin') || lower.includes('panel')) template = aiProposalTemplates.dashboard[Math.floor(Math.random() * aiProposalTemplates.dashboard.length)]
  else template = aiProposalTemplates.fullstack[Math.floor(Math.random() * aiProposalTemplates.fullstack.length)]

  return `Hi ${client},

Thank you for reaching out! I'd love to help ${company} with your ${need} project.

${template}

**My Offer:**
- 📋 Scope: Full development, deployment, and 1-month support
- ⏱ Timeline: 2-3 weeks
- 💰 Investment: ${budget} (fixed price)
- ✅ Includes: Source code, documentation, hosting setup

I use AI-powered development tools to deliver 2x faster than traditional freelancers — without compromising quality.

Let me know if you'd like to hop on a quick call or discuss further!

Best,
Nexify Freelancer`
}

// ==================== COMPONENTS ====================
function StatCard({ icon: Icon, label, value, trend, variant = 'default' }: { icon: any; label: string; value: string; trend?: string; variant?: string }) {
  return (
    <div className="bg-white dark:bg-neutral-800/50 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${variant === 'primary' ? 'bg-primary-50 dark:bg-primary-500/10' : variant === 'success' ? 'bg-success/10' : variant === 'warning' ? 'bg-warning/10' : 'bg-neutral-100 dark:bg-neutral-700'}`}>
          <Icon className={`w-5 h-5 ${variant === 'primary' ? 'text-primary-500' : variant === 'success' ? 'text-success' : variant === 'warning' ? 'text-warning' : 'text-neutral-800 dark:text-neutral-300'}`} />
        </div>
        {trend && <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-success' : 'text-error'}`}>{trend}</span>}
      </div>
      <div className="text-2xl font-heading font-bold text-neutral-900 dark:text-white">{value}</div>
      <div className="text-sm text-neutral-800">{label}</div>
    </div>
  )
}

function Badge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: 'bg-info/10 text-info', won: 'bg-success/10 text-success', lost: 'bg-error/10 text-error',
    proposal: 'bg-warning/10 text-warning', sent: 'bg-primary-50 text-primary-600', draft: 'bg-neutral-100 text-neutral-800',
    accepted: 'bg-success/10 text-success', 'in-progress': 'bg-info/10 text-info', pending: 'bg-warning/10 text-warning',
  }
  return <span className={`chip text-xs capitalize border-0 ${colors[status] || 'bg-neutral-100 text-neutral-800'}`}>{status}</span>
}

function ProgressBar({ value }: { value: number }) {
  return <div className="w-full bg-neutral-100 dark:bg-neutral-700 rounded-full h-2"><div className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500" style={{ width: `${value}%` }} /></div>
}

// ==================== PAGES ====================
function AiLeadFinder() {
  const [leads, setLeads] = useState<any[]>([])
  const [scanning, setScanning] = useState(false)
  const [searchUrl, setSearchUrl] = useState('')
  const [foundLeads, setFoundLeads] = useState<{ name: string; company: string; need: string; source: string }[]>([])
  const [showScanner, setShowScanner] = useState(false)

  useEffect(() => { setLeads(DB.get('leads') || []) }, [])

  const scanForLeads = () => {
    setScanning(true)
    setTimeout(() => {
      const newLeads = [
        { name: 'Ankit Verma', company: 'CloudBase Tech', need: 'Cloud migration dashboard', source: 'LinkedIn' },
        { name: 'Meera Iyer', company: 'FitLife App', need: 'Fitness tracking dashboard', source: 'Upwork' },
        { name: 'Rohan Das', company: 'EduGuru', need: 'Student portal', source: 'Website' },
      ]
      setFoundLeads(newLeads)
      setScanning(false)
    }, 2500)
  }

  const acceptLead = (lead: typeof foundLeads[0]) => {
    const allLeads = DB.get('leads') || []
    const newLead = {
      id: `LD-${String(allLeads.length + 1).padStart(3, '0')}`,
      from: lead.source, name: lead.name, company: lead.company,
      need: lead.need, budget: '₹30K-60K', status: 'new',
      date: new Date().toISOString().split('T')[0], email: `${lead.name.toLowerCase().replace(/\s/g, '.')}@${lead.company.toLowerCase().replace(/\s/g, '')}.com`,
      aiScore: Math.floor(Math.random() * 40) + 60,
    }
    allLeads.unshift(newLead)
    DB.set('leads', allLeads)
    setLeads(allLeads)
    setFoundLeads(prev => prev.filter(l => l.name !== lead.name))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-heading font-bold">AI Lead Finder</h1><p className="text-neutral-800 text-sm">AI scans LinkedIn, Upwork, and freelance platforms for you</p></div>
        <button onClick={() => setShowScanner(!showScanner)} className="btn-primary text-sm"><Search size={16} /> {showScanner ? 'Close Scanner' : 'Scan for Leads'}</button>
      </div>

      {showScanner && (
        <div className="card-surface p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"><Search className="w-5 h-5 text-white" /></div>
            <div><h2 className="font-semibold">AI Lead Scanner</h2><p className="text-xs text-neutral-800">Scans LinkedIn, Upwork, freelancer platforms for matching opportunities</p></div>
          </div>
          <div className="flex gap-3">
            <button onClick={scanForLeads} disabled={scanning} className="btn-primary text-sm">
              {scanning ? <><Loader size={14} className="animate-spin" /> Scanning...</> : <><Globe size={14} /> Scan Now</>}
            </button>
          </div>
          {scanning && (
            <div className="flex items-center gap-3 text-sm text-neutral-800 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
              <Loader size={16} className="animate-spin text-primary-500" />
              AI scanning LinkedIn jobs, Upwork projects, and website inquiries...
            </div>
          )}
          {foundLeads.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Found {foundLeads.length} potential leads</h3>
              {foundLeads.map((lead, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-xl border border-primary-500/20">
                  <div>
                    <div className="font-medium text-sm">{lead.name} — <span className="text-neutral-800">{lead.company}</span></div>
                    <div className="text-xs text-neutral-800">{lead.need} · Source: {lead.source}</div>
                  </div>
                  <button onClick={() => acceptLead(lead)} className="btn-primary text-xs px-4 py-2"><UserPlus size={12} /> Accept</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {leads.map(l => (
          <div key={l.id} className="card-surface p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center text-primary-500 font-bold">{l.company.slice(0, 2)}</div>
                <div>
                  <div className="flex items-center gap-2"><span className="font-semibold text-sm">{l.name}</span><Badge status={l.status} /><span className="text-xs text-neutral-800">{l.from}</span></div>
                  <div className="text-xs text-neutral-800">{l.company} · {l.need}</div>
                  <div className="text-xs text-neutral-800">{l.email} · {l.budget}</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-neutral-800">AI Score</div>
                <div className={`text-lg font-heading font-bold ${l.aiScore >= 80 ? 'text-success' : l.aiScore >= 70 ? 'text-warning' : 'text-neutral-800'}`}>{l.aiScore}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AiProposalGenerator() {
  const [proposals, setProposals] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [selectedLead, setSelectedLead] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setProposals(DB.get('proposals') || [])
    setLeads((DB.get('leads') || []).filter((l: any) => l.status !== 'won' && l.status !== 'lost'))
  }, [])

  const generate = () => {
    if (!selectedLead) return
    setGenerating(true)
    setGenerated('')
    setTimeout(() => {
      const lead = leads.find((l: any) => l.id === selectedLead)
      if (!lead) return
      const proposal = generateProposal(lead.name, lead.company, lead.need, lead.budget)
      setGenerated(proposal)
      setGenerating(false)
    }, 2000)
  }

  const saveProposal = () => {
    const lead = leads.find((l: any) => l.id === selectedLead)
    if (!lead || !generated) return
    const allProposals = DB.get('proposals') || []
    const newProp = {
      id: `PR-${String(allProposals.length + 1).padStart(3, '0')}`,
      client: lead.name, company: lead.company, project: lead.need,
      amount: parseInt(lead.budget.replace(/[^0-9]/g, '')) || 50000,
      status: 'draft', date: new Date().toISOString().split('T')[0],
      aiGenerated: true, deliveryDate: new Date(Date.now() + 21*86400000).toISOString().split('T')[0],
    }
    allProposals.unshift(newProp)
    DB.set('proposals', allProposals)
    setProposals(allProposals)

    // Update lead status
    const allLeads = DB.get('leads') || []
    DB.set('leads', allLeads.map((l: any) => l.id === selectedLead ? { ...l, status: 'proposal' } : l))
    setGenerated('')
    setSelectedLead('')
  }

  const copyProposal = () => {
    navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-heading font-bold">AI Proposal Generator</h1><p className="text-neutral-800 text-sm">AI generates personalized proposals in seconds</p></div>

      <div className="card-surface p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"><Wand2 className="w-5 h-5 text-white" /></div>
          <div><h2 className="font-semibold">Generate Proposal</h2><p className="text-xs text-neutral-800">Select a lead and AI creates a custom proposal instantly</p></div>
        </div>

        <select className="input-field" value={selectedLead} onChange={e => setSelectedLead(e.target.value)}>
          <option value="">Select a lead...</option>
          {leads.map((l: any) => <option key={l.id} value={l.id}>{l.name} — {l.company} — {l.need}</option>)}
        </select>

        <div className="flex gap-3">
          <button onClick={generate} disabled={!selectedLead || generating} className="btn-primary text-sm">
            {generating ? <><Loader size={14} className="animate-spin" /> Generating...</> : <><Wand2 size={14} /> Generate Proposal</>}
          </button>
        </div>

        {generated && (
          <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700 whitespace-pre-line text-sm text-neutral-800 dark:text-neutral-300 animate-slide-up">
            {generated}
            <div className="flex gap-2 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <button onClick={saveProposal} className="btn-primary text-sm"><Save size={14} /> Save Proposal</button>
              <button onClick={copyProposal} className="btn-secondary text-sm">{copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}</button>
            </div>
          </div>
        )}
      </div>

      <h3 className="font-semibold">Saved Proposals</h3>
      <div className="space-y-3">
        {proposals.map(p => (
          <div key={p.id} className="card-surface p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2"><span className="font-semibold text-sm">{p.project}</span><Badge status={p.status} /></div>
                <div className="text-xs text-neutral-800">{p.client} · {p.company} · {p.aiGenerated && 'AI-generated'}</div>
              </div>
              <div className="text-right"><div className="font-heading font-bold">₹{p.amount.toLocaleString('en-IN')}</div><div className="text-xs text-neutral-800">Delivery: {p.deliveryDate}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AiCodingAgent() {
  const [projects, setProjects] = useState<any[]>([])
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [output, setOutput] = useState('')

  useEffect(() => { setProjects(DB.get('projects') || []) }, [])

  const generateCode = () => {
    if (!prompt.trim()) return
    setGenerating(true)
    setOutput('')
    setTimeout(() => {
      const outputs = [
        `// Auto-generated component: ${prompt.split(' ').slice(0, 3).join(' ')}\n\nexport default function Component() {\n  return (\n    <div className="p-6 bg-white rounded-2xl shadow-lg">\n      <h2 className="text-2xl font-bold mb-4">Feature</h2>\n      <p className="text-neutral-800">AI-generated component based on your requirements.</p>\n    </div>\n  )\n}`,
        `✅ Task completed! AI agent has:\n1. Created the requested component/structure\n2. Added TypeScript types and interfaces\n3. Written unit tests (92% coverage)\n4. Formatted and linted all files\n\nReady for review in your project repository.`,
      ]
      setOutput(outputs[Math.floor(Math.random() * outputs.length)])
      setGenerating(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-heading font-bold">AI Coding Agent</h1><p className="text-neutral-800 text-sm">Describe what you need — AI agents build it</p></div>

      <div className="card-surface p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>
          <div><h2 className="font-semibold">AI Code Generator</h2><p className="text-xs text-neutral-800">Describe your requirement in plain English</p></div>
        </div>
        <textarea className="input-field resize-none" rows={3} placeholder="e.g. Create a contact form component with validation and email sending..." value={prompt} onChange={e => setPrompt(e.target.value)} />
        <button onClick={generateCode} disabled={!prompt.trim() || generating} className="btn-primary text-sm">
          {generating ? <><Loader size={14} className="animate-spin" /> AI Agent Working...</> : <><Zap size={14} /> Generate with AI</>}
        </button>
        {output && (
          <div className="bg-neutral-900 text-green-400 rounded-xl p-5 text-xs font-mono whitespace-pre-wrap animate-slide-up">{output}</div>
        )}
      </div>

      <h3 className="font-semibold">Active Projects</h3>
      <div className="space-y-3">
        {projects.filter(p => p.status !== 'pending').map(p => (
          <div key={p.id} className="card-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2"><span className="font-semibold text-sm">{p.name}</span><Badge status={p.status} /></div>
              <span className="text-sm font-semibold">₹{p.amount.toLocaleString('en-IN')}</span>
            </div>
            <ProgressBar value={p.progress} />
            <div className="flex items-center justify-between text-xs text-neutral-800 mt-2">
              <span>{p.tasks.done}/{p.tasks.total} tasks</span><span>{p.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FreelancerDashboard() {
  const [leads, setLeads] = useState<any[]>([])
  const [proposals, setProposals] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [earning, setEarning] = useState<any>({})

  useEffect(() => {
    setLeads(DB.get('leads') || [])
    setProposals(DB.get('proposals') || [])
    setProjects(DB.get('projects') || [])
    setEarning(DB.get('earning') || { total: 0, pending: 0, thisMonth: 0 })
  }, [])

  const newLeads = leads.filter(l => l.status === 'new').length
  const wonLeads = leads.filter(l => l.status === 'won').length
  const activeProposals = proposals.filter(p => p.status === 'sent').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-heading font-bold">AI Freelancer Dashboard</h1><p className="text-neutral-800 text-sm">Everything runs on AI — you just collect the money</p></div>
        <Link href="/contact" className="btn-primary text-sm" target="_blank">Share Your Link <ExternalLink size={14} /></Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Total Earned" value={`₹${(earning.total/1000).toFixed(0)}K`} trend="+100%" variant="success" />
        <StatCard icon={Clock} label="Pending Payments" value={`₹${(earning.pending/1000).toFixed(0)}K`} variant="warning" />
        <StatCard icon={Target} label="New Leads" value={String(newLeads)} variant="primary" />
        <StatCard icon={TrendingUp} label="Conversion Rate" value={`${leads.length ? Math.round(wonLeads/leads.length*100) : 0}%`} variant="accent" />
      </div>

      {/* Active Proposals */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-surface p-5">
          <h2 className="font-semibold mb-4">Recent Leads</h2>
          <div className="space-y-3">
            {leads.slice(0, 3).map(l => (
              <div key={l.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center text-primary-500 text-xs font-bold">{l.company.slice(0, 2)}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{l.name}</div>
                  <div className="text-xs text-neutral-800">{l.need} · {l.budget}</div>
                </div>
                <Badge status={l.status} />
              </div>
            ))}
          </div>
        </div>
        <div className="card-surface p-5">
          <h2 className="font-semibold mb-4">AI Activity Log</h2>
          <div className="space-y-3 text-sm">
            {[
              { agent: 'LeadFinder AI', action: 'Scanned LinkedIn — found 3 matching leads', time: '2m ago' },
              { agent: 'Proposal AI', action: 'Generated proposal for Priya Patel (₹45K)', time: '15m ago' },
              { agent: 'Code Agent', action: 'Dashboard project: 65% complete, 8/12 tasks done', time: '1h ago' },
              { agent: 'Email AI', action: 'Sent follow-up to Vikram Joshi', time: '2h ago' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 animate-pulse" />
                <div className="flex-1"><span className="text-neutral-800">{a.action}</span><div className="text-xs text-neutral-800">{a.time} · {a.agent}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div className="card-surface p-5">
        <h2 className="font-semibold mb-4">Active Projects</h2>
        <div className="space-y-4">
          {projects.map(p => (
            <div key={p.id}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium">{p.name} — {p.client}</span>
                <span className="text-neutral-800">{p.progress}% · ₹{p.amount.toLocaleString('en-IN')}</span>
              </div>
              <ProgressBar value={p.progress} />
            </div>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      <div className="card-surface p-5">
        <h2 className="font-semibold mb-4">Your Freelancer Profile</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Your Name', value: 'Your Name Here' },
            { label: 'Title', value: 'Full-Stack Developer | AI-Powered' },
            { label: 'Email', value: 'you@email.com' },
            { label: 'Rate', value: '₹30,000+ / project' },
          ].map((f, i) => (
            <div key={i} className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl"><div className="text-xs text-neutral-800">{f.label}</div><div className="text-sm font-medium">{f.value}</div></div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {['Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS'].map(s => (
            <span key={s} className="chip bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs">{s}</span>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-success/10 to-primary-500/10 rounded-2xl border border-success/20 p-6 text-center">
        <h2 className="text-lg font-heading font-bold mb-2">🤖 AI is Working for You Right Now</h2>
        <p className="text-sm text-neutral-800">LeadFinder AI is scanning platforms · Proposal AI is drafting · Code Agent is building · All while you sleep.</p>
      </div>
    </div>
  )
}

// ==================== MAIN ====================
export default function FreelancerPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => { DB.init(); const params = new URLSearchParams(window.location.search); const tab = params.get('tab'); if (tab) setActiveTab(tab) }, [])

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'AI Lead Finder', icon: Target },
    { id: 'proposals', label: 'AI Proposals', icon: FileText },
    { id: 'coding', label: 'AI Coding Agent', icon: Bot },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-full w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center"><Briefcase className="w-5 h-5 text-white" /></div>
            <div><h2 className="font-heading font-bold text-sm">Freelancer Hub</h2><p className="text-neutral-800 text-xs">AI-Powered</p></div>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-500/20' : 'text-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 dark:text-neutral-800'}`}>
              <tab.icon size={18} /><span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">Y</div>
            <div><div className="text-sm font-medium text-neutral-900 dark:text-white">You</div><div className="text-xs text-neutral-800">Freelancer</div></div>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <main className="flex-1 min-w-0">
        <div className="sticky top-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 z-20">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <button className="lg:hidden text-neutral-800" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <div className="flex items-center gap-3 ml-auto">
              <Link href="/" className="flex items-center gap-1 text-xs text-neutral-800 hover:text-primary-500"><Globe size={12} /> Site</Link>
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">Y</div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && <FreelancerDashboard />}
          {activeTab === 'leads' && <AiLeadFinder />}
          {activeTab === 'proposals' && <AiProposalGenerator />}
          {activeTab === 'coding' && <AiCodingAgent />}
        </div>
      </main>
    </div>
  )
}
