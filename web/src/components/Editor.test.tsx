import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Editor } from '@/components/Editor'

describe('Editor', () => {
  it('renders a textarea', () => {
    render(<Editor value="" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('auto-focuses on mount', () => {
    render(<Editor value="" onChange={() => {}} />)
    expect(document.activeElement).toBe(screen.getByRole('textbox'))
  })

  it('calls onChange with updated text on input', () => {
    const onChange = vi.fn()
    render(<Editor value="" onChange={onChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
    expect(onChange).toHaveBeenCalledWith('hello')
  })

  it('displays the current value', () => {
    render(<Editor value="some text" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveValue('some text')
  })

  it('disables the textarea when disabled prop is true', () => {
    render(<Editor value="" onChange={() => {}} disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
