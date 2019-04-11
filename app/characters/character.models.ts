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
