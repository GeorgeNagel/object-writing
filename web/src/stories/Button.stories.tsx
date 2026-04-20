import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../components/Button'

const meta: Meta<typeof Button> = {
  component: Button,
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Start',
    onClick: () => {},
  },
}

export const Disabled: Story = {
  args: {
    children: 'Start',
    disabled: true,
  },
}
