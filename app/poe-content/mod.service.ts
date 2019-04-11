import { PoeStats, PoeStat, ItemModSearch, StatType, ItemMod } from ".";

class ModService {
  constructor(stats: PoeStats[]) {
    this.statsMap = new Map();
    stats.forEach(stat => this.statsMap.set(stat.label, stat.entries));
  }

  private getRegex = ({ text }: PoeStat): string =>
    text.replace(/([\+\-\*\?])/, "\\$1").replace(/#/g, "(\\d+)");

  private readonly statsMap: Map<StatType, PoeStat[]>;

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
              .map(value => parseInt(value))
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
    console.debug(error);
    return null;
  };
}

export default ModService;
