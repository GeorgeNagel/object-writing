import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

test('shows API key form on load', () => {
  render(<App />)
  expect(screen.getByLabelText('Anthropic API Key')).toBeInTheDocument()
})

test('shows main app after API key is submitted', () => {
  render(<App />)
  fireEvent.change(screen.getByLabelText('Anthropic API Key'), {
    target: { value: 'sk-ant-test-key' },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
  expect(screen.getByRole('heading', { name: 'Object Writing' })).toBeInTheDocument()
})
