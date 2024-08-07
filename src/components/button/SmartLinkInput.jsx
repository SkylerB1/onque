import React, { useMemo } from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

const SmartLinkInput = ({
  label,
  icon,
  value,
  onChange,
  className,
  error = false,
  ...props
}) => {
  const isError = useMemo(() => {
    if (error == true && value == "") {
      return true;
    } else false;
  }, [value, error]);
  const email = "abc@gmail.com";
  return (
    <div>
      <Input
        label={label}
        icon={icon}
        error={isError}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default SmartLinkInput;
