import { describe, expect, it, vi, beforeEach } from 'vitest'
import { parseAnnotations, deriveAnnotations, analyzeText } from './analysisService'

const mockCreate = vi.hoisted(() => vi.fn())

vi.mock('@anthropic-ai/sdk', () => ({
  default: class {
    messages = { create: mockCreate }
  },
}))

beforeEach(() => {
  mockCreate.mockReset()
})

describe('parseAnnotations', () => {
  it('parses a valid array of annotations', () => {
    const raw = JSON.stringify([
      { phrase: 'bright sun', sense: 'sight' },
      { phrase: 'rustling leaves', sense: 'sound' },
    ])
    const result = parseAnnotations(raw)
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({ phrase: 'bright sun', sense: 'sight' })
  })

  it('returns empty array for empty JSON array', () => {
    expect(parseAnnotations('[]')).toEqual([])
  })

  it('filters out entries with invalid sense values', () => {
    const raw = JSON.stringify([
      { phrase: 'warm bread', sense: 'taste' },
      { phrase: 'mystery thing', sense: 'emotion' },
    ])
    const result = parseAnnotations(raw)
    expect(result).toHaveLength(1)
    expect(result[0].sense).toBe('taste')
  })

  it('filters out entries missing required fields', () => {
    const raw = JSON.stringify([
      { sense: 'touch' },
      { phrase: 'good smell' },
    ])
    expect(parseAnnotations(raw)).toEqual([])
  })

  it('returns empty array when JSON is not an array', () => {
    expect(parseAnnotations('{}')).toEqual([])
  })

  it('accepts all seven valid senses', () => {
    const senses = ['sight', 'sound', 'smell', 'taste', 'touch', 'organic', 'kinesthetic']
    for (const sense of senses) {
      const raw = JSON.stringify([{ phrase: 'test', sense }])
      const result = parseAnnotations(raw)
      expect(result).toHaveLength(1)
      expect(result[0].sense).toBe(sense)
    }
  })
})

describe('deriveAnnotations', () => {
  it('derives correct indices from phrase position in text', () => {
    const text = 'dissolving on my tongue. caustic bubbles.'
    const result = deriveAnnotations(text, [{ phrase: 'caustic bubbles', sense: 'taste' }])
    expect(result).toEqual([{ phrase: 'caustic bubbles', sense: 'taste', startIndex: 25, endIndex: 40 }])
  })

  it('drops phrases not found in the text', () => {
    const result = deriveAnnotations('hello world', [{ phrase: 'xyz', sense: 'sight' }])
    expect(result).toEqual([])
  })

  it('handles multiple phrases', () => {
    const text = 'blaring sound and crunch underfoot'
    const result = deriveAnnotations(text, [
      { phrase: 'blaring sound', sense: 'sound' },
      { phrase: 'crunch underfoot', sense: 'kinesthetic' },
    ])
    expect(result[0].startIndex).toBe(0)
    expect(result[1].startIndex).toBe(text.indexOf('crunch underfoot'))
  })

  it('endIndex equals startIndex plus phrase length', () => {
    const text = 'a glass breaks loudly'
    const result = deriveAnnotations(text, [{ phrase: 'a glass breaks', sense: 'sound' }])
    expect(result[0].endIndex).toBe(result[0].startIndex + 'a glass breaks'.length)
  })
})

describe('analyzeText', () => {
  it('returns annotations with indices derived from the text', async () => {
    mockCreate.mockResolvedValue({
      content: [{ type: 'text', text: JSON.stringify([{ phrase: 'golden light', sense: 'sight' }]) }],
    })

    const result = await analyzeText('golden light poured in', 'test-key')
    expect(result).toEqual([{ phrase: 'golden light', sense: 'sight', startIndex: 0, endIndex: 12 }])
  })

  it('returns empty array when API response content is not text', async () => {
    mockCreate.mockResolvedValue({
      content: [{ type: 'tool_use', id: 'x', name: 'y', input: {} }],
    })

    const result = await analyzeText('some text', 'test-key')
    expect(result).toEqual([])
  })
})
