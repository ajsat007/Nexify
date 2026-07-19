'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, FolderKanban, Loader, Shield, ArrowRight, Mail, CheckCircle } from 'lucide-react'
import { Sidebar } from '@/components/Sidebar'

// ── Project Delivery Card ──

function ProjectDeliveryCard({ project, email }: { project: any; email: string }) {
  const [delivery, setDelivery] = useState<any>(null)
  const [loadingStatus, setLoadingStatus] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/delivery/status?projectId=${project.id}`)
        const data = await res.json()
        setDelivery(data)
      } catch {} finally { setLoadingStatus(false) }
    }
    fetchStatus()
    // Poll every 30s
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [project.id])

  const progress = delivery?.project?.progress || project.progress || 0
  const milestones = delivery?.milestones || []
  const updates = delivery?.updates || []
  const github = delivery?.githubStats

  return (
    <div className="space-y-4">
      {/* Project Header */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold dark:text-white text-base">{project.name}</h3>
              <p className="text-xs text-surface-600">{project.client}</p>
            </div>
            <span className="chip text-xs bg-emerald-100 text-emerald-600">{project.status}</span>
          </div>

          {/* Overall Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-surface-600 mb-1.5">
              <span>Overall Progress</span>
              <span className="font-semibold text-primary-600">{progress}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-surface-200 dark:bg-surface-700">
              <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-1000" style={{width: progress + '%'}} />
            </div>
          </div>

          {/* GitHub Link */}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 text-xs hover:bg-surface-200 transition-all">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              View on GitHub
            </a>
          )}
          {!project.github_url && (
            <span className="text-xs text-surface-500">GitHub repo being created...</span>
          )}
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="p-5 sm:p-6">
          <h4 className="font-semibold text-sm mb-4 dark:text-white">Project Milestones</h4>
          {loadingStatus ? (
            <div className="flex items-center gap-2 text-sm text-surface-500"><Loader size={14} className="animate-spin" /> Loading milestones...</div>
          ) : milestones.length === 0 ? (
            <p className="text-sm text-surface-500">AI agents are planning the milestones...</p>
          ) : (
            <div className="space-y-3">
              {milestones.map((m: any, i: number) => (
                <div key={m.id} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    m.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                    m.status === 'in_progress' ? 'bg-amber-100 text-amber-600' :
                    'bg-surface-100 dark:bg-surface-700 text-surface-500'
                  }`}>
                    {m.status === 'completed' ? '✓' : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium dark:text-white">{m.title}</span>
                      <span className={`text-xs ${
                        m.status === 'completed' ? 'text-emerald-500' :
                        m.status === 'in_progress' ? 'text-amber-500' :
                        'text-surface-500'
                      }`}>{m.status.replace('_', ' ')}</span>
                    </div>
                    <p className="text-xs text-surface-600 mt-0.5">{m.description}</p>
                    {m.due_date && <p className="text-xs text-surface-500 mt-0.5">Due: {new Date(m.due_date).toLocaleDateString()}</p>}
                    {m.progress > 0 && (
                      <div className="w-full h-1 rounded-full bg-surface-200 dark:bg-surface-700 mt-1.5">
                        <div className="h-full rounded-full bg-primary-500" style={{width: m.progress + '%'}} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GitHub Stats */}
      {github && (
        <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5">
          <h4 className="font-semibold text-sm mb-3 dark:text-white">Development Activity</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-heading font-bold text-primary-600">{github.openIssues}</div>
              <div className="text-xs text-surface-600">Open Issues</div>
            </div>
            <div>
              <div className="text-lg font-heading font-bold text-emerald-500">{github.closedIssues}</div>
              <div className="text-xs text-surface-600">Completed</div>
            </div>
            <div>
              <div className="text-lg font-heading font-bold text-amber-500">{github.closedIssues + github.openIssues}</div>
              <div className="text-xs text-surface-600">Total Tasks</div>
            </div>
          </div>
          {github.lastCommit && (
            <p className="text-xs text-surface-500 mt-3 text-center">
              Last commit: {new Date(github.lastCommit).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {/* Project Updates Feed */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5">
        <h4 className="font-semibold text-sm mb-3 dark:text-white">AI Agent Updates</h4>
        {updates.length === 0 ? (
          <p className="text-sm text-surface-500">No updates yet.</p>
        ) : (
          <div className="space-y-2">
            {updates.slice(0, 10).map((u: any) => (
              <div key={u.id} className="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                <span className="text-xs leading-relaxed">{u.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function PortalPage() {
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [proposals, setProposals] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [clientName, setClientName] = useState('')
  const [activeTab, setActiveTab] = useState('proposals')
  const [magicSent, setMagicSent] = useState(false)
  const [paying, setPaying] = useState<string | null>(null)

  // Check for existing session or email param from magic link
  useEffect(() => {
    const checkSession = async () => {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')
      const emailParam = params.get('email')

      // If email is in URL, auto-login (token optional — email is enough)
      if (emailParam) {
        setEmail(emailParam)
        await doLogin(emailParam)
        return
      }

      // Check existing session
      try {
        const res = await fetch('/api/session')
        const data = await res.json()
        if (data.authenticated && data.email) {
          setEmail(data.email)
          await doLogin(data.email)
        }
      } catch {}
    }
    checkSession()
  }, [])

  const doLogin = async (loginEmail: string) => {
    setLoading(true)
    setError('')
    try {
      const [proposalsRes, leadsRes, projectsRes] = await Promise.all([
        fetch('/api/proposals').then(r => r.json()),
        fetch('/api/leads').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
      ])
      const matchingLeads = (leadsRes.leads || []).filter((l: any) =>
        l.email?.toLowerCase() === loginEmail.toLowerCase()
      )
      if (matchingLeads.length > 0) {
        setClientName(matchingLeads[0].contact_name || loginEmail)
        setProposals((proposalsRes.proposals || []).filter((p: any) =>
          matchingLeads.some((l: any) => l.id === p.lead_id)
        ))
        setProjects((projectsRes.projects || []).filter((p: any) =>
          matchingLeads.some((l: any) => l.id === p.lead_id) || p.client?.toLowerCase() === loginEmail.toLowerCase()
        ))
        setLoggedIn(true)
        // Create persistent session
        fetch('/api/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: loginEmail, role: 'client' }) })
      } else {
        setError('No account found with this email.')
      }
    } catch {
      setError('Unable to verify.')
    }
    setLoading(false)
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMagicSent(false)
    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        if (data.devLink) {
          // Dev mode — auto-login
          window.location.href = data.devLink
        } else {
          setMagicSent(true)
        }
      } else {
        setError(data.error || 'Failed to send magic link')
      }
    } catch {
      // Fallback: direct login for demo
      doLogin(email)
    }
    setLoading(false)
  }

  const handleAccept = async (proposalId: string) => {
    setPaying(proposalId)
    try {
      const res = await fetch('/api/accept-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      if (data.paymentLink) {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => {
          const options = {
            key: data.paymentLink.keyId,
            amount: data.paymentLink.amount,
            currency: 'INR',
            name: 'Nexify Technologies',
            description: 'Project Payment',
            order_id: data.paymentLink.orderId,
            handler: () => { alert('Welcome aboard! 🤝'); window.location.reload() },
            modal: { ondismiss: () => setPaying(null) },
          }
          const rzp = new (window as any).Razorpay(options)
          rzp.open()
        }
        document.body.appendChild(script)
      } else {
        alert('Proposal accepted! We will reach out to you shortly.')
        window.location.reload()
      }
    } catch (err: any) {
      alert(err.message || 'Failed to accept. Please contact us.')
      setPaying(null)
    }
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      <Sidebar
        items={[
          { label: 'My Proposals', icon: FileText, active: activeTab === 'proposals', onClick: () => setActiveTab('proposals') },
          { label: 'My Projects', icon: FolderKanban, active: activeTab === 'projects', onClick: () => setActiveTab('projects') },
        ]}
        title="Client Portal"
        subtitle={loggedIn ? clientName : 'Guest'}
      />
      <div className="lg:pl-64">
        <div className="lg:hidden h-16" />
        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
          {!loggedIn ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-heading font-bold dark:text-white">Client Portal</h1>
                  <p className="text-sm text-surface-600 mt-2">Enter your email to receive a magic link.</p>
                </div>

                {magicSent ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 text-center border border-blue-200 dark:border-blue-800">
                    <Mail className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                    <h2 className="font-semibold mb-2 dark:text-white">Check your email</h2>
                    <p className="text-sm text-surface-700 dark:text-surface-400">We sent a magic link to <strong>{email}</strong></p>
                  </div>
                ) : (
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-surface-700 dark:text-surface-300">Email Address</label>
                      <input type="email" required className="input-field" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl p-3">{error}</p>}
                    <button type="submit" disabled={loading} className="btn-primary w-full">
                      {loading ? <><Loader size={16} className="animate-spin" /> Sending...</> : <>Send Magic Link</>}
                    </button>
                    <p className="text-xs text-surface-500 text-center">
                      No account? <Link href="/contact" className="text-primary-500 hover:underline">Submit a project inquiry</Link>
                    </p>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-heading font-bold dark:text-white">Welcome, {clientName}</h1>
                <p className="text-sm text-surface-600 mt-1">Your proposals and project status</p>
              </div>
              <div className="flex gap-2 mb-6">
                <button onClick={() => setActiveTab('proposals')}
                  className={`chip transition-all ${activeTab === 'proposals' ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-700 text-surface-700'}`}>
                  Proposals ({proposals.length})
                </button>
                <button onClick={() => setActiveTab('projects')}
                  className={`chip transition-all ${activeTab === 'projects' ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-700 text-surface-700'}`}>
                  Projects ({projects.length})
                </button>
              </div>
              {activeTab === 'proposals' && (
                <div className="space-y-4">
                  {proposals.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 p-6">
                      <FileText className="w-8 h-8 text-surface-400 mx-auto mb-3" />
                      <p className="text-sm text-surface-600">No proposals yet.</p>
                    </div>
                  ) : proposals.map((p: any) => (
                    <div key={p.id} className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden">
                      <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                          <h3 className="font-semibold dark:text-white text-base">{p.title}</h3>
                          <span className={`chip text-xs shrink-0 ${
                            p.status === 'draft' ? 'bg-surface-100 text-surface-700' :
                            p.status === 'sent' ? 'bg-blue-100 text-blue-600' :
                            p.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' :
                            'bg-red-100 text-red-600'
                          }`}>{p.status}</span>
                        </div>
                        <div className="text-sm text-surface-700 dark:text-surface-300 whitespace-pre-line leading-relaxed bg-surface-50 dark:bg-surface-700/30 rounded-xl p-4 max-h-80 overflow-y-auto mb-4">
                          {p.content}
                        </div>
                        <div className="flex items-center gap-3">
                          {p.status === 'sent' && (
                            <button
                              onClick={() => handleAccept(p.id)}
                              disabled={paying === p.id}
                              className="btn-primary text-sm"
                            >
                              {paying === p.id ? <Loader size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                              Accept Proposal & Pay
                            </button>
                          )}
                          {p.status === 'accepted' && (
                            <span className="chip bg-emerald-100 text-emerald-600 text-xs">
                              <CheckCircle size={12} /> Accepted
                            </span>
                          )}
                          <span className="text-sm text-surface-600 font-medium">{p.price_range}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {projects.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-6">
                      <FolderKanban className="w-8 h-8 text-surface-400 mx-auto mb-3" />
                      <p className="text-sm text-surface-600">No projects yet. Accept a proposal to get started.</p>
                    </div>
                  ) : (
                    <ProjectDeliveryCard project={projects[0]} email={email} />
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
