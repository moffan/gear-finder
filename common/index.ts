import { WebContents } from "electron";

export * from "./poe-ninja.models";
export * from "./character-window.models";

export type CurrentLeagues = League[];

interface League {
  id: string;
  text: string;
}
export enum Channels {
  AppClosing = "APP_CLOSING"
}

export enum PoeRequests {
  CharacterList = "POE_CHARACTER_LIST",
  Character = "POE_CHARACTER",
  CurrentLeagues = "POE_LEAGUES_CURRENT",
  Exchange = "POE_EXCHANGE",
  ItemSearch = "POE_ITEM_SEARCH",
  Stats = "POE_STATS",
  CurrencyValues = "POE_NINJA_CURRENCY",
  StashTab = "POE_STASH_TAB",
  StashTabs = "POE_STASH_TABS",
  Credential = "POE_CREDENTIALS"
}

export enum Requests {}

export interface IpcRequest<T> {
  onSuccess: string;
  onError: string;
  payload: T;
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

export enum OnlineStatus {
  "any" = "any",
  "online" = "online"
}

export enum Currency {
  alch = "alch",
  alt = "alt",
  ancientOrb = "ancient-orb",
  ancientShard = "ancient-shard",
  annulmentShard = "annulment-shard",
  apprenticeSextant = "apprentice-sextant",
  aug = "aug",
  ba = "ba",
  bindingShard = "binding-shard",
  blessed = "blessed",
  blessingChayula = "blessing-chayula",
  blessingEsh = "blessing-esh",
  blessingTul = "blessing-tul",
  blessingUulNetol = "blessing-uul-netol",
  blessingXoph = "blessing-xoph",
  chance = "chance",
  chaos = "chaos",
  chaosShard = "chaos-shard",
  chisel = "chisel",
  chrom = "chrom",
  divine = "divine",
  engineersOrb = "engineers-orb",
  engineersShard = "engineers-shard",
  ete = "ete",
  exa = "exa",
  exaltedShard = "exalted-shard",
  fuse = "fuse",
  gcp = "gcp",
  harbingersOrb = "harbingers-orb",
  harbingersShard = "harbingers-shard",
  horizonShard = "horizon-shard",
  jew = "jew",
  journeymanSextant = "journeyman-sextant",
  masterSextant = "master-sextant",
  mir = "mir",
  mirrorShard = "mirror-shard",
  orbOfAnnulment = "orb-of-annulment",
  orbOfBinding = "orb-of-binding",
  orbOfHorizons = "orb-of-horizons",
  p = "p",
  port = "port",
  regal = "regal",
  regalShard = "regal-shard",
  regret = "regret",
  scour = "scour",
  scr = "scr",
  silver = "silver",
  splinterChayula = "splinter-chayula",
  splinterEsh = "splinter-esh",
  splinterTul = "splinter-tul",
  splinterUul = "splinter-uul",
  splinterXoph = "splinter-xoph",
  stackedDeck = "stacked-deck",
  timelessEternalEmpireSplinter = "timeless-eternal-empire-splinter",
  timelessKaruiSplinter = "timeless-karui-splinter",
  timelessMarakethSplinter = "timeless-maraketh-splinter",
  timelessTemplarSplinter = "timeless-templar-splinter",
  timelessVaalSplinter = "timeless-vaal-splinter",
  tra = "tra",
  vaal = "vaal",
  whe = "whe",
  wis = "wis"
}
