// ============================================================================
// Nexify — SQLite Database Client
// Auto-seeds on first access. On Vercel each instance gets its own /tmp/,
// so we auto-seed every time the DB is empty.
// ============================================================================

import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_PATH = process.env.NEXIFY_DB_PATH || (
  process.env.NODE_ENV === 'production'
    ? '/tmp/nexify.db'
    : path.join(process.cwd(), 'nexify.db')
)

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (db) return db

  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  migrate(db)
  autoSeed(db)

  return db
}

function migrate(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      company TEXT NOT NULL DEFAULT '',
      contact_name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      phone TEXT DEFAULT '',
      source TEXT DEFAULT 'website',
      service_interest TEXT DEFAULT '',
      budget REAL DEFAULT 0,
      status TEXT DEFAULT 'new' CHECK(status IN ('new','qualified','proposal','won','lost','closed')),
      notes TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS proposals (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      price_range TEXT DEFAULT '',
      timeline TEXT DEFAULT '',
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft','sent','accepted','rejected')),
      generated_by TEXT DEFAULT 'ai',
      created_at TEXT DEFAULT (datetime('now')),
      sent_at TEXT,
      FOREIGN KEY (lead_id) REFERENCES leads(id)
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL DEFAULT '',
      client TEXT NOT NULL DEFAULT '',
      description TEXT DEFAULT '',
      value REAL DEFAULT 0,
      status TEXT DEFAULT 'planning' CHECK(status IN ('planning','active','completed','on_hold')),
      progress INTEGER DEFAULT 0,
      deadline TEXT,
      tech_stack TEXT DEFAULT '[]',
      agent_ids TEXT DEFAULT '[]',
      lead_id TEXT,
      proposal_id TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (lead_id) REFERENCES leads(id)
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      client TEXT NOT NULL DEFAULT '',
      amount REAL DEFAULT 0,
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft','sent','paid','overdue')),
      due_date TEXT,
      paid_at TEXT,
      items TEXT DEFAULT '[]',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (project_id) REFERENCES projects(id)
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL UNIQUE,
      role TEXT DEFAULT 'client' CHECK(role IN ('founder','admin','client','viewer')),
      avatar TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      role TEXT DEFAULT 'client',
      created_at TEXT DEFAULT (datetime('now')),
      expires_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS agent_tasks (
      id TEXT PRIMARY KEY,
      agent_id TEXT NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      description TEXT DEFAULT '',
      priority TEXT DEFAULT 'medium' CHECK(priority IN ('low','medium','high','critical')),
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending','assigned','in_progress','completed','failed')),
      result TEXT DEFAULT '',
      depends_on TEXT DEFAULT '[]',
      created_at TEXT DEFAULT (datetime('now')),
      completed_at TEXT
    );
  `)
}

function autoSeed(db: Database.Database): void {
  const count = (db.prepare('SELECT COUNT(*) as c FROM leads').get() as any).c
  if (count > 0) return

  console.log('[DB] Auto-seeding demo data...')

  // Seed leads
  const leads = [
    { id: 'LD-001', company: 'TechVista Solutions', contact_name: 'Vikram Singh', email: 'vikram@techvista.com', phone: '+91 98765 43210', source: 'LinkedIn', service_interest: 'Custom Software', budget: 800000, status: 'qualified', notes: 'Interested in ERP system for manufacturing', created_at: '2026-07-10T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
    { id: 'LD-002', company: 'GreenEnergy Corp', contact_name: 'Neha Patel', email: 'neha@greenenergy.com', phone: '+91 87654 32109', source: 'Website', service_interest: 'AI Solutions', budget: 1200000, status: 'proposal', notes: 'AI for energy optimization', created_at: '2026-07-08T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
    { id: 'LD-003', company: 'MediCare Hospitals', contact_name: 'Dr. Rajesh Kumar', email: 'rajesh@medicare.com', phone: '+91 76543 21098', source: 'Referral', service_interest: 'Mobile App', budget: 500000, status: 'new', notes: 'Patient portal app', created_at: '2026-07-11T00:00:00Z', updated_at: '2026-07-11T00:00:00Z' },
    { id: 'LD-004', company: 'EduPrime Institute', contact_name: 'Ananya Gupta', email: 'ananya@eduprime.com', phone: '+91 65432 10987', source: 'Twitter/X', service_interest: 'Web Development', budget: 250000, status: 'qualified', notes: 'LMS platform', created_at: '2026-07-07T00:00:00Z', updated_at: '2026-07-07T00:00:00Z' },
    { id: 'LD-005', company: 'StyleHub Fashion', contact_name: 'Priya Sharma', email: 'priya@stylehub.com', phone: '+91 43210 98765', source: 'LinkedIn', service_interest: 'E-commerce', budget: 600000, status: 'new', notes: 'Multi-vendor marketplace', created_at: '2026-07-11T00:00:00Z', updated_at: '2026-07-11T00:00:00Z' },
  ]
  const insertLead = db.prepare(`INSERT INTO leads (id, company, contact_name, email, phone, source, service_interest, budget, status, notes, created_at, updated_at) VALUES (@id, @company, @contact_name, @email, @phone, @source, @service_interest, @budget, @status, @notes, @created_at, @updated_at)`)
  for (const l of leads) insertLead.run(l)

  // Seed projects
  const projects = [
    { id: 'PRJ-001', name: 'FinTech Trading Dashboard', client: 'FinTech Labs', description: 'Real-time trading dashboard', value: 600000, status: 'active', progress: 78, deadline: '2026-07-15', tech_stack: '["React","Node.js","PostgreSQL","WebSocket"]', agent_ids: '["dev-alpha","design-gamma","qa-delta"]', created_at: '2026-04-01T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
    { id: 'PRJ-002', name: 'Healthcare Telemedicine App', client: 'HealthFirst', description: 'Cross-platform telemedicine', value: 1000000, status: 'active', progress: 45, deadline: '2026-08-30', tech_stack: '["React Native","Python","PostgreSQL","Twilio"]', agent_ids: '["mobile-eta","dev-beta","qa-delta"]', created_at: '2026-05-15T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
    { id: 'PRJ-003', name: 'E-commerce Recommendation Engine', client: 'StyleCart', description: 'AI recommendation system', value: 500000, status: 'active', progress: 92, deadline: '2026-07-10', tech_stack: '["Python","TensorFlow","Redis","FastAPI"]', agent_ids: '["ai-theta","data-zeta"]', created_at: '2026-04-20T00:00:00Z', updated_at: '2026-07-09T00:00:00Z' },
    { id: 'PRJ-004', name: 'EdTech Learning Platform', client: 'EduVista', description: 'Online learning management system', value: 800000, status: 'active', progress: 30, deadline: '2026-09-15', tech_stack: '["Next.js","Node.js","PostgreSQL","AWS"]', agent_ids: '["frontend-lambda","dev-beta","design-gamma"]', created_at: '2026-06-01T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
    { id: 'PRJ-005', name: 'Logistics Fleet Management', client: 'LogiMove', description: 'Fleet tracking system', value: 750000, status: 'planning', progress: 10, deadline: '2026-10-01', tech_stack: '["React","Python","PostgreSQL","IoT"]', agent_ids: '["devops-epsilon","data-zeta"]', created_at: '2026-06-20T00:00:00Z', updated_at: '2026-07-01T00:00:00Z' },
    { id: 'PRJ-006', name: 'AI Customer Support Chatbot', client: 'SupportPro', description: 'Multi-channel support chatbot', value: 300000, status: 'active', progress: 65, deadline: '2026-08-01', tech_stack: '["Python","LangChain","OpenAI","WhatsApp API"]', agent_ids: '["bot-kappa","ai-theta"]', created_at: '2026-05-10T00:00:00Z', updated_at: '2026-07-10T00:00:00Z' },
    { id: 'PRJ-007', name: 'Retail Analytics Dashboard', client: 'RetailMax', description: 'Retail analytics', value: 350000, status: 'completed', progress: 100, deadline: '2026-06-30', tech_stack: '["React","Python","PostgreSQL","Metabase"]', agent_ids: '["data-zeta","frontend-lambda"]', created_at: '2026-03-15T00:00:00Z', updated_at: '2026-06-30T00:00:00Z' },
    { id: 'PRJ-008', name: 'HRMS & Payroll System', client: 'EnterpriseCorp', description: 'HR management system', value: 600000, status: 'planning', progress: 5, deadline: '2026-10-15', tech_stack: '["Next.js","Node.js","PostgreSQL","AWS"]', agent_ids: '["dev-alpha","frontend-lambda"]', created_at: '2026-07-01T00:00:00Z', updated_at: '2026-07-05T00:00:00Z' },
  ]
  const insertProject = db.prepare(`INSERT INTO projects (id, name, client, description, value, status, progress, deadline, tech_stack, agent_ids, created_at, updated_at) VALUES (@id, @name, @client, @description, @value, @status, @progress, @deadline, @tech_stack, @agent_ids, @created_at, @updated_at)`)
  for (const p of projects) insertProject.run(p)

  // Users
  db.prepare("INSERT INTO users (id, name, email, role) VALUES ('usr-001', 'Nexify Founder', 'founder@nexify.tech', 'founder')").run()
  db.prepare("INSERT INTO users (id, name, email, role) VALUES ('usr-002', 'Rajesh Mehta', 'rajesh@fintechlabs.com', 'client')").run()
  db.prepare("INSERT INTO users (id, name, email, role) VALUES ('usr-003', 'Neha Patel', 'neha@greenenergy.com', 'client')").run()

  console.log('[DB] Auto-seed complete')
}

export function closeDb(): void {
  if (db) {
    db.close()
    db = null
  }
}
