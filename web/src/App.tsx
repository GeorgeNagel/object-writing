import { useState } from 'react'
import ApiKeyForm from './components/ApiKeyForm'
import { Exercise } from './components/Exercise'

function App() {
  const [apiKey, setApiKey] = useState<string | null>(null)

  if (apiKey === null) {
    return <ApiKeyForm onSubmit={setApiKey} />
  }

  return <Exercise apiKey={apiKey} />
}

export default App
