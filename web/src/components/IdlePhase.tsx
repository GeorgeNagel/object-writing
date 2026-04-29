import { Button } from '@/components/Button'
import { RadioGroup } from '@/components/RadioGroup'
import styles from '@/components/Exercise.module.css'

interface DurationOption {
  label: string
  seconds: number
}

export const DURATION_OPTIONS: DurationOption[] = [
  { label: '1s', seconds: 1 },
  { label: '10s', seconds: 10 },
  { label: '30s', seconds: 30 },
  { label: '10m', seconds: 600 },
]

interface IdlePhaseProps {
  apiKey: string
  onApiKeyChange: (key: string) => void
  apiKeyError: string | null
  durationSeconds: number
  onDurationChange: (s: number) => void
  isValidating: boolean
  onStart: () => void
}

export function IdlePhase({
  apiKey,
  onApiKeyChange,
  apiKeyError,
  durationSeconds,
  onDurationChange,
  isValidating,
  onStart,
}: IdlePhaseProps) {
  return (
    <div className={styles.idleScreen}>
      <div>
        <label className={styles.fieldLabel} htmlFor="api-key">Anthropic API Key</label>
        <input
          id="api-key"
          className={styles.apiKeyInput}
          type="password"
          aria-label="Anthropic API Key"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          aria-describedby={apiKeyError ? 'api-key-error' : undefined}
        />
        {apiKeyError && (
          <p id="api-key-error" className={styles.apiKeyError}>{apiKeyError}</p>
        )}
      </div>
      <div>
        <span className={styles.fieldLabel}>Duration</span>
        <RadioGroup
          name="duration"
          options={DURATION_OPTIONS.map(({ label, seconds }) => ({ label, value: seconds }))}
          value={durationSeconds}
          onChange={onDurationChange}
        />
      </div>
      <Button onClick={onStart} disabled={apiKey.trim() === '' || isValidating}>
        {isValidating ? 'Validating…' : 'Start'}
      </Button>
    </div>
  )
}
