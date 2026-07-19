'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, ArrowUpRight, Wand2, Loader, Sparkles, Copy, Check, FileText, Cpu } from 'lucide-react'
import { PageLayout, PageHeader } from '@/components/PageLayout'
import { AnimatedSection } from '@/components/ScrollAnimations'

const posts = [
  { title: 'How AI Agents Are Revolutionizing Software Development', excerpt: 'The traditional agency model is broken. Here\'s how AI-native development is changing everything — from speed to quality to cost.', category: 'AI', date: '2026-06-28', readTime: '5 min' },
  { title: 'Building a SaaS Product in 2026: The AI-First Approach', excerpt: 'How to build, launch, and scale a SaaS product using AI agents — from idea validation to deployment in weeks, not months.', category: 'SaaS', date: '2026-06-21', readTime: '7 min' },
  { title: 'The Complete Guide to AI-Powered Software Development', excerpt: 'Everything from planning to deployment to maintenance — how AI agents are transforming every phase of the SDLC.', category: 'AI', date: '2026-05-31', readTime: '12 min' },
  { title: 'Why Your SaaS Product Needs an AI Co-Pilot', excerpt: 'How integrating AI into your SaaS product can increase retention, reduce churn, and create defensible moats.', category: 'SaaS', date: '2026-05-24', readTime: '7 min' },
  { title: 'The Real Cost of Custom Software Development in India (2026)', excerpt: 'A transparent breakdown of what custom software actually costs and how AI-native development changes the equation.', category: 'Business', date: '2026-05-17', readTime: '8 min' },
  { title: 'How to Validate Your SaaS Idea Before Writing Code', excerpt: 'A systematic approach to validating your SaaS idea using AI tools, market research, and rapid prototyping.', category: 'SaaS', date: '2026-05-10', readTime: '6 min' },
  { title: 'AI Agents vs Traditional Development Teams: A Cost Analysis', excerpt: 'We crunched the numbers. Here\'s how AI agent development compares to traditional teams on cost, speed, and quality.', category: 'AI', date: '2026-05-03', readTime: '8 min' },
  { title: 'The Future of Software Development is AI-Native', excerpt: 'Why the next generation of software companies will be built entirely by AI agents — and what that means for your business.', category: 'AI', date: '2026-04-26', readTime: '6 min' },
  { title: 'How to Build a SaaS MVP in 2 Weeks with AI Agents', excerpt: 'A step-by-step guide to going from idea to working prototype in 14 days using AI-powered development.', category: 'SaaS', date: '2026-04-19', readTime: '6 min' },
]

const blogTemplates = {
  AI: {
    titles: ['How AI Agents Are Changing Software Development Forever', 'The Rise of AI-Native Companies: A New Era', 'Why Your Business Needs AI Agents in 2026', 'AI vs Traditional Development: The Numbers Don\'t Lie'],
    content: 'The landscape of software development is undergoing its most significant transformation since the advent of cloud computing. AI agents are not just tools — they are autonomous workers that plan, write, test, and deploy code without human intervention. This shift represents a fundamental change in how software companies operate, with implications for cost, speed, quality, and scalability.\n\nAt Nexify, we\'ve deployed 50+ AI agents that work 24/7 across development, design, QA, DevOps, and sales. The results speak for themselves: 10x faster delivery, 60% lower costs, and 99.99% uptime. Traditional agencies simply cannot compete with this level of efficiency.\n\nThe key insight is that AI agents don\'t replace human creativity — they amplify it. By handling the repetitive, time-consuming aspects of software development, AI agents free up human teams to focus on strategy, innovation, and client relationships.\n\nLooking ahead, we predict that within 5 years, the majority of software companies will operate with AI-first workforces. The ones that adapt early will dominate their markets.',
  },
  SaaS: {
    titles: ['Building a SaaS Product in 2026: The AI-First Playbook', 'From Idea to Launch: Building SaaS with AI Agents', 'Why Every SaaS Product Needs an AI Co-Pilot', 'The Complete Guide to SaaS Development in the AI Era'],
    content: 'Building a successful SaaS product in 2026 requires a fundamentally different approach than even two years ago. The combination of AI-powered development tools, autonomous testing agents, and intelligent deployment pipelines means that startups can go from idea to revenue in weeks, not months.\n\nThe first step is validation. Before writing any code, use AI market analysis tools to identify gaps, analyze competitors, and validate pricing. At Nexify, our AI agents can analyze 500+ competitor products and generate a comprehensive market analysis in under an hour.\n\nOnce validated, the build phase is where AI truly shines. Our development agents work in parallel — frontend, backend, database, and infrastructure all built simultaneously. What takes a human team 3 months takes our AI agents 3 weeks.\n\nKey to success: integrate AI features directly into your SaaS product. AI co-pilots, intelligent recommendations, and automated workflows are no longer differentiators — they\'re table stakes.',
  },
  Business: {
    titles: ['The Real Cost of Software Development in 2026', 'How AI-Native Companies Are Disrupting the Agency Model', 'Zero-Cost Operations: The Future of Software Companies', 'Why Traditional Software Agencies Are Becoming Obsolete'],
    content: 'The economics of software development have fundamentally changed. Traditional agencies operate on a 15-25% profit margin, with 70% of revenue going to salaries, benefits, and overhead. AI-native companies like Nexify operate at 94%+ margins, with zero labor costs.\n\nThis isn\'t just about cutting costs — it\'s about reimagining the entire cost structure of a software company. No office lease, no payroll taxes, no health insurance, no recruitment fees, no severance packages. Just pure output, measured by results.\n\nFor clients, this means enterprise-quality software at startup prices. A project that would cost 15,00,000 with a traditional agency costs 6,00,000 with Nexify — and gets delivered twice as fast.\n\nThe implications for the industry are profound. Agencies that don\'t adopt AI will be priced out of the market within 3-5 years. The ones that embrace AI-first operations will dominate.',
  },
}

