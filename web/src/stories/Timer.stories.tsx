import type { Meta, StoryObj } from '@storybook/react-vite'
import { Timer } from '@/components/Timer'

const meta: Meta<typeof Timer> = {
  component: Timer,
}
export default meta

type Story = StoryObj<typeof Timer>

export const Default: Story = {
  args: {
    durationSeconds: 600,
    onExpire: () => {},
  },
}
