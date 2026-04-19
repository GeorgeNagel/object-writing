import { useEffect, useRef, useState } from 'react'
import styles from './Timer.module.css'

interface TimerProps {
  durationSeconds?: number
  onExpire: () => void
}

export function Timer({ durationSeconds = 600, onExpire }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds)
  const onExpireRef = useRef(onExpire)
  useEffect(() => {
    onExpireRef.current = onExpire
  })

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

  return <div className={styles.timer}>{mm}:{ss}</div>
}
