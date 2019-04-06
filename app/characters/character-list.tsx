import React, { useContext } from "react";
import { RouteComponentProps } from "react-router";

import { useUserService } from "../user";
import useCharactersService from "./characters.service";
import { PoeContext, PoeCharacter } from "../poe-content";
import { Card, CardHeader, CardActions, IconButton } from "../components";

const CharacterListItem: React.FunctionComponent<
  PoeCharacter & { onSelect: (character: PoeCharacter) => void }
> = ({ onSelect, ...character }) => {
  return (
    <Card>
      <CardHeader
        title={character.name}
        subheader={`Level ${character.level} ${character.class}`}
      />
      <CardActions>
        <IconButton
          icon="play_circle_filled"
          onClick={() => {
            onSelect(character);
          }}
        />
      </CardActions>
    </Card>
  );
};

const CharacterList: React.FunctionComponent<RouteComponentProps> = ({
  history
}) => {
  const [{ sessionId }] = useUserService();
  const [characters] = useCharactersService(sessionId);
  const { selectedLeague } = useContext(PoeContext);

  const goto = (character: PoeCharacter) => {
    history.push(`/character/${character.name}`);
  };
  return (
    <>
      {characters
        .filter((item: PoeCharacter) =>
          selectedLeague ? item.league === selectedLeague : true
        )
        .map((character: PoeCharacter, index: number) => {
          return (
            <CharacterListItem key={index} {...character} onSelect={goto} />
          );
        })}
    </>
  );
};

export default CharacterList;
