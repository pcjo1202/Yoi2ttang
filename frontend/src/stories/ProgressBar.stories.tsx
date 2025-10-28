import ProgressBar from "@/components/common/ProgressBar"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useEffect, useState } from "react"

// SVG 아이콘을 모킹 (스토리북에서는 실제 SVG 대신 사용)
const MockStepIcon = ({ className }: { className?: string }) => (
  <div
    className={className}
    style={{
      width: "2rem",
      height: "2rem",
      borderRadius: "50%",
      border: "2px solid currentColor",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.75rem",
      fontWeight: "bold",
    }}>
    ●
  </div>
)

// 스토리북용 ProgressBar 래퍼 (실제 컴포넌트 구조를 모방)
const StorybookProgressBar = ({
  value,
  stepCount,
  className,
  indicatorClassName,
}: {
  value: number
  stepCount: number
  className?: string
  indicatorClassName?: string
}) => {
  return (
    <div className="relative flex h-8 w-full items-center">
      {/* Progress 바 */}
      <div
        className={`bg-primary/20 relative h-3 w-full overflow-hidden rounded-full ${className || ""}`}>
        <div
          className={`bg-primary h-full flex-1 transition-transform ease-in-out ${indicatorClassName || ""}`}
          style={{ transform: `translateX(-${100 - value}%)` }}
        />
      </div>

      {/* 단계 아이콘들 */}
      <div className="absolute flex h-full w-full items-center justify-between">
        {Array.from({ length: stepCount }).map((_, index) => (
          <MockStepIcon
            key={index}
            className={`size-8 ${
              (100 / stepCount) * index <= value
                ? "text-blue-500"
                : "text-neutral-200"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const meta: Meta<typeof ProgressBar> = {
  title: "Common/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "진행률 (0-100)",
    },
    stepCount: {
      control: { type: "number", min: 2, max: 10 },
      description: "단계 개수",
    },
    className: {
      control: "text",
      description: "진행률 바 컨테이너 스타일",
    },
    indicatorClassName: {
      control: "text",
      description: "진행률 인디케이터 스타일",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 단계별 진행률 바
export const Default: Story = {
  args: {
    value: 50,
    stepCount: 4,
  },
  render: (args) => (
    <div className="w-80">
      <StorybookProgressBar {...args} />
      <p className="mt-2 text-sm text-gray-600">
        진행률: {args.value}% ({args.stepCount}단계)
      </p>
    </div>
  ),
}

// 3단계
export const ThreeSteps: Story = {
  args: {
    value: 33,
    stepCount: 3,
  },
  render: (args) => (
    <div className="w-80">
      <StorybookProgressBar {...args} />
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>시작</span>
        <span>진행 중</span>
        <span>완료</span>
      </div>
    </div>
  ),
}

// 5단계
export const FiveSteps: Story = {
  args: {
    value: 60,
    stepCount: 5,
  },
  render: (args) => (
    <div className="w-80">
      <StorybookProgressBar {...args} />
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </div>
  ),
}

// 완료 상태
export const Completed: Story = {
  args: {
    value: 100,
    stepCount: 4,
  },
  render: (args) => (
    <div className="w-80">
      <StorybookProgressBar {...args} />
      <p className="mt-2 text-sm font-medium text-green-600">
        모든 단계 완료! 🎉
      </p>
    </div>
  ),
}

// 시작 전 상태
export const NotStarted: Story = {
  args: {
    value: 0,
    stepCount: 4,
  },
  render: (args) => (
    <div className="w-80">
      <StorybookProgressBar {...args} />
      <p className="mt-2 text-sm text-gray-600">아직 시작하지 않음</p>
    </div>
  ),
}

// 커스텀 스타일
export const CustomStyle: Story = {
  args: {
    value: 75,
    stepCount: 4,
    className: "bg-purple-100",
    indicatorClassName: "bg-purple-500",
  },
  render: (args) => (
    <div className="w-80">
      <StorybookProgressBar {...args} />
      <p className="mt-2 text-sm text-purple-600">커스텀 보라색 테마</p>
    </div>
  ),
}

// 단계별 애니메이션
export const AnimatedSteps: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0)
    const stepCount = 5
    const stepLabels = ["계획", "설계", "개발", "테스트", "배포"]

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % (stepCount + 1))
      }, 1500)

      return () => clearInterval(timer)
    }, [])

    const progress = (100 / stepCount) * currentStep

    return (
      <div className="w-80">
        <StorybookProgressBar value={progress} stepCount={stepCount} />
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          {stepLabels.map((label, index) => (
            <span
              key={label}
              className={index < currentStep ? "text-yoi-500 font-medium" : ""}>
              {label}
            </span>
          ))}
        </div>
        <p className="mt-2 text-center text-sm">
          현재 단계:{" "}
          {currentStep === 0
            ? "시작 전"
            : stepLabels[currentStep - 1] || "완료"}
        </p>
      </div>
    )
  },
}

// 인터랙티브 단계별 진행
export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(0)
    const stepCount = 4
    const stepLabels = ["정보 입력", "결제", "확인", "완료"]
    const currentStepIndex = Math.floor((progress / 100) * stepCount)

    const goToStep = (stepIndex: number) => {
      const newProgress = (100 / stepCount) * stepIndex
      setProgress(newProgress)
    }

    const nextStep = () => {
      if (progress < 100) {
        setProgress((prev) => Math.min(prev + 100 / stepCount, 100))
      }
    }

    const prevStep = () => {
      if (progress > 0) {
        setProgress((prev) => Math.max(prev - 100 / stepCount, 0))
      }
    }

    return (
      <div className="w-80 space-y-4">
        <StorybookProgressBar value={progress} stepCount={stepCount} />

        <div className="flex justify-between text-xs">
          {stepLabels.map((label, index) => (
            <button
              key={label}
              onClick={() => goToStep(index + 1)}
              className={`rounded px-2 py-1 text-xs ${
                index < currentStepIndex
                  ? "text-yoi-500 font-medium"
                  : index === currentStepIndex
                    ? "bg-yoi-100 text-yoi-700"
                    : "text-gray-400"
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={prevStep}
            disabled={progress <= 0}
            className="flex-1 rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50">
            이전
          </button>
          <button
            onClick={nextStep}
            disabled={progress >= 100}
            className="flex-1 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
            다음
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          {progress === 0 && "시작해보세요!"}
          {progress > 0 &&
            progress < 100 &&
            `${currentStepIndex}/${stepCount} 단계 완료`}
          {progress === 100 && "모든 단계 완료! 🎉"}
        </div>
      </div>
    )
  },
}

// 여러 크기 비교
export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="w-64">
        <p className="mb-2 text-sm font-medium">작은 크기 (3단계)</p>
        <ProgressBar value={66} stepCount={3} />
      </div>
      <div className="w-80">
        <p className="mb-2 text-sm font-medium">보통 크기 (4단계)</p>
        <ProgressBar value={50} stepCount={4} />
      </div>
      <div className="w-96">
        <p className="mb-2 text-sm font-medium">큰 크기 (6단계)</p>
        <ProgressBar value={83} stepCount={6} />
      </div>
    </div>
  ),
}
