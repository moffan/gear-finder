import React, { useMemo, useEffect } from "react";

import { usePersistedState } from "../common";
import { useAvailableLeagues, useStats } from "./poe.hooks";
import { LeagueData, ModService, PoeCharacter } from ".";
import { SELECTED_LEAGUE_KEY, ACTIVE_CHARACTER_KEY } from "./poe.constants";
import history from "../navigation/history";

export const PoeContext = React.createContext<{
  availableLeagues: LeagueData[];
  selectedLeague: LeagueData | string;
  setSelectedLeague: (selectedLeague: LeagueData | string) => void;
  setActiveCharacter: (character: PoeCharacter) => void;
  stats: ModService;
}>({} as any);

const PoeProvider: React.FunctionComponent = ({ children }) => {
  const availableLeagues = useAvailableLeagues();
  const poeStats = useStats();
  const stats = useMemo(() => new ModService(poeStats), [poeStats]);
  const [selectedLeague, setSelectedLeague] = usePersistedState<
    LeagueData | string
  >(SELECTED_LEAGUE_KEY, availableLeagues![0] || "");
  const [activeCharacter, setActiveCharacter] = usePersistedState<PoeCharacter>(
    ACTIVE_CHARACTER_KEY
  );

  useEffect(() => {
    if (activeCharacter) {
      history.push(`/character/${activeCharacter.name}`);
    }
  }, [activeCharacter]);

  return (
    <PoeContext.Provider
      value={{
        availableLeagues,
        selectedLeague,
        setSelectedLeague,
        stats,
        setActiveCharacter
      }}
    >
      {children}
    </PoeContext.Provider>
  );
};

export default PoeProvider;
