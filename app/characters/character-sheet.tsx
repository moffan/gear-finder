import React, { FunctionComponent, useContext } from "react";
import { useParams } from "react-router-dom";

import { Div, H1, Section } from "../components";
import { CharacterContext } from "./character-provider";
import { CharacterDoll } from "./character-doll";
import { PoeCharacterEquipment } from "../../common";

export const Character: FunctionComponent = () => {
  const { name } = useParams<{ name: string }>();
  const { getCharacter } = useContext(CharacterContext);

  const character = getCharacter(name);
  if (!character) {
    return null;
  }

  const { class: className, level } = character;

  const setSelectedItem = console.log;

  // const equipment: PoeCharacterEquipment = {};

  return (
    <Div>
      <Div>
        <H1>{name}</H1>
        <Section>
          {level} {className}
        </Section>
      </Div>
      {/* <CharacterDoll {...equipment} onItemSelected={setSelectedItem} /> */}
      {/* <EquipmentConfigurator
        item={selectedItem}
        filters={filters}
        dispatch={filterDispatcher}
      /> */}
    </Div>
  );
};
