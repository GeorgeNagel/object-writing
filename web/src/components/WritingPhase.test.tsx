import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { WritingPhase } from '@/components/WritingPhase'

const defaultProps = {
  phase: 'running' as const,
  word: 'campfire',
  text: '',
  onTextChange: vi.fn(),
  durationSeconds: 10,
  onExpire: vi.fn(),
}

describe('WritingPhase', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('shows the word prompt', () => {
    render(<WritingPhase {...defaultProps} />)
    expect(screen.getByText('campfire')).toBeInTheDocument()
  })

  it('shows the timer when phase is running', () => {
    render(<WritingPhase {...defaultProps} phase="running" durationSeconds={30} />)
    expect(screen.getByText('00:30')).toBeInTheDocument()
  })

  it('does not show the timer when phase is analyzing', () => {
    render(<WritingPhase {...defaultProps} phase="analyzing" />)
    expect(screen.queryByRole('timer')).not.toBeInTheDocument()
  })

  it('shows the editor', () => {
    render(<WritingPhase {...defaultProps} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('editor is enabled when phase is running', () => {
    render(<WritingPhase {...defaultProps} phase="running" />)
    expect(screen.getByRole('textbox')).not.toBeDisabled()
  })

  it('editor is disabled when phase is analyzing', () => {
    render(<WritingPhase {...defaultProps} phase="analyzing" />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('shows Analyzing… when phase is analyzing', () => {
    render(<WritingPhase {...defaultProps} phase="analyzing" />)
    expect(screen.getByText('Analyzing…')).toBeInTheDocument()
  })

  it('does not show Analyzing… when phase is running', () => {
    render(<WritingPhase {...defaultProps} phase="running" />)
    expect(screen.queryByText('Analyzing…')).not.toBeInTheDocument()
  })

  it('calls onTextChange when editor content changes', () => {
    const onTextChange = vi.fn()
    render(<WritingPhase {...defaultProps} onTextChange={onTextChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
    expect(onTextChange).toHaveBeenCalledWith('hello')
  })

  it('calls onExpire when the timer expires', () => {
    const onExpire = vi.fn()
    render(<WritingPhase {...defaultProps} phase="running" durationSeconds={1} onExpire={onExpire} />)
    act(() => { vi.advanceTimersByTime(1000) })
    expect(onExpire).toHaveBeenCalled()
  })
})
