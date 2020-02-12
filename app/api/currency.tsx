import { useContext, useEffect, useState } from "react";

import { PoeNinjaItemValue, PoeRequests, StashTabItem } from "../../common";
import { UserContext } from "../user";

export const useCurrency = () => {
  const { api, stash } = useContext(UserContext);
  const [currency, setCurrency] = useState<StashTabItem[]>([]);

  useEffect(() => {
    api
      .send<any[]>(PoeRequests.StashTab, {
        tabs: stash.activeTabs.map(item => item.i)
      })
      .then(setCurrency)
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
      .catch(console.error);
  }, []);

  return currencyValues;
};
