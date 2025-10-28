import Input from "@/components/common/Input"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Lock, Mail, Phone, Search, User } from "lucide-react"

const meta: Meta<typeof Input> = {
  title: "Common/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "disabled", "error", "success"],
      description: "입력 필드 상태",
    },
    hasBorder: {
      control: "boolean",
      description: "테두리 표시 여부",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    type: {
      control: { type: "radio" },
      options: ["text", "email", "password", "number", "tel"],
      description: "입력 타입",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
    variant: "default",
  },
}

export const WithIcon: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
    Icon: <Search size={20} />,
    variant: "default",
  },
}

export const Email: Story = {
  args: {
    placeholder: "이메일을 입력하세요",
    Icon: <Mail size={20} />,
    type: "email",
    variant: "default",
  },
}

export const Password: Story = {
  args: {
    placeholder: "비밀번호를 입력하세요",
    Icon: <Lock size={20} />,
    type: "password",
    variant: "default",
  },
}

export const Error: Story = {
  args: {
    placeholder: "사용자명을 입력하세요",
    Icon: <User size={20} />,
    variant: "error",
  },
}

export const Success: Story = {
  args: {
    placeholder: "전화번호를 입력하세요",
    Icon: <Phone size={20} />,
    variant: "success",
    type: "tel",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "비활성화된 입력 필드",
    Icon: <User size={20} />,
    variant: "disabled",
  },
}

export const NoBorder: Story = {
  args: {
    placeholder: "테두리 없는 입력 필드",
    hasBorder: false,
    variant: "default",
  },
}
