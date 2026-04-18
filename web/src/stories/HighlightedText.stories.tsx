import type { Meta, StoryObj } from '@storybook/react'
import { HighlightedText } from '../components/HighlightedText'

const meta: Meta<typeof HighlightedText> = {
  component: HighlightedText,
}
export default meta

type Story = StoryObj<typeof HighlightedText>

const text = 'The sharp scent of pine filled the cold air as leaves rustled overhead.'

export const Default: Story = {
  args: {
    text,
    annotations: [
      { phrase: 'sharp scent of pine', sense: 'smell', startIndex: 4, endIndex: 23 },
      { phrase: 'cold air', sense: 'touch', startIndex: 35, endIndex: 43 },
      { phrase: 'leaves rustled', sense: 'sound', startIndex: 47, endIndex: 61 },
    ],
  },
}
