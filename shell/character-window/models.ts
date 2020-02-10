import { StashTabItem } from "../../common";

enum StashTabType {
  CurrencyStash = "CurrencyStash",
  DelveStash = "DelveStash",
  DivinationCardStash = "DivinationCardStash",
  EssenceStash = "EssenceStash",
  FragmentStash = "FragmentStash",
  MapStash = "MapStash",
  PremiumStash = "PremiumStash",
  QuadStash = "QuadStash",
  UniqueStash = "CurrencyStash"
}

export interface StashTabResponse {
  numTabs: number;
  tabs: {
    n: string;
    i: number;
    id: string;
    type: StashTabType;
    hidden: boolean;
    selected: boolean;
    colour: {
      r: number;
      g: number;
      b: number;
    };
    srcL: string;
    srcC: string;
    srcR: string;
  }[];
  fragmentLayout: {
    [key: string]: { x: number; y: number; w: number; h: number };
  };
  items: StashTabItem[];
}
