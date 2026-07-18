import { NextResponse } from 'next/server'
import { getProjects, createProject } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const projects = getProjects()
    return NextResponse.json({ projects, total: projects.length })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const project = createProject({
      name: body.name,
      client: body.client,
      description: body.description,
      value: body.value ? Number(body.value) : 0,
      lead_id: body.lead_id,
    })
    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
