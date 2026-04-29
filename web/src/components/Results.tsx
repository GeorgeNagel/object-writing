import { HighlightedText } from '@/components/HighlightedText'
import { Score } from '@/components/Score'
import { Button } from '@/components/Button'
import type { SensoryAnnotation } from '@/services/analysisService'
import styles from '@/components/Results.module.css'

interface ResultsProps {
  text: string
  annotations: SensoryAnnotation[]
  wordCount: number
  onStartNew: () => void
}

export function Results({ text, annotations, wordCount, onStartNew }: ResultsProps) {
  return (
    <div className={styles.results}>
      <HighlightedText text={text} annotations={annotations} />
      <Score annotations={annotations} wordCount={wordCount} />
      <Button onClick={onStartNew}>Start New Exercise</Button>
    </div>
  )
}
