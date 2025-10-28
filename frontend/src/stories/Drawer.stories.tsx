import Button from "@/components/common/Button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/common/drawer"
import Input from "@/components/common/Input"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Bell, LogOut, Settings, User, X } from "lucide-react"
import { useState } from "react"

const meta: Meta<typeof Drawer> = {
  title: "Common/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 드로워 (아래에서 올라오는)
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>기본 드로워 열기</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>기본 드로워</DrawerTitle>
          <DrawerDescription>
            이것은 기본적인 드로워입니다. 아래에서 위로 슬라이드됩니다.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <p className="text-gray-600">
            여기에 드로워의 내용이 들어갑니다. 스크롤이 가능하며 다양한
            컴포넌트를 포함할 수 있습니다.
          </p>
        </div>

        <DrawerFooter>
          <Button>확인</Button>
          <DrawerClose asChild>
            <Button variant="outline">취소</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

// 폼이 포함된 드로워
export const WithForm: Story = {
  render: () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>연락처 추가</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>새 연락처 추가</DrawerTitle>
            <DrawerDescription>
              새로운 연락처 정보를 입력해주세요.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 p-4">
            <div>
              <label className="mb-2 block text-sm font-medium">이름</label>
              <Input
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">이메일</label>
              <Input
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">전화번호</label>
              <Input type="tel" placeholder="전화번호를 입력하세요" />
            </div>
          </div>

          <DrawerFooter>
            <Button
              disabled={!name || !email}
              onClick={() => alert(`연락처 추가: ${name} (${email})`)}>
              저장
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  },
}

// 메뉴 드로워
export const MenuDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>메뉴 열기</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>메뉴</DrawerTitle>
              <DrawerDescription>
                앱의 주요 기능에 접근할 수 있습니다.
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <button className="rounded p-2 hover:bg-gray-100">
                <X size={20} />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="p-4">
          <nav className="space-y-2">
            {[
              { icon: User, label: "프로필", description: "개인 정보 관리" },
              { icon: Settings, label: "설정", description: "앱 환경 설정" },
              { icon: Bell, label: "알림", description: "알림 설정" },
              {
                icon: LogOut,
                label: "로그아웃",
                description: "계정에서 로그아웃",
                danger: true,
              },
            ].map((item, index) => (
              <button
                key={index}
                className={`flex w-full items-center space-x-3 rounded-lg p-3 text-left hover:bg-gray-50 ${
                  item.danger ? "text-red-600 hover:bg-red-50" : ""
                }`}>
                <item.icon size={20} />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-gray-500">
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  ),
}

// 설정 드로워
export const SettingsDrawer: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true)
    const [darkMode, setDarkMode] = useState(false)

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>설정</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>앱 설정</DrawerTitle>
            <DrawerDescription>
              앱의 동작을 사용자 정의할 수 있습니다.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-6 p-4">
            <div className="space-y-4">
              <h3 className="font-medium">일반</h3>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">푸시 알림</div>
                  <div className="text-sm text-gray-500">
                    새로운 메시지와 업데이트 알림
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="h-5 w-5"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">다크 모드</div>
                  <div className="text-sm text-gray-500">어두운 테마 사용</div>
                </div>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="h-5 w-5"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">개인정보</h3>

              <button className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-3">
                <span>개인정보 처리방침</span>
                <span className="text-gray-400">→</span>
              </button>

              <button className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-3">
                <span>이용약관</span>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button>완료</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  },
}

// 필터 드로워
export const FilterDrawer: Story = {
  render: () => {
    const [priceRange, setPriceRange] = useState([0, 100])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const categories = ["전자제품", "의류", "도서", "가구", "식품"]

    const toggleCategory = (category: string) => {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category],
      )
    }

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>필터</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>상품 필터</DrawerTitle>
            <DrawerDescription>
              원하는 조건으로 상품을 필터링하세요.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-6 p-4">
            <div>
              <h3 className="mb-3 font-medium">가격 범위</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="flex-1"
                />
                <span className="text-sm">
                  ₩{priceRange[0]}만 - ₩{priceRange[1]}만
                </span>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-medium">카테고리</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-medium">평점</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center space-x-2">
                    <input type="radio" name="rating" />
                    <span>{"⭐".repeat(rating)} 이상</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button>필터 적용</Button>
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  },
}

// 공유 드로워
export const ShareDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>공유하기</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>콘텐츠 공유</DrawerTitle>
          <DrawerDescription>
            다양한 방법으로 콘텐츠를 공유할 수 있습니다.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          <div className="mb-6 grid grid-cols-3 gap-4">
            {[
              { name: "카카오톡", emoji: "💬", color: "bg-yellow-100" },
              { name: "페이스북", emoji: "📘", color: "bg-blue-100" },
              { name: "트위터", emoji: "🐦", color: "bg-sky-100" },
              { name: "인스타그램", emoji: "📸", color: "bg-pink-100" },
              { name: "링크드인", emoji: "💼", color: "bg-indigo-100" },
              { name: "이메일", emoji: "✉️", color: "bg-gray-100" },
            ].map((platform) => (
              <button
                key={platform.name}
                className={`${platform.color} rounded-lg p-4 text-center hover:opacity-80`}>
                <div className="mb-1 text-2xl">{platform.emoji}</div>
                <div className="text-xs font-medium">{platform.name}</div>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
              <span className="font-medium">링크 복사</span>
              <button className="ml-auto rounded bg-blue-500 px-3 py-1 text-sm text-white">
                복사
              </button>
            </div>

            <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3">
              <span className="font-medium">QR 코드</span>
              <button className="ml-auto rounded bg-green-500 px-3 py-1 text-sm text-white">
                생성
              </button>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">닫기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

// 긴 콘텐츠가 있는 드로워 (스크롤)
export const ScrollableDrawer: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>긴 콘텐츠 드로워</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>긴 콘텐츠</DrawerTitle>
          <DrawerDescription>
            스크롤 가능한 긴 콘텐츠를 포함한 드로워입니다.
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto p-4">
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="rounded-lg bg-gray-50 p-4">
                <h4 className="mb-2 font-medium">항목 {index + 1}</h4>
                <p className="text-sm text-gray-600">
                  이것은 긴 콘텐츠의 예시입니다. 스크롤을 통해 모든 내용을 볼 수
                  있습니다. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                </p>
              </div>
            ))}
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button>완료</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
