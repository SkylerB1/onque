import React from 'react'
import { Input } from '../imports/imports';

const CustomTime = ({
  identifier,
  type,
  onChange,
  variant = "outlined",
  ...props
}) => {
  return (
    <Input
      type="time"
      className="focus:shadow-none"
      onChange={(e) => onChange(identifier, e.target.value, type)}
      variant={variant}
      {...props}
    />
  );
};

export default CustomTime