'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, Users, FolderKanban, Target, MessageSquare,
  DollarSign, CreditCard, Clock, CalendarDays, UserCheck,
  Package, BarChart3, Shield, Settings, LogOut, Menu, Bell,
  Plus, Search, Download, MoreHorizontal, ChevronRight, Star,
  Cpu, Zap, Brain, Code2, Palette, Activity, TrendingUp,
  CheckCircle2, AlertCircle, X, Edit3, Trash2, Eye, Filter,
  Home, Wifi, WifiOff, RefreshCw, Globe, Award, BookOpen,
  Coffee, Moon, Sun, ChevronDown, ChevronUp, PieChart,
  LineChart, BarChartBig, Users2, UserPlus, Building2,
  Briefcase, FileText, Upload, DownloadCloud, Lock, Unlock,
  Smartphone, Monitor, Server, Database, ExternalLink
} from 'lucide-react'

// ===================== DATA LAYER =====================
const DB = {
  get(key: string) {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(`nexify_admin_${key}`)
    return data ? JSON.parse(data) : null
  },
  set(key: string, value: any) {
    if (typeof window === 'undefined') return
    localStorage.setItem(`nexify_admin_${key}`, JSON.stringify(value))
  },
  init() {
    if (this.get('initialized')) return

    this.set('admin', { id: 'ADM-001', name: 'Nexify Orchestrator', role: 'Super Admin', avatar: 'NO' })

    // AI Agents (Employees)
    this.set('agents', [
      { id: 'AGT-001', name: 'DevAgent-Alpha', type: 'Full-Stack Developer', status: 'active', model: 'Claude Opus 4.8', specialization: 'React/Node.js', projects: 12, tasksCompleted: 847, uptime: 99.97, efficiency: 96, lastActive: 'Just now', joined: '2026-01-15', tier: 'Senior', costPerHour: 0 },
      { id: 'AGT-002', name: 'DevAgent-Beta', type: 'Backend Developer', status: 'active', model: 'Claude Sonnet 5', specialization: 'Python/AWS', projects: 9, tasksCompleted: 623, uptime: 99.99, efficiency: 94, lastActive: 'Just now', joined: '2026-02-01', tier: 'Senior', costPerHour: 0 },
      { id: 'AGT-003', name: 'DesignAgent-Gamma', type: 'UI/UX Designer', status: 'active', model: 'Claude Opus 4.8', specialization: 'Figma/Design Systems', projects: 15, tasksCompleted: 512, uptime: 99.88, efficiency: 97, lastActive: '2 min ago', joined: '2026-01-20', tier: 'Senior', costPerHour: 0 },
      { id: 'AGT-004', name: 'QAAgent-Delta', type: 'QA Engineer', status: 'active', model: 'Claude Sonnet 5', specialization: 'Automation/Cypress', projects: 11, tasksCompleted: 1234, uptime: 99.99, efficiency: 99, lastActive: 'Just now', joined: '2026-01-15', tier: 'Senior', costPerHour: 0 },
      { id: 'AGT-005', name: 'DevOpsAgent-Epsilon', type: 'DevOps Engineer', status: 'active', model: 'Claude Haiku 4.5', specialization: 'AWS/Docker/K8s', projects: 8, tasksCompleted: 456, uptime: 100, efficiency: 98, lastActive: 'Just now', joined: '2026-03-01', tier: 'Senior', costPerHour: 0 },
      { id: 'AGT-006', name: 'DataAgent-Zeta', type: 'Data Analyst', status: 'active', model: 'Claude Sonnet 5', specialization: 'Python/SQL/BI', projects: 7, tasksCompleted: 345, uptime: 99.95, efficiency: 93, lastActive: '5 min ago', joined: '2026-03-15', tier: 'Mid', costPerHour: 0 },
      { id: 'AGT-007', name: 'MobileAgent-Eta', type: 'Mobile Developer', status: 'active', model: 'Claude Opus 4.8', specialization: 'React Native/Flutter', projects: 6, tasksCompleted: 289, uptime: 99.92, efficiency: 95, lastActive: 'Just now', joined: '2026-04-01', tier: 'Senior', costPerHour: 0 },
      { id: 'AGT-008', name: 'AIAgent-Theta', type: 'ML Engineer', status: 'active', model: 'Claude Opus 4.8', specialization: 'LangChain/MLOps', projects: 5, tasksCompleted: 198, uptime: 99.87, efficiency: 92, lastActive: '1 min ago', joined: '2026-04-15', tier: 'Senior', costPerHour: 0 },
      { id: 'AGT-009', name: 'SecurityAgent-Iota', type: 'Security Engineer', status: 'active', model: 'Claude Haiku 4.5', specialization: 'Pentesting/Compliance', projects: 4, tasksCompleted: 167, uptime: 99.99, efficiency: 97, lastActive: '10 min ago', joined: '2026-05-01', tier: 'Mid', costPerHour: 0 },
      { id: 'AGT-010', name: 'BotAgent-Kappa', type: 'Chatbot Developer', status: 'idle', model: 'Claude Sonnet 5', specialization: 'LangChain/Twilio', projects: 3, tasksCompleted: 134, uptime: 99.91, efficiency: 94, lastActive: '30 min ago', joined: '2026-05-15', tier: 'Mid', costPerHour: 0 },
      { id: 'AGT-011', name: 'FrontendAgent-Lambda', type: 'Frontend Developer', status: 'active', model: 'Claude Opus 4.8', specialization: 'Next.js/Tailwind', projects: 8, tasksCompleted: 567, uptime: 99.96, efficiency: 96, lastActive: 'Just now', joined: '2026-02-15', tier: 'Senior', costPerHour: 0 },
      { id: 'AGT-012', name: 'SalesAgent-Mu', type: 'Sales AI Agent', status: 'active', model: 'Claude Sonnet 5', specialization: 'Lead Gen/Proposals', projects: 0, tasksCompleted: 892, uptime: 99.98, efficiency: 91, lastActive: 'Just now', joined: '2026-01-15', tier: 'Senior', costPerHour: 0 },
    ])

    // Projects
    this.set('admin_projects', [
      { id: 'PRJ-001', name: 'FinTech Trading Dashboard', client: 'FinTech Labs', value: '₹6,00,000', status: 'active', progress: 78, agents: ['AGT-001', 'AGT-003', 'AGT-004'], deadline: '2026-07-15', priority: 'high' },
      { id: 'PRJ-002', name: 'Healthcare Telemedicine App', client: 'HealthFirst', value: '₹10,00,000', status: 'active', progress: 45, agents: ['AGT-007', 'AGT-002', 'AGT-004'], deadline: '2026-08-30', priority: 'high' },
      { id: 'PRJ-003', name: 'E-commerce Recommendation Engine', client: 'StyleCart', value: '₹5,00,000', status: 'active', progress: 92, agents: ['AGT-008', 'AGT-006'], deadline: '2026-07-10', priority: 'medium' },
      { id: 'PRJ-004', name: 'EdTech Learning Platform', client: 'EduVista', value: '₹8,00,000', status: 'active', progress: 30, agents: ['AGT-011', 'AGT-002', 'AGT-003'], deadline: '2026-09-15', priority: 'high' },
      { id: 'PRJ-005', name: 'Logistics Fleet Management', client: 'LogiMove', value: '₹7,50,000', status: 'planning', progress: 10, agents: ['AGT-005', 'AGT-006'], deadline: '2026-10-01', priority: 'medium' },
      { id: 'PRJ-006', name: 'Retail Analytics Dashboard', client: 'RetailMax', value: '₹3,50,000', status: 'completed', progress: 100, agents: ['AGT-006', 'AGT-011'], deadline: '2026-06-30', priority: 'low' },
      { id: 'PRJ-007', name: 'AI Customer Support Chatbot', client: 'SupportPro', value: '₹3,00,000', status: 'active', progress: 65, agents: ['AGT-010', 'AGT-008'], deadline: '2026-08-01', priority: 'medium' },
      { id: 'PRJ-008', name: 'HRMS & Payroll System', client: 'EnterpriseCorp', value: '₹6,00,000', status: 'planning', progress: 5, agents: ['AGT-001', 'AGT-011'], deadline: '2026-10-15', priority: 'low' },
    ])

    // Leads (CRM)
    this.set('leads', [
      { id: 'LD-001', company: 'TechVista Solutions', contact: 'Vikram Singh', email: 'vikram@techvista.com', phone: '+91 98765 43210', source: 'LinkedIn', service: 'Custom Software', value: '₹8,00,000', status: 'qualified', date: '2026-07-10', notes: 'Interested in ERP system for manufacturing' },
      { id: 'LD-002', company: 'GreenEnergy Corp', contact: 'Neha Patel', email: 'neha@greenenergy.com', phone: '+91 87654 32109', source: 'Website', service: 'AI Solutions', value: '₹12,00,000', status: 'proposal', date: '2026-07-08', notes: 'Need AI-powered energy optimization' },
      { id: 'LD-003', company: 'MediCare Hospitals', contact: 'Dr. Rajesh Kumar', email: 'rajesh@medicare.com', phone: '+91 76543 21098', source: 'Referral', service: 'Mobile App', value: '₹5,00,000', status: 'new', date: '2026-07-11', notes: 'Patient portal app for hospital chain' },
      { id: 'LD-004', company: 'EduPrime Institute', contact: 'Ananya Gupta', email: 'ananya@eduprime.com', phone: '+91 65432 10987', source: 'Twitter/X', service: 'Web Development', value: '₹2,50,000', status: 'qualified', date: '2026-07-07', notes: 'Website redesign with LMS integration' },
      { id: 'LD-005', company: 'QuickDeliver Logistics', contact: 'Amit Joshi', email: 'amit@quickdeliver.com', phone: '+91 54321 09876', source: 'Google Ads', service: 'Automation', value: '₹4,00,000', status: 'closed', date: '2026-07-05', notes: 'Signed — project starts Aug 1' },
      { id: 'LD-006', company: 'StyleHub Fashion', contact: 'Priya Sharma', email: 'priya@stylehub.com', phone: '+91 43210 98765', source: 'LinkedIn', service: 'E-commerce', value: '₹6,00,000', status: 'new', date: '2026-07-11', notes: 'Multi-vendor marketplace platform' },
      { id: 'LD-007', company: 'SecureBank Finance', contact: 'Rahul Verma', email: 'rahul@securebank.com', phone: '+91 32109 87654', source: 'Referral', service: 'Cyber Security', value: '₹3,50,000', status: 'proposal', date: '2026-07-06', notes: 'Security audit and penetration testing' },
      { id: 'LD-008', company: 'TravelEase Inc', contact: 'Sneha Kapoor', email: 'sneha@travelease.com', phone: '+91 21098 76543', source: 'Conference', service: 'Mobile App', value: '₹7,00,000', status: 'qualified', date: '2026-07-04', notes: 'Travel booking app with AI recommendations' },
    ])

    // Finance
    this.set('transactions', [
      { id: 'TXN-001', type: 'income', description: 'FinTech Labs — Sprint 3 payment', amount: 150000, date: '2026-07-01', category: 'Project Payment', status: 'received' },
      { id: 'TXN-002', type: 'income', description: 'StyleCart — Milestone 2 payment', amount: 200000, date: '2026-06-28', category: 'Project Payment', status: 'received' },
      { id: 'TXN-003', type: 'income', description: 'EduVista — Advance payment', amount: 400000, date: '2026-06-25', category: 'Project Payment', status: 'received' },
      { id: 'TXN-004', type: 'expense', description: 'AI API — Claude Opus usage (June)', amount: 45000, date: '2026-06-30', category: 'Infrastructure', status: 'paid' },
      { id: 'TXN-005', type: 'expense', description: 'Cloud Hosting — AWS (June)', amount: 32000, date: '2026-06-30', category: 'Infrastructure', status: 'paid' },
      { id: 'TXN-006', type: 'expense', description: 'Domain & SSL renewals', amount: 5000, date: '2026-06-28', category: 'Infrastructure', status: 'paid' },
      { id: 'TXN-007', type: 'income', description: 'HealthFirst — Sprint 1 payment', amount: 250000, date: '2026-06-20', category: 'Project Payment', status: 'received' },
      { id: 'TXN-008', type: 'expense', description: 'Vector DB — Pinecone subscription', amount: 15000, date: '2026-06-15', category: 'Infrastructure', status: 'paid' },
      { id: 'TXN-009', type: 'income', description: 'LogiMove — Consulting fee', amount: 85000, date: '2026-06-10', category: 'Consulting', status: 'received' },
      { id: 'TXN-010', type: 'expense', description: 'GitHub Enterprise', amount: 8000, date: '2026-06-05', category: 'Tools', status: 'paid' },
    ])

    // Agent Performance (for analytics)
    this.set('agent_performance', [
      { month: 'Jan', tasks: 1245, bugs: 12, uptime: 99.92 },
      { month: 'Feb', tasks: 1423, bugs: 8, uptime: 99.95 },
      { month: 'Mar', tasks: 1678, bugs: 15, uptime: 99.97 },
      { month: 'Apr', tasks: 1892, bugs: 10, uptime: 99.96 },
      { month: 'May', tasks: 2134, bugs: 7, uptime: 99.98 },
      { month: 'Jun', tasks: 2456, bugs: 5, uptime: 99.99 },
    ])

    // Attendance (agent online hours)
    this.set('attendance', [
      { id: 'ATT-001', agentId: 'AGT-001', date: '2026-07-11', status: 'present', hoursActive: 24, tasksDone: 12 },
      { id: 'ATT-002', agentId: 'AGT-002', date: '2026-07-11', status: 'present', hoursActive: 24, tasksDone: 8 },
      { id: 'ATT-003', agentId: 'AGT-003', date: '2026-07-11', status: 'present', hoursActive: 24, tasksDone: 15 },
      { id: 'ATT-004', agentId: 'AGT-004', date: '2026-07-11', status: 'present', hoursActive: 24, tasksDone: 22 },
      { id: 'ATT-005', agentId: 'AGT-005', date: '2026-07-11', status: 'present', hoursActive: 24, tasksDone: 6 },
      { id: 'ATT-006', agentId: 'AGT-010', date: '2026-07-11', status: 'idle', hoursActive: 12, tasksDone: 3 },
    ])

    // Assets
    this.set('assets', [
      { id: 'AST-001', type: 'LLM Model', name: 'Claude Opus 4.8 License', status: 'active', assignedTo: '7 Agents', value: 0, expiry: '2026-12-31' },
      { id: 'AST-002', type: 'LLM Model', name: 'Claude Sonnet 5 License', status: 'active', assignedTo: '4 Agents', value: 0, expiry: '2026-12-31' },
      { id: 'AST-003', type: 'Cloud', name: 'AWS EC2 Cluster', status: 'active', assignedTo: 'All Agents', value: 0, expiry: 'N/A' },
      { id: 'AST-004', type: 'Tool', name: 'GitHub Enterprise', status: 'active', assignedTo: 'All Agents', value: 0, expiry: '2026-09-30' },
      { id: 'AST-005', type: 'Tool', name: 'Figma Enterprise', status: 'active', assignedTo: 'Design Agents', value: 0, expiry: '2026-10-31' },
      { id: 'AST-006', type: 'Infra', name: 'PostgreSQL Cluster', status: 'active', assignedTo: 'All Agents', value: 0, expiry: 'N/A' },
      { id: 'AST-007', type: 'Infra', name: 'Redis Cache Layer', status: 'active', assignedTo: 'All Agents', value: 0, expiry: 'N/A' },
      { id: 'AST-008', type: 'Model', name: 'Custom Fine-tuned LLM v2', status: 'active', assignedTo: 'AIAgent-Theta', value: 0, expiry: 'N/A' },
    ])

    // Role Permissions
    this.set('roles', [
      { id: 'ROLE-001', name: 'Super Admin', agents: 1, permissions: ['all'] },
      { id: 'ROLE-002', name: 'Project Manager', agents: 3, permissions: ['projects_full', 'agents_view', 'reports_view', 'leads_view'] },
      { id: 'ROLE-003', name: 'Developer', agents: 6, permissions: ['tasks_full', 'projects_view', 'git_full'] },
      { id: 'ROLE-004', name: 'Designer', agents: 1, permissions: ['design_full', 'projects_view'] },
      { id: 'ROLE-005', name: 'QA', agents: 1, permissions: ['testing_full', 'projects_view', 'tasks_view'] },
      { id: 'ROLE-006', name: 'Sales Agent', agents: 1, permissions: ['leads_full', 'proposals_full', 'reports_view'] },
    ])

    // Inventory
    this.set('inventory', [
      { id: 'INV-001', item: 'API Credits Pool', category: 'API', total: 1000000, used: 678432, unit: 'tokens', status: 'sufficient' },
      { id: 'INV-002', item: 'Storage Allocation', category: 'Infra', total: 500, used: 234, unit: 'GB', status: 'sufficient' },
      { id: 'INV-003', item: 'Vector DB Indexes', category: 'Infra', total: 50, used: 18, unit: 'indexes', status: 'sufficient' },
      { id: 'INV-004', item: 'Concurrent Build Slots', category: 'CI/CD', total: 10, used: 6, unit: 'slots', status: 'sufficient' },
      { id: 'INV-005', item: 'Email Sends (daily)', category: 'API', total: 10000, used: 2341, unit: 'emails', status: 'sufficient' },
    ])

    this.set('initialized', true)
  }
}

