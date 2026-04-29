import type { Meta, StoryObj } from '@storybook/react-vite'
import { ResultsPhase } from '@/components/ResultsPhase'
import { deriveAnnotations } from '@/services/analysisService'

const meta: Meta<typeof ResultsPhase> = {
  component: ResultsPhase,
}
export default meta

type Story = StoryObj<typeof ResultsPhase>

const sampleText =
  'The old wool blanket scratched against her arms as the sharp scent of cedar filled the room. Outside, rain hammered the tin roof in a steady roar. Her tongue still held the bitter aftertaste of cold coffee.'

const sampleAnnotations = deriveAnnotations(sampleText, [
  { phrase: 'scratched against her arms', sense: 'touch' },
  { phrase: 'sharp scent of cedar', sense: 'smell' },
  { phrase: 'rain hammered the tin roof', sense: 'sound' },
  { phrase: 'bitter aftertaste of cold coffee', sense: 'taste' },
])

export const Default: Story = {
  args: {
    word: 'Harbor',
    text: sampleText,
    annotations: sampleAnnotations,
    onReset: () => {},
  },
}
