import { CurrentLeagues, ItemStat } from "../../common";
import { HttpService } from "../utils";
import { DataStore } from "../utils/data-store";

interface Leagues {
  result: CurrentLeagues;
}
enum UrlsTradeApi {
  // LEAGUES = "http://api.pathofexile.com/leagues?type=main&compact=1",
  LEAGUES = "https://www.pathofexile.com/api/trade/data/leagues",
  STATS = "https://www.pathofexile.com/api/trade/data/stats",
  STATIC = "https://www.pathofexile.com/api/trade/data/static"
}

interface StatsResonse {
  result: {
    label: string;
    entries: ItemStat[];
  }[];
}

export class TradeApi {
  private data = new DataStore();
  private http = new HttpService();

  public async getCurrentLeagues(): Promise<Leagues> {
    const key = "current-leagues";
    let currentLeagues = await this.data.read<Leagues>(key);

    if (!currentLeagues) {
      currentLeagues = await this.http.get<Leagues>(UrlsTradeApi.LEAGUES);
      await this.data.write(key, currentLeagues);
    }

    return currentLeagues;
  }

  public async getStats() {
    const key = "stats";
    let stats: any = await this.data.read(key);

    if (!stats) {
      const response = await this.http.get<StatsResonse>(UrlsTradeApi.STATS);
      if (!!response) {
        stats = {};
        for (const { entries, label } of response.result) {
          stats[label.toLowerCase()] = entries;
        }

        await this.data.write(key, stats);
      }
    }

    return stats;
  }

  public async getStatic() {
    const key = "static";
    let stats: any = await this.data.read(key);

    if (!stats) {
      stats = await this.http.get<Leagues>(UrlsTradeApi.STATIC);
      if (!!stats) {
        await this.data.write(key, stats);
      }
    }

    return stats;
  }
}
