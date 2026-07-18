// ============================================================================
// Nexify — SQLite Database Client
// Persistent storage using better-sqlite3. Works locally and on Vercel
// (writes to /tmp/ on Vercel which persists per-deployment).
// Data directory: nexify.db in the project root (or /tmp/nexify.db on Vercel)
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

  // Ensure the directory exists
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  // Run migrations
  migrate(db)

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

export function closeDb(): void {
  if (db) {
    db.close()
    db = null
  }
}
