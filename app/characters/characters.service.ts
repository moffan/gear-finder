import { apiService, useLocaleStorage } from "../common";
import { Channels } from "../../common";
import { PoeCharacter } from "../common/poe.models";

const useCharactersService = (sessionId: string): [PoeCharacter[]] => {
  const key = "characters";
  const [characters, setValue] = useLocaleStorage(key, []);

  if (!characters.length) {
    apiService
      .send<any[]>(Channels.UserInfo, {
        sessionId
      })
      .then(poeCharacters => setValue(poeCharacters));
  }

  return [characters];
};

export default useCharactersService;
