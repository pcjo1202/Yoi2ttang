import { TileStrategyReturnType, TileViewOption } from "@/types/map/tile"
import { useMemo } from "react"
import {
  useAllTilesStrategy,
  usePersonalTileStrategy,
  useTeamTileStrategy,
} from "./tile-strategy"

interface TileDataFetcherProps {
  selectedOption: TileViewOption | null
  myZodiacId: number
  isClusterView: boolean
  memberId: string
}

const useTileMapData = ({
  selectedOption,
  isClusterView,
  myZodiacId,
  memberId,
}: TileDataFetcherProps): TileStrategyReturnType => {
  // 전체 타일
  const allTiles = useAllTilesStrategy({
    selectedOption,
    isClusterView,
    enabled:
      selectedOption === TileViewOption.ALL ||
      selectedOption === TileViewOption.UNCLAIMED,
  })

  // 팀 타일
  const teamTiles = useTeamTileStrategy({
    isClusterView,
    myZodiacId,
    selectedOption,
    enabled: selectedOption === TileViewOption.TEAM,
  })

  // 개인 타일
  const personalTiles = usePersonalTileStrategy({
    isClusterView,
    memberId,
    enabled: selectedOption === TileViewOption.MY,
  })

  return useMemo(() => {
    switch (selectedOption) {
      case TileViewOption.ALL:
      case TileViewOption.UNCLAIMED:
        return allTiles
      case TileViewOption.TEAM:
        return teamTiles
      case TileViewOption.MY:
        return personalTiles
      default:
        return personalTiles
    }
  }, [allTiles, teamTiles, personalTiles, selectedOption])
}

export default useTileMapData
