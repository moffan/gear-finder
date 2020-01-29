import { HttpService } from "../utils";
import { DataStore } from "../utils/data-store";
import {
  PoeNinjaResponse,
  CurrencyOverviewType,
  ItemOverviewType
} from "./models";

export class PoeNinjaApi {
  private http = new HttpService();
  private dataStore = new DataStore();

  public async getCurrencyOverview(
    league: string,
    type: CurrencyOverviewType
  ): Promise<PoeNinjaResponse> {
    let data = await this.dataStore.read<PoeNinjaResponse>(type);
    if (!data) {
      const url = new URL("https://poe.ninja/api/data/currencyoverview");
      url.searchParams.append("league", league);
      url.searchParams.append("type", type);
      url.searchParams.append("language", "en");

      data = await this.http.get(url);
      if (!data) {
        return Promise.reject();
      }

      await this.dataStore.write(type, data);
    }

    return data;
  }

  public async getItemOverview(
    league: string,
    type: ItemOverviewType
  ): Promise<PoeNinjaResponse> {
    let data = await this.dataStore.read<PoeNinjaResponse>(type);
    if (!data) {
      const url = new URL("https://poe.ninja/api/data/itemoverview");
      url.searchParams.append("league", league);
      url.searchParams.append("type", type);
      url.searchParams.append("language", "en");

      data = await this.http.get(url);
      if (!data) {
        return Promise.reject();
      }

      await this.dataStore.write(type, data);

      return Promise.reject();
    }

    return data;
  }
}
