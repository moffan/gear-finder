import React, { useState, FunctionComponent, useEffect } from "react";

import ItemSlot from "./item-slot";
import WeaponSlot from "./weapon-slot";
import FlasksSlot from "./flasks-slot";
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
import { Poe } from "../../../common";

export interface CharacterDollProps {
  items: Poe.CharacterEquipment;
  onItemSelected: (item: Poe.Item) => void;
}

export const CharacterDoll: FunctionComponent<CharacterDollProps> = ({
  items,
  onItemSelected
}) => {
  const [activeSet, setActiveSet] = useState<1 | 2>(1);
  const switchWeaponSet = () => {
    setActiveSet(activeSet === 1 ? 2 : 1);
  };

  return (
    <Doll>
      <WeaponSlot1>
        <WeaponSlot
          onClick={onItemSelected}
          onSwitchWeaponSet={switchWeaponSet}
          activeSet={activeSet}
          weapon1={items.Weapon}
          weapon2={items.Weapon2}
        />
      </WeaponSlot1>

      <WeaponSlot2>
        <WeaponSlot
          onClick={onItemSelected}
          onSwitchWeaponSet={switchWeaponSet}
          activeSet={activeSet}
          weapon1={items.Offhand}
          weapon2={items.Offhand2}
        />
      </WeaponSlot2>

      <Amulet>
        <ItemSlot onClick={onItemSelected} item={items.Amulet} />
      </Amulet>

      <Ring1>
        <ItemSlot onClick={onItemSelected} item={items.Ring} />
      </Ring1>

      <Ring2>
        <ItemSlot onClick={onItemSelected} item={items.Ring2} />
      </Ring2>

      <Helm>
        <ItemSlot onClick={onItemSelected} item={items.Helm} />
      </Helm>

      <BodyArmour>
        <ItemSlot onClick={onItemSelected} item={items.BodyArmour} />
      </BodyArmour>

      <Belt>
        <ItemSlot onClick={onItemSelected} item={items.Belt} />
      </Belt>

      <Gloves>
        <ItemSlot onClick={onItemSelected} item={items.Gloves} />
      </Gloves>

      <Boots>
        <ItemSlot onClick={onItemSelected} item={items.Boots} />
      </Boots>

      <Flasks>
        <FlasksSlot onClick={onItemSelected} flasks={items.Flask ?? []} />
      </Flasks>
    </Doll>
  );
};
