"use client"

import { getTeamTileMap } from "@/services/tile/api"
import { TileMapResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"
import ngeohash from "ngeohash"
import { useMemo } from "react"

interface params {
  params: {
    swLat: number
    swLng: number
    neLat: number
    neLng: number
  }
  enabled: boolean
}

interface UseGetAllTilesParams {
  swLat: number
  swLng: number
  neLat: number
  neLng: number
}

// 전체 점령 지도 확인 (팀 상관없이 좌쵸 근처에 대한 타일의 정보 가져옴)
export const useGetAllTiles = ({ params, enabled }: params) => {
  // const queryClient = useQueryClient()

  // 1. 요청 영역을 ngeohash로 정규화 (캐싱 효율화)
  const normalizeRequestBounds = ({
    neLat,
    neLng,
    swLat,
    swLng,
  }: UseGetAllTilesParams): string => {
    const centerLat = (swLat + neLat) / 2
    const centerLng = (swLng + neLng) / 2

    return ngeohash.encode(centerLat, centerLng, 6)
  }

  const geohashKey = useMemo(
    () => normalizeRequestBounds(params),
    [params.swLat, params.swLng, params.neLat, params.neLng],
  )

  const queryKey = useMemo(() => ["allTiles", geohashKey], [geohashKey])

  // params가 유효한지 확인 (초기값 0,0,0,0이 아닌지)
  const isValidParams =
    params.swLat !== 0 ||
    params.swLng !== 0 ||
    params.neLat !== 0 ||
    params.neLng !== 0

  return useQuery<TileMapResponse>({
    queryKey,
    queryFn: () => getTeamTileMap(params),
    enabled: enabled && isValidParams,
    staleTime: 1000 * 60 * 2, // 2분 - 캐싱 효율 증가
    gcTime: 1000 * 60 * 5, // 5분 - 캐시 유지 시간
    // select(data) {
    //   // const slicedData = data.tileGetResponseList.slice(0, 30) // 처음 30개만 캐싱

    //   data.tileGetResponseList.forEach((tile) => {
    //     queryClient.setQueryData(["tile", tile.geoHash], tile)
    //   })
    //   return data
    // },
  })
}

export default useGetAllTiles
