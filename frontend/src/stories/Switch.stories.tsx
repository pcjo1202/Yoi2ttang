import { Switch } from "@/components/common/switch"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"

const meta: Meta<typeof Switch> = {
  title: "Common/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    name: {
      control: "text",
      description: "form에서 사용할 name 속성",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 스위치
export const Default: Story = {
  args: {
    id: "default-switch",
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <label htmlFor="default-switch" className="cursor-pointer text-sm">
        기본 스위치
      </label>
    </div>
  ),
}

// 활성화된 상태
export const Checked: Story = {
  args: {
    id: "checked-switch",
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <label htmlFor="checked-switch" className="cursor-pointer text-sm">
        활성화된 스위치
      </label>
    </div>
  ),
}

// 비활성화된 상태
export const Disabled: Story = {
  args: {
    id: "disabled-switch",
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <label
        htmlFor="disabled-switch"
        className="cursor-not-allowed text-sm text-gray-400">
        비활성화된 스위치
      </label>
    </div>
  ),
}

// 활성화되고 비활성화된 상태
export const CheckedDisabled: Story = {
  args: {
    id: "checked-disabled-switch",
    disabled: true,
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <label
        htmlFor="checked-disabled-switch"
        className="cursor-not-allowed text-sm text-gray-400">
        활성화되고 비활성화된 스위치
      </label>
    </div>
  ),
}

// 제어 컴포넌트
export const Controlled: Story = {
  render: () => {
    const [isOn, setIsOn] = useState(false)

    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="controlled-switch"
            checked={isOn}
            onCheckedChange={setIsOn}
          />
          <label htmlFor="controlled-switch" className="cursor-pointer text-sm">
            제어 스위치 (상태: {isOn ? "ON" : "OFF"})
          </label>
        </div>
        <button
          onClick={() => setIsOn(!isOn)}
          className="w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          토글
        </button>
      </div>
    )
  },
}

// 설정 그룹 예제
export const SettingsGroup: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      sounds: false,
    })

    const updateSetting = (key: keyof typeof settings, value: boolean) => {
      setSettings((prev) => ({ ...prev, [key]: value }))
    }

    return (
      <div className="w-80 space-y-4">
        <h3 className="text-lg font-semibold">설정</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="notifications" className="cursor-pointer text-sm">
              알림 받기
            </label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) =>
                updateSetting("notifications", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="darkMode" className="cursor-pointer text-sm">
              다크 모드
            </label>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => updateSetting("darkMode", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="autoSave" className="cursor-pointer text-sm">
              자동 저장
            </label>
            <Switch
              id="autoSave"
              checked={settings.autoSave}
              onCheckedChange={(checked) => updateSetting("autoSave", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="sounds" className="cursor-pointer text-sm">
              사운드 효과
            </label>
            <Switch
              id="sounds"
              checked={settings.sounds}
              onCheckedChange={(checked) => updateSetting("sounds", checked)}
            />
          </div>
        </div>

        <div className="rounded bg-gray-100 p-2 text-xs text-gray-600">
          <p>현재 설정:</p>
          <pre>{JSON.stringify(settings, null, 2)}</pre>
        </div>
      </div>
    )
  },
}

// 폼에서의 사용 예제
export const InForm: Story = {
  render: () => {
    return (
      <form className="w-80 space-y-4">
        <h3 className="text-lg font-semibold">회원가입 옵션</h3>

        <div className="flex items-center justify-between">
          <label htmlFor="agree-terms" className="cursor-pointer text-sm">
            이용약관에 동의합니다 (필수)
          </label>
          <Switch id="agree-terms" name="agreeTerms" />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="agree-marketing" className="cursor-pointer text-sm">
            마케팅 정보 수신에 동의합니다 (선택)
          </label>
          <Switch id="agree-marketing" name="agreeMarketing" />
        </div>

        <div className="flex items-center justify-between">
          <label
            htmlFor="subscribe-newsletter"
            className="cursor-pointer text-sm">
            뉴스레터 구독 (선택)
          </label>
          <Switch id="subscribe-newsletter" name="subscribeNewsletter" />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
          가입하기
        </button>
      </form>
    )
  },
}
