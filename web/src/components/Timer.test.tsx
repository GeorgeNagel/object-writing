import { render, screen, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Timer } from '@/components/Timer'

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders initial time as 10:00', () => {
    render(<Timer onExpire={() => {}} />)
    expect(screen.getByText('10:00')).toBeInTheDocument()
  })

  it('counts down after one second', () => {
    render(<Timer onExpire={() => {}} />)
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText('09:59')).toBeInTheDocument()
  })

  it('fires onExpire when timer reaches zero', () => {
    const onExpire = vi.fn()
    render(<Timer durationSeconds={3} onExpire={onExpire} />)
    for (let i = 0; i < 3; i++) {
      act(() => {
        vi.advanceTimersByTime(1000)
      })
    }
    expect(onExpire).toHaveBeenCalledOnce()
  })
})
