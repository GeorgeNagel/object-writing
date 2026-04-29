import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { HighlightedText } from '@/components/HighlightedText'
import type { SensoryAnnotation } from '@/services/analysisService'

describe('HighlightedText', () => {
  it('renders plain text when no annotations', () => {
    render(<HighlightedText text="A red ball." annotations={[]} />)
    expect(screen.getByText('A red ball.')).toBeTruthy()
    expect(screen.queryByLabelText('color legend')).toBeNull()
  })

  it('highlights annotated phrase with correct sense attribute', () => {
    const annotations: SensoryAnnotation[] = [
      { phrase: 'red', sense: 'sight', startIndex: 2, endIndex: 5 },
    ]
    render(<HighlightedText text="A red ball." annotations={annotations} />)
    const mark = document.querySelector('mark[data-sense="sight"]')
    expect(mark).toBeTruthy()
    expect(mark?.textContent).toBe('red')
  })

  it('renders text before and after annotation', () => {
    const annotations: SensoryAnnotation[] = [
      { phrase: 'red', sense: 'sight', startIndex: 2, endIndex: 5 },
    ]
    const { container } = render(<HighlightedText text="A red ball." annotations={annotations} />)
    expect(container.textContent).toContain('A ')
    expect(container.textContent).toContain(' ball.')
  })

  it('shows color legend for used senses', () => {
    const annotations: SensoryAnnotation[] = [
      { phrase: 'red', sense: 'sight', startIndex: 0, endIndex: 3 },
      { phrase: 'loud', sense: 'sound', startIndex: 4, endIndex: 8 },
    ]
    render(<HighlightedText text="red loud" annotations={annotations} />)
    const legend = screen.getByLabelText('color legend')
    expect(legend.textContent).toContain('sight')
    expect(legend.textContent).toContain('sound')
  })

  it('handles overlapping annotations without crashing', () => {
    const annotations: SensoryAnnotation[] = [
      { phrase: 'red ba', sense: 'sight', startIndex: 2, endIndex: 8 },
      { phrase: 'ba', sense: 'touch', startIndex: 6, endIndex: 8 },
    ]
    expect(() =>
      render(<HighlightedText text="A red ball." annotations={annotations} />)
    ).not.toThrow()
  })

  it('handles out-of-range annotations without crashing', () => {
    const annotations: SensoryAnnotation[] = [
      { phrase: 'xyz', sense: 'smell', startIndex: 100, endIndex: 103 },
    ]
    expect(() =>
      render(<HighlightedText text="Short text." annotations={annotations} />)
    ).not.toThrow()
  })

  it('renders all seven senses with distinct colors', () => {
    const senses = ['sight', 'sound', 'smell', 'taste', 'touch', 'organic', 'kinesthetic'] as const
    const text = senses.join(' ')
    let offset = 0
    const annotations: SensoryAnnotation[] = senses.map((sense) => {
      const start = offset
      const end = offset + sense.length
      offset = end + 1
      return { phrase: sense, sense, startIndex: start, endIndex: end }
    })
    render(<HighlightedText text={text} annotations={annotations} />)
    const marks = document.querySelectorAll('mark')
    const colors = new Set(Array.from(marks).map((m) => (m as HTMLElement).style.backgroundColor))
    expect(marks).toHaveLength(7)
    expect(colors.size).toBe(7)
  })
})
