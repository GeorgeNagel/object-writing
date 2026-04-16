import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Object Writing heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Object Writing' })).toBeInTheDocument()
})
