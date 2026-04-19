import type { Meta, StoryObj } from '@storybook/react-vite'
import { Exercise } from '../components/Exercise'

const meta: Meta<typeof Exercise> = {
  component: Exercise,
}
export default meta

type Story = StoryObj<typeof Exercise>

const sampleText =
  'The old wool blanket scratched against her arms as the sharp scent of cedar filled the room. Outside, rain hammered the tin roof in a steady roar. Her tongue still held the bitter aftertaste of cold coffee.'

const sampleAnnotations = [
  { phrase: 'scratched against her arms', sense: 'touch' as const, startIndex: 18, endIndex: 43 },
  { phrase: 'sharp scent of cedar', sense: 'smell' as const, startIndex: 51, endIndex: 71 },
  { phrase: 'rain hammered the tin roof', sense: 'sound' as const, startIndex: 89, endIndex: 114 },
  { phrase: 'bitter aftertaste of cold coffee', sense: 'taste' as const, startIndex: 149, endIndex: 181 },
]

export const Idle: Story = {}

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
    initialText: sampleText,
    initialAnnotations: sampleAnnotations,
  },
}
