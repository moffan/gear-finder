import { usePersistedState, apiService } from "../common";
import { PoeRequests } from "../../common";
import { useUserService } from "../user";
import { PoeStats } from ".";

const useStats = () => {
  const [stats, setStats] = usePersistedState<PoeStats[]>("stats", []);
  const [{ sessionId }] = useUserService();

  if (!stats.length) {
    apiService
      .send(PoeRequests.Stats, { sessionId })
      .then(({ result }: any) => setStats(result))
      .catch(error => console.error(error));
  }

  return stats;
};

export default useStats;