const categories = ['All', 'AI', 'SaaS', 'Business']

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [showGenerator, setShowGenerator] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('AI')
  const [generating, setGenerating] = useState(false)
  const [generatedPost, setGeneratedPost] = useState<{ title: string; content: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const generatePost = () => {
    setGenerating(true)
    setGeneratedPost(null)
    setTimeout(() => {
      const template = blogTemplates[selectedTopic as keyof typeof blogTemplates]
      const title = template.titles[Math.floor(Math.random() * template.titles.length)]
      setGeneratedPost({ title, content: template.content })
      setGenerating(false)
    }, 2000)
  }

  const copyPost = () => {
    if (!generatedPost) return
    navigator.clipboard.writeText(`# ${generatedPost.title}\n\n${generatedPost.content}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)

  return (
    <PageLayout>
      <PageHeader badge="Blog" title="Insights from the AI Frontier" subtitle="Thought leadership on AI-native development, SaaS, and the future of software." />

      <section className="section-padding bg-white dark:bg-neutral-950">
        <div className="section-container">
          {/* Controls row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex overflow-x-auto gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-none">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`chip whitespace-nowrap shrink-0 transition-all ${activeCategory === cat ? 'bg-primary-500 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}>{cat}</button>
              ))}
            </div>
            <button onClick={() => setShowGenerator(!showGenerator)}
              className={`chip transition-all shrink-0 self-start sm:self-auto ${showGenerator ? 'bg-accent-500 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}>
              <Wand2 size={14} /> {showGenerator ? 'Close Generator' : 'AI Blog Generator'}
            </button>
          </div>

          {/* AI Generator Panel */}
          {showGenerator && (
            <div className="mb-10 sm:mb-12 bg-gradient-to-r from-accent-500/5 to-primary-500/5 rounded-2xl border border-accent-500/20 p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0"><Sparkles className="w-5 h-5 text-white" /></div>
                <div className="min-w-0"><h3 className="font-semibold text-sm">AI Blog Post Generator</h3><p className="text-xs text-neutral-600 dark:text-neutral-300">Powered by Nexify AI agents — generates in seconds</p></div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.keys(blogTemplates).map(topic => (
                  <button key={topic} onClick={() => setSelectedTopic(topic)}
                    className={`chip text-xs transition-all ${selectedTopic === topic ? 'bg-primary-500 text-white' : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'}`}>{topic}</button>
                ))}
              </div>
              <button onClick={generatePost} disabled={generating} className="btn-primary text-sm">
                {generating ? <><Loader size={16} className="animate-spin" /> Generating...</> : <><Wand2 size={16} /> Generate Blog Post</>}
              </button>

              {generatedPost && (
                <div className="mt-5 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5 animate-slide-up">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-base sm:text-lg font-heading font-bold flex-1 leading-snug dark:text-white">{generatedPost.title}</h3>
                    <button onClick={copyPost} className="shrink-0 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 transition-all text-xs flex items-center gap-1">
                      {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}</button>
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-line leading-relaxed">
                    {generatedPost.content}
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700 text-xs text-neutral-500">
                    <Cpu size={12} className="text-primary-500" /> Generated by Nexify AI Agent · {new Date().toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results count */}
          <p className="text-xs sm:text-sm text-neutral-500 mb-4">{filtered.length} post{filtered.length !== 1 ? 's' : ''}</p>

          {/* Blog Posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {filtered.map((post, i) => (
              <AnimatedSection key={i} animation="fade-up" delay={i * 50}>
                <article className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl hover:border-primary-500/20 transition-all duration-300 group h-full flex flex-col">
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="chip bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs">{post.category}</span>
                      <span className="text-xs text-neutral-500 flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-heading font-bold mb-2 dark:text-white group-hover:text-primary-600 transition-colors leading-snug">{post.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                      <span className="flex items-center gap-1"><ArrowUpRight size={12} /> By Nexify AI</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-neutral-500">No posts in this category.</div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 sm:mb-4">Stay Ahead of the Curve</h2>
          <p className="text-primary-200 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">Subscribe to our newsletter. AI-written insights delivered to your inbox.</p>
          <form className="max-w-md mx-auto flex flex-col xs:flex-row gap-2" onSubmit={e => { e.preventDefault(); alert('Subscribed! (Demo)') }}>
            <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm" />
            <button className="btn-white shrink-0 text-sm">Subscribe</button>
          </form>
        </div>
      </section>
    </PageLayout>
  )
}
