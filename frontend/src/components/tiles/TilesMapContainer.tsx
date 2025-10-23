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
  const {
    setCluster,
    setTiles,
    selectedOption,
    setIsClusterView,
    isClusterView,
  } = useTileMapStore(
    useShallow((state) => ({
      setCluster: state.setCluster,
      setTiles: state.setTiles,
      setIsClusterView: state.setIsClusterView,
      selectedOption: state.selectedOption,
      isClusterView: state.isClusterView,
    })),
  )

  // 타일 데이터 및 클러스터 데이터 가져오기 (selectedOption 값이 변경될 때마다 새로 호출)
  const { tileData, clusterData, updateBoundsParams, updateClusterParams } =
    useTileMapData({
      selectedOption,
      isClusterView,
      myZodiacId,
      memberId,
    })

  const { handleCenterChange } = useTileMapHandler({
    updateBoundsParams,
    updateClusterParams,
    setCluster,
    setTiles,
    setIsClusterView,
  })

  // 클러스터 데이터 업데이트
  useEffect(() => {
    setCluster(clusterData)
    console.log("clusterData", clusterData)
  }, [clusterData, setCluster])

  // 타일 데이터 업데이트
  useEffect(() => {
    setTiles(tileData)
    console.log("tileData", tileData)
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
