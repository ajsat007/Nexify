'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, FolderKanban, Loader, Shield } from 'lucide-react'
import { Sidebar } from '@/components/Sidebar'

export default function PortalPage() {
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [proposals, setProposals] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [clientName, setClientName] = useState('')
  const [activeTab, setActiveTab] = useState('proposals')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const [proposalsRes, leadsRes, projectsRes] = await Promise.all([
        fetch('/api/proposals').then(r => r.json()),
        fetch('/api/leads').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
      ])
      const matchingLeads = (leadsRes.leads || []).filter((l: any) =>
        l.email?.toLowerCase() === email.toLowerCase()
      )
      if (matchingLeads.length > 0) {
        setClientName(matchingLeads[0].contact_name || email)
        setProposals((proposalsRes.proposals || []).filter((p: any) =>
          matchingLeads.some((l: any) => l.id === p.lead_id)
        ))
        setProjects((projectsRes.projects || []).filter((p: any) =>
          matchingLeads.some((l: any) => l.id === p.lead_id) || p.client?.toLowerCase() === email.toLowerCase()
        ))
        setLoggedIn(true)
      } else {
        setError('No account found with this email. Submit a contact form first.')
      }
    } catch {
      setError('Unable to verify. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
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
                  <p className="text-sm text-neutral-500 mt-2">Enter your email to view your proposals and projects.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email Address</label>
                    <input type="email" required className="input-field" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl p-3">{error}</p>}
                  <button type="submit" disabled={loading} className="btn-primary w-full">
                    {loading ? 'Verifying...' : 'View My Proposals'}
                  </button>
                  <p className="text-xs text-neutral-400 text-center">
                    No account? <Link href="/contact" className="text-primary-500 hover:underline">Submit a project inquiry</Link>
                  </p>
                </form>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-heading font-bold dark:text-white">Welcome, {clientName}</h1>
                <p className="text-sm text-neutral-500 mt-1">Your proposals and project status</p>
              </div>
              <div className="flex gap-2 mb-6">
                <button onClick={() => setActiveTab('proposals')}
                  className={`chip transition-all ${activeTab === 'proposals' ? 'bg-primary-500 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600'}`}>
                  Proposals ({proposals.length})
                </button>
                <button onClick={() => setActiveTab('projects')}
                  className={`chip transition-all ${activeTab === 'projects' ? 'bg-primary-500 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600'}`}>
                  Projects ({projects.length})
                </button>
              </div>
              {activeTab === 'proposals' && (
                <div className="space-y-4">
                  {proposals.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 p-6">
                      <FileText className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
                      <p className="text-sm text-neutral-500">No proposals yet.</p>
                    </div>
                  ) : proposals.map((p: any) => (
                    <div key={p.id} className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="font-semibold dark:text-white">{p.title}</h3>
                        <span className={`chip text-xs ${p.status === 'draft' ? 'bg-neutral-100 text-neutral-600' : p.status === 'sent' ? 'bg-blue-100 text-blue-600' : p.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>{p.status}</span>
                      </div>
                      <div className="text-sm text-neutral-600 whitespace-pre-line leading-relaxed bg-neutral-50 rounded-xl p-4 max-h-80 overflow-y-auto">{p.content}</div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {projects.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 p-6">
                      <FolderKanban className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
                      <p className="text-sm text-neutral-500">No projects yet.</p>
                    </div>
                  ) : projects.map((p: any) => (
                    <div key={p.id} className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold dark:text-white">{p.name}</h3>
                        <span className="chip text-xs bg-emerald-100 text-emerald-600">{p.status}</span>
                      </div>
                      <p className="text-sm text-neutral-500 mb-3">{p.description}</p>
                      {p.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-xs text-neutral-500 mb-1">
                            <span>Progress</span><span>{p.progress}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-neutral-200">
                            <div className="h-full rounded-full bg-primary-500" style={{width: p.progress + '%'}} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}