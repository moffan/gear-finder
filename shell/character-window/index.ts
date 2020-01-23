import { POE_URL_STASH_ITEMS } from "../constants";
import { ipcMain } from "electron";
import { PoeRequests, IpcEvent, IpcRequest } from "../../common";
import { HttpService } from "../utils";

const getStashItems = async (
  sessionId: string,
  accountName: string,
  realm: string,
  league: string,
  tabs: number,
  tabIndex: number,
  isPublic: boolean
) => {
  const httpService = new HttpService(sessionId);

  const url = new URL(POE_URL_STASH_ITEMS);
  url.searchParams.append("accountName", accountName);
  url.searchParams.append("realm", realm);
  url.searchParams.append("league", league);
  url.searchParams.append("tabs", tabs.toString());
  url.searchParams.append("tabIndex", tabIndex.toString());
  url.searchParams.append("public", isPublic.toString());

  return await httpService.get(url);
};

ipcMain.on(
  PoeRequests.Stash,
  async (
    { sender }: IpcEvent,
    {
      payload,
      onError,
      onSuccess
    }: IpcRequest<{ poesessid: string; accountName: string; league: string }>
  ) => {
    if (!payload) {
      return sender.send(
        onError,
        "payload with accountName and poesessid must be provided"
      );
    }

    const { accountName, poesessid, league } = payload;
    if (!accountName || !poesessid) {
      return sender.send(onError, "accountName and poesessid must be provided");
    }

    const data = await getStashItems(
      poesessid,
      accountName,
      "pc",
      league,
      1,
      0,
      false
    );

    sender.send(onSuccess, data);
  }
);
