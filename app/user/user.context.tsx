import React, { FunctionComponent, useEffect } from "react";
import { Login } from ".";
import { usePersistedState } from "../utils";
import { apiService, ApiService } from "../utils/api.service";
import { PoeRequests } from "../../common";

interface UserDetails {
  accountName: string;
  poesessid: string;
  league: string;
}

export interface StashTabsSetting {
  stashTabs: StashTabSetting[];
  activeTabs: StashTabSetting[];
  includeTab: (tab: StashTabSetting, include: boolean) => void;
}

export interface StashTabSetting {
  name: string;
  type: string;
  included?: boolean;
  id: string;
  i: number;
}

export const UserContext = React.createContext<
  {
    login: (accountName: string, poesessid: string, league: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    /** Access to the API as logged in user. */
    api: ApiService;
    stash: StashTabsSetting;
  } & UserDetails
>({} as any);

export const UserProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = usePersistedState<UserDetails>("auth");
  const [stashTabs, setStashTabs] = usePersistedState<StashTabSetting[]>(
    "stashTabKey",
    []
  );

  const api = {
    send<T>(request: PoeRequests, payload?: any): Promise<T> {
      if (user) {
        const { accountName, poesessid, league } = user;

        return apiService.send<T>(request, {
          ...payload,
          accountName,
          poesessid,
          league
        });
      }

      return apiService.send<T>(request, {
        ...payload
      });
    }
  };

  useEffect(() => {
    const getStashTabs = async () => {
      const tabs = await api.send<StashTabSetting[]>(PoeRequests.StashTabs);

      setStashTabs(tabs);
    };

    if (!!user && stashTabs.length === 0) {
      getStashTabs();
    }
  }, [user]);

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

  const stash: StashTabsSetting = {
    stashTabs,
    get activeTabs() {
      return stashTabs.filter(tab => !!tab.included);
    },
    includeTab(tab: StashTabSetting, included: boolean) {
      const tabs = stashTabs.map(item =>
        item.id === tab.id ? { ...item, included } : item
      );

      setStashTabs(tabs);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated: !!user,
        login,
        logout,
        api,
        stash,
        ...user
      }}
    >
      {user && api ? <>{children}</> : <Login />}
    </UserContext.Provider>
  );
};
