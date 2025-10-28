import Skeleton from "@/components/common/skeleton"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta: Meta<typeof Skeleton> = {
  title: "Common/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "추가적인 CSS 클래스명",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 스켈레톤
export const Default: Story = {
  args: {
    className: "h-4 w-48",
  },
}

// 다양한 크기
export const DifferentSizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium">텍스트 라인</p>
        <Skeleton className="h-4 w-full" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">제목</p>
        <Skeleton className="h-6 w-2/3" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">아바타</p>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">버튼</p>
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  ),
}

// 카드 레이아웃 스켈레톤
export const CardSkeleton: Story = {
  render: () => (
    <div className="max-w-md">
      <div className="space-y-4 rounded-lg border border-gray-200 p-6">
        {/* 헤더 */}
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>

        {/* 이미지 */}
        <Skeleton className="h-48 w-full rounded-lg" />

        {/* 콘텐츠 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>

        {/* 액션 버튼 */}
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </div>
    </div>
  ),
}

// 리스트 스켈레톤
export const ListSkeleton: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 rounded-lg border border-gray-200 p-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-6 w-6 rounded" />
        </div>
      ))}
    </div>
  ),
}

// 테이블 스켈레톤
export const TableSkeleton: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <div className="overflow-hidden rounded-lg border border-gray-200">
        {/* 헤더 */}
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-14" />
          </div>
        </div>

        {/* 행들 */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="border-b border-gray-200 p-4 last:border-b-0">
            <div className="grid grid-cols-4 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

// 프로필 스켈레톤
export const ProfileSkeleton: Story = {
  render: () => (
    <div className="max-w-sm">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        {/* 프로필 이미지와 기본 정보 */}
        <div className="mb-6 flex flex-col items-center text-center">
          <Skeleton className="mb-4 h-24 w-24 rounded-full" />
          <Skeleton className="mb-2 h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* 통계 */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <Skeleton className="mx-auto mb-1 h-6 w-8" />
            <Skeleton className="mx-auto h-3 w-12" />
          </div>
          <div className="text-center">
            <Skeleton className="mx-auto mb-1 h-6 w-8" />
            <Skeleton className="mx-auto h-3 w-12" />
          </div>
          <div className="text-center">
            <Skeleton className="mx-auto mb-1 h-6 w-8" />
            <Skeleton className="mx-auto h-3 w-12" />
          </div>
        </div>

        {/* 설명 */}
        <div className="mb-6 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* 버튼 */}
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  ),
}

// 댓글 스켈레톤
export const CommentSkeleton: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="border-l-2 border-gray-200 pl-4">
          <div className="flex items-start space-x-3">
            <Skeleton className="h-8 w-8 flex-shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="flex space-x-4">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

// 대시보드 스켈레톤
export const DashboardSkeleton: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-5 rounded" />
            </div>
            <Skeleton className="mb-2 h-8 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>

      {/* 차트 영역 */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <Skeleton className="mb-6 h-6 w-32" />
        <Skeleton className="h-64 w-full rounded" />
      </div>
    </div>
  ),
}
