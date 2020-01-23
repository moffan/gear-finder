import fs from "fs";
import path from "path";
import { promisify } from "util";

export class DataStore {
  private dataFolder = path.resolve(".data");
  private writeFile = promisify(fs.writeFile);
  private readFile = promisify(fs.readFile);
  private exists = promisify(fs.exists);
  private mkdir = promisify(fs.mkdir);

  constructor() {
    this.exists(this.dataFolder).then(hasDataFolder => {
      if (!hasDataFolder) {
        this.mkdir(this.dataFolder);
      }
    });
  }

  public async read<T>(key: string): Promise<T | null> {
    const filename = this.getFileName(key);

    if (!(await this.exists(filename))) {
      return null;
    }

    const fileData = await this.readFile(filename, { encoding: "utf8" });

    return JSON.parse(fileData);
  }

  public async write<T extends {}>(key: string, data: T): Promise<void> {
    const filename = this.getFileName(key);
    await this.writeFile(filename, JSON.stringify(data));
  }

  private getFileName = (key: string): string =>
    path.join(this.dataFolder, `${key}.json`);
}
