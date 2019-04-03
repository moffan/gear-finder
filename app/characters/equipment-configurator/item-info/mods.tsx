import React from "react";
import styled from "@emotion/styled";

import { IconButton } from "../../../components";

export interface ModsProps {
  implicitMods: any;
  explicitMods: any;
  onClick: (mod: any) => void;
}

const ModLineContainer = styled.div`
  display: flex;
  border: 1px solid red;
  "align-items":center ;
`;

const ModLine: React.FunctionComponent<any> = ({ mod, onClick }) => (
  <ModLineContainer>
    <IconButton icon="add_circle" onClick={() => onClick(mod)} />
    {mod}
  </ModLineContainer>
);

const Mods: React.FunctionComponent<any> = ({
  implicitMods,
  explicitMods,
  onClick,
  classes
}) => (
  <div>
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
  </div>
);

export default Mods;
