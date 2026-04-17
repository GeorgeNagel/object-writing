import { useEffect, useState } from 'react'

interface TimerProps {
  durationSeconds?: number
  onExpire: () => void
}

export function Timer({ durationSeconds = 6, onExpire }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds)

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire()
      return
    }
    const id = setTimeout(() => setSecondsLeft(s => s - 1), 1000)
    return () => clearTimeout(id)
  }, [secondsLeft, onExpire])

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  return <div>{mm}:{ss}</div>
}
