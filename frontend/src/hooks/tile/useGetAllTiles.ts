"use client"

import { apiMonitor } from "@/lib/api-monitor"
import { getTeamTileMap } from "@/services/tile/api"
import { TileMapResponse } from "@/types/map/tile"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import ngeohash from "ngeohash"
import { useEffect, useMemo, useRef } from "react"

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
  const queryClient = useQueryClient()
  const interactionStartRef = useRef<number>(0)
  const lastCheckedGeohashRef = useRef<string>("")

  // 1. 요청 영역을 ngeohash로 정규화 (캐싱 효율화)
  const normalizeRequestBounds = ({
    neLat,
    neLng,
    swLat,
    swLng,
  }: UseGetAllTilesParams): string => {
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

  const queryKey = useMemo(() => ["allTiles", geohashKey], [geohashKey])

  // params가 유효한지 확인 (초기값 0,0,0,0이 아닌지)
  const isValidParams =
    params.swLat !== 0 ||
    params.swLng !== 0 ||
    params.neLat !== 0 ||
    params.neLng !== 0

  const query = useQuery<TileMapResponse>({
    queryKey,
    queryFn: () => getTeamTileMap(params),
    enabled: enabled && isValidParams,
    staleTime: 1000 * 60 * 2, // 2분 - 캐싱 효율 증가
    gcTime: 1000 * 60 * 5, // 5분 - 캐시 유지 시간
  })

  // ⚠️ 캐시 감지 비활성화 (디바운싱 테스트용)
  // staleTime: 0, gcTime: 0 일 때는 캐시 감지 로직 실행 안 함
  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || !enabled) {
      return
    }

    // geohash가 변경되었을 때만 체크
    if (geohashKey !== lastCheckedGeohashRef.current) {
      const cachedData = queryClient.getQueryData<TileMapResponse>(queryKey)

      if (cachedData && !query.isFetching) {
        apiMonitor.recordCall(1, true, "/tiles/teams/new")
        console.log("✅ 캐시 히트", {
          geohashKey,
          tiles: cachedData.tileGetResponseList?.length,
        })
      } else {
        console.log("❌ 캐시 미스 - API 호출 필요", {
          geohashKey,
          queryKeyUsed: queryKey,
        })
      }

      lastCheckedGeohashRef.current = geohashKey
    }
  }, [geohashKey, enabled, queryClient, queryKey, query.isFetching])

  // 인터랙션 지연 측정
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    if (query.isFetching) {
      // 요청 시작
      interactionStartRef.current = performance.now()
    } else if (interactionStartRef.current > 0 && query.data) {
      // 요청 완료
      const delay = performance.now() - interactionStartRef.current
      apiMonitor.recordInteraction(delay)
      interactionStartRef.current = 0
    }
  }, [query.isFetching, query.data])

  return query
}

export default useGetAllTiles
