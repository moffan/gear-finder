import React, { useState, useContext } from "react";
import styled from "@emotion/styled";

import CharacterDoll from "./character-doll";
import EquipmentConfigurator from "./equipment-configurator";
import { PoeCharacter, PoeItem } from "../poe-content";
import { CharacterContext, CharacterProvider } from "./provider";
import { RouteComponentProps } from "react-router";

const Sheet = styled.div`
  display: grid;
  grid-template-rows: 1fr 10fr;
`;

const Header = styled.div`
  grid-row: 1;
`;

const Content = styled.div`
  display: grid;
  grid-row: 2;
  grid-template-columns: 1fr 1fr;
`;

const CharacterDetails = ({ name }: PoeCharacter) => (
  <Header>
    <h1>{name}</h1>
  </Header>
);

const CharacterSheet: React.FunctionComponent = () => {
  const [selectedItem, setSelectedItem] = useState<PoeItem | undefined>(
    undefined
  );

  const { character, equipment, mods, modsDispatcher } = useContext(
    CharacterContext
  );

  return (
    <Sheet>
      <CharacterDetails {...character} />
      <Content>
        <CharacterDoll {...equipment} onItemSelected={setSelectedItem} />
        <EquipmentConfigurator
          item={selectedItem}
          mods={mods}
          dispatch={modsDispatcher}
        />
      </Content>
    </Sheet>
  );
};

export default CharacterSheet;
