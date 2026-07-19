// ============================================================================
// Nexify — Data Access Layer
// All database operations go through here. Provides a clean API
// for reading/writing leads, projects, proposals, invoices.
// ============================================================================

import { getDb } from './index'
import type { DBLead, DBProject, DBInvoice, DBAgentTask } from './schema'

// ── Helpers ──

function generateId(prefix: string): string {
  const num = Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase()
  return `${prefix}-${num}`
}

function now(): string {
  return new Date().toISOString()
}

// ── LEADS ──

export function getLeads(): DBLead[] {
  const db = getDb()
  return db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all() as DBLead[]
}

export function getLead(id: string): DBLead | undefined {
  const db = getDb()
  return db.prepare('SELECT * FROM leads WHERE id = ?').get(id) as DBLead | undefined
}

export function createLead(data: {
  company?: string
  contact_name: string
  email: string
  phone?: string
  source?: string
  service_interest?: string
  budget?: number
  notes?: string
}): DBLead {
  const db = getDb()
  const lead: DBLead = {
    id: generateId('LD'),
    company: data.company || '',
    contact_name: data.contact_name,
    email: data.email,
    phone: data.phone || '',
    source: data.source || 'website',
    service_interest: data.service_interest || '',
    budget: data.budget || 0,
    status: 'new',
    notes: data.notes || '',
    created_at: now(),
    updated_at: now(),
  }
  db.prepare(`
    INSERT INTO leads (id, company, contact_name, email, phone, source, service_interest, budget, status, notes, created_at, updated_at)
    VALUES (@id, @company, @contact_name, @email, @phone, @source, @service_interest, @budget, @status, @notes, @created_at, @updated_at)
  `).run(lead)
  return lead
}

export function updateLead(id: string, updates: Partial<DBLead>): DBLead | null {
  const db = getDb()
  const existing = getLead(id)
  if (!existing) return null

  const updated = { ...existing, ...updates, updated_at: now() }
  db.prepare(`
    UPDATE leads SET company=@company, contact_name=@contact_name, email=@email, phone=@phone,
    source=@source, service_interest=@service_interest, budget=@budget, status=@status,
    notes=@notes, updated_at=@updated_at WHERE id=@id
  `).run(updated)
  return updated
}

// ── PROPOSALS ──

export interface DBProposal {
  id: string
  lead_id: string
  title: string
  content: string
  price_range: string
  timeline: string
  status: 'draft' | 'sent' | 'accepted' | 'rejected'
  generated_by: string
  created_at: string
  sent_at: string | null
}

export function getProposals(leadId?: string): DBProposal[] {
  const db = getDb()
  if (leadId) {
    return db.prepare('SELECT * FROM proposals WHERE lead_id = ? ORDER BY created_at DESC').all(leadId) as DBProposal[]
  }
  return db.prepare('SELECT * FROM proposals ORDER BY created_at DESC').all() as DBProposal[]
}

export function getProposal(id: string): DBProposal | undefined {
  const db = getDb()
  return db.prepare('SELECT * FROM proposals WHERE id = ?').get(id) as DBProposal | undefined
}

export function createProposal(data: {
  lead_id: string
  title: string
  content: string
  price_range?: string
  timeline?: string
}): DBProposal {
  const db = getDb()
  const proposal: DBProposal = {
    id: generateId('PRL'),
    lead_id: data.lead_id,
    title: data.title,
    content: data.content,
    price_range: data.price_range || '',
    timeline: data.timeline || '',
    status: 'draft',
    generated_by: 'ai',
    created_at: now(),
    sent_at: null,
  }
  db.prepare(`
    INSERT INTO proposals (id, lead_id, title, content, price_range, timeline, status, generated_by, created_at)
    VALUES (@id, @lead_id, @title, @content, @price_range, @timeline, @status, @generated_by, @created_at)
  `).run(proposal)
  return proposal
}

export function updateProposalStatus(id: string, status: DBProposal['status']): void {
  const db = getDb()
  if (status === 'sent') {
    db.prepare("UPDATE proposals SET status = ?, sent_at = ? WHERE id = ?").run(status, now(), id)
  } else {
    db.prepare("UPDATE proposals SET status = ? WHERE id = ?").run(status, id)
  }
}

// ── PROJECTS ──

export function getProjects(): DBProject[] {
  const db = getDb()
  return db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all() as DBProject[]
}

export function createProject(data: {
  name: string
  client: string
  description?: string
  value?: number
  lead_id?: string
  proposal_id?: string
}): DBProject {
  const db = getDb()
  const project: DBProject = {
    id: generateId('PRJ'),
    name: data.name,
    client: data.client,
    description: data.description || '',
    value: data.value || 0,
    status: 'planning',
    progress: 0,
    deadline: '',
    tech_stack: [],
    agent_ids: [],
    lead_id: data.lead_id,
    created_at: now(),
    updated_at: now(),
  }
  db.prepare(`
    INSERT INTO projects (id, name, client, description, value, status, progress, created_at, updated_at)
    VALUES (@id, @name, @client, @description, @value, @status, @progress, @created_at, @updated_at)
  `).run(project)
  return project
}

// ── INVOICES ──

