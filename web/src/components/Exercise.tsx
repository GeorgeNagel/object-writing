import { useExercise } from '@/hooks/useExercise'
import type { Phase } from '@/hooks/useExercise'
import { IdlePhase } from '@/components/IdlePhase'
import { WritingPhase } from '@/components/WritingPhase'
import { ResultsPhase } from '@/components/ResultsPhase'
import type { SensoryAnnotation } from '@/services/analysisService'
import styles from '@/components/Exercise.module.css'

interface ExerciseProps {
  initialPhase?: Phase
  initialWord?: string
  initialText?: string
  initialAnnotations?: SensoryAnnotation[] | null
  initialApiKey?: string
  initialApiKeyError?: string | null
}

export function Exercise({
  initialPhase = 'idle',
  initialWord = '',
  initialText = '',
  initialAnnotations = null,
  initialApiKey = '',
  initialApiKeyError = null,
}: ExerciseProps) {
  const {
    phase,
    word,
    text,
    annotations,
    apiKey,
    durationSeconds,
    isValidating,
    apiKeyError,
    updateApiKey,
    setText,
    setDurationSeconds,
    handleStart,
    handleExpire,
    handleReset,
  } = useExercise({ initialPhase, initialWord, initialText, initialAnnotations, initialApiKey, initialApiKeyError })

  return (
    <div className={styles.container}>
      {phase === 'idle' && (
        <IdlePhase
          apiKey={apiKey}
          onApiKeyChange={updateApiKey}
          apiKeyError={apiKeyError}
          durationSeconds={durationSeconds}
          onDurationChange={setDurationSeconds}
          isValidating={isValidating}
          onStart={handleStart}
        />
      )}
      {(phase === 'running' || phase === 'analyzing') && (
        <WritingPhase
          phase={phase}
          word={word}
          text={text}
          onTextChange={setText}
          durationSeconds={durationSeconds}
          onExpire={handleExpire}
        />
      )}
      {phase === 'done' && annotations !== null && (
        <ResultsPhase
          word={word}
          text={text}
          annotations={annotations}
          onReset={handleReset}
        />
      )}
    </div>
  )
}
