'use client'

import { useState } from 'react'
import { Calculator, ArrowRight, RefreshCw, Check } from 'lucide-react'

const serviceOptions = [
  { id: 'web', name: 'Web Development', basePrice: 80000, icon: '🌐' },
  { id: 'mobile', name: 'Mobile App', basePrice: 250000, icon: '📱' },
  { id: 'ai', name: 'AI Solutions', basePrice: 400000, icon: '🤖' },
  { id: 'dashboard', name: 'Dashboard', basePrice: 120000, icon: '📊' },
  { id: 'api', name: 'API Development', basePrice: 100000, icon: '🔗' },
  { id: 'automation', name: 'Automation', basePrice: 150000, icon: '⚡' },
]

const complexityMultipliers = [
  { id: 'simple', label: 'Simple', desc: 'Few features, basic UI', mult: 0.8 },
  { id: 'moderate', label: 'Moderate', desc: 'Standard complexity', mult: 1.0, default: true },
  { id: 'complex', label: 'Complex', desc: 'Many features, integrations', mult: 1.5 },
  { id: 'enterprise', label: 'Enterprise', desc: 'Large-scale, multi-module', mult: 2.5 },
]

const features: Record<string, { id: string; label: string; cost: number }[]> = {
  web: [
    { id: 'cms', label: 'CMS Integration', cost: 30000 },
    { id: 'auth', label: 'User Auth & Roles', cost: 25000 },
    { id: 'payments', label: 'Payment Gateway', cost: 40000 },
    { id: 'analytics', label: 'Advanced Analytics', cost: 35000 },
    { id: 'multi-lang', label: 'Multi-language', cost: 25000 },
    { id: 'api', label: 'REST/GraphQL API', cost: 30000 },
  ],
  mobile: [
    { id: 'push', label: 'Push Notifications', cost: 25000 },
    { id: 'offline', label: 'Offline Mode', cost: 40000 },
    { id: 'payments', label: 'In-App Payments', cost: 50000 },
    { id: 'maps', label: 'Maps & Location', cost: 35000 },
    { id: 'chat', label: 'Real-time Chat', cost: 45000 },
    { id: 'social', label: 'Social Login', cost: 20000 },
  ],
  ai: [
    { id: 'training', label: 'Custom Model Training', cost: 150000 },
    { id: 'api', label: 'Inference API', cost: 50000 },
    { id: 'pipeline', label: 'MLOps Pipeline', cost: 100000 },
    { id: 'monitoring', label: 'Model Monitoring', cost: 60000 },
    { id: 'rag', label: 'RAG Knowledge Base', cost: 80000 },
    { id: 'dashboard', label: 'AI Dashboard', cost: 50000 },
  ],
}

export default function PricingCalculator() {
  const [service, setService] = useState('web')
  const [complexity, setComplexity] = useState('moderate')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const currentFeatures = features[service as keyof typeof features] || features.web
  const currentService = serviceOptions.find(s => s.id === service)!
  const currentComplexity = complexityMultipliers.find(c => c.id === complexity)!

  const baseCost = currentService.basePrice * currentComplexity.mult
  const featuresCost = currentFeatures
    .filter(f => selectedFeatures.includes(f.id))
    .reduce((sum, f) => sum + f.cost, 0)
  const totalCost = Math.round(baseCost + featuresCost)
  const monthlyPayment = Math.round(totalCost / 12)

  const reset = () => {
    setService('web')
    setComplexity('moderate')
    setSelectedFeatures([])
    setShowResults(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xl">
      <div className="p-6 bg-gradient-to-r from-primary-500/5 to-accent-500/5 border-b border-neutral-200">
        <div className="flex items-center gap-3 mb-1">
          <Calculator className="w-6 h-6 text-primary-500" />
          <h2 className="text-xl font-heading font-bold">Project Cost Calculator</h2>
        </div>
        <p className="text-sm text-neutral-500">Select options to get an instant AI-generated estimate</p>
      </div>

      <div className="p-6 space-y-8">
        {/* Service Type */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-700 mb-3">1. What do you need?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {serviceOptions.map(s => (
              <button key={s.id} onClick={() => { setService(s.id); setSelectedFeatures([]) }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  service === s.id
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-neutral-200 text-neutral-800 hover:border-neutral-300'
                }`}>
                <span>{s.icon}</span> {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-700 mb-3">2. How complex is your project?</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {complexityMultipliers.map(c => (
              <button key={c.id} onClick={() => setComplexity(c.id)}
                className={`px-4 py-3 rounded-xl border text-sm transition-all ${
                  complexity === c.id
                    ? 'border-primary-500 bg-primary-50 text-primary-600'
                    : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'
                }`}>
                <div className="font-medium">{c.label}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{c.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-700 mb-3">3. Add features (optional)</h3>
          <div className="flex flex-wrap gap-2">
            {currentFeatures.map(f => (
              <button key={f.id} onClick={() => toggleFeature(f.id)}
                className={`chip text-xs transition-all ${
                  selectedFeatures.includes(f.id)
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                }`}>
                {selectedFeatures.includes(f.id) && <Check size={10} />}
                {f.label} (+{(f.cost / 1000).toFixed(0)}K)
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-neutral-900 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Estimated Project Cost</h3>
            <button onClick={reset} className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-all">
              <RefreshCw size={12} /> Reset
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-xs text-neutral-400 mb-1">Base Price</div>
              <div className="text-xl font-heading font-bold">{(baseCost / 100000).toFixed(1)}L</div>
              <div className="text-xs text-neutral-400">{currentService.name} · {currentComplexity.label}</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-xs text-neutral-400 mb-1">Features</div>
              <div className="text-xl font-heading font-bold">+{(featuresCost / 1000).toFixed(0)}K</div>
              <div className="text-xs text-neutral-400">{selectedFeatures.length} selected</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl">
              <div className="text-xs text-white/70 mb-1">Total Estimate</div>
              <div className="text-xl font-heading font-bold">{(totalCost / 100000).toFixed(1)}L</div>
              <div className="text-xs text-white/70">or {Math.round(monthlyPayment / 1000)}K/mo</div>
            </div>
          </div>
          <a href="/contact" className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-neutral-900 font-semibold hover:bg-neutral-100 transition-all text-sm">
            Get Exact Quote <ArrowRight size={16} />
          </a>
          <p className="text-xs text-neutral-500 text-center mt-2">This is an AI estimate. Final pricing determined during scoping.</p>
        </div>
      </div>
    </div>
  )
}
