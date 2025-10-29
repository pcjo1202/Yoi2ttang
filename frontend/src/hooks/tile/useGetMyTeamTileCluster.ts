import { getOneTeamTileMapCluster } from "@/services/tile/api"
import { TileMapClusterResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"
import ngeohash from "ngeohash"
import { useMemo } from "react"

interface useGetMyTeamTileClusterProps {
  zodiacId: number
  params: {
    lat: number
    lng: number
    zoomLevel: number
  }
  enabled: boolean
}

interface UseGetMyTeamTileClusterParams {
  lat: number
  lng: number
}
// 특정 팀 점령 지도 클러스터 확인
const useGetMyTeamTileCluster = ({
  zodiacId,
  params,
  enabled,
}: useGetMyTeamTileClusterProps) => {
  // 1. 좌표를 ngeohash로 정규화 (캐싱 효율화)
  const normalizeCoordinates = ({
    lat,
    lng,
  }: UseGetMyTeamTileClusterParams): string => {
    // precision 6: 약 1.2km x 609m (클러스터는 더 넓은 영역 사용)
    return ngeohash.encode(lat, lng, 6)
  }

  const geohashKey = useMemo(
    () => normalizeCoordinates(params),
    [params.lat, params.lng, params.zoomLevel],
  )

  return useQuery<TileMapClusterResponse>({
    queryKey: ["getOneTeamTileCluster", zodiacId, geohashKey, params.zoomLevel],
    queryFn: () => getOneTeamTileMapCluster(zodiacId, params),
    enabled,
    staleTime: 1000 * 60 * 2, // 2분 - 캐싱 효율 증가
    gcTime: 1000 * 60 * 5, // 5분 - 캐시 유지 시간
  })
}

export default useGetMyTeamTileCluster
