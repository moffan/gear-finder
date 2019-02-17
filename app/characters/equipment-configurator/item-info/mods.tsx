import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

export interface ModsProps {
  implicitMods: any;
  explicitMods: any;
  onClick: (mod: any) => void;
}
const ModLine = ({ mod, classes, onClick }) => (
  <div className={classes.modLine}>
    <Icon className={classes.icon} onClick={() => onClick(mod)}>
      add_circle
    </Icon>
    {mod}
  </div>
);

const Mods = ({ implicitMods, explicitMods, onClick, classes }) => (
  <div>
    {implicitMods && (
      <>
        <h1>Implicit</h1>
        {implicitMods.map((mod, index) => (
          <ModLine key={index} mod={mod} onClick={onClick} classes={classes} />
        ))}
      </>
    )}

    {explicitMods && (
      <>
        <h1>Explicit</h1>
        {explicitMods.map((mod, index) => (
          <ModLine key={index} mod={mod} onClick={onClick} classes={classes} />
        ))}
      </>
    )}
  </div>
);

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    cursor: "pointer"
  },
  modLine: {
    display: "flex",
    border: "1px solid red",
    "align-items": "center"
  }
});

export default withStyles(styles)<IModsProps>(Mods);
