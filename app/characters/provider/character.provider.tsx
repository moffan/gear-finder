import React, { useReducer, useEffect, useState } from "react";

import CharacterContext from "./character.context";
import { useCharacterService } from "../characters.hooks";
import { ModFilterReducer, ItemSearchActionTypes } from "../character.models";
import modFilterReducer from "./mod-filter.reducer";
import { PoeItem, StatType } from "../../poe-content";

const CharacterProvider: React.FunctionComponent<{ characterName: string }> = ({
  children,
  characterName
}) => {
  const { character, equipment, filters, updateFilters } = useCharacterService(
    characterName
  );

  const [selectedItem, setSelectedItem] = useState<PoeItem | undefined>(
    undefined
  );

  const [actviveFilters, filterDispatcher] = useReducer<ModFilterReducer>(
    modFilterReducer,
    selectedItem ? filters[selectedItem.inventoryId] : []
  );

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    updateFilters(selectedItem, actviveFilters);
  }, [actviveFilters]);

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    filterDispatcher({
      type: ItemSearchActionTypes.Set,
      payload: filters[selectedItem.inventoryId] || []
    });
  }, [selectedItem]);

  return (
    <CharacterContext.Provider
      value={{
        character,
        equipment,
        filters: actviveFilters,
        filterDispatcher,
        selectedItem,
        setSelectedItem
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;
