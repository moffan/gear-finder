import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";

import ItemInfo from "./item-info/item-info";
import { PoeItem } from "../../common";

export interface EquipmentConfiguratorProps {
  item: PoeItem;
}

class EquipmentConfigurator extends React.Component<
  WithStyles<typeof styles> & EquipmentConfiguratorProps
> {
  public render() {
    const { item, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.itemInfo}>
          <ItemInfo item={item} />
        </div>
        <div className={classes.itemFilter}>Item filter</div>
      </div>
    );
  }
}

const styles = (_theme: any) => ({
  root: {
    display: "grid",
    "grid-template-rows": "1fr 1fr"
  },
  itemInfo: {
    background: "gray",
    "grid-row": 1
  },
  itemFilter: {
    "background-color": "#dadee2",
    "grid-row": 2
  }
});

export default withStyles(styles)<any>(EquipmentConfigurator);

// import { connect } from "react-redux";

// import EquipmentConfigurator, {
//   IEquipmentConfiguratorProps
// } from "./equipment-configurator";

// export default connect(
//   (
//     { character: { equipment } }: any,
//     {
//       match: {
//         params: { id, type }
//       }
//     }: any
//   ): IEquipmentConfiguratorProps => {
//     return {
//       item:
//         type === "Flask"
//           ? equipment[type].filter((item: IPoeItem) => item.id === id)[0]
//           : equipment[type]
//     };
//   }
// )(EquipmentConfigurator);
