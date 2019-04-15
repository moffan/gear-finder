import {
  PoeCharacter,
  PoeCharacterEquipment,
  ItemModSearch
} from "../poe-content";
import { PoeGetItemsResponse, InventoryIds } from "./character.models";
import { usePersistedState, apiService, decodeItem } from "../common";
import { PoeRequests } from "../../common";
import { useUserService } from "../user";

interface CharacterDetails {
  character: PoeCharacter;
  equipment: PoeCharacterEquipment;
  mods: ItemModSearch[];
}

export interface CharacterService extends CharacterDetails {
  updateMods: (mods: ItemModSearch[]) => void;
}

export const useCharacterService = (
  characterName: string
): CharacterService => {
  if (!characterName) {
    throw new Error("Can not use character service without a character name");
  }

  const [{ sessionId, username: accountName }] = useUserService();
  const [{ character, equipment, mods }, setCharacterInfo] = usePersistedState<
    CharacterDetails
  >(characterName);

  if (!character) {
    apiService
      .send<PoeGetItemsResponse>(PoeRequests.Character, {
        sessionId,
        accountName,
        character: characterName
      })
      .then(({ character, items }) => {
        const equipment: any = { MainInventory: [], Flask: [] };
        items.forEach(item =>
          item.inventoryId === InventoryIds.mainInventory ||
          item.inventoryId === InventoryIds.flask
            ? equipment[item.inventoryId].push(decodeItem(item))
            : (equipment[item.inventoryId] = decodeItem(item))
        );

        setCharacterInfo({ character, equipment, mods: [] });
      })
      .catch(err => console.error(err));
  }

  return {
    character,
    equipment,
    mods,
    updateMods: mods => setCharacterInfo({ character, equipment, mods })
  };
};

export const useCharacterListService = (
  sessionId: string
): [PoeCharacter[]] => {
  const key = "characters";
  const [characters, setValue] = usePersistedState<PoeCharacter[]>(key, []);

  if (!characters.length) {
    apiService
      .send<PoeCharacter[]>(PoeRequests.CharacterList, {
        sessionId
      })
      .then(poeCharacters => setValue(poeCharacters));
  }

  return [characters];
};
