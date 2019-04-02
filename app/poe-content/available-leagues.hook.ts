import { PoeRequests } from "../../common";
import { usePersistedState, apiService } from "../common";
import { LeagueData } from ".";
import { useUserService } from "../user";

const useAvailableLeagues = () => {
  const availableLeaguesKey = "availableLeagues";

  const [{ sessionId }] = useUserService();
  const [availableLeagues, setAvailableLeagues] = usePersistedState<
    LeagueData[]
  >(availableLeaguesKey, []);

  if (!availableLeagues.length) {
    apiService
      .send(PoeRequests.CurrentLeagues, { sessionId })
      .then(({ result }: any) => setAvailableLeagues(result))
      .catch(error => console.error(error));
  }

  return availableLeagues;
};

export default useAvailableLeagues;
