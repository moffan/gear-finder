import React from "react";
import styled from "@emotion/styled";

import { IconButton } from "../../../components";

export interface ModsProps {
  implicitMods: any;
  explicitMods: any;
  onClick: (mod: any) => void;
}

const Container = styled.div`
  grid-column: 2;
`;

const ModLines = styled.div`
  display: flex;
  border: 1px solid red;
  "align-items":center ;
`;

const ModLine: React.FunctionComponent<any> = ({ mod, onClick }) => (
  <ModLines>
    <IconButton icon="add_circle" onClick={() => onClick(mod)} />
    {mod}
  </ModLines>
);

const Mods: React.FunctionComponent<any> = ({
  implicitMods,
  explicitMods,
  onClick,
  classes
}) => (
  <Container>
    {implicitMods && (
      <>
        <h1>Implicit</h1>
        {implicitMods.map((mod: any, index: number) => (
          <ModLine key={index} mod={mod} onClick={onClick} classes={classes} />
        ))}
      </>
    )}

    {explicitMods && (
      <>
        <h1>Explicit</h1>
        {explicitMods.map((mod: any, index: number) => (
          <ModLine key={index} mod={mod} onClick={onClick} classes={classes} />
        ))}
      </>
    )}
  </Container>
);

export default Mods;
