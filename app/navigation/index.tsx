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
import AppToolBar from "../app-tool-bar";
import PoeProvider from "../poe-provider";

export interface RouterProps extends RouteProps {
  isAuthenticated: boolean;
}

const AppRouter: React.FunctionComponent<any> = () => {
  return (
    <Router>
      <PoeProvider>
        <AppToolBar />
        <Switch>
          <PrivateRoute path="/character/:name" component={CharacterSheet} />
          <PrivateRoute exact path="/" component={CharacterList} />
          <Route path="/login" component={LoginScreen} />
        </Switch>
      </PoeProvider>
    </Router>
  );
};

export default AppRouter;
