'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, X, Loader, MessageCircle, ChevronDown, Zap } from 'lucide-react'

const agentResponses: Record<string, string[]> = {
  general: [
    "I'm Nexify's AI assistant. I can help you with services, pricing, portfolio, or anything about Nexify. What would you like to know?",
    "Great question! Nexify is an AI-native software company — our entire workforce is AI agents. We build custom software, mobile apps, AI solutions, and SaaS products at 60% lower cost than traditional agencies.",
    "Our process is simple: 1) Submit requirements, 2) AI analyzes and generates a proposal within 24h, 3) You approve, 4) AI agents start building, 5) Daily updates until delivery.",
    "We offer 20+ services from web development (₹80K+) to enterprise AI solutions (₹40L+). All delivered by specialized AI agents working 24/7.",
    "Yes, we have 5 SaaS products: FlowSprint (project management), PulseAI (BI), DeskFlow (support), SignFlow (e-signatures), and BotForge (chatbots). Free trials available.",
  ],
  sales: [
    "I've analyzed your requirements. Based on your needs, I'd recommend starting with a Discovery Sprint (₹50,000) to define scope, followed by a phased development approach.",
    "Your project sounds like a great fit for our Growth package. Typical timeline: 8-12 weeks. Estimated investment: ₹6,00,000 - ₹10,00,000.",
    "We're currently at 94% capacity. I can allocate 3 specialized agents to start your project within 5 business days.",
    "I've prepared a preliminary scope document. Would you like me to generate a full proposal with detailed pricing and timeline?",
    "Based on similar projects in your industry, our clients see ROI within 3-6 months of deployment. I can share relevant case studies.",
  ],
  support: [
    "I'm checking the status of your project now. Your current sprint is 78% complete and ahead of schedule by 3 days.",
    "I can help with technical issues. Could you describe the problem? Our support agents typically resolve issues within 4 hours.",
    "Your invoice INV-004 for ₹87,500 is due on July 19th. Would you like me to set up a payment reminder or process a payment?",
    "I've found 3 knowledge base articles related to your question. Let me share the most relevant one with you.",
    "Our ticket system shows 2 open tickets. Your most recent ticket (TCK-002) about API rate limits is being processed.",
  ],
  pricing: [
    "Our services start at ₹60,000 for UI/UX design and go up to ₹50,00,000+ for enterprise custom software. Most custom projects fall in the ₹3-15L range.",
    "Our SaaS products start free: FlowSprint (₹499/user/mo), DeskFlow (₹1,499/agent/mo), SignFlow (₹999/mo), BotForge (₹1,999/mo). Annual billing saves 20%.",
    "Since we have no human employees, our rates are 40-60% lower than traditional agencies. You pay for output, not hours.",
    "All projects are fixed-price. We provide transparent quotes with no hidden costs. Infrastructure costs are discussed upfront.",
    "We offer a 14-day free trial on all SaaS products. No credit card required. AI handles the entire onboarding process.",
  ],
}

function getAgentResponse(input: string): string {
  const lower = input.toLowerCase()
  const responses = agentResponses.general

  if (lower.includes('price') || lower.includes('cost') || lower.includes('₹') || lower.includes('budget') || lower.includes('package')) {
    return agentResponses.pricing[Math.floor(Math.random() * agentResponses.pricing.length)]
  }
  if (lower.includes('support') || lower.includes('ticket') || lower.includes('issue') || lower.includes('bug') || lower.includes('help') || lower.includes('invoice') || lower.includes('payment')) {
    return agentResponses.support[Math.floor(Math.random() * agentResponses.support.length)]
  }
  if (lower.includes('project') || lower.includes('build') || lower.includes('develop') || lower.includes('start') || lower.includes('proposal') || lower.includes('hire')) {
    return agentResponses.sales[Math.floor(Math.random() * agentResponses.sales.length)]
  }
  return responses[Math.floor(Math.random() * responses.length)]
}

export function AIAgentWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: 'ai', text: "👋 Hi! I'm Nexa, your AI assistant. Ask me about services, pricing, projects, or anything about Nexify!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = () => {
    if (!input.trim() || loading) return
    const msg = input.trim()
    setInput('')
    setMessages(p => [...p, { role: 'user', text: msg }])
    setLoading(true)
    setTimeout(() => {
      setMessages(p => [...p, { role: 'ai', text: getAgentResponse(msg) }])
      setLoading(false)
    }, 800 + Math.random() * 1200)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden mb-2 animate-slide-up">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
            <div><h3 className="text-white font-semibold text-sm">Nexa AI</h3><p className="text-white/70 text-xs">Online · Instant replies</p></div>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white"><X size={18} /></button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-neutral-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {m.role === 'ai' && <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 text-[10px] text-white font-bold">N</div>}
                <div className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-primary-500 text-white rounded-tr-sm' : 'bg-white text-neutral-700 border border-neutral-100 rounded-tl-sm'}`}>{m.text}</div>
              </div>
            ))}
            {loading && <div className="flex gap-2"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-[10px] text-white font-bold">N</div><div className="bg-white border rounded-xl p-4"><Loader size={14} className="animate-spin text-primary-500" /></div></div>}
            <div ref={bottomRef} />
          </div>
          <div className="p-3 border-t border-neutral-200">
            <div className="flex gap-2">
              <input className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30" placeholder="Ask anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
              <button onClick={send} disabled={loading || !input.trim()} className="w-9 h-9 rounded-xl bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 disabled:opacity-50 transition-all"><Send size={14} /></button>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1.5 flex items-center gap-1"><Zap size={10} /> AI-powered · Responses are simulated</p>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className={`w-14 h-14 rounded-2xl gradient-bg text-white shadow-xl hover:shadow-2xl transition-all flex items-center justify-center ${open ? 'rotate-45' : ''}`}>
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  )
}
