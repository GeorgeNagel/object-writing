import { useState } from 'react'

interface ApiKeyFormProps {
  onSubmit: (apiKey: string) => void
}

function ApiKeyForm({ onSubmit }: ApiKeyFormProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value.trim()) {
      setError('API key is required')
      return
    }
    setError(null)
    onSubmit(value.trim())
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="api-key">Anthropic API Key</label>
      <input
        id="api-key"
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <p role="alert">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  )
}

export default ApiKeyForm
