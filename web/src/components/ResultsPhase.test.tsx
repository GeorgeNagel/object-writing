import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ResultsPhase } from '@/components/ResultsPhase'
import { deriveAnnotations } from '@/services/analysisService'

const sampleText = 'The fire crackled loudly in the night.'
const sampleAnnotations = deriveAnnotations(sampleText, [
  { phrase: 'fire crackled loudly', sense: 'sound' },
])

const defaultProps = {
  word: 'campfire',
  text: sampleText,
  annotations: sampleAnnotations,
  onReset: vi.fn(),
}

describe('ResultsPhase', () => {
  it('shows the word prompt', () => {
    render(<ResultsPhase {...defaultProps} />)
    expect(screen.getByRole('heading', { name: 'campfire' })).toBeInTheDocument()
  })

  it('renders the results', () => {
    render(<ResultsPhase {...defaultProps} />)
    expect(screen.getByRole('button', { name: 'Start New Exercise' })).toBeInTheDocument()
  })

  it('calls onReset when Start New Exercise is clicked', () => {
    const onReset = vi.fn()
    render(<ResultsPhase {...defaultProps} onReset={onReset} />)
    fireEvent.click(screen.getByRole('button', { name: 'Start New Exercise' }))
    expect(onReset).toHaveBeenCalled()
  })
})
