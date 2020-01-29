import { ipcMain, WebContents } from "electron";
import { URLSearchParams } from "url";

import { IpcEvent, IpcRequest, PoeRequests } from "../../common";
import { SearchApi } from "./search.api";

ipcMain.on(
  PoeRequests.ItemSearch,
  ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest<any>) => {
    const { item, filters, league } = payload;

    const api = new SearchApi();
    const result = api.search(item, filters, league);

    console.log(result);
  }
);
