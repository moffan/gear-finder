import React from "react";

import { PoeCharacter, PoeCharacterEquipment } from "../../poe-content";
import { ModFilterAction } from "../character.models";

const CharacterContext = React.createContext<{
  character: PoeCharacter;
  equipment: PoeCharacterEquipment;
  mods: any[];
  modsDispatcher: React.Dispatch<ModFilterAction>;
}>({} as any);

export default CharacterContext;
