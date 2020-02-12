import { ipcMain } from "electron";

import { IpcEvent, IpcRequest, PoeRequests } from "../../common";
import { TradeApi } from "./trade.api";

const api = new TradeApi();

const PoeRequestsCurrentLeaguesHandler = (
  { sender }: IpcEvent,
  { onError, onSuccess }: IpcRequest<any>
) => {
  api
    .getCurrentLeagues()
    .then(currentLeagues => sender.send(onSuccess, currentLeagues.result))
    .catch(error => sender.send(onError, error));
};

const PoeRequestsStatsHandler = (
  { sender }: IpcEvent,
  { onError, onSuccess }: IpcRequest<any>
) => {
  api
    .getStats()
    .then(stats => sender.send(onSuccess, stats))
    .catch(error => sender.send(onError, error));
};

ipcMain.on(PoeRequests.Stats, PoeRequestsStatsHandler);
ipcMain.on(PoeRequests.CurrentLeagues, PoeRequestsCurrentLeaguesHandler);
