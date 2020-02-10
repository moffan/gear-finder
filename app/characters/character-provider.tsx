import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
  useEffect
} from "react";
import { PoeCharacter, PoeRequests } from "../../common";
import { UserContext } from "../user";

export const CharacterContext = createContext<{
  getCharacter: (name: string) => PoeCharacter;
  characters: PoeCharacter[];
}>({} as any);

export const CharacterProvier: FunctionComponent = ({ children }) => {
  const user = useContext(UserContext);
  const [characters, setCharacters] = useState<PoeCharacter[]>([]);

  useEffect(() => {
    Promise.all(
      characters.map(async character =>
        user.api.send(PoeRequests.Equipment, character)
      )
    ).then(console.log);
  }, [characters]);

  useEffect(() => {
    const getCharacterList = async () => {
      const characters = await user.api.send<PoeCharacter[]>(
        PoeRequests.CharacterList
      );

      setCharacters(characters);
    };

    if (!characters.length) {
      getCharacterList();
    }
  }, []);

  return (
    <CharacterContext.Provider
      value={{
        getCharacter: name => {
          const poeCharacter = characters.filter(
            item => item.name === name
          )?.[0];

          return poeCharacter;
        },
        characters
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
