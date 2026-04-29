import { Editor } from '@/components/Editor'
import { Timer } from '@/components/Timer'
import { WordPrompt } from '@/components/WordPrompt'
import styles from '@/components/Exercise.module.css'

interface WritingPhaseProps {
  phase: 'running' | 'analyzing'
  word: string
  text: string
  onTextChange: (text: string) => void
  durationSeconds: number
  onExpire: () => void
}

export function WritingPhase({ phase, word, text, onTextChange, durationSeconds, onExpire }: WritingPhaseProps) {
  return (
    <div className={styles.writingScreen}>
      <WordPrompt word={word} />
      {phase === 'running' && (
        <Timer durationSeconds={durationSeconds} onExpire={onExpire} />
      )}
      <Editor value={text} onChange={onTextChange} disabled={phase !== 'running'} />
      {phase === 'analyzing' && <p className={styles.analyzingText}>Analyzing…</p>}
    </div>
  )
}
