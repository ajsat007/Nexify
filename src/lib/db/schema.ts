// ============================================================================
// Nexify — Database Schema & Seed Data
// Target: PostgreSQL via Supabase (local JSON for MVP)
// ============================================================================

export interface DBLead {
  id: string
  company: string
  contact_name: string
  email: string
  phone: string
  source: string
  service_interest: string
  budget: number
  status: 'new' | 'qualified' | 'proposal' | 'won' | 'lost'
  notes: string
  created_at: string
  updated_at: string
}

export interface DBProject {
  id: string
  name: string
  client: string
  description: string
  value: number
  status: 'planning' | 'active' | 'completed' | 'on_hold'
  progress: number
  deadline: string
  tech_stack: string[]
  agent_ids: string[]
  lead_id?: string
  created_at: string
  updated_at: string
}

export interface DBInvoice {
  id: string
  project_id: string
  client: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  due_date: string
  paid_at?: string
  items: { description: string; amount: number }[]
  created_at: string
}

export interface DBUser {
  id: string
  name: string
  email: string
  role: 'founder' | 'admin' | 'client'
  avatar?: string
  created_at: string
}

export interface DBAgentTask {
  id: string
  agent_id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'failed'
  result?: string
  depends_on: string[]
  created_at: string
  completed_at?: string
}

// ── Seed Data ──

export const seedLeads: DBLead[] = [
  { id: 'LD-001', company: 'TechVista Solutions', contact_name: 'Vikram Singh', email: 'vikram@techvista.com', phone: '+91 98765 43210', source: 'LinkedIn', service_interest: 'Custom Software', budget: 800000, status: 'qualified', notes: 'Interested in trading platform', created_at: '2026-07-10T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
  { id: 'LD-002', company: 'GreenEnergy Corp', contact_name: 'Neha Patel', email: 'neha@greenenergy.com', phone: '+91 87654 32109', source: 'Website', service_interest: 'AI Solutions', budget: 1200000, status: 'proposal', notes: 'AI for energy optimization', created_at: '2026-07-08T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
  { id: 'LD-003', company: 'MediCare Hospitals', contact_name: 'Dr. Rajesh Kumar', email: 'rajesh@medicare.com', phone: '+91 76543 21098', source: 'Referral', service_interest: 'Mobile App', budget: 500000, status: 'new', notes: '', created_at: '2026-07-11T00:00:00Z', updated_at: '2026-07-11T00:00:00Z' },
  { id: 'LD-004', company: 'EduPrime Institute', contact_name: 'Ananya Gupta', email: 'ananya@eduprime.com', phone: '+91 65432 10987', source: 'Twitter/X', service_interest: 'Web Development', budget: 250000, status: 'qualified', notes: 'LMS platform', created_at: '2026-07-07T00:00:00Z', updated_at: '2026-07-07T00:00:00Z' },
  { id: 'LD-005', company: 'StyleHub Fashion', contact_name: 'Priya Sharma', email: 'priya@stylehub.com', phone: '+91 43210 98765', source: 'LinkedIn', service_interest: 'E-commerce', budget: 600000, status: 'new', notes: '', created_at: '2026-07-11T00:00:00Z', updated_at: '2026-07-11T00:00:00Z' },
]

export const seedProjects: DBProject[] = [
  { id: 'PRJ-001', name: 'FinTech Trading Dashboard', client: 'FinTech Labs', description: 'Real-time trading dashboard with AI-powered analytics', value: 600000, status: 'active', progress: 78, deadline: '2026-07-15', tech_stack: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'], agent_ids: ['dev-alpha', 'design-gamma', 'qa-delta'], created_at: '2026-04-01T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
  { id: 'PRJ-002', name: 'Healthcare Telemedicine App', client: 'HealthFirst', description: 'Cross-platform telemedicine platform', value: 1000000, status: 'active', progress: 45, deadline: '2026-08-30', tech_stack: ['React Native', 'Python', 'PostgreSQL', 'Twilio'], agent_ids: ['mobile-eta', 'dev-beta', 'qa-delta'], created_at: '2026-05-15T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
  { id: 'PRJ-003', name: 'E-commerce Recommendation Engine', client: 'StyleCart', description: 'AI-powered product recommendation system', value: 500000, status: 'active', progress: 92, deadline: '2026-07-10', tech_stack: ['Python', 'TensorFlow', 'Redis', 'FastAPI'], agent_ids: ['ai-theta', 'data-zeta'], created_at: '2026-04-20T00:00:00Z', updated_at: '2026-07-09T00:00:00Z' },
  { id: 'PRJ-004', name: 'EdTech Learning Platform', client: 'EduVista', description: 'Full-featured online learning management system', value: 800000, status: 'active', progress: 30, deadline: '2026-09-15', tech_stack: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'], agent_ids: ['frontend-lambda', 'dev-beta', 'design-gamma'], created_at: '2026-06-01T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
  { id: 'PRJ-005', name: 'Logistics Fleet Management', client: 'LogiMove', description: 'Real-time fleet tracking and management system', value: 750000, status: 'planning', progress: 10, deadline: '2026-10-01', tech_stack: ['React', 'Python', 'PostgreSQL', 'IoT'], agent_ids: ['devops-epsilon', 'data-zeta'], created_at: '2026-06-20T00:00:00Z', updated_at: '2026-07-01T00:00:00Z' },
  { id: 'PRJ-006', name: 'AI Customer Support Chatbot', client: 'SupportPro', description: 'Intelligent multi-channel support chatbot', value: 300000, status: 'active', progress: 65, deadline: '2026-08-01', tech_stack: ['Python', 'LangChain', 'OpenAI', 'WhatsApp API'], agent_ids: ['bot-kappa', 'ai-theta'], created_at: '2026-05-10T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
  { id: 'PRJ-007', name: 'Retail Analytics Dashboard', client: 'RetailMax', description: 'Real-time retail analytics and reporting', value: 350000, status: 'completed', progress: 100, deadline: '2026-06-30', tech_stack: ['React', 'Python', 'PostgreSQL', 'Metabase'], agent_ids: ['data-zeta', 'frontend-lambda'], created_at: '2026-03-15T00:00:00Z', updated_at: '2026-06-30T00:00:00Z' },
  { id: 'PRJ-008', name: 'HRMS & Payroll System', client: 'EnterpriseCorp', description: 'Complete HR management and payroll system', value: 600000, status: 'planning', progress: 5, deadline: '2026-10-15', tech_stack: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'], agent_ids: ['dev-alpha', 'frontend-lambda'], created_at: '2026-07-01T00:00:00Z', updated_at: '2026-07-05T00:00:00Z' },
]
