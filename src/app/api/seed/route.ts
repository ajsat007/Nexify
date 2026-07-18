import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { seedLeads, seedProjects } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const db = getDb()

    // Seed leads
    const existingLeads = db.prepare('SELECT COUNT(*) as c FROM leads').get() as any
    if (existingLeads.c === 0) {
      const insertLead = db.prepare(`
        INSERT INTO leads (id, company, contact_name, email, phone, source, service_interest, budget, status, notes, created_at, updated_at)
        VALUES (@id, @company, @contact_name, @email, @phone, @source, @service_interest, @budget, @status, @notes, @created_at, @updated_at)
      `)
      for (const lead of seedLeads) {
        insertLead.run(lead)
      }
    }

    // Seed projects
    const existingProjects = db.prepare('SELECT COUNT(*) as c FROM projects').get() as any
    if (existingProjects.c === 0) {
      const insertProject = db.prepare(`
        INSERT INTO projects (id, name, client, description, value, status, progress, deadline, tech_stack, agent_ids, lead_id, created_at, updated_at)
        VALUES (@id, @name, @client, @description, @value, @status, @progress, @deadline, @tech_stack, @agent_ids, @lead_id, @created_at, @updated_at)
      `)
      for (const project of seedProjects) {
        insertProject.run({
          ...project,
          tech_stack: JSON.stringify(project.tech_stack),
          agent_ids: JSON.stringify(project.agent_ids),
          lead_id: project.lead_id || null,
        })
      }
    }

    // Seed users
    const existingUsers = db.prepare('SELECT COUNT(*) as c FROM users').get() as any
    if (existingUsers.c === 0) {
      db.prepare("INSERT INTO users (id, name, email, role) VALUES ('usr-001', 'Nexify Founder', 'founder@nexify.tech', 'founder')").run()
      db.prepare("INSERT INTO users (id, name, email, role) VALUES ('usr-002', 'Rajesh Mehta', 'rajesh@fintechlabs.com', 'client')").run()
      db.prepare("INSERT INTO users (id, name, email, role) VALUES ('usr-003', 'Neha Patel', 'neha@greenenergy.com', 'client')").run()
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      counts: {
        leads: (db.prepare('SELECT COUNT(*) as c FROM leads').get() as any).c,
        projects: (db.prepare('SELECT COUNT(*) as c FROM projects').get() as any).c,
        users: (db.prepare('SELECT COUNT(*) as c FROM users').get() as any).c,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed: ' + String(error) }, { status: 500 })
  }
}
