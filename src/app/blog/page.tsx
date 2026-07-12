'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, ArrowUpRight, Tag } from 'lucide-react'

const posts = [
  { title: 'How AI Agents Are Revolutionizing Software Development', excerpt: 'The traditional agency model is broken. Here\'s how AI-native development is changing everything — from speed to quality to cost.', category: 'AI', date: '2026-06-28', readTime: '5 min', tags: ['AI Agents', 'Software Development'] },
  { title: 'Building a SaaS Product in 2026: The AI-First Approach', excerpt: 'How to build, launch, and scale a SaaS product using AI agents — from idea validation to deployment in weeks, not months.', category: 'SaaS', date: '2026-06-21', readTime: '7 min', tags: ['SaaS', 'Product Development'] },
  { title: 'The Complete Guide to AI-Powered Software Development', excerpt: 'Everything from planning to deployment to maintenance — how AI agents are transforming every phase of the SDLC.', category: 'AI', date: '2026-05-31', readTime: '12 min', tags: ['AI', 'Development'] },
  { title: 'Why Your SaaS Product Needs an AI Co-Pilot', excerpt: 'How integrating AI into your SaaS product can increase retention, reduce churn, and create defensible moats.', category: 'SaaS', date: '2026-05-24', readTime: '7 min', tags: ['SaaS', 'AI'] },
  { title: 'The Real Cost of Custom Software Development in India (2026)', excerpt: 'A transparent breakdown of what custom software actually costs and how AI-native development changes the equation.', category: 'Business', date: '2026-05-17', readTime: '8 min', tags: ['Pricing', 'India'] },
  { title: 'How to Validate Your SaaS Idea Before Writing Code', excerpt: 'A systematic approach to validating your SaaS idea using AI tools, market research, and rapid prototyping.', category: 'SaaS', date: '2026-05-10', readTime: '6 min', tags: ['SaaS', 'Validation'] },
  { title: 'AI Agents vs Traditional Development Teams: A Cost Analysis', excerpt: 'We crunched the numbers. Here\'s how AI agent development compares to traditional teams on cost, speed, and quality.', category: 'AI', date: '2026-05-03', readTime: '8 min', tags: ['AI', 'Cost Analysis'] },
  { title: 'The Future of Software Development is AI-Native', excerpt: 'Why the next generation of software companies will be built entirely by AI agents — and what that means for your business.', category: 'AI', date: '2026-04-26', readTime: '6 min', tags: ['AI', 'Future'] },
  { title: 'How to Build a SaaS MVP in 2 Weeks with AI Agents', excerpt: 'A step-by-step guide to going from idea to working prototype in 14 days using AI-powered development.', category: 'SaaS', date: '2026-04-19', readTime: '6 min', tags: ['SaaS', 'MVP'] },
]

const categories = ['All', 'AI', 'SaaS', 'Business', 'Engineering']

export default function BlogPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Blog</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
              Insights from{' '}
              <span className="text-primary-300">the AI Frontier</span>
            </h1>
            <p className="text-xl text-neutral-300">Thought leadership on AI-native development, SaaS, and the future of software.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="flex flex-wrap gap-2 mb-12 reveal">
            {categories.map((cat, i) => (
              <button key={i} className={`chip ${i === 0 ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'} transition-all`}>{cat}</button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
            {posts.map((post, i) => (
              <article key={i} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:border-primary-500/20 transition-all duration-300 group">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="chip bg-primary-50 text-primary-600 text-xs">{post.category}</span>
                    <span className="text-xs text-neutral-400 flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-primary-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-neutral-400 pt-4 border-t border-neutral-100">
                    <span className="flex items-center gap-1"><ArrowUpRight size={12} /> By Nexify AI</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-bg">
        <div className="section-container text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Stay Ahead of the Curve</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">Subscribe to our newsletter. AI-written insights delivered to your inbox.</p>
          <form className="max-w-md mx-auto flex gap-2">
            <input type="email" placeholder="your@email.com" className="input-field flex-1" />
            <button className="btn-white shrink-0">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  )
}
