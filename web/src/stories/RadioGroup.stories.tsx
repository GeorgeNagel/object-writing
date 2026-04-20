import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from '../components/RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
}
export default meta

type Story = StoryObj<typeof RadioGroup>

const options = [
  { label: '10s', value: 10 },
  { label: '30s', value: 30 },
  { label: '10m', value: 600 },
]

export const Default: Story = {
  args: {
    name: 'duration',
    options,
    value: null,
    onChange: () => {},
  },
}

export const Selected: Story = {
  args: {
    name: 'duration',
    options,
    value: 600,
    onChange: () => {},
  },
}

export const Disabled: Story = {
  args: {
    name: 'duration',
    options,
    value: 600,
    onChange: () => {},
    disabled: true,
  },
}
