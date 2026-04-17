import { useState } from 'react'
import ApiKeyForm from './components/ApiKeyForm'

function App() {
  const [apiKey, setApiKey] = useState<string | null>(null)

  if (apiKey === null) {
    return <ApiKeyForm onSubmit={setApiKey} />
  }

  return <h1>Object Writing</h1>
}

export default App
