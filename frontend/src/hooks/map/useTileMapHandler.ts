import { getMapBounds } from "@/lib/map/utils"
import { CLUSTERING_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from "@/stores/useTileMapStore"
import { Coordinates, NaverMap } from "@/types/map/navermaps"

interface UseTileMapHandlerProps {
  updateBoundsParams: (bounds: { sw: Coordinates; ne: Coordinates }) => void
  updateClusterParams: (zoom: number, center: Coordinates) => void
  setCluster: (cluster: any[]) => void
  setTiles: (tiles: any[]) => void
}

// 줌 레벨 타입 정의
enum ViewMode {
  HIDDEN = "HIDDEN", // MIN_ZOOM_LEVEL 이하
  CLUSTER = "CLUSTER", // CLUSTERING_ZOOM_LEVEL 미만
  TILE = "TILE", // CLUSTERING_ZOOM_LEVEL 이상
}

const useTileMapHandler = ({
  updateBoundsParams,
  updateClusterParams,
  setCluster,
  setTiles,
}: UseTileMapHandlerProps) => {
  // 줌 레벨에 따른 뷰 모드 결정
  const getViewMode = (zoom: number): ViewMode => {
    if (zoom <= MIN_ZOOM_LEVEL) return ViewMode.HIDDEN
    if (zoom < CLUSTERING_ZOOM_LEVEL) return ViewMode.CLUSTER
    return ViewMode.TILE
  }

  // 중심 좌표 유효성 검사
  const isValidCoordinates = (center: Coordinates): boolean => {
    return center.lat !== undefined && center.lng !== undefined
  }

  // 숨김 모드 처리
  const handleHiddenView = () => {
    setCluster([])
    setTiles([])
  }

  // 클러스터 뷰 처리
  const handleClusterView = async (zoom: number, center: Coordinates) => {
    setTiles([])
    updateClusterParams(zoom, center)
  }

  // 타일 뷰 처리
  const handleTileView = async (center: Coordinates, map: NaverMap | null) => {
    setCluster([])

    const bounds = getMapBounds(map)
    if (!bounds) return

    updateBoundsParams(bounds)
  }

  // 메인 핸들러
  const handleCenterChange = async (
    center: Coordinates,
    map: NaverMap | null,
  ) => {
    // Early return: 유효하지 않은 좌표
    if (!isValidCoordinates(center)) {
      return
    }

    // Early return: 맵이 없는 경우
    if (!map) {
      return
    }

    const zoom = map.getZoom() // 줌 레벨
    const viewMode = getViewMode(zoom) // 뷰 모드

    // 뷰 모드에 따른 처리
    switch (viewMode) {
      case ViewMode.HIDDEN:
        handleHiddenView()
        break
      case ViewMode.CLUSTER:
        await handleClusterView(zoom, center)
        break
      case ViewMode.TILE:
        await handleTileView(center, map)
        break
    }
  }
  return {
    handleCenterChange,
    handleTileView,
    handleClusterView,
  }
}

export default useTileMapHandler
