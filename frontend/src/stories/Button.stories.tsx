import Button from "@/components/common/Button"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowRight, Download, Heart, Plus } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "outline"],
      description: "버튼 스타일 변형",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    onClick: { action: "clicked" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "기본 버튼",
    variant: "default",
  },
}

export const Outline: Story = {
  args: {
    children: "아웃라인 버튼",
    variant: "outline",
  },
}

export const Disabled: Story = {
  args: {
    children: "비활성화됨",
    disabled: true,
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus size={16} />
        추가하기
      </>
    ),
    variant: "default",
  },
}

export const IconOnly: Story = {
  args: {
    children: <Heart size={20} />,
    className: "p-3",
  },
}

export const LongText: Story = {
  args: {
    children: "매우 긴 텍스트가 포함된 버튼입니다",
    variant: "default",
  },
}

export const WithRightIcon: Story = {
  args: {
    children: (
      <>
        다운로드
        <Download size={16} />
      </>
    ),
    variant: "outline",
  },
}

export const CallToAction: Story = {
  args: {
    children: (
      <>
        시작하기
        <ArrowRight size={16} />
      </>
    ),
    className: "px-8 py-4 text-lg",
  },
}
