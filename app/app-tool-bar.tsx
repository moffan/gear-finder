import React, { useContext } from "react";
import {
  Icon,
  AppBar,
  Toolbar,
  withStyles,
  StyledComponentProps,
  FormControl,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { PoeContext } from "./poe-provider";

const AppToolBar: React.FunctionComponent<StyledComponentProps> = ({
  classes
}) => {
  const { availableLeagues, selectedLeague, setSelectedLeague } = useContext(
    PoeContext
  );

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Link to="/">
          <Icon className={classes!.icon}>home</Icon>
        </Link>
        <form autoComplete="off">
          <FormControl>
            <Select
              autoWidth
              value={selectedLeague}
              onChange={event => setSelectedLeague(event.target.value)}
              inputProps={{
                name: "league",
                id: "league-simple"
              }}
            >
              {availableLeagues.map((league: any, index: number) => (
                <MenuItem key={index} value={league.id}>
                  {league.id}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select league</FormHelperText>
          </FormControl>
        </form>
      </Toolbar>
    </AppBar>
  );
};

const styles = (theme: any) => ({
  icon: {
    margin: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(AppToolBar);
