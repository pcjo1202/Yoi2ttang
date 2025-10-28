import Map from "@/components/common/Map"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

interface MockMapProps {
  loc: { lat: number; lng: number }
  tiles?: Array<{ id: number; lat: number; lng: number; type: string }>
  zoom?: number
  strokeColor?: string
  fillColor?: string
  onCenterChange?: (center: { lat: number; lng: number }) => void
  className?: string
}

// 스토리북용 모킹 Map 컴포넌트
const MockedMap = ({ loc, tiles = [], zoom = 15, className }: MockMapProps) => {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center bg-gray-100 ${className || ""}`}>
      {/* 기본 지도 플레이스홀더 */}
      <div className="text-center text-gray-500">
        <div className="mb-2 text-4xl">🗺️</div>
        <p className="text-sm font-medium">네이버 지도 API</p>
        <p className="text-xs">
          위도: {loc.lat.toFixed(4)}, 경도: {loc.lng.toFixed(4)}
        </p>
        <p className="text-xs">줌 레벨: {zoom}</p>
        {tiles.length > 0 && (
          <p className="mt-1 text-xs">{tiles.length}개 타일</p>
        )}
      </div>

      {/* 타일 시뮬레이션 */}
      {tiles.map((tile, index) => {
        const colors = {
          visited: "bg-red-400",
          current: "bg-blue-400",
          available: "bg-green-400",
        }
        const positions = [
          { top: "20%", left: "25%" },
          { top: "30%", right: "20%" },
          { bottom: "25%", left: "30%" },
          { top: "60%", right: "35%" },
        ]
        const position = positions[index % positions.length]

        return (
          <div
            key={tile.id}
            className={`absolute h-6 w-6 rounded opacity-80 ${colors[tile.type as keyof typeof colors] || "bg-gray-400"}`}
            style={position}
          />
        )
      })}
    </div>
  )
}

// Map 컴포넌트는 네이버 맵 API를 사용하므로 스토리북에서는 모킹이 필요합니다
// 실제 지도는 표시되지 않지만 컴포넌트의 인터페이스를 보여줄 수 있습니다
const meta: Meta<typeof Map> = {
  title: "Common/Map",
  component: Map,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "네이버 지도 API를 사용하는 지도 컴포넌트입니다. 실제 환경에서는 네이버 지도 API 키가 필요합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    loc: {
      description: "지도 중심 좌표 (위도, 경도)",
    },
    zoom: {
      control: { type: "range", min: 1, max: 21, step: 1 },
      description: "지도 줌 레벨 (1-21)",
    },
    strokeColor: {
      control: "color",
      description: "타일 경계선 색상",
    },
    fillColor: {
      control: "color",
      description: "타일 채우기 색상",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 서울 중심 기본 지도
export const Default: Story = {
  args: {
    loc: { lat: 37.5665, lng: 126.978 }, // 서울시청
    zoom: 15,
  },
  render: (args) => (
    <div className="h-64 w-96 overflow-hidden rounded-lg border-2 border-gray-200">
      <MockedMap {...args} />
    </div>
  ),
}

// 부산 지역
export const Busan: Story = {
  args: {
    loc: { lat: 35.1796, lng: 129.0756 }, // 부산시청
    zoom: 13,
  },
  render: (args) => (
    <div className="h-64 w-96 overflow-hidden rounded-lg border-2 border-gray-200">
      <MockedMap {...args} />
    </div>
  ),
}

// 높은 줌 레벨 (상세)
export const HighZoom: Story = {
  args: {
    loc: { lat: 37.5665, lng: 126.978 },
    zoom: 19,
  },
  render: (args) => (
    <div className="h-64 w-96 overflow-hidden rounded-lg border-2 border-gray-200">
      <MockedMap {...args} />
    </div>
  ),
}

// 낮은 줌 레벨 (광역)
export const LowZoom: Story = {
  args: {
    loc: { lat: 37.5665, lng: 126.978 },
    zoom: 8,
  },
  render: (args) => (
    <div className="h-64 w-96 overflow-hidden rounded-lg border-2 border-gray-200">
      <MockedMap {...args} />
    </div>
  ),
}

// 타일이 있는 지도 (시뮬레이션)
export const WithTiles: Story = {
  args: {
    loc: { lat: 37.5665, lng: 126.978 },
    zoom: 15,
    tiles: [
      { id: 1, lat: 37.5665, lng: 126.978, type: "visited" },
      { id: 2, lat: 37.5675, lng: 126.979, type: "current" },
      { id: 3, lat: 37.5655, lng: 126.977, type: "available" },
    ],
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="h-64 w-96 overflow-hidden rounded-lg border-2 border-gray-200">
        <MockedMap {...args} />
      </div>

      {/* 타일 범례 */}
      <div className="rounded-lg border bg-white p-3 text-sm">
        <h4 className="mb-2 font-medium">타일 범례</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded bg-red-400"></div>
            <span>방문한 타일</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded bg-blue-400"></div>
            <span>현재 타일</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded bg-green-400"></div>
            <span>사용 가능한 타일</span>
          </div>
        </div>
      </div>
    </div>
  ),
}

// 큰 지도
export const LargeMap: Story = {
  args: {
    loc: { lat: 37.5665, lng: 126.978 },
    zoom: 14,
    className: "border-4 border-blue-200",
  },
  render: (args) => (
    <div className="h-[600px] w-[800px] overflow-hidden rounded-lg border-2 border-gray-200">
      <MockedMap {...args} />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
}

// 지도 컨트롤이 포함된 레이아웃
export const WithControls: Story = {
  args: {
    loc: { lat: 37.5665, lng: 126.978 },
    zoom: 15,
  },
  render: (args) => (
    <div className="w-full max-w-4xl space-y-4">
      {/* 지도 컨트롤 */}
      <div className="flex items-center justify-between rounded-lg border bg-white p-4">
        <div className="flex items-center space-x-4">
          <h3 className="font-medium">지도 설정</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm">줌:</span>
            <input
              type="range"
              min="1"
              max="21"
              defaultValue={args.zoom}
              className="w-20"
            />
            <span className="text-sm">{args.zoom}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700">
            내 위치
          </button>
          <button className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700">
            초기화
          </button>
        </div>
      </div>

      {/* 지도 */}
      <div className="h-96 w-full overflow-hidden rounded-lg border-2 border-gray-200">
        <MockedMap {...args} />
      </div>

      {/* 지도 정보 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded bg-gray-50 p-3">
          <h4 className="mb-1 text-sm font-medium">중심 좌표</h4>
          <p className="text-xs text-gray-600">위도: {args.loc.lat}</p>
          <p className="text-xs text-gray-600">경도: {args.loc.lng}</p>
        </div>
        <div className="rounded bg-gray-50 p-3">
          <h4 className="mb-1 text-sm font-medium">지도 설정</h4>
          <p className="text-xs text-gray-600">줌 레벨: {args.zoom}</p>
          <p className="text-xs text-gray-600">
            타일 수: {args.tiles?.length || 0}
          </p>
        </div>
      </div>
    </div>
  ),
}

// 모바일 지도 레이아웃
export const MobileLayout: Story = {
  args: {
    loc: { lat: 37.5665, lng: 126.978 },
    zoom: 16,
  },
  render: (args) => (
    <div className="h-[600px] w-80 overflow-hidden rounded-lg border bg-white shadow-lg">
      {/* 모바일 헤더 */}
      <div className="bg-blue-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">내 위치</h3>
          <button className="rounded p-1 hover:bg-blue-600">⚙️</button>
        </div>
      </div>

      {/* 지도 영역 */}
      <div className="h-96 flex-1">
        <MockedMap {...args} />
      </div>

      {/* 하단 정보 */}
      <div className="border-t bg-gray-50 p-4">
        <div className="text-center">
          <p className="text-sm font-medium">현재 위치</p>
          <p className="text-xs text-gray-600">서울특별시 중구 세종대로</p>
          <button className="mt-2 rounded bg-blue-500 px-4 py-1 text-sm text-white hover:bg-blue-600">
            길찾기
          </button>
        </div>
      </div>
    </div>
  ),
}
