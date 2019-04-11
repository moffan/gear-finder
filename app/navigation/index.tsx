import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  RouteProps
} from "react-router-dom";

import PrivateRoute from "./private-route";
import LoginScreen from "../user/login-screen";
import CharacterList from "../characters/character-list";
import CharacterSheet from "../characters/character-sheet";
import { PoeProvider } from "../poe-content";
import { AppToolBar } from "../components";
import CharacterProvider from "../characters/character.provider";

export interface RouterProps extends RouteProps {
  isAuthenticated: boolean;
}

const Providers: React.FunctionComponent = ({ children }) => (
  <PoeProvider>
    <CharacterProvider>{children}</CharacterProvider>
  </PoeProvider>
);

const AppRouter: React.FunctionComponent<any> = () => (
  <Router>
    <Providers>
      <AppToolBar />
      <Switch>
        <PrivateRoute path="/character/:name" component={CharacterSheet} />
        <PrivateRoute exact path="/" component={CharacterList} />
        <Route path="/login" component={LoginScreen} />
      </Switch>
    </Providers>
  </Router>
);

export default AppRouter;
