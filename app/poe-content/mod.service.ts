import { PoeStats, PoeStat, ItemModSearch } from ".";

class ModService {
  constructor(stats: PoeStats[]) {
    if (!stats) {
      this.tests = []
      return
    }

    const entries = stats
      .map((item: any) =>
        item.entries
          .filter((entry: any) => entry.text.includes("#"))
          .map((entry: any) => ({
            ...entry,
            label: item.label
          }))
      )
      .reduce((prev: any, current: any) => {
        return [...prev, ...current];
      });

    const regexes: {
      [key: string]: any;
    } = {};

    entries.forEach((entry: PoeStat) => {
      const regex = entry.text
        .replace(/([\+\-\*\?])/, "\\$1")
        .replace("#", "(\\d+)");
      regexes[regex] = !!regexes[entry.text]
        ? [...regexes[entry.text], entry]
        : [entry];
    });

    this.tests = Object.entries(regexes);
  }

  private readonly tests: [string, {}][];

  public find = (mod: string): ItemModSearch => {
    try {
      this.tests.forEach(entry => {
        const [test] = entry;
        if (new RegExp(test).test(mod)) {
          throw entry;
        }
      });
    } catch (mods) {
      return { mods, mod };
    }

    return { mod };
  };
}

export default ModService;
