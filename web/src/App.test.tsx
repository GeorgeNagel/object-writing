import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

test('shows API key form on load', () => {
  render(<App />)
  expect(screen.getByLabelText('Anthropic API Key')).toBeInTheDocument()
})

test('shows exercise start screen after API key is submitted', () => {
  render(<App />)
  fireEvent.change(screen.getByLabelText('Anthropic API Key'), {
    target: { value: 'sk-ant-test-key' },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
  expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
})
