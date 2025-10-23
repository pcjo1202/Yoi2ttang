import { getOneTeamTileMapCluster } from "@/services/tile/api"
import { TileMapClusterResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"

interface useGetMyTeamTileClusterProps {
  zodiacId: number
  params: {
    lat: number
    lng: number
    zoomLevel: number
  }
  enabled: boolean
}
// 특정 팀 점령 지도 클러스터 확인
const useGetMyTeamTileCluster = ({
  zodiacId,
  params,
  enabled,
}: useGetMyTeamTileClusterProps) => {
  return useQuery<TileMapClusterResponse>({
    queryKey: [
      "getOneTeamTileCluster",
      zodiacId,
      params.lat,
      params.lng,
      params.zoomLevel,
    ],
    queryFn: () => getOneTeamTileMapCluster(zodiacId, params),
    enabled: enabled,
  })
}

export default useGetMyTeamTileCluster
