import { usePersistedState } from "../common";

interface UserState {
  username: string;
  sessionId: string;
}

export interface UserProfile extends UserState {
  readonly isAuthenticated: boolean;
}

const useUserService = (): [
  UserProfile,
  (username: string, sessionId: string) => void
] => {
  const key = "user";
  const [user, setUser] = usePersistedState<any>(key, {
    username: "",
    sessionId: ""
  });

  const login = (username: string, sessionId: string) => {
    if (user.username === username && user.sessionId === sessionId) {
      return;
    }

    const activeUser = { username, sessionId };
    setUser(activeUser);
  };

  return [
    {
      ...user,
      get isAuthenticated() {
        return !!user.username && !!user.sessionId;
      }
    },
    login
  ];
};

export default useUserService;
