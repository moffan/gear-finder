import React, { useReducer, useEffect } from "react";

import CharacterContext from "./character.context";
import { useCharacterService } from "../characters.hooks";
import { ModFilterReducer } from "../character.models";
import modFilterReducer from "./mod-filter.reducer";

const CharacterProvider: React.FunctionComponent<{ characterName: string }> = ({
  children,
  characterName
}) => {
  const { character, equipment, mods, updateMods } = useCharacterService(
    characterName
  );

  const [actviveMods, modsDispatcher] = useReducer<ModFilterReducer>(
    modFilterReducer,
    mods
  );

  useEffect(() => {
    updateMods(actviveMods);
  }, [actviveMods]);

  return (
    <CharacterContext.Provider
      value={{ character, equipment, mods: actviveMods, modsDispatcher }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;
