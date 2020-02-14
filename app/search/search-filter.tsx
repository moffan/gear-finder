import { FunctionComponent, useContext, useEffect, useReducer } from "react";
import React from "react";

import { ItemModifiers, ItemStat, PoeRequests } from "../../common";
import {
  Button,
  Columns,
  ComboBox,
  IconButton,
  Minus,
  Plus
} from "../components";
import { UserContext } from "../user";
import { usePersistedState } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SearchFilterProps {
  onSearch: (modifiers: ItemStat[]) => void;
}

interface ItemGroup extends ItemStat {
  group?: string;
}

export const SearchFilter: FunctionComponent<SearchFilterProps> = ({
  onSearch
}) => {
  const { api } = useContext(UserContext);
  const [modifiers, setModifiers] = usePersistedState<ItemGroup[]>(
    "modifiers",
    []
  );

  const [selectedModifiers, dispatch] = useReducer(
    (
      state: Partial<ItemStat>[],
      {
        type,
        index,
        modifier
      }: {
        type: "add" | "remove" | "set";
        index?: number;
        modifier?: ItemStat;
      }
    ) => {
      switch (type) {
        case "add":
          return [...state, {}];
        case "remove":
          if (state.length > 1) {
            state.splice(-1, 1);
            return [...state];
          }

          return state;
        case "set":
          return state.map((item, itemIndex) => {
            if (itemIndex === index) {
              return { ...modifier };
            }

            return item;
          });
        default:
          return state;
      }
    },
    [{}]
  );

  useEffect(() => {
    const getStats = async (): Promise<void> => {
      const {
        crafted,
        delve,
        enchant,
        explicit,
        fractured,
        implicit,
        monster,
        pseudo
        // veiled
      } = await api.send<ItemModifiers>(PoeRequests.Stats);

      setModifiers([
        ...pseudo,
        ...explicit,
        ...implicit,
        ...crafted,
        ...enchant,
        ...delve,
        ...fractured,
        ...monster
        // ...veiled
      ]);
    };

    if (modifiers.length === 0) {
      getStats();
    }
  }, []);

  return (
    <>
      <Columns>
        <IconButton onClick={(): void => dispatch({ type: "add" })}>
          <Plus />
        </IconButton>
        <IconButton
          disabled={selectedModifiers.length === 1}
          onClick={(): void => dispatch({ type: "remove" })}
        >
          <Minus />
        </IconButton>
      </Columns>
      {selectedModifiers.map((_, index) => (
        <ComboBox
          key={index}
          options={modifiers}
          defultValue={selectedModifiers[index].text}
          onSelect={(modifier: ItemStat): void =>
            dispatch({ type: "set", index, modifier })
          }
        />
      ))}
      <Button
        onClick={(): void =>
          onSearch(
            selectedModifiers.filter(
              item => !!item.id && !!item.text && !!item.type
            ) as ItemStat[]
          )
        }
      >
        Search
      </Button>
    </>
  );
};
