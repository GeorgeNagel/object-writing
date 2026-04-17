import { describe, expect, it, vi, beforeEach } from 'vitest'
import { parseAnnotations, analyzeText } from './analysisService'

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
      { phrase: 'bright sun', sense: 'sight', startIndex: 0, endIndex: 10 },
      { phrase: 'rustling leaves', sense: 'sound', startIndex: 15, endIndex: 30 },
    ])
    const result = parseAnnotations(raw)
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({ phrase: 'bright sun', sense: 'sight', startIndex: 0, endIndex: 10 })
  })

  it('returns empty array for empty JSON array', () => {
    expect(parseAnnotations('[]')).toEqual([])
  })

  it('filters out entries with invalid sense values', () => {
    const raw = JSON.stringify([
      { phrase: 'warm bread', sense: 'taste', startIndex: 0, endIndex: 10 },
      { phrase: 'mystery thing', sense: 'emotion', startIndex: 11, endIndex: 25 },
    ])
    const result = parseAnnotations(raw)
    expect(result).toHaveLength(1)
    expect(result[0].sense).toBe('taste')
  })

  it('filters out entries missing required fields', () => {
    const raw = JSON.stringify([
      { phrase: 'good smell', sense: 'smell', startIndex: 0 },
      { sense: 'touch', startIndex: 0, endIndex: 5 },
    ])
    expect(parseAnnotations(raw)).toEqual([])
  })

  it('returns empty array when JSON is not an array', () => {
    expect(parseAnnotations('{}')).toEqual([])
  })

  it('accepts all seven valid senses', () => {
    const senses = ['sight', 'sound', 'smell', 'taste', 'touch', 'organic', 'kinesthetic']
    for (const sense of senses) {
      const raw = JSON.stringify([{ phrase: 'test', sense, startIndex: 0, endIndex: 4 }])
      const result = parseAnnotations(raw)
      expect(result).toHaveLength(1)
      expect(result[0].sense).toBe(sense)
    }
  })
})

describe('analyzeText', () => {
  it('returns parsed annotations from the API response', async () => {
    const mockAnnotations = [
      { phrase: 'golden light', sense: 'sight', startIndex: 0, endIndex: 12 },
    ]
    mockCreate.mockResolvedValue({
      content: [{ type: 'text', text: JSON.stringify(mockAnnotations) }],
    })

    const result = await analyzeText('golden light poured in', 'test-key')
    expect(result).toEqual(mockAnnotations)
  })

  it('returns empty array when API response content is not text', async () => {
    mockCreate.mockResolvedValue({
      content: [{ type: 'tool_use', id: 'x', name: 'y', input: {} }],
    })

    const result = await analyzeText('some text', 'test-key')
    expect(result).toEqual([])
  })
})
