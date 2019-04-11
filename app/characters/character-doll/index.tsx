import React, { useState } from "react";

import ItemSlot from "./item-slot";
import WeaponSlot from "./weapon-slot";
import FlasksSlot from "./flasks-slot";
import { PoeItem, PoeCharacterEquipment } from "../../poe-content";
import {
  Doll,
  WeaponSlot1,
  WeaponSlot2,
  Amulet,
  Ring1,
  Ring2,
  Helm,
  BodyArmour,
  Belt,
  Gloves,
  Boots,
  Flasks
} from "./character-doll.components";

export interface CharacterDollProps extends PoeCharacterEquipment {
  onItemSelected: (item: PoeItem) => void;
}

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
