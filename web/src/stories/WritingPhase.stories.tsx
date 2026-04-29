import type { Meta, StoryObj } from '@storybook/react-vite'
import { WritingPhase } from '@/components/WritingPhase'

const meta: Meta<typeof WritingPhase> = {
  component: WritingPhase,
}
export default meta

type Story = StoryObj<typeof WritingPhase>

const sampleText =
  'The old wool blanket scratched against her arms as the sharp scent of cedar filled the room.'

export const Default: Story = {
  args: {
    phase: 'running',
    word: 'Harbor',
    text: sampleText,
    onTextChange: () => {},
    durationSeconds: 600,
    onExpire: () => {},
  },
}

export const Analyzing: Story = {
  args: {
    phase: 'analyzing',
    word: 'Harbor',
    text: sampleText,
    onTextChange: () => {},
    durationSeconds: 600,
    onExpire: () => {},
  },
}
