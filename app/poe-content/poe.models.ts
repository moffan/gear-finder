export interface PoeLeague {
  endAt: string | null;
  id: string;
  startAt: string | null;
  url: string;
}

export interface PoeCharacter {
  ascendancyClass: number;
  class: string;
  classId: number;
  experience: number;
  league: string;
  level: number;
  name: string;
}

export interface PoeCharacterEquipment {
  Amulet: PoeItem;
  Belt: PoeItem;
  BodyArmour: PoeItem;
  Boots: PoeItem;
  Flask: PoeItem[];
  Gloves: PoeItem;
  Helm: PoeItem;
  Offhand: PoeItem;
  Offhand2: PoeItem;
  Ring: PoeItem;
  Ring2: PoeItem;
  Weapon: PoeItem;
  Weapon2: PoeItem;
}

export interface UserInfo {
  username: string;
  sessionId: string;
}

export interface Sockets {
  group: number; //group id
  attr: "S" | "I" | "D" | "G"; // S=Strength, I=Intelligence, D=Dexterity, G=white	string
}

export interface PoeItem {
  verified: boolean;
  w: number; //	slot width
  h: number; //slot height
  ilvl: number; //item level
  icon: string; //item picture art
  league: string; // Standard / Hardcore /
  id: string; //item id, will change if you use currency on it
  sockets?: Sockets[]; // See below, array of sockets
  name: string; //unique name
  typeLine: string; //item base type, mixed with affix name for magic/ rare
  identified: boolean;
  corrupted: boolean;
  lockedToCharacter: boolean; //
  note: string;
  properties: any[]; //	See below
  requirements: any[]; //	See below
  explicitMods: string[];
  implicitMods: string[];
  enchantMods: string[]; //	labyrinth mods
  craftedMods: string[]; //	master mods
  flavourText: string[];
  frameType: number; //	See below
  x: number; //	stash position x
  y: number; //	stash position y
  inventoryId: string; //	slot
  socketedItems: any[]; //	See items
  additionalProperties: any[]; //	See properties
  secDescrText: string; //	second description text
  descrText: string; //description text
  artFilename: string; //Divination Card
  duplicated: boolean; //
  maxStackSize: number; //
  nextLevelRequirements: any[]; //	See requirements
  stackSize: number; //
  talismanTier: number; //
  utilityMods: string; // array	flask utility mods
  support: boolean; //
  cosmeticMods: string; // array
  prophecyDiffText: string; //	prophecy difficulty text
  prophecyText: string; //
  isRelic: boolean; //
  category: any[];
}

export interface LeagueData {
  id: string;
  text: string;
}

export interface PoeStat {
  id: string;
  text: string;
  type: StatType;
}

export interface PoeStats {
  entries: PoeStat[];
  label: StatType;
}

export enum StatType {
  Pseudo = "Pseudo",
  Explicit = "Explicit",
  Implicit = "Implicit",
  Fractured = "Fractured",
  Enchant = "Enchant",
  Crafted = "Crafted",
  Veiled = "Veiled",
  Monster = "Monster",
  Delve = "Delve"
}

export interface ItemModSearch extends PoeStat {
  value: number;
  regex: string;
}

export interface ItemMod {
  type: StatType;
  text: string;
}
