import { PoeNinjaItemValue } from "../../common";

export interface PoeNinjaResponse {
  lines: PoeNinjaItemValue[];
  currencyDetails: any[];
  language: any;
}

export enum CurrencyOverviewType {
  Currency = "Currency",
  Fragment = "Fragment"
}

export enum ItemOverviewType {
  BaseType = "BaseType",
  Beast = "Beast",
  DivinationCard = "DivinationCard",
  Essence = "Essence",
  Fossil = "Fossil",
  HelmetEnchant = "HelmetEnchant",
  Incubator = "Incubator",
  Oil = "Oil",
  Prophecy = "Prophecy",
  Resonator = "Resonator",
  Map = "Map",
  Scarab = "Scarab",
  SkillGem = "SkillGem",
  UniqueAccessory = "UniqueAccessory",
  UniqueArmour = "UniqueArmour",
  UniqueFlask = "UniqueFlask",
  UniqueJewel = "UniqueJewel",
  UniqueMap = "UniqueMap",
  UniqueWeapon = "UniqueWeapon",
  Watchstone = "Watchstone"
}
