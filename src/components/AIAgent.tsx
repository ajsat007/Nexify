'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, Send, X, Loader, MessageCircle, Zap } from 'lucide-react'

const responses: string[] = [
  // Services
  "We offer 20+ services: Custom Software (₹3L+), Web Dev (₹80K+), Mobile Apps (₹2.5L+), AI Solutions (₹4L+), UI/UX Design (₹60K+), Cloud & DevOps, AI Chatbots, and more. Which service interests you?",
  "All our services are delivered by specialized AI agents — 10x faster, at 40-60% lower cost than traditional agencies.",

  // Products
  "We have 5 SaaS products: FlowSprint (project mgmt, ₹499/user/mo), PulseAI (BI dashboards, ₹2,499/mo), DeskFlow (customer support, ₹1,499/agent/mo), SignFlow (e-signatures, ₹999/mo), and BotForge (chatbot builder, ₹1,999/mo). All have free trials!",
  "FlowSprint is our project management tool with Kanban, Gantt, AI sprint planning, and time tracking. DeskFlow handles omnichannel customer support with AI auto-replies.",

  // Pricing
  "Our service packages start at ₹60,000 for UI/UX design and go up to ₹50,00,000+ for enterprise custom software. Most projects fall in the ₹3-15L range.",
  "SaaS products start free. FlowSprint ₹499/user/mo, DeskFlow ₹1,499/agent/mo, SignFlow ₹999/mo, BotForge ₹1,999/mo. Annual billing saves 20%.",
  "Since we have no human employees, our rates are 40-60% lower than traditional agencies. Fixed-price, transparent quotes with no hidden costs.",

  // Company
  "Nexify is an AI-native software company. Our workforce is 50+ AI agents — zero humans. We serve clients across 12 countries with 200+ projects delivered.",
  "Founded in 2024, Nexify is headquartered in Pune, Maharashtra, India. We operate fully remote with a global client base.",

  // Process
  "Our process is simple: 1) You submit requirements via our contact form, 2) AI analyzes and generates a proposal within 24h, 3) You approve, 4) AI agents start building, 5) Daily updates until delivery.",
  "We provide weekly progress reports via client portal. All projects include source code, documentation, and 3 months support.",

  // Portfolio
  "We've delivered 200+ projects including FinTech trading dashboards, healthcare telemedicine apps, e-commerce platforms, ERP systems, AI chatbots, and more.",
  "Check our Portfolio page for 20 detailed case studies with problem, solution, technology, timeline, and results.",

  // Contact / Booking
  "You can book a call with us at /book — choose Quick Chat (15min), Consultation (30min), Code Review (45min), or Project Scoping (60min).",
  "Use the Contact page to submit your requirements, or email ajinkyasatkar5@gmail.com directly. We respond within 24 hours.",

  // Payments
  "We accept payments via Razorpay — UPI (GPay, PhonePe, Paytm), credit/debit cards, and net banking. Visit /pay to make a payment.",
  "All payments are processed securely through Razorpay. You get an instant invoice and receipt.",

  // Freelancer Hub
  "The Freelancer Hub at /freelancer includes AI Lead Finder, AI Proposal Generator, and AI Coding Agent — everything automated.",
  "Use the AI Lead Finder to scan LinkedIn and Upwork for matching projects. AI generates proposals in seconds.",

  // General
  "Nexify offers end-to-end software development powered entirely by AI agents — from lead generation to delivery. Everything is automated so you can focus on clients.",
  "You can book a call, get a proposal, make a payment, and track your project — all through the website. AI handles everything in the background.",
]

const offTopicResponses = [
  "I'm Nexify AI, your assistant for everything about Nexify Technologies. I can help with our services, products, pricing, portfolio, or booking a call. What would you like to know?",
  "I specialize in Nexify information only. I can tell you about our AI-powered development services, SaaS products, pricing packages, or help you get started with a project.",
  "That's outside my area! I'm here to answer questions about Nexify — our services, products, pricing, process, portfolio, or how to get started. Ask me anything about that!",
  "I can only answer questions related to Nexify Technologies. Try asking about our web development services, AI solutions, pricing, or how to book a consultation.",
]

