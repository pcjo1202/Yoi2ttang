import useGetAllTiles from "@/hooks/tile/useGetAllTiles"
import useGetAllTilesCluster from "@/hooks/tile/useGetAllTilesCluster"
import { Coordinates } from "@/types/map/navermaps"
import {
  BoundsParams,
  ClusterParams,
  TileStrategyReturnType,
  TileViewOption,
} from "@/types/map/tile"
import { useMemo, useState } from "react"

interface AllTilesStrategyProps {
  selectedOption: TileViewOption | null
  enabled?: boolean
}

const useAllTilesStrategy = ({
  selectedOption,
  enabled = false,
}: AllTilesStrategyProps): TileStrategyReturnType => {
  const [boundsParams, setBoundsParams] = useState<BoundsParams>({
    swLat: 0,
    swLng: 0,
    neLat: 0,
    neLng: 0,
  })

  const [allClusterParams, setAllClusterParams] = useState<ClusterParams>({
    lat: 0,
    lng: 0,
    zoomLevel: 0,
  })

  const { data: allTilesData } = useGetAllTiles({
    params: boundsParams,
    enabled,
  })

  const { data: allClusterData } = useGetAllTilesCluster({
    params: allClusterParams,
    enabled,
  })

  // ✅ FIX: 필터링 추가
  const filteredTiles = useMemo(() => {
    const tiles = allTilesData?.tileGetResponseList ?? []

    if (selectedOption === TileViewOption.UNCLAIMED) {
      return tiles.filter((tile) => tile.zodiacId === null)
    } else if (selectedOption === TileViewOption.ALL) {
      return tiles.filter((tile) => tile.zodiacId !== null)
    }

    return tiles
  }, [allTilesData, selectedOption])

  const updateBoundsParams = (bounds: { sw: Coordinates; ne: Coordinates }) => {
    setBoundsParams({
      swLat: bounds.sw.lat,
      swLng: bounds.sw.lng,
      neLat: bounds.ne.lat,
      neLng: bounds.ne.lng,
    })
  }

  const updateClusterParams = (zoom: number, center: Coordinates) => {
    setAllClusterParams({
      lat: center.lat,
      lng: center.lng,
      zoomLevel: zoom,
    })
  }

  return {
    tileData: filteredTiles,
    clusterData: allClusterData?.tileClusterGetResponseList ?? [],
    updateBoundsParams,
    updateClusterParams,
  }
}

export default useAllTilesStrategy
