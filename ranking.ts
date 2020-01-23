import glicko from 'glicko2'
import { mergeAll } from 'ramda'

import db from './db'

export type PlayerData = {
  id: string
  name: string
  rating: number
  rd: number
  vol: number
  hat: string | undefined
}

export type PlayerWithGlicko = {
  data: PlayerData
  glicko: glicko.Player
}

/**
 * Returns an object where keys are the player ids and values
 * are their respective player objects
 */
export async function getPlayersRankings(): Promise<{
  [key: string]: PlayerWithGlicko
}> {
  return (await buildRanking()).players
}

/**
 * Returns a list of up to 100 players, with their id/name, rating, rating deviation,
 * and volatility
 */
export async function getPlayers(): Promise<Array<PlayerData>> {
  return db.getPlayers()
}

export interface NewMatch {
  first: string
  second: string[]
  third: string[]
  fourth: string[]
}

export async function addMatch(match: NewMatch) {
  return db.insertMatch({
    date: new Date(),
    first: [match.first],
    second: match.second,
    third: match.third,
    fourth: match.fourth
  })
}

export async function updateRankingWithMatch(match: NewMatch) {
  const { ranking, players } = await buildRanking()

  const race = ranking.makeRace([
    [players[match.first].glicko],
    match.second.filter(Boolean).map(playerId => players[playerId].glicko),
    match.third.filter(Boolean).map(playerId => players[playerId].glicko),
    match.fourth.filter(Boolean).map(playerId => players[playerId].glicko)
  ])

  ranking.updateRatings(race)

  const updatedPlayers = [match.first]
    .concat(match.second.filter(Boolean))
    .concat(match.third.filter(Boolean))
    .concat(match.fourth.filter(Boolean))

  return db.updatePlayers(
    updatedPlayers.map(playerId => ({
      id: playerId,
      rating: players[playerId].glicko.getRating(),
      rd: players[playerId].glicko.getRd(),
      vol: players[playerId].glicko.getVol()
    }))
  )
}

async function buildRanking(): Promise<{
  ranking: glicko.Glicko2
  players: { [key: string]: PlayerWithGlicko }
}> {
  const rankingSettings = {
    tau: 0.5,
    rating: 1500,
    rd: 200,
    vol: 0.06
  }

  const ranking = new glicko.Glicko2(rankingSettings)
  const playersData = await getPlayers()

  const playersRanking = mergeAll(
    playersData.map(player => ({
      [player.id]: {
        data: player,
        glicko: ranking.makePlayer(player.rating, player.rd, player.vol)
      }
    }))
  )

  return {
    ranking,
    players: playersRanking
  }
}
