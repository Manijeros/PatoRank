import Airtable, { Attachment } from 'airtable'
import { PlayerData } from './ranking'

type PlayerType = {
  id: string
  name: string
  rating: number
  rd: number
  vol: number
  hat: string | undefined
  matchesCount: number[]
}
type PlayerAirtableType = {
  id: string
  name: string
  rating: number
  rd: number
  vol: number
  hat?: readonly Attachment[]
  C1: number
  C2: number
  C3: number
  C4: number
}

type MatchType = {
  date: Date
  first: string[]
  second: string[]
  third?: string[]
  fourth?: string[]
}
type MatchAirtableType = {
  date: string
  first: readonly string[]
  second: readonly string[]
  third?: readonly string[]
  fourth?: readonly string[]
}

let base: Airtable.Base

function setup(baseId: string, secret: string) {
  Airtable.configure({
    apiKey: secret
  })
  base = Airtable.base(baseId)
}

function parseAttachment(
  picture: readonly Attachment[] | undefined
): string | undefined {
  if (picture == null || picture.length === 0) {
    return undefined
  }
  return picture[0].url
}

async function getPlayers() {
  return new Promise<PlayerType[]>((resolve, reject) => {
    // TODO: This returns up to 100 players
    base<PlayerAirtableType>('Players')
      .select({
        fields: ["name", "rating", "rd", "vol", "hat", "C1", "C2", "C3", "C4"]
      })
      .firstPage((err, records) => {
        if (err) {
          return reject(err)
        }

        if (records) {
          resolve(
            records
              .map(record => ({
                id: record.id,
                name: record.get('name'),
                rating: record.get('rating'),
                rd: record.get('rd'),
                vol: record.get('vol'),
                hat: parseAttachment(record.get('hat')),
                matchesCount: [
                  record.get('C1'),
                  record.get('C2'),
                  record.get('C3'),
                  record.get('C4'),
                ]
              }))
              .sort(comparePlayers)
            )
        } else {
          reject(err)
        }
      })
  })
}
function comparePlayers(a: PlayerData, b: PlayerData): number {
  const hasPlayed = (p: PlayerData) => p.matchesCount.reduce((s,v) => s + v, 0) > 0
  const aHasPlayed = hasPlayed(a)
  const bHasPlayed = hasPlayed(b)
  return bHasPlayed === aHasPlayed ? b.rating - a.rating : bHasPlayed > aHasPlayed ? 1 : -1
}

async function getMatches() {
  return new Promise<MatchType[]>((resolve, reject) => {
    // TODO: This returns up to 100 players
    base<MatchAirtableType>('Matches')
      .select()
      .all((err, records) => {
        if (err) {
          return reject(err)
        }

        if (records) {
          resolve(
            records
              .map(record => ({
                date: new Date(record.fields.date),
                first: record.fields.first.concat(),
                second: record.fields.second.concat(),
                third: record.fields.third?.concat(),
                fourth: record.fields.fourth?.concat()
              }))
            )
        } else {
          reject(err)
        }
      })
  })
}

async function updatePlayers(
  updatedPlayersData: {
    id: string
    rating: number
    rd: number
    vol: number
  }[]
) {
  return new Promise((resolve, reject) => {
    base<PlayerAirtableType>('Players').update(
      updatedPlayersData.map(data => ({
        id: data.id,
        fields: { rating: data.rating, rd: data.rd, vol: data.vol }
      })),
      err => (err ? reject(err) : resolve())
    )
  })
}

async function insertMatch(match: MatchType) {
  return base<MatchAirtableType>('Matches').create({
    ...match,
    date: match.date?.toISOString()
  })
}

export default { setup, getPlayers, getMatches, updatePlayers, insertMatch }
