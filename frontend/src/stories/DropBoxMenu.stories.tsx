import Button from "@/components/common/Button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/common/DropBoxMenu"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  Bell,
  ChevronDown,
  Copy,
  CreditCard,
  Download,
  Edit,
  Eye,
  LogOut,
  Mail,
  Monitor,
  Moon,
  Plus,
  Settings,
  Share,
  Sun,
  Trash2,
  User,
} from "lucide-react"
import { useState } from "react"

const meta: Meta<typeof DropdownMenu> = {
  title: "Common/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 드롭다운 메뉴
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>메뉴 열기</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>내 계정</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2" />
          프로필
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2" />
          설정
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="mr-2" />
          알림
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// 단축키가 포함된 메뉴
export const WithShortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>파일 메뉴</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>파일</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus className="mr-2" />새 파일
          <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="mr-2" />
          다운로드
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share className="mr-2" />
          공유
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Edit className="mr-2" />
          편집
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2" />
          삭제
          <DropdownMenuShortcut>⌦</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// 체크박스 메뉴
export const WithCheckboxes: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = useState(true)
    const [showActivityBar, setShowActivityBar] = useState(false)
    const [showPanel, setShowPanel] = useState(false)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>보기 옵션</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>패널 표시</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}>
            상태 표시줄
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}>
            활동 표시줄
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}>
            하단 패널
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// 라디오 그룹 메뉴
export const WithRadioGroup: Story = {
  render: () => {
    const [theme, setTheme] = useState("light")

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            {theme === "light" && <Sun className="mr-2" />}
            {theme === "dark" && <Moon className="mr-2" />}
            {theme === "system" && <Monitor className="mr-2" />}
            테마 선택
            <ChevronDown className="ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>테마</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="light">
              <Sun className="mr-2" />
              라이트 모드
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <Moon className="mr-2" />
              다크 모드
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              <Monitor className="mr-2" />
              시스템 설정
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// 서브 메뉴가 있는 드롭다운
export const WithSubmenus: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>고급 메뉴</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>작업</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Eye className="mr-2" />
          보기
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="mr-2" />
          복사
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Share className="mr-2" />
            공유하기
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <Mail className="mr-2" />
              이메일로 공유
            </DropdownMenuItem>
            <DropdownMenuItem>링크 복사</DropdownMenuItem>
            <DropdownMenuItem>소셜 미디어</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Download className="mr-2" />
            다운로드
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>PDF로 다운로드</DropdownMenuItem>
            <DropdownMenuItem>이미지로 다운로드</DropdownMenuItem>
            <DropdownMenuItem>Excel로 다운로드</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2" />
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// 사용자 프로필 메뉴
export const UserProfileMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
            김
          </div>
          <div className="text-left">
            <div className="text-sm font-medium">김철수</div>
            <div className="text-xs text-gray-500">kim@example.com</div>
          </div>
          <ChevronDown size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-medium text-white">
              김
            </div>
            <div>
              <div className="font-medium">김철수</div>
              <div className="text-xs text-gray-500">kim@example.com</div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2" />
          프로필 보기
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2" />
          계정 설정
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2" />
          결제 정보
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="mr-2" />
          알림 설정
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>도움말</DropdownMenuItem>
        <DropdownMenuItem>피드백 보내기</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <LogOut className="mr-2" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// 테이블 액션 메뉴
export const TableActionMenu: Story = {
  render: () => (
    <div className="p-4">
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">이름</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                이메일
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">역할</th>
              <th className="px-4 py-2 text-center text-sm font-medium">
                액션
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "김철수", email: "kim@example.com", role: "관리자" },
              { name: "이영희", email: "lee@example.com", role: "사용자" },
              { name: "박민수", email: "park@example.com", role: "사용자" },
            ].map((user, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3 text-sm">{user.name}</td>
                <td className="px-4 py-3 text-sm">{user.email}</td>
                <td className="px-4 py-3 text-sm">{user.role}</td>
                <td className="px-4 py-3 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="rounded p-1 hover:bg-gray-100">
                        <span className="text-lg">⋯</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2" />
                        보기
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2" />
                        편집
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2" />
                        복제
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.role === "사용자" && (
                        <DropdownMenuItem>관리자로 승격</DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2" />
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
}

// 컨텍스트 메뉴 (우클릭 메뉴)
export const ContextMenu: Story = {
  render: () => (
    <div className="p-8">
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
        <p className="mb-4 text-gray-600">이 영역에서 우클릭해보세요</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200"
              onContextMenu={(e) => {
                e.preventDefault()
                // 실제로는 컨텍스트 메뉴를 트리거하는 로직
              }}>
              우클릭 또는 클릭
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Copy className="mr-2" />
              복사
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2" />
              편집
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>새 창에서 열기</DropdownMenuItem>
            <DropdownMenuItem>링크 주소 복사</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>속성</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
}

// 복잡한 필터 메뉴
export const ComplexFilterMenu: Story = {
  render: () => {
    const [statusFilter, setStatusFilter] = useState<string[]>([])
    const [sortBy, setSortBy] = useState("date")
    const [showCompleted, setShowCompleted] = useState(true)

    const toggleStatus = (status: string) => {
      setStatusFilter((prev) =>
        prev.includes(status)
          ? prev.filter((s) => s !== status)
          : [...prev, status],
      )
    }

    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">작업 목록</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              필터 & 정렬
              <ChevronDown className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>상태 필터</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["진행 중", "대기", "완료", "취소"].map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter.includes(status)}
                onCheckedChange={() => toggleStatus(status)}>
                {status}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuLabel>정렬 기준</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem value="date">생성일</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="priority">
                우선순위
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name">이름</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showCompleted}
              onCheckedChange={setShowCompleted}>
              완료된 작업 표시
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>필터 초기화</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  },
}
