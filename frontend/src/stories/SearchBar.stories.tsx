import SearchBar from "@/components/common/SearchBar"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

// Next.js 훅들을 모킹하는 래퍼 컴포넌트
const MockedSearchBar = ({
  placeholder,
  className,
}: {
  placeholder?: string
  className?: string
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const keyword = formData.get("search")?.toString()
    if (keyword) {
      console.log("스토리북 모드: 검색어:", keyword)
      // 스토리북에서는 실제 라우팅 대신 콘솔 로그
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`flex w-full items-center gap-2 rounded-xl border-2 border-neutral-200 bg-white p-4 transition-all focus-within:border-transparent focus-within:ring-2 focus-within:ring-neutral-600 focus-within:outline-none ${className || ""}`}>
        <div className="text-neutral-400">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <input
          name="search"
          className="w-full bg-transparent text-sm outline-none"
          placeholder={placeholder}
        />
      </div>
    </form>
  )
}

// SearchBar는 Next.js의 useRouter와 usePathname을 사용하므로
// 스토리북에서 모킹이 필요합니다
const meta: Meta<typeof SearchBar> = {
  title: "Common/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "검색 입력 필드의 플레이스홀더 텍스트",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스명",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 검색바
export const Default: Story = {
  args: {
    placeholder: "검색어를 입력하세요",
  },
  render: (args) => (
    <div className="w-96">
      <MockedSearchBar {...args} />
    </div>
  ),
}

// 사용자 검색
export const UserSearch: Story = {
  args: {
    placeholder: "사용자 이름으로 검색...",
  },
  render: (args) => (
    <div className="w-96">
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold">사용자 검색</h3>
        <MockedSearchBar {...args} />
      </div>

      {/* 가상의 검색 결과 */}
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-500">검색 결과 예시:</p>
        <div className="space-y-2">
          {["김철수", "김영희", "김민수"].map((name) => (
            <div
              key={name}
              className="flex items-center space-x-3 rounded bg-gray-50 p-2">
              <div className="h-8 w-8 rounded-full bg-blue-200"></div>
              <span className="text-sm">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

// 상품 검색
export const ProductSearch: Story = {
  args: {
    placeholder: "상품명, 브랜드, 카테고리 검색",
  },
  render: (args) => (
    <div className="w-96">
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold">상품 검색</h3>
        <MockedSearchBar {...args} />
      </div>

      {/* 인기 검색어 */}
      <div className="mt-4">
        <p className="mb-2 text-sm font-medium text-gray-700">인기 검색어</p>
        <div className="flex flex-wrap gap-2">
          {["아이폰", "노트북", "헤드폰", "키보드", "마우스"].map((keyword) => (
            <button
              key={keyword}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200">
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </div>
  ),
}

// 문서 검색
export const DocumentSearch: Story = {
  args: {
    placeholder: "문서 제목, 내용, 작성자 검색",
    className: "border-2 border-green-200 focus-within:border-green-500",
  },
  render: (args) => (
    <div className="w-96">
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold">문서 검색</h3>
        <MockedSearchBar {...args} />
      </div>

      {/* 최근 검색어 */}
      <div className="mt-4">
        <p className="mb-2 text-sm font-medium text-gray-700">최근 검색어</p>
        <div className="space-y-1">
          {["React 컴포넌트", "TypeScript 가이드", "API 문서"].map((term) => (
            <div
              key={term}
              className="flex items-center justify-between rounded p-2 hover:bg-gray-50">
              <span className="text-sm text-gray-600">{term}</span>
              <button className="text-xs text-red-500 hover:text-red-700">
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

// 헤더 스타일 검색바
export const HeaderStyle: Story = {
  args: {
    placeholder: "통합 검색",
    className: "max-w-md",
  },
  render: (args) => (
    <div className="w-full">
      {/* 헤더 시뮬레이션 */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded bg-blue-500"></div>
              <h1 className="text-xl font-bold text-gray-900">MyApp</h1>
            </div>

            <div className="mx-8 max-w-md flex-1">
              <MockedSearchBar {...args} />
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <span>🔔</span>
              </button>
              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 text-center text-gray-500">
        <p>메인 콘텐츠 영역</p>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
}

// 사이드바 스타일 검색바
export const SidebarStyle: Story = {
  args: {
    placeholder: "메뉴 검색",
    className: "border-gray-300",
  },
  render: (args) => (
    <div className="flex h-96">
      {/* 사이드바 시뮬레이션 */}
      <div className="w-64 border-r bg-gray-100 p-4">
        <div className="mb-4">
          <MockedSearchBar {...args} />
        </div>

        <nav className="space-y-1">
          {["대시보드", "사용자 관리", "상품 관리", "주문 관리", "설정"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-200">
                {item}
              </a>
            ),
          )}
        </nav>
      </div>

      <div className="flex-1 p-4">
        <p className="text-gray-500">메인 콘텐츠 영역</p>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
}

// 모바일 스타일 검색바
export const MobileStyle: Story = {
  args: {
    placeholder: "검색",
  },
  render: (args) => (
    <div className="w-80">
      {/* 모바일 헤더 시뮬레이션 */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center space-x-3">
            <button className="p-2">
              <span>☰</span>
            </button>
            <div className="flex-1">
              <MockedSearchBar {...args} />
            </div>
            <button className="p-2">
              <span>👤</span>
            </button>
          </div>
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="bg-gray-50 px-4 py-2">
        <div className="flex space-x-4 overflow-x-auto">
          {["전체", "인기", "신상품", "할인", "브랜드"].map((category) => (
            <button
              key={category}
              className="rounded-full bg-white px-3 py-1 text-sm whitespace-nowrap">
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <p className="text-center text-gray-500">콘텐츠 영역</p>
      </div>
    </div>
  ),
}

// 검색 결과 페이지 스타일
export const SearchResultsStyle: Story = {
  args: {
    placeholder: "새로운 검색어 입력",
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-bold">"React" 검색 결과</h2>
        <div className="flex items-center space-x-4">
          <MockedSearchBar {...args} />
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            필터
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">약 1,234개 결과 (0.15초)</p>
      </div>

      {/* 검색 결과 */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b pb-4">
            <h3 className="cursor-pointer text-lg text-blue-600 hover:underline">
              React 공식 문서 - 컴포넌트 {i + 1}
            </h3>
            <p className="text-sm text-green-600">
              https://react.dev/components/{i + 1}
            </p>
            <p className="mt-1 text-gray-600">
              React 컴포넌트의 기본 개념과 사용법에 대해 설명합니다. 함수형
              컴포넌트와 클래스형 컴포넌트의 차이점...
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
}
