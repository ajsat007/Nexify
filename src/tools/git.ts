// ============================================================================
// Nexify — Git Tools
// Let AI agents commit, push, create branches, and manage git
// ============================================================================

import { registerTool } from './registry'
import { execSync } from 'child_process'

function runGit(args: string[], cwd?: string): { stdout: string; stderr: string } {
  const result = execSync(`git ${args.join(' ')}`, {
    cwd: cwd || process.cwd(),
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024,
  })
  return { stdout: result, stderr: '' }
}

registerTool({
  name: 'git_status',
  description: 'Show the current git status (modified, staged, untracked files).',
  parameters: {
    type: 'object',
    properties: {},
    required: [],
  },
  handler: async () => {
    try {
      const { stdout } = runGit(['status', '--short'])
      const branch = runGit(['rev-parse', '--abbrev-ref', 'HEAD']).stdout.trim()
      return {
        success: true,
        data: { branch, status: stdout || 'Clean working tree' },
      }
    } catch (err: any) {
      return { success: false, error: `Git status failed: ${err.message}` }
    }
  },
})

registerTool({
  name: 'git_commit',
  description: 'Stage all changes and commit with a message.',
  parameters: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Commit message describing the changes',
      },
    },
    required: ['message'],
  },
  handler: async (args) => {
    try {
      runGit(['add', '-A'])
      const { stdout } = runGit(['commit', '-m', args.message])
      return { success: true, data: stdout }
    } catch (err: any) {
      return { success: false, error: `Commit failed: ${err.message}` }
    }
  },
})

registerTool({
  name: 'git_push',
  description: 'Push the current branch to origin (includes upstream setup if needed).',
  parameters: {
    type: 'object',
    properties: {},
    required: [],
  },
  handler: async () => {
    try {
      const branch = runGit(['rev-parse', '--abbrev-ref', 'HEAD']).stdout.trim()
      const { stdout } = runGit(['push', '-u', 'origin', branch])
      return { success: true, data: stdout }
    } catch (err: any) {
      return { success: false, error: `Push failed: ${err.message}` }
    }
  },
})

registerTool({
  name: 'git_create_branch',
  description: 'Create and switch to a new git branch.',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Branch name (e.g. "feature/new-dashboard", "fix/login-bug")',
      },
    },
    required: ['name'],
  },
  handler: async (args) => {
    try {
      runGit(['checkout', '-b', args.name])
      return { success: true, data: `Created and switched to branch: ${args.name}` }
    } catch (err: any) {
      return { success: false, error: `Branch creation failed: ${err.message}` }
    }
  },
})

registerTool({
  name: 'git_diff',
  description: 'Show the diff of uncommitted changes.',
  parameters: {
    type: 'object',
    properties: {},
    required: [],
  },
  handler: async () => {
    try {
      const { stdout } = runGit(['diff'])
      return { success: true, data: stdout || 'No uncommitted changes' }
    } catch (err: any) {
      return { success: false, error: `Diff failed: ${err.message}` }
    }
  },
})
