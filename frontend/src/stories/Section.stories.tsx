import Section from "@/components/common/Section"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowRight, Bell, Calendar, Settings, Star, User } from "lucide-react"

const meta: Meta<typeof Section> = {
  title: "Common/Section",
  component: Section,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "섹션 제목",
    },
    supplement: {
      control: "text",
      description: "보조 텍스트 또는 컴포넌트",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스명",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 섹션
export const Default: Story = {
  args: {
    title: "기본 섹션",
    children: (
      <div className="rounded-lg bg-gray-50 p-4">
        <p>이곳에 섹션 내용이 들어갑니다.</p>
      </div>
    ),
  },
  render: (args) => (
    <div className="w-96">
      <Section {...args} />
    </div>
  ),
}

// 아이콘과 함께
export const WithIcon: Story = {
  args: {
    leftIcon: <Settings size={20} className="text-blue-500" />,
    title: "설정",
    children: (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border bg-white p-3">
          <span>알림</span>
          <input type="checkbox" />
        </div>
        <div className="flex items-center justify-between rounded-lg border bg-white p-3">
          <span>다크 모드</span>
          <input type="checkbox" />
        </div>
      </div>
    ),
  },
  render: (args) => (
    <div className="w-96">
      <Section {...args} />
    </div>
  ),
}

// 보조 텍스트와 함께
export const WithSupplement: Story = {
  args: {
    leftIcon: <User size={20} className="text-green-500" />,
    title: "사용자 목록",
    supplement: "총 24명",
    children: (
      <div className="space-y-2">
        {["김철수", "이영희", "박민수", "최지영"].map((name) => (
          <div
            key={name}
            className="flex items-center space-x-3 rounded-lg border bg-white p-3">
            <div className="h-8 w-8 rounded-full bg-gray-300"></div>
            <span>{name}</span>
          </div>
        ))}
      </div>
    ),
  },
  render: (args) => (
    <div className="w-96">
      <Section {...args} />
    </div>
  ),
}

// 보조 컴포넌트와 함께
export const WithSupplementComponent: Story = {
  args: {
    leftIcon: <Bell size={20} className="text-yellow-500" />,
    title: "알림",
    supplement: (
      <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
        모두 읽음
      </button>
    ),
    children: (
      <div className="space-y-3">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="font-medium">새로운 메시지</p>
          <p className="text-sm text-gray-600">
            홍길동님이 메시지를 보냈습니다.
          </p>
          <p className="mt-1 text-xs text-gray-400">5분 전</p>
        </div>
        <div className="rounded-lg border bg-gray-50 p-3">
          <p className="font-medium">시스템 업데이트</p>
          <p className="text-sm text-gray-600">새로운 기능이 추가되었습니다.</p>
          <p className="mt-1 text-xs text-gray-400">1시간 전</p>
        </div>
      </div>
    ),
  },
  render: (args) => (
    <div className="w-96">
      <Section {...args} />
    </div>
  ),
}

// 대시보드 스타일
export const Dashboard: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8">
      <Section
        leftIcon={<Calendar size={24} className="text-purple-500" />}
        title="오늘의 일정"
        supplement="3개의 이벤트">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium">팀 미팅</h4>
              <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                진행 중
              </span>
            </div>
            <p className="text-sm text-gray-600">10:00 - 11:00</p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium">프레젠테이션</h4>
              <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                예정
              </span>
            </div>
            <p className="text-sm text-gray-600">14:00 - 15:00</p>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium">코드 리뷰</h4>
              <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                완료
              </span>
            </div>
            <p className="text-sm text-gray-600">16:00 - 17:00</p>
          </div>
        </div>
      </Section>

      <Section
        leftIcon={<Star size={24} className="text-orange-500" />}
        title="인기 프로젝트"
        supplement={
          <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
            <span>전체 보기</span>
            <ArrowRight size={16} />
          </button>
        }>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h4 className="mb-2 font-semibold">웹 애플리케이션</h4>
            <p className="mb-3 text-sm text-gray-600">
              React 기반 대시보드 프로젝트
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>⭐ 127</span>
              <span>🍴 45</span>
              <span>JavaScript</span>
            </div>
          </div>
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h4 className="mb-2 font-semibold">모바일 앱</h4>
            <p className="mb-3 text-sm text-gray-600">
              React Native 기반 쇼핑몰
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>⭐ 89</span>
              <span>🍴 23</span>
              <span>TypeScript</span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  ),
}

// 리스트 스타일
export const ListStyle: Story = {
  render: () => (
    <div className="w-96">
      <Section
        leftIcon={<User size={20} className="text-indigo-500" />}
        title="팀 멤버"
        supplement="온라인 5명">
        <div className="space-y-2">
          {[
            { name: "김철수", role: "팀 리더", status: "온라인", avatar: "👨‍💼" },
            { name: "이영희", role: "개발자", status: "온라인", avatar: "👩‍💻" },
            {
              name: "박민수",
              role: "디자이너",
              status: "자리비움",
              avatar: "👨‍🎨",
            },
            { name: "최지영", role: "기획자", status: "온라인", avatar: "👩‍💼" },
            {
              name: "정한솔",
              role: "개발자",
              status: "오프라인",
              avatar: "👨‍💻",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="flex items-center justify-between rounded-lg border bg-white p-3 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{member.avatar}</span>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  member.status === "온라인"
                    ? "bg-green-100 text-green-800"
                    : member.status === "자리비움"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-600"
                }`}>
                {member.status}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
}

// 통계 스타일
export const StatisticsStyle: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Section title="서비스 통계" supplement="실시간 업데이트">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <div className="text-sm text-gray-600">총 사용자</div>
            <div className="mt-1 text-xs text-green-500">+12% ↗</div>
          </div>
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">567</div>
            <div className="text-sm text-gray-600">월간 활성 사용자</div>
            <div className="mt-1 text-xs text-green-500">+8% ↗</div>
          </div>
          <div className="rounded-lg bg-purple-50 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-gray-600">새 가입자</div>
            <div className="mt-1 text-xs text-red-500">-3% ↘</div>
          </div>
          <div className="rounded-lg bg-orange-50 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">₩2.1M</div>
            <div className="text-sm text-gray-600">월 수익</div>
            <div className="mt-1 text-xs text-green-500">+15% ↗</div>
          </div>
        </div>
      </Section>
    </div>
  ),
}

// 복합 레이아웃
export const ComplexLayout: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Section
          leftIcon={<Bell size={20} className="text-red-500" />}
          title="최근 알림"
          supplement={
            <button className="text-sm text-blue-600 hover:text-blue-800">
              전체 보기
            </button>
          }>
          <div className="max-h-64 space-y-3 overflow-y-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start space-x-3 rounded-lg border bg-white p-3">
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">알림 제목 {i + 1}</p>
                  <p className="text-xs text-gray-500">알림 내용입니다...</p>
                  <p className="mt-1 text-xs text-gray-400">{i + 1}분 전</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          leftIcon={<Calendar size={20} className="text-blue-500" />}
          title="이번 주 일정"
          supplement="7개 이벤트">
          <div className="space-y-2">
            {["월요일", "화요일", "수요일", "목요일", "금요일"].map(
              (day, i) => (
                <div
                  key={day}
                  className="flex items-center justify-between rounded p-2 hover:bg-gray-50">
                  <span className="text-sm font-medium">{day}</span>
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                    {Math.floor(Math.random() * 3) + 1}개
                  </span>
                </div>
              ),
            )}
          </div>
        </Section>
      </div>
    </div>
  ),
}
