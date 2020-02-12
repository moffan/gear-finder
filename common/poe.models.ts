export interface League {
  endAt: string | null;
  id: string;
  startAt: string | null;
  url: string;
}

export enum EquipmentSlotType {
  Amulet = "Amulet",
  Belt = "Belt",
  BodyArmour = "BodyArmour",
  Boots = "Boots",
  Flask = "Flask",
  Gloves = "Gloves",
  Helm = "Helm",
  MainInventory = "MainInventory",
  Offhand = "Offhand",
  Offhand2 = "Offhand2",
  Ring = "Ring",
  Ring2 = "Ring2",
  Weapon = "Weapon",
  Weapon2 = "Weapon2"
}

export interface CharacterEquipment {
  Amulet?: Item;
  Belt?: Item;
  BodyArmour?: Item;
  Boots?: Item;
  Flask?: Item[];
  Gloves?: Item;
  Helm?: Item;
  Offhand?: Item;
  Offhand2?: Item;
  Ring?: Item;
  Ring2?: Item;
  Weapon?: Item;
  Weapon2?: Item;
}

export interface UserInfo {
  username: string;
  sessionId: string;
}

export interface Sockets {
  group: number; // group id
  attr: "S" | "I" | "D" | "G"; // S=Strength, I=Intelligence, D=Dexterity, G=white	string
}

export interface Character {
  name: string;
  league: string;
  classId: number;
  ascendancyClass: number;
  class: string;
  level: number;
  experience: number;
}

export interface Item {
  verified: boolean;
  w: number; // 	slot width
  h: number; // slot height
  ilvl: number; // item level
  icon: string; // item picture art
  league: string; // Standard / Hardcore /
  id: string; // item id, will change if you use currency on it
  sockets?: Sockets[]; // See below, array of sockets
  name: string; // unique name
  typeLine: string; // item base type, mixed with affix name for magic/ rare
  identified: boolean;
  corrupted: boolean;
  lockedToCharacter: boolean; //
  note: string;
  properties: any[]; // 	See below
  requirements: any[]; // 	See below
  explicitMods: string[];
  implicitMods: string[];
  enchantMods: string[]; // 	labyrinth mods
  craftedMods: string[]; // 	master mods
  flavourText: string[];
  frameType: number; // 	See below
  x: number; // 	stash position x
  y: number; // 	stash position y
  inventoryId: string; // 	slot
  socketedItems: any[]; // 	See items
  additionalProperties: any[]; // 	See properties
  secDescrText: string; // 	second description text
  descrText: string; // description text
  artFilename: string; // Divination Card
  duplicated: boolean; //
  maxStackSize: number; //
  nextLevelRequirements: any[]; // 	See requirements
  stackSize: number; //
  talismanTier: number; //
  utilityMods: string; // array	flask utility mods
  support: boolean; //
  cosmeticMods: string; // array
  prophecyDiffText: string; // 	prophecy difficulty text
  prophecyText: string; //
  isRelic: boolean; //
  category: any[];
}

export interface LeagueData {
  id: string;
  text: string;
}

export interface Stat {
  id: string;
  text: string;
  type: StatType;
}

export interface Stats {
  entries: Stat[];
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

export interface ItemModSearch extends Stat {
  value: number;
  regex: string;
}

export interface ItemMod {
  type: StatType;
  text: string;
}
