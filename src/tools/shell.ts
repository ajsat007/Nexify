// ============================================================================
// Nexify — Shell & Deploy Tools
// Let AI agents run commands and deploy projects
// ============================================================================

import { registerTool } from './registry'
import { execSync } from 'child_process'

registerTool({
  name: 'run_command',
  description: 'Execute a shell command in the project directory. Use for npm, npx, docker, and other CLI tools.',
  parameters: {
    type: 'object',
    properties: {
      command: {
        type: 'string',
        description: 'The shell command to execute (e.g. "npm run build", "npx next lint", "docker ps")',
      },
      timeout: {
        type: 'number',
        description: 'Timeout in milliseconds (default: 30000)',
      },
    },
    required: ['command'],
  },
  handler: async (args) => {
    try {
      const stdout = execSync(args.command, {
        cwd: process.cwd(),
        encoding: 'utf-8',
        timeout: args.timeout || 120000,
        maxBuffer: 10 * 1024 * 1024,
      })
      return { success: true, data: stdout }
    } catch (err: any) {
      return {
        success: false,
        data: err.stdout || '',
        error: `Command failed (exit ${err.status}): ${err.stderr || err.message}`,
      }
    }
  },
})

registerTool({
  name: 'install_dependencies',
  description: 'Install npm dependencies (npm install).',
  parameters: {
    type: 'object',
    properties: {},
    required: [],
  },
  handler: async () => {
    try {
      const stdout = execSync('npm install', {
        cwd: process.cwd(),
        encoding: 'utf-8',
        timeout: 120000,
      })
      return { success: true, data: stdout }
    } catch (err: any) {
      return { success: false, error: `Install failed: ${err.message}` }
    }
  },
})

registerTool({
  name: 'build_project',
  description: 'Run the build command (npm run build).',
  parameters: {
    type: 'object',
    properties: {},
    required: [],
  },
  handler: async () => {
    try {
      const stdout = execSync('npm run build', {
        cwd: process.cwd(),
        encoding: 'utf-8',
        timeout: 300000,
        maxBuffer: 10 * 1024 * 1024,
      })
      return { success: true, data: stdout }
    } catch (err: any) {
      return {
        success: false,
        data: err.stdout || '',
        error: `Build failed (exit ${err.status}): ${err.stderr || err.message}`,
      }
    }
  },
})
