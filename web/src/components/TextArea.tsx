import { forwardRef } from 'react'
import styles from './TextArea.module.css'

interface TextAreaProps {
  value: string
  onChange: (text: string) => void
  disabled?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value, onChange, disabled = false }, ref) => {
    return (
      <textarea
        ref={ref}
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    )
  }
)

TextArea.displayName = 'TextArea'
