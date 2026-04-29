import type { SensoryAnnotation, Sense } from '@/services/analysisService'
import styles from '@/components/HighlightedText.module.css'
import { SENSE_COLORS } from '@/constants/colors'

interface HighlightedTextProps {
  text: string
  annotations: SensoryAnnotation[]
}

interface Segment {
  text: string
  sense: Sense | null
}

function buildSegments(text: string, annotations: SensoryAnnotation[]): Segment[] {
  if (annotations.length === 0) return [{ text, sense: null }]

  // Sort by startIndex; on overlap keep the first one
  const sorted = [...annotations].sort((a, b) => a.startIndex - b.startIndex)

  const segments: Segment[] = []
  let cursor = 0

  for (const ann of sorted) {
    const start = Math.max(ann.startIndex, cursor)
    const end = Math.min(ann.endIndex, text.length)
    if (start >= end) continue // skip fully-overlapped or out-of-range

    if (start > cursor) {
      segments.push({ text: text.slice(cursor, start), sense: null })
    }
    segments.push({ text: text.slice(start, end), sense: ann.sense })
    cursor = end
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), sense: null })
  }

  return segments
}

export function HighlightedText({ text, annotations }: HighlightedTextProps) {
  const segments = buildSegments(text, annotations)
  const usedSenses = [...new Set(annotations.map((a) => a.sense))] as Sense[]

  return (
    <div>
      <p className={styles.text}>
        {segments.map((seg, i) =>
          seg.sense ? (
            <mark
              key={i}
              className={styles.highlight}
              style={{ backgroundColor: SENSE_COLORS[seg.sense] }}
              data-sense={seg.sense}
            >
              {seg.text}
            </mark>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </p>
      {usedSenses.length > 0 && (
        <div className={styles.legend} aria-label="color legend">
          {usedSenses.map((sense) => (
            <span key={sense} className={styles.legendItem}>
              <span
                className={styles.legendSwatch}
                style={{ backgroundColor: SENSE_COLORS[sense] }}
              />
              {sense}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
