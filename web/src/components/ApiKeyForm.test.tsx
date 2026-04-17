import { render, screen, fireEvent } from '@testing-library/react'
import ApiKeyForm from './ApiKeyForm'

test('shows validation error on empty submission', () => {
  const onSubmit = vi.fn()
  render(<ApiKeyForm onSubmit={onSubmit} />)

  fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

  expect(screen.getByRole('alert')).toBeInTheDocument()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('calls onSubmit with key on valid submission', () => {
  const onSubmit = vi.fn()
  render(<ApiKeyForm onSubmit={onSubmit} />)

  fireEvent.change(screen.getByLabelText('Anthropic API Key'), {
    target: { value: 'sk-ant-test-key' },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

  expect(onSubmit).toHaveBeenCalledWith('sk-ant-test-key')
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})
