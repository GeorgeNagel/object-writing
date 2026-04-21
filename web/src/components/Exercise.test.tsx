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

function fillApiKey(value = 'sk-ant-test-key') {
  fireEvent.change(screen.getByLabelText('Anthropic API Key'), {
    target: { value },
  })
}

describe('Exercise', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.mocked(analyzeText).mockResolvedValue([])
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Start button is disabled when API key field is empty', () => {
    render(<Exercise />)
    expect(screen.getByRole('button', { name: 'Start' })).toBeDisabled()
  })

  it('Start button is enabled when API key field has a value', () => {
    render(<Exercise />)
    fillApiKey()
    expect(screen.getByRole('button', { name: 'Start' })).toBeEnabled()
  })

  it('passes the entered API key to analyzeText on start', async () => {
    render(<Exercise />)
    fillApiKey('sk-ant-my-key')
    fireEvent.click(screen.getByRole('radio', { name: '1s' }))
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))

    act(() => { vi.advanceTimersByTime(1000) })

    await act(async () => { await Promise.resolve() })

    expect(vi.mocked(analyzeText)).toHaveBeenCalledWith(expect.any(String), 'sk-ant-my-key')
  })

  it('shows Start button on idle screen without revealing object word', () => {
    render(<Exercise />)
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
    expect(screen.queryByText('campfire')).not.toBeInTheDocument()
  })

  it('shows duration options on idle screen with 10m selected by default', () => {
    render(<Exercise />)
    expect(screen.getByRole('radio', { name: '1s' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '10s' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '30s' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '10m' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '10m' })).toBeChecked()
  })

  it('allows selecting a different duration', () => {
    render(<Exercise />)
    fireEvent.click(screen.getByRole('radio', { name: '30s' }))
    expect(screen.getByRole('radio', { name: '30s' })).toBeChecked()
    expect(screen.getByRole('radio', { name: '10m' })).not.toBeChecked()
  })

  it('reveals object word, editor, and timer after clicking Start', () => {
    render(<Exercise />)
    fillApiKey()
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    expect(screen.getByText('campfire')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('10:00')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument()
  })

  it('timer runs for the selected duration', () => {
    render(<Exercise />)
    fillApiKey()
    fireEvent.click(screen.getByRole('radio', { name: '30s' }))
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    expect(screen.getByText('00:30')).toBeInTheDocument()
  })

  it('locks editor and shows loading when timer expires', async () => {
    render(<Exercise />)
    fillApiKey()
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))

    for (let i = 0; i < 600; i++) {
      act(() => { vi.advanceTimersByTime(1000) })
    }

    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByText('Analyzing\u2026')).toBeInTheDocument()
  })

  it('clears loading state after analysis completes', async () => {
    render(<Exercise />)
    fillApiKey()
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))

    for (let i = 0; i < 600; i++) {
      act(() => { vi.advanceTimersByTime(1000) })
    }

    await act(async () => {
      await Promise.resolve()
    })

    expect(screen.queryByText('Analyzing\u2026')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start New Exercise' })).toBeInTheDocument()
  })

  it('shows object word on results screen', async () => {
    render(<Exercise />)
    fillApiKey()
    fireEvent.click(screen.getByRole('radio', { name: '1s' }))
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))

    act(() => { vi.advanceTimersByTime(1000) })

    await act(async () => { await Promise.resolve() })

    expect(screen.getByRole('heading', { name: 'campfire' })).toBeInTheDocument()
  })

  it('returns to duration selection screen after clicking Start new session', async () => {
    render(<Exercise />)
    fillApiKey()
    fireEvent.click(screen.getByRole('radio', { name: '1s' }))
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))

    act(() => { vi.advanceTimersByTime(1000) })

    await act(async () => { await Promise.resolve() })

    fireEvent.click(screen.getByRole('button', { name: 'Start New Exercise' }))

    expect(screen.getByRole('radio', { name: '10m' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
  })
})
