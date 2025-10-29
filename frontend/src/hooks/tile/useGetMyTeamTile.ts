"use client"

import { getOneTeamTileMap } from "@/services/tile/api"
import { TileMapResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"
import ngeohash from "ngeohash"
import { useMemo } from "react"

interface useGetMyTeamTileProps {
  zodiacId: number
  params: {
    swLat: number
    swLng: number
    neLat: number
    neLng: number
  }
  enabled: boolean
}

interface UseGetMyTeamTileParams {
  swLat: number
  swLng: number
  neLat: number
  neLng: number
}

const useGetMyTeamTile = ({
  zodiacId,
  params,
  enabled,
}: useGetMyTeamTileProps) => {
  // 1. 요청 영역을 ngeohash로 정규화 (캐싱 효율화)
  const normalizeRequestBounds = ({
    neLat,
    neLng,
    swLat,
    swLng,
  }: UseGetMyTeamTileParams): string => {
    const centerLat = (swLat + neLat) / 2
    const centerLng = (swLng + neLng) / 2

    // precision 7: 약 153m x 153m
    // 더 세밀한 캐싱으로 지도 이동 시 새로운 데이터 로드
    return ngeohash.encode(centerLat, centerLng, 6)
  }

  const geohashKey = useMemo(
    () => normalizeRequestBounds(params),
    [params.swLat, params.swLng, params.neLat, params.neLng],
  )

  return useQuery<TileMapResponse>({
    queryKey: ["teamTileMap", zodiacId, geohashKey],
    queryFn: () => getOneTeamTileMap(zodiacId, params),
    enabled,
    staleTime: 1000 * 60 * 2, // 2분 - 캐싱 효율 증가
    gcTime: 1000 * 60 * 5, // 5분 - 캐시 유지 시간
  })
}

export default useGetMyTeamTile
