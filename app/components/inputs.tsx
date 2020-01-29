import styled from "styled-components";
import React, { FunctionComponent } from "react";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: "palevioletred";
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export const Checkbox: FunctionComponent<{
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
}> = ({ isChecked, onChange }) => (
  <Input
    type="checkbox"
    onChange={e => onChange(e.target.checked)}
    checked={isChecked}
  />
);
