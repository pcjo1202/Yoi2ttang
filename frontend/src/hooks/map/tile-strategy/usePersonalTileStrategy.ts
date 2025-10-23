import useGetPersonalTile from "@/hooks/tile/useGetPersonalTile"
import useGetPersonalTileCluster from "@/hooks/tile/useGetPersonalTileCluster"
import { Coordinates } from "@/types/map/navermaps"
import {
  ClusterParams,
  TileParams,
  TileStrategyReturnType,
} from "@/types/map/tile"
import { useState } from "react"

interface PersonalTileStrategyProps {
  memberId: string
  enabled?: boolean
}

const usePersonalTileStrategy = ({
  memberId,
  enabled = false,
}: PersonalTileStrategyProps): TileStrategyReturnType => {
  const [personalTileParams, setPersonalTileParams] = useState<TileParams>({
    lat: 0,
    lng: 0,
    localDate: "",
  })

  const [personalClusterParams, setPersonalClusterParams] = useState<
    ClusterParams & { localDate: string }
  >({
    lat: 0,
    lng: 0,
    zoomLevel: 0,
    localDate: "",
  })

  // 개인 타일
  const { data: personalTileData } = useGetPersonalTile({
    memberId,
    params: personalTileParams,
    enabled,
  })

  // 개인 클러스터
  const { data: personalClusterData } = useGetPersonalTileCluster({
    memberId,
    params: personalClusterParams,
    enabled,
  })

  // 타일 파라미터 업데이트
  const updateBoundsParams = (bounds: { sw: Coordinates; ne: Coordinates }) => {
    const center = {
      lat: (bounds.sw.lat + bounds.ne.lat) / 2,
      lng: (bounds.sw.lng + bounds.ne.lng) / 2,
    }
    setPersonalTileParams({
      lat: center.lat,
      lng: center.lng,
      localDate: new Date().toISOString().split("T")[0],
    })
  }

  // 클러스터 파라미터 업데이트
  const updateClusterParams = (zoom: number, center: Coordinates) => {
    setPersonalClusterParams({
      lat: center.lat,
      lng: center.lng,
      zoomLevel: zoom,
      localDate: new Date().toISOString().split("T")[0],
    })
  }

  return {
    tileData: personalTileData?.tileGetResponseList ?? [],
    clusterData: personalClusterData?.tileClusterGetResponseList ?? [],
    updateBoundsParams,
    updateClusterParams,
  }
}

export default usePersonalTileStrategy
