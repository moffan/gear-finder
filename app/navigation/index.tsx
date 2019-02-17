import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  RouteProps,
  Link
} from "react-router-dom";
import { Icon, AppBar, Toolbar, withStyles } from "@material-ui/core";

import PrivateRoute from "./private-route";
import LoginScreen from "../user/login-screen";
import CharacterList from "../characters/character-list";
import CharacterSheet from "../characters/character-sheet";

export interface RouterProps extends RouteProps {
  isAuthenticated: boolean;
}

const router: React.FunctionComponent<any> = ({ classes }) => {
  return (
    <Router>
      <>
        <AppBar position="static" color="default">
          <Toolbar>
            <Link to="/">
              <Icon className={classes.icon}>home</Icon>
            </Link>
          </Toolbar>
        </AppBar>
        <Switch>
          <PrivateRoute path="/character/:name" component={CharacterSheet} />
          <PrivateRoute exact path="/" component={CharacterList} />
          <Route path="/login" component={LoginScreen} />
        </Switch>
      </>
    </Router>
  );
};

const styles = (theme: any) => ({
  icon: {
    margin: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(router);
