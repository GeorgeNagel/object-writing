import type { Meta, StoryObj } from '@storybook/react-vite'
import { Exercise } from '../components/Exercise'

const meta: Meta<typeof Exercise> = {
  component: Exercise,
}
export default meta

type Story = StoryObj<typeof Exercise>

export const Default: Story = {
  args: {
    apiKey: 'sk-placeholder',
  },
}
