import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect
} from "react";
import { useParams } from "react-router-dom";

import { Div, H1, Section } from "../components";
import { CharacterContext } from "./character-provider";
import { CharacterDoll } from "./character-doll";

export const CharacterSheet: FunctionComponent = () => {
  const { name } = useParams<{ name: string }>();
  const character = useContext(CharacterContext).getCharacter(name);
  if (!character) {
    return null;
  }

  const { level, class: className, items } = character;

  const setSelectedItem = console.log;

  return (
    <Div>
      <Div>
        <H1>{name}</H1>
        <Section>
          {level} {className}
        </Section>
      </Div>
      <CharacterDoll items={items} onItemSelected={setSelectedItem} />
      {/* <EquipmentConfigurator
        item={selectedItem}
        filters={filters}
        dispatch={filterDispatcher}
      /> */}
    </Div>
  );
};
