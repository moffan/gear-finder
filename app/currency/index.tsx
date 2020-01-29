import React, { FunctionComponent } from "react";
import { Table, Caption, Tbody, Tr, Td, Thead, Th } from "../components";
import { useCurrencyValues, PoeCurrencyItem } from "./currency-values.hook";




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
