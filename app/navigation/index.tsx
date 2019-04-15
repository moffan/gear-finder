import React from "react";
import {
  Router,
  Route,
  Switch,
  RouteProps,
  RouteComponentProps
} from "react-router-dom";

import PrivateRoute from "./private-route";
import LoginScreen from "../user/login-screen";
import { PoeProvider } from "../poe-content";
import { AppToolBar } from "../components";
import {
  CharacterSheet,
  CharacterList,
  CharacterProvider
} from "../characters";
import history from "./history";

export interface RouterProps extends RouteProps {
  isAuthenticated: boolean;
}

const Providers: React.FunctionComponent = ({ children, ...props }) => (
  <PoeProvider>{children}</PoeProvider>
);

const AppRouter: React.FunctionComponent<any> = () => (
  <Router history={history}>
    <Providers>
      <AppToolBar />
      <Switch>
        <PrivateRoute
          path="/character/:name"
          component={({ match: { params } }: RouteComponentProps) => {
            const { name } = params as any; //TODO: figure out how to set up interfaces for params
            return (
              <CharacterProvider characterName={name}>
                <CharacterSheet />
              </CharacterProvider>
            );
          }}
        />
        <PrivateRoute exact path="/" component={CharacterList} />
        <Route path="/login" component={LoginScreen} />
      </Switch>
    </Providers>
  </Router>
);

export default AppRouter;
