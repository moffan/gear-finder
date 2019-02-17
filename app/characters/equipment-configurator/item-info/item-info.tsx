import React from "react";
import Description from "./description";
import Mods from "./mods";
import { IPoeItem } from "../../../common/poe.models";
import { withStyles, WithStyles } from "@material-ui/core/styles";

export interface ItemInfoProps {
  item: IPoeItem;
}

type Props = IItemInfoProps & WithStyles<typeof styles>;

const ItemInfo = ({ item, classes }: Props) => (
  <div className={classes.root}>
    <div className={classes.description}>
      <Description {...item} item={item} />
    </div>
    <div className={classes.mods}>
      <Mods {...item} onClick={mod => console.log(mod)} />
    </div>
  </div>
);

const styles = theme => ({
  root: {
    display: "grid",
    "grid-template-columns": "1fr 5fr"
  },
  description: { "grid-column": 1 },
  mods: { "grid-column": 2 }
});

export default withStyles(styles)<IItemInfoProps>(ItemInfo);
