import { useCurrency, usePoeNijaValues } from "../api/currency";
import { useState, useMemo, FunctionComponent } from "react";

export interface PoeCurrencyItem {
  name: string;
  stackSize: number;
  value: number;
  totalValue: number;
}

export const useCurrencyValues = (): FunctionComponent => {
  const currency = useCurrency();
  const values = usePoeNijaValues();

  const [threshold] = useState<number>(25);

  const pricedItems = useMemo(() => {
    if (currency.length === 0 || values.length === 0) {
      return [];
    }

    const items: PoeCurrencyItem[] = [];
    const chaosShards = currency.find(item => item.typeLine === "Chaos Shard");
    if (chaosShards) {
      const value = 1 / 20;
      const { typeLine, stackSize } = chaosShards;
      items.push({
        name: typeLine,
        stackSize: stackSize,
        value,
        totalValue: value * stackSize
      });
    }

    const chaosOrbs = currency.find(item => item.typeLine === "Chaos Orb");
    if (chaosOrbs) {
      const value = 1;
      const { typeLine, stackSize } = chaosOrbs;
      items.push({
        name: typeLine,
        stackSize: stackSize,
        value,
        totalValue: stackSize
      });
    }

    values.forEach(valueItem => {
      const { currencyTypeName, chaosEquivalent: value } = valueItem;
      const stashItem = currency.find(
        item => item.typeLine === currencyTypeName
      );

      if (!stashItem) {
        return;
      }

      const { stackSize } = stashItem;
      items.push({
        name: currencyTypeName,
        stackSize,
        value,
        totalValue: stackSize ? Math.round(value * stackSize) : 0
      });
    });

    return items.filter(item => item.totalValue >= threshold);
  }, [currency, values]);

  return {
    pricedItems
  };
};
