'use client'

import { Sidebar, type SidebarItem } from '@/components/Sidebar'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, Target, FileText, MessageSquare, Send,
  PhoneCall, RefreshCw, TrendingUp, DollarSign, Users,
  Plus, Search, Download, MoreHorizontal, CheckCircle2,
  AlertCircle, Clock, Zap, ArrowRight, ArrowUpRight,
  Mail, Phone, MessageCircle, ChevronDown, ChevronUp,
  Copy, Check, ExternalLink, Play, Pause, Settings,
  Home, PieChart, BarChart3, Activity, Star, UserPlus,
  Filter, Trash2, Edit3, X, Globe, Linkedin, Twitter,
  Pen, Ban, Bell, Eye, Wand2, Loader, Menu, Wifi
} from 'lucide-react'

const DB = {
  get(key: string) { if (typeof window === 'undefined') return null; const d = localStorage.getItem(`nexify_sales_${key}`); return d ? JSON.parse(d) : null },
  set(key: string, value: any) { if (typeof window === 'undefined') return; localStorage.setItem(`nexify_sales_${key}`, JSON.stringify(value)) },
  init() {
    if (this.get('initialized')) return

    // Pipeline deals
    this.set('deals', [
      { id: 'DL-001', company: 'TechVista Solutions', contact: 'Vikram Singh', email: 'vikram@techvista.com', phone: '+91 98765 43210', value: 800000, service: 'Custom Software', stage: 'proposal', probability: 60, source: 'LinkedIn', lastContact: '2026-07-11', notes: 'Interested in ERP system. Sent proposal on Jul 10.', createdAt: '2026-07-08' },
      { id: 'DL-002', company: 'GreenEnergy Corp', contact: 'Neha Patel', email: 'neha@greenenergy.com', phone: '+91 87654 32109', value: 1200000, service: 'AI Solutions', stage: 'negotiation', probability: 80, source: 'Website', lastContact: '2026-07-11', notes: 'AI energy optimization. Budget approved. Negotiating timeline.', createdAt: '2026-07-05' },
      { id: 'DL-003', company: 'MediCare Hospitals', contact: 'Dr. Rajesh Kumar', email: 'rajesh@medicare.com', phone: '+91 76543 21098', value: 500000, service: 'Mobile App', stage: 'qualified', probability: 40, source: 'Referral', lastContact: '2026-07-10', notes: 'Patient portal app. Need to schedule demo.', createdAt: '2026-07-09' },
      { id: 'DL-004', company: 'EduPrime Institute', contact: 'Ananya Gupta', email: 'ananya@eduprime.com', phone: '+91 65432 10987', value: 250000, service: 'Web Development', stage: 'proposal', probability: 55, source: 'Twitter/X', lastContact: '2026-07-10', notes: 'Website redesign with LMS. Proposal sent.', createdAt: '2026-07-07' },
      { id: 'DL-005', company: 'StyleHub Fashion', contact: 'Priya Sharma', email: 'priya@stylehub.com', phone: '+91 43210 98765', value: 600000, service: 'E-commerce', stage: 'qualified', probability: 35, source: 'LinkedIn', lastContact: '2026-07-11', notes: 'Multi-vendor marketplace. Interested in demo.', createdAt: '2026-07-10' },
      { id: 'DL-006', company: 'TravelEase Inc', contact: 'Sneha Kapoor', email: 'sneha@travelease.com', phone: '+91 21098 76543', value: 700000, service: 'Mobile App', stage: 'proposal', probability: 50, source: 'Conference', lastContact: '2026-07-09', notes: 'Travel booking app with AI recommendations. Proposal in progress.', createdAt: '2026-07-06' },
      { id: 'DL-007', company: 'SecureBank Finance', contact: 'Rahul Verma', email: 'rahul@securebank.com', phone: '+91 32109 87654', value: 350000, service: 'Cyber Security', stage: 'negotiation', probability: 85, source: 'Referral', lastContact: '2026-07-11', notes: 'Security audit. Almost closed. Discussing start date.', createdAt: '2026-07-04' },
      { id: 'DL-008', company: 'DataPulse Analytics', contact: 'Arun Mehta', email: 'arun@datapulse.com', phone: '+91 10987 65432', value: 450000, service: 'Data Analytics', stage: 'new', probability: 15, source: 'Google Ads', lastContact: '2026-07-11', notes: 'New lead from Google Ads campaign. Needs qualification call.', createdAt: '2026-07-11' },
      { id: 'DL-009', company: 'CloudBase Tech', contact: 'Rohit Sharma', email: 'rohit@cloudbase.com', phone: '+91 09876 54321', value: 900000, service: 'Cloud Services', stage: 'new', probability: 10, source: 'Website', lastContact: '2026-07-11', notes: 'Filled contact form. Cloud migration project.', createdAt: '2026-07-11' },
      { id: 'DL-010', company: 'FreshFoods Delivery', contact: 'Kiran Desai', email: 'kiran@freshfoods.com', phone: '+91 98765 01234', value: 550000, service: 'Mobile App', stage: 'qualified', probability: 30, source: 'Referral', lastContact: '2026-07-10', notes: 'Food delivery app. Met at conference. Follow up needed.', createdAt: '2026-07-08' },
    ])

    // Proposals & Quotes
    this.set('proposals', [
      { id: 'PROP-001', dealId: 'DL-002', title: 'AI Energy Optimization Platform', company: 'GreenEnergy Corp', value: 1200000, status: 'sent', sentDate: '2026-07-09', validUntil: '2026-08-09', type: 'Fixed Price' },
      { id: 'PROP-002', dealId: 'DL-001', title: 'ERP System for Manufacturing', company: 'TechVista Solutions', value: 800000, status: 'sent', sentDate: '2026-07-10', validUntil: '2026-08-10', type: 'Fixed Price' },
      { id: 'PROP-003', dealId: 'DL-007', title: 'Cybersecurity Audit Package', company: 'SecureBank Finance', value: 350000, status: 'draft', sentDate: '-', validUntil: '-', type: 'Fixed Price' },
      { id: 'PROP-004', dealId: 'DL-004', title: 'Website Redesign + LMS', company: 'EduPrime Institute', value: 250000, status: 'draft', sentDate: '-', validUntil: '-', type: 'Fixed Price' },
    ])

    // Email campaigns
    this.set('campaigns', [
      { id: 'CAMP-001', name: 'New Lead Welcome', type: 'automated', status: 'active', sent: 245, opened: 178, clicked: 56, replied: 23, lastSent: '2026-07-11' },
      { id: 'CAMP-002', name: 'Follow-up Sequence (3-step)', type: 'sequence', status: 'active', sent: 120, opened: 89, clicked: 34, replied: 12, lastSent: '2026-07-11' },
      { id: 'CAMP-003', name: 'Proposal Follow-up', type: 'automated', status: 'active', sent: 67, opened: 52, clicked: 28, replied: 15, lastSent: '2026-07-10' },
      { id: 'CAMP-004', name: 'LinkedIn Outreach Q3', type: 'manual', status: 'paused', sent: 89, opened: 67, clicked: 31, replied: 9, lastSent: '2026-07-08' },
    ])

    // WhatsApp messages
    this.set('whatsapp', [
      { id: 'WA-001', contact: 'Vikram Singh', company: 'TechVista Solutions', message: 'Hi Vikram, just checking if you had a chance to review the proposal we sent. Happy to answer any questions!', status: 'sent', direction: 'outbound', date: '2026-07-11', time: '10:30 AM' },
      { id: 'WA-002', contact: 'Neha Patel', company: 'GreenEnergy Corp', message: 'The AI energy optimization demo is ready. Would you like to schedule a walkthrough this week?', status: 'read', direction: 'outbound', date: '2026-07-11', time: '9:15 AM' },
      { id: 'WA-003', contact: 'Rahul Verma', company: 'SecureBank Finance', message: 'Yes, the security audit scope looks good. Let\'s finalize the start date.', status: 'replied', direction: 'inbound', date: '2026-07-11', time: '11:45 AM' },
    ])

    // Follow-up tasks
    this.set('followups', [
      { id: 'FUP-001', dealId: 'DL-003', action: 'Schedule product demo', dueDate: '2026-07-13', priority: 'high', status: 'pending', assignedTo: 'SalesAgent-Mu' },
      { id: 'FUP-002', dealId: 'DL-005', action: 'Send product brochure', dueDate: '2026-07-12', priority: 'medium', status: 'pending', assignedTo: 'SalesAgent-Mu' },
      { id: 'FUP-003', dealId: 'DL-010', action: 'Follow-up call after conference', dueDate: '2026-07-12', priority: 'medium', status: 'done', assignedTo: 'SalesAgent-Mu' },
      { id: 'FUP-004', dealId: 'DL-008', action: 'Qualification call', dueDate: '2026-07-12', priority: 'high', status: 'pending', assignedTo: 'SalesAgent-Mu' },
      { id: 'FUP-005', dealId: 'DL-009', action: 'Send cloud services brochure', dueDate: '2026-07-13', priority: 'low', status: 'pending', assignedTo: 'SalesAgent-Mu' },
    ])

    this.set('initialized', true)
  }
}

