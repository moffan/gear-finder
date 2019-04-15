import { ModFilterReducer, ItemSearchActionTypes } from "../character.models";
import { ItemModSearch } from "../../poe-content";

const modFilterReducer: ModFilterReducer = (
  state: ItemModSearch[],
  { type, payload }: { type: ItemSearchActionTypes; payload?: any }
) => {
  switch (type) {
    case ItemSearchActionTypes.Add:
      if (!payload) {
        return state;
      }

      return state.find(
        item => item.text === payload.text && item.type === payload.type
      )
        ? state
        : [...state, payload];
    case ItemSearchActionTypes.Change:
      return state.map(item => {
        if (item.id === payload.id) {
          return { ...item, value: payload.value };
        }

        return item;
      });
    case ItemSearchActionTypes.Remove:
      return state.filter(item => item.id !== payload.id);
    case ItemSearchActionTypes.Clear:
      return [];
    default:
      return state;
  }
};

export default modFilterReducer;
