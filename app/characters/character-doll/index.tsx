import React, { useState } from "react";

import ItemSlot from "./item-slot";
import WeaponSlot from "./weapon-slot";
import FlasksSlot from "./flasks-slot";
import { PoeItem, PoeCharacterEquipment } from "../../poe-content";

export interface CharacterDollProps extends PoeCharacterEquipment {
  onItemSelected: (item: PoeItem) => void;
}

const characterDoll: React.FunctionComponent<CharacterDollProps> = props => {
  const [activeSet, setActiveSet] = useState<1 | 2>(1);

  const switchWeaponSet = () => {
    setActiveSet(activeSet === 1 ? 2 : 1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.weaponSlot1}>
        <WeaponSlot
          onClick={props.onItemSelected}
          onSwitchWeaponSet={switchWeaponSet}
          activeSet={activeSet}
          weapon1={props.Weapon}
          weapon2={props.Weapon2}
        />
      </div>

      <div style={styles.weaponSlot2}>
        <WeaponSlot
          onClick={props.onItemSelected}
          onSwitchWeaponSet={switchWeaponSet}
          activeSet={activeSet}
          weapon1={props.Offhand}
          weapon2={props.Offhand2}
        />
      </div>

      <div style={styles.amulet}>
        <ItemSlot onClick={props.onItemSelected} item={props.Amulet} />
      </div>

      <div style={styles.ring1}>
        <ItemSlot onClick={props.onItemSelected} item={props.Ring} />
      </div>

      <div style={styles.ring2}>
        <ItemSlot onClick={props.onItemSelected} item={props.Ring2} />
      </div>

      <div style={styles.helm}>
        <ItemSlot onClick={props.onItemSelected} item={props.Helm} />
      </div>

      <div style={styles.bodyArmour}>
        <ItemSlot onClick={props.onItemSelected} item={props.BodyArmour} />
      </div>

      <div style={styles.belt}>
        <ItemSlot onClick={props.onItemSelected} item={props.Belt} />
      </div>

      <div style={styles.gloves}>
        <ItemSlot onClick={props.onItemSelected} item={props.Gloves} />
      </div>

      <div style={styles.boots}>
        <ItemSlot onClick={props.onItemSelected} item={props.Boots} />
      </div>

      <div style={styles.flasks}>
        <FlasksSlot onClick={props.onItemSelected} flasks={props.Flask} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "50%",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)"
  },
  amulet: {
    gridColumn: 4,
    gridRow: 2
  },
  belt: {
    gridColumn: 3,
    gridRow: 4
  },
  bodyArmour: {
    gridColumn: 3,
    gridRow: "2 / 4"
  },
  boots: {
    gridColumn: 4,
    gridRow: "4 / 6"
  },
  flasks: {
    gridColumn: "3 / 5",
    gridRow: 5
  },
  gloves: {
    gridColumn: 2,
    gridRow: "4 / 6"
  },
  helm: {
    gridColumn: 3,
    gridRow: 1
  },
  ring1: {
    gridColumn: 2,
    gridRow: 3
  },
  ring2: {
    gridColumn: 4,
    gridRow: 3
  },
  weaponSlot1: {
    gridColumn: 1,
    gridRow: "1 / 6"
  },
  weaponSlot2: {
    gridColumn: 5,
    gridRow: "1 / 6"
  }
};

export default characterDoll;
