import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Results } from '@/components/Results'
import type { SensoryAnnotation } from '@/services/analysisService'

const annotations: SensoryAnnotation[] = [
  { phrase: 'bright flame', sense: 'sight', startIndex: 0, endIndex: 12 },
  { phrase: 'crackling', sense: 'sound', startIndex: 13, endIndex: 22 },
]

describe('Results', () => {
  it('renders HighlightedText and Score with provided data', () => {
    render(
      <Results
        text="bright flame crackling logs"
        annotations={annotations}
        wordCount={4}
        onStartNew={() => {}}
      />
    )
    expect(screen.getByText('Words written: 4')).toBeInTheDocument()
    expect(screen.getByText('Senses used: 2')).toBeInTheDocument()
    expect(screen.getByText('bright flame', { exact: false })).toBeInTheDocument()
  })

  it('calls onStartNew when Start New Exercise button is clicked', () => {
    const onStartNew = vi.fn()
    render(
      <Results
        text="some text"
        annotations={[]}
        wordCount={2}
        onStartNew={onStartNew}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Start New Exercise' }))
    expect(onStartNew).toHaveBeenCalledOnce()
  })
})
