import { HighlightedText } from './HighlightedText'
import { Score } from './Score'
import type { SensoryAnnotation } from '../services/analysisService'

interface ResultsProps {
  text: string
  annotations: SensoryAnnotation[]
  wordCount: number
  onStartNew: () => void
}

export function Results({ text, annotations, wordCount, onStartNew }: ResultsProps) {
  return (
    <div>
      <Score annotations={annotations} wordCount={wordCount} />
      <HighlightedText text={text} annotations={annotations} />
      <button onClick={onStartNew}>Start New Exercise</button>
    </div>
  )
}
