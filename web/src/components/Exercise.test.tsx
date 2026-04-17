import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { Exercise } from './Exercise'

vi.mock('../services/wordService', () => ({
  getRandomWord: () => 'campfire',
}))

vi.mock('../services/analysisService', () => ({
  analyzeText: vi.fn(),
}))

import { analyzeText } from '../services/analysisService'

describe('Exercise', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.mocked(analyzeText).mockResolvedValue([])
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows Start button on idle screen without revealing object word', () => {
    render(<Exercise apiKey="test-key" />)
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
    expect(screen.queryByText('campfire')).not.toBeInTheDocument()
  })

  it('reveals object word, editor, and timer after clicking Start', () => {
    render(<Exercise apiKey="test-key" />)
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    expect(screen.getByText('campfire')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('10:00')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument()
  })

  it('locks editor and shows loading when timer expires', async () => {
    render(<Exercise apiKey="test-key" />)
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))

    // Expire the timer (600 seconds)
    for (let i = 0; i < 600; i++) {
      act(() => { vi.advanceTimersByTime(1000) })
    }

    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByText('Analyzing...')).toBeInTheDocument()
  })

  it('clears loading state after analysis completes', async () => {
    render(<Exercise apiKey="test-key" />)
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))

    for (let i = 0; i < 600; i++) {
      act(() => { vi.advanceTimersByTime(1000) })
    }

    await act(async () => {
      await Promise.resolve()
    })

    expect(screen.queryByText('Analyzing...')).not.toBeInTheDocument()
    expect(document.querySelector('p[style]')).toBeTruthy()
  })
})
