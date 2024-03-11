import { Typography } from '@material-tailwind/react';
import React from 'react'

const CustomLabel = ({title,body}) => {
  return (
    <div>
      <Typography
        variant="small"
        color="blue-gray"
        className="font-semibold tracking-wide"
      >
        {title}
      </Typography>
      <Typography
        variant="small"
        color="gray"
        className="text-[0.72rem] text-muted tracking-wide"
      >
        {body}
      </Typography>
    </div>
  );
}

export default CustomLabel