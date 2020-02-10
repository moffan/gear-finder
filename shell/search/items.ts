import { ipcMain } from "electron";

import { IpcEvent, IpcRequest, PoeRequests } from "../../common";
import { SearchApi } from "./search.api";

ipcMain.on(
  PoeRequests.ItemSearch,
  ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest<any>) => {
    try {
      const { item, filters, league } = payload;

      const api = new SearchApi();
      const result = api.search(item, filters, league);

      sender.send(onSuccess, result);
    } catch (error) {
      sender.send(onError, error);
    }
  }
);
