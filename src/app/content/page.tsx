'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  FileText, Linkedin, Twitter, Copy, Check, Loader,
  Wand2, ArrowRight, Download, Calendar, Clock,
  Sparkles, Share2, TrendingUp, Users, MessageSquare,
  Heart, BarChart3, Zap, Globe, ExternalLink, ChevronRight,
  RefreshCw, Image, Hash, AtSign, Activity, Star, Quote
} from 'lucide-react'

const DB = {
  get: (k: string) => { if (typeof window === 'undefined') return null; const d = localStorage.getItem(`nexify_content_${k}`); return d ? JSON.parse(d) : null },
  set: (k: string, v: any) => { if (typeof window === 'undefined') return; localStorage.setItem(`nexify_content_${k}`, JSON.stringify(v)) },
  init() {
    if (this.get('init')) return
    this.set('posts', [
      { id: 'PST-001', platform: 'LinkedIn', content: 'Built a complete fintech dashboard in 6 days using AI agents. My clients get 10x faster delivery at half the cost. Here is how I do it 👇', type: 'case-study', date: '2026-07-12', time: '8:00 AM', engagement: { likes: 45, comments: 8, shares: 12 }, autoPosted: true },
      { id: 'PST-002', platform: 'Twitter', content: 'The future of freelancing: AI does the coding, you do the client management. I shipped 3 projects this month without writing a single line manually. 🤖💻', type: 'insight', date: '2026-07-11', time: '10:30 AM', engagement: { likes: 32, comments: 5, shares: 8 }, autoPosted: true },
      { id: 'PST-003', platform: 'LinkedIn', content: 'Just delivered a telemedicine app in 2 weeks. Key lessons: 1) AI agents handle 80% of boilerplate 2) Focus on architecture and UX 3) Test early, test often. Client very happy! 🚀', type: 'update', date: '2026-07-10', time: '9:15 AM', engagement: { likes: 67, comments: 12, shares: 9 }, autoPosted: true },
      { id: 'PST-004', platform: 'Twitter', content: 'Hot take: Most agencies charge 5L+ for what I do with AI in 3 days. The gap between AI-assisted freelancers and traditional agencies is growing every week.', type: 'hot-take', date: '2026-07-09', time: '2:00 PM', engagement: { likes: 89, comments: 15, shares: 22 }, autoPosted: true },
      { id: 'PST-005', platform: 'LinkedIn', content: 'My AI-powered workflow: 1) Client shares requirements 2) AI analyzes and scopes 3) AI agents build in parallel 4) I review and polish 5) Deploy. Result: 2-week projects, zero burnout.', type: 'process', date: '2026-07-08', time: '11:00 AM', engagement: { likes: 78, comments: 14, shares: 18 }, autoPosted: true },
    ])
    this.set('analytics', { totalPosts: 32, totalEngagement: 1482, followers: { linkedin: 450, twitter: 320 }, weeklyGrowth: 12, topPost: 'Hot take about agencies (89 likes)' })
    this.set('init', true)
  }
}

const templates = {
  'case-study': [
    "Built a {project} for {industry} client using AI agents. Delivered in {days} days instead of the estimated {est} weeks. Key results:\n\n✅ {result1}\n✅ {result2}\n✅ {result3}\n\nThe secret? AI agents work 24/7 while I focus on architecture and client communication.",
    "How I built a {project} for {industry} startup in {days} days:\n\nStack: {tech}\nTimeline: {days} days (agency quote: {est} weeks)\nCost: {cost}% less than traditional\n\nMy AI workflow handles the heavy lifting. I focus on design and strategy.",
  ],
  insight: [
    "The {industry} space is changing faster than most freelancers realize. AI agents can now:\n\n• Write production-ready code\n• Design beautiful UIs\n• Write and run tests\n• Deploy to production\n\nAdapt or get left behind. I chose to adapt. 🚀",
    "Here is what nobody tells you about AI-powered freelancing:\n\nYou do not replace yourself. You 10x yourself.\n\nOne freelancer + AI agents = output of a 5-person agency.\n\nThat is the game changer.",
  ],
  'hot-take': [
    "Unpopular opinion: Traditional agencies are charging {cost}x more for the same output I deliver with AI.\n\nClients are starting to notice. The smart ones are already working with AI-powered freelancers.\n\nThe agency model is dying. Long live the AI freelancer. 🤖",
    "If your freelance rates haven't gone up despite using AI, you are doing it wrong.\n\nAI lets me deliver {x}x faster. I charge {price} for what takes me {days} days.\n\nClient gets a bargain. I make more per hour. Win-win.",
  ],
  process: [
    "My complete AI-powered workflow:\n\n1️⃣ Client shares requirements\n2️⃣ AI analyzes, scopes, estimates\n3️⃣ 3-5 AI agents build in parallel\n4️⃣ I review architecture and code\n5️⃣ Automated testing runs\n6️⃣ Deploy with zero downtime\n\nResult: {days}-day delivery. Happy clients. No burnout.",
    "Behind the scenes of my AI freelancing setup:\n\n• AI lead finder → finds matching projects\n• AI proposal gen → writes personalized pitches\n• AI code agents → build the actual product\n• AI QA agent → tests everything\n• I handle → client communication + strategy",
  ],
  update: [
    "Ship update! 🚀\n\nJust delivered {project} for {client}.\n\nBuilt with: {tech}\nTimeline: {days} days\nClient satisfaction: {score}/5\n\nAnother happy client powered by AI development.",
    "Project complete! ✅\n\n{project} for {client} is now live.\n\nWhat the client said: \"{quote}\"\n\nThis is why I love AI-powered freelancing.",
  ],
}

