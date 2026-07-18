// ============================================================================
// Nexify — Tool Registry
// Every tool an AI agent can use to interact with the real world
// ============================================================================

export interface ToolDefinition {
  name: string
  description: string
  parameters: {
    type: 'object'
    properties: Record<string, {
      type: string
      description: string
      enum?: string[]
    }>
    required: string[]
  }
  handler: (args: Record<string, any>) => Promise<ToolResult>
}

export interface ToolResult {
  success: boolean
  data?: any
  error?: string
}

type ToolRegistry = Map<string, ToolDefinition>

const tools = new Map<string, ToolDefinition>()

export function registerTool(tool: ToolDefinition): void {
  tools.set(tool.name, tool)
}

export function getTool(name: string): ToolDefinition | undefined {
  return tools.get(name)
}

export function getAllTools(): ToolDefinition[] {
  return Array.from(tools.values())
}

export function getToolSchemas() {
  return Array.from(tools.values()).map(t => ({
    name: t.name,
    description: t.description,
    parameters: t.parameters,
  }))
}

export async function executeTool(name: string, args: Record<string, any>): Promise<ToolResult> {
  const tool = tools.get(name)
  if (!tool) return { success: false, error: `Unknown tool: ${name}` }
  try {
    return await tool.handler(args)
  } catch (err: any) {
    return { success: false, error: err.message || 'Tool execution failed' }
  }
}
