"use client"

import { getTeamTileMapCluster } from "@/services/tile/api"
import { TileMapClusterResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"
import ngeohash from "ngeohash"
import { useMemo } from "react"

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
interface UseGetAllTilesParams {
  lat: number
  lng: number
  zoomLevel: number
}

const useGetAllTilesCluster = ({
  params,
  enabled,
}: useGetAllTilesClusterProps) => {
  // const queryClient = useQueryClient()
  // const interactionStartRef = useRef<number>(0)
  // const lastCheckedKeyRef = useRef<string>("")

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

  const query = useQuery<TileMapClusterResponse>({
    queryKey,
    queryFn: () => getTeamTileMapCluster(params),
    enabled,
    staleTime: 1000 * 60 * 2, // 2분 - 캐싱 효율 증가
    gcTime: 1000 * 60 * 5, // 5분 - 캐시 유지 시간
  })

  // useEffect(() => {
  //   if (process.env.NODE_ENV !== "development" || !enabled) {
  //     return
  //   }

  //   const cacheKeyString = `${geohashKey}-${params.zoomLevel}`

  //   // 캐시 키가 변경되었을 때만 체크
  //   if (cacheKeyString !== lastCheckedKeyRef.current) {
  //     const cachedData =
  //       queryClient.getQueryData<TileMapClusterResponse>(queryKey)

  //     if (cachedData && !query.isFetching) {
  //       apiMonitor.recordCall(1, true, "/tiles/teams/cluster")
  //       console.log("✅ 캐시 히트 (클러스터)", {
  //         geohashKey,
  //         zoom: params.zoomLevel,
  //         clusters: cachedData.tileClusterGetResponseList?.length,
  //       })
  //     } else {
  //       console.log("❌ 캐시 미스 - API 호출 필요 (클러스터)", {
  //         geohashKey,
  //         zoom: params.zoomLevel,
  //       })
  //     }

  //     lastCheckedKeyRef.current = cacheKeyString
  //   }
  // }, [
  //   geohashKey,
  //   params.zoomLevel,
  //   enabled,
  //   queryClient,
  //   queryKey,
  //   query.isFetching,
  // ])

  // // 인터랙션 지연 측정
  // useEffect(() => {
  //   if (process.env.NODE_ENV !== "development") return

  //   if (query.isFetching) {
  //     // 요청 시작
  //     interactionStartRef.current = performance.now()
  //   } else if (interactionStartRef.current > 0 && query.data) {
  //     // 요청 완료
  //     const delay = performance.now() - interactionStartRef.current
  //     apiMonitor.recordInteraction(delay)
  //     interactionStartRef.current = 0
  //   }
  // }, [query.isFetching, query.data])

  return query
}

export default useGetAllTilesCluster
