import React, { FunctionComponent } from "react";
import { Select, Option } from "./base";

interface OptionValue {
  id: string;
  text: string;
}
export const DropDown: FunctionComponent<{
  items: OptionValue[];
  defultValue?: string;
  onSelect: (selected: OptionValue) => void;
}> = ({ items, defultValue, onSelect }) => (
  <Select
    value={defultValue}
    onChange={e => onSelect(items.find(item => item.text === e.target.value)!)}
  >
    {items.map(item => (
      <Option key={item.id}>{item.text}</Option>
    ))}
  </Select>
);
