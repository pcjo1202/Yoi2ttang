import { Progress } from "@/components/common/progress"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useEffect, useState } from "react"

const meta: Meta<typeof Progress> = {
  title: "Common/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "진행률 (0-100)",
    },
    className: {
      control: "text",
      description: "프로그레스 바 컨테이너 스타일",
    },
    indicatorClassName: {
      control: "text",
      description: "프로그레스 인디케이터 스타일",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 진행률 바
export const Default: Story = {
  args: {
    value: 50,
  },
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
      <p className="mt-2 text-sm text-gray-600">진행률: {args.value}%</p>
    </div>
  ),
}

// 0% 상태
export const Empty: Story = {
  args: {
    value: 0,
  },
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
      <p className="mt-2 text-sm text-gray-600">시작하지 않음</p>
    </div>
  ),
}

// 100% 완료 상태
export const Complete: Story = {
  args: {
    value: 100,
  },
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
      <p className="mt-2 text-sm text-green-600">완료!</p>
    </div>
  ),
}

// 커스텀 스타일
export const CustomStyle: Story = {
  args: {
    value: 75,
    className: "h-2 bg-gray-200",
    indicatorClassName: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
      <p className="mt-2 text-sm text-gray-600">커스텀 스타일 (75%)</p>
    </div>
  ),
}

// 다양한 크기
export const DifferentSizes: Story = {
  render: () => (
    <div className="w-80 space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">작은 크기</p>
        <Progress value={30} className="h-1" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">기본 크기</p>
        <Progress value={50} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">큰 크기</p>
        <Progress value={70} className="h-6" />
      </div>
    </div>
  ),
}

// 다양한 색상
export const DifferentColors: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium">기본 (파란색)</p>
        <Progress value={60} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">성공 (녹색)</p>
        <Progress
          value={80}
          indicatorClassName="bg-green-500"
          className="bg-green-100"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">경고 (노란색)</p>
        <Progress
          value={40}
          indicatorClassName="bg-yellow-500"
          className="bg-yellow-100"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">위험 (빨간색)</p>
        <Progress
          value={90}
          indicatorClassName="bg-red-500"
          className="bg-red-100"
        />
      </div>
    </div>
  ),
}

// 애니메이션 진행률 바
export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0
          }
          return prev + 1
        })
      }, 100)

      return () => clearInterval(timer)
    }, [])

    return (
      <div className="w-80">
        <Progress value={progress} />
        <p className="mt-2 text-sm text-gray-600">자동 진행: {progress}%</p>
      </div>
    )
  },
}

// 단계별 진행률 (라벨 포함)
export const WithLabels: Story = {
  render: () => {
    const steps = [
      { label: "계정 생성", progress: 25 },
      { label: "정보 입력", progress: 50 },
      { label: "이메일 인증", progress: 75 },
      { label: "완료", progress: 100 },
    ]

    const [currentStep, setCurrentStep] = useState(0)

    return (
      <div className="w-80 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{steps[currentStep].label}</span>
            <span>{steps[currentStep].progress}%</span>
          </div>
          <Progress value={steps[currentStep].progress} />
        </div>

        <div className="flex gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`rounded px-3 py-1 text-xs ${
                currentStep === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}>
              단계 {index + 1}
            </button>
          ))}
        </div>
      </div>
    )
  },
}

// 파일 업로드 진행률 시뮬레이션
export const FileUpload: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)

    const simulateUpload = () => {
      setIsUploading(true)
      setUploadProgress(0)

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 100
          }
          // 랜덤한 속도로 업로드 시뮬레이션
          return prev + Math.random() * 10
        })
      }, 200)
    }

    return (
      <div className="w-80 space-y-4">
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
          <div className="mb-4 text-gray-600">
            {isUploading ? "업로드 중..." : "파일을 업로드하세요"}
          </div>

          {(isUploading || uploadProgress > 0) && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="bg-blue-100" />
              <div className="text-sm text-gray-600">
                {uploadProgress.toFixed(0)}% 완료
                {uploadProgress >= 100 && " ✓"}
              </div>
            </div>
          )}

          <button
            onClick={simulateUpload}
            disabled={isUploading}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
            {isUploading ? "업로드 중..." : "업로드 시작"}
          </button>
        </div>
      </div>
    )
  },
}
