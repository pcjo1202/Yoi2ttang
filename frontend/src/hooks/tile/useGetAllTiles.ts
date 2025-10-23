import { getTeamTileMap } from "@/services/tile/api"
import { TileMapResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"

interface params {
  params: {
    swLat: number
    swLng: number
    neLat: number
    neLng: number
  }
  enabled: boolean
}

// 전체 점령 지도 확인 (팀 상관없이 좌쵸 근처에 대한 타일의 정보 가져옴)
export const useGetAllTiles = ({ params, enabled }: params) => {
  return useQuery<TileMapResponse>({
    queryKey: [
      "allTiles",
      params.swLat,
      params.swLng,
      params.neLat,
      params.neLng,
    ],
    queryFn: () => getTeamTileMap(params),
    enabled: enabled,
  })
}

export default useGetAllTiles
