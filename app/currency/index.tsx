import React from "react";
import { Route, NavLink } from "react-router-dom";
import { Currency } from "./currency";

const routePath = "/currency";

export const CurrencyLink = () => <NavLink to={routePath}>Currency</NavLink>;

export const CurrencyRoute = () => (
  <Route exact path={routePath}>
    <Currency />
  </Route>
);
