import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import useUserService from "./user.service";

const LoginScreen: React.FunctionComponent = () => {
  const [user, login] = useUserService();
  const [username, setUsername] = useState(user.username);
  const [sessionId, setSessionId] = useState(user.sessionId);

  if (user.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form noValidate autoComplete="off">
      <span>Login</span>
      <input
        required
        value={username}
        type="text"
        onChange={event => setUsername(event.target.value)}
      />
      <input
        required
        value={sessionId}
        type="password"
        onChange={event => setSessionId(event.target.value)}
      />
      <button disabled={!sessionId} onClick={() => login(username, sessionId)}>
        Login
      </button>
    </form>
  );
};

const styles = {
  root: {
    color: "red",
    "&$checked": {
      color: "green"
    }
  },
  checked: {}
};

export default LoginScreen;
