import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from "react";
import { Poe, PoeRequests } from "../../common";
import { UserContext } from "../user";

export const CharacterContext = createContext<{
  getCharacter: (name: string) => Character;
  characters: Character[];
}>({} as any);

export interface Character extends Poe.Character {
  items: Poe.CharacterEquipment;
}

export const CharacterProvier: FunctionComponent = ({ children }) => {
  const { api } = useContext(UserContext);
  const [characters, setCharacters] = useState<Character[]>(
    // "characters",
    []
  );

  useEffect(() => {
    const getCharacterList = async () => {
      const items = await api.send<Poe.Character[]>(PoeRequests.CharacterList);

      const characterDetails = await Promise.all(
        items.map(async item => {
          const { character, items } = await api.send<{
            character: Poe.Character;
            items: Poe.CharacterEquipment;
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
