import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { useExercise } from '@/hooks/useExercise'

vi.mock('../services/wordService', () => ({
  getRandomWord: () => 'campfire',
}))

vi.mock('../services/analysisService', () => ({
  analyzeText: vi.fn(),
  validateApiKey: vi.fn(),
}))

import { analyzeText, validateApiKey } from '@/services/analysisService'

describe('useExercise', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.mocked(analyzeText).mockResolvedValue([])
    vi.mocked(validateApiKey).mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with default state', () => {
    const { result } = renderHook(() => useExercise())
    expect(result.current.phase).toBe('idle')
    expect(result.current.word).toBe('')
    expect(result.current.text).toBe('')
    expect(result.current.annotations).toBeNull()
    expect(result.current.apiKey).toBe('')
    expect(result.current.durationSeconds).toBe(600)
    expect(result.current.isValidating).toBe(false)
    expect(result.current.apiKeyError).toBeNull()
  })

  it('initializes with provided initial values', () => {
    const { result } = renderHook(() =>
      useExercise({
        initialPhase: 'running',
        initialWord: 'harbor',
        initialText: 'some text',
        initialApiKey: 'sk-test',
        initialApiKeyError: 'bad key',
      })
    )
    expect(result.current.phase).toBe('running')
    expect(result.current.word).toBe('harbor')
    expect(result.current.text).toBe('some text')
    expect(result.current.apiKey).toBe('sk-test')
    expect(result.current.apiKeyError).toBe('bad key')
  })

  it('updateApiKey sets the api key and clears apiKeyError', () => {
    const { result } = renderHook(() => useExercise({ initialApiKeyError: 'bad key' }))
    act(() => { result.current.updateApiKey('sk-new') })
    expect(result.current.apiKey).toBe('sk-new')
    expect(result.current.apiKeyError).toBeNull()
  })

  it('handleStart sets isValidating while in flight', async () => {
    let resolveValidation!: () => void
    vi.mocked(validateApiKey).mockImplementation(
      () => new Promise<void>(resolve => { resolveValidation = resolve })
    )
    const { result } = renderHook(() => useExercise({ initialApiKey: 'sk-test' }))

    act(() => { void result.current.handleStart() })
    expect(result.current.isValidating).toBe(true)

    await act(async () => { resolveValidation() })
    expect(result.current.isValidating).toBe(false)
  })

  it('handleStart transitions to running and sets word on success', async () => {
    const { result } = renderHook(() => useExercise({ initialApiKey: 'sk-test' }))
    await act(async () => { await result.current.handleStart() })
    expect(result.current.phase).toBe('running')
    expect(result.current.word).toBe('campfire')
  })

  it('handleStart sets apiKeyError and stays idle on validation failure', async () => {
    vi.mocked(validateApiKey).mockRejectedValue(new Error('Invalid or revoked API key.'))
    const { result } = renderHook(() => useExercise({ initialApiKey: 'sk-bad' }))
    await act(async () => { await result.current.handleStart() })
    expect(result.current.phase).toBe('idle')
    expect(result.current.apiKeyError).toBe('Invalid or revoked API key.')
    expect(result.current.isValidating).toBe(false)
  })

  it('handleExpire transitions through analyzing to done and sets annotations', async () => {
    const annotations = [{ start: 0, end: 4, phrase: 'test', sense: 'touch' as const }]
    vi.mocked(analyzeText).mockResolvedValue(annotations)
    const { result } = renderHook(() =>
      useExercise({ initialPhase: 'running', initialApiKey: 'sk-test', initialText: 'test text' })
    )
    await act(async () => { await result.current.handleExpire() })
    expect(result.current.phase).toBe('done')
    expect(result.current.annotations).toEqual(annotations)
  })

  it('handleExpire calls analyzeText with text and apiKey', async () => {
    const { result } = renderHook(() =>
      useExercise({ initialPhase: 'running', initialApiKey: 'sk-test', initialText: 'my text' })
    )
    await act(async () => { await result.current.handleExpire() })
    expect(vi.mocked(analyzeText)).toHaveBeenCalledWith('my text', 'sk-test')
  })

  it('handleReset returns to idle and clears state', async () => {
    const { result } = renderHook(() =>
      useExercise({ initialPhase: 'done', initialWord: 'campfire', initialText: 'some text' })
    )
    act(() => { result.current.handleReset() })
    expect(result.current.phase).toBe('idle')
    expect(result.current.word).toBe('')
    expect(result.current.text).toBe('')
    expect(result.current.annotations).toBeNull()
    expect(result.current.durationSeconds).toBe(600)
  })
})
