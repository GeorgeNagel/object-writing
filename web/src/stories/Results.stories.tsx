import type { Meta, StoryObj } from '@storybook/react-vite'
import { Results } from '@/components/Results'

const meta: Meta<typeof Results> = {
  component: Results,
}
export default meta

type Story = StoryObj<typeof Results>

const text = 'The sharp scent of pine filled the cold air as leaves rustled overhead.'

export const Default: Story = {
  args: {
    text,
    wordCount: 13,
    annotations: [
      { phrase: 'sharp scent of pine', sense: 'smell', startIndex: 4, endIndex: 23 },
      { phrase: 'cold air', sense: 'touch', startIndex: 35, endIndex: 43 },
      { phrase: 'leaves rustled', sense: 'sound', startIndex: 47, endIndex: 61 },
    ],
    onStartNew: () => {},
  },
}
