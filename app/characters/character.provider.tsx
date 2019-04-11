import React from "react";

export const CharacterContext = React.createContext<{
  setCharacter: (name: string) => void;
  character: any;
}>({} as any);

class CharacterService {
  public getCharacter(name: string) {
    return name;
  }
}

const CharacterProvider: React.FunctionComponent = ({ children }) => {
  const characters = new Map<string, any>();
  const characterService = new CharacterService();
  let character;
  const setCharacter = (name: string) => {
    let character = characters.get(name);
    if (!character) {
      console.log("cache miss");

      characters.set(name, characterService.getCharacter(name));
    }
    character = characters.get(name);
  };

  return (
    <CharacterContext.Provider value={{ setCharacter, character }}>
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterProvider;
