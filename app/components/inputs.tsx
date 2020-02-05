import React, { FunctionComponent } from "react";
import { Input } from "./base";

export const Checkbox: FunctionComponent<{
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
}> = ({ isChecked, onChange }) => (
  <Input
    type="checkbox"
    onChange={(e): void => onChange(e.target.checked)}
    checked={isChecked}
  />
);
