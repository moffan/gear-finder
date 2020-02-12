import React, {
  FunctionComponent,
  useContext,
  useState,
  useReducer
} from "react";
import { useParams } from "react-router-dom";

import { Div, H1, Section } from "../components";
import { CharacterContext } from "./character-provider";
import { CharacterDoll } from "./character-doll";
import { Poe } from "../../common";
import EquipmentConfigurator from "./equipment-configurator";

export const CharacterSheet: FunctionComponent = () => {
  const { name } = useParams<{ name: string }>();
  const character = useContext(CharacterContext).getCharacter(name);
  const [selectedItem, setSelectedItem] = useState<Poe.Item>();

  const [filters, filterDispatcher] = useReducer((state: any, action: any) => {
    console.log(action);
    return state;
  }, []);

  if (!character) {
    return null;
  }

  const { level, class: className, items } = character;

  return (
    <Div>
      <Div>
        <H1>{name}</H1>
        <Section>
          {level} {className}
        </Section>
      </Div>
      <Div style={{ display: "flex" }}>
        <CharacterDoll items={items} onItemSelected={setSelectedItem} />
        <EquipmentConfigurator
          item={selectedItem}
          filters={filters}
          dispatch={filterDispatcher}
        />
      </Div>
    </Div>
  );
};
