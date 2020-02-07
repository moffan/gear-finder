import { ipcMain } from "electron";
import { PoeRequests, IpcEvent, IpcRequest } from "../../common";
import { CharacterWindowApi } from "./character-window.api";

const api = new CharacterWindowApi();

ipcMain.on(
  PoeRequests.StashTab,
  async (
    { sender }: IpcEvent,
    {
      payload,
      onError,
      onSuccess
    }: IpcRequest<{
      poesessid: string;
      accountName: string;
      league: string;
      tabs: number[];
    }>
  ) => {
    if (!payload) {
      return sender.send(
        onError,
        "payload with accountName and poesessid must be provided"
      );
    }

    const { accountName, poesessid, league, tabs } = payload;
    if (!accountName || !poesessid) {
      return sender.send(onError, "accountName and poesessid must be provided");
    }

    const data = await api.getStashItems(
      poesessid,
      accountName,
      "pc",
      league,
      1,
      tabs
    );

    try {
      sender.send(onSuccess, data);
    } catch (error) {
      sender.send(onError, error);
    }
  }
);

ipcMain.on(
  PoeRequests.StashTabs,
  async (
    { sender }: IpcEvent,
    {
      payload,
      onError,
      onSuccess
    }: IpcRequest<{ poesessid: string; accountName: string; league: string }>
  ) => {
    try {
      const { accountName, poesessid, league } = payload;
      const tabs = await api.getStashTabs(poesessid, accountName, "pc", league);
      sender.send(
        onSuccess,
        tabs.tabs.map(({ n, type, id, i }) => ({ name: n, type, id, i }))
      );
    } catch (error) {
      sender.send(onError, error);
    }
  }
);

ipcMain.on(
  PoeRequests.CharacterList,
  async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { sender }: IpcEvent,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { payload, onError, onSuccess }: IpcRequest<any>
  ) => {
    const { accountName, poesessid, league } = payload;
    const characterList = await api.getCharacterList(poesessid);

    console.log(
      characterList.filter(character => character.league === league),
      accountName
    );
  }
);
