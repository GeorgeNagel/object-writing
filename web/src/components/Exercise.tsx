import { useState } from 'react'
import { Editor } from './Editor'
import { Timer } from './Timer'
import { Results } from './Results'
import { Button } from './Button'
import { RadioGroup } from './RadioGroup'
import { analyzeText } from '../services/analysisService'
import type { SensoryAnnotation } from '../services/analysisService'
import { getRandomWord } from '../services/wordService'
import styles from './Exercise.module.css'

type Phase = 'idle' | 'running' | 'analyzing' | 'done'

interface DurationOption {
  label: string
  seconds: number
}

const DURATION_OPTIONS: DurationOption[] = [
  { label: '1s', seconds: 1 },
  { label: '10s', seconds: 10 },
  { label: '30s', seconds: 30 },
  { label: '10m', seconds: 600 },
]

const DEFAULT_DURATION = 600

interface ExerciseProps {
  initialPhase?: Phase
  initialWord?: string
  initialText?: string
  initialAnnotations?: SensoryAnnotation[] | null
  initialApiKey?: string
}

export function Exercise({
  initialPhase = 'idle',
  initialWord = '',
  initialText = '',
  initialAnnotations = null,
  initialApiKey = '',
}: ExerciseProps) {
  const [apiKey, setApiKey] = useState(initialApiKey)
  const [phase, setPhase] = useState<Phase>(initialPhase)
  const [word, setWord] = useState(initialWord)
  const [text, setText] = useState(initialText)
  const [annotations, setAnnotations] = useState<SensoryAnnotation[] | null>(initialAnnotations)
  const [durationSeconds, setDurationSeconds] = useState(DEFAULT_DURATION)

  function handleStart() {
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

  if (phase === 'idle') {
    return (
      <div className={styles.container}>
        <div className={styles.idleScreen}>
          <div>
            <label className={styles.fieldLabel} htmlFor="api-key">Anthropic API Key</label>
            <input
              id="api-key"
              className={styles.apiKeyInput}
              type="password"
              aria-label="Anthropic API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div>
            <span className={styles.fieldLabel}>Duration</span>
            <RadioGroup
              name="duration"
              options={DURATION_OPTIONS.map(({ label, seconds }) => ({ label, value: seconds }))}
              value={durationSeconds}
              onChange={setDurationSeconds}
            />
          </div>
          <Button onClick={handleStart} disabled={apiKey.trim() === ''}>
            Start
          </Button>
        </div>
      </div>
    )
  }

  if (phase === 'done' && annotations !== null) {
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
    return (
      <div className={styles.container}>
        <Results
          text={text}
          annotations={annotations}
          wordCount={wordCount}
          onStartNew={handleReset}
        />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.writingScreen}>
        <h2 className={styles.wordPrompt}>{word}</h2>
        {phase === 'running' && (
          <Timer durationSeconds={durationSeconds} onExpire={handleExpire} />
        )}
        <Editor value={text} onChange={setText} disabled={phase !== 'running'} />
        {phase === 'analyzing' && <p className={styles.analyzingText}>Analyzing…</p>}
      </div>
    </div>
  )
}
