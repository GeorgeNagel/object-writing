import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Score } from './Score'
import type { SensoryAnnotation } from '../services/analysisService'

const makeAnnotation = (sense: SensoryAnnotation['sense']): SensoryAnnotation => ({
  phrase: 'test',
  sense,
  startIndex: 0,
  endIndex: 4,
})

describe('Score', () => {
  it('displays total word count', () => {
    render(<Score annotations={[]} wordCount={42} />)
    expect(screen.getByText('Words written: 42')).toBeInTheDocument()
  })

  it('displays zero senses when no annotations', () => {
    render(<Score annotations={[]} wordCount={10} />)
    expect(screen.getByText('Senses used: 0')).toBeInTheDocument()
  })

  it('does not render sense list when no annotations', () => {
    render(<Score annotations={[]} wordCount={10} />)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('displays count of distinct senses used', () => {
    const annotations = [
      makeAnnotation('sight'),
      makeAnnotation('sound'),
      makeAnnotation('sight'),
    ]
    render(<Score annotations={annotations} wordCount={20} />)
    expect(screen.getByText('Senses used: 2')).toBeInTheDocument()
  })

  it('displays frequency for each sense used', () => {
    const annotations = [
      makeAnnotation('sight'),
      makeAnnotation('sound'),
      makeAnnotation('sight'),
    ]
    render(<Score annotations={annotations} wordCount={20} />)
    expect(screen.getByText('sight: 2')).toBeInTheDocument()
    expect(screen.getByText('sound: 1')).toBeInTheDocument()
  })

  it('renders with full results (all senses)', () => {
    const annotations: SensoryAnnotation[] = [
      'sight', 'sound', 'smell', 'taste', 'touch', 'organic', 'kinesthetic',
    ].map((s) => makeAnnotation(s as SensoryAnnotation['sense']))
    render(<Score annotations={annotations} wordCount={100} />)
    expect(screen.getByText('Senses used: 7')).toBeInTheDocument()
    expect(screen.getByRole('list').children).toHaveLength(7)
  })

  it('renders with partial results (some senses unused)', () => {
    const annotations = [makeAnnotation('touch'), makeAnnotation('taste'), makeAnnotation('touch')]
    render(<Score annotations={annotations} wordCount={15} />)
    expect(screen.getByText('Senses used: 2')).toBeInTheDocument()
    expect(screen.getByText('touch: 2')).toBeInTheDocument()
    expect(screen.getByText('taste: 1')).toBeInTheDocument()
    expect(screen.queryByText(/sight/)).not.toBeInTheDocument()
  })
})
