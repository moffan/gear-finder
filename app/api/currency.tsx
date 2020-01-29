import { useState, useEffect, useContext } from "react";
import { UserContext } from "../user";
import { PoeRequests, StashTabItem, PoeNinjaItemValue } from "../../common";

export const useCurrency = () => {
  const { api, stash } = useContext(UserContext);
  const [currency, setCurrency] = useState<StashTabItem[]>([]);

  useEffect(() => {
    api
      .send<any[]>(PoeRequests.StashTab, {
        tabs: stash.activeTabs.map(item => item.i)
      })
      .then(setCurrency)
      // tslint:disable-next-line: no-console
      .catch(console.error);
  }, []);

  return currency;
};

export const usePoeNijaValues = () => {
  const { api, stash } = useContext(UserContext);
  const [currencyValues, setCurrencyValues] = useState<PoeNinjaItemValue[]>([]);

  useEffect(() => {
    api
      .send<PoeNinjaItemValue[]>(PoeRequests.CurrencyValues, {
        tabs: stash.activeTabs.map(item => item.i)
      })
      .then(setCurrencyValues)
      // tslint:disable-next-line: no-console
      .catch(console.error);
  }, []);

  return currencyValues;
};
