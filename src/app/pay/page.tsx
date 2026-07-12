'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Loader, Shield, Lock } from 'lucide-react'

const DB = {
  get: (k: string) => { if (typeof window === 'undefined') return null; const d = localStorage.getItem('nxp_' + k); return d ? JSON.parse(d) : null },
  set: (k: string, v: any) => { if (typeof window === 'undefined') return; localStorage.setItem('nxp_' + k, JSON.stringify(v)) },
  init() {
    if (this.get('init')) return
    this.set('invoices', [
      { id: 'INV-001', client: 'Client', project: 'Project', amount: 45000, status: 'paid', date: '2026-07-10' },
      { id: 'INV-002', client: 'Client 2', project: 'Project 2', amount: 25000, status: 'pending', date: '2026-07-12', dueDate: '2026-07-26' },
    ])
    this.set('earnings', { total: 45000, pending: 25000, thisMonth: 45000 })
    this.set('init', true)
  }
}

const amounts = [15000, 25000, 45000, 60000, 75000, 100000]

export default function PayPage() {
  const [tab, setTab] = useState('pay')
  const [amount, setAmount] = useState(25000)
  const [custom, setCustom] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [project, setProject] = useState('')
  const [loading, setLoading] = useState(false)
  const [invoices, setInvoices] = useState<any[]>([])
  const [earnings, setEarnings] = useState<any>({})

  useEffect(() => {
    DB.init()
    setInvoices(DB.get('invoices') || [])
    setEarnings(DB.get('earnings') || {})
  }, [])

  const fa = custom ? parseInt(custom) : amount

  const pay = () => {
    if (fa < 100) { alert('Minimum Rs 100'); return }
    if (!name || !email) { alert('Enter name & email'); return }
    setLoading(true)
    setTimeout(() => {
      const all = DB.get('invoices') || []
      all.unshift({ id: 'INV-' + String(all.length + 1).padStart(3, '0'), client: name, project: project || 'Services', amount: fa, status: 'paid', date: new Date().toISOString().split('T')[0] })
      DB.set('invoices', all)
      setInvoices(all)
      const e = DB.get('earnings') || {}
      e.total = (e.total || 0) + fa
      DB.set('earnings', e)
      setEarnings(e)
      setLoading(false)
      setTab('invoices')
    }, 1500)
  }

  const st = (s: string) => s === 'paid' ? 'bg-success/10 text-success' : s === 'pending' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Payments</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Secure <span className="text-primary-300">Payments</span></h1>
            <p className="text-xl text-neutral-300">Powered by Razorpay. UPI, cards, net banking.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-neutral-950">
        <div className="section-container">
          <div className="flex gap-2 mb-8">
            <button onClick={() => setTab('pay')} className={'px-6 py-3 rounded-xl text-sm font-medium transition-all ' + (tab === 'pay' ? 'bg-primary-500 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600')}>Pay Now</button>
            <button onClick={() => setTab('invoices')} className={'px-6 py-3 rounded-xl text-sm font-medium transition-all ' + (tab === 'invoices' ? 'bg-primary-500 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600')}>Invoices</button>
          </div>

          {tab === 'pay' && (
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-6">
                <div className="card-surface p-6">
                  <h2 className="text-xl font-heading font-bold mb-4">Select Amount</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    {amounts.map(a => (
                      <button key={a} onClick={() => { setAmount(a); setCustom('') }}
                        className={'p-4 rounded-xl border-2 text-center transition-all ' + (amount === a && !custom ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300')}>
                        <div className="text-lg font-heading font-bold">Rs {a.toLocaleString('en-IN')}</div>
                      </button>
                    ))}
                  </div>
                  <div><label className="block text-sm font-medium mb-1">Custom Amount</label><input type="number" className="input-field" placeholder="Enter amount" value={custom} onChange={e => { setCustom(e.target.value); setAmount(0) }} /></div>
                </div>
                <div className="card-surface p-6">
                  <h2 className="text-xl font-heading font-bold mb-4">Your Details</h2>
                  <div className="space-y-4">
                    <input className="input-field" placeholder="Your Name *" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" className="input-field" placeholder="Your Email *" value={email} onChange={e => setEmail(e.target.value)} />
                    <input className="input-field" placeholder="Project Name" value={project} onChange={e => setProject(e.target.value)} />
                  </div>
                </div>
                <button onClick={pay} disabled={loading} className="btn-primary w-full text-lg py-4">
                  {loading ? <><Loader size={20} className="animate-spin" /> Processing...</> : <>Pay Rs {fa.toLocaleString('en-IN')} <Lock size={18} /></>}
                </button>
                <p className="text-xs text-neutral-400 text-center flex items-center justify-center gap-1"><Shield size={12} /> Secured by Razorpay</p>
              </div>
              <div className="lg:col-span-2">
                <div className="card-surface p-6 sticky top-28 space-y-4">
                  <h2 className="font-semibold">Summary</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-neutral-400">Amount</span><span>Rs {fa.toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">GST (18%)</span><span>Rs {Math.round(fa * 0.18).toLocaleString('en-IN')}</span></div>
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg"><span>Total</span><span className="gradient-text">Rs {(fa + Math.round(fa * 0.18)).toLocaleString('en-IN')}</span></div>
                  </div>
                  {['Instant confirmation', 'Auto invoice', '100% secure'].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-500"><Check size={12} className="text-success" /> {t}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'invoices' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { l: 'Total', v: 'Rs ' + (earnings.total || 0).toLocaleString('en-IN'), c: 'text-success' },
                  { l: 'Pending', v: 'Rs ' + (earnings.pending || 0).toLocaleString('en-IN'), c: 'text-warning' },
                  { l: 'Paid', v: String(invoices.filter(i => i.status === 'paid').length), c: 'text-primary-500' },
                  { l: 'Open', v: String(invoices.filter(i => i.status !== 'paid').length), c: 'text-accent-500' },
                ].map((s, i) => (
                  <div key={i} className="card-surface p-5 text-center">
                    <div className={'text-2xl font-heading font-bold ' + s.c}>{s.v}</div>
                    <div className="text-xs text-neutral-400 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {invoices.map(inv => (
                  <div key={inv.id} className="card-surface p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2"><span className="font-semibold text-sm">{inv.project}</span><span className={'chip text-[10px] border-0 ' + st(inv.status)}>{inv.status}</span></div>
                        <div className="text-xs text-neutral-400">{inv.client} | {inv.date}</div>
                      </div>
                      <div className="text-right"><div className="text-lg font-heading font-bold">Rs {inv.amount.toLocaleString('en-IN')}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
