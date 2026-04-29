import type { Meta, StoryObj } from '@storybook/react-vite'
import { HighlightedText } from '@/components/HighlightedText'

const meta: Meta<typeof HighlightedText> = {
  component: HighlightedText,
}
export default meta

type Story = StoryObj<typeof HighlightedText>

const text =
  'The crimson sunset blazed over the hills as thunder rumbled across the valley; woodsmoke drifted past, bitter coffee cooled against her palm, her heart hammered with effort, and deep in her gut something ancient stirred.'

export const Default: Story = {
  args: {
    text,
    annotations: [
      { phrase: 'crimson sunset blazed', sense: 'sight', startIndex: 4, endIndex: 25 },
      { phrase: 'thunder rumbled', sense: 'sound', startIndex: 44, endIndex: 59 },
      { phrase: 'woodsmoke drifted past', sense: 'smell', startIndex: 79, endIndex: 101 },
      { phrase: 'bitter coffee', sense: 'taste', startIndex: 103, endIndex: 116 },
      { phrase: 'cooled against her palm', sense: 'touch', startIndex: 117, endIndex: 140 },
      { phrase: 'heart hammered with effort', sense: 'kinesthetic', startIndex: 146, endIndex: 172 },
      { phrase: 'deep in her gut something ancient stirred', sense: 'organic', startIndex: 178, endIndex: 219 },
    ],
  },
}
