"use client"

import { getTeamTileMapCluster } from "@/services/tile/api"
import { TileMapClusterResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"
import ngeohash from "ngeohash"
import { useMemo } from "react"

interface useGetAllTilesClusterProps {
  params: {
    lat: number
    lng: number
    zoomLevel: number
  }
  enabled: boolean
}
interface UseGetAllTilesParams {
  lat: number
  lng: number
  zoomLevel: number
}

const useGetAllTilesCluster = ({
  params,
  enabled,
}: useGetAllTilesClusterProps) => {
  // 1. 좌표를 ngeohash로 정규화 (캐싱 효율화)
  const normalizeCoordinates = ({ lat, lng }: UseGetAllTilesParams): string => {
    // precision 6: 약 1.2km x 609m (클러스터는 더 넓은 영역 사용)
    return ngeohash.encode(lat, lng, 6)
  }

  const geohashKey = useMemo(
    () => normalizeCoordinates(params),
    [params.lat, params.lng],
  )

  const queryKey = useMemo(
    () => ["allTilesCluster", geohashKey, params.zoomLevel],
    [geohashKey, params.zoomLevel],
  )

  return useQuery<TileMapClusterResponse>({
    queryKey,
    queryFn: () => getTeamTileMapCluster(params),
    enabled,
    staleTime: 1000 * 60 * 2, // 2분 - 캐싱 효율 증가
    gcTime: 1000 * 60 * 5, // 5분 - 캐시 유지 시간
  })
}

export default useGetAllTilesCluster
