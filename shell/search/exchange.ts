/* eslint-disable @typescript-eslint/no-unused-vars */
import { ipcMain } from "electron";
import { IpcEvent, IpcRequest, PoeRequests } from "../../common";
import { SearchApi } from "./search.api";

ipcMain.on(
  PoeRequests.Exchange,
  async (
    { sender }: IpcEvent,
    { payload, onError, onSuccess }: IpcRequest<any>
  ) => {
    const { have, want, league, onlineStatus } = payload;

    const searchApi = new SearchApi();

    searchApi.searchExchange(have, want, league, onlineStatus);

    // try {
    //   // fs.writeFileSync("data.json", JSON.stringify(result));
    //   sender.send(onSuccess);
    // } catch (error) {
    //   sender.send(onSuccess, error);
    // }
  }
);
