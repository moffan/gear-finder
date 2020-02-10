import {
  PoeStats,
  StatType,
  PoeStat,
  ItemMod,
  ItemModSearch
} from "../../common";

export class ModService {
  private readonly statsMap: Map<StatType, PoeStat[]>;
  constructor(stats: PoeStats[]) {
    this.statsMap = new Map();
    stats.forEach(stat => this.statsMap.set(stat.label, stat.entries));
  }

  public find = (mod: ItemMod): ItemModSearch | null => {
    const { type, text } = mod;
    const statGroup = this.statsMap.get(type);

    try {
      statGroup!.forEach(stat => {
        const regex = this.getRegex(stat);
        const result = new RegExp(`${regex}$`).exec(text);
        if (!!result) {
          const values = result.slice(1);
          const value = Math.ceil(
            values
              .map(currentValue => parseInt(currentValue, 10))
              .reduce((prev, curr) => prev + curr) / values.length
          );
          const itemSearch: ItemModSearch = {
            ...mod,
            ...stat,
            regex,
            value
          };

          throw itemSearch;
        }
      });
    } catch (itemModSearch) {
      return itemModSearch;
    }

    const error = `Could not find a ${mod.type} stat "${mod.text}"`;
    // tslint:disable-next-line: no-console
    console.error(error);
    return null;
  };

  private getRegex = ({ text }: PoeStat): string =>
    text.replace(/([\+\-\*\?])/, "\\$1").replace(/#/g, "(\\d+)");
}
