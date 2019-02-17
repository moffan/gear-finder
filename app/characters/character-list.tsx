import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  CardContent,
  CardHeader,
  Collapse,
  withStyles,
  Theme,
  CardActions,
  StyledComponentProps,
  Card,
  IconButton
} from "@material-ui/core";
import classnames from "classnames";
import { PlayArrowOutlined, ExpandMore } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

import { useUserService } from "../user";
import useCharactersService from "./characters.service";
import { PoeCharacter } from "../common/poe.models";

const styles = (theme: Theme) => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const characterListItem: React.FunctionComponent<
  PoeCharacter &
    StyledComponentProps & { onSelect: (character: PoeCharacter) => void }
> = ({ classes, onSelect, ...character }) => {
  const [showExtra, setShowExtra] = useState(false);

  if (!classes) {
    throw new Error("classes are missing");
  }

  return (
    <Card style={{ cursor: "pointer", margin: "5px" }}>
      <CardHeader
        title={character.name}
        subheader={`Level ${character.level} ${character.class}`}
      />
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton
          aria-label="Go to character"
          onClick={() => {
            onSelect(character);
          }}
        >
          <PlayArrowOutlined />
        </IconButton>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen as any]: showExtra
          })}
          onClick={() => setShowExtra(!showExtra)}
          aria-expanded={showExtra}
          aria-label="Show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={showExtra} timeout="auto" unmountOnExit>
        <CardContent>{character.name}</CardContent>
      </Collapse>
    </Card>
  );
};

const CharacterListItem = withStyles(styles)(characterListItem);

const CharacterList: React.FunctionComponent<RouteComponentProps> = ({
  history
}) => {
  const [{ sessionId }] = useUserService();
  const [characters] = useCharactersService(sessionId);

  const goto = (character: PoeCharacter) => {
    history.push(`/character/${character.name}`);
  };
  return (
    <>
      {/* <form autoComplete="off">
        <FormControl>
          <Select
            autoWidth
            value={this.props.leagueFilter}
            onChange={event => this.props.onSetLeagueFilter(event.target.value)}
            inputProps={{
              name: "league",
              id: "league-simple"
            }}
          >
            <MenuItem key="null" value="" disabled>
              Placeholder
            </MenuItem>
            {this.props.leagues.map((league, index) => (
              <MenuItem key={index} value={league.id}>
                {league.id}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select league</FormHelperText>
        </FormControl>
      </form> */}
      {characters.map((character: PoeCharacter, index: number) => {
        return <CharacterListItem key={index} {...character} onSelect={goto} />;
      })}
    </>
  );
};

export default withStyles(styles)(CharacterList);
