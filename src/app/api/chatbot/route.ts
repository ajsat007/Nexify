// ============================================================================
// Nexify — Chatbot Project API
// Handles chatbot project creation, generation, and deployment
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getDb } from '@/lib/db'
import { createTask } from '@/agents/engine'
import { generateKnowledgeBase } from '@/agents/chatbot-generator'

function now() {
  return new Date().toISOString()
}

function escapeSql(str: string): string {
  return str.replace(/'/g, "''")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, service, details, budget } = body

    // Validate required fields
    if (!name || !email || !details) {
      return NextResponse.json(
        { error: 'Name, email, and details are required' },
        { status: 400 }
      )
    }

    const db = getDb()
    const projectId = uuidv4()
    const leadId = uuidv4()
    const nowStr = now()

    // Create lead
    db.exec(`
      INSERT INTO leads (id, contact_name, email, company, service_interest, budget, status, notes, created_at, updated_at)
      VALUES ('${leadId}', '${escapeSql(name)}', '${email}', '${escapeSql(company || '')}', '${service || 'chatbot'}', ${budget || 15000}, 'new', '${escapeSql(details)}', '${nowStr}', '${nowStr}')
    `)

    // Create project
    db.exec(`
      INSERT INTO projects (id, lead_id, name, client, value, status, progress, created_at, updated_at)
      VALUES ('${projectId}', '${leadId}', 'Chatbot for ${escapeSql(name)}', '${escapeSql(name)}', 15000, 'planning', 0, '${nowStr}', '${nowStr}')
    `)

    // Create chatbot project details table if not exists
    const dbInstance = getDb()
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS chatbot_projects (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL UNIQUE,
        business_name TEXT NOT NULL DEFAULT '',
        business_type TEXT DEFAULT 'general',
        faqs TEXT DEFAULT '',
        services TEXT DEFAULT '',
        tone TEXT DEFAULT 'professional',
        channels TEXT DEFAULT '["web","whatsapp"]',
        knowledge_base TEXT DEFAULT '',
        status TEXT DEFAULT 'pending' CHECK(status IN ('pending','generating','ready','deployed')),
        deployed_at TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (project_id) REFERENCES projects(id)
      )
    `)

    // Create chatbot project details
    const chatbotId = uuidv4()
    db.exec(`
      INSERT INTO chatbot_projects (id, project_id, business_name, business_type, faqs, services, tone, channels, status, created_at, updated_at)
      VALUES ('${chatbotId}', '${projectId}', '${escapeSql(company || name)}', '${escapeSql(service || 'general')}', '${escapeSql(details)}', '${escapeSql(details)}', 'professional', '["web","whatsapp"]', 'generating', '${nowStr}', '${nowStr}')
    `)

    // Create initial task: "Generate Chatbot Knowledge Base"
    const task = createTask({
      title: 'Generate Chatbot Knowledge Base',
      description: `Create comprehensive FAQ knowledge base for chatbot. Business: ${company || name}. Details: ${details}. Generate 50+ Q&A pairs covering services, pricing, contact, policies.`,
      assignedTo: 'agent-support', // Support agent handles knowledge base
      priority: 'high',
      input: JSON.stringify({
        businessName: company || name,
        businessType: service || 'general',
        rawInfo: details,
        targetQAs: 50
      })
    })

    // Execute knowledge base generation asynchronously
    setImmediate(async () => {
      try {
        const input = {
          businessName: company || name,
          businessType: service || 'general',
          rawInfo: details,
          targetQAs: 50
        }
        const knowledgeBase = await generateKnowledgeBase(input)

        // Update chatbot project with knowledge base
        const kbString = JSON.stringify(knowledgeBase).replace(/'/g, "''")
        db.exec(`
          UPDATE chatbot_projects
          SET knowledge_base = '${kbString}', status = 'ready', updated_at = '${now()}'
          WHERE project_id = '${projectId}'
        `)

        console.log(`Generated ${knowledgeBase.length} Q&A pairs for project ${projectId}`)
      } catch (error) {
        console.error('Knowledge base generation failed:', error)
      }
    })

    return NextResponse.json({
      success: true,
      projectId,
      leadId,
      taskId: task.id,
      message: 'Chatbot project created. Knowledge base generation started.'
    })
  } catch (error: any) {
    console.error('Chatbot project creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create chatbot project' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json({ error: 'projectId required' }, { status: 400 })
    }

    const db = getDb()
    const project = db.prepare('SELECT * FROM chatbot_projects WHERE project_id = ?').get(projectId) as any

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Parse knowledge_base JSON if it exists
    if (project.knowledge_base) {
      try {
        project.knowledge_base = JSON.parse(project.knowledge_base)
      } catch {
        project.knowledge_base = []
      }
    }

    // Parse channels
    if (project.channels) {
      try {
        project.channels = JSON.parse(project.channels)
      } catch {
        project.channels = ['web', 'whatsapp']
      }
    }

    return NextResponse.json({ project })
  } catch (error: any) {
    console.error('Chatbot project fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}