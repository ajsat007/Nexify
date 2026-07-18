import { describe, it, expect } from 'vitest'
import { agentRegistry, getAgentStats, getAgentsByDepartment } from '@/agents/registry'

describe('agentRegistry', () => {
  it('has the correct number of agents', () => {
    expect(agentRegistry.length).toBe(16)
  })

  it('has agents across all departments', () => {
    const depts = new Set(agentRegistry.map(a => a.department))
    expect(depts.has('executive')).toBe(true)
    expect(depts.has('engineering')).toBe(true)
    expect(depts.has('marketing')).toBe(true)
    expect(depts.has('sales')).toBe(true)
    expect(depts.has('legal')).toBe(true)
    expect(depts.has('operations')).toBe(true)
  })

  it('returns correct stats', () => {
    const stats = getAgentStats()
    expect(stats.total).toBe(16)
    expect(stats.avgEfficiency).toBeGreaterThan(90)
    expect(stats.active).toBe(16)
  })

  it('filters by department', () => {
    const eng = getAgentsByDepartment('engineering')
    expect(eng.length).toBeGreaterThanOrEqual(4)
    eng.forEach(a => expect(a.department).toBe('engineering'))
  })

  it('all agents have required fields', () => {
    agentRegistry.forEach(a => {
      expect(a.id).toBeTruthy()
      expect(a.name).toBeTruthy()
      expect(a.role).toBeTruthy()
      expect(a.department).toBeTruthy()
      expect(a.model).toBeTruthy()
      expect(a.skills.length).toBeGreaterThan(0)
    })
  })
})
