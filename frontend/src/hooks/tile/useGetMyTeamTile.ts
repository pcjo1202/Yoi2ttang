"use client"

import { getOneTeamTileMap } from "@/services/tile/api"
import { TileMapResponse } from "@/types/map/tile"
import { useQuery } from "@tanstack/react-query"

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

const useGetMyTeamTile = ({
  zodiacId,
  params,
  enabled,
}: useGetMyTeamTileProps) => {
  return useQuery<TileMapResponse>({
    queryKey: [
      "teamTileMap",
      zodiacId,
      params.swLat,
      params.swLng,
      params.neLat,
      params.neLng,
    ],
    queryFn: () => getOneTeamTileMap(zodiacId, params),
    enabled: enabled,
  })
}

export default useGetMyTeamTile
