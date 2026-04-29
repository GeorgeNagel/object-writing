import { render, screen } from '@testing-library/react'
import App from '@/App'

test('shows exercise start screen on load', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
  expect(screen.getByLabelText('Anthropic API Key')).toBeInTheDocument()
})
