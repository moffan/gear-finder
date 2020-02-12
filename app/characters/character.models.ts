import { Poe } from "../../common";

export enum ItemSearchActionTypes {
  Add = "ADD",
  Change = "CHANGE",
  Remove = "REMOVE",
  Set = "SET"
}

export interface ItemSearchAction {
  type: ItemSearchActionTypes;
  payload?: any;
}

export interface PoeGetItemsResponse {
  character: Poe.Character;
  items: Poe.Item[];
}

export enum InventoryIds {
  mainInventory = "MainInventory",
  flask = "Flask"
}

export interface ModFilterReducer
  extends React.Reducer<Poe.ItemModSearch[], ModFilterAction> {}

export interface ModFilterAction {
  type: ItemSearchActionTypes;
  payload?: any;
}
