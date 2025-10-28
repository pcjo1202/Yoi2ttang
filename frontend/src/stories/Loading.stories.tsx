import Loading from "@/components/common/Loading"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta: Meta<typeof Loading> = {
  title: "Common/Loading",
  component: Loading,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 로딩
export const Default: Story = {}

// 컨테이너 안에서의 로딩
export const InContainer: Story = {
  render: () => (
    <div className="relative h-64 w-96 rounded-lg border-2 border-gray-200">
      <Loading />
    </div>
  ),
  parameters: {
    layout: "centered",
  },
}

// 카드 내 로딩
export const InCard: Story = {
  render: () => (
    <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="relative h-48">
        <Loading />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">콘텐츠 로딩 중</h3>
        <p className="mt-2 text-gray-600">
          데이터를 불러오는 동안 잠시 기다려주세요.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
}

// 모달 내 로딩
export const InModal: Story = {
  render: () => (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
      <div className="relative h-64 w-96 rounded-lg bg-white">
        <Loading />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
          <p className="text-sm text-gray-600">처리 중...</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
}

// 버튼 로딩 상태
export const ButtonLoading: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <h3 className="mb-4 text-lg font-semibold">버튼 로딩 상태</h3>

      <div className="space-y-4">
        <button
          disabled
          className="flex w-full items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-white opacity-75">
          <div className="relative mr-2 h-5 w-5">
            <div className="h-full w-full animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          </div>
          처리 중...
        </button>

        <button
          disabled
          className="flex w-full items-center justify-center rounded-lg bg-green-500 px-4 py-2 text-white opacity-75">
          <div className="relative mr-2 h-5 w-5">
            <div className="h-full w-full animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          </div>
          저장하는 중...
        </button>
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
}

// 페이지 전환 로딩
export const PageTransition: Story = {
  render: () => (
    <div className="relative min-h-screen bg-gray-50">
      <div className="bg-opacity-80 absolute inset-0 z-10 bg-white">
        <Loading />
      </div>

      {/* 백그라운드 콘텐츠 시뮬레이션 */}
      <div className="p-8 opacity-30">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 h-8 w-1/3 rounded bg-gray-300"></div>
          <div className="space-y-3">
            <div className="h-4 rounded bg-gray-300"></div>
            <div className="h-4 w-5/6 rounded bg-gray-300"></div>
            <div className="h-4 w-4/6 rounded bg-gray-300"></div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="h-32 rounded bg-gray-300"></div>
            <div className="h-32 rounded bg-gray-300"></div>
            <div className="h-32 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
}
