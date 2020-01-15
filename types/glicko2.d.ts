declare module "glicko2" {
  class Glicko2 {
    constructor(settings: RankingSettings);
    makePlayer: (rating: number, rd: number, vol: number) => Player;
    makeRace: (positions: Array<Array<Player>>) => Race;
    updateRatings: (race: Race) => void;
  }

  class Player {
    getRating: () => number;
    getRd: () => number;
    getVol: () => number;
  }

  class Race {}

  type RankingSettings = {
    tau: number;
    rating: number;
    rd: number;
    vol: number;
  };
}
