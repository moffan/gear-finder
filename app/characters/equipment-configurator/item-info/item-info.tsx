import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";

import Description from "./description";
import Mods from "./mods";
import { PoeItem } from "../../../poe-content";

export interface ItemInfoProps {
  item: PoeItem;
}

type Props = ItemInfoProps & WithStyles<typeof styles>;

const ItemInfo = ({ item, classes }: Props) => (
  <div className={classes.root}>
    <div className={classes.description}>
      <Description {...item} item={item} />
    </div>
    <div className={classes.mods}>
      <Mods {...item} onClick={(mod: any) => console.log(mod)} />
    </div>
  </div>
);

const styles = (theme: any) => ({
  root: {
    display: "grid",
    "grid-template-columns": "1fr 5fr"
  },
  description: { "grid-column": 1 },
  mods: { "grid-column": 2 }
});

export default withStyles(styles)<any>(ItemInfo);
