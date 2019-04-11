import { apiService, usePersistedState } from "../common";
import { PoeRequests } from "../../common";
import { PoeCharacter } from "../poe-content";

const useCharactersService = (sessionId: string): [PoeCharacter[]] => {
  const key = "characters";
  const [characters, setValue] = usePersistedState<PoeCharacter[]>(key, []);

  if (!characters.length) {
    apiService
      .send<PoeCharacter[]>(PoeRequests.CharacterList, {
        sessionId
      })
      .then(poeCharacters => setValue(poeCharacters));
  }

  return [characters];
};

export default useCharactersService;

