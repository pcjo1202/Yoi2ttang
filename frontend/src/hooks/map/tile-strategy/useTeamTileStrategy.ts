import useGetMyTeamTile from "@/hooks/tile/useGetMyTeamTile"
import useGetMyTeamTileCluster from "@/hooks/tile/useGetMyTeamTileCluster"
import { Coordinates } from "@/types/map/navermaps"
import {
  BoundsParams,
  ClusterParams,
  TileStrategyReturnType,
  TileViewOption,
} from "@/types/map/tile"
import { useState } from "react"

interface TeamTileStrategyProps {
  myZodiacId: number
  selectedOption: TileViewOption | null
  isClusterView: boolean
  enabled?: boolean
}

const useTeamTileStrategy = ({
  myZodiacId,
  selectedOption,
  isClusterView,
  enabled = false,
}: TeamTileStrategyProps): TileStrategyReturnType => {
  const [boundsParams, setBoundsParams] = useState<BoundsParams>({
    swLat: 0,
    swLng: 0,
    neLat: 0,
    neLng: 0,
  })

  const [teamClusterParams, setTeamClusterParams] = useState<ClusterParams>({
    lat: 0,
    lng: 0,
    zoomLevel: 0,
  })
  // 팀 타일
  const { data: teamTileData } = useGetMyTeamTile({
    zodiacId: myZodiacId,
    params: boundsParams,
    enabled: enabled && !isClusterView,
  })

  // 팀 클러스터
  const { data: teamClusterData } = useGetMyTeamTileCluster({
    zodiacId: myZodiacId,
    params: teamClusterParams,
    enabled: enabled && isClusterView,
  })

  // 타일 파라미터 업데이트
  const updateBoundsParams = (bounds: { sw: Coordinates; ne: Coordinates }) => {
    setBoundsParams({
      swLat: bounds.sw.lat,
      swLng: bounds.sw.lng,
      neLat: bounds.ne.lat,
      neLng: bounds.ne.lng,
    })
  }

  // 클러스터 파라미터 업데이트
  const updateClusterParams = (zoom: number, center: Coordinates) => {
    setTeamClusterParams({
      lat: center.lat,
      lng: center.lng,
      zoomLevel: zoom,
    })
  }

  return {
    tileData: teamTileData?.tileGetResponseList ?? [],
    clusterData: teamClusterData?.tileClusterGetResponseList ?? [],
    updateBoundsParams,
    updateClusterParams,
  }
}

export default useTeamTileStrategy
