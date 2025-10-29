import { getPersonalTileMapCluster } from "@/services/tile/api"
import { TileMapClusterResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"
import ngeohash from "ngeohash"
import { useMemo } from "react"

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

interface UseGetPersonalTileClusterParams {
  lat: number
  lng: number
}

const useGetPersonalTileCluster = ({
  memberId,
  params,
  enabled,
}: useGetPersonalTileClusterProps) => {
  const normalizeCoordinates = ({
    lat,
    lng,
  }: UseGetPersonalTileClusterParams): string => {
    return ngeohash.encode(lat, lng, 6)
  }

  const geohashKey = useMemo(
    () => normalizeCoordinates(params),
    [params.lat, params.lng, params.zoomLevel],
  )

  const queryKey = useMemo(
    () => ["getPersonalTileCluster", memberId, geohashKey, params.zoomLevel],
    [memberId, geohashKey, params.zoomLevel],
  )

  const query = useQuery<TileMapClusterResponse>({
    queryKey,
    queryFn: () => getPersonalTileMapCluster(params),
    enabled,
    staleTime: 1000 * 60 * 2, // 2분 - 캐싱 효율 증가
    gcTime: 1000 * 60 * 5, // 5분 - 캐시 유지 시간
  })

  return query
}

export default useGetPersonalTileCluster
