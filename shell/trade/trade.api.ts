import { DataStore } from "../utils/data-store";
import { CurrentLeagues, ItemStat } from "../../common";
import { HttpService } from "../utils";

interface Leagues {
  result: CurrentLeagues;
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
      const url = "https://www.pathofexile.com/api/trade/data/leagues";
      currentLeagues = await this.http.get<Leagues>(url);
      await this.data.write(key, currentLeagues);
    }

    return currentLeagues;
  }

  public async getStats() {
    const key = "stats";
    let stats: any = await this.data.read(key);

    if (!stats) {
      const url = "https://www.pathofexile.com/api/trade/data/stats";
      const response = await this.http.get<StatsResonse>(url);
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
      const url = "https://www.pathofexile.com/api/trade/data/static";
      stats = await this.http.get<Leagues>(url);
      if (!!stats) {
        await this.data.write(key, stats);
      }
    }

    return stats;
  }
}
