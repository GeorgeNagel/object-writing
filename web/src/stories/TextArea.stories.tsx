import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextArea } from '@/components/TextArea'

const meta: Meta<typeof TextArea> = {
  component: TextArea,
}
export default meta

type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
}

export const WithText: Story = {
  args: {
    value: 'The old wooden chair creaked under the weight of memory.',
    onChange: () => {},
  },
}

export const Disabled: Story = {
  args: {
    value: 'The old wooden chair creaked under the weight of memory.',
    onChange: () => {},
    disabled: true,
  },
}
