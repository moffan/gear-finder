import { WebContents } from "electron";

export enum Channels {
  AppClosing = "APP_CLOSING"
}

export enum PoeRequests {
  CharacterList = "POE_CHARACTER_LIST",
  Character = "POE_CHARACTER",
  CurrentLeagues = "POE_LEAGUES_CURRENT",
  Stats = "POE_STATS",
  ItemSearch = "POE_ITEM_SEARCH"
}

export interface IpcRequest {
  onSuccess: string;
  onError: string;
  payload: any;
}

export interface IpcEvent {
  sender: WebContents;
}

export function UUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)
  );
}
