import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";

import { IconButton } from "../../../components";
import { PoeContext, ItemModSearch } from "../../../poe-content";

export interface ModsProps {
  implicitMods: any;
  explicitMods: any;
  onClick: (mod: ItemModSearch) => void;
}

interface ModLineProps {
  mod: string;
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
        onClick={() => onClick(modService.find(mod))}
      />
      {mod}
    </ModLines>
  );
};

const Mods: React.FunctionComponent<any> = ({
  implicitMods,
  explicitMods,
  onClick
}) => (
  <Container>
    {implicitMods && (
      <>
        <h1>Implicit</h1>
        {implicitMods.map((mod: any, index: number) => (
          <ModLine key={index} mod={mod} onClick={onClick} />
        ))}
      </>
    )}

    {explicitMods && (
      <>
        <h1>Explicit</h1>
        {explicitMods.map((mod: any, index: number) => (
          <ModLine key={index} mod={mod} onClick={onClick} />
        ))}
      </>
    )}
  </Container>
);

export default Mods;