const statusColors: Record<string, string> = {
  new: 'bg-info/10 text-info border-info/20',
  qualified: 'bg-accent-50 text-accent-600 border-accent-200',
  proposal: 'bg-warning/10 text-warning border-warning/20',
  negotiation: 'bg-primary-50 text-primary-600 border-primary-200',
  closed_won: 'bg-success/10 text-success border-success/20',
  closed_lost: 'bg-error/10 text-error border-error/20',
  sent: 'bg-success/10 text-success border-success/20',
  draft: 'bg-surface-100 text-surface-800 border-surface-200',
  active: 'bg-success/10 text-success border-success/20',
  paused: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-error/10 text-error border-error/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-surface-100 text-surface-800 border-surface-200',
  pending: 'bg-warning/10 text-warning border-warning/20',
  done: 'bg-success/10 text-success border-success/20',
  sent_m: 'bg-primary-50 text-primary-600 border-primary-200',
  read: 'bg-success/10 text-success border-success/20',
  replied: 'bg-accent-50 text-accent-600 border-accent-200',
  outbound: 'bg-primary-50 text-primary-600 border-primary-200',
  inbound: 'bg-accent-50 text-accent-600 border-accent-200',
}

function Badge({ status }: { status: string }) {
  return <span className={`chip text-xs capitalize border ${statusColors[status] || 'bg-surface-100 text-surface-800'}`}>{status.replace('_', ' ')}</span>
}

function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  const color = value >= 75 ? 'bg-success' : value >= 40 ? 'bg-primary-500' : 'bg-warning'
  return (
    <div className={`w-full bg-surface-100 rounded-full h-2 ${className}`}>
      <div className={`h-2 rounded-full transition-all duration-500 ${color}`} style={{ width: `${value}%` }} />
    </div>
  )
}

