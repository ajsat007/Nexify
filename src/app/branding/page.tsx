'use client'

import { Download, FileText, Image, FileImage, Palette, Share2, CreditCard, FileSignature, Mail, Smartphone, Monitor } from 'lucide-react'

export default function BrandingPage() {
  const assets = [
    { icon: Image, name: 'Business Card', formats: 'PDF + PNG', desc: 'Dual-sided business card with Nexify branding' },
    { icon: FileText, name: 'Letterhead', formats: 'PDF + DOCX', desc: 'Professional letterhead for official correspondence' },
    { icon: FileSignature, name: 'Invoice Design', formats: 'PDF', desc: 'Branded invoice template with all required fields' },
    { icon: Mail, name: 'Email Signature', formats: 'HTML', desc: 'Professional email signature with social links' },
    { icon: FileImage, name: 'Brochure (Digital)', formats: 'PDF', desc: 'Company brochure for client distribution' },
    { icon: Image, name: 'Social Media Templates', formats: 'Figma + PNG', desc: 'LinkedIn, Twitter, Instagram post templates' },
    { icon: Monitor, name: 'Presentation Theme', formats: 'PPTX + Google Slides', desc: 'Investor and client presentation template' },
    { icon: FileText, name: 'Proposal Theme', formats: 'DOCX + PDF', desc: 'Professional proposal document with brand styling' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative pt-32 pb-20 gradient-bg overflow-hidden">
        <div className="section-container relative">
          <div className="max-w-3xl">
            <div className="chip bg-white/10 text-white border border-white/20 mb-4">Step 17</div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">Brand <span className="text-primary-300">Assets</span></h1>
            <p className="text-xl text-neutral-300 max-w-2xl">Complete brand identity package. Consistent across all touchpoints.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {assets.map((a, i) => {
              const Icon = a.icon
              return (
                <div key={i} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 hover:shadow-xl hover:border-primary-500/20 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Icon className="w-6 h-6 text-primary-500" /></div>
                  <h3 className="font-semibold text-neutral-900 mb-1">{a.name}</h3>
                  <p className="text-xs text-neutral-800 mb-1">{a.formats}</p>
                  <p className="text-xs text-neutral-800 mb-4">{a.desc}</p>
                  <button className="text-primary-500 hover:text-primary-600 text-sm flex items-center gap-1"><Download size={14} /> Download</button>
                </div>
              )
            })}
          </div>

          {/* Brand Colors Preview */}
          <div className="mt-12 bg-neutral-900 rounded-2xl p-8">
            <h2 className="text-2xl font-heading font-bold text-white mb-6 text-center">Brand Colors</h2>
            <div className="grid grid-cols-5 gap-4">
              {[
                { name: 'Deep Navy', hex: '#0F172A' },
                { name: 'Slate', hex: '#1E293B' },
                { name: 'Electric Blue', hex: '#3B82F6' },
                { name: 'Light Blue', hex: '#60A5FA' },
                { name: 'Violet', hex: '#8B5CF6' },
              ].map((c, i) => (
                <div key={i} className="text-center">
                  <div className="w-full aspect-square rounded-2xl mb-2" style={{ backgroundColor: c.hex }} />
                  <div className="text-white text-sm font-medium">{c.name}</div>
                  <div className="text-neutral-800 text-xs">{c.hex}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
