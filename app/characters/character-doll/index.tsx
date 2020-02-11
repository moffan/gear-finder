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
import { PoeCharacterEquipment, PoeItem } from "../../../common";

export interface CharacterDollProps {
  items: PoeCharacterEquipment[];
  onItemSelected: (item: PoeItem) => void;
}

export const CharacterDoll: FunctionComponent<CharacterDollProps> = ({
  items,
  onItemSelected
}) => {
  const [weapon, setWeapon] = useState<PoeCharacterEquipment>();
  const [weapon2, setWeapon2] = useState<PoeCharacterEquipment>();
  const [offhand, setOffhand] = useState<PoeCharacterEquipment>();
  const [offhand2, setOffhand2] = useState<PoeCharacterEquipment>();
  const [amulet, setAmulet] = useState<PoeCharacterEquipment>();
  const [ring, setRing] = useState<PoeCharacterEquipment>();
  const [ring2, setRing2] = useState<PoeCharacterEquipment>();
  const [helm, setHelm] = useState<PoeCharacterEquipment>();
  const [bodyArmour, setBodyArmour] = useState<PoeCharacterEquipment>();
  const [belt, setBelt] = useState<PoeCharacterEquipment>();
  const [gloves, setGloves] = useState<PoeCharacterEquipment>();
  const [boots, setBoots] = useState<PoeCharacterEquipment>();
  const [flasks, setFlasks] = useState<PoeCharacterEquipment[]>();

  useEffect(() => {
    console.log(items);
  }, [items]);

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
          weapon1={weapon}
          weapon2={weapon2}
        />
      </WeaponSlot1>

      <WeaponSlot2>
        <WeaponSlot
          onClick={onItemSelected}
          onSwitchWeaponSet={switchWeaponSet}
          activeSet={activeSet}
          weapon1={offhand}
          weapon2={offhand2}
        />
      </WeaponSlot2>

      <Amulet>
        <ItemSlot onClick={onItemSelected} item={amulet} />
      </Amulet>

      <Ring1>
        <ItemSlot onClick={onItemSelected} item={ring} />
      </Ring1>

      <Ring2>
        <ItemSlot onClick={onItemSelected} item={ring2} />
      </Ring2>

      <Helm>
        <ItemSlot onClick={onItemSelected} item={helm} />
      </Helm>

      <BodyArmour>
        <ItemSlot onClick={onItemSelected} item={bodyArmour} />
      </BodyArmour>

      <Belt>
        <ItemSlot onClick={onItemSelected} item={belt} />
      </Belt>

      <Gloves>
        <ItemSlot onClick={onItemSelected} item={gloves} />
      </Gloves>

      <Boots>
        <ItemSlot onClick={onItemSelected} item={boots} />
      </Boots>

      <Flasks>
        <FlasksSlot onClick={onItemSelected} flasks={flasks ?? []} />
      </Flasks>
    </Doll>
  );
};
