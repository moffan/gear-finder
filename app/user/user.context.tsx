import React, { FunctionComponent } from "react";
import { Login } from ".";
import { usePersistedState } from "../utils";
import { useState } from "react";
import { useEffect } from "react";
import { apiService, ApiService } from "../utils/api.service";
import { PoeRequests } from "../../common";

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
    api: ApiService;
  } & UserDetails
>({} as any);

export const UserProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = usePersistedState<UserDetails>("auth");

  const api = {
    send<T>(request: PoeRequests, payload: any): Promise<T> {
      const { accountName, poesessid, league } = user;

      return apiService.send<T>(request, {
        ...payload,
        accountName,
        poesessid,
        league
      });
    }
  };

  const login = (accountName: string, poesessid: string, league: string) => {
    if (!accountName || !poesessid || !league) {
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
      value={{
        isAuthenticated: !!user,
        login,
        logout,
        api,
        ...user
      }}
    >
      {user && api ? <>{children}</> : <Login />}
    </UserContext.Provider>
  );
};
