import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { StyledComponentProps, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

import useUserService from "./user.service";

const LoginScreen: React.FunctionComponent<StyledComponentProps> = ({
  classes
}) => {
  const [user, login] = useUserService();
  const [username, setUsername] = useState(user.username);
  const [sessionId, setSessionId] = useState(user.sessionId);

  if (user.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form
      className={classes && classes.container}
      noValidate
      autoComplete="off"
    >
      <Typography color="textSecondary">Login</Typography>
      <TextField
        required
        id="username"
        value={username}
        type="text"
        margin="normal"
        onChange={event => setUsername(event.target.value)}
      />
      <TextField
        required
        id="password"
        label="Session ID"
        value={sessionId}
        type="password"
        margin="normal"
        onChange={event => setSessionId(event.target.value)}
      />
      <Button
        variant="outlined"
        disabled={!sessionId}
        onClick={() => login(username, sessionId)}
      >
        Login
      </Button>
    </form>
  );
};

const styles: StyleRules = {
  root: {
    color: "red",
    "&$checked": {
      color: "green"
    }
  },
  checked: {}
};

export default withStyles(styles)(LoginScreen);
