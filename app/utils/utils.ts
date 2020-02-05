import { PoeItem } from "../poe-content";

export function decodeItem(item: PoeItem) {
  const decode = (text: string) => text.replace(/<\s*<.+>\s*>/, "");
  return { ...item, name: decode(item.name), typeLine: decode(item.typeLine) };
}
