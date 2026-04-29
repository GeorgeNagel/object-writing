import { describe, it, expect } from 'vitest'
import { getRandomWord } from '@/services/wordService'
import words from '@/data/words.json'

describe('getRandomWord', () => {
  it('returns a string', () => {
    expect(typeof getRandomWord()).toBe('string')
  })

  it('returns a word from words.json', () => {
    const word = getRandomWord()
    expect(words).toContain(word)
  })

  it('can return different words across calls', () => {
    const results = new Set(Array.from({ length: 50 }, () => getRandomWord()))
    expect(results.size).toBeGreaterThan(1)
  })
})