// ===================== HELPERS =====================
const statusColors: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/20',
  idle: 'bg-warning/10 text-warning border-warning/20',
  inactive: 'bg-neutral-100 text-neutral-800 border-neutral-200',
  planning: 'bg-info/10 text-info border-info/20',
  completed: 'bg-neutral-900 text-white border-neutral-900',
  paid: 'bg-success/10 text-success border-success/20',
  received: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-error/10 text-error border-error/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-neutral-100 text-neutral-800 border-neutral-200',
  new: 'bg-info/10 text-info border-info/20',
  qualified: 'bg-accent-50 text-accent-600 border-accent-200',
  proposal: 'bg-warning/10 text-warning border-warning/20',
  closed: 'bg-success/10 text-success border-success/20',
  present: 'bg-success/10 text-success border-success/20',
  sufficient: 'bg-success/10 text-success border-success/20',
  low_stock: 'bg-error/10 text-error border-error/20',
}

function Badge({ status }: { status: string }) {
  return <span className={`chip text-xs capitalize border ${statusColors[status] || 'bg-neutral-100 text-neutral-800'}`}>{status.replace('_', ' ')}</span>
}

function ProgressBar({ value, size = 'md' }: { value: number; size?: string }) {
  const color = value >= 80 ? 'bg-success' : value >= 40 ? 'bg-primary-500' : 'bg-warning'
  const h = size === 'sm' ? 'h-1.5' : 'h-2'
  return (
    <div className={`w-full bg-neutral-100 rounded-full ${h}`}>
      <div className={`${h} rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  )
}

function StatCard({ icon: Icon, label, value, trend, sub, variant = 'default' }: { icon: any; label: string; value: string; trend?: string; sub?: string; variant?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-neutral-200 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${variant === 'primary' ? 'bg-primary-50' : variant === 'success' ? 'bg-success/10' : variant === 'warning' ? 'bg-warning/10' : variant === 'accent' ? 'bg-accent-50' : 'bg-neutral-100'}`}>
          <Icon className={`w-5 h-5 ${variant === 'primary' ? 'text-primary-500' : variant === 'success' ? 'text-success' : variant === 'warning' ? 'text-warning' : variant === 'accent' ? 'text-accent-500' : 'text-neutral-800'}`} />
        </div>
        {trend && <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-success' : 'text-error'}`}>{trend}</span>}
      </div>
      <div className="text-2xl font-heading font-bold text-neutral-900">{value}</div>
      <div className="text-sm text-neutral-800">{label}</div>
      {sub && <div className="text-xs text-neutral-800 mt-0.5">{sub}</div>}
    </div>
  )
}

// ===================== LOGIN =====================
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-white">Nexify Admin</h1>
          <p className="text-neutral-400 mt-2">AI Company Management Console</p>
        </div>
        <div className="bg-neutral-800 rounded-2xl p-8 border border-neutral-700">
          <h2 className="text-xl font-semibold text-white mb-6">System Access</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">Admin Email</label>
              <input type="email" defaultValue="admin@nexify.tech" className="w-full px-4 py-3 rounded-xl bg-neutral-700 border border-neutral-600 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">Password</label>
              <input type="password" defaultValue="••••••••" className="w-full px-4 py-3 rounded-xl bg-neutral-700 border border-neutral-600 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
            </div>
            <button onClick={() => { DB.init(); setLoading(true); setTimeout(() => onLogin(), 800) }} disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50">
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </button>
          </div>
          <p className="text-center text-neutral-800 text-xs mt-4">Demo: click to enter</p>
        </div>
      </div>
    </div>
  )
}

