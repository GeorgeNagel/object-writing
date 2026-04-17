import { useEffect, useRef, useState } from 'react'

interface TimerProps {
  durationSeconds?: number
  onExpire: () => void
}

export function Timer({ durationSeconds = 600, onExpire }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          clearInterval(id)
          onExpireRef.current()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')

  return <div>{mm}:{ss}</div>
}
