import { ipcMain } from "electron";

import { IpcEvent, IpcRequest, PoeRequests } from "../../common";
import { CurrencyOverviewType } from "./models";
import { PoeNinjaApi } from "./poe-ninja.api";

const api = new PoeNinjaApi();

const PoeRequestsCurrencyValuesHandler = (
  { sender }: IpcEvent,
  { onError, onSuccess }: IpcRequest<any>
) => {
  const requests = [
    // ...Object.keys(ItemOverviewType).map(key =>
    //   api.getItemOverview("Metamorph", key as ItemOverviewType)
    // ),
    ...Object.keys(CurrencyOverviewType).map(key =>
      api.getCurrencyOverview("Metamorph", key as CurrencyOverviewType)
    )
  ];

  Promise.all(requests)
    .then(responses => {
      const data = responses.flatMap(x => x.lines);

      sender.send(onSuccess, data);
    })
    .catch(error => sender.send(onError, error));
};

ipcMain.on(PoeRequests.CurrencyValues, PoeRequestsCurrencyValuesHandler);
