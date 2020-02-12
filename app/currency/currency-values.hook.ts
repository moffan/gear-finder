import { useCurrency, usePoeNijaValues } from "../api/currency";
import { useState, useMemo } from "react";

export interface PoeCurrencyItem {
  name: string;
  stackSize: number;
  value: number;
  totalValue: number;
}

export const useCurrencyValues = () => {
  const currency = useCurrency();
  const values = usePoeNijaValues();

  const [threshold] = usePersistedState<number>("currency_threshold", 1);

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

    return items
      .filter(item => item.totalValue >= threshold)
      .sort((a, b) =>
        a.totalValue < b.totalValue
          ? 1
          : a.totalValue > b.totalValue
          ? -1
          : a.stackSize < b.stackSize
          ? -1
          : 1
      );
  }, [currency, values]);

  return {
    pricedItems
  };
};
