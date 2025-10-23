import { getPersonalTileMap } from "@/services/tile/api"
import { TileMapResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

interface useGetPersonalTileProps {
  memberId: string
  params: {
    lat: number
    lng: number
    localDate: string
  }
  enabled: boolean
}

interface UseGetPersonalTileParams {
  lat: number
  lng: number
}

const useGetPersonalTile = ({
  memberId,
  params,
  enabled,
}: useGetPersonalTileProps) => {
  // 1. 좌표를 ngeohash로 정규화 (캐싱 효율화)

  const normalizeCoordinates = ({
    lat,
    lng,
  }: UseGetPersonalTileParams): string => {
    return ngeohash.encode(lat, lng, 6)
  }

  const geohashKey = useMemo(
    () => normalizeCoordinates(params),
    [params.lat, params.lng, params.localDate],
  )

  const queryKey = useMemo(
    () => ["getPersonalTile", memberId, geohashKey, params.localDate],
    [memberId, geohashKey, params.localDate],
  )

  return useQuery<TileMapResponse>({
    queryKey,
    queryFn: () => getPersonalTileMap(memberId, params),
    enabled: enabled && !!memberId,
    staleTime: 1000 * 60 * 2, // 2분 - 캐싱 효율 증가
    gcTime: 1000 * 60 * 5, // 5분 - 캐시 유지 시간
  })
}

export default useGetPersonalTile
