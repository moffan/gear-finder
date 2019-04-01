import { useUserService } from "../user";
import { apiService, usePersistedState, decodeItem } from "../common";
import { PoeRequests } from "../../common";
import {
  PoeCharacter,
  PoeItem,
  PoeCharacterEquipment
} from "../common/poe.models";

interface PoeGetItemsResponse {
  character: PoeCharacter;
  items: PoeItem[];
}

enum InventoryIds {
  mainInventory = "MainInventory",
  flask = "Flask"
}

const useEquipmentService = (
  characterName: string
): [PoeCharacter, PoeCharacterEquipment] => {
  const [{ sessionId, username: accountName }] = useUserService();
  const [{ character, items }, setCharacterInfo] = usePersistedState<any>(
    characterName,
    {}
  );

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

        setCharacterInfo({ character, items: equipment });
      })
      .catch(err => console.error(err));
  }

  return [character, items];
};

export default useEquipmentService;