const platforms = ['LinkedIn', 'Twitter/X']
const types = ['case-study', 'insight', 'hot-take', 'process', 'update']

function generateContent(template: string): string {
  const vars: Record<string, string> = {
    '{project}': ['FinTech dashboard', 'E-commerce platform', 'Healthcare portal', 'Real estate CRM', 'AI chatbot', 'Analytics dashboard', 'Learning management system', 'Fleet tracking app'][Math.floor(Math.random() * 8)],
    '{industry}': ['FinTech', 'HealthTech', 'E-commerce', 'EdTech', 'Logistics', 'Real Estate', 'SaaS', 'Enterprise'][Math.floor(Math.random() * 8)],
    '{days}': String(Math.floor(Math.random() * 14) + 5),
    '{est}': String(Math.floor(Math.random() * 8) + 4),
    '{result1}': ['40% faster performance', '99.9% uptime', '50% cost reduction', '3x user engagement', 'Zero production bugs'][Math.floor(Math.random() * 5)],
    '{result2}': ['Mobile-first responsive design', 'Real-time data sync', 'Automated CI/CD pipeline', '90%+ test coverage', 'Multi-language support'][Math.floor(Math.random() * 5)],
    '{result3}': ['Client satisfaction 4.9/5', 'Delivered 2 weeks early', '20% under budget', 'Scaled to 10K users', 'Integrated with 5 APIs'][Math.floor(Math.random() * 5)],
    '{tech}': ['Next.js + Node.js + PostgreSQL + AI', 'React + Python + AWS + LangChain', 'React Native + Firebase + Stripe', 'Next.js + Prisma + Vercel + AI'][Math.floor(Math.random() * 4)],
    '{cost}': String(Math.floor(Math.random() * 40) + 40),
    '{x}': String(Math.floor(Math.random() * 5) + 3),
    '{price}': ['30K', '45K', '60K', '80K', '1.2L'][Math.floor(Math.random() * 5)],
    '{client}': ['a FinTech startup', 'an e-commerce brand', 'a healthcare provider', 'a real estate firm', 'an edtech company', 'a logistics company'][Math.floor(Math.random() * 6)],
    '{score}': String(Math.floor(Math.random() * 5 + 45) / 10),
    '{quote}': ['This is the fastest I have ever seen a project delivered', 'The quality exceeded our expectations', 'I cannot believe this was built so quickly', 'We are already seeing ROI', 'Best freelancer I have ever worked with'][Math.floor(Math.random() * 5)],
  }
  let result = template
  Object.entries(vars).forEach(([k, v]) => { result = result.replace(k, v) })
  // Replace any remaining placeholders
  result = result.replace(/\{[a-z]+\}/g, 'fast')
  return result
}

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [posts, setPosts] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any>({})
  const [selectedPlatform, setSelectedPlatform] = useState('LinkedIn')
  const [selectedType, setSelectedType] = useState('case-study')
  const [generating, setGenerating] = useState(false)
  const [generatedPost, setGeneratedPost] = useState('')
  const [copied, setCopied] = useState(false)
  const [scheduleTime, setScheduleTime] = useState('08:00')
  const [scheduling, setScheduling] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    DB.init()
    setPosts(DB.get('posts') || [])
    setAnalytics(DB.get('analytics') || {})
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const generate = () => {
    setGenerating(true)
    setGeneratedPost('')
    setTimeout(() => {
      const typeTemplates = templates[selectedType as keyof typeof templates]
      const template = typeTemplates[Math.floor(Math.random() * typeTemplates.length)]
      const content = generateContent(template)
      setGeneratedPost(content)
      setGenerating(false)
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }, 1500)
  }

  const savePost = () => {
    if (!generatedPost) return
    const allPosts = DB.get('posts') || []
    const newPost = {
      id: `PST-${String(allPosts.length + 1).padStart(3, '0')}`,
      platform: selectedPlatform,
      content: generatedPost,
      type: selectedType,
      date: new Date().toISOString().split('T')[0],
      time: 'Scheduled',
      engagement: { likes: 0, comments: 0, shares: 0 },
      autoPosted: false,
    }
    allPosts.unshift(newPost)
    DB.set('posts', allPosts)
    setPosts(allPosts)
    setGeneratedPost('')
  }

  const schedulePost = () => {
    if (!generatedPost) return
    setScheduling(true)
    setTimeout(() => {
      savePost()
      setScheduling(false)
    }, 1000)
  }

  const copyPost = () => {
    navigator.clipboard.writeText(generatedPost)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const autoGenerateSequence = () => {
    setGenerating(true)
    let count = 0
    const interval = setInterval(() => {
      if (count >= 5) { clearInterval(interval); setGenerating(false); return }
      const plat = platforms[Math.floor(Math.random() * platforms.length)]
      const typ = types[Math.floor(Math.random() * types.length)]
      const typeTemplates = templates[typ as keyof typeof templates]
      const template = typeTemplates[Math.floor(Math.random() * typeTemplates.length)]
      const content = generateContent(template)
      const allPosts = DB.get('posts') || []
      allPosts.unshift({
        id: `PST-${String(allPosts.length + 1).padStart(3, '0')}`,
        platform: plat, content, type: typ,
        date: new Date(Date.now() + count * 86400000).toISOString().split('T')[0],
        time: `${String(8 + Math.floor(Math.random() * 10)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        engagement: { likes: Math.floor(Math.random() * 80 + 10), comments: Math.floor(Math.random() * 15 + 2), shares: Math.floor(Math.random() * 20 + 3) },
        autoPosted: true,
      })
      DB.set('posts', allPosts)
      setPosts(DB.get('posts') || [])
      count++
    }, 800)
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Auto Content Engine</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">AI Generates <span className="text-primary-300">Your Content</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">AI creates LinkedIn posts, tweets, and case studies. Auto-schedules them. Builds your audience while you sleep.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-neutral-950">
        <div className="section-container">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12 reveal">
            {[
              { icon: FileText, label: 'AI Posts Generated', value: String(analytics.totalPosts || 0), c: 'from-primary-500 to-accent-500' },
              { icon: Heart, label: 'Total Engagement', value: String(analytics.totalEngagement || 0), c: 'from-rose-500 to-pink-500' },
              { icon: TrendingUp, label: 'Weekly Growth', value: `${analytics.weeklyGrowth || 0}%`, c: 'from-emerald-500 to-teal-500' },
              { icon: Users, label: 'LinkedIn Followers', value: String(analytics.followers?.linkedin || 0), c: 'from-blue-500 to-indigo-500' },
              { icon: Globe, label: 'Twitter Followers', value: String(analytics.followers?.twitter || 0), c: 'from-cyan-500 to-sky-500' },
            ].map((s, i) => (
              <div key={i} className="text-center p-6 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                <div className={`text-3xl font-heading font-bold bg-gradient-to-r ${s.c} bg-clip-text text-transparent`}>{s.value}</div>
                <div className="text-sm text-neutral-800 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Content Generator */}
          <div className="card-surface p-8 mb-12 reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center"><Sparkles className="w-6 h-6 text-white" /></div>
              <div><h2 className="text-2xl font-heading font-bold">AI Content Generator</h2><p className="text-sm text-neutral-800">Generates LinkedIn/Twitter posts optimized for engagement</p></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Platform</label>
                <select className="input-field" value={selectedPlatform} onChange={e => setSelectedPlatform(e.target.value)}>
                  <option value="LinkedIn">LinkedIn</option><option value="Twitter/X">Twitter/X</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Content Type</label>
                <select className="input-field" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                  <option value="case-study">Case Study</option><option value="insight">Industry Insight</option>
                  <option value="hot-take">Hot Take</option><option value="process">Process/Workflow</option>
                  <option value="update">Project Update</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">Schedule Time</label>
                <input type="time" className="input-field" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} />
              </div>
              <div className="flex items-end gap-2">
                <button onClick={generate} disabled={generating} className="btn-primary text-sm flex-1">
                  {generating ? <><Loader size={14} className="animate-spin" /> Generating...</> : <><Wand2 size={14} /> Generate</>}
                </button>
                <button onClick={autoGenerateSequence} disabled={generating} className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center hover:bg-accent-100 dark:hover:bg-accent-500/20 transition-all" title="Auto-generate 5 posts">
                  <Zap size={16} />
                </button>
              </div>
            </div>

            {generatedPost && (
              <div className="animate-slide-up space-y-4" ref={bottomRef as any}>
                <div className={`p-6 rounded-xl border ${selectedPlatform === 'LinkedIn' ? 'bg-blue-50 dark:bg-blue-500/5 border-blue-200 dark:border-blue-500/20' : 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    {selectedPlatform === 'LinkedIn' ? <Linkedin className="w-5 h-5 text-blue-600" /> : <Twitter className="w-5 h-5 text-sky-500" />}
                    <span className="text-xs font-medium text-neutral-800 uppercase">{selectedPlatform} · {selectedType.replace('-', ' ')}</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-200 whitespace-pre-line leading-relaxed">{generatedPost}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={savePost} className="btn-primary text-sm"><Calendar size={14} /> Save</button>
                  <button onClick={schedulePost} disabled={scheduling} className="btn-secondary text-sm">
                    {scheduling ? <Loader size={14} className="animate-spin" /> : <Clock size={14} />}
                    Schedule for {scheduleTime}
                  </button>
                  <button onClick={copyPost} className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-800 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all">
                    {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 text-xs text-neutral-800 flex items-center gap-2">
              <Zap size={12} className="text-primary-500" /> AI generates content optimized for your niche. Customize before posting.
            </div>
          </div>

          {/* Top Post */}
          {analytics.topPost && (
            <div className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/20 p-6 mb-12 reveal">
              <div className="flex items-center gap-2 mb-2"><Star className="w-4 h-4 text-amber-500" fill="currentColor" /><span className="text-sm font-semibold">Top Performing Post</span></div>
              <p className="text-sm text-neutral-800">{analytics.topPost}</p>
            </div>
          )}

          {/* Posts Feed */}
          <div className="space-y-4 reveal">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-bold">Content Feed</h2>
              <span className="text-xs text-neutral-800">{posts.length} posts generated</span>
            </div>
            {posts.map((post, i) => (
              <div key={post.id} className="card-surface p-5 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${post.platform === 'LinkedIn' ? 'bg-blue-100 dark:bg-blue-500/10' : 'bg-neutral-100 dark:bg-neutral-700'}`}>
                    {post.platform === 'LinkedIn' ? <Linkedin className="w-4 h-4 text-blue-600" /> : <Twitter className="w-4 h-4 text-sky-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-700 dark:text-neutral-200 whitespace-pre-line line-clamp-3">{post.content}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-neutral-800">
                      <span>{post.date} · {post.time}</span>
                      {post.autoPosted && <span className="chip bg-success/10 text-success text-[10px]">Auto-posted</span>}
                      <span className="flex items-center gap-1"><Heart size={12} /> {post.engagement.likes}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.engagement.comments}</span>
                      <span className="flex items-center gap-1"><Share2 size={12} /> {post.engagement.shares}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl border border-primary-500/20 p-8 text-center reveal">
            <h2 className="text-2xl font-heading font-bold mb-2">Your AI Content Calendar is Running</h2>
            <p className="text-neutral-800 mb-6 max-w-md mx-auto">AI generates posts, schedules them, and tracks engagement. Build your audience without lifting a finger.</p>
            <div className="flex justify-center gap-4">
              <button onClick={autoGenerateSequence} className="btn-primary"><Zap size={16} /> Auto-Generate Week</button>
              <Link href="/freelancer" className="btn-secondary">Freelancer Hub <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