function StatCard({ icon: Icon, label, value, trend, sub, variant = 'default' }: { icon: any; label: string; value: string; trend?: string; sub?: string; variant?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-surface-200 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${variant === 'primary' ? 'bg-primary-50' : variant === 'success' ? 'bg-success/10' : variant === 'warning' ? 'bg-warning/10' : variant === 'accent' ? 'bg-accent-50' : 'bg-surface-100'}`}>
          <Icon className={`w-5 h-5 ${variant === 'primary' ? 'text-primary-500' : variant === 'success' ? 'text-success' : variant === 'warning' ? 'text-warning' : variant === 'accent' ? 'text-accent-500' : 'text-surface-800'}`} />
        </div>
        {trend && <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-success' : 'text-error'}`}>{trend}</span>}
      </div>
      <div className="text-2xl font-heading font-bold text-surface-900">{value}</div>
      <div className="text-sm text-surface-800">{label}</div>
      {sub && <div className="text-xs text-surface-800 mt-0.5">{sub}</div>}
    </div>
  )
}

// ===================== LOGIN =====================
function SalesLogin({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false)
  return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4"><Target className="w-8 h-8 text-white" /></div>
        <h1 className="text-3xl font-heading font-bold text-white">Nexify Sales</h1>
        <p className="text-surface-800 mt-2 mb-8">AI-Powered Sales System</p>
        <div className="bg-surface-800 rounded-2xl p-8 border border-surface-700">
          <h2 className="text-xl font-semibold text-white mb-6">Sales Agent Login</h2>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-surface-400 mb-1.5">Agent ID</label><input defaultValue="SalesAgent-Mu" className="w-full px-4 py-3 rounded-xl bg-surface-700 border border-surface-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
            <div><label className="block text-sm font-medium text-surface-400 mb-1.5">Access Key</label><input type="password" defaultValue="••••••••" className="w-full px-4 py-3 rounded-xl bg-surface-700 border border-surface-600 text-white focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
            <button onClick={() => { DB.init(); setLoading(true); setTimeout(() => onLogin(), 800) }} disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50">
              {loading ? 'Authenticating...' : 'Access Sales System'}
            </button>
          </div>
          <p className="text-surface-800 text-xs mt-4">Demo: click to enter</p>
        </div>
      </div>
    </div>
  )
}

