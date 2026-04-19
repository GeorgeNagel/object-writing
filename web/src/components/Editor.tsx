import { useEffect, useRef } from 'react'
import styles from './Editor.module.css'

interface EditorProps {
  value: string
  onChange: (text: string) => void
  disabled?: boolean
}

export function Editor({ value, onChange, disabled = false }: EditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  return (
    <textarea
      ref={ref}
      className={styles.editor}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
    />
  )
}
