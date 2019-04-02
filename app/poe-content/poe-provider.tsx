import React from "react";

import { usePersistedState } from "../common";
import useAvailableLeagues from "./available-leagues.hook";
import useStats from "./stats.hook";
import { LeagueData } from ".";

const selectedLeagueKey = "selectedLeague";

export const PoeContext = React.createContext<{
  availableLeagues: LeagueData[];
  selectedLeague: LeagueData | string;
  setSelectedLeague: (selectedLeague: LeagueData | string) => void;
}>({
  availableLeagues: [],
  selectedLeague: "",
  setSelectedLeague: () => {}
});

const PoeProvider: React.FunctionComponent = ({ children }) => {
  const availableLeagues = useAvailableLeagues();
  const stats = useStats();

  const [selectedLeague, setSelectedLeague] = usePersistedState<
    LeagueData | string
  >(selectedLeagueKey, availableLeagues![0] || "");

  return (
    <PoeContext.Provider
      value={{ availableLeagues, selectedLeague, setSelectedLeague }}
    >
      {children}
    </PoeContext.Provider>
  );
};

export default PoeProvider;
