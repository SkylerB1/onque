import { Switch } from "@material-tailwind/react";
import React from "react";

const CustomSwitch = ({ identifier, value, onChange, ...props }) => {
  return (
    <Switch
      value={value}
      onChange={(e) => onChange(identifier, e.target.checked)}
      {...props}
    />
  );
};

export default CustomSwitch;
