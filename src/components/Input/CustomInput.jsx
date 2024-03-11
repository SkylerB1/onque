import React from "react";
import { Input, Typography } from "../imports/imports";

const CustomInput = ({
  identifier,
  type,
  onChange,
  helperText,
  helperTextColor = "red",
  helperTextClass="",
  ...props
}) => {
  return (
    <div>
      <Input
        className="focus:shadow-none"
        onChange={(e) => onChange(identifier, e.target.value, type)}
        {...props}
      />
      <Typography
        variant="small"
        color={helperTextColor}
        className={`mt-1 flex flex-1 gap-1 text-xs font-normal ${helperTextClass}`}
      >
        {helperText}
      </Typography>
    </div>
  );
};

export default CustomInput;
