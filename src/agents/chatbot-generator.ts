// ============================================================================
// Nexify — Chatbot Knowledge Base Generator
// Uses AI agents to generate comprehensive FAQ knowledge base from business info
// ============================================================================

import { complete } from '@/lib/ai/providers/client'

interface KnowledgeBaseInput {
  businessName: string
  businessType: string
  rawInfo: string
  targetQAs: number
}

interface QAPair {
  question: string
  answer: string
  category: string
}

export async function generateKnowledgeBase(input: KnowledgeBaseInput): Promise<QAPair[]> {
  const prompt = `You are an expert at creating AI chatbot knowledge bases. Generate ${input.targetQAs} high-quality question-answer pairs for a chatbot.

Business: ${input.businessName}
Type: ${input.businessType}
Raw Information: ${input.rawInfo}

Create Q&A pairs covering these categories:
1. General Info (what you do, who you serve, where you're located)
2. Services/Products (what you offer, pricing, packages)
3. Process (how it works, timeline, steps)
4. Pricing/Payment (cost, payment methods, plans)
5. Contact/Booking (how to reach you, book appointments)
6. Policies (cancellation, refund, privacy, terms)
7. Technical/Common Issues (troubleshooting, requirements)
8. FAQ (objections, comparisons, why choose you)

Format each as JSON:
{
  "question": "Natural question a customer would ask",
  "answer": "Helpful, specific, actionable answer",
  "category": "One of the 8 categories above"
}

Return ONLY a JSON array of ${input.targetQAs} objects. No markdown, no extra text.`

  const response = await complete({
    messages: [
      { role: 'system', content: 'You are an expert AI knowledge base builder. Output only valid JSON arrays.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.3,
    maxTokens: 8000,
  })

  try {
    const qaPairs = JSON.parse(response.content)
    return qaPairs
  } catch (e) {
    console.error('Failed to parse knowledge base:', e)
    return []
  }
}

export async function generateKnowledgeBaseStream(
  input: KnowledgeBaseInput,
  onChunk: (qa: QAPair) => void
): Promise<QAPair[]> {
  // For now, use batch generation
  return generateKnowledgeBase(input)
}