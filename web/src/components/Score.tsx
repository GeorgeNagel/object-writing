import type { SensoryAnnotation, Sense } from '@/services/analysisService'
import styles from '@/components/Score.module.css'

interface ScoreProps {
  annotations: SensoryAnnotation[]
  wordCount: number
}

export function Score({ annotations, wordCount }: ScoreProps) {
  const senseCounts = annotations.reduce<Record<string, number>>((acc, ann) => {
    acc[ann.sense] = (acc[ann.sense] ?? 0) + 1
    return acc
  }, {})

  const usedSenses = Object.keys(senseCounts) as Sense[]

  return (
    <div className={styles.score}>
      <p className={styles.stat}>Words written: {wordCount}</p>
      <p className={styles.stat}>Senses used: {usedSenses.length}</p>
      {usedSenses.length > 0 && (
        <ul className={styles.senseList}>
          {usedSenses.map((sense) => (
            <li key={sense} className={styles.senseItem}>{sense}: {senseCounts[sense]}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
