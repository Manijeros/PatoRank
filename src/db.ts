import Airtable from 'airtable'
import MD5 from 'react-native-md5'

type PlayerType = {
  id: string
  name: string
  rating: number
  rd: number
  vol: number
  hat: string | undefined
  matchesCount: number[]
}

type MatchType = {
  date?: Date
  first: string[]
  second: string[]
  third?: string[]
  fourth?: string[]
}

let base: Airtable.BaseGetterFunction

function setup(baseId: string, secret: string) {
  Airtable.configure({
    apiKey: secret
  })
  base = Airtable.base(baseId)
}

function parseAttachment(
  picture: { url: string }[] | undefined
): string | undefined {
  if (picture == null || picture.length === 0) {
    return undefined
  }
  return picture[0].url
}

type Links = Array<string> | undefined

function parseMatchesCount(c1: Links, c2: Links, c3: Links) {
  return [c1 ? c1.length : 0, c2 ? c2.length : 0, c3 ? c3.length : 0]
}

async function getPlayers() {
  return new Promise<PlayerType[]>((resolve, reject) => {
    // TODO: This returns up to 100 players
    base<PlayerType>('Players')
      .select()
      .firstPage((err, records) => {
        if (err) {
          return reject(err)
        }

        resolve(
          records
            .map(record => ({
              id: record.id,
              name: record.get('name'),
              rating: record.get('rating'),
              rd: record.get('rd'),
              vol: record.get('vol'),
              hat: parseAttachment(record.get('hat')),
              matchesCount: parseMatchesCount(
                record.get('Matches 1'),
                record.get('Matches 2'),
                record.get('Matches 3')
              )
            }))
            .sort((a, b) => b.rating - a.rating)
        )
      })
  })
}

async function updatePlayers(
  updatedPlayersData: Array<{
    id: string
    rating: number
    rd: number
    vol: number
  }>
) {
  return new Promise((resolve, reject) => {
    base<PlayerType>('Players').update(
      updatedPlayersData.map(data => ({
        id: data.id,
        fields: { rating: data.rating, rd: data.rd, vol: data.vol }
      })),
      err => (err ? reject(err) : resolve())
    )
  })
}

async function insertMatch(match: MatchType) {
  return base<MatchType>('Matches').create(match)
}

export type Auth = {
  id: string
  name: string
}

async function authenticate(username: string, password: string) {
  username = username.toLowerCase()
  const hashed = 'a:' + MD5.hex_md5(username + '-' + password).toLowerCase()
  return new Promise<Auth>((resolve, reject) => {
    // TODO: This returns up to 100 players
    base<PlayerType>('Players')
      .select()
      .firstPage((err, records) => {
        if (err) {
          return reject(err)
        }
        const retval = records
          .filter(
            record =>
              record.get('name').toLowerCase() === username &&
              record.get('password') === hashed
          )
          .map(record => ({
            id: record.id,
            name: record.get('name')
          }))[0]
        if (retval) {
          resolve(retval)
        } else {
          reject('Username or password incorrect!')
        }
      })
  })
}

export default { setup, getPlayers, updatePlayers, insertMatch, authenticate }
