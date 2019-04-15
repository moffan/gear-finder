import { PoeStats } from ".";
import { STATS_KEY } from "./poe.constants";
import { PoeRequests } from "../../common";
import { usePersistedState, apiService } from "../common";
import { LeagueData } from ".";
import { useUserService } from "../user";
import { AVAILABLE_LEAGUES_KEY } from "./poe.constants";

export const useAvailableLeagues = () => {
  const [{ sessionId }] = useUserService();
  const [availableLeagues, setAvailableLeagues] = usePersistedState<
    LeagueData[]
  >(AVAILABLE_LEAGUES_KEY, []);

  if (!availableLeagues.length) {
    apiService
      .send(PoeRequests.CurrentLeagues, { sessionId })
      .then(({ result }: any) => setAvailableLeagues(result))
      .catch(error => console.error(error));
  }

  return availableLeagues;
};

export const useStats = () => {
  const [stats, setStats] = usePersistedState<PoeStats[]>(STATS_KEY, []);
  const [{ sessionId }] = useUserService();

  if (!stats.length) {
    apiService
      .send(PoeRequests.Stats, { sessionId })
      .then(({ result }: any) => {
        setStats(result);
      })
      .catch(error => console.error(error));
  }

  return stats;
};
