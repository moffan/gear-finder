import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
  useEffect,
  useReducer,
  useCallback
} from "react";
import { PoeCharacter, PoeRequests, PoeCharacterEquipment } from "../../common";
import { UserContext } from "../user";
import { usePersistedState } from "../utils";

export const CharacterContext = createContext<{
  getCharacter: (name: string) => Character;
  characters: Character[];
}>({} as any);

export interface Character extends PoeCharacter {
  items: PoeCharacterEquipment[];
}

export const CharacterProvier: FunctionComponent = ({ children }) => {
  const { api } = useContext(UserContext);
  const [characters, setCharacters] = usePersistedState<Character[]>(
    "characters",
    []
  );

  useEffect(() => {
    const getCharacterList = async () => {
      const items = await api.send<PoeCharacter[]>(PoeRequests.CharacterList);

      const characterDetails = await Promise.all(
        items.map(async item => {
          const { character, items } = await api.send<{
            character: PoeCharacter;
            items: PoeCharacterEquipment[];
          }>(PoeRequests.Character, {
            name: item.name
          });

          return { ...character, items };
        })
      );

      setCharacters(characterDetails);
    };

    if (!characters.length) {
      getCharacterList();
    }
  }, []);

  const getCharacter = (name: string) =>
    characters.filter(item => item.name === name)[0];

  return (
    <CharacterContext.Provider
      value={{
        getCharacter,
        characters
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
