'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, FolderKanban, Loader, Shield, ArrowRight, Mail, CheckCircle, CreditCard } from 'lucide-react'
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
  const [magicSent, setMagicSent] = useState(false)
  const [paying, setPaying] = useState<string | null>(null)

  // Check for magic link token in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const emailParam = params.get('email')
    if (token && emailParam) {
      setEmail(emailParam)
      doLogin(emailParam)
    }
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

  const handlePay = async (proposalId: string, amount: number) => {
    setPaying(proposalId)
    try {
      // Check if Razorpay is configured
      const orderRes = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount || 50000, // default ₹50,000 if no amount
          receipt: proposalId,
          notes: { proposal_id: proposalId, client_email: email },
        }),
      })
      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        alert('Payment not available. Razorpay needs to be configured. Contact us to proceed.')
        return
      }

      // Load Razorpay checkout
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Nexify Technologies',
          description: 'Project Payment',
          order_id: orderData.orderId,
          handler: () => {
            alert('Payment successful! Thank you.')
            setPaying(null)
          },
          modal: { ondismiss: () => setPaying(null) },
        }
        const rzp = new (window as any).Razorpay(options)
        rzp.open()
      }
      document.body.appendChild(script)
    } catch {
      alert('Payment service unavailable. Please contact us.')
      setPaying(null)
    }
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
                  <p className="text-sm text-neutral-500 mt-2">Enter your email to receive a magic link.</p>
                </div>

                {magicSent ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 text-center border border-blue-200 dark:border-blue-800">
                    <Mail className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                    <h2 className="font-semibold mb-2 dark:text-white">Check your email</h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">We sent a magic link to <strong>{email}</strong></p>
                  </div>
                ) : (
                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300">Email Address</label>
                      <input type="email" required className="input-field" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl p-3">{error}</p>}
                    <button type="submit" disabled={loading} className="btn-primary w-full">
                      {loading ? <><Loader size={16} className="animate-spin" /> Sending...</> : <>Send Magic Link</>}
                    </button>
                    <p className="text-xs text-neutral-400 text-center">
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
                    <div key={p.id} className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                      <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                          <h3 className="font-semibold dark:text-white text-base">{p.title}</h3>
                          <span className={`chip text-xs shrink-0 ${
                            p.status === 'draft' ? 'bg-neutral-100 text-neutral-600' :
                            p.status === 'sent' ? 'bg-blue-100 text-blue-600' :
                            p.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' :
                            'bg-red-100 text-red-600'
                          }`}>{p.status}</span>
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-line leading-relaxed bg-neutral-50 dark:bg-neutral-700/30 rounded-xl p-4 max-h-80 overflow-y-auto mb-4">
                          {p.content}
                        </div>
                        <div className="flex items-center gap-3">
                          {p.status === 'sent' && (
                            <button
                              onClick={() => handlePay(p.id, 50000)}
                              disabled={paying === p.id}
                              className="btn-primary text-sm"
                            >
                              {paying === p.id ? <Loader size={14} className="animate-spin" /> : <CreditCard size={14} />}
                              Pay with Razorpay
                            </button>
                          )}
                          <span className="text-sm text-neutral-500 font-medium">{p.price_range}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {projects.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
                      <FolderKanban className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
                      <p className="text-sm text-neutral-500">No projects yet.</p>
                    </div>
                  ) : projects.map((p: any) => (
                    <div key={p.id} className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-5">
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
                          <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-700">
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
