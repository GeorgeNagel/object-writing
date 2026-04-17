import type { SensoryAnnotation, Sense } from '../services/analysisService'

const SENSE_COLORS: Record<Sense, string> = {
  sight: '#FFF176',
  sound: '#80DEEA',
  smell: '#A5D6A7',
  taste: '#EF9A9A',
  touch: '#CE93D8',
  organic: '#FFCC80',
  kinesthetic: '#90CAF9',
}

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
      <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
        {segments.map((seg, i) =>
          seg.sense ? (
            <mark
              key={i}
              style={{ backgroundColor: SENSE_COLORS[seg.sense], padding: '0 2px', borderRadius: 2 }}
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }} aria-label="color legend">
          {usedSenses.map((sense) => (
            <span key={sense} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 14,
                  height: 14,
                  backgroundColor: SENSE_COLORS[sense],
                  borderRadius: 2,
                }}
              />
              {sense}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
