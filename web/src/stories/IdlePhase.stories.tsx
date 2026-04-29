import type { Meta, StoryObj } from '@storybook/react-vite'
import { IdlePhase } from '@/components/IdlePhase'

const meta: Meta<typeof IdlePhase> = {
  component: IdlePhase,
}
export default meta

type Story = StoryObj<typeof IdlePhase>

export const Default: Story = {
  args: {
    apiKey: '',
    onApiKeyChange: () => {},
    apiKeyError: null,
    durationSeconds: 600,
    onDurationChange: () => {},
    isValidating: false,
    onStart: () => {},
  },
}

export const WithApiKeyError: Story = {
  args: {
    apiKey: 'sk-ant-invalid-key',
    onApiKeyChange: () => {},
    apiKeyError: 'Invalid or revoked API key.',
    durationSeconds: 600,
    onDurationChange: () => {},
    isValidating: false,
    onStart: () => {},
  },
}

export const Validating: Story = {
  args: {
    apiKey: 'sk-ant-test-key',
    onApiKeyChange: () => {},
    apiKeyError: null,
    durationSeconds: 600,
    onDurationChange: () => {},
    isValidating: true,
    onStart: () => {},
  },
}
