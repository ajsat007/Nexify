// ============================================================================
// Nexify — File System Tools
// Let AI agents read, write, and manage files on disk
// ============================================================================

import { registerTool } from './registry'
import { promises as fs } from 'fs'
import path from 'path'

const WORKSPACE_ROOT = process.cwd()

// ── Sanitize path to prevent directory traversal ──
function safePath(inputPath: string): string {
  const resolved = path.resolve(WORKSPACE_ROOT, inputPath)
  if (!resolved.startsWith(WORKSPACE_ROOT)) {
    throw new Error(`Path "${inputPath}" is outside workspace`)
  }
  return resolved
}

// ── Recursive file walker (no dependency needed) ──
async function walkDir(dir: string, results: string[] = []): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.next') continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkDir(fullPath, results)
    } else {
      results.push(path.relative(WORKSPACE_ROOT, fullPath))
    }
  }
  return results
}

// ── Match a simple glob pattern against a filename ──
function matchGlob(filePath: string, pattern: string): boolean {
  // Convert glob to regex
  let regexStr = pattern
    .replace(/\./g, '\\.')
    .replace(/\*\*/g, '☃')
    .replace(/\*/g, '[^/]*')
    .replace(/☃/g, '.*')
  return new RegExp(`^${regexStr}$`).test(filePath)
}

registerTool({
  name: 'read_file',
  description: 'Read the contents of a file at the given path. Returns file contents as text.',
  parameters: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'Path to the file (relative to project root, e.g. "src/app/page.tsx")',
      },
    },
    required: ['path'],
  },
  handler: async (args) => {
    try {
      const filePath = safePath(args.path)
      const content = await fs.readFile(filePath, 'utf-8')
      return { success: true, data: content }
    } catch (err: any) {
      return { success: false, error: `Failed to read file: ${err.message}` }
    }
  },
})

registerTool({
  name: 'write_file',
  description: 'Write content to a file. Creates parent directories if they don\'t exist.',
  parameters: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'Path to write to (relative to project root, e.g. "src/app/hello/page.tsx")',
      },
      content: {
        type: 'string',
        description: 'The file content to write',
      },
    },
    required: ['path', 'content'],
  },
  handler: async (args) => {
    try {
      const filePath = safePath(args.path)
      await fs.mkdir(path.dirname(filePath), { recursive: true })
      await fs.writeFile(filePath, args.content, 'utf-8')
      return { success: true, data: `Written ${Buffer.byteLength(args.content, 'utf-8')} bytes to ${args.path}` }
    } catch (err: any) {
      return { success: false, error: `Failed to write file: ${err.message}` }
    }
  },
})

registerTool({
  name: 'list_directory',
  description: 'List files and directories at the given path. Returns names and types.',
  parameters: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'Directory path (relative to project root, default: ".")',
      },
    },
    required: [],
  },
  handler: async (args) => {
    try {
      const dirPath = safePath(args.path || '.')
      const entries = await fs.readdir(dirPath, { withFileTypes: true })
      const items = entries.map(e => ({
        name: e.name,
        type: e.isDirectory() ? 'directory' : 'file',
      }))
      return { success: true, data: items }
    } catch (err: any) {
      return { success: false, error: `Failed to list directory: ${err.message}` }
    }
  },
})

registerTool({
  name: 'delete_file',
  description: 'Delete a file or empty directory at the given path.',
  parameters: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'Path to delete (relative to project root)',
      },
    },
    required: ['path'],
  },
  handler: async (args) => {
    try {
      const filePath = safePath(args.path)
      await fs.rm(filePath, { recursive: true, force: true })
      return { success: true, data: `Deleted ${args.path}` }
    } catch (err: any) {
      return { success: false, error: `Failed to delete: ${err.message}` }
    }
  },
})

registerTool({
  name: 'search_files',
  description: 'Search for files matching a glob pattern (e.g. "src/**/*.tsx", "*.css").',
  parameters: {
    type: 'object',
    properties: {
      pattern: {
        type: 'string',
        description: 'Glob pattern to search for (e.g. "**/*.tsx", "**/page.tsx")',
      },
    },
    required: ['pattern'],
  },
  handler: async (args) => {
    try {
      const allFiles = await walkDir(WORKSPACE_ROOT)
      const matches = allFiles.filter(f => matchGlob(f, args.pattern))
      return { success: true, data: matches }
    } catch (err: any) {
      return { success: false, error: `Search failed: ${err.message}` }
    }
  },
})
