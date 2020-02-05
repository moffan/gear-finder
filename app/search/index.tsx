import React, { useReducer, useContext, useEffect } from "react";
import { UserContext } from "../user";
import { PoeRequests, ItemStat, ItemModifiers } from "../../common";
import { ComboBox, Row, Button } from "../components";
import { FunctionComponent } from "react";
import { Plus, Minus } from "styled-icons/boxicons-regular";
import { usePersistedState } from "../utils";

interface ItemGroup extends ItemStat {
  group?: string;
}

export const Search: FunctionComponent = () => {
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
        // return [{}];
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
        ...crafted,
        ...delve,
        ...enchant,
        ...explicit,
        ...fractured,
        ...implicit,
        ...monster,
        ...pseudo
        // ...veiled
      ]);
    };

    if (modifiers.length === 0) {
      getStats();
    }
  }, []);

  return (
    <>
      <h1>search</h1>
      <Row>
        <Plus
          size="24"
          style={{ cursor: "pointer" }}
          onClick={(): void => dispatch({ type: "add" })}
        />
        <Minus
          size="24"
          style={{ cursor: "pointer" }}
          onClick={(): void => dispatch({ type: "remove" })}
        />
      </Row>
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
        onClick={(): void => {
          const filterd = selectedModifiers.filter(
            item => !!item.id && !!item.text && !!item.type
          );

          if (filterd.length > 0) {
            console.log(filterd);
          }
        }}
      >
        Search
      </Button>
    </>
  );
};
