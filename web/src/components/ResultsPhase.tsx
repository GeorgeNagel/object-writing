import { Results } from '@/components/Results'
import { WordPrompt } from '@/components/WordPrompt'
import type { SensoryAnnotation } from '@/services/analysisService'

interface ResultsPhaseProps {
  word: string
  text: string
  annotations: SensoryAnnotation[]
  onReset: () => void
}

export function ResultsPhase({ word, text, annotations, onReset }: ResultsPhaseProps) {
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  return (
    <>
      <WordPrompt word={word} />
      <Results
        text={text}
        annotations={annotations}
        wordCount={wordCount}
        onStartNew={onReset}
      />
    </>
  )
}
