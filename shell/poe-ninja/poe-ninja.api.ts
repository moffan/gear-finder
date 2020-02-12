import { HttpService } from "../utils";
import { DataStore } from "../utils/data-store";
import {
  CurrencyOverviewType,
  ItemOverviewType,
  PoeNinjaResponse
} from "./models";

enum UrlsPoeNinja {
  // MAP_OVERVIEW = "http://poe.ninja/api/Data/GetMapOverview",
  CURRENCY_OVERVIEW = "https://poe.ninja/api/data/currencyoverview",
  ITEMS_OVERVIEW = "https://poe.ninja/api/data/itemoverview"
  // FRAGMENT_OVERVIEW = "http://poe.ninja/api/Data/GetFragmentOverview",
  // ESSENCE_OVERVIEW = "http://poe.ninja/api/Data/GetEssenceOverview",
  // DIV_CARDS_OVERVIEW = "http://poe.ninja/api/Data/GetDivinationCardsOverview",
  // SKILL_GEM_OVERVIEW = "http://poe.ninja/api/Data/GetSkillGemOverview",
  // UNIQUE_MAP_OVERVIEW = "http://poe.ninja/api/Data/GetUniqueMapOverview",
  // UNIQUE_JEWEL_OVERVIEW = "http://poe.ninja/api/Data/GetUniqueJewelOverview",
  // UNIQUE_FLASK_OVERVIEW = "http://poe.ninja/api/Data/GetUniqueFlaskOverview",
  // UNIQUE_WEAPON_OVERVIEW = "http://poe.ninja/api/Data/GetUniqueWeaponOverview",
  // UNIQUE_ARMOUR_OVERVIEW = "http://poe.ninja/api/Data/GetUniqueArmourOverview",
  // UNIQUE_ACCESSORY_OVERVIEW = "http://poe.ninja/api/Data/GetUniqueAccessoryOverview"
}

export class PoeNinjaApi {
  private http = new HttpService();
  private dataStore = new DataStore();

  public async getCurrencyOverview(
    league: string,
    type: CurrencyOverviewType
  ): Promise<PoeNinjaResponse> {
    let data = await this.dataStore.read<PoeNinjaResponse>(type);
    if (!data) {
      const url = new URL(UrlsPoeNinja.CURRENCY_OVERVIEW);
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
      const url = new URL(UrlsPoeNinja.ITEMS_OVERVIEW);
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
