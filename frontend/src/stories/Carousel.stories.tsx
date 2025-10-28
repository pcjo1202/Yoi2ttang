import Carousel from "@/components/common/Carousel"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const meta: Meta<typeof Carousel> = {
  title: "Common/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    loop: {
      control: "boolean",
      description: "무한 루프 여부",
    },
    autoplay: {
      control: "boolean",
      description: "자동 재생 여부",
    },
    autoplayDelay: {
      control: { type: "number", min: 1000, max: 10000, step: 500 },
      description: "자동 재생 지연시간 (ms)",
    },
    scrollCount: {
      control: { type: "number", min: 0, max: 10 },
      description: "네비게이션 점 개수 (0이면 숨김)",
    },
    dragFree: {
      control: "boolean",
      description: "자유 드래그 여부",
    },
    skipSnaps: {
      control: "boolean",
      description: "스냅 스킵 여부",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 캐러셀
export const Default: Story = {
  args: {
    scrollCount: 3,
  },
  render: (args) => (
    <div className="w-96">
      <Carousel {...args}>
        <div className="flex-[0_0_100%] rounded-lg bg-blue-100 p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold">슬라이드 1</h3>
          <p className="text-gray-600">첫 번째 슬라이드 내용입니다.</p>
        </div>
        <div className="flex-[0_0_100%] rounded-lg bg-green-100 p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold">슬라이드 2</h3>
          <p className="text-gray-600">두 번째 슬라이드 내용입니다.</p>
        </div>
        <div className="flex-[0_0_100%] rounded-lg bg-purple-100 p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold">슬라이드 3</h3>
          <p className="text-gray-600">세 번째 슬라이드 내용입니다.</p>
        </div>
      </Carousel>
    </div>
  ),
}

// 자동 재생 캐러셀
export const Autoplay: Story = {
  args: {
    autoplay: true,
    autoplayDelay: 2000,
    loop: true,
    scrollCount: 4,
  },
  render: (args) => (
    <div className="w-96">
      <Carousel {...args}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`flex-[0_0_100%] rounded-lg p-8 text-center text-white ${
              ["bg-red-400", "bg-yellow-400", "bg-green-400", "bg-blue-400"][
                index
              ]
            }`}>
            <h3 className="mb-2 text-xl font-semibold">
              자동 슬라이드 {index + 1}
            </h3>
            <p>2초마다 자동으로 넘어갑니다.</p>
          </div>
        ))}
      </Carousel>
    </div>
  ),
}

// 이미지 갤러리 캐러셀
export const ImageGallery: Story = {
  args: {
    scrollCount: 5,
    loop: true,
  },
  render: (args) => (
    <div className="w-96">
      <Carousel {...args}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex aspect-video flex-[0_0_100%] items-center justify-center rounded-lg bg-gradient-to-br from-pink-200 to-purple-300">
            <div className="text-center">
              <div className="mb-2 text-4xl">🖼️</div>
              <p className="text-lg font-semibold">이미지 {index + 1}</p>
              <p className="text-sm text-gray-600">1920 x 1080</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),
}

// 카드 형태 캐러셀
export const Cards: Story = {
  args: {
    scrollCount: 0, // 네비게이션 점 숨김
    dragFree: true,
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <Carousel {...args}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="mr-4 flex-[0_0_300px] overflow-hidden rounded-lg border bg-white shadow-sm">
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300">
              <span className="text-2xl">📱</span>
            </div>
            <div className="p-4">
              <h3 className="mb-2 font-semibold">상품 {index + 1}</h3>
              <p className="mb-3 text-sm text-gray-600">
                상품 설명이 여기에 들어갑니다.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">
                  ₩{(index + 1) * 10000}
                </span>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="ml-1 text-sm">4.{index + 5}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),
}

