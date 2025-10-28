import { Checkbox } from "@/components/common/checkbox"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"

const meta: Meta<typeof Checkbox> = {
  title: "Common/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    checkClassName: {
      control: "text",
      description: "체크 아이콘 스타일 커스터마이징",
    },
    checkedBgClassName: {
      control: "text",
      description: "체크 상태일 때의 배경 색상 클래스",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 체크박스 (제어되지 않는 컴포넌트)
export const Default: Story = {
  args: {
    id: "default-checkbox",
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="default-checkbox" className="cursor-pointer text-sm">
        기본 체크박스
      </label>
    </div>
  ),
}

// 체크된 상태
export const Checked: Story = {
  args: {
    id: "checked-checkbox",
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="checked-checkbox" className="cursor-pointer text-sm">
        체크된 상태
      </label>
    </div>
  ),
}

// 비활성화된 상태
export const Disabled: Story = {
  args: {
    id: "disabled-checkbox",
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label
        htmlFor="disabled-checkbox"
        className="cursor-not-allowed text-sm text-gray-400">
        비활성화됨
      </label>
    </div>
  ),
}

// 체크되고 비활성화된 상태
export const CheckedDisabled: Story = {
  args: {
    id: "checked-disabled-checkbox",
    disabled: true,
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label
        htmlFor="checked-disabled-checkbox"
        className="cursor-not-allowed text-sm text-gray-400">
        체크되고 비활성화됨
      </label>
    </div>
  ),
}

// 커스텀 배경 색상
export const CustomBackground: Story = {
  args: {
    id: "custom-bg-checkbox",
    checkedBgClassName: "bg-green-500",
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <label htmlFor="custom-bg-checkbox" className="cursor-pointer text-sm">
        커스텀 배경 (녹색)
      </label>
    </div>
  ),
}

// 제어 컴포넌트 예제
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="controlled-checkbox"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <label
            htmlFor="controlled-checkbox"
            className="cursor-pointer text-sm">
            제어 컴포넌트 (상태: {checked ? "체크됨" : "체크 안됨"})
          </label>
        </div>
        <button
          onClick={() => setChecked(!checked)}
          className="w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          토글
        </button>
      </div>
    )
  },
}

// 체크박스 그룹 예제
export const CheckboxGroup: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const items = ["아이템 1", "아이템 2", "아이템 3", "아이템 4"]

    const handleItemChange = (item: string, checked: boolean) => {
      if (checked) {
        setSelectedItems([...selectedItems, item])
      } else {
        setSelectedItems(selectedItems.filter((i) => i !== item))
      }
    }

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">체크박스 그룹</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={selectedItems.includes(item)}
                onCheckedChange={(checked) =>
                  handleItemChange(item, checked as boolean)
                }
              />
              <label htmlFor={item} className="cursor-pointer text-sm">
                {item}
              </label>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          선택된 항목: {selectedItems.join(", ") || "없음"}
        </p>
      </div>
    )
  },
}
