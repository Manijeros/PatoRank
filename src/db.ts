import Airtable, { Attachments } from 'airtable'
import MD5 from 'react-native-md5'

type PlayerType = {
  id: string
  name: string
  rating: number
  rd: number
  vol: number
  hat?: string
  matchesCount: number[]
}
type PlayerBaseType = {
  name: string
  rating: number
  rd: number
  vol: number
  hat: Attachments
  password: string
  'Matches 1'?: string[]
  'Matches 2'?: string[]
  'Matches 3'?: string[]
  'Matches 4'?: string[]
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
  picture?: Attachments
): string | undefined {
  if (!picture || picture.length === 0) {
    return undefined
  }
  return picture[0].url
}

function parseMatchesCount(c1?: string[], c2?: string[], c3?: string[]) {
  return [c1 ? c1.length : 0, c2 ? c2.length : 0, c3 ? c3.length : 0]
}

async function getPlayers() {
  return new Promise<PlayerType[]>((resolve, reject) => {
    base<PlayerBaseType>('Players')
      .select()
      .all((err, records) => {
        if (err) {
          return reject(err)
        }

        resolve(
          records
            .map(record => ({
              id: record.id,
              name: record.fields.name,
              rating: record.fields.rating,
              rd: record.fields.rd,
              vol: record.fields.vol,
              hat: parseAttachment(record.get('hat')),
              matchesCount: parseMatchesCount(
                record.fields['Matches 1'],
                record.fields['Matches 2'],
                record.fields['Matches 3']
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
    base<PlayerBaseType>('Players').update(
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
    base<PlayerBaseType>('Players')
      .select({
        filterByFormula: `AND(LOWER(name) = '${username}', password = '${hashed}')`
      })
      .firstPage((err, records) => {
        if (err) {
          return reject(err)
        }
        console.log(records)
        const retval = records.map(record => ({
          id: record.id,
          name: record.fields.name
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
