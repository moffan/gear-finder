import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from "react";
import { CurrentLeagues, PoeRequests } from "../../common";
import { UserContext } from "./user.context";

export const Login: FunctionComponent = () => {
  const { login, api } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [activeLeague, setActiveLeague] = useState("");
  const [currentLeagues, setCurrentLeagues] = useState<CurrentLeagues>();

  useEffect(() => {
    const getCurrentLeauges = async () => {
      const leagues = await api.send<CurrentLeagues>(
        PoeRequests.CurrentLeagues
      );

      setCurrentLeagues(leagues);
      setActiveLeague(leagues[0].id);
    };
    getCurrentLeauges();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label>POESESSID</label>
      <input
        type="text"
        value={sessionId}
        onChange={e => setSessionId(e.target.value)}
      />
      <label>League</label>
      <select
        value={activeLeague}
        onChange={e => setActiveLeague(e.target.value)}
      >
        {currentLeagues?.map(({ id, text }) => {
          return <option key={id}>{text}</option>;
        })}
      </select>
      <br />
      <button
        onClick={() => login(username, sessionId, activeLeague)}
        disabled={!username || !sessionId || !activeLeague}
      >
        login
      </button>
    </div>
  );
};
