import Anthropic from '@anthropic-ai/sdk'

const SENSES = ['sight', 'sound', 'smell', 'taste', 'touch', 'organic', 'kinesthetic'] as const

export type Sense = (typeof SENSES)[number]

export interface SensoryAnnotation {
  phrase: string
  sense: Sense
  startIndex: number
  endIndex: number
}

const ANALYSIS_PROMPT = `You are analyzing a piece of writing for sensory language. Identify every phrase that engages one of the seven senses: sight, sound, smell, taste, touch, organic (internal body sensations), or kinesthetic (movement/body position).

For each sensory phrase, return a JSON array of objects with this exact shape:
{ "phrase": string, "sense": string }

Rules:
- phrase: the exact substring from the text
- sense: one of sight, sound, smell, taste, touch, organic, kinesthetic
- Return only valid JSON — no explanation, no markdown, no code fences
- If there are no sensory phrases, return an empty array []`

interface RawAnnotation {
  phrase: string
  sense: Sense
}

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
      {
        role: 'assistant',
        content: '[',
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    return []
  }

  return deriveAnnotations(text, parseAnnotations(content.text))
}

export function parseAnnotations(raw: string): RawAnnotation[] {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    try {
      parsed = JSON.parse('[' + raw)
    } catch {
      return []
    }
  }
  if (!Array.isArray(parsed)) return []

  return parsed.filter(isValidRawAnnotation)
}

export function deriveAnnotations(text: string, raws: RawAnnotation[]): SensoryAnnotation[] {
  return raws.flatMap(({ phrase, sense }) => {
    const startIndex = text.indexOf(phrase)
    if (startIndex === -1) return []
    return [{ phrase, sense, startIndex, endIndex: startIndex + phrase.length }]
  })
}

const VALID_SENSES = new Set<string>(SENSES)

function isValidRawAnnotation(item: unknown): item is RawAnnotation {
  if (typeof item !== 'object' || item === null) return false
  const a = item as Record<string, unknown>
  return (
    typeof a.phrase === 'string' &&
    typeof a.sense === 'string' &&
    VALID_SENSES.has(a.sense)
  )
}
