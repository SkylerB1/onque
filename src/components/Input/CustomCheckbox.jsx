import { Checkbox } from '@material-tailwind/react';
import React from 'react'

const CustomCheckbox = ({ identifier, value, onChange, ...props }) => {
  return (
    <Checkbox
      value={value}
      onChange={(e) => onChange(identifier, e.target.checked)}
      {...props}
    />
  );
};

export default CustomCheckbox