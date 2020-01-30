export interface ItemStat {
  id: string;
  text: string;
  type: string;
}

export interface ItemModifiers {
  crafted: ItemStat[];
  delve: ItemStat[];
  pseudo: ItemStat[];
  explicit: ItemStat[];
  implicit: ItemStat[];
  fractured: ItemStat[];
  veiled: ItemStat[];
  enchant: ItemStat[];
  monster: ItemStat[];
}
