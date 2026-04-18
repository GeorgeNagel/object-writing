import type { Meta, StoryObj } from '@storybook/react-vite'
import { Editor } from '../components/Editor'

const meta: Meta<typeof Editor> = {
  component: Editor,
}
export default meta

type Story = StoryObj<typeof Editor>

export const Default: Story = {
  args: {
    value: 'The old wooden chair creaked under the weight of memory.',
    onChange: () => {},
  },
}
