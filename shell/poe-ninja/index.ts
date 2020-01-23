import { DataStore } from "../utils/data-store";
import { getItemData } from "./poe-ninja.api";
import { ipcMain } from "electron";
import { PoeRequests, IpcRequest, IpcEvent } from "../../common";

const key = "currency";

ipcMain.on(
  PoeRequests.Currency,
  async ({ sender }: IpcEvent, { onError, onSuccess }: IpcRequest<any>) => {
    try {
      const dataStore = new DataStore();

      let currency = await dataStore.read<any>(key);

      if (!currency) {
        currency = await getItemData();
        if (!currency) {
          return;
        }

        await dataStore.write(key, currency);
      }

      const { lines } = currency;
      sender.send(onSuccess, lines);
    } catch (error) {
      sender.send(onError, error);
    }
  }
);
