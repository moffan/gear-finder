import React, { useEffect } from "react";
import { usePersistedState } from "./common";

export interface LeagueData {
  id: string;
  text: string;
}
const selectedLeagueKey = "selectedLeague";
const availableLeaguesKey = "availableLeagues";

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
  const [availableLeagues, setAvailableLeagues] = usePersistedState<
    LeagueData[]
  >(availableLeaguesKey, []);

  useEffect(() => {
    setAvailableLeagues([
      { id: "Synthesis", text: "Synthesis" },
      { id: "Hardcore Synthesis", text: "Hardcore Synthesis" },
      { id: "Standard", text: "Standard" },
      { id: "Hardcore", text: "Hardcore" }
    ]);
  }, []);

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
