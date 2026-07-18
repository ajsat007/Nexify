// ============================================================================
// Nexify — Authentication & Authorization
// Simple token-based auth for demo/admin pages
// Upgrade to JWT + NextAuth.js for production
// ============================================================================

export type UserRole = 'founder' | 'admin' | 'sales' | 'client' | 'viewer'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

const USERS: AuthUser[] = [
  { id: 'usr-001', name: 'Nexify Founder', email: 'founder@nexify.tech', role: 'founder' },
  { id: 'usr-002', name: 'Nexify Orchestrator', email: 'admin@nexify.tech', role: 'admin' },
  { id: 'usr-003', name: 'SalesAgent-Mu', email: 'sales@nexify.tech', role: 'sales' },
  { id: 'usr-004', name: 'Rajesh Mehta', email: 'rajesh@fintechlabs.com', role: 'client' },
]

const TOKEN_KEY = 'nexify_auth'

export function login(email: string): AuthUser | null {
  const user = USERS.find(u => u.email === email)
  if (!user) return null
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ userId: user.id, role: user.role }))
  }
  return user
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export function getSession(): { userId: string; role: UserRole } | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(TOKEN_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function getCurrentUser(): AuthUser | null {
  const session = getSession()
  if (!session) return null
  return USERS.find(u => u.id === session.userId) || null
}

export function hasRole(...roles: UserRole[]): boolean {
  const session = getSession()
  if (!session) return false
  return roles.includes(session.role)
}

export function requireAuth(redirectTo = '/admin'): boolean {
  if (typeof window === 'undefined') return false
  const session = getSession()
  if (!session) {
    window.location.href = redirectTo
    return false
  }
  return true
}

// ── API Route Helper (read token from env; fallback for dev) ──
function getAdminToken(): string {
  // In production, set NEXIFY_ADMIN_TOKEN env variable
  return process.env.NEXIFY_ADMIN_TOKEN || 'changeme-in-production'
}

export function validateApiRequest(request: Request): { valid: boolean; role?: UserRole; error?: string } {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return { valid: false, error: 'Missing authorization header' }
  }
  const token = authHeader.replace('Bearer ', '')
  if (token !== getAdminToken()) {
    return { valid: false, error: 'Invalid token' }
  }
  return { valid: true, role: 'admin' }
}
