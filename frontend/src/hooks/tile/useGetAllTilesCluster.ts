import { getTeamTileMapCluster } from "@/services/tile/api"
import { TileMapClusterResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"

// 전체 점령 지도 클러스터 확인
// const useGetTeamTileCluster = () => {
//   return useMutation({
//     mutationKey: ["teamTileCluster"],
//     mutationFn: (params: { lat: number; lng: number; zoomLevel: number }) =>
//       getTeamTileMapCluster(params),
//   })
// }

interface useGetAllTilesClusterProps {
  params: {
    lat: number
    lng: number
    zoomLevel: number
  }
  enabled: boolean
}

const useGetAllTilesCluster = ({
  params,
  enabled,
}: useGetAllTilesClusterProps) => {
  return useQuery<TileMapClusterResponse>({
    queryKey: ["teamTileCluster", params.lat, params.lng, params.zoomLevel],
    queryFn: () =>
      getTeamTileMapCluster({
        lat: params.lat,
        lng: params.lng,
        zoomLevel: params.zoomLevel,
      }),
    enabled: enabled,
  })
}

export default useGetAllTilesCluster
