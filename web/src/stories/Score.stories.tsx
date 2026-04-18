import type { Meta, StoryObj } from '@storybook/react'
import { Score } from '../components/Score'

const meta: Meta<typeof Score> = {
  component: Score,
}
export default meta

type Story = StoryObj<typeof Score>

export const Default: Story = {
  args: {
    wordCount: 42,
    annotations: [
      { phrase: 'sharp scent', sense: 'smell', startIndex: 4, endIndex: 15 },
      { phrase: 'cold air', sense: 'touch', startIndex: 35, endIndex: 43 },
      { phrase: 'rustled', sense: 'sound', startIndex: 54, endIndex: 61 },
    ],
  },
}
