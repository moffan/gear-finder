import React, { FunctionComponent, useMemo } from "react";
import { Table, Caption, Tbody, Tr, Td, Thead, Th } from "../components";
import { useCurrency, usePoeNijaValues } from "../api/currency";
import { useState } from "react";

interface PoeCurrencyItem {
  name: string;
  stackSize: number;
  value: number;
  totalValue: number;
}

const useCurrencyValues = () => {
  const currency = useCurrency();
  const values = usePoeNijaValues();

  const [threshold] = useState<number>(25);

  const pricedItems = useMemo(() => {
    if (currency.length === 0 || values.length === 0) {
      return [];
    }

    const items: PoeCurrencyItem[] = [];
    values.forEach(valueItem => {
      const { currencyTypeName, chaosEquivalent: value } = valueItem;
      const stashItem = currency.find(
        item => item.typeLine === currencyTypeName
      );

      if (!stashItem) {
        return;
      }

      const { stackSize } = stashItem;
      const totalValue = stackSize ? Math.round(value * stackSize) : 0;
      if (totalValue < threshold) {
        return;
      }

      items.push({
        name: currencyTypeName,
        stackSize,
        value,
        totalValue
      });
    });

    return items;
  }, [currency, values]);

  return {
    pricedItems
  };
};

const TotalChaos: FunctionComponent<{ pricedItems: PoeCurrencyItem[] }> = ({
  pricedItems
}) => {
  const total = pricedItems
    .map(item => (item.totalValue ? item.totalValue : 0))
    .reduce((sum, chaosValue) => sum + chaosValue, 0);
  return <span>Total Chaos: {Math.round(total)}</span>;
};

export const Currency = () => {
  const { pricedItems } = useCurrencyValues();

  return (
    <>
      <h1>Currency</h1>

      <Table>
        <Caption>
          <TotalChaos pricedItems={pricedItems} />
        </Caption>
        <Thead>
          <Tr>
            <Th scope="col">Name</Th>
            <Th scope="col">Count</Th>
            <Th scope="col">Value</Th>
            <Th scope="col">Total Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pricedItems
            .sort((a, b) => (a.totalValue < b.totalValue ? 1 : -1))
            .map(({ name, stackSize, value, totalValue }, key) => (
              <Tr key={key}>
                <Td>{name}</Td>
                <Td>{stackSize}</Td>
                <Td>{value}</Td>
                <Td>{totalValue}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
};
