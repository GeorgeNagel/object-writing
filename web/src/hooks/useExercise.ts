import { useState } from 'react'
import { analyzeText, validateApiKey } from '@/services/analysisService'
import type { SensoryAnnotation } from '@/services/analysisService'
import { getRandomWord } from '@/services/wordService'

export type Phase = 'idle' | 'running' | 'analyzing' | 'done'

const DEFAULT_DURATION = 600

interface UseExerciseOptions {
  initialPhase?: Phase
  initialWord?: string
  initialText?: string
  initialAnnotations?: SensoryAnnotation[] | null
  initialApiKey?: string
  initialApiKeyError?: string | null
}

export interface UseExerciseReturn {
  phase: Phase
  word: string
  text: string
  annotations: SensoryAnnotation[] | null
  apiKey: string
  durationSeconds: number
  isValidating: boolean
  apiKeyError: string | null
  updateApiKey: (key: string) => void
  setText: (text: string) => void
  setDurationSeconds: (s: number) => void
  handleStart: () => Promise<void>
  handleExpire: () => Promise<void>
  handleReset: () => void
}

export function useExercise({
  initialPhase = 'idle',
  initialWord = '',
  initialText = '',
  initialAnnotations = null,
  initialApiKey = '',
  initialApiKeyError = null,
}: UseExerciseOptions = {}): UseExerciseReturn {
  const [apiKey, setApiKey] = useState(initialApiKey)
  const [phase, setPhase] = useState<Phase>(initialPhase)
  const [word, setWord] = useState(initialWord)
  const [text, setText] = useState(initialText)
  const [annotations, setAnnotations] = useState<SensoryAnnotation[] | null>(initialAnnotations)
  const [durationSeconds, setDurationSeconds] = useState(DEFAULT_DURATION)
  const [isValidating, setIsValidating] = useState(false)
  const [apiKeyError, setApiKeyError] = useState<string | null>(initialApiKeyError)

  function updateApiKey(key: string) {
    setApiKey(key)
    setApiKeyError(null)
  }

  async function handleStart() {
    setIsValidating(true)
    setApiKeyError(null)
    try {
      await validateApiKey(apiKey)
    } catch (err) {
      setIsValidating(false)
      setApiKeyError(err instanceof Error ? err.message : 'Unexpected error — try again.')
      return
    }
    setIsValidating(false)
    setWord(getRandomWord())
    setPhase('running')
  }

  async function handleExpire() {
    setPhase('analyzing')
    const result = await analyzeText(text, apiKey)
    setAnnotations(result)
    setPhase('done')
  }

  function handleReset() {
    setPhase('idle')
    setWord('')
    setText('')
    setAnnotations(null)
    setDurationSeconds(DEFAULT_DURATION)
  }

  return {
    phase,
    word,
    text,
    annotations,
    apiKey,
    durationSeconds,
    isValidating,
    apiKeyError,
    updateApiKey,
    setText,
    setDurationSeconds,
    handleStart,
    handleExpire,
    handleReset,
  }
}
