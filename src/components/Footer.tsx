import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  services: [
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
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ],
  resources: [
    { name: 'Marketing', href: '/marketing' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Finance', href: '/finance' },
    { name: 'Tech Stack', href: '/techstack' },
    { name: 'AI Automation', href: '/ai-automation' },
    { name: 'SOPs', href: '/sops' },
    { name: 'Brand Assets', href: '/branding' },
    { name: 'Growth Plan', href: '/growth' },
  ],
  portals: [
    { name: 'Admin Panel', href: '/admin' },
    { name: 'Sales System', href: '/sales' },
    { name: 'Client Portal', href: '/portal' },
    { name: 'HR Portal', href: '/hr' },
    { name: 'Dashboards', href: '/dashboards' },
    { name: 'Business Auto.', href: '/business-automation' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="section-container section-padding">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">N</span>
              </div>
              <div>
                <h3 className="text-white font-heading font-bold text-lg leading-none">Nexify</h3>
                <p className="text-neutral-600 text-xs font-medium tracking-wider uppercase">Technologies</p>
              </div>
            </Link>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              AI-powered software development company. We build next-gen digital products using intelligent AI agents — faster, better, and at half the cost.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-600 hover:bg-primary-500 hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-600 hover:bg-primary-500 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-600 hover:bg-primary-500 hover:text-white transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-600 hover:text-primary-400 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-600 hover:text-primary-400 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-600 hover:text-primary-400 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-600 hover:text-primary-400 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Portals</h4>
            <ul className="space-y-3">
              {footerLinks.portals.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-600 hover:text-primary-400 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:ajinkyasatkar5@gmail.com" className="flex items-center gap-2 text-neutral-600 hover:text-primary-400 text-sm transition-colors">
                  <Mail size={14} />
                  ajinkyasatkar5@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919373955349" className="flex items-center gap-2 text-neutral-600 hover:text-primary-400 text-sm transition-colors">
                  <Phone size={14} />
                  +91 9373955349
                </a>
              </li>
              <li className="flex items-start gap-2 text-neutral-600 text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                Pune, Maharashtra, India · Remote-First
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-xs">
            © {new Date().getFullYear()} Nexify Technologies. All rights reserved. Powered by AI Agents.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-neutral-600 hover:text-neutral-300 text-xs transition-colors">Privacy</Link>
            <Link href="#" className="text-neutral-600 hover:text-neutral-300 text-xs transition-colors">Terms</Link>
            <Link href="#" className="text-neutral-600 hover:text-neutral-300 text-xs transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