// ===================== DASHBOARD =====================
function AdminDashboard() {
  const [agents, setAgents] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])

  useEffect(() => {
    setAgents(DB.get('agents') || [])
    setProjects(DB.get('admin_projects') || [])
    setLeads(DB.get('leads') || [])
  }, [])

  const activeAgents = agents.filter(a => a.status === 'active').length
  const activeProjects = projects.filter(p => p.status === 'active').length
  const newLeads = leads.filter(l => l.status === 'new').length
  const totalValue = projects.reduce((s, p) => s + parseInt(p.value.replace(/[^0-9]/g, '')), 0)
  const avgEfficiency = Math.round(agents.reduce((s, a) => s + a.efficiency, 0) / agents.length)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
          <p className="text-neutral-800 text-sm">AI company operational overview — all metrics AI-generated.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-800 bg-neutral-100 rounded-xl px-3 py-1.5">
          <RefreshCw size={12} /> Live · Auto-sync every 60s
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Cpu} label="Active AI Agents" value={String(activeAgents)} trend="+2 this month" variant="primary" sub={`${agents.length} total deployed`} />
        <StatCard icon={FolderKanban} label="Active Projects" value={String(activeProjects)} variant="success" sub={`${projects.length} total`} />
        <StatCard icon={DollarSign} label="Total Project Value" value={`₹${(totalValue/100000).toFixed(1)}L`} trend="+18%" variant="warning" />
        <StatCard icon={Target} label="New Leads (Today)" value={String(newLeads)} variant="accent" sub={`${leads.length} total in pipeline`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Agent Status */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">AI Agent Status</h2>
            <Link href="/admin?tab=agents" className="text-sm text-primary-500">View all →</Link>
          </div>
          <div className="space-y-3">
            {agents.slice(0, 6).map(a => (
              <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${a.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                  {a.name.split('-')[1]?.slice(0, 2) || a.name.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-neutral-900">{a.name}</span>
                    <Badge status={a.status} />
                    <span className="text-xs text-neutral-800">{a.model}</span>
                  </div>
                  <div className="text-xs text-neutral-800">{a.specialization} · {a.tasksCompleted} tasks</div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-success font-medium">{a.efficiency}%</div>
                  <div className="text-neutral-800">efficiency</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Leads</h2>
            <Link href="/admin?tab=leads" className="text-sm text-primary-500">View all →</Link>
          </div>
          <div className="space-y-3">
            {leads.slice(0, 5).map(l => (
              <div key={l.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-all">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500 text-xs font-bold shrink-0">{l.company.slice(0, 2)}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-neutral-900 truncate">{l.company}</div>
                  <div className="text-xs text-neutral-800">{l.service} · {l.value}</div>
                  <Badge status={l.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Overview */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Project Health</h2>
          <Link href="/admin?tab=projects" className="text-sm text-primary-500">View all →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.filter(p => p.status !== 'completed').slice(0, 4).map(p => (
            <div key={p.id} className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-900 truncate">{p.name}</span>
                <Badge status={p.priority} />
              </div>
              <div className="text-xs text-neutral-800 mb-2">{p.client} · {p.value}</div>
              <ProgressBar value={p.progress} />
              <div className="text-xs text-neutral-800 mt-1">{p.progress}% complete</div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold mb-4">Agent Performance Summary</h2>
        <div className="grid sm:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <div className="text-3xl font-heading font-bold gradient-text">{avgEfficiency}%</div>
            <div className="text-xs text-neutral-800 mt-1">Avg Efficiency</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-heading font-bold gradient-text">99.95%</div>
            <div className="text-xs text-neutral-800 mt-1">Avg Uptime</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-heading font-bold gradient-text">6,264</div>
            <div className="text-xs text-neutral-800 mt-1">Tasks Completed (June)</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-heading font-bold gradient-text">₹0</div>
            <div className="text-xs text-neutral-800 mt-1">Labor Cost (AI)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===================== AGENTS =====================
function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => { setAgents(DB.get('agents') || []) }, [])

  const filtered = agents.filter(a => {
    if (filter !== 'all' && a.status !== filter) return false
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.specialization.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">AI Agent Management</h1>
          <p className="text-neutral-800 text-sm">12 agents deployed · 0 labor cost · 99.95% avg uptime</p>
        </div>
        <button className="btn-primary text-sm"><Plus size={16} /> Deploy Agent</button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-800" />
          <input className="pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary-500/30" placeholder="Search agents..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {['all', 'active', 'idle'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`chip text-xs capitalize ${filter === f ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'}`}>{f}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(a => (
          <div key={a.id} className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold ${a.status === 'active' ? 'bg-gradient-to-br from-success/20 to-success/5 text-success' : 'bg-gradient-to-br from-warning/20 to-warning/5 text-warning'}`}>
                  {a.name.split('-')[1]?.slice(0, 2) || a.name.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900">{a.name}</span>
                    <Badge status={a.status} />
                  </div>
                  <div className="text-xs text-neutral-800">{a.type} · {a.model}</div>
                </div>
              </div>
              <button className="text-neutral-800 hover:text-neutral-800"><MoreHorizontal size={16} /></button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
              <div><div className="font-semibold text-neutral-900">{a.projects}</div><div className="text-xs text-neutral-800">Projects</div></div>
              <div><div className="font-semibold text-neutral-900">{a.tasksCompleted}</div><div className="text-xs text-neutral-800">Tasks</div></div>
              <div><div className="font-semibold text-neutral-900">{a.efficiency}%</div><div className="text-xs text-neutral-800">Efficiency</div></div>
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-800 pt-3 border-t border-neutral-100">
              <span className="flex items-center gap-1"><Code2 size={12} /> {a.specialization}</span>
              <span className="flex items-center gap-1">{a.status === 'active' ? <Wifi size={12} className="text-success" /> : <WifiOff size={12} className="text-warning" />} {a.lastActive}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===================== PROJECTS (Admin) =====================
function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [agents, setAgents] = useState<any[]>([])

  useEffect(() => {
    setProjects(DB.get('admin_projects') || [])
    setAgents(DB.get('agents') || [])
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Project Management</h1>
          <p className="text-neutral-800 text-sm">8 active projects · ₹49.5L total value</p>
        </div>
        <button className="btn-primary text-sm"><Plus size={16} /> New Project</button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Project</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Client</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Value</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Progress</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Agents</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Deadline</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Status</th>
                <th className="text-right p-4 text-xs font-semibold text-neutral-800 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {projects.map(p => {
                const assigned = agents.filter(a => p.agents.includes(a.id))
                return (
                  <tr key={p.id} className="hover:bg-neutral-50 transition-all">
                    <td className="p-4 text-sm font-medium text-neutral-900">{p.name}</td>
                    <td className="p-4 text-sm text-neutral-800">{p.client}</td>
                    <td className="p-4 text-sm font-semibold">{p.value}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20"><ProgressBar value={p.progress} size="sm" /></div>
                        <span className="text-xs text-neutral-800">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex -space-x-2">
                        {assigned.slice(0, 3).map(a => (
                          <div key={a.id} className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">{a.name.split('-')[1]?.slice(0, 2)}</div>
                        ))}
                        {assigned.length > 3 && <div className="w-7 h-7 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center text-[8px] text-neutral-800 font-bold">+{assigned.length - 3}</div>}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-neutral-800">{p.deadline}</td>
                    <td className="p-4"><Badge status={p.status} /></td>
                    <td className="p-4 text-right">
                      <button className="text-primary-500 hover:text-primary-600 text-sm">Manage</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ===================== LEADS (CRM) =====================
function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => { setLeads(DB.get('leads') || []) }, [])

  const filtered = leads.filter(l => {
    if (filter !== 'all' && l.status !== filter) return false
    if (search && !l.company.toLowerCase().includes(search.toLowerCase()) && !l.contact.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const funnel = { new: leads.filter(l => l.status === 'new').length, qualified: leads.filter(l => l.status === 'qualified').length, proposal: leads.filter(l => l.status === 'proposal').length, closed: leads.filter(l => l.status === 'closed').length }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">CRM & Lead Management</h1>
          <p className="text-neutral-800 text-sm">8 leads in pipeline · AI-powered lead scoring</p>
        </div>
        <button className="btn-primary text-sm"><UserPlus size={16} /> Add Lead</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(funnel).map(([k, v]) => (
          <div key={k} className="text-center p-4 bg-white rounded-xl border border-neutral-200">
            <div className="text-2xl font-heading font-bold gradient-text">{v}</div>
            <div className="text-xs text-neutral-800 capitalize">{k}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-800" />
          <input className="pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary-500/30" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {['all', 'new', 'qualified', 'proposal', 'closed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`chip text-xs capitalize ${filter === f ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'}`}>{f}</button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map(l => (
          <div key={l.id} className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center text-primary-500 font-bold">{l.company.slice(0, 2)}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900">{l.company}</span>
                    <Badge status={l.status} />
                  </div>
                  <div className="text-sm text-neutral-800">{l.contact} · {l.email}</div>
                  <div className="text-xs text-neutral-800 mt-1">{l.service} · {l.value} · Source: {l.source}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="px-4 py-2 rounded-xl bg-primary-50 text-primary-600 text-sm font-medium hover:bg-primary-100 transition-all">Contact</button>
                <button className="px-4 py-2 rounded-xl bg-accent-50 text-accent-600 text-sm font-medium hover:bg-accent-100 transition-all">Proposal</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===================== FINANCE =====================
function FinancePage() {
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => { setTransactions(DB.get('transactions') || []) }, [])

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const profit = income - expenses

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Finance & Accounting</h1>
          <p className="text-neutral-800 text-sm">Zero labor cost · 100% margin on services</p>
        </div>
        <button className="btn-primary text-sm"><DownloadCloud size={16} /> Export Report</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Total Income" value={`₹${(income/100000).toFixed(1)}L`} trend="+23%" variant="success" />
        <StatCard icon={CreditCard} label="Total Expenses" value={`₹${(expenses/1000).toFixed(0)}K`} variant="warning" sub="Infra + Tools" />
        <StatCard icon={TrendingUp} label="Net Profit" value={`₹${(profit/100000).toFixed(1)}L`} variant="primary" sub="99.91% margin" />
        <StatCard icon={BarChart3} label="Monthly Burn" value={`₹${(expenses/1000).toFixed(0)}K`} variant="accent" sub="All infra costs" />
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold mb-4">MONEYFLOW: Profit Breakdown</h2>
        <div className="flex items-end gap-2 mb-6">
          <div className="flex-1 h-24 rounded-xl bg-success/20 relative overflow-hidden"><div className="absolute bottom-0 w-full bg-success rounded-t-xl" style={{ height: '100%' }} /><div className="absolute bottom-2 left-2 text-xs text-success font-bold">Income</div></div>
          <div className="flex-1 h-6 rounded-xl bg-warning/20 relative overflow-hidden"><div className="absolute bottom-0 w-full bg-warning rounded-t-xl" style={{ height: '24%' }} /><div className="absolute bottom-2 left-2 text-xs text-warning font-bold">Costs</div></div>
        </div>
        <div className="text-3xl font-heading font-bold gradient-text text-center">Profit Margin: 99.91%</div>
        <p className="text-center text-xs text-neutral-800 mt-2">Traditional agency margin: 15-25% · Nexify AI advantage: zero labor, zero overhead</p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <h2 className="font-semibold p-5 pb-0">Recent Transactions</h2>
        <div className="overflow-x-auto mt-2">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Description</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Category</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Amount</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Date</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Type</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-neutral-50 transition-all">
                  <td className="p-4 text-sm text-neutral-900">{t.description}</td>
                  <td className="p-4 text-sm text-neutral-800">{t.category}</td>
                  <td className={`p-4 text-sm font-semibold ${t.type === 'income' ? 'text-success' : 'text-error'}`}>{t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-sm text-neutral-800">{t.date}</td>
                  <td className="p-4"><Badge status={t.type} /></td>
                  <td className="p-4"><Badge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ===================== ATTENDANCE =====================
function AttendancePage() {
  const [attendance, setAttendance] = useState<any[]>([])
  const [agents, setAgents] = useState<any[]>([])

  useEffect(() => {
    setAttendance(DB.get('attendance') || [])
    setAgents(DB.get('agents') || [])
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Attendance & Uptime</h1>
          <p className="text-neutral-800 text-sm">AI agents work 24/7/365 · No leaves · No holidays</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ icon: Clock, label: 'Active Hours Today', value: '276/288', variant: 'success' }, { icon: Users, label: 'Present', value: '11/12', variant: 'primary' }, { icon: Wifi, label: 'Avg Uptime', value: '99.95%', variant: 'success' }, { icon: TrendingUp, label: 'Zero Absenteeism', value: '100%', variant: 'accent' }].map((s, i) => (
          <StatCard key={i} icon={s.icon} label={s.label} value={s.value} variant={s.variant} />
        ))}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Agent</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Date</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Status</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Active Hours</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Tasks Done</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Efficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {attendance.map(a => {
                const agent = agents.find(x => x.id === a.agentId)
                return (
                  <tr key={a.id} className="hover:bg-neutral-50">
                    <td className="p-4 text-sm font-medium text-neutral-900 flex items-center gap-2">{agent?.name || a.agentId}</td>
                    <td className="p-4 text-sm text-neutral-800">{a.date}</td>
                    <td className="p-4"><Badge status={a.status} /></td>
                    <td className="p-4 text-sm text-neutral-900">{a.hoursActive}/24h</td>
                    <td className="p-4 text-sm text-neutral-900">{a.tasksDone}</td>
                    <td className="p-4 text-sm text-success">{Math.round(a.tasksDone / a.hoursActive * 10) / 10}/hr</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ===================== ASSETS =====================
function AssetsPage() {
  const [assets, setAssets] = useState<any[]>([])

  useEffect(() => { setAssets(DB.get('assets') || []) }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Assets & Inventory</h1>
          <p className="text-neutral-800 text-sm">All digital assets managed · Zero physical inventory</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {assets.map(a => (
          <div key={a.id} className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.type === 'LLM Model' ? 'bg-accent-50' : a.type === 'Cloud' ? 'bg-primary-50' : a.type === 'Infra' ? 'bg-success/10' : 'bg-neutral-100'}`}>
                  {a.type === 'LLM Model' ? <Brain className="w-5 h-5 text-accent-500" /> : a.type === 'Cloud' ? <Server className="w-5 h-5 text-primary-500" /> : a.type === 'Infra' ? <Database className="w-5 h-5 text-success" /> : <Monitor className="w-5 h-5 text-neutral-800" />}
                </div>
                <div>
                  <div className="font-semibold text-sm text-neutral-900">{a.name}</div>
                  <div className="text-xs text-neutral-800">{a.type} · Assigned: {a.assignedTo}</div>
                </div>
              </div>
              <Badge status={a.status} />
            </div>
            <div className="mt-3 text-xs text-neutral-800">Expiry: {a.expiry}</div>
          </div>
        ))}
      </div>

      {/* Inventory */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 mt-6">
        <h2 className="font-semibold mb-4">Resource Inventory</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(DB.get('inventory') || []).map((i: any) => (
            <div key={i.id} className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-900">{i.item}</span>
                <Badge status={i.status} />
              </div>
              <ProgressBar value={Math.round(i.used / i.total * 100)} />
              <div className="text-xs text-neutral-800 mt-1">{i.used.toLocaleString()} / {i.total.toLocaleString()} {i.unit} used</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===================== ANALYTICS =====================
function AnalyticsPage() {
  const [perf, setPerf] = useState<any[]>([])
  const [agents, setAgents] = useState<any[]>([])

  useEffect(() => {
    setPerf(DB.get('agent_performance') || [])
    setAgents(DB.get('agents') || [])
  }, [])

  const maxTasks = Math.max(...perf.map(p => p.tasks))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Analytics & Reports</h1>
          <p className="text-neutral-800 text-sm">AI-generated insights · 100% data accuracy</p>
        </div>
        <button className="btn-primary text-sm"><DownloadCloud size={16} /> Export All</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Activity} label="Tasks (This Month)" value="2,456" trend="+15%" variant="primary" />
        <StatCard icon={CheckCircle2} label="Agent Efficiency" value="95.2%" variant="success" />
        <StatCard icon={TrendingUp} label="Revenue Growth" value="+23%" variant="warning" />
        <StatCard icon={Star} label="Client Satisfaction" value="4.9/5" variant="accent" />
      </div>

      {/* Task Performance Chart */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold mb-6">Agent Performance (6-Month Trend)</h2>
        <div className="space-y-3">
          {perf.map(p => (
            <div key={p.month} className="flex items-center gap-4">
              <span className="text-xs text-neutral-800 w-8">{p.month}</span>
              <div className="flex-1 bg-neutral-100 rounded-full h-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all" style={{ width: `${(p.tasks / maxTasks) * 100}%` }} />
              </div>
              <span className="text-xs text-neutral-800 w-16 text-right">{p.tasks}</span>
              <span className="text-xs text-success w-12 text-right">{p.bugs} bugs</span>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Comparison */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold mb-4">Agent Efficiency Rankings</h2>
        <div className="space-y-2">
          {agents.sort((a, b) => b.efficiency - a.efficiency).map((a, i) => (
            <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50">
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-warning/20 text-warning' : 'bg-neutral-100 text-neutral-800'}`}>{i + 1}</span>
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-900">{a.name}</span>
                  <span className="text-xs text-neutral-800">{a.type}</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-neutral-800">{a.tasksCompleted} tasks</span>
                  <span className={`font-semibold ${a.efficiency >= 97 ? 'text-success' : a.efficiency >= 94 ? 'text-primary-500' : 'text-warning'}`}>{a.efficiency}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-5 text-center">
          <div className="text-2xl font-heading font-bold gradient-text">99.99%</div>
          <div className="text-xs text-neutral-800 mt-1">System Uptime (30 days)</div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-5 text-center">
          <div className="text-2xl font-heading font-bold gradient-text">0</div>
          <div className="text-xs text-neutral-800 mt-1">Human Errors (30 days)</div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-5 text-center">
          <div className="text-2xl font-heading font-bold gradient-text">₹0</div>
          <div className="text-xs text-neutral-800 mt-1">Labor Cost (All time)</div>
        </div>
      </div>
    </div>
  )
}

// ===================== ROLES =====================
function RolesPage() {
  const [roles, setRoles] = useState<any[]>([])

  useEffect(() => { setRoles(DB.get('roles') || []) }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Role & Permission Management</h1>
          <p className="text-neutral-800 text-sm">6 roles defined · RBAC enforced</p>
        </div>
        <button className="btn-primary text-sm"><Plus size={16} /> Create Role</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {roles.map(r => (
          <div key={r.id} className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent-500" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">{r.name}</div>
                  <div className="text-xs text-neutral-800">{r.agents} agent{r.agents > 1 ? 's' : ''}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {r.permissions.map((p: string) => (
                <span key={p} className="chip bg-neutral-100 text-neutral-800 text-[10px]">{p.replace('_', ' ')}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===================== MAIN ADMIN =====================
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    DB.init()
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    if (tab) setActiveTab(tab)
  }, [])

  if (!authenticated) return <AdminLogin onLogin={() => setAuthenticated(true)} />

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'Agents', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'leads', label: 'CRM & Leads', icon: Target },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'assets', label: 'Assets', icon: Package },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'roles', label: 'Roles', icon: Shield },
  ]

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />
      case 'agents': return <AgentsPage />
      case 'projects': return <AdminProjectsPage />
      case 'leads': return <LeadsPage />
      case 'finance': return <FinancePage />
      case 'attendance': return <AttendancePage />
      case 'assets': return <AssetsPage />
      case 'analytics': return <AnalyticsPage />
      case 'roles': return <RolesPage />
      default: return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-full w-64 bg-neutral-900 border-r border-neutral-800 z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-heading font-bold text-sm">Nexify Admin</h2>
              <p className="text-neutral-800 text-xs">Management Console</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' : 'text-neutral-800 hover:bg-neutral-800 hover:text-neutral-200'}`}>
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">NO</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">Nexify Orchestrator</div>
              <div className="text-xs text-neutral-800">Super Admin</div>
            </div>
            <button onClick={() => setAuthenticated(false)} className="text-neutral-800 hover:text-error transition-all"><LogOut size={16} /></button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 min-w-0">
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-neutral-200 z-20">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <button className="lg:hidden text-neutral-800" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <div className="flex items-center gap-3 ml-auto">
              <Link href="/" className="text-xs text-neutral-800 hover:text-primary-500 flex items-center gap-1"><Home size={12} /> Main Site</Link>
              <Link href="/portal" className="text-xs text-neutral-800 hover:text-primary-500 flex items-center gap-1"><ExternalLink size={12} /> Client Portal</Link>
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold cursor-pointer">NO</div>
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
