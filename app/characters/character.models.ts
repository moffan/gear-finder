import { PoeCharacter, PoeItem, ItemModSearch } from "../poe-content";

export enum ItemSearchActionTypes {
  Add = "ADD",
  Change = "CHANGE",
  Remove = "REMOVE",
  Clear = "CLEAR"
}

export interface ItemSearchAction {
  type: ItemSearchActionTypes;
  payload?: any;
}

export interface PoeGetItemsResponse {
  character: PoeCharacter;
  items: PoeItem[];
}

export enum InventoryIds {
  mainInventory = "MainInventory",
  flask = "Flask"
}

export interface ModFilterReducer
  extends React.Reducer<ItemModSearch[], ModFilterAction> {}

export interface ModFilterAction {
  type: ItemSearchActionTypes;
  payload?: any;
}
