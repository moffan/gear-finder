import React, { FunctionComponent } from "react";
import { Select, Option, Optgroup } from "./base";

interface OptionValue {
  id: string;
  text: string;
  type?: string;
}

export const DropDown: FunctionComponent<{
  items: OptionValue[];
  defultValue?: string;
  grouped?: boolean;
  onSelect: (selected: OptionValue) => void;
}> = ({ items, defultValue, onSelect, grouped }) => {
  const groups = new Map<string, OptionValue[]>();

  if (grouped) {
    items.forEach(item => {
      const key = item.type ?? "";
      const group = groups.get(key);
      if (!group) {
        groups.set(key, [item]);
      } else {
        group.push(item);
      }
    });

    return (
      <Select
        value={defultValue}
        onChange={(e): void => {
          const found = items.find(item => item.text === e.target.value);
          if (found) {
            onSelect(found);
          }
        }}
      >
        {[...groups.entries()].map(([key, values]) => {
          return (
            <Optgroup key={key} label={key}>
              {values.map(({ text }, index) => (
                <Option key={index}>{text}</Option>
              ))}
            </Optgroup>
          );
        })}
      </Select>
    );
  }

  return (
    <Select
      value={defultValue}
      onChange={(e): void => {
        const found = items.find(item => item.text === e.target.value);
        if (found) {
          onSelect(found);
        }
      }}
    >
      {items.map(({ text, id }) => (
        <Option key={id}>{text}</Option>
      ))}
    </Select>
  );
};