// 증언/리뷰 캐러셀
export const Testimonials: Story = {
  args: {
    autoplay: true,
    autoplayDelay: 4000,
    loop: true,
    scrollCount: 3,
  },
  render: (args) => (
    <div className="w-96">
      <Carousel {...args}>
        {[
          {
            name: "김철수",
            role: "CEO",
            company: "ABC 회사",
            text: "정말 훌륭한 서비스입니다. 업무 효율이 크게 향상되었어요!",
          },
          {
            name: "이영희",
            role: "개발자",
            company: "XYZ 스타트업",
            text: "사용하기 쉽고 기능이 풍부합니다. 강력히 추천합니다.",
          },
          {
            name: "박민수",
            role: "디자이너",
            company: "디자인 스튜디오",
            text: "UI/UX가 정말 깔끔하고 직관적이에요. 최고입니다!",
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="flex-[0_0_100%] rounded-lg border bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-300"></div>
            <p className="mb-4 text-gray-600 italic">"{testimonial.text}"</p>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  ),
}

// 뉴스/블로그 캐러셀
export const BlogPosts: Story = {
  args: {
    scrollCount: 4,
  },
  render: (args) => (
    <div className="w-full max-w-3xl">
      <Carousel {...args}>
        {[
          {
            title: "React 19의 새로운 기능들",
            category: "개발",
            date: "2024-01-15",
          },
          {
            title: "Next.js 15 완전 가이드",
            category: "웹개발",
            date: "2024-01-10",
          },
          {
            title: "TypeScript 마스터하기",
            category: "언어",
            date: "2024-01-05",
          },
          { title: "모던 CSS 테크닉", category: "디자인", date: "2023-12-28" },
        ].map((post, index) => (
          <div
            key={index}
            className="flex-[0_0_100%] overflow-hidden rounded-lg border bg-white shadow-sm">
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-300">
              <span className="text-3xl">📝</span>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              <h3 className="mb-2 font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">
                블로그 포스트의 미리보기 텍스트가 여기에 표시됩니다...
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),
}

// 다중 항목 캐러셀
export const MultipleItems: Story = {
  args: {
    dragFree: true,
    skipSnaps: true,
    scrollCount: 0,
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <h3 className="mb-4 text-lg font-semibold">인기 상품</h3>
      <Carousel {...args}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="mr-4 flex-[0_0_200px] overflow-hidden rounded-lg border bg-white shadow-sm">
            <div className="flex h-32 items-center justify-center bg-gradient-to-br from-green-200 to-blue-300">
              <span className="text-2xl">🛍️</span>
            </div>
            <div className="p-3">
              <h4 className="mb-1 text-sm font-medium">상품 {index + 1}</h4>
              <p className="text-lg font-bold text-green-600">
                ₩{(index + 1) * 5000}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  ),
}

// 모바일 스타일 캐러셀
export const MobileStyle: Story = {
  args: {
    autoplay: true,
    autoplayDelay: 3000,
    loop: true,
    scrollCount: 3,
  },
  render: (args) => (
    <div className="w-80">
      <Carousel {...args}>
        {[
          {
            title: "특별 할인",
            subtitle: "최대 50% 세일",
            color: "from-red-400 to-pink-400",
          },
          {
            title: "신제품 출시",
            subtitle: "새로운 컬렉션",
            color: "from-blue-400 to-indigo-400",
          },
          {
            title: "무료 배송",
            subtitle: "5만원 이상 구매시",
            color: "from-green-400 to-teal-400",
          },
        ].map((banner, index) => (
          <div
            key={index}
            className={`flex-[0_0_100%] bg-gradient-to-r ${banner.color} rounded-lg p-6 text-center text-white`}>
            <h3 className="mb-2 text-2xl font-bold">{banner.title}</h3>
            <p className="text-lg">{banner.subtitle}</p>
            <button className="mt-4 rounded-full bg-white px-6 py-2 font-medium text-gray-800 hover:bg-gray-100">
              자세히 보기
            </button>
          </div>
        ))}
      </Carousel>
    </div>
  ),
}

// 커스텀 네비게이션
export const CustomNavigation: Story = {
  args: {
    scrollCount: 0, // 기본 네비게이션 숨김
    loop: true,
  },
  render: (args) => (
    <div className="w-96">
      <div className="relative">
        <Carousel {...args}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`flex-[0_0_100%] rounded-lg p-8 text-center text-white ${
                [
                  "bg-orange-400",
                  "bg-pink-400",
                  "bg-teal-400",
                  "bg-indigo-400",
                ][index]
              }`}>
              <h3 className="mb-2 text-xl font-semibold">
                슬라이드 {index + 1}
              </h3>
              <p>커스텀 네비게이션이 있는 캐러셀입니다.</p>
            </div>
          ))}
        </Carousel>

        {/* 커스텀 화살표 */}
        <button className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50">
          <ChevronLeft size={20} />
        </button>
        <button className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 커스텀 인디케이터 */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <button
            key={index}
            className="h-2 w-8 rounded-full bg-gray-300 hover:bg-gray-400"
          />
        ))}
      </div>
    </div>
  ),
}
