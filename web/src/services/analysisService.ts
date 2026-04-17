import Anthropic from '@anthropic-ai/sdk'

export type Sense = 'sight' | 'sound' | 'smell' | 'taste' | 'touch' | 'organic' | 'kinesthetic'

export interface SensoryAnnotation {
  phrase: string
  sense: Sense
  startIndex: number
  endIndex: number
}

const ANALYSIS_PROMPT = `You are analyzing a piece of writing for sensory language. Identify every phrase that engages one of the seven senses: sight, sound, smell, taste, touch, organic (internal body sensations), or kinesthetic (movement/body position).

For each sensory phrase, return a JSON array of objects with this exact shape:
{ "phrase": string, "sense": string, "startIndex": number, "endIndex": number }

Rules:
- phrase: the exact substring from the text
- sense: one of sight, sound, smell, taste, touch, organic, kinesthetic
- startIndex: character offset of the first character of the phrase in the original text
- endIndex: character offset one past the last character (exclusive)
- Return only valid JSON — no explanation, no markdown, no code fences
- If there are no sensory phrases, return an empty array []`

export async function analyzeText(text: string, apiKey: string): Promise<SensoryAnnotation[]> {
  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `${ANALYSIS_PROMPT}\n\nText to analyze:\n${text}`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    return []
  }

  return parseAnnotations(content.text)
}

export function parseAnnotations(raw: string): SensoryAnnotation[] {
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) return []

  return parsed.filter(isValidAnnotation)
}

const VALID_SENSES = new Set<string>([
  'sight', 'sound', 'smell', 'taste', 'touch', 'organic', 'kinesthetic',
])

function isValidAnnotation(item: unknown): item is SensoryAnnotation {
  if (typeof item !== 'object' || item === null) return false
  const a = item as Record<string, unknown>
  return (
    typeof a.phrase === 'string' &&
    typeof a.sense === 'string' &&
    VALID_SENSES.has(a.sense) &&
    typeof a.startIndex === 'number' &&
    typeof a.endIndex === 'number'
  )
}
