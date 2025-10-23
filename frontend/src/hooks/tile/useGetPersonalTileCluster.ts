import { getPersonalTileMapCluster } from "@/services/tile/api"
import { TileMapClusterResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"

interface useGetPersonalTileClusterProps {
  memberId: string
  params: {
    localDate: string
    lat: number
    lng: number
    zoomLevel: number
  }
  enabled: boolean
}

const useGetPersonalTileCluster = ({
  memberId,
  params,
  enabled,
}: useGetPersonalTileClusterProps) => {
  return useQuery<TileMapClusterResponse>({
    queryKey: [
      "getPersonalTileCluster",
      memberId,
      params.localDate,
      params.lat,
      params.lng,
      params.zoomLevel,
    ],
    queryFn: () => getPersonalTileMapCluster(params),
    enabled: enabled,
  })
}

export default useGetPersonalTileCluster
