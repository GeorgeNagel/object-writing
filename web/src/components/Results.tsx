import { HighlightedText } from './HighlightedText'
import { Score } from './Score'
import { Button } from './Button'
import type { SensoryAnnotation } from '../services/analysisService'
import styles from './Results.module.css'

interface ResultsProps {
  text: string
  annotations: SensoryAnnotation[]
  wordCount: number
  onStartNew: () => void
}

export function Results({ text, annotations, wordCount, onStartNew }: ResultsProps) {
  return (
    <div className={styles.results}>
      <Score annotations={annotations} wordCount={wordCount} />
      <HighlightedText text={text} annotations={annotations} />
      <Button onClick={onStartNew}>Start New Exercise</Button>
    </div>
  )
}
