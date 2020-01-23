import React, { FunctionComponent } from "react";
import { Login } from ".";
import { usePersistedState } from "../utils";

interface UserDetails {
  accountName: string;
  poesessid: string;
  league: string;
}

export const UserContext = React.createContext<
  {
    login: (accountName: string, poesessid: string, league: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
  } & UserDetails
>({} as any);

export const UserProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = usePersistedState<UserDetails>("auth");

  const login = (accountName: string, poesessid: string, league: string) => {
    if (!accountName || !poesessid) {
      return;
    }

    setUser({ accountName, poesessid, league });
  };

  const logout = () => {
    // tslint:disable-next-line: no-console
    console.log("logging out");
  };

  return (
    <UserContext.Provider
      value={{ isAuthenticated: !!user, login, logout, ...user }}
    >
      {user ? <>{children}</> : <Login />}
    </UserContext.Provider>
  );
};
