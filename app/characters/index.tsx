import React, { FunctionComponent } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { CharacterList } from "./character-list";
import { Character } from "./character-sheet";
import { CharacterProvier } from "./character-provider";

export const CharacterRouter: FunctionComponent = () => {
  const { path } = useRouteMatch();

  return (
    <CharacterProvier>
      <Switch>
        <Route path={`${path}/:name`} component={Character} />
        <Route path={path} component={CharacterList} />
      </Switch>
    </CharacterProvier>
  );
};
