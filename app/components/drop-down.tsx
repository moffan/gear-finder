import styled from "@emotion/styled";
import React from "react";

const Select = styled.select``;

interface DropdownProps {
  options: { label: string; value: any }[];
  selectedValue?: any;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropDown: React.FunctionComponent<DropdownProps> = ({
  onChange,
  selectedValue,
  options
}) => {
  return (
    <>
      <div>Select league</div>
      <Select onChange={onChange} defaultValue={selectedValue}>
        <option value="">--Please choose an option--</option>
        {options.map(({ label, value }, index) => (
          <option
            key={index}
            value={value}
          >
            {label}
          </option>
        ))}
      </Select>
    </>
  );
};

export default DropDown;
