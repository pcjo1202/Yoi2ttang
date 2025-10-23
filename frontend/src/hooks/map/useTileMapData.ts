import { TileStrategyReturnType, TileViewOption } from "@/types/map/tile"
import {
  useAllTilesStrategy,
  usePersonalTileStrategy,
  useTeamTileStrategy,
} from "./tile-strategy"

interface TileDataFetcherProps {
  selectedOption: TileViewOption | null
  myZodiacId: number
  memberId: string
}

const useTileMapData = ({
  selectedOption,
  myZodiacId,
  memberId,
}: TileDataFetcherProps): TileStrategyReturnType => {
  // 전체 타일
  const allTiles = useAllTilesStrategy({
    selectedOption,
    enabled:
      selectedOption === TileViewOption.ALL ||
      selectedOption === TileViewOption.UNCLAIMED,
  })

  // 팀 타일
  const teamTiles = useTeamTileStrategy({
    myZodiacId,
    selectedOption,
    enabled: selectedOption === TileViewOption.TEAM,
  })

  // 개인 타일
  const personalTiles = usePersonalTileStrategy({
    memberId,
    enabled: selectedOption === TileViewOption.MY,
  })

  switch (selectedOption) {
    case TileViewOption.ALL:
    case TileViewOption.UNCLAIMED:
      return allTiles
    case TileViewOption.TEAM:
      return teamTiles
    case TileViewOption.MY:
    case null:
      return personalTiles
    default:
      console.error(`Invalid selected option: ${selectedOption}`)
      return personalTiles // fallback
  }
}

export default useTileMapData
