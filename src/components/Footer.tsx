import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'Custom Software', href: '/services#custom-software' },
    { name: 'Web Development', href: '/services#web-development' },
    { name: 'Mobile Apps', href: '/services#mobile-apps' },
    { name: 'AI Solutions', href: '/services#ai-solutions' },
    { name: 'Cloud & DevOps', href: '/services#cloud-devops' },
    { name: 'AI Chatbots', href: '/services#chatbots' },
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
    { name: 'Contact', href: '/contact' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Tech Stack', href: '/techstack' },
    { name: 'AI Automation', href: '/ai-automation' },
    { name: 'Brand Assets', href: '/branding' },
    { name: 'Growth Plan', href: '/growth' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="section-container section-padding">
        {/* Mobile: 2 columns, Tablet: 3, Desktop: 5 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
                <span className="text-white font-heading font-bold text-lg">N</span>
              </div>
              <div>
                <h3 className="text-white font-heading font-bold text-lg leading-none">Nexify</h3>
                <p className="text-neutral-500 text-xs font-medium tracking-wider uppercase">Technologies</p>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              AI-powered software development company. We build next-gen digital products using intelligent AI agents — faster, better, and at half the cost.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-all" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-all" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-primary-500 hover:text-white transition-all" aria-label="GitHub">
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {[
            { title: 'Services', links: footerLinks.services },
            { title: 'Products', links: footerLinks.products },
            { title: 'Company', links: footerLinks.company },
            { title: 'Resources', links: footerLinks.resources },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-neutral-400 hover:text-primary-400 text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p className="text-neutral-500 text-xs">
              © {new Date().getFullYear()} Nexify Technologies. All rights reserved.
            </p>
            <p className="text-neutral-600 text-xs flex items-center gap-1">
              <Mail size={11} />
              <a href="mailto:ajinkyasatkar5@gmail.com" className="hover:text-primary-400 transition-colors">ajinkyasatkar5@gmail.com</a>
              <span className="hidden sm:inline mx-2">·</span>
              <Phone size={11} />
              <a href="tel:+919373955349" className="hover:text-primary-400 transition-colors">+91 9373955349</a>
              <span className="hidden sm:inline mx-2">·</span>
              <MapPin size={11} className="hidden sm:inline" />
              <span className="hidden sm:inline">Pune, India</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-neutral-400 hover:text-white text-xs transition-colors">Privacy</Link>
            <Link href="#" className="text-neutral-400 hover:text-white text-xs transition-colors">Terms</Link>
            <Link href="#" className="text-neutral-400 hover:text-white text-xs transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