export function getInvoices(): DBInvoice[] {
  const db = getDb()
  return db.prepare('SELECT * FROM invoices ORDER BY created_at DESC').all() as DBInvoice[]
}

export function createInvoice(data: {
  project_id: string
  client: string
  amount: number
  due_date?: string
  items?: { description: string; amount: number }[]
}): DBInvoice {
  const db = getDb()
  const invoice: DBInvoice = {
    id: generateId('INV'),
    project_id: data.project_id,
    client: data.client,
    amount: data.amount,
    status: 'draft',
    due_date: data.due_date || '',
    items: data.items || [],
    created_at: now(),
  }
  db.prepare(`
    INSERT INTO invoices (id, project_id, client, amount, status, due_date, items, created_at)
    VALUES (@id, @project_id, @client, @amount, @status, @due_date, @items, @created_at)
  `).run(invoice)
  return invoice
}

// ── AGENTS ──

export function getAgentTasks(): DBAgentTask[] {
  const db = getDb()
  return db.prepare('SELECT * FROM agent_tasks ORDER BY created_at DESC').all() as DBAgentTask[]
}

export function createAgentTask(data: {
  agent_id: string
  title: string
  description?: string
  priority?: DBAgentTask['priority']
}): DBAgentTask {
  const db = getDb()
  const task: DBAgentTask = {
    id: generateId('TASK'),
    agent_id: data.agent_id,
    title: data.title,
    description: data.description || '',
    priority: data.priority || 'medium',
    status: 'pending',
    depends_on: [],
    created_at: now(),
  }
  db.prepare(`
    INSERT INTO agent_tasks (id, agent_id, title, description, priority, status, depends_on, created_at)
    VALUES (@id, @agent_id, @title, @description, @priority, @status, @depends_on, @created_at)
  `).run(task)
  return task
}

// ── STATS ──

export function getDashboardStats() {
  const db = getDb()
  const leadCount = (db.prepare('SELECT COUNT(*) as c FROM leads').get() as any).c
  const newLeads = (db.prepare("SELECT COUNT(*) as c FROM leads WHERE status='new'").get() as any).c
  const activeProjects = (db.prepare("SELECT COUNT(*) as c FROM projects WHERE status='active'").get() as any).c
  const totalRevenue = (db.prepare("SELECT COALESCE(SUM(amount), 0) as c FROM invoices WHERE status='paid'").get() as any).c
  const pendingProposals = (db.prepare("SELECT COUNT(*) as c FROM proposals WHERE status='draft'").get() as any).c
  const proposalCount = (db.prepare('SELECT COUNT(*) as c FROM proposals').get() as any).c

  return {
    totalLeads: leadCount,
    newLeads,
    activeProjects,
    totalRevenue: Math.round(totalRevenue),
    pendingProposals,
    totalProposals: proposalCount,
  }
}

// ── CHATBOT PROJECTS ──

export interface ChatbotProject {
  id: string
  project_id: string
  business_name: string
  business_type: string
  faqs: string
  services: string
  tone: string
  channels: string
  knowledge_base: string
  status: 'pending' | 'training' | 'ready' | 'deployed' | 'active'
  deployed_at: string | null
  created_at: string
  updated_at: string
}

export function createChatbotProject(data: {
  project_id: string
  business_name: string
  business_type?: string
  faqs?: string
  services?: string
  tone?: string
  channels?: string
  knowledge_base?: string
}): ChatbotProject {
  const db = getDb()
  const project: ChatbotProject = {
    id: generateId('CBT'),
    project_id: data.project_id,
    business_name: data.business_name,
    business_type: data.business_type || '',
    faqs: data.faqs || '',
    services: data.services || '',
    tone: data.tone || 'professional',
    channels: data.channels || '["web"]',
    knowledge_base: data.knowledge_base || '[]',
    status: 'pending',
    deployed_at: null,
    created_at: now(),
    updated_at: now(),
  }
  db.prepare(`
    INSERT INTO chatbot_projects (id, project_id, business_name, business_type, faqs, services, tone, channels, knowledge_base, status, created_at, updated_at)
    VALUES (@id, @project_id, @business_name, @business_type, @faqs, @services, @tone, @channels, @knowledge_base, @status, @created_at, @updated_at)
  `).run(project)
  return project
}

export function getChatbotProject(projectId: string): ChatbotProject | undefined {
  const db = getDb()
  return db.prepare('SELECT * FROM chatbot_projects WHERE project_id = ?').get(projectId) as ChatbotProject | undefined
}

export function updateChatbotProject(projectId: string, updates: Partial<ChatbotProject>): ChatbotProject | null {
  const db = getDb()
  const existing = getChatbotProject(projectId)
  if (!existing) return null

  const updated = { ...existing, ...updates, updated_at: now() }
  db.prepare(`
    UPDATE chatbot_projects
    SET business_name=@business_name, business_type=@business_type, faqs=@faqs,
        services=@services, tone=@tone, channels=@channels, knowledge_base=@knowledge_base,
        status=@status, deployed_at=@deployed_at, updated_at=@updated_at
    WHERE project_id=@project_id
  `).run({ ...updated, project_id: projectId })
  return updated
}
