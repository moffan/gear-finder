import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "@emotion/styled";

import useEquipmentService from "./equipment.service";
import CharacterDoll from "./character-doll";
import EquipmentConfigurator from "./equipment-configurator";
import { PoeCharacter, PoeItem } from "../poe-content";

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

const Equipment = styled.div`
  background: rgba(0, 0, 0, 0.14);
  grid-column: 2;
`;

const CharacterDetails = ({ name }: PoeCharacter) => <h1>{name}</h1>;

const CharacterSheet: React.FunctionComponent<RouteComponentProps> = ({
  match: { params }
}) => {
  const { name } = params as any; //TODO: know its there figure out how to set up interfaces
  const [selectedItem, setSelectedItem] = useState<PoeItem | null>(null);
  const [character, equipment] = useEquipmentService(name);

  return (
    <Sheet>
      <Header>
        <CharacterDetails {...character} />
      </Header>
      <Content>
        <CharacterDoll {...equipment} onItemSelected={setSelectedItem} />
        <Equipment>
          {selectedItem && <EquipmentConfigurator item={selectedItem} />}
        </Equipment>
      </Content>
    </Sheet>
  );
};

export default CharacterSheet;
