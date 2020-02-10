import React, {
  useContext,
  useEffect,
  useState,
  FunctionComponent
} from "react";
import { UserContext } from "../user/user.context";
import { PoeRequests, PoeCharacter } from "../../common";
import { Ul, Li, H1, Section, Div } from "../components";
import {
  Link,
  useLocation,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { CharacterContext } from "./character-provider";

interface CharacterListItemProps extends PoeCharacter {
  onClick?: (char: PoeCharacter) => void;
}

const CharacterListItem: FunctionComponent<CharacterListItemProps> = ({
  onClick,
  ...poeCharacter
}) => {
  const { name, level, class: className } = poeCharacter;
  const { pathname } = useLocation();
  return (
    <Li onClick={() => onClick && onClick(poeCharacter)}>
      <Link to={`${pathname}/${name}`}>
        <Div style={{ backgroundColor: "pink", margin: "15px" }}>
          <H1>{name}</H1>
          <Section>
            {level} {className}
          </Section>
        </Div>
      </Link>
    </Li>
  );
};

export const CharacterList = () => {
  const { characters } = useContext(CharacterContext);

  return (
    <div>
      Characters!!!
      <Ul listType="picker">
        {characters.map((character, index) => (
          <CharacterListItem key={index} {...character} />
        ))}
      </Ul>
    </div>
  );
};
