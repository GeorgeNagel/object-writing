import { useState } from 'react'
import { Editor } from './Editor'
import { Timer } from './Timer'
import { Results } from './Results'
import { analyzeText } from '../services/analysisService'
import type { SensoryAnnotation } from '../services/analysisService'
import { getRandomWord } from '../services/wordService'

type Phase = 'idle' | 'running' | 'analyzing' | 'done'

interface ExerciseProps {
  apiKey: string
}

export function Exercise({ apiKey }: ExerciseProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [word, setWord] = useState('')
  const [text, setText] = useState('')
  const [annotations, setAnnotations] = useState<SensoryAnnotation[] | null>(null)

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
  }

  if (phase === 'idle') {
    return (
      <div>
        <button onClick={handleStart}>Start</button>
      </div>
    )
  }

  if (phase === 'done' && annotations !== null) {
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
    return (
      <Results
        text={text}
        annotations={annotations}
        wordCount={wordCount}
        onStartNew={handleReset}
      />
    )
  }

  return (
    <div>
      <h2>{word}</h2>
      {phase === 'running' && <Timer onExpire={handleExpire} />}
      <Editor value={text} onChange={setText} disabled={phase !== 'running'} />
      {phase === 'analyzing' && <p>Analyzing...</p>}
    </div>
  )
}
