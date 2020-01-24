import React, { FunctionComponent, useContext } from "react";
import { useEffect } from "react";
import { apiService } from "../utils";
import { PoeRequests, CurrencyLine } from "../../common";
import { useState } from "react";
import { Page, List, ListItem } from "../components";
import { UserContext } from "../user";

interface PoeCurrencyItem {
  typeLine: string;
  stackSize: number;
  chaosValue?: number;
}

const useCurrency = () => {
  const { api } = useContext(UserContext);
  const [currency, setCurrency] = useState<PoeCurrencyItem[]>([]);

  useEffect(() => {
    const getCurrencyInfo = async () => {
      const currencyData = await api.send<CurrencyLine[]>(PoeRequests.Currency);

      const { items } = await api.send<{ items: PoeCurrencyItem[] }>(
        PoeRequests.Stash
      );

      setCurrency(
        items.map(item => {
          const [value] = currencyData.filter(
            cd => cd.currencyTypeName === item.typeLine
          );

          if (!!value) {
            const { chaosEquivalent } = value;
            item.chaosValue = chaosEquivalent * item.stackSize;
          }

          return item;
        })
      );
    };

    getCurrencyInfo();
  }, []);

  return {
    currency
  };
};

const CurrencyList: FunctionComponent<{ currency: PoeCurrencyItem[] }> = ({
  currency
}) => (
  <List>
    {currency
      .sort((a, b) => (a.typeLine > b.typeLine ? 1 : -1))
      .map(({ typeLine, stackSize, chaosValue }, key) => (
        <ListItem key={key}>
          <span>{typeLine}</span>
          {"\t"}
          <span>{stackSize}</span>
          {"\t"}
          <span>{chaosValue}</span>
        </ListItem>
      ))}
  </List>
);

const TotalChaos: FunctionComponent<{ currency: PoeCurrencyItem[] }> = ({
  currency
}) => (
  <span>
    Total Chaos:
    {currency.length > 0 &&
      currency
        .map(item => (item.chaosValue ? item.chaosValue : 0))
        .reduce((sum, chaosValue) => sum + chaosValue)}
  </span>
);

export const Currency = () => {
  const { currency } = useCurrency();

  return (
    <Page>
      <h1>Currency</h1>
      <CurrencyList currency={currency} />
      <TotalChaos currency={currency} />
    </Page>
  );
};
