import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";

import { IconButton } from "../../../components";
import {
  PoeContext,
  ItemModSearch,
  ItemMod,
  StatType
} from "../../../poe-content";

export interface ModsProps {
  implicitMods: string[];
  explicitMods: string[];
  onClick: (mod: ItemModSearch) => void;
}

interface ModLineProps {
  mod: ItemMod;
  onClick: (mod: ItemModSearch) => void;
}

const Container = styled.div`
  grid-column: 2;
`;

const ModLines = styled.div`
  display: flex;
  border: 1px solid red;
  "align-items":center ;
`;

const ModLine: React.FunctionComponent<ModLineProps> = ({ mod, onClick }) => {
  const { modService } = useContext(PoeContext);

  return (
    <ModLines>
      <IconButton
        icon="add_circle"
        onClick={() => {
          const search = modService.find(mod);
          if (!!search) {
            onClick(search);
          }
        }}
      />
      {mod.text}
    </ModLines>
  );
};

const Mods: React.FunctionComponent<ModsProps> = ({
  implicitMods,
  explicitMods,
  onClick
}) => (
  <Container>
    {implicitMods && (
      <>
        <h1>Implicit</h1>
        {implicitMods.map((text: string, index: number) => {
          const itemMod: ItemMod = { type: StatType.Implicit, text };
          return <ModLine key={index} mod={itemMod} onClick={onClick} />;
        })}
      </>
    )}

    {explicitMods && (
      <>
        <h1>Explicit</h1>
        {explicitMods.map((text: string, index: number) => {
          const itemMod: ItemMod = { type: StatType.Explicit, text };
          return <ModLine key={index} mod={itemMod} onClick={onClick} />;
        })}
      </>
    )}
  </Container>
);

export default Mods;
