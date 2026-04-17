import { useEffect, useRef } from 'react'

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

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
    />
  )
}
