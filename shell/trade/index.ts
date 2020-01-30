import { ipcMain } from "electron";
import { IpcEvent, IpcRequest, PoeRequests } from "../../common";
import { TradeApi } from "./trade.api";

const api = new TradeApi();

ipcMain.on(
  PoeRequests.Stats,
  async ({ sender }: IpcEvent, { onError, onSuccess }: IpcRequest<any>) => {
    try {
      const stats = await api.getStats();
      sender.send(onSuccess, stats);
    } catch (error) {
      sender.send(onError, error);
    }
  }
);

ipcMain.on(
  PoeRequests.CurrentLeagues,
  async ({ sender }: IpcEvent, { onError, onSuccess }: IpcRequest<any>) => {
    try {
      const currentLeagues = await api.getCurrentLeagues();
      sender.send(onSuccess, currentLeagues.result);
    } catch (error) {
      sender.send(onError, error);
    }
  }
);
