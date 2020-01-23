import { ipcMain, WebContents } from "electron";
import fetch from "node-fetch";
import { URLSearchParams } from "url";

import { IpcEvent, IpcRequest, PoeRequests } from "../../common";

ipcMain.on(
  PoeRequests.ItemSearch,
  ({ sender }: IpcEvent, { payload, onError, onSuccess }: IpcRequest<any>) => {
    const { item, filters, league } = payload;

    const searchOptions = {
      query: {
        name: "The Pariah",
        stats: [
          {
            filters: [],
            type: "and"
          }
        ],
        status: {
          option: "online"
        },
        type: "Unset Ring"
      },
      sort: {
        price: "asc"
      }
    };

    fetch(`https://www.pathofexile.com/api/trade/search/${league}`, {
      body: JSON.stringify(searchOptions),
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.status.toString());
      })
      // tslint:disable-next-line: no-console
      .then(console.log)
      // tslint:disable-next-line: no-console
      .catch(console.error);
  }
);
