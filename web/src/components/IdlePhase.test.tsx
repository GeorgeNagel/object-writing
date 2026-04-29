import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { IdlePhase } from '@/components/IdlePhase'

const defaultProps = {
  apiKey: '',
  onApiKeyChange: vi.fn(),
  apiKeyError: null,
  durationSeconds: 600,
  onDurationChange: vi.fn(),
  isValidating: false,
  onStart: vi.fn(),
}

describe('IdlePhase', () => {
  it('renders API key input', () => {
    render(<IdlePhase {...defaultProps} />)
    expect(screen.getByLabelText('Anthropic API Key')).toBeInTheDocument()
  })

  it('renders duration radio options', () => {
    render(<IdlePhase {...defaultProps} />)
    expect(screen.getByRole('radio', { name: '1s' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '10s' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '30s' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '10m' })).toBeInTheDocument()
  })

  it('reflects the current durationSeconds selection', () => {
    render(<IdlePhase {...defaultProps} durationSeconds={600} />)
    expect(screen.getByRole('radio', { name: '10m' })).toBeChecked()
  })

  it('Start button is disabled when apiKey is empty', () => {
    render(<IdlePhase {...defaultProps} apiKey="" />)
    expect(screen.getByRole('button', { name: 'Start' })).toBeDisabled()
  })

  it('Start button is enabled when apiKey has a value', () => {
    render(<IdlePhase {...defaultProps} apiKey="sk-ant-test" />)
    expect(screen.getByRole('button', { name: 'Start' })).toBeEnabled()
  })

  it('Start button shows Validating… and is disabled while validating', () => {
    render(<IdlePhase {...defaultProps} apiKey="sk-ant-test" isValidating={true} />)
    expect(screen.getByRole('button', { name: 'Validating…' })).toBeDisabled()
  })

  it('shows apiKeyError when provided', () => {
    render(<IdlePhase {...defaultProps} apiKeyError="Invalid or revoked API key." />)
    expect(screen.getByText('Invalid or revoked API key.')).toBeInTheDocument()
  })

  it('calls onApiKeyChange when the API key input changes', () => {
    const onApiKeyChange = vi.fn()
    render(<IdlePhase {...defaultProps} onApiKeyChange={onApiKeyChange} />)
    fireEvent.change(screen.getByLabelText('Anthropic API Key'), { target: { value: 'sk-new' } })
    expect(onApiKeyChange).toHaveBeenCalledWith('sk-new')
  })

  it('calls onDurationChange when a duration option is selected', () => {
    const onDurationChange = vi.fn()
    render(<IdlePhase {...defaultProps} onDurationChange={onDurationChange} />)
    fireEvent.click(screen.getByRole('radio', { name: '30s' }))
    expect(onDurationChange).toHaveBeenCalledWith(30)
  })

  it('calls onStart when Start button is clicked', () => {
    const onStart = vi.fn()
    render(<IdlePhase {...defaultProps} apiKey="sk-ant-test" onStart={onStart} />)
    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    expect(onStart).toHaveBeenCalled()
  })
})
