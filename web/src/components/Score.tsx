import type { SensoryAnnotation, Sense } from '../services/analysisService'

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
    <div>
      <p>Words written: {wordCount}</p>
      <p>Senses used: {usedSenses.length}</p>
      {usedSenses.length > 0 && (
        <ul>
          {usedSenses.map((sense) => (
            <li key={sense}>
              {sense}: {senseCounts[sense]}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
