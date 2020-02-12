import React, { FunctionComponent } from "react";

import {
  H2,
  ScrollViewer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../components";
import { PoeCurrencyItem, useCurrencyValues } from "./currency-values.hook";

const TotalChaos: FunctionComponent<{ pricedItems: PoeCurrencyItem[] }> = ({
  pricedItems
}) => {
  const total = pricedItems
    .map(item => (item.totalValue ? item.totalValue : 0))
    .reduce((sum, chaosValue) => sum + chaosValue, 0);
  return <H2>Total Chaos: {Math.round(total)}</H2>;
};

export const Currency: FunctionComponent = () => {
  const { pricedItems } = useCurrencyValues();

  return (
    <>
      <h1>Currency</h1>
      <TotalChaos pricedItems={pricedItems} />
      <ScrollViewer>
        <Table>
          <Thead>
            <Tr>
              <Th scope="col">Name</Th>
              <Th scope="col">Count</Th>
              <Th scope="col">Value</Th>
              <Th scope="col">Total Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pricedItems.map(({ name, stackSize, value, totalValue }, key) => (
              <Tr key={key}>
                <Td>{name}</Td>
                <Td>{stackSize}</Td>
                <Td>{value}</Td>
                <Td>{totalValue}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ScrollViewer>
    </>
  );
};