// ===================== PIPELINE KANBAN =====================
function PipelinePage() {
  const [deals, setDeals] = useState<any[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [newDeal, setNewDeal] = useState({ company: '', contact: '', email: '', phone: '', value: '', service: '', source: '' })

  useEffect(() => { setDeals(DB.get('deals') || []) }, [])

  const stages = [
    { id: 'new', label: 'New Leads', color: 'bg-info/10 border-info/20' },
    { id: 'qualified', label: 'Qualified', color: 'bg-accent-50 border-accent-200' },
    { id: 'proposal', label: 'Proposal Sent', color: 'bg-warning/10 border-warning/20' },
    { id: 'negotiation', label: 'Negotiation', color: 'bg-primary-50 border-primary-200' },
  ]

  const addDeal = () => {
    const deals = DB.get('deals') || []
    const deal = {
      id: `DL-${String(deals.length + 1).padStart(3, '0')}`,
      company: newDeal.company,
      contact: newDeal.contact,
      email: newDeal.email,
      phone: newDeal.phone,
      value: parseInt(newDeal.value) || 0,
      service: newDeal.service,
      stage: 'new',
      probability: 10,
      source: newDeal.source || 'Manual',
      lastContact: new Date().toISOString().split('T')[0],
      notes: 'New lead added manually',
      createdAt: new Date().toISOString().split('T')[0],
    }
    deals.unshift(deal)
    DB.set('deals', deals)
    setDeals(deals)
    setShowAdd(false)
    setNewDeal({ company: '', contact: '', email: '', phone: '', value: '', service: '', source: '' })
  }

  const moveStage = (dealId: string, direction: 'forward' | 'backward') => {
    const deals = DB.get('deals') || []
    const idx = stages.findIndex(s => s.id === deals.find((d: any) => d.id === dealId)?.stage)
    const newStage = direction === 'forward' ? stages[Math.min(idx + 1, stages.length - 1)]?.id : stages[Math.max(idx - 1, 0)]?.id
    if (!newStage) return
    const updated = deals.map((d: any) => d.id === dealId ? { ...d, stage: newStage, probability: Math.min(d.probability + 15, 95) } : d)
    DB.set('deals', updated)
    setDeals(updated)
  }

  const totalPipeline = deals.reduce((s, d) => s + d.value, 0)
  const weightedPipeline = deals.reduce((s, d) => s + Math.round(d.value * d.probability / 100), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Sales Pipeline</h1>
          <p className="text-surface-800 text-sm">10 active deals · AI-powered lead scoring</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-sm"><Plus size={16} /> Add Deal</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Total Pipeline" value={`${(totalPipeline/100000).toFixed(1)}L`} variant="primary" />
        <StatCard icon={TrendingUp} label="Weighted Value" value={`${(weightedPipeline/100000).toFixed(1)}L`} variant="success" />
        <StatCard icon={Users} label="Active Deals" value={String(deals.length)} variant="accent" />
        <StatCard icon={DollarSign} label="Avg Deal Size" value={`${Math.round(totalPipeline/deals.length/1000)}K`} variant="warning" />
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl border border-surface-200 p-6">
          <div className="flex items-center justify-between mb-4"><h2 className="font-semibold">New Deal</h2><button onClick={() => setShowAdd(false)}><X size={18} className="text-surface-800" /></button></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Company *</label><input className="input-field text-sm" placeholder="Company name" value={newDeal.company} onChange={e => setNewDeal(s => ({...s, company: e.target.value}))} /></div>
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Contact *</label><input className="input-field text-sm" placeholder="Contact name" value={newDeal.contact} onChange={e => setNewDeal(s => ({...s, contact: e.target.value}))} /></div>
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Email</label><input className="input-field text-sm" placeholder="email@company.com" value={newDeal.email} onChange={e => setNewDeal(s => ({...s, email: e.target.value}))} /></div>
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Phone</label><input className="input-field text-sm" placeholder="+91 98765 43210" value={newDeal.phone} onChange={e => setNewDeal(s => ({...s, phone: e.target.value}))} /></div>
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Value ()</label><input className="input-field text-sm" placeholder="500000" value={newDeal.value} onChange={e => setNewDeal(s => ({...s, value: e.target.value}))} /></div>
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Service</label>
              <select className="input-field text-sm" value={newDeal.service} onChange={e => setNewDeal(s => ({...s, service: e.target.value}))}>
                <option value="">Select</option><option>Custom Software</option><option>Web Development</option><option>Mobile App</option><option>AI Solutions</option><option>Data Analytics</option><option>Cloud Services</option>
              </select></div>
          </div>
          <button onClick={addDeal} className="btn-primary text-sm mt-4"><Plus size={16} /> Add to Pipeline</button>
        </div>
      )}

      {/* Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
        {stages.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage.id)
          const stageValue = stageDeals.reduce((s, d) => s + d.value, 0)
          return (
            <div key={stage.id} className="bg-surface-50 rounded-xl border border-surface-200 min-w-[250px]">
              <div className="p-4 border-b border-surface-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-surface-900">{stage.label}</h3>
                  <span className="text-xs text-surface-800">{stageDeals.length} deals</span>
                </div>
                <div className="text-lg font-heading font-bold text-surface-900 mt-1">{(stageValue/100000).toFixed(1)}L</div>
              </div>
              <div className="p-3 space-y-3 min-h-[200px]">
                {stageDeals.map(d => (
                  <div key={d.id} className="bg-white rounded-xl p-4 border border-surface-200 shadow-sm hover:shadow-md transition-all cursor-grab">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-sm text-surface-900">{d.company}</div>
                        <div className="text-xs text-surface-800">{d.contact}</div>
                      </div>
                      <Badge status={d.source} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-surface-800 mb-2">
                      <span>{d.service}</span>
                      <span className="font-semibold text-surface-900">{(d.value/100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <ProgressBar value={d.probability} />
                      <span className="text-xs text-surface-800 shrink-0">{d.probability}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-surface-800">
                      <span>{d.lastContact}</span>
                      <div className="flex gap-1">
                        <button onClick={() => moveStage(d.id, 'backward')} disabled={stage.id === 'new'} className="p-1 rounded hover:bg-surface-100 disabled:opacity-30" title="Move back"><ChevronDown size={14} /></button>
                        <button onClick={() => moveStage(d.id, 'forward')} disabled={stage.id === 'negotiation'} className="p-1 rounded hover:bg-surface-100 disabled:opacity-30" title="Move forward"><ChevronUp size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
                {stageDeals.length === 0 && <div className="text-center py-8 text-xs text-surface-800">No deals in this stage</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ===================== PROPOSALS =====================
function ProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([])
  const [showGenerator, setShowGenerator] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  useEffect(() => { setProposals(DB.get('proposals') || []) }, [])

  const generateProposal = () => {
    setGenerating(true)
    setTimeout(() => {
      const props = DB.get('proposals') || []
      const p = {
        id: `PROP-${String(props.length + 1).padStart(3, '0')}`,
        dealId: 'DL-NEW',
        title: 'Custom Software Development Proposal',
        company: 'New Client',
        value: 500000,
        status: 'draft',
        sentDate: '-',
        validUntil: new Date(Date.now() + 30*86400000).toISOString().split('T')[0],
        type: 'Fixed Price',
      }
      props.unshift(p)
      DB.set('proposals', props)
      setProposals(props)
      setGenerating(false)
      setGenerated(true)
      setTimeout(() => setGenerated(false), 3000)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Proposals & Quotations</h1>
          <p className="text-surface-800 text-sm">AI-generated proposals in seconds</p>
        </div>
        <button onClick={generateProposal} disabled={generating} className="btn-primary text-sm">
          {generating ? <><Loader size={16} className="animate-spin" /> Generating...</> : <><Wand2 size={16} /> Generate Proposal</>}
        </button>
      </div>

      {generated && (
        <div className="bg-success/5 border border-success/20 rounded-xl p-4 flex items-center gap-3 text-sm text-success">
          <CheckCircle2 size={18} /> Proposal generated! AI agent has drafted a customized proposal.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Total Proposals" value={String(proposals.length)} variant="primary" />
        <StatCard icon={Send} label="Sent" value={String(proposals.filter(p => p.status === 'sent').length)} variant="success" />
        <StatCard icon={Edit3} label="Drafts" value={String(proposals.filter(p => p.status === 'draft').length)} variant="warning" />
        <StatCard icon={DollarSign} label="Total Value" value={`${(proposals.reduce((s, p) => s + p.value, 0)/100000).toFixed(1)}L`} variant="accent" />
      </div>

      <div className="space-y-3">
        {proposals.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-surface-200 p-5 hover:shadow-lg transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center"><FileText className="w-6 h-6 text-primary-500" /></div>
                <div>
                  <div className="flex items-center gap-2"><span className="font-semibold text-surface-900">{p.title}</span><Badge status={p.status} /></div>
                  <div className="text-sm text-surface-800">{p.company} · {p.type}</div>
                  <div className="text-xs text-surface-800">Validity: {p.validUntil} · Sent: {p.sentDate}</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-lg font-heading font-bold text-surface-900">{(p.value/100000).toFixed(1)}L</div>
                <div className="flex gap-2 mt-1">
                  <button className="btn-primary text-xs px-3 py-1.5">{p.status === 'draft' ? 'Edit' : 'View'}</button>
                  <button className="btn-secondary text-xs px-3 py-1.5 border-surface-200 text-surface-800"><Download size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Proposal Generator Section */}
      <div className="bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl border border-primary-500/20 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shrink-0"><Wand2 className="w-6 h-6 text-white" /></div>
          <div>
            <h3 className="font-semibold text-lg mb-1">AI Proposal Generator</h3>
            <p className="text-sm text-surface-800 mb-4">Our AI agent analyzes the lead's requirements, company profile, and industry to generate a personalized proposal with scope, timeline, pricing, and terms.</p>
            <div className="flex flex-wrap gap-4 text-xs text-surface-800">
              <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-success" /> Personalized to each lead</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-success" /> Industry-standard pricing</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-success" /> Auto-calculates timeline</span>
              <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-success" /> 30-day validity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===================== EMAIL CAMPAIGNS =====================
function EmailsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [showNewCamp, setShowNewCamp] = useState(false)
  const [campForm, setCampForm] = useState({ name: '', type: 'automated' })

  useEffect(() => { setCampaigns(DB.get('campaigns') || []) }, [])

  const createCampaign = () => {
    const camps = DB.get('campaigns') || []
    camps.unshift({ id: `CAMP-${String(camps.length + 1).padStart(3, '0')}`, name: campForm.name, type: campForm.type, status: 'active', sent: 0, opened: 0, clicked: 0, replied: 0, lastSent: '-' })
    DB.set('campaigns', camps)
    setCampaigns(camps)
    setShowNewCamp(false)
    setCampForm({ name: '', type: 'automated' })
  }

  const totalSent = campaigns.reduce((s, c) => s + c.sent, 0)
  const totalOpened = campaigns.reduce((s, c) => s + c.opened, 0)
  const totalClicked = campaigns.reduce((s, c) => s + c.clicked, 0)
  const openRate = totalSent ? Math.round(totalOpened / totalSent * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Email Automation</h1>
          <p className="text-surface-800 text-sm">AI-driven email campaigns · 0 cost (self-hosted SMTP)</p>
        </div>
        <button onClick={() => setShowNewCamp(true)} className="btn-primary text-sm"><Plus size={16} /> New Campaign</button>
      </div>

      {showNewCamp && (
        <div className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="font-semibold mb-4">Create Campaign</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Campaign Name</label><input className="input-field text-sm" placeholder="Q3 Outreach" value={campForm.name} onChange={e => setCampForm(s => ({...s, name: e.target.value}))} /></div>
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Type</label><select className="input-field text-sm" value={campForm.type} onChange={e => setCampForm(s => ({...s, type: e.target.value}))}><option value="automated">Automated</option><option value="sequence">Sequence</option><option value="manual">Manual</option></select></div>
          </div>
          <button onClick={createCampaign} className="btn-primary text-sm mt-4">Create Campaign</button>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Send} label="Emails Sent" value={String(totalSent)} variant="primary" />
        <StatCard icon={Mail} label="Open Rate" value={`${openRate}%`} variant="success" />
        <StatCard icon={Activity} label="Click Rate" value={totalSent ? `${Math.round(totalClicked/totalSent*100)}%` : '0%'} variant="warning" />
        <StatCard icon={MessageSquare} label="Replies" value={String(campaigns.reduce((s, c) => s + c.replied, 0))} variant="accent" />
      </div>

      <div className="grid gap-4">
        {campaigns.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-surface-200 p-5 hover:shadow-lg transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.status === 'active' ? 'bg-success/10' : 'bg-surface-100'}`}>
                  {c.type === 'sequence' ? <RefreshCw className={`w-5 h-5 ${c.status === 'active' ? 'text-success' : 'text-surface-800'}`} /> : <Send className={`w-5 h-5 ${c.status === 'active' ? 'text-success' : 'text-surface-800'}`} />}
                </div>
                <div>
                  <div className="flex items-center gap-2"><span className="font-semibold text-sm text-surface-900">{c.name}</span><Badge status={c.status} /><span className="text-xs text-surface-800 capitalize">{c.type}</span></div>
                  <div className="text-xs text-surface-800">Sent: {c.sent} · Opened: {c.opened} · Clicked: {c.clicked} · Replied: {c.replied}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${c.status === 'active' ? 'bg-warning/10 text-warning hover:bg-warning/20' : 'bg-success/10 text-success hover:bg-success/20'}`}>
                  {c.status === 'active' ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Resume</>}
                </button>
                <button className="px-3 py-1.5 rounded-xl bg-primary-50 text-primary-600 text-xs font-medium hover:bg-primary-100">View</button>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-surface-800">
              <span className="flex items-center gap-1"><Mail size={12} /> {openRate}% open</span>
              <span className="flex items-center gap-1"><Activity size={12} /> {c.sent ? Math.round(c.clicked/c.sent*100) : 0}% click</span>
              <span className="flex items-center gap-1"><MessageSquare size={12} /> {c.sent ? Math.round(c.replied/c.sent*100) : 0}% reply</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===================== WHATSAPP =====================
function WhatsAppPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [showSend, setShowSend] = useState(false)
  const [msgForm, setMsgForm] = useState({ contact: '', company: '', message: '' })

  useEffect(() => { setMessages(DB.get('whatsapp') || []) }, [])

  const sendMessage = () => {
    const msgs = DB.get('whatsapp') || []
    const now = new Date()
    msgs.unshift({
      id: `WA-${String(msgs.length + 1).padStart(3, '0')}`,
      contact: msgForm.contact,
      company: msgForm.company,
      message: msgForm.message,
      status: 'sent_m',
      direction: 'outbound',
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    })
    DB.set('whatsapp', msgs)
    setMessages(msgs)
    setShowSend(false)
    setMsgForm({ contact: '', company: '', message: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">WhatsApp Automation</h1>
          <p className="text-surface-800 text-sm">AI-powered WhatsApp Business API · 0 cost</p>
        </div>
        <button onClick={() => setShowSend(true)} className="btn-primary text-sm"><MessageCircle size={16} /> Send Message</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Send} label="Sent Today" value="12" variant="primary" />
        <StatCard icon={CheckCircle2} label="Delivered" value="100%" variant="success" />
        <StatCard icon={MessageSquare} label="Reply Rate" value="58%" variant="accent" />
      </div>

      {showSend && (
        <div className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="font-semibold mb-4">Send WhatsApp Message</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Contact Name</label><input className="input-field text-sm" value={msgForm.contact} onChange={e => setMsgForm(s => ({...s, contact: e.target.value}))} /></div>
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Company</label><input className="input-field text-sm" value={msgForm.company} onChange={e => setMsgForm(s => ({...s, company: e.target.value}))} /></div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium text-surface-700 mb-1">Message</label>
            <textarea className="input-field text-sm resize-none" rows={3} value={msgForm.message} onChange={e => setMsgForm(s => ({...s, message: e.target.value}))} placeholder="Type your message... AI can optimize for better response rates." />
          </div>
          <button onClick={sendMessage} className="btn-primary text-sm mt-4"><MessageCircle size={16} /> Send via WhatsApp</button>
        </div>
      )}

      <div className="space-y-3">
        {messages.map(m => (
          <div key={m.id} className={`bg-white rounded-xl border p-4 hover:shadow-md transition-all ${m.direction === 'inbound' ? 'border-primary-200 bg-primary-50/30' : 'border-surface-200'}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.direction === 'outbound' ? 'bg-success/10' : 'bg-primary-50'}`}>
                  <MessageCircle className={`w-5 h-5 ${m.direction === 'outbound' ? 'text-success' : 'text-primary-500'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2"><span className="font-semibold text-sm text-surface-900">{m.contact}</span><span className="text-xs text-surface-800">{m.company}</span></div>
                  <div className="flex items-center gap-2 text-xs text-surface-800">
                    <Badge status={m.direction} />
                    <Badge status={m.status} />
                  </div>
                </div>
              </div>
              <div className="text-xs text-surface-800 text-right">{m.date} · {m.time}</div>
            </div>
            <p className="text-sm text-surface-800 bg-surface-50 rounded-xl p-3">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===================== FOLLOW-UPS =====================
function FollowupsPage() {
  const [followups, setFollowups] = useState<any[]>([])
  const [deals, setDeals] = useState<any[]>([])
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ action: '', dueDate: '', priority: 'medium' })

  useEffect(() => {
    setFollowups(DB.get('followups') || [])
    setDeals(DB.get('deals') || [])
  }, [])

  const createTask = () => {
    const fups = DB.get('followups') || []
    fups.unshift({
      id: `FUP-${String(fups.length + 1).padStart(3, '0')}`,
      dealId: '-',
      action: form.action,
      dueDate: form.dueDate,
      priority: form.priority,
      status: 'pending',
      assignedTo: 'SalesAgent-Mu',
    })
    DB.set('followups', fups)
    setFollowups(fups)
    setShowNew(false)
    setForm({ action: '', dueDate: '', priority: 'medium' })
  }

  const toggleDone = (id: string) => {
    const updated = followups.map(f => f.id === id ? { ...f, status: f.status === 'done' ? 'pending' as const : 'done' as const } : f)
    DB.set('followups', updated)
    setFollowups(updated)
  }

  const pending = followups.filter(f => f.status === 'pending')
  const overdue = pending.filter(f => new Date(f.dueDate) < new Date())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Follow-up System</h1>
          <p className="text-surface-800 text-sm">AI agent automatically schedules and prioritizes follow-ups</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary text-sm"><Plus size={16} /> Add Task</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Pending" value={String(pending.length)} variant="warning" />
        <StatCard icon={AlertCircle} label="Overdue" value={String(overdue.length)} variant="warning" trend="! Due today" />
        <StatCard icon={CheckCircle2} label="Completed" value={String(followups.filter(f => f.status === 'done').length)} variant="success" />
        <StatCard icon={TrendingUp} label="Auto-scheduled" value="AI" variant="primary" />
      </div>

      {showNew && (
        <div className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="font-semibold mb-4">New Follow-up Task</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2"><label className="block text-xs font-medium text-surface-700 mb-1">Action</label><input className="input-field text-sm" value={form.action} onChange={e => setForm(s => ({...s, action: e.target.value}))} /></div>
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Due Date</label><input type="date" className="input-field text-sm" value={form.dueDate} onChange={e => setForm(s => ({...s, dueDate: e.target.value}))} /></div>
            <div><label className="block text-xs font-medium text-surface-700 mb-1">Priority</label><select className="input-field text-sm" value={form.priority} onChange={e => setForm(s => ({...s, priority: e.target.value}))}><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></div>
          </div>
          <button onClick={createTask} className="btn-primary text-sm mt-4">Add Task</button>
        </div>
      )}

      <div className="space-y-2">
        {followups.map(f => {
          const deal = deals.find(d => d.id === f.dealId)
          return (
            <div key={f.id} className={`bg-white rounded-xl border p-4 hover:shadow-md transition-all ${f.status === 'done' ? 'border-success/20 bg-success/5' : 'border-surface-200'}`}>
              <div className="flex items-center gap-4">
                <button onClick={() => toggleDone(f.id)} className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${f.status === 'done' ? 'bg-success border-success' : 'border-surface-300 hover:border-primary-500'}`}>
                  {f.status === 'done' && <CheckCircle2 size={14} className="text-white" />}
                </button>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${f.status === 'done' ? 'text-surface-800 line-through' : 'text-surface-900'}`}>{f.action}</div>
                  <div className="flex items-center gap-3 text-xs text-surface-800 mt-0.5">
                    <span>Due: {f.dueDate}</span>
                    {deal && <span>· {deal.company}</span>}
                    <span>· {f.assignedTo}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge status={f.priority} />
                  <Badge status={f.status} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Auto-scheduler */}
      <div className="bg-gradient-to-r from-accent-500/5 to-primary-500/5 rounded-2xl border border-accent-500/20 p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center"><Zap className="w-5 h-5 text-accent-500" /></div>
          <div>
            <h3 className="font-semibold text-sm">AI Auto-Scheduler Active</h3>
            <p className="text-xs text-surface-800">SalesAgent-Mu automatically schedules optimal follow-up times based on lead engagement patterns. 8 tasks auto-scheduled for today.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===================== LEAD CAPTURE =====================
function LeadCapturePage() {
  const [deals, setDeals] = useState<any[]>([])
  useEffect(() => { setDeals(DB.get('deals') || []) }, [])

  const sources = ['Website', 'LinkedIn', 'Referral', 'Google Ads', 'Twitter/X', 'Conference', 'Manual']
  const sourceData = sources.map(s => ({ source: s, count: deals.filter(d => d.source === s).length, value: deals.filter(d => d.source === s).reduce((sum, d) => sum + d.value, 0) }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Lead Capture & Sources</h1>
          <p className="text-surface-800 text-sm">AI agents scan 7+ channels · Auto-qualify leads</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Globe} label="Website Leads (30d)" value="24" trend="+40%" variant="primary" />
        <StatCard icon={Linkedin} label="LinkedIn Leads" value="18" trend="+25%" variant="accent" />
        <StatCard icon={Star} label="Referral Leads" value="12" trend="+60%" variant="success" />
        <StatCard icon={BarChart3} label="Conversion Rate" value="34%" trend="+8%" variant="warning" />
      </div>

      {/* Source breakdown */}
      <div className="bg-white rounded-xl border border-surface-200 p-5">
        <h2 className="font-semibold mb-4">Lead Sources</h2>
        <div className="space-y-3">
          {sourceData.filter(s => s.count > 0).sort((a, b) => b.count - a.count).map(s => (
            <div key={s.source} className="flex items-center gap-4">
              <span className="text-sm text-surface-800 w-24">{s.source}</span>
              <div className="flex-1 bg-surface-100 rounded-full h-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" style={{ width: `${(s.count / Math.max(...sourceData.map(x => x.count)) * 100)}%` }} />
              </div>
              <span className="text-sm font-medium text-surface-900 w-12 text-right">{s.count}</span>
              <span className="text-xs text-surface-800 w-20 text-right">{(s.value/100000).toFixed(1)}L</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Capture methods */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Globe, title: 'Website Forms', desc: 'Contact form captures → auto-created in pipeline within 30 seconds' },
          { icon: Linkedin, title: 'LinkedIn Scraper', desc: 'AI monitors relevant posts, comments, and new connections for lead signals' },
          { icon: Twitter, title: 'Twitter/X Monitor', desc: 'Tracks mentions, relevant hashtags, and DMs for opportunity detection' },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className="bg-white rounded-xl border border-surface-200 p-5 hover:shadow-lg transition-all">
              <Icon className="w-8 h-8 text-primary-500 mb-3" />
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-surface-800">{item.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ===================== DASHBOARD =====================
function SalesDashboard() {
  const [deals, setDeals] = useState<any[]>([])
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [followups, setFollowups] = useState<any[]>([])

  useEffect(() => {
    setDeals(DB.get('deals') || [])
    setCampaigns(DB.get('campaigns') || [])
    setFollowups(DB.get('followups') || [])
  }, [])

  const pipelineTotal = deals.reduce((s, d) => s + d.value, 0)
  const weightedTotal = deals.reduce((s, d) => s + Math.round(d.value * d.probability / 100), 0)
  const pendingFollowups = followups.filter(f => f.status === 'pending').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Sales Dashboard</h1>
          <p className="text-surface-800 text-sm">AI-powered sales metrics · Real-time sync</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-surface-800 bg-surface-100 rounded-xl px-3 py-1.5">
          <RefreshCw size={12} /> Auto-sync on
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Pipeline Value" value={`${(pipelineTotal/100000).toFixed(1)}L`} trend="+18%" variant="primary" sub="10 active deals" />
        <StatCard icon={TrendingUp} label="Weighted Pipeline" value={`${(weightedTotal/100000).toFixed(1)}L`} variant="success" sub="Avg probability: {Math.round(deals.reduce((s, d) => s + d.probability, 0) / deals.length)}%" />
        <StatCard icon={DollarSign} label="Won (This Qtr)" value="18.5L" variant="accent" sub="3 deals closed" />
        <StatCard icon={Activity} label="Conversion Rate" value="34%" trend="+8%" variant="warning" sub="Lead-to-deal" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pipeline by Stage */}
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <h2 className="font-semibold mb-4">Pipeline by Stage</h2>
          <div className="space-y-3">
            {[
              { label: 'New Leads', value: deals.filter(d => d.stage === 'new').length, color: 'bg-info' },
              { label: 'Qualified', value: deals.filter(d => d.stage === 'qualified').length, color: 'bg-accent-500' },
              { label: 'Proposal Sent', value: deals.filter(d => d.stage === 'proposal').length, color: 'bg-warning' },
              { label: 'Negotiation', value: deals.filter(d => d.stage === 'negotiation').length, color: 'bg-primary-500' },
            ].map((s, i) => {
              const max = Math.max(1, deals.length)
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm text-surface-800 w-28">{s.label}</span>
                  <div className="flex-1 bg-surface-100 rounded-full h-5 relative overflow-hidden">
                    <div className={`absolute inset-0 ${s.color} rounded-full transition-all`} style={{ width: `${(s.value / max) * 100}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-surface-900 w-8">{s.value}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-surface-200 p-5">
          <h2 className="font-semibold mb-4">Today's Sales Activity</h2>
          <div className="space-y-3">
            {[
              { time: '10 min ago', action: 'AI sent proposal to GreenEnergy Corp', type: 'proposal' },
              { time: '25 min ago', action: 'Rahul Verma replied on WhatsApp — ready to close', type: 'reply' },
              { time: '1 hr ago', action: 'New lead captured from Website: CloudBase Tech', type: 'lead' },
              { time: '2 hrs ago', action: 'Follow-up: Sent brochure to StyleHub Fashion', type: 'followup' },
              { time: '3 hrs ago', action: 'Email campaign "New Lead Welcome" sent 45 emails', type: 'email' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${a.type === 'proposal' ? 'bg-warning' : a.type === 'reply' ? 'bg-success' : a.type === 'lead' ? 'bg-info' : 'bg-primary-500'}`} />
                <div className="flex-1"><span className="text-surface-800">{a.action}</span><div className="text-xs text-surface-800">{a.time}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Sales Agent Status */}
      <div className="bg-gradient-to-r from-success/10 to-primary-500/10 rounded-2xl border border-success/20 p-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">SalesAgent-Mu — Active</h3>
            <p className="text-sm text-surface-800">AI sales agent is currently: Sending follow-up emails · Qualifying 2 new leads · Monitoring LinkedIn for signals</p>
          </div>
          <div className="flex items-center gap-1 text-success text-xs font-medium bg-success/10 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Online
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-xl border border-surface-200 p-4">
          <div className="text-2xl font-heading font-bold gradient-text">{pendingFollowups}</div>
          <div className="text-xs text-surface-800 mt-1">Pending Follow-ups</div>
        </div>
        <div className="bg-white rounded-xl border border-surface-200 p-4">
          <div className="text-2xl font-heading font-bold gradient-text">{campaigns.filter(c => c.status === 'active').length}</div>
          <div className="text-xs text-surface-800 mt-1">Active Campaigns</div>
        </div>
        <div className="bg-white rounded-xl border border-surface-200 p-4">
          <div className="text-2xl font-heading font-bold gradient-text">0</div>
          <div className="text-xs text-surface-800 mt-1">Sales Team Cost</div>
        </div>
      </div>
    </div>
  )
}

// ===================== MAIN =====================
export default function SalesPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false) // kept for mobile trigger

  useEffect(() => {
    DB.init()
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    if (tab) setActiveTab(tab)
  }, [])

  if (!authenticated) return <SalesLogin onLogin={() => setAuthenticated(true)} />

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Pipeline', icon: Target },
    { id: 'proposals', label: 'Proposals', icon: FileText },
    { id: 'emails', label: 'Email Campaigns', icon: Mail },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'followups', label: 'Follow-ups', icon: Clock },
    { id: 'leadcapture', label: 'Lead Capture', icon: UserPlus },
  ]

  const sidebarItems: SidebarItem[] = tabs.map(t => ({
    label: t.label, icon: t.icon,
    onClick: () => { setActiveTab(t.id) },
    active: activeTab === t.id,
  }))

  return (
    <div className="min-h-screen bg-surface-50 flex">
      <Sidebar items={sidebarItems} title="Nexify Sales" subtitle="AI Sales System" logo="SM" onLogout={() => setAuthenticated(false)} />
      <main className="flex-1 min-w-0 lg:ml-64 pt-16 lg:pt-0">
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-surface-200 z-20">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div />
            <div className="flex items-center gap-3 ml-auto">
              <Link href="/admin" className="text-xs text-surface-600 hover:text-primary-500">Admin</Link>
              <Link href="/portal" className="text-xs text-surface-600 hover:text-primary-500">Portal</Link>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && <SalesDashboard />}
          {activeTab === 'pipeline' && <PipelinePage />}
          {activeTab === 'proposals' && <ProposalsPage />}
          {activeTab === 'emails' && <EmailsPage />}
          {activeTab === 'whatsapp' && <WhatsAppPage />}
          {activeTab === 'followups' && <FollowupsPage />}
          {activeTab === 'leadcapture' && <LeadCapturePage />}
        </div>
      </main>
    </div>
  )
}
