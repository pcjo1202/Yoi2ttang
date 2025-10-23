import { getPersonalTileMap } from "@/services/tile/api"
import { TileMapResponse } from "@/types/map/tile"
import { useMutation, useQuery } from "@tanstack/react-query"

interface useGetPersonalTileProps {
  memberId: string
  params: params
  enabled: boolean
}

interface params {
  lat: number
  lng: number
  localDate: string
}

const useGetPersonalTile = ({
  memberId,
  params,
  enabled,
}: useGetPersonalTileProps) => {
  return useQuery<TileMapResponse>({
    queryKey: [
      "getPersonalTile",
      memberId,
      params.lat,
      params.lng,
      params.localDate,
    ],
    queryFn: () => getPersonalTileMap(memberId, params),
    enabled: enabled && !!memberId,
  })
}

export const useGetPersonalTileMutation = ({
  memberId,
}: useGetPersonalTileProps) => {
  return useMutation({
    mutationKey: ["getPersonalTile"],
    mutationFn: (params: params) => getPersonalTileMap(memberId, params),
  })
}

export default useGetPersonalTile
