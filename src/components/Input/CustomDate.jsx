import React from "react";
import { Input } from "../imports/imports";

const CustomDate = ({
  identifier,
  type,
  onChange,
  variant = "outlined",
  format = "MM/DD/YYYY",
  ...props
}) => {
  return (
    <Input
      type="date"
      className="focus:shadow-none"
      form
      onChange={(e) => onChange(identifier, e.target.value, type)}
      variant={variant}
      {...props}
    />
  );
};

export default CustomDate;
