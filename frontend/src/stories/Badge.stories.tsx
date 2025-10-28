import Badge from "@/components/common/Badge"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta: Meta<typeof Badge> = {
  title: "Common/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "추가적인 CSS 클래스명",
    },
    children: {
      control: "text",
      description: "배지 내부 콘텐츠",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "기본 배지",
  },
}

export const CustomColor: Story = {
  args: {
    children: "커스텀 배지",
    className: "bg-blue-500",
  },
}

export const Success: Story = {
  args: {
    children: "성공",
    className: "bg-green-500",
  },
}

export const Warning: Story = {
  args: {
    children: "경고",
    className: "bg-yellow-500",
  },
}

export const Error: Story = {
  args: {
    children: "오류",
    className: "bg-red-500",
  },
}

export const LongText: Story = {
  args: {
    children: "긴 텍스트가 포함된 배지",
    className: "bg-purple-500",
  },
}

export const WithEmoji: Story = {
  args: {
    children: "🎉 완료",
    className: "bg-indigo-500",
  },
}
