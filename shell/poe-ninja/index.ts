import { PoeNinjaApi } from "./poe-ninja.api";
import { ipcMain } from "electron";
import { PoeRequests, IpcRequest, IpcEvent } from "../../common";
import { CurrencyOverviewType } from "./models";

const api = new PoeNinjaApi();

ipcMain.on(
  PoeRequests.CurrencyValues,
  async ({ sender }: IpcEvent, { onError, onSuccess }: IpcRequest<any>) => {
    try {
      const requests = [
        // ...Object.keys(ItemOverviewType).map(key =>
        //   api.getItemOverview("Metamorph", key as ItemOverviewType)
        // ),
        ...Object.keys(CurrencyOverviewType).map(key =>
          api.getCurrencyOverview("Metamorph", key as CurrencyOverviewType)
        )
      ];

      const responses = await Promise.all(requests);
      const data = responses.flatMap(x => x.lines);

      sender.send(onSuccess, data);
    } catch (error) {
      sender.send(onError, error);
    }
  }
);
