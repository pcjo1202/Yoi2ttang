"use client"

import useTileMapData from "@/hooks/map/useTileMapData"
import useTileMapHandler from "@/hooks/map/useTileMapHandler"
import useTileMapStore from "@/stores/useTileMapStore"
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"
import TilesMap from "./TilesMap"

interface TilesMapContainerProps {
  myZodiacId: number
  memberId: string
}

const TilesMapContainer = ({
  myZodiacId,
  memberId,
}: TilesMapContainerProps) => {
  const { setCluster, setTiles, selectedOption } = useTileMapStore(
    useShallow((state) => ({
      setCluster: state.setCluster,
      setTiles: state.setTiles,
      selectedOption: state.selectedOption,
    })),
  )

  const { tileData, clusterData, updateBoundsParams, updateClusterParams } =
    useTileMapData({
      selectedOption,
      myZodiacId,
      memberId,
    })

  const { handleCenterChange } = useTileMapHandler({
    updateBoundsParams,
    updateClusterParams,
    setCluster,
    setTiles,
  })

  // 클러스터 데이터 업데이트
  useEffect(() => {
    setCluster(clusterData)
  }, [clusterData, setCluster])

  // 타일 데이터 업데이트
  useEffect(() => {
    setTiles(tileData)
  }, [tileData, setTiles])

  return (
    <TilesMap
      myZodiacId={myZodiacId}
      memberId={memberId}
      zoom={16}
      onCenterChange={handleCenterChange}
    />
  )
}
export default TilesMapContainer
