import { PoeItem } from "../poe-content";

export function decodeItem(item: PoeItem) {
  return { ...item, name: decode(item.name), typeLine: decode(item.typeLine) };
}

const decode = (text: string) => text.replace(/<\s*<.+>\s*>/, "");
