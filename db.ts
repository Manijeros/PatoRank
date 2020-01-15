import Airtable from "airtable";

type PlayerType = {
  id: string;
  name: string;
  rating: number;
  rd: number;
  vol: number;
  hat: string | undefined;
};

let base: Airtable.BaseGetterFunction

function setup(baseId: string, secret: string) {
  Airtable.configure({
    apiKey: secret
  });
  base = Airtable.base(baseId);
}

function parseAttachment(picture: { url: string }[] | undefined): string | undefined {
  if (picture == null || picture.length == 0) {
    return undefined
  }
  return picture[0].url
}

async function getPlayers() {
  return new Promise<PlayerType[]>((resolve, reject) => {
    // TODO: This returns up to 100 players
    base<PlayerType>("Players")
      .select()
      .firstPage((err, records) => {
        if (err) {
          return reject(err);
        }

        resolve(
          records.map(record => ({
            id: record.id,
            name: record.get("name"),
            rating: record.get("rating"),
            rd: record.get("rd"),
            vol: record.get("vol"),
            hat: parseAttachment(record.get("hat"))
          })).sort((a, b) => b.rating - a.rating)
        );
      });
  });
}

async function updatePlayers(
  updatedPlayersData: Array<{
    id: string;
    rating: number;
    rd: number;
    vol: number;
  }>
) {
  return new Promise((resolve, reject) => {
    base<PlayerType>("Players").update(
      updatedPlayersData.map(data => ({
        id: data.id,
        fields: { rating: data.rating, rd: data.rd, vol: data.vol }
      })),
      err => (err ? reject(err) : resolve())
    );
  });
}

export default { setup, getPlayers, updatePlayers };
