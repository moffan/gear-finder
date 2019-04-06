import React, { useState } from "react";
import styled from "@emotion/styled";

import ItemSlot from "./item-slot";
import WeaponSlot from "./weapon-slot";
import FlasksSlot from "./flasks-slot";
import { PoeItem, PoeCharacterEquipment } from "../../poe-content";

export interface CharacterDollProps extends PoeCharacterEquipment {
  onItemSelected: (item: PoeItem) => void;
}

const Doll = styled.div`
  border: 5px black solid;
  padding: 5px;
  grid-column: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

const Amulet = styled.div`
  grid-column: 4;
  grid-row: 2;
`;

const Belt = styled.div`
  grid-column: 3;
  grid-row: 4;
`;
const BodyArmour = styled.div`
  grid-column: 3;
  grid-row: 2 / 4;
`;
const Boots = styled.div`
  grid-column: 4;
  grid-row: 4 / 6;
`;
const Flasks = styled.div`
  grid-column: 3 / 5;
  grid-row: 5;
`;
const Gloves = styled.div`
  grid-column: 2;
  grid-row: 4 / 6;
`;
const Helm = styled.div`
  grid-column: 3;
  grid-row: 1;
`;
const Ring1 = styled.div`
  grid-column: 2;
  grid-row: 3;
`;
const Ring2 = styled.div`
  grid-column: 4;
  grid-row: 3;
`;
const WeaponSlot1 = styled.div`
  grid-column: 1;
  grid-row: 1 / 6;
`;
const WeaponSlot2 = styled.div`
  grid-column: 5;
  grid-row: 1 / 6;
`;

const characterDoll: React.FunctionComponent<CharacterDollProps> = props => {
  const [activeSet, setActiveSet] = useState<1 | 2>(1);

  const switchWeaponSet = () => {
    setActiveSet(activeSet === 1 ? 2 : 1);
  };

  return (
    <Doll>
      <WeaponSlot1>
        <WeaponSlot
          onClick={props.onItemSelected}
          onSwitchWeaponSet={switchWeaponSet}
          activeSet={activeSet}
          weapon1={props.Weapon}
          weapon2={props.Weapon2}
        />
      </WeaponSlot1>

      <WeaponSlot2>
        <WeaponSlot
          onClick={props.onItemSelected}
          onSwitchWeaponSet={switchWeaponSet}
          activeSet={activeSet}
          weapon1={props.Offhand}
          weapon2={props.Offhand2}
        />
      </WeaponSlot2>

      <Amulet>
        <ItemSlot onClick={props.onItemSelected} item={props.Amulet} />
      </Amulet>

      <Ring1>
        <ItemSlot onClick={props.onItemSelected} item={props.Ring} />
      </Ring1>

      <Ring2>
        <ItemSlot onClick={props.onItemSelected} item={props.Ring2} />
      </Ring2>

      <Helm>
        <ItemSlot onClick={props.onItemSelected} item={props.Helm} />
      </Helm>

      <BodyArmour>
        <ItemSlot onClick={props.onItemSelected} item={props.BodyArmour} />
      </BodyArmour>

      <Belt>
        <ItemSlot onClick={props.onItemSelected} item={props.Belt} />
      </Belt>

      <Gloves>
        <ItemSlot onClick={props.onItemSelected} item={props.Gloves} />
      </Gloves>

      <Boots>
        <ItemSlot onClick={props.onItemSelected} item={props.Boots} />
      </Boots>

      <Flasks>
        <FlasksSlot onClick={props.onItemSelected} flasks={props.Flask} />
      </Flasks>
    </Doll>
  );
};

export default characterDoll;
