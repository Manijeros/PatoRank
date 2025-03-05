import { PlayerData } from "@src/ranking"

export type PatoRoutesParams = {
  AddMatch: {
    players: PlayerData[]
  }
  Rankings: {}
  SelectPlayers: {
    players: PlayerData[]
  }
}