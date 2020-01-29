export interface StashTabItem {
  verified: boolean;
  w: number;
  h: number;
  icon: string;
  league: string;
  id: string;
  name: string;
  typeLine: string;
  identified: boolean;
  ilvl: number;
  properties: {
    name: string;
    values: any[][];
    displayMode: number;
  }[];
  descrText: string;
  frameType: number;
  stackSize: number;
  maxStackSize: number;
  x: number;
  y: number;
  inventoryId: string;
}
