import React from "react";
import { Option, Select } from "../imports/imports";

const SelectInput = ({
  label,
  value,
  onChange,
  options,
  identifier,
  type,
  ...props
}) => {
  return (
    <Select
      label={label}
      className="focus:shadow-none"
      onChange={(value) => onChange(identifier, value, type)}
      {...props}
    >
      {options.map((item, index) => {
        return (
          <Option
            key={index}
            name={item.label.props ?? item.label}
            value={item.value}
          >
            {item.label}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectInput;
