import React from "react";
import { IPoeItem } from "../../common/poe.models";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import ItemInfo from "./item-info/item-info";

export interface EquipmentConfiguratorProps {
  item: IPoeItem;
}

class EquipmentConfigurator extends React.Component<
  WithStyles<typeof styles> & IEquipmentConfiguratorProps
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

const styles = theme => ({
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

export default withStyles(styles)<IEquipmentConfiguratorProps>(
  EquipmentConfigurator
);

// import { connect } from "react-redux";

// import EquipmentConfigurator, {
//   IEquipmentConfiguratorProps
// } from "./equipment-configurator";
// import { IPoeItem } from "../../common/poe.models";

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
