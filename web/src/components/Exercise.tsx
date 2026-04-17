import { useState } from 'react'
import { Editor } from './Editor'
import { Timer } from './Timer'
import { HighlightedText } from './HighlightedText'
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

  if (phase === 'idle') {
    return (
      <div>
        <button onClick={handleStart}>Start</button>
      </div>
    )
  }

  return (
    <div>
      <h2>{word}</h2>
      {phase === 'running' && <Timer onExpire={handleExpire} />}
      <Editor value={text} onChange={setText} disabled={phase !== 'running'} />
      {phase === 'analyzing' && <p>Analyzing...</p>}
      {phase === 'done' && annotations !== null && (
        <HighlightedText text={text} annotations={annotations} />
      )}
    </div>
  )
}
