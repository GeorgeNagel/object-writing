import type { Meta, StoryObj } from '@storybook/react-vite'
import { WordPrompt } from '../components/WordPrompt'

const meta: Meta<typeof WordPrompt> = {
  component: WordPrompt,
}
export default meta

type Story = StoryObj<typeof WordPrompt>

export const Default: Story = {
  args: {
    word: 'campfire',
  },
}
