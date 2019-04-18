import React from "react";

import {
  PoeCharacter,
  PoeCharacterEquipment,
  PoeItem
} from "../../poe-content";
import { ModFilterAction } from "../character.models";

const CharacterContext = React.createContext<{
  character: PoeCharacter;
  equipment: PoeCharacterEquipment;
  filters: any[];
  filterDispatcher: React.Dispatch<ModFilterAction>;
  selectedItem: PoeItem | undefined;
  setSelectedItem: (item: PoeItem | undefined) => void;
}>({} as any);

export default CharacterContext;
