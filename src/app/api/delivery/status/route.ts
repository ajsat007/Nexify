// ============================================================================
// Delivery Status — Get project delivery status, milestones, recent updates
// ============================================================================

import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { getIssues, getLatestCommit, isGitHubConfigured } from '@/lib/github'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    if (!projectId) return NextResponse.json({ error: 'projectId required' }, { status: 400 })

    const db = getDb()

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId) as any
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })

    const milestones = db.prepare('SELECT * FROM milestones WHERE project_id = ? ORDER BY order_index').all(projectId) as any[]
    const updates = db.prepare('SELECT * FROM project_updates WHERE project_id = ? ORDER BY created_at DESC LIMIT 20').all(projectId) as any[]

    // Fetch GitHub stats if repo exists
    let githubStats = null
    if (project.github_repo && isGitHubConfigured()) {
      const [issues, closedIssues, commit] = await Promise.all([
        getIssues(project.github_repo, 'open'),
        getIssues(project.github_repo, 'closed'),
        getLatestCommit(project.github_repo),
      ])
      githubStats = {
        openIssues: issues.data?.length || 0,
        closedIssues: closedIssues.data?.length || 0,
        lastCommit: commit.data ? commit.data.commit.author.date : null,
        lastMessage: commit.data?.commit?.message || null,
      }
    }

    // Calculate overall progress
    const completedMilestones = milestones.filter(m => m.status === 'completed').length
    const overallProgress = milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : project.progress

    return NextResponse.json({
      project: {
        id: project.id,
        name: project.name,
        client: project.client,
        status: project.status,
        progress: overallProgress,
        githubRepo: project.github_repo,
        githubUrl: project.github_url,
      },
      milestones,
      updates,
      githubStats,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
