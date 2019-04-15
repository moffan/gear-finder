import React, { useContext } from "react";

import { useUserService } from "../user";
import { PoeContext, PoeCharacter } from "../poe-content";
import { Card, CardHeader, CardActions, IconButton } from "../components";
import { useCharacterListService } from "./characters.hooks";
import { CharacterContext } from "./provider";

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

const CharacterList: React.FunctionComponent = () => {
  const [{ sessionId }] = useUserService();
  const [characters] = useCharacterListService(sessionId);
  const { selectedLeague, setActiveCharacter } = useContext(PoeContext);

  return (
    <>
      {characters
        .filter((item: PoeCharacter) =>
          selectedLeague ? item.league === selectedLeague : true
        )
        .map((character: PoeCharacter, index: number) => {
          return (
            <CharacterListItem
              key={index}
              {...character}
              onSelect={setActiveCharacter}
            />
          );
        })}
    </>
  );
};

export default CharacterList;
