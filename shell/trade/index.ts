import { ipcMain } from "electron";
import {
  CurrentLeagues,
  IpcEvent,
  IpcRequest,
  PoeRequests
} from "../../common";
import { HttpService } from "../utils";
import { DataStore } from "../utils/data-store";

const POE_URL_LEAGUE = "https://www.pathofexile.com/api/trade/data/leagues";

interface Leagues {
  result: CurrentLeagues;
}

ipcMain.on(
  PoeRequests.CurrentLeagues,
  async ({ sender }: IpcEvent, { onError, onSuccess }: IpcRequest<any>) => {
    try {
      const leagueKey = "current-leagues";

      const data = new DataStore();
      let currentLeagues = await data.read<Leagues>(leagueKey);

      if (!currentLeagues) {
        const http = new HttpService();

        currentLeagues = await http.get<Leagues>(POE_URL_LEAGUE);
        await data.write(leagueKey, currentLeagues);
      }

      sender.send(onSuccess, currentLeagues.result);
    } catch (error) {
      sender.send(onError, error);
    }
  }
);
