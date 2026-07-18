// ============================================================================
// Nexify — GitHub Integration Service
// Auto-creates repos, issues, pushes scaffold code, and manages PRs.
// Uses GitHub REST API — no npm package needed.
// Free tier: unlimited public repos, 2000 API requests/hour
// ============================================================================

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'ajsat007'

interface GitHubApiOptions {
  method?: string
  path: string
  body?: any
}

async function githubApi<T>(options: GitHubApiOptions): Promise<{ data?: T; error?: string }> {
  if (!GITHUB_TOKEN) return { error: 'GITHUB_TOKEN not set' }

  try {
    const res = await fetch(`https://api.github.com${options.path}`, {
      method: options.method || 'GET',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'nexify-ai-agent',
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    if (res.status === 204) return { data: {} as T }
    const data = await res.json()

    if (!res.ok) return { error: data.message || `GitHub API error: ${res.status}` }
    return { data }
  } catch (err: any) {
    return { error: err.message }
  }
}

// ── Repo ──

export interface CreateRepoParams {
  name: string
  description?: string
  private?: boolean
}

export async function createRepo(params: CreateRepoParams) {
  return githubApi<{
    id: number
    name: string
    full_name: string
    html_url: string
    default_branch: string
  }>({
    method: 'POST',
    path: `/user/repos`,
    body: {
      name: params.name,
      description: params.description || '',
      private: params.private ?? false,
      auto_init: true,
      gitignore_template: 'Node',
    },
  })
}

// ── File Content ──

export async function createFile(params: {
  repo: string
  path: string
  content: string
  message: string
  branch?: string
}) {
  const encoded = Buffer.from(params.content).toString('base64')
  return githubApi<{ content: { sha: string } }>({
    method: 'PUT',
    path: `/repos/${GITHUB_OWNER}/${params.repo}/contents/${params.path}`,
    body: {
      message: params.message,
      content: encoded,
      branch: params.branch || 'main',
    },
  })
}

// ── Issues ──

export interface CreateIssueParams {
  repo: string
  title: string
  body?: string
  labels?: string[]
  milestone?: number
}

export async function createIssue(params: CreateIssueParams) {
  return githubApi<{ number: number; html_url: string; state: string }>({
    method: 'POST',
    path: `/repos/${GITHUB_OWNER}/${params.repo}/issues`,
    body: {
      title: params.title,
      body: params.body || '',
      labels: params.labels || ['ai-generated'],
    },
  })
}

// ── Issue Status ──

export async function getIssues(repo: string, state: 'open' | 'closed' = 'open') {
  return githubApi<Array<{ number: number; title: string; state: string; html_url: string }>>({
    path: `/repos/${GITHUB_OWNER}/${repo}/issues?state=${state}&per_page=100`,
  })
}

// ── Commits ──

export async function getLatestCommit(repo: string, branch = 'main') {
  return githubApi<{ sha: string; commit: { message: string; author: { date: string } } }>({
    path: `/repos/${GITHUB_OWNER}/${repo}/commits/${branch}?per_page=1`,
  })
}

// ── Check if token is set ──

export function isGitHubConfigured(): boolean {
  return !!GITHUB_TOKEN
}
