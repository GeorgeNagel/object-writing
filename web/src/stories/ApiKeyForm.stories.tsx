import type { Meta, StoryObj } from '@storybook/react'
import ApiKeyForm from '../components/ApiKeyForm'

const meta: Meta<typeof ApiKeyForm> = {
  component: ApiKeyForm,
}
export default meta

type Story = StoryObj<typeof ApiKeyForm>

export const Default: Story = {
  args: {
    onSubmit: () => {},
  },
}
