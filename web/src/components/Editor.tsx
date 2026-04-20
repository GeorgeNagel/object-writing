import { useEffect, useRef } from 'react'
import { TextArea } from './TextArea'

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

  return <TextArea ref={ref} value={value} onChange={onChange} disabled={disabled} />
}
