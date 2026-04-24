import type { Meta, StoryObj } from '@storybook/react-vite'
import { Exercise } from '../components/Exercise'
import { deriveAnnotations } from '../services/analysisService'

const meta: Meta<typeof Exercise> = {
  component: Exercise,
}
export default meta

type Story = StoryObj<typeof Exercise>

const sampleText =
  'The old wool blanket scratched against her arms as the sharp scent of cedar filled the room. Outside, rain hammered the tin roof in a steady roar. Her tongue still held the bitter aftertaste of cold coffee.'

const sampleAnnotations = deriveAnnotations(sampleText, [
  { phrase: 'scratched against her arms', sense: 'touch' },
  { phrase: 'sharp scent of cedar', sense: 'smell' },
  { phrase: 'rain hammered the tin roof', sense: 'sound' },
  { phrase: 'bitter aftertaste of cold coffee', sense: 'taste' },
])

export const Idle: Story = {}

export const IdleApiKeyError: Story = {
  args: {
    initialApiKey: 'sk-ant-invalid-key',
    initialApiKeyError: 'Invalid or revoked API key.',
  },
}

export const IdleNetworkError: Story = {
  args: {
    initialApiKey: 'sk-ant-test-key',
    initialApiKeyError: 'Network error — check your connection and try again.',
  },
}

export const Running: Story = {
  args: {
    initialPhase: 'running',
    initialWord: 'Harbor',
    initialText: sampleText,
  },
}

export const Analyzing: Story = {
  args: {
    initialPhase: 'analyzing',
    initialWord: 'Harbor',
    initialText: sampleText,
  },
}

export const Done: Story = {
  args: {
    initialPhase: 'done',
    initialWord: 'Harbor',
    initialText: sampleText,
    initialAnnotations: sampleAnnotations,
  },
}
