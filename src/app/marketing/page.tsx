'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Check, ExternalLink, Download, FileText, Star,
  Target, TrendingUp, Users, BarChart3, Zap, Globe,
  Linkedin, Twitter, Youtube, Instagram, Facebook, MessageSquare,
  Mail, Phone, Play, BookOpen, Award, Megaphone, Search,
  ChevronDown, ChevronUp, Calendar, Clock, Share2, Pen,
  Sparkles, Layers, Settings, PieChart, Activity, Copy
} from 'lucide-react'

export default function MarketingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const strategies = [
    { icon: Search, title: 'SEO Strategy', desc: 'Target 200+ keywords across software development, AI, and SaaS categories. Technical SEO with AI-optimized content generation.', kpis: ['200+ keywords ranked', '50k monthly organic visits', 'PageSpeed ≥ 95'] },
    { icon: Linkedin, title: 'LinkedIn Strategy', desc: 'Daily AI-generated thought leadership posts. Connect with CTOs, founders, and engineering leaders. Automated engagement.', kpis: ['10k+ followers (Q3)', '500+ connections/mo', '15% engagement rate'] },
    { icon: Twitter, title: 'Twitter/X Strategy', desc: 'Developer-focused content. Open-source contributions, AI development tips, and company culture posts. Viral hooks.', kpis: ['5k followers', '1M+ monthly impressions', '500+ reposts/mo'] },
    { icon: Youtube, title: 'YouTube Strategy', desc: 'AI-generated tech tutorials, product demos, and case studies. Automated scripting, voiceover, and publishing.', kpis: ['50 videos (Q3)', '100k total views', '5k subscribers'] },
    { icon: Instagram, title: 'Instagram Strategy', desc: 'Visual portfolio highlights, behind-the-scenes AI development, team culture shots. Reels for reach.', kpis: ['10k followers', '50 Reels', '5% engagement'] },
    { icon: Facebook, title: 'Facebook Strategy', desc: 'Community building in tech groups. Targeted ads for Indian SME owners. Case study promotions.', kpis: ['5k page likes', '3 groups active', '2% CTR on ads'] },
    { icon: Mail, title: 'Email Marketing', desc: 'AI-crafted newsletters with project showcases, tech insights, and personalized lead nurturing sequences.', kpis: ['25k subscribers', '45% open rate', '12% click rate'] },
    { icon: Phone, title: 'Cold Outreach', desc: 'AI-powered cold email + LinkedIn sequences. Personalized at scale. Automated follow-ups based on engagement signals.', kpis: ['1k emails/week', '8% reply rate', '15 meetings booked/mo'] },
  ]

  const contentCalendar = [
    { week: 'Week 1', topic: 'AI-Native Development: The Future of Software', channel: 'Blog + LinkedIn', type: 'Thought Leadership' },
    { week: 'Week 2', topic: 'Case Study: FinTech Trading Dashboard', channel: 'YouTube + Blog', type: 'Portfolio' },
    { week: 'Week 3', topic: 'How to Choose a Tech Stack for Your Startup', channel: 'LinkedIn + Twitter/X', type: 'Educational' },
    { week: 'Week 4', topic: 'Product Launch: FlowSprint Updates', channel: 'All Channels', type: 'Product' },
    { week: 'Week 5', topic: 'The Real Cost of Software Development in India', channel: 'Blog + LinkedIn', type: 'Industry Insight' },
    { week: 'Week 6', topic: 'Client Testimonial: HealthFirst Telemedicine', channel: 'YouTube + Instagram', type: 'Social Proof' },
    { week: 'Week 7', topic: 'AI Agents vs Human Developers: Cost Analysis', channel: 'Blog + Twitter/X', type: 'Comparative' },
    { week: 'Week 8', topic: 'Nexify Culture: The AI-First Workplace', channel: 'Instagram + LinkedIn', type: 'Culture' },
  ]

  const adCampaigns = [
    { platform: 'Google Ads', budget: '₹0 (AI-optimized)', targeting: 'CTOs, Founders, IT Heads', keywords: 'software development India, AI development company, custom software India', format: 'Search + Display' },
    { platform: 'LinkedIn Ads', budget: '₹0 (organic first)', targeting: 'Engineering Leaders, Startup Founders', audience: 'India, USA, UAE, Singapore', format: 'Sponsored Content + InMail' },
    { platform: 'Meta Ads', budget: '₹0 (organic)', targeting: 'Business Owners, SME Decision Makers', audience: 'India metro cities, 25-55 age', format: 'Feed + Stories + Reels' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl reveal">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Step 8</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">AI-Powered <span className="text-primary-300">Marketing Engine</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">Zero-cost marketing strategy executed by AI agents across 8 channels. Automated content generation, scheduling, and optimization.</p>
          </div>
        </div>
      </section>

      {/* Strategy Grid */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">Multi-Channel <span className="gradient-text">Strategy</span></h2>
            <p className="text-neutral-800">8 channels managed by specialized AI marketing agents · Zero ad spend</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 reveal">
            {strategies.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0"><Icon className="w-6 h-6 text-primary-500" /></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                      <p className="text-neutral-800 text-sm mb-3">{s.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {s.kpis.map((k, j) => <span key={j} className="chip bg-primary-50 text-primary-600 text-xs">{k}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content Calendar */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">Content <span className="gradient-text">Calendar</span></h2>
            <p className="text-neutral-800">AI-generated content pipeline · 8 weeks planned</p>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden reveal">
            <table className="w-full">
              <thead><tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Week</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Topic</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Channel</th>
                <th className="text-left p-4 text-xs font-semibold text-neutral-800 uppercase">Type</th>
              </tr></thead>
              <tbody className="divide-y divide-neutral-100">
                {contentCalendar.map((c, i) => (
                  <tr key={i} className="hover:bg-neutral-50"><td className="p-4 text-sm text-neutral-800">{c.week}</td><td className="p-4 text-sm font-medium text-neutral-900">{c.topic}</td><td className="p-4 text-sm text-neutral-800">{c.channel}</td><td className="p-4"><span className="chip bg-accent-50 text-accent-600 text-xs">{c.type}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Ad Campaigns */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">Ad <span className="gradient-text">Campaigns</span></h2>
            <p className="text-neutral-800">Zero-cost ad strategy · AI-optimized targeting</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 reveal">
            {adCampaigns.map((a, i) => (
              <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
                <div className="text-lg font-heading font-bold mb-1">{a.platform}</div>
                <div className="text-sm text-success font-semibold mb-4">{a.budget}</div>
                <div className="space-y-2 text-sm text-neutral-800">
                  <div><span className="font-medium text-neutral-700">Target:</span> {a.targeting}</div>
                  <div><span className="font-medium text-neutral-700">Audience:</span> {a.audience}</div>
                  <div><span className="font-medium text-neutral-700">Keywords:</span> {a.keywords}</div>
                  <div><span className="font-medium text-neutral-700">Format:</span> {a.format}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cold Email Scripts */}
      <section className="section-padding gradient-bg">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">AI Cold Outreach <span className="text-primary-300">Scripts</span></h2>
            <p className="text-primary-200">AI agent personalizes every message · 8% reply rate target</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { subject: 'AI-powered development for [Company]', body: 'Hi [Name],\n\nWe noticed [Company] is [trigger - hiring devs/funding/launching product].\n\nAt Nexify, our AI agents build custom software at 10x speed — no human overhead, 60% lower cost.\n\nQuick case study: We built a trading dashboard for a fintech client in 6 weeks (normally 6 months).\n\nWorth a 15-min call this week?\n\nBest,\nSalesAgent-Mu\nNexify Technologies' },
              { subject: 'Your [Company] project in half the time', body: 'Hi [Name],\n\nSaw that [Company] is working on [project reference from LinkedIn/website].\n\nTraditional agencies would quote 6 months and ₹20L.\n\nOur AI agents can deliver in 6-8 weeks at ₹6-8L. Same quality, faster turnaround.\n\nProof: 200+ projects delivered. 98% client satisfaction.\n\nWant to see a sample?\n\n— SalesAgent-Mu' },
            ].map((email, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-3"><Mail className="w-4 h-4 text-primary-300" /><span className="text-sm font-medium text-white">Subject: {email.subject}</span></div>
                <pre className="text-sm text-primary-200 whitespace-pre-wrap font-body">{email.body}</pre>
                <button className="mt-3 text-xs text-primary-300 hover:text-white flex items-center gap-1"><Copy size={12} /> Copy Script</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LinkedIn Strategy Detail */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl font-heading font-bold mb-4">LinkedIn <span className="gradient-text">Strategy</span></h2>
            <p className="text-neutral-800">Daily AI-generated content · Automated engagement</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 reveal">
            {[
              { day: 'Monday', topic: 'Tech Insight / AI Development', format: 'Carousel post' },
              { day: 'Tuesday', topic: 'Client Success Story', format: 'Text + Image' },
              { day: 'Wednesday', topic: 'Industry Analysis / Opinion', format: 'Long-form text' },
              { day: 'Thursday', topic: 'Product / Service Highlight', format: 'Video + Text' },
              { day: 'Friday', topic: 'Culture / Behind the Scenes', format: 'Image + Story' },
              { day: 'Saturday', topic: 'Community Engagement', format: 'Poll / Question' },
            ].map((d, i) => (
              <div key={i} className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <div className="font-semibold text-primary-600 mb-1">{d.day}</div>
                <div className="text-sm text-neutral-700 mb-1">{d.topic}</div>
                <span className="chip bg-primary-50 text-primary-600 text-xs">{d.format}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
