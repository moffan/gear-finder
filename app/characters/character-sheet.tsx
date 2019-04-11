import React, { useState, useReducer, useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "@emotion/styled";

import useEquipmentService from "./equipment.service";
import CharacterDoll from "./character-doll";
import EquipmentConfigurator from "./equipment-configurator";
import { PoeCharacter, PoeItem, ItemModSearch } from "../poe-content";
import { ItemSearchActionTypes } from "./character.models";
import { CharacterContext } from "./character.provider";

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

const CharacterSheet: React.FunctionComponent<RouteComponentProps> = ({
  match: { params }
}) => {
  const { name } = params as any; //TODO: figure out how to set up interfaces for params
  const { setCharacter, character: charName } = useContext(CharacterContext);
  useEffect(() => {
    setCharacter(name);
  }, [name]);

  console.log(charName);
  const [selectedItem, setSelectedItem] = useState<PoeItem | undefined>(
    undefined
  );
  const [character, equipment] = useEquipmentService(name);
  const [mods, dispatch] = useReducer(
    (
      state: ItemModSearch[],
      { type, payload }: { type: ItemSearchActionTypes; payload?: any }
    ) => {
      switch (type) {
        case ItemSearchActionTypes.Add:
          if (!payload) {
            return state;
          }

          return state.indexOf(payload.mod) === -1
            ? [...state, payload]
            : state;
        case ItemSearchActionTypes.Change:
          return state.map(item => {
            if (item.id === payload.id) {
              return { ...item, value: payload.value };
            }

            return item;
          });
        case ItemSearchActionTypes.Remove:
          return state.filter(item => item.id !== payload.id);
        case ItemSearchActionTypes.Clear:
          return [];
        default:
          return state;
      }
    },
    []
  );
  return (
    <Sheet>
      <CharacterDetails {...character} />
      <Content>
        <CharacterDoll {...equipment} onItemSelected={setSelectedItem} />
        <EquipmentConfigurator
          item={selectedItem}
          mods={mods}
          dispatch={dispatch}
        />
      </Content>
    </Sheet>
  );
};

export default CharacterSheet;
