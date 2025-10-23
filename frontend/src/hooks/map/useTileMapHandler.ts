import { getMapBounds } from "@/lib/map/utils"
import { CLUSTERING_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from "@/stores/useTileMapStore"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { ViewMode } from "@/types/map/tile"
import { useCallback, useMemo } from "react"

interface UseTileMapHandlerProps {
  updateBoundsParams: (bounds: { sw: Coordinates; ne: Coordinates }) => void
  updateClusterParams: (zoom: number, center: Coordinates) => void
  setCluster: (cluster: any[]) => void
  setTiles: (tiles: any[]) => void
  setIsClusterView: (isClusterView: boolean) => void
}

const useTileMapHandler = ({
  updateBoundsParams,
  updateClusterParams,
  setCluster,
  setTiles,
  setIsClusterView,
}: UseTileMapHandlerProps) => {
  // 줌 레벨에 따른 뷰 모드 결정
  const getViewMode = useCallback((zoom: number): ViewMode => {
    if (zoom <= MIN_ZOOM_LEVEL) return ViewMode.HIDDEN
    if (zoom < CLUSTERING_ZOOM_LEVEL) return ViewMode.CLUSTER
    return ViewMode.TILE
  }, [])

  // 중심 좌표 유효성 검사
  const isValidCoordinates = useCallback((center: Coordinates): boolean => {
    return center.lat !== undefined && center.lng !== undefined
  }, [])

  // 숨김 모드 처리
  const handleHiddenView = useCallback(() => {
    setCluster([])
    setTiles([])
  }, [setCluster, setTiles])

  // 클러스터 뷰 처리
  const handleClusterView = useCallback(
    async (zoom: number, center: Coordinates) => {
      setTiles([])
      updateClusterParams(zoom, center)
    },
    [setTiles, updateClusterParams],
  )

  // 타일 뷰 처리
  const handleTileView = useCallback(
    async (center: Coordinates, map: NaverMap | null) => {
      setCluster([])

      const bounds = getMapBounds(map)
      if (!bounds) {
        console.warn("Failed to get map bounds")
        return
      }

      updateBoundsParams(bounds)
    },
    [setCluster, updateBoundsParams],
  )

  // 메인 핸들러 - debounce를 useMemo로 한 번만 생성
  const handleCenterChange = useMemo(
    () => async (center: Coordinates, map: NaverMap | null) => {
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

      // 클러스터 뷰 설정
      if (viewMode === ViewMode.CLUSTER) {
        setIsClusterView(true)
      } else {
        setIsClusterView(false)
      }

      console.log(`🗺️ Map change: zoom=${zoom}, mode=${viewMode}`)

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
    },
    [
      isValidCoordinates,
      getViewMode,
      handleHiddenView,
      handleClusterView,
      handleTileView,
    ],
  )

  return {
    handleCenterChange,
    handleTileView,
    handleClusterView,
  }
}

export default useTileMapHandler
