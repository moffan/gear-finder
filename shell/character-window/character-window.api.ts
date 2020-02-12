import { Poe } from "../../common";
import { DataStore, HttpService } from "../utils";
import { StashTabResponse } from "./models";

enum UrlsCharacterWindow {
  GET_CHARACTERS = "https://www.pathofexile.com/character-window/get-characters",
  URL_STASH_ITEMS = `https://www.pathofexile.com/character-window/get-stash-items`
}

export class CharacterWindowApi {
  private readonly httpService: HttpService = new HttpService();
  private readonly store = new DataStore();

  public async getStashTabs(
    poesessid: string,
    accountName: string,
    realm: string,
    league: string
  ): Promise<StashTabResponse> {
    let tabs = await this.store.read<StashTabResponse>("getStashTabs");

    if (!tabs) {
      const url = new URL(UrlsCharacterWindow.URL_STASH_ITEMS);
      url.searchParams.append("accountName", accountName);
      url.searchParams.append("realm", realm);
      url.searchParams.append("league", league);
      url.searchParams.append("tabs", "1");

      tabs = await this.httpService.get(url, poesessid);
      if (tabs) {
        this.store.write("getStashTabs", tabs);
      }
    }

    return tabs as any;
  }

  public async getStashItems(
    poesessid: string,
    accountName: string,
    realm: string,
    league: string,
    tabs: number,
    indices: number[]
  ): Promise<any> {
    const requests = indices.map(async index => {
      const key = `${accountName}${league}${index}`;
      let storedTab = await this.store.read<StashTabResponse>(key);

      if (!storedTab) {
        const url = new URL(UrlsCharacterWindow.URL_STASH_ITEMS);
        url.searchParams.append("accountName", accountName);
        url.searchParams.append("realm", realm);
        url.searchParams.append("league", league);
        url.searchParams.append("tabs", tabs.toString());
        url.searchParams.append("tabIndex", index.toString());
        url.searchParams.append("public", "false");

        storedTab = await this.httpService.get(url, poesessid);
        if (storedTab) {
          await this.store.write(key, storedTab);
        }
      }

      return storedTab ? storedTab.items : [];
    });

    const stashTabsItems = await Promise.all(requests);
    return stashTabsItems.flat();
  }

  public async getCharacterList(poesessid: string): Promise<Poe.Character[]> {
    const key = "characters";

    let characters = await this.store.read<Poe.Character[]>(key);

    if (!characters) {
      characters = await this.httpService.get(
        UrlsCharacterWindow.GET_CHARACTERS,
        poesessid
      );

      if (!!characters) {
        this.store.write(key, characters);
      }
    }

    return characters ?? [];
  }

  public async getCharacter(
    poesessid: string,
    accountName: string,
    name: string
  ): Promise<{ items: Poe.Item[]; character: Poe.Character }> {
    const key = `character_${name}`;
    let character = await this.store.read<any>(key);

    if (!character) {
      const url = new URL(
        "https://www.pathofexile.com/character-window/get-items"
      );

      url.searchParams.append("character", name);
      url.searchParams.append("accountName", accountName);

      character = await this.httpService.get(url.toJSON(), poesessid);

      if (!!character) {
        this.store.write(key, character);
      }
    }

    return character;
  }
}
