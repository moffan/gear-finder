import { ipcMain } from "electron";
import fs from "fs";
import fetch from "node-fetch";
import { IpcEvent, IpcRequest, PoeRequests } from "../../common";

ipcMain.on(
  PoeRequests.Exchange,
  async (
    { sender }: IpcEvent,
    { payload, onError, onSuccess }: IpcRequest<any>
  ) => {
    const { have, want, league, onlineStatus } = payload;

    const searchOptions = {
      exchange: {
        have,
        status: {
          option: onlineStatus
        },
        want
      }
    };

    try {
      const result = await fetch(
        `https://www.pathofexile.com/api/trade/exchange/${league}`,
        {
          body: JSON.stringify(searchOptions),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        }
      ).then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.status.toString());
      });

      fs.writeFileSync("data.json", JSON.stringify(result));
      sender.send(onSuccess);
    } catch (error) {
      sender.send(onSuccess, error);
    }
  }
);
