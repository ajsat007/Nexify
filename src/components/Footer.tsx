import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, ArrowUpRight, Bot, Sparkles } from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'AI Chatbot', href: '/chatbot' },
    { name: 'Custom Software', href: '/services#custom-software' },
    { name: 'Web Development', href: '/services#web-development' },
    { name: 'Mobile Apps', href: '/services#mobile-apps' },
    { name: 'AI Solutions', href: '/services#ai-solutions' },
    { name: 'Cloud & DevOps', href: '/services#cloud-devops' },
  ],
  products: [
    { name: 'FlowSprint', href: '/products#flowsprint' },
    { name: 'PulseAI', href: '/products#pulseai' },
    { name: 'DeskFlow', href: '/products#deskflow' },
    { name: 'SignFlow', href: '/products#signflow' },
    { name: 'BotForge', href: '/products#botforge' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Agents', href: '/agents' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'FAQ', href: '/faq' },
  ],
  resources: [
    { name: 'Contact', href: '/contact' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Tech Stack', href: '/techstack' },
    { name: 'AI Automation', href: '/ai-automation' },
    { name: 'Brand Assets', href: '/branding' },
    { name: 'Growth Plan', href: '/growth' },
    { name: 'Admin Panel', href: '/admin' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-surface-900 dark:bg-surface-975 border-t border-surface-800/50 overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/[0.02] to-transparent pointer-events-none" />

      <div className="section-container section-padding relative">
        {/* CTA mini-banner */}
        <div className="glass rounded-2xl p-6 sm:p-8 mb-12 border border-white/10 bg-gradient-to-r from-primary-500/5 to-accent-500/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-heading font-bold text-lg">AI Chatbot for Your Business</h3>
                <p className="text-surface-400 text-sm">₹15,000 · Built in 48 hours · WhatsApp + Website</p>
              </div>
            </div>
            <Link href="/chatbot" className="btn-white text-sm shrink-0">
              Get Started <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-shadow">
                <span className="text-white font-heading font-bold text-lg">N</span>
              </div>
              <div>
                <h3 className="text-white font-heading font-bold text-lg leading-none">Nexify</h3>
                <p className="text-surface-500 text-xs font-medium tracking-wider uppercase">Technologies</p>
              </div>
            </Link>
            <p className="text-surface-400 text-sm leading-relaxed mb-6 max-w-xs">
              AI-native software company. 28 specialized AI agents building next-gen digital products — faster, better, and at half the cost.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Github, href: '#' },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} className="w-9 h-9 rounded-lg bg-surface-800 flex items-center justify-center text-surface-400 hover:bg-primary-500 hover:text-white transition-all" aria-label="Social link">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: 'Services', links: footerLinks.services },
            { title: 'Products', links: footerLinks.products },
            { title: 'Company', links: footerLinks.company },
            { title: 'Resources', links: footerLinks.resources },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-surface-400 hover:text-primary-400 text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p className="text-surface-500 text-xs">
              © {new Date().getFullYear()} Nexify Technologies. All rights reserved.
            </p>
            <p className="text-surface-600 text-xs flex flex-wrap items-center justify-center gap-2">
              <a href="mailto:ajinkyasatkar5@gmail.com" className="hover:text-primary-400 transition-colors flex items-center gap-1">
                <Mail size={10} /> ajinkyasatkar5@gmail.com
              </a>
              <span className="hidden sm:inline">·</span>
              <a href="tel:+919373955349" className="hover:text-primary-400 transition-colors flex items-center gap-1">
                <Phone size={10} /> +91 9373955349
              </a>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1"><MapPin size={10} /> Pune, India</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-surface-500 hover:text-white text-xs transition-colors">Privacy</Link>
            <Link href="#" className="text-surface-500 hover:text-white text-xs transition-colors">Terms</Link>
            <Link href="#" className="text-surface-500 hover:text-white text-xs transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
