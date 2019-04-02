import React, { useState } from "react";
import { withStyles, StyledComponentProps } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router-dom";

import useEquipmentService from "./equipment.service";
import CharacterDoll from "./character-doll";
import EquipmentConfigurator from "./equipment-configurator";
import { PoeCharacter, PoeItem } from "../poe-content";

const CharacterDetails = ({ name }: PoeCharacter) => <h1>{name}</h1>;

const CharacterSheet: React.FunctionComponent<
  StyledComponentProps & RouteComponentProps
> = ({ classes, match: { params } }) => {
  const { name } = params as any; //TODO: know its there figure out how to set up interfaces
  const [selectedItem, setSelectedItem] = useState<PoeItem | null>(null);
  const [character, equipment] = useEquipmentService(name);

  return (
    <div className={classes && classes.root}>
      <div className={classes && classes.header}>
        <CharacterDetails {...character} />
      </div>
      <div className={classes && classes.content}>
        <div className={classes && classes.doll}>
          <CharacterDoll {...equipment} onItemSelected={setSelectedItem} />
        </div>
        <div className={classes && classes.equipment}>
          {selectedItem && <EquipmentConfigurator item={selectedItem} />}
        </div>
      </div>
    </div>
  );
};

const styles = () => ({
  root: {
    display: "grid",
    "grid-template-rows": "1fr 20fr"
  },
  header: {
    "grid-row": 1
  },
  content: {
    display: "grid",
    "grid-row": 2,
    "grid-template-columns": "1fr 1fr"
  },
  doll: {
    border: "1px black solid",
    padding: "5px",
    "grid-column": 1
  },
  equipment: {
    background: "rgba(0, 0, 0, 0.14)",
    "grid-column": 2
  }
});

export default withStyles(styles)(CharacterSheet);