const nexifyKeywords = [
  'nexify', 'service', 'web', 'mobile', 'app', 'software', 'develop', 'code', 'program',
  'ai', 'agent', 'chatbot', 'bot', 'ml', 'machine learning',
  'price', 'cost', '₹', 'budget', 'package', 'pricing', 'paid', 'payment', 'pay', 'invoice',
  'product', 'saas', 'flowsprint', 'pulseai', 'deskflow', 'signflow', 'botforge',
  'portfolio', 'project', 'case study', 'client',
  'contact', 'email', 'phone', 'call', 'book', 'meeting',
  'about', 'company', 'found', 'mission', 'vision',
  'process', 'timeline', 'delivery', 'deploy',
  'support', 'ticket', 'help', 'issue', 'bug', 'refund',
  'freelancer', 'lead', 'proposal',
  'admin', 'portal', 'dashboard',
  'technology', 'tech', 'stack', 'react', 'node', 'python', 'database',
]

function isNexifyRelated(input: string): boolean {
  const lower = input.toLowerCase()
  return nexifyKeywords.some(kw => lower.includes(kw))
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()

  if (!isNexifyRelated(input)) {
    return offTopicResponses[Math.floor(Math.random() * offTopicResponses.length)]
  }

  if (lower.includes('price') || lower.includes('cost') || lower.includes('₹') || lower.includes('budget') || lower.includes('package')) {
    const pricing = responses.filter(r => r.includes('₹') || r.includes('price') || r.includes('cost'))
    return pricing[Math.floor(Math.random() * pricing.length)]
  }
  if (lower.includes('product') || lower.includes('saas') || lower.includes('flowsprint') || lower.includes('pulseai') || lower.includes('deskflow') || lower.includes('signflow') || lower.includes('botforge')) {
    const products = responses.filter(r => r.includes('FlowSprint') || r.includes('PulseAI') || r.includes('DeskFlow') || r.includes('product'))
    return products[Math.floor(Math.random() * products.length)]
  }
  if (lower.includes('service') || lower.includes('web') || lower.includes('mobile') || lower.includes('software') || lower.includes('develop') || lower.includes('ai solution') || lower.includes('design')) {
    const services = responses.filter(r => r.includes('service') || r.includes('₹') || r.includes('agent'))
    return services[Math.floor(Math.random() * services.length)]
  }
  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || lower.includes('book') || lower.includes('call') || lower.includes('meeting')) {
    return responses.filter(r => r.includes('book') || r.includes('contact') || r.includes('email'))[0] || responses[0]
  }
  if (lower.includes('process') || lower.includes('timeline') || lower.includes('delivery') || lower.includes('how')) {
    return responses.filter(r => r.includes('process') || r.includes('1)'))[0] || responses[0]
  }
  if (lower.includes('portfolio') || lower.includes('case') || lower.includes('project')) {
    return responses.filter(r => r.includes('200+') || r.includes('Portfolio'))[0] || responses[0]
  }

  return responses[Math.floor(Math.random() * responses.length)]
}

export function AIAgentWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: 'ai', text: "👋 Hi! I'm Nexify AI. I can answer questions about our services, products, pricing, portfolio, and more. What would you like to know?" }
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
      setMessages(p => [...p, { role: 'ai', text: getResponse(msg) }])
      setLoading(false)
    }, 800 + Math.random() * 1200)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden mb-2 animate-slide-up">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
            <div><h3 className="text-white font-semibold text-sm">Nexify AI</h3><p className="text-white/70 text-xs">Online · Nexify only</p></div>
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
              <input className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30" placeholder="Ask about Nexify..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
              <button onClick={send} disabled={loading || !input.trim()} className="w-9 h-9 rounded-xl bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 disabled:opacity-50 transition-all"><Send size={14} /></button>
            </div>
            <p className="text-[10px] text-neutral-800 mt-1.5 flex items-center gap-1"><Zap size={10} /> Nexify AI — answers about Nexify only</p>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className={`w-14 h-14 rounded-2xl gradient-bg text-white shadow-xl hover:shadow-2xl transition-all flex items-center justify-center ${open ? 'rotate-45' : ''}`}>
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  )
}
